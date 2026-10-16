<?php
// ============================================================
// Diagnóstico del envío de correo (solo para el administrador).
// Uso: https://tudominio.cl/api/diagnostico.php?key=newcom2026
// Muestra versiones, extensiones, archivos y prueba la conexión
// SMTP (solo login, no envía nada). No muestra la contraseña.
// Cambia DIAG_KEY por una clave propia si quieres.
// ============================================================
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

define('DIAG_KEY', 'newcom2026');

$key = (string) ($_GET['key'] ?? '');
if (!hash_equals(DIAG_KEY, $key)) {
  http_response_code(403);
  echo json_encode(['ok' => false, 'error' => 'Clave inválida. Usa diagnostico.php?key=newcom2026'], JSON_UNESCAPED_UNICODE);
  exit;
}

$out = [
  'ok' => true,
  'php' => PHP_VERSION,
  'extensiones' => [
    'mbstring' => extension_loaded('mbstring'),
    'openssl' => extension_loaded('openssl'),
    'json' => extension_loaded('json'),
  ],
  'archivos' => [
    'config-correo.php' => file_exists(__DIR__ . '/config-correo.php'),
    'PHPMailer/Exception.php' => file_exists(__DIR__ . '/PHPMailer/src/Exception.php'),
    'PHPMailer/PHPMailer.php' => file_exists(__DIR__ . '/PHPMailer/src/PHPMailer.php'),
    'PHPMailer/SMTP.php' => file_exists(__DIR__ . '/PHPMailer/src/SMTP.php'),
  ],
];

require __DIR__ . '/config-correo.php';
$enmascarar = static function (string $correo): string {
  $partes = explode('@', $correo);
  if (count($partes) !== 2 || $partes[0] === '' || $partes[1] === '') {
    return '—';
  }
  return substr($partes[0], 0, 1) . '***@' . $partes[1];
};
$out['config'] = [
  'host' => SMTP_HOST,
  'puerto' => SMTP_PORT,
  'seguridad' => SMTP_SECURE,
  'usuario' => $enmascarar(SMTP_USER),
  'password_cargada' => (SMTP_PASS !== '' && SMTP_PASS !== 'TU_CONTRASEÑA_AQUÍ'),
  'destino' => $enmascarar(MAIL_DESTINO),
];

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
  $mail->Timeout = 15;
  $mail->SMTPOptions = [
    'ssl' => ['verify_peer' => false, 'verify_peer_name' => false, 'allow_self_signed' => true],
  ];
  if ($mail->smtpConnect()) {
    $mail->smtpClose();
    $out['smtp'] = 'OK: conexión y login correctos. Si el formulario sigue sin llegar, revisa spam y cPanel > Rastreo de entrega.';
  } else {
    $out['smtp'] = 'FALLO: no se pudo conectar (revisa host, puerto y contraseña en api/config-correo.php).';
  }
} catch (Throwable $e) {
  $out['smtp'] = 'EXCEPCIÓN: ' . $e->getMessage();
}

echo json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
