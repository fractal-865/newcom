// ============================================================
// CONTENIDO DEL SITIO · ÚNICO LUGAR DE DATOS
// Club Deportivo Newcom Escuela 18 de Septiembre · Punta Arenas
// ✏️ Editar textos, teléfonos, categorías, horarios, equipo,
//    testimonios y FAQ desde aquí. Las plantillas lo leen.
// ============================================================

export const WHATSAPP_NUMBER = '56999915690';
export const CONFIG = { urlSitio: 'https://newcom18deseptiembre.cl/' };

export const CONTACTO = {
  email: 'clubdeportivo.18@gmail.com',
  telefonos: ['+56 9 9991 5690', '+56 9 9640 5463'],
};

// Fotos reales del club (en /public/img). Nombres de archivo pensados para SEO:
// siempre incluyen «newcom» y «punta arenas» + descripción del contenido.
export const HERO_FALLBACK = {
  src: '/newcom/img/newcom-punta-arenas-hero-voleibol.avif',
  width: 1920,
  height: 1097,
};

export const FOTOS = [
  {
    src: '/newcom/img/newcom-punta-arenas-potencia-tus-anos.avif',
    alt: 'Jugador del Club Newcom de Punta Arenas rematando el balón sobre la red durante un partido de vóleibol adaptado',
    cap: 'Newcom Punta Arenas: potencia tus años',
  },
  {
    src: '/newcom/img/newcom-punta-arenas-unete-a-nuestro-equipo.avif',
    alt: 'Equipo del Club Newcom de Punta Arenas en formación defensiva dentro del gimnasio',
    cap: 'El Newcom nos une',
  },
  {
    src: '/newcom/img/newcom-punta-arenas-entrena-tu-defensa.avif',
    alt: 'Jugadora del Club Newcom de Punta Arenas defendiendo el balón con las manos en el gimnasio',
    cap: 'Entrena tu defensa con nosotros',
  },
];

export const MOSAICO = [
  {
    cls: 'm-4',
    src: '/newcom/img/newcom-punta-arenas-equipo-en-la-cancha.avif',
    alt: 'Equipo del Club Newcom de Punta Arenas posando en la cancha después de un partido',
    cap: 'Un mismo equipo, todas las edades',
    w: 1600,
    h: 1200,
    pos: 'center 45%',
  },
  {
    cls: 'm-5',
    src: '/newcom/img/newcom-punta-arenas-manos-al-centro.avif',
    alt: 'Jugadoras del Newcom de Punta Arenas juntan las manos sobre el balón en una rueda de equipo',
    cap: 'Manos al centro: juntas somos más',
    w: 1280,
    h: 960,
    pos: 'center 40%',
  },
  {
    cls: 'm-2',
    src: '/newcom/img/newcom-punta-arenas-grupo-con-trofeos.avif',
    alt: 'Foto grupal del Club Newcom de Punta Arenas con la bandera del club y los trofeos en el gimnasio',
    cap: 'Familia, bandera y trofeos: el orgullo del Newcom',
    w: 1600,
    h: 900,
    pos: 'center 30%',
  },
  {
    cls: 'm-9',
    src: '/newcom/img/newcom-punta-arenas-equipo-grupal.avif',
    alt: 'Toda la familia del Club Newcom de Punta Arenas reunida frente a la bandera del club en el gimnasio',
    cap: 'Toda la familia Newcom en una sola foto',
    w: 635,
    h: 400,
    pos: 'center 35%',
  },
  {
    cls: 'm-3',
    src: '/newcom/img/newcom-punta-arenas-campeonato-nacional-2026.avif',
    alt: 'Cartel del Primer Campeonato Nacional Newcom Magallánico 2026 con sede en Punta Arenas',
    cap: 'Primer Campeonato Nacional Newcom Magallánico 2026',
    w: 685,
    h: 854,
    pos: 'center top',
  },
  {
    cls: 'm-1',
    src: '/newcom/img/newcom-punta-arenas-ven-a-ser-parte.avif',
    alt: 'Panfleto del Club Newcom de Punta Arenas: ¡Ven a ser parte de nuestro equipo! con categorías, horarios y contacto',
    cap: '¡Ven a ser parte de nuestro equipo!',
    w: 719,
    h: 909,
    pos: 'center',
  },
  {
    cls: 'm-6',
    src: '/newcom/img/newcom-punta-arenas-unete-a-nuestro-equipo.avif',
    alt: 'Panfleto del Newcom con jugadoras en posición de recepción y el texto ¡Únete a nuestro equipo! Newcom Deporte',
    cap: '¡Únete a nuestro equipo! Newcom Deporte',
    w: 1126,
    h: 1420,
    pos: 'center',
  },
  {
    cls: 'm-7',
    src: '/newcom/img/newcom-punta-arenas-potencia-tus-anos.avif',
    alt: 'Panfleto del Newcom con un jugador armando el juego y el eslogan ¡Potencia tus años! ¡Únete ya!',
    cap: '¡Potencia tus años! ¡Únete ya!',
    w: 1148,
    h: 1522,
    pos: 'center',
  },
  {
    cls: 'm-8',
    src: '/newcom/img/newcom-punta-arenas-entrena-tu-defensa.avif',
    alt: 'Panfleto del Newcom con una jugadora con el balón y el texto Entrena tu defensa, ¡únete a nuestro equipo!',
    cap: '¡Entrena tu defensa! ¡Únete a nuestro equipo!',
    w: 981,
    h: 1236,
    pos: 'center',
  },
  {
    cls: 'm-10',
    src: '/newcom/img/newcom-punta-arenas-fondo-newcom.avif',
    alt: 'Nuevo fondo del Newcom Punta Arenas',
    cap: 'Nuevo',
    w: 800,
    h: 600,
    pos: 'center',
  },
];

export const TEXTOS = {
  inscripcionSub:
    'No necesitas experiencia. Completa el formulario y se abrirá WhatsApp con tu reserva lista.',
};

export const CATEGORIAS = [
  { edad: '+40', detalle: 'Mujeres', icono: 'mujer' },
  { edad: '+50', detalle: 'Mixto', icono: 'pareja' },
  { edad: '+60', detalle: 'Mixto', icono: 'pareja' },
  { edad: '+68', detalle: 'Mixto', icono: 'pareja' },
];

export const HORARIOS = [
  {
    titulo: 'Martes y jueves',
    hora: '18:00 a 20:00 h',
    lugar: 'SUM Enrique Abello con Bulnes',
    direccion: 'Av. Bulnes 01306, esquina Enrique Abello, Punta Arenas',
    embed: 'SUM Enrique Abello con Bulnes, Punta Arenas, Chile',
    mapa: 'https://www.google.com/maps/search/?api=1&query=SUM+Enrique+Abello+con+Bulnes%2C+Punta+Arenas',
  },
  {
    titulo: 'Sábados',
    hora: '10:00 a 12:00 h',
    lugar: 'Gimnasio Escuela 18 de Septiembre',
    direccion: 'Gaspar Marin 0140, Punta Arenas',
    embed: 'Escuela 18 de Septiembre, Gaspar Marin 0140, Punta Arenas, Chile',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Escuela+18+de+Septiembre%2C+Punta+Arenas',
  },
];

// Sesiones de entrenamiento para la cuenta regresiva de la barra superior
// (día de la semana 0=domingo…6=sábado, hora de inicio y término)
export const ENTRENAMIENTOS = [
  { dia: 2, h: 18, hFin: 20 },
  { dia: 4, h: 18, hFin: 20 },
  { dia: 6, h: 10, hFin: 12 },
];

/* ✏️ Bolso: cada caja tiene tooltip (tip). Textos fáciles de editar. */
export const LLEVAR = [
  { t: 'Ropa cómoda y de deporte', tip: 'Ropa holgada y fresca te deja moverte y estirarte con libertad.' },
  { t: 'Zapatillas de suela limpia para gimnasio', tip: 'La suela limpia cuida el piso del gimnasio y te da buen agarre.' },
  { t: 'Botella de agua', tip: 'Hidratarte antes, durante y después te mantiene con energía.' },
  { t: 'Rodilleras', opcional: true, tip: 'Protegen tus rodillas al agacharte; el club te presta si no tienes.' },
  { t: 'Toalla pequeña', tip: 'Para secarte el sudor y quedar cómodo durante la jornada.' },
  { t: 'Ropa de recambio', opcional: true, tip: 'Una polera seca para el final te deja abrigado y confortable.' },
  { t: 'Protector solar', opcional: true, tip: 'Imprescindible en actividades al aire libre bajo el cielo patagónico.' },
  { t: '¡Ganas de pasarlo muy bien!', tip: 'Lo único imprescindible: venir con ánimo de compartir y reír.' },
];

export const EQUIPO = [
  { nombre: 'Mario Díaz Vásquez', cargo: 'Presidente' },
  { nombre: 'Valeria Scabini Vrsalovic', cargo: 'Secretaria' },
  { nombre: 'Pamela Gross Poll', cargo: 'Tesorera' },
  { nombre: 'Manuel Alvarez Saldivia', cargo: 'Entrenador' },
  { nombre: 'Sigrid Sánchez', cargo: 'Profesora' },
];

/* ⚠️ EJEMPLO – REEMPLAZAR POR TESTIMONIO REAL */
export const TESTIMONIOS = [
  { nombre: 'María', cat: 'categoría +50', texto: 'Llegué sin saber nada y me recibieron con un abrazo. Hoy el Newcom es mi remedio y mi alegría de la semana.' },
  { nombre: 'Juan', cat: 'categoría +68', texto: 'Pensé que a mi edad ya no se podía jugar. Me equivoqué: aquí vuelvo a sentirme vivo y hasta compito.' },
  { nombre: 'Rosa', cat: 'categoría +60', texto: 'Más que un equipo, encontré una familia. Los martes y jueves son sagrados: nadie me quita mi entrenamiento.' },
  { nombre: 'Carolina', cat: 'categoría +40', texto: 'Venía del vóley y me encantó el ambiente. Se ríen, se esfuerzan y se cuidan entre todos. El Newcom nos une.' },
  { nombre: 'Pedro', cat: 'categoría +68', texto: 'El médico me dijo que me moviera más. Aquí me muevo, me río, hago amigos y de paso ganamos partidos.' },
  { nombre: 'Ana', cat: 'categoría +50', texto: 'Llegué por salud y me quedé por la amistad. Es mi hora sagrada de la semana y mi segunda familia.' },
];

export const FAQ = [
  { q: '¿Necesito experiencia para jugar?', a: '¡Para nada! La mayoría de nuestras y nuestros jugadores llegó sin haber tocado una pelota. En tu primera clase te enseñamos todo con paciencia y cariño.' },
  { q: '¿Hay límite de edad?', a: 'No. Tenemos categorías desde +40 hasta +68, y si tu edad no calza exactamente, igual te esperamos: todas las edades caben en este equipo.' },
  { q: '¿Tiene costo participar?', a: 'El club funciona con el esfuerzo y aporte de su comunidad. Para conocer si existe alguna cuota vigente, escríbenos por WhatsApp y te contamos al tiro, con total transparencia.' },
  { q: '¿Puedo ir a probar antes de inscribirme?', a: '¡Claro que sí! Reserva tu clase de prueba en el formulario de esta página o mándanos un WhatsApp, y te esperamos en el próximo entrenamiento.' },
  { q: 'Tengo una limitación física, ¿puedo jugar?', a: 'El Newcom es un juego adaptado y amable. Cuéntanos tu situación por WhatsApp y te orientamos: aquí lo importante es que todos puedan moverse y disfrutar a su ritmo.' },
  { q: '¿Qué tengo que llevar a mi primera clase?', a: 'Ropa cómoda, zapatillas de suela limpia, agua y ganas de pasarlo bien. Las rodilleras son opcionales. Nosotros te prestamos la pelota y te enseñamos el resto.' },
  { q: '¿Cuándo y dónde entrenan?', a: 'Martes y jueves de 18:00 a 20:00 h en el SUM Enrique Abello con Bulnes, y sábados de 10:00 a 12:00 h en el Gimnasio Escuela 18 de Septiembre, en Punta Arenas.' },
  { q: '¿Puedo unirme a mitad de año?', a: 'Siempre. El grupo recibe gente nueva todo el año: no hay que esperar a ninguna fecha especial. ¡Ven cuando puedas, te recibimos con los brazos abiertos!' },
];

export const TEXTOS_LEGALES: Record<string, string> = {
  privacidad:
    '<div class="borrador">BORRADOR LEY 21.719 — PENDIENTE DE REVISIÓN POR ABOGADO ANTES DE PUBLICAR.</div>' +
    '<h3>1. Responsable del tratamiento</h3><p>[NOMBRE DEL CLUB] · RUT: [RUT] · Correo de contacto: [CORREO DE CONTACTO] (clubdeportivo.18@gmail.com). Domicilio: Punta Arenas, Región de Magallanes, Chile.</p>' +
    '<h3>2. Datos personales que recogemos</h3><ul><li>Nombre.</li><li>Teléfono (WhatsApp).</li><li>Rango de edad y día de interés (formulario de clase de prueba).</li><li>Mensaje opcional que decidas enviarnos.</li></ul>' +
    '<h3>3. Finalidad del tratamiento</h3><p>Gestionar tu solicitud de clase de prueba, contactarte por WhatsApp o llamada para coordinar tu visita, y responder tus consultas sobre el club.</p>' +
    '<h3>4. Base de licitud</h3><p>Tu consentimiento expreso, manifestado al marcar la casilla de aceptación del formulario (art. 4 y ss., Ley N° 21.719).</p>' +
    '<h3>5. Plazo de conservación</h3><p>Los datos se conservan únicamente durante el tiempo necesario para gestionar tu clase de prueba y, como máximo, 6 meses desde tu solicitud, salvo que decidas integrarte al club y pasar a los registros de socios.</p>' +
    '<h3>6. Tus derechos</h3><p>Puedes ejercer los derechos de <strong>acceso, rectificación, supresión, oposición, portabilidad y bloqueo</strong> de tus datos, enviando un correo a [CORREO DE CONTACTO] indicando tu nombre y la solicitud. Respondemos dentro de los plazos legales (máx. 30 días hábiles, art. 14 Ley 21.719).</p>' +
    '<h3>7. Reclamos</h3><p>Sin perjuicio de lo anterior, tienes derecho a reclamar ante la autoridad competente en protección de datos personales de Chile.</p>' +
    '<h3>8. Destinatarios y transferencias</h3><p>No vendemos ni cedemos tus datos a terceros. El mensaje se envía a través de WhatsApp del club; la mensajería se realiza por la plataforma que elijas al abrir el enlace.</p>',
  terminos:
    '<div class="borrador">BORRADOR — PENDIENTE DE REVISIÓN POR ABOGADO ANTES DE PUBLICAR.</div>' +
    '<h3>1. Sobre este sitio</h3><p>Este sitio es informativo y de captación de nuevos jugadores del [NOMBRE DEL CLUB]. Su uso no genera relación contractual alguna.</p>' +
    '<h3>2. Formularios</h3><p>Los datos enviados se utilizan solo para gestionar tu clase de prueba, conforme a la Política de Privacidad. El botón de reserva abre WhatsApp con un mensaje prellenado; el envío final depende de ti en la aplicación.</p>' +
    '<h3>3. Propiedad intelectual</h3><p>Los contenidos, logo e imágenes del club están protegidos.</p>' +
    '<h3>4. Responsabilidad</h3><p>El club se reserva el derecho de modificar horarios, sedes y actividades informadas en este sitio.</p>',
  accesibilidad:
    '<h3>Declaración de accesibilidad</h3><p>Este sitio se diseñó para cumplir WCAG 2.1 AA: texto base 18 px, contraste AA, navegación por teclado, foco visible, y un panel de ajustes propios (tamaño de texto hasta 200 %, alto contraste, escala de grises, filtros de daltonismo, fuente legible, espaciado, resaltado de enlaces, pausa de animaciones, guía de lectura, cursor grande y lectura en voz alta).</p><p>Si tienes alguna dificultad para usar el sitio, escríbenos a clubdeportivo.18@gmail.com o por WhatsApp; te ayudaremos con gusto.</p>',
};

export const TITULOS_MODALES: Record<string, string> = {
  privacidad: 'Política de Privacidad (Ley 21.719)',
  terminos: 'Términos de Uso',
  accesibilidad: 'Declaración de Accesibilidad',
};

// JSON-LD para SEO (se inyecta en el <head> como estático)
export function jsonLdSportsClub() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsClub',
    name: 'Club Deportivo Newcom Escuela 18 de Septiembre',
    sport: 'Newcom (tátumbol, vóleibol adaptado)',
    foundingDate: '2025-04-12',
    email: CONTACTO.email,
    telephone: CONTACTO.telefonos[0],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Punta Arenas',
      addressRegion: 'Magallanes',
      addressCountry: 'CL',
    },
    sameAs: [
      'https://web.facebook.com/people/Club-Deportivo-Newcom-18-de-Septiembre/61572076650262/',
      'https://www.instagram.com/newcom.escuela18desep.puq/',
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Thursday'], opens: '18:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '12:00' },
    ],
  };
}

export function jsonLdFaqPage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
