<?php
// ============================================================
// Recibe el mensaje del formulario de contacto y lo envía por
// correo al club usando PHPMailer + SMTP del cPanel.
// Acepta JSON (fetch) o formulario clásico (POST).
// Responde siempre JSON: {"ok":true} o {"ok":false,...}.
// ============================================================
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/config-correo.php';

function responder(int $codigo, array $datos): void
{
  http_response_code($codigo);
  echo json_encode($datos, JSON_UNESCAPED_UNICODE);
  exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  responder(405, ['ok' => false, 'error' => 'Método no permitido.']);
}

// Lee JSON o $_POST clásico.
$entrada = [];
$crudo = file_get_contents('php://input');
if (is_string($crudo) && $crudo !== '') {
  $tipo = $_SERVER['CONTENT_TYPE'] ?? '';
  if (stripos($tipo, 'application/json') !== false) {
    $dec = json_decode($crudo, true);
    if (is_array($dec)) {
      $entrada = $dec;
    }
  }
}
if (!$entrada) {
  $entrada = $_POST;
}

$limpiar = static function ($v): string {
  $v = is_scalar($v) ? (string) $v : '';
  $v = trim((string) preg_replace('/[\r\n]+/', ' ', $v));
  return mb_substr($v, 0, 2000, 'UTF-8');
};

$nombre  = $limpiar($entrada['nombre'] ?? '');
$email   = $limpiar($entrada['email'] ?? '');
$telRaw  = (string) ($entrada['telefono'] ?? ($entrada['tel'] ?? ''));
$tel     = (string) preg_replace('/[\D]/', '', $telRaw);
$mensaje = $limpiar($entrada['mensaje'] ?? '');
$consent = !empty($entrada['consentimiento']) || !empty($entrada['consent']);

// Honeypot antispam (campo oculto "empresa"): si viene lleno, éxito falso.
if ($limpiar($entrada['empresa'] ?? '') !== '') {
  responder(200, ['ok' => true]);
}

if (mb_strlen($nombre, 'UTF-8') < 2) {
  responder(422, ['ok' => false, 'error' => 'Nombre inválido.']);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email, 'UTF-8') > 254) {
  responder(422, ['ok' => false, 'error' => 'Correo inválido.']);
}
if ($tel !== '' && !preg_match('/^\d{7,12}$/', $tel)) {
  responder(422, ['ok' => false, 'error' => 'Teléfono inválido.']);
}
if (mb_strlen($mensaje, 'UTF-8') < 5) {
  responder(422, ['ok' => false, 'error' => 'Mensaje muy corto.']);
}
if (!$consent) {
  responder(422, ['ok' => false, 'error' => 'Falta aceptar la Política de Privacidad.']);
}

$esc = static function (string $v): string {
  return htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
};

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;

try {
  $mail = new PHPMailer(true);
  $mail->CharSet = 'UTF-8';
  $mail->isSMTP();
  $mail->Host = SMTP_HOST;
  $mail->Port = SMTP_PORT;
  $mail->SMTPSecure = SMTP_SECURE;
  $mail->SMTPAuth = true;
  $mail->Username = SMTP_USER;
  $mail->Password = SMTP_PASS;
  $mail->setFrom(SMTP_USER, MAIL_NOMBRE);
  $mail->addAddress(MAIL_DESTINO, MAIL_NOMBRE);
  $mail->addReplyTo($email, $nombre);
  $mail->Subject = 'Nuevo mensaje de contacto web: ' . $nombre;

  $filas = [
    'Nombre' => $nombre,
    'Correo' => $email,
    'Teléfono' => $tel !== '' ? $tel : '—',
    'Mensaje' => $mensaje,
  ];
  $html = '<h2>Nuevo mensaje desde newcompuntaarenas.cl ✉️</h2><table border="1" cellpadding="8" cellspacing="0">';
  $txt = "Nuevo mensaje desde newcompuntaarenas.cl\n\n";
  foreach ($filas as $k => $v) {
    $html .= '<tr><th align="left">' . $esc($k) . '</th><td>' . nl2br($esc($v)) . '</td></tr>';
    $txt .= $k . ': ' . $v . "\n";
  }

  $mail->isHTML(true);
  $mail->Body = $html;
  $mail->AltBody = $txt;
  $mail->send();

  responder(200, ['ok' => true]);
} catch (Throwable $e) {
  error_log('[newcom] Error al enviar contacto: ' . $e->getMessage());
  responder(500, ['ok' => false, 'error' => 'No se pudo enviar tu mensaje. Inténtalo de nuevo o escríbenos por WhatsApp.']);
}
