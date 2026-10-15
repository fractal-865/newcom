<?php
// ============================================================
// Configuración SMTP · Club Deportivo Newcom
// Servidor: cPanel (priva280.spindns.com · SSL/TLS)
// ------------------------------------------------------------
// CÓMO USAR: reemplaza TU_CONTRASEÑA_AQUÍ por la contraseña
// de la casilla contacto@newcompuntaarenas.cl y sube este
// archivo a public_html/api/ junto a enviar-reserva.php
// y la carpeta PHPMailer/.
// ============================================================
declare(strict_types=1);

// Bloquea el acceso directo a este archivo desde el navegador.
if (basename(__FILE__) === basename($_SERVER['SCRIPT_FILENAME'] ?? '')) {
  http_response_code(403);
  exit('Acceso denegado.');
}

define('SMTP_HOST', 'priva280.spindns.com');
define('SMTP_PORT', 465);
define('SMTP_SECURE', 'ssl'); // 465 = SSL directo (recomendado por cPanel)
define('SMTP_USER', 'contacto@newcompuntaarenas.cl');
define('SMTP_PASS', 'TU_CONTRASEÑA_AQUÍ');

define('MAIL_DESTINO', 'contacto@newcompuntaarenas.cl');
define('MAIL_NOMBRE', 'Club Deportivo Newcom Escuela 18 de Septiembre');
