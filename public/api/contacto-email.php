<?php
// ============================================================
// Devuelve el correo del club solo bajo demanda (POST).
// El correo NO está en el HTML ni en el JS: así los bots que
// cosechan código estático no lo encuentran. El formulario de
// contacto sigue siendo la vía principal.
// ============================================================
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false]);
  exit;
}

require __DIR__ . '/config-correo.php';

echo json_encode(['ok' => true, 'email' => MAIL_DESTINO], JSON_UNESCAPED_UNICODE);
