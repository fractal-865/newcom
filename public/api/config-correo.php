<?php
// ============================================================
// Configuración SMTP · Club Deportivo Newcom
// Servidor: cPanel (priva280.spindns.com · SSL/TLS)
// ------------------------------------------------------------
// CÓMO USAR: reemplaza contacto@tudominio.cl por la casilla real y
// TU_CONTRASEÑA_AQUÍ por su contraseña, y sube este archivo a
// public_html/api/ junto a enviar-reserva.php y la carpeta PHPMailer/.
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
define('SMTP_USER', 'contacto@tudominio.cl');
define('SMTP_PASS', 'TU_CONTRASEÑA_AQUÍ');

define('MAIL_DESTINO', 'contacto@tudominio.cl');
define('MAIL_NOMBRE', 'Club Deportivo Newcom Escuela 18 de Septiembre');
