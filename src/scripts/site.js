// ============================================================
// INTERACTIVIDAD DEL SITIO · Club Deportivo Newcom
// El contenido (categorías, horarios, equipo, FAQ, etc.) ya
// viene renderizado en HTML desde Astro; aquí solo vive el
// comportamiento: menús, galería, carrusel, formulario, modal
// legal, panel de accesibilidad y parallax.
// ============================================================
import { WHATSAPP_NUMBER, TEXTOS_LEGALES, TITULOS_MODALES, ENTRENAMIENTOS } from '../data/contenido';

(function () {
  'use strict';

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var reduceMov = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ══════════ ACORDEONES ══════════ */
  function initAcordeones() {
    document.addEventListener('click', function (ev) {
      var b = ev.target.closest('.acordeon-btn');
      if (!b) return;
      var box = b.closest('.acordeon');
      var abierto = box.classList.contains('abierto');
      box.classList.toggle('abierto', !abierto);
      b.setAttribute('aria-expanded', String(!abierto));
    });
  }

  /* ══════════ MEGA MENÚS: hover con retardos + teclado + clic ══════════ */
  var navItems = $$('.nav-item');
  function cerrarMega(item, ya) {
    var b = $('.nav-btn', item);
    clearTimeout(item._tA);
    if (ya) {
      item.classList.remove('mega-abierto');
      b.setAttribute('aria-expanded', 'false');
    } else {
      item._tC = setTimeout(function () {
        item.classList.remove('mega-abierto');
        b.setAttribute('aria-expanded', 'false');
      }, 250);
    }
  }
  function abrirMegaItem(item, ya) {
    var b = $('.nav-btn', item);
    clearTimeout(item._tC);
    navItems.forEach(function (o) { if (o !== item) cerrarMega(o, true); });
    if (ya) {
      item.classList.add('mega-abierto');
      b.setAttribute('aria-expanded', 'true');
    } else {
      clearTimeout(item._tA);
      item._tA = setTimeout(function () {
        item.classList.add('mega-abierto');
        b.setAttribute('aria-expanded', 'true');
      }, 120);
    }
  }
  navItems.forEach(function (item) {
    var b = $('.nav-btn', item);
    item.addEventListener('mouseenter', function () { abrirMegaItem(item, false); });
    item.addEventListener('mouseleave', function () { cerrarMega(item, false); });
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      /* El botón es un enlace (#sección): cierra el mega y deja navegar */
      cerrarMega(item, true);
    });
    b.addEventListener('focus', function (e) { if (e.detail === 0) abrirMegaItem(item, true); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        abrirMegaItem(item, true);
        var l = $('.mega a', item);
        if (l) l.focus();
      }
    });
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) cerrarMega(item, true);
    });
    $('.mega', item).addEventListener('click', function (e) {
      if (e.target.closest('a')) cerrarMega(item, false);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) navItems.forEach(function (o) { cerrarMega(o, true); });
  });
  /* Abrir pregunta específica desde mega Preguntas */
  document.addEventListener('click', function (e) {
    var l = e.target.closest('[data-abrefaq]');
    if (!l) return;
    var i = l.getAttribute('data-abrefaq');
    setTimeout(function () {
      var box = document.getElementById('faqb' + i);
      if (box && !box.closest('.acordeon').classList.contains('abierto')) {
        box.closest('.acordeon').classList.add('abierto');
        box.setAttribute('aria-expanded', 'true');
      }
    }, 80);
  });

  /* ══════════ MENÚ MÓVIL ══════════ */
  var menuMovil = $('#menuMovil'), btnMovil = $('#btnMenuMovil');
  function abrirMovil() {
    menuMovil.classList.add('abierto');
    btnMovil.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    $('#btnCerrarMovil').focus();
  }
  function cerrarMovil() {
    if (!menuMovil.classList.contains('abierto')) return;
    menuMovil.classList.remove('abierto');
    btnMovil.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  btnMovil.addEventListener('click', abrirMovil);
  $('#btnCerrarMovil').addEventListener('click', cerrarMovil);
  menuMovil.addEventListener('click', function (e) {
    var bb = e.target.closest('.mm-bloque>button');
    if (bb) {
      var ab = bb.getAttribute('aria-expanded') === 'true';
      bb.setAttribute('aria-expanded', String(!ab));
      bb.parentElement.classList.toggle('abierto', !ab);
      return;
    }
    if (e.target.closest('a')) cerrarMovil();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      navItems.forEach(function (o) { cerrarMega(o, true); });
      cerrarMovil();
      cerrarA11y();
      cerrarModal();
      cerrarTips();
    }
    if (e.altKey && (e.key === 'a' || e.key === 'A')) {
      e.preventDefault();
      toggleA11y();
    }
  });

  /* ══════════ SCROLLSPY ══════════ */
  var spyMap = {};
  $$('[data-spylist]').forEach(function (c) {
    c.getAttribute('data-spylist').split(',').forEach(function (id) { spyMap[id.trim()] = c; });
  });
  var spyObs = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) {
        Object.keys(spyMap).forEach(function (k) { spyMap[k].classList.toggle('activa', k === en.target.id); });
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  Object.keys(spyMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) spyObs.observe(el);
  });

  /* ══════════ REVELADO + línea de tiempo ══════════ */
  var revObs = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        revObs.unobserve(en.target);
      }
    });
  }, { threshold: .15 });
  function observarRev() {
    $$('.rev').forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 90 + 'ms';
      if (reduceMov) { el.classList.add('visible'); } else revObs.observe(el);
    });
    var tl = $('#timeline');
    if (tl) {
      if (reduceMov) tl.classList.add('visible'); else revObs.observe(tl);
    }
  }
  window.addEventListener('load', function () {
    $$('.aparecer').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('visible'); }, 150 + i * 140);
    });
  });

  /* ══════════ TOOLTIPS bolso: hover caja, foco, tap, Esc ══════════ */
  function cerrarTips() {
    $$('.llevar-lista li.tip-abierto').forEach(function (w) { w.classList.remove('tip-abierto'); });
  }
  function posTip(li) {
    var r = li.getBoundingClientRect();
    li.classList.toggle('tip-abajo', r.top < 170);
  }
  document.addEventListener('click', function (e) {
    var li = e.target.closest('.llevar-lista li');
    if (li) {
      var estaba = li.classList.contains('tip-abierto');
      cerrarTips();
      if (!estaba) {
        posTip(li);
        li.classList.add('tip-abierto');
      }
      return;
    }
    if (!e.target.closest('.tip')) cerrarTips();
  });
  $$('.llevar-lista li').forEach(function (li) {
    li.addEventListener('mouseenter', function () { posTip(li); });
    li.addEventListener('focus', function () { posTip(li); });
  });

  /* ══════════ GALERÍA ══════════ */
  var galIndice = 0, galPausa = false, galHover = false, galTimer = null, lbAbierto = false;
  var galImgs = function () { return $$('.g-img', $('#galeriaMarco')); };
  function galIr(i) {
    var imgs = galImgs();
    var n = imgs.length;
    if (!n) return;
    galIndice = (i + n) % n;
    imgs.forEach(function (im, k) { im.classList.toggle('activa', k === galIndice); });
    $$('#galeriaPuntos button').forEach(function (b, k) { b.setAttribute('aria-current', String(k === galIndice)); });
    var cap = $('#galeriaCapTexto');
    if (cap && imgs[galIndice] && imgs[galIndice].dataset.cap) {
      cap.textContent = imgs[galIndice].dataset.cap;
    }
  }
  function galAuto() {
    if (galTimer) clearInterval(galTimer);
    galTimer = setInterval(function () {
      if (reduceMov || galPausa || galHover || lbAbierto || document.hidden || a11y.pausar) return;
      galIr(galIndice + 1);
    }, 6000);
  }

  /* ══════════ FORMULARIO ══════════ */
  var form = $('#formInscripcion');
  $$('input[name=edad]').forEach(function (r) {
    r.addEventListener('change', function () {
      $('#sugEdad').textContent = r.dataset.sug + ' (referencial, te lo confirmamos al contactarte).';
    });
  });
  function proximaFecha(diaSem) {
    var hoy = new Date();
    var d = new Date(hoy);
    var diff = (diaSem - hoy.getDay() + 7) % 7;
    if (diff === 0) diff = 7;
    d.setDate(hoy.getDate() + diff);
    return new Intl.DateTimeFormat('es-CL', { weekday: 'long', day: 'numeric', month: 'long' }).format(d);
  }
  $$('input[name=dia]').forEach(function (r) {
    r.addEventListener('change', function () {
      $('#proximaFecha').innerHTML = '📅 Próxima clase: <u>' + proximaFecha(+r.dataset.dias) + '</u>';
      $('#cDia').classList.remove('con-error');
    });
  });
  function marcarError(id, conError) {
    $(id).classList.toggle('con-error', conError);
    return conError;
  }
  function datosForm() {
    var dia = form.querySelector('input[name=dia]:checked');
    var exp = form.querySelector('input[name=exp]:checked');
    var edad = form.querySelector('input[name=edad]:checked');
    return {
      nombre: $('#fNombre').value.trim(),
      edad: edad ? edad.value : '',
      tel: $('#fTel').value.replace(/\s/g, ''),
      dia: dia ? dia.value : '',
      diaTexto: dia ? ((dia.closest('label') || dia).querySelector('.dia-caja strong').textContent + ' ' + (dia.closest('label') || dia).querySelector('.dia-caja small').textContent) : '',
      exp: exp ? exp.value : '',
      mensaje: $('#fMensaje').value.trim()
    };
  }
  function mensajeWa(d) {
    var lineas = ['¡Hola! Quiero reservar mi clase de prueba de Newcom 🏐', '', 'Nombre: ' + d.nombre];
    if (d.edad) lineas.push('Edad: ' + d.edad);
    lineas.push('Día elegido: ' + d.diaTexto);
    lineas.push('Teléfono: +569 ' + d.tel);
    if (d.exp) lineas.push('Experiencia: ' + d.exp);
    if (d.mensaje) lineas.push('Mensaje: ' + d.mensaje);
    return encodeURIComponent(lineas.join('\n'));
  }
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    if (form.empresa.value) return;
    var d = datosForm();
    var e1 = marcarError('#cNombre', d.nombre.length < 2);
    var e2 = marcarError('#cTel', !/^\d{8}$/.test(d.tel));
    var e3 = marcarError('#cDia', !d.dia);
    var e4 = marcarError('#cConsent', !$('#fConsent').checked);
    if (e1 || e2 || e3 || e4) {
      var primero = $(e1 ? '#fNombre' : e2 ? '#fTel' : e3 ? '#cDia' : '#fConsent');
      if (primero) primero.focus();
      return;
    }
    window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + mensajeWa(d), '_blank', 'noopener');
  });

  /* ══════════ CARRUSEL DE TESTIMONIOS ══════════ */
  var track = $('#carruselTrack'), autoTimer = null, pausaUsuario = false, hoverPausa = false, indiceActual = 0;
  function tarjetas() { return $$('.t-card', track); }
  function anchoTarjeta() {
    var t = tarjetas()[0];
    return t ? t.getBoundingClientRect().width + 20 : 1;
  }
  function irA(i, suave) {
    var n = tarjetas().length;
    if (!n) return;
    indiceActual = (i + n) % n;
    track.scrollTo({ left: indiceActual * anchoTarjeta(), behavior: (suave && !reduceMov) ? 'smooth' : 'auto' });
  }
  $('#btnCarrSig').addEventListener('click', function () { irA(indiceActual + 1, true); });
  $('#btnCarrAnt').addEventListener('click', function () { irA(indiceActual - 1, true); });
  $('#carruselPuntos').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) irA(+b.dataset.i, true);
  });
  track.addEventListener('scroll', function () {
    var i = Math.round(track.scrollLeft / anchoTarjeta());
    if (i !== indiceActual) indiceActual = i;
    actualizarPuntos();
  }, { passive: true });
  function actualizarPuntos() {
    $$('#carruselPuntos button').forEach(function (b, i) {
      b.setAttribute('aria-current', String(i === indiceActual));
    });
  }
  function autoPlay() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () {
      if (reduceMov || pausaUsuario || hoverPausa || document.hidden || a11y.pausar) return;
      irA(indiceActual + 1, true);
    }, 7000);
  }
  track.addEventListener('pointerenter', function () { hoverPausa = true; });
  track.addEventListener('pointerleave', function () { hoverPausa = false; });
  track.addEventListener('focusin', function () { hoverPausa = true; });
  track.addEventListener('focusout', function () { hoverPausa = false; });
  track.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); irA(indiceActual + 1, true); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); irA(indiceActual - 1, true); }
  });

  /* ══════════ CONTADORES ══════════ */
  var contObs = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (!en.isIntersecting) return;
      contObs.unobserve(en.target);
      var fin = +en.target.dataset.fin;
      if (reduceMov) { en.target.textContent = fin + '+'; return; }
      var t0 = performance.now();
      (function paso(t) {
        var p = Math.min(1, (t - t0) / 1400);
        en.target.textContent = Math.round(fin * p) + (p === 1 ? '+' : '');
        if (p < 1) requestAnimationFrame(paso);
      })(t0);
    });
  }, { threshold: .5 });
  $$('.contador').forEach(function (c) { contObs.observe(c); });

  /* ══════════ MODAL LEGAL ══════════ */
  var modal = $('#modalLegal'), modalDialog = $('.modal-dialog', modal), ultimoFoco = null;
  function abrirModal(clave) {
    var html = TEXTOS_LEGALES[clave];
    if (!html) return;
    ultimoFoco = document.activeElement;
    $('#modalTitulo').textContent = TITULOS_MODALES[clave] || 'Información';
    $('#modalCuerpo').innerHTML = html;
    modal.hidden = false;
    document.body.classList.add('modal-abierto');
    $('#modalCerrar').focus();
  }
  function cerrarModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-abierto');
    if (ultimoFoco) ultimoFoco.focus();
  }
  document.addEventListener('click', function (e) {
    var op = e.target.closest('[data-modal]');
    if (op) {
      e.preventDefault();
      abrirModal(op.getAttribute('data-modal'));
      return;
    }
    if (e.target.closest('[data-cerrar-modal]') || e.target.closest('#modalCerrar')) cerrarModal();
  });
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = $$('button,a,[tabindex="0"]', modalDialog).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });

  /* ══════════ PANEL A11Y ══════════ */
  var ESCALAS = [100, 112.5, 125, 150, 175, 200];
  var a11y = { nivel: 1, contraste: 'normal', grises: false, dalton: 'off', fuente: false, espaciado: false, resaltar: false, pausar: reduceMov, img: false, cursor: false, guia: false };
  try {
    var g = localStorage.getItem('newcomA11y');
    if (g) a11y = Object.assign(a11y, JSON.parse(g));
  } catch (e) { /* noop */ }
  function guardar() {
    try { localStorage.setItem('newcomA11y', JSON.stringify(a11y)); } catch (e) { /* noop */ }
  }
  function aplicar() {
    var h = document.documentElement;
    h.style.fontSize = ESCALAS[a11y.nivel] + '%';
    $('#txtNivel').textContent = Math.round(ESCALAS[a11y.nivel]) + ' %';
    h.dataset.contraste = a11y.contraste;
    $('#conNormal').setAttribute('aria-pressed', String(a11y.contraste === 'normal'));
    $('#conAlto').setAttribute('aria-pressed', String(a11y.contraste === 'alto'));
    $('#conInv').setAttribute('aria-pressed', String(a11y.contraste === 'invertido'));
    var filtros = [];
    if (a11y.contraste === 'invertido') filtros.push('invert(1) hue-rotate(180deg)');
    if (a11y.grises) filtros.push('grayscale(1)');
    if (a11y.dalton !== 'off') filtros.push('url(#f-' + a11y.dalton + ')');
    if (filtros.length) {
      h.style.setProperty('--filtro', filtros.join(' '));
      h.classList.add('con-filtro');
    } else {
      h.classList.remove('con-filtro');
    }
    h.classList.toggle('a11y-fuente', a11y.fuente);
    h.classList.toggle('a11y-espaciado', a11y.espaciado);
    h.classList.toggle('a11y-resaltar', a11y.resaltar);
    h.classList.toggle('a11y-pausar', a11y.pausar);
    h.classList.toggle('a11y-ocultarimg', a11y.img);
    h.classList.toggle('a11y-cursor', a11y.cursor);
    $('#swGrises').setAttribute('aria-pressed', String(a11y.grises));
    $('#selDalton').value = a11y.dalton;
    $('#swFuente').setAttribute('aria-pressed', String(a11y.fuente));
    $('#swEspaciado').setAttribute('aria-pressed', String(a11y.espaciado));
    $('#swResaltar').setAttribute('aria-pressed', String(a11y.resaltar));
    $('#swPausar').setAttribute('aria-pressed', String(a11y.pausar));
    $('#swImg').setAttribute('aria-pressed', String(a11y.img));
    $('#swCursor').setAttribute('aria-pressed', String(a11y.cursor));
    $('#swGuia').setAttribute('aria-pressed', String(a11y.guia));
    $('#guiaLectura').style.display = a11y.guia ? 'block' : 'none';
    guardar();
  }
  var panel = $('#panelA11y'), btnA = $('#btnA11y');
  function toggleA11y() {
    var ab = panel.hidden;
    panel.hidden = !ab;
    btnA.setAttribute('aria-expanded', String(ab));
    if (ab) $('#txtMas').focus();
  }
  function cerrarA11y() {
    if (!panel.hidden) {
      panel.hidden = true;
      btnA.setAttribute('aria-expanded', 'false');
    }
  }
  btnA.addEventListener('click', toggleA11y);
  document.addEventListener('click', function (e) {
    if (!panel.hidden && !e.target.closest('#panelA11y') && !e.target.closest('#btnA11y')) cerrarA11y();
  });
  $('#txtMenos').addEventListener('click', function () { a11y.nivel = Math.max(0, a11y.nivel - 1); aplicar(); });
  $('#txtMas').addEventListener('click', function () { a11y.nivel = Math.min(ESCALAS.length - 1, a11y.nivel + 1); aplicar(); });
  $('#txtNormal').addEventListener('click', function () { a11y.nivel = 1; aplicar(); });
  $('#conNormal').addEventListener('click', function () { a11y.contraste = 'normal'; aplicar(); });
  $('#conAlto').addEventListener('click', function () { a11y.contraste = 'alto'; aplicar(); });
  $('#conInv').addEventListener('click', function () { a11y.contraste = 'invertido'; aplicar(); });
  $('#swGrises').addEventListener('click', function () { a11y.grises = !a11y.grises; aplicar(); });
  $('#selDalton').addEventListener('change', function () { a11y.dalton = this.value; aplicar(); });
  $('#swFuente').addEventListener('click', function () { a11y.fuente = !a11y.fuente; aplicar(); });
  $('#swEspaciado').addEventListener('click', function () { a11y.espaciado = !a11y.espaciado; aplicar(); });
  $('#swResaltar').addEventListener('click', function () { a11y.resaltar = !a11y.resaltar; aplicar(); });
  $('#swPausar').addEventListener('click', function () { a11y.pausar = !a11y.pausar; aplicar(); });
  $('#swImg').addEventListener('click', function () { a11y.img = !a11y.img; aplicar(); });
  $('#swCursor').addEventListener('click', function () { a11y.cursor = !a11y.cursor; aplicar(); });
  $('#swGuia').addEventListener('click', function () { a11y.guia = !a11y.guia; aplicar(); });
  $('#btnResetA11y').addEventListener('click', function () {
    a11y = { nivel: 1, contraste: 'normal', grises: false, dalton: 'off', fuente: false, espaciado: false, resaltar: false, pausar: reduceMov, img: false, cursor: false, guia: false };
    aplicar();
  });
  window.addEventListener('pointermove', function (e) {
    if (a11y.guia) $('#guiaLectura').style.top = (e.clientY - 36) + 'px';
  }, { passive: true });
  window.addEventListener('touchmove', function (e) {
    if (a11y.guia && e.touches[0]) $('#guiaLectura').style.top = (e.touches[0].clientY - 36) + 'px';
  }, { passive: true });
  function hablar(t) {
    if (!('speechSynthesis' in window)) {
      alert('Tu dispositivo no soporta lectura en voz alta.');
      return;
    }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t);
    u.lang = 'es-CL';
    u.rate = .95;
    speechSynthesis.speak(u);
  }
  $('#btnLeerSel').addEventListener('click', function () {
    var s = window.getSelection() ? window.getSelection().toString() : '';
    hablar(s || 'Selecciona primero el texto que quieras escuchar.');
  });
  var seccionVisible = 'inicio';
  var secObs = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) seccionVisible = en.target.id;
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  $$('section,footer').forEach(function (s) { secObs.observe(s); });
  $('#btnLeerSec').addEventListener('click', function () {
    var s = document.getElementById(seccionVisible);
    if (s) hablar(s.innerText.slice(0, 1500));
  });
  $('#btnVozOff').addEventListener('click', function () {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  });

  /* ══════════ INIT ══════════ */
  initAcordeones();
  actualizarPuntos();
  observarRev();
  $('#galeriaPuntos').addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (b) galIr(+b.dataset.i);
  });
  $('#btnGalAnt').addEventListener('click', function () { galIr(galIndice - 1); });
  $('#btnGalSig').addEventListener('click', function () { galIr(galIndice + 1); });

  /* Lightbox: click en la foto → se amplía (galería y mosaico) */
  var lb = $('#lightboxGal'), lbFocoPrevio = null, lbSet = [], lbIdx = 0, lbEnGaleria = false;
  function lbPintar() {
    var im = lbSet[lbIdx];
    if (!im) return;
    $('#lbImg').src = im.currentSrc || im.src;
    $('#lbImg').alt = im.alt;
    $('#lbCap').textContent = im.dataset.cap || im.alt || '';
  }
  function lbAbrirDesde(set, i, enGaleria) {
    if (lbAbierto || !set || !set.length) return;
    lbFocoPrevio = document.activeElement;
    lbSet = set; lbIdx = i; lbEnGaleria = enGaleria;
    lbPintar();
    lbAbierto = true;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbCerrar').focus();
  }
  function lbCerrar() {
    if (!lbAbierto) return;
    lbAbierto = false;
    lb.hidden = true;
    document.body.style.overflow = '';
    if (lbFocoPrevio && lbFocoPrevio.focus) lbFocoPrevio.focus();
  }
  function lbMover(d) {
    if (lbEnGaleria) { galIr(galIndice + d); lbIdx = galIndice; }
    else { lbIdx = (lbIdx + d + lbSet.length) % lbSet.length; }
    lbPintar();
  }
  $('#galeriaMarco').addEventListener('click', function () { lbAbrirDesde(galImgs(), galIndice, true); });
  $('#galeriaMarco').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbAbrirDesde(galImgs(), galIndice, true); }
  });
  /* Mosaico: cada foto abre el lightbox con las fotos del mosaico */
  var mosaicoFotos = $$('.mosaico-track img');
  mosaicoFotos.forEach(function (im, k) {
    im.addEventListener('click', function () { lbAbrirDesde(mosaicoFotos, k, false); });
    im.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); lbAbrirDesde(mosaicoFotos, k, false); }
    });
  });
  $('#lbCerrar').addEventListener('click', lbCerrar);
  $('#lbAnt').addEventListener('click', function () { lbMover(-1); });
  $('#lbSig').addEventListener('click', function () { lbMover(1); });
  lb.addEventListener('click', function (e) { if (e.target.closest('[data-lb-cerrar]')) lbCerrar(); });
  lb.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.stopPropagation(); lbCerrar(); return; }
    if (e.key === 'ArrowLeft') { lbMover(-1); return; }
    if (e.key === 'ArrowRight') { lbMover(1); return; }
    if (e.key !== 'Tab') return;
    var f = $$('button', lb).filter(function (x) { return x.offsetParent !== null; });
    if (!f.length) return;
    var primero = f[0], ultimo = f[f.length - 1];
    if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
  });
  $('#galeriaMarco').addEventListener('pointerenter', function () { galHover = true; });
  $('#galeriaMarco').addEventListener('pointerleave', function () { galHover = false; });
  $('#galeriaMarco').addEventListener('focusin', function () { galHover = true; });
  $('#galeriaMarco').addEventListener('focusout', function () { galHover = false; });
  galAuto();
  autoPlay();
  aplicar();

  /* Parallax del fondo del footer */
  (function () {
    var f = $('.cierre'), fo = $('.cierre-fondo');
    if (!f || !fo || reduceMov) return;
    var pend = false;
    function mover() {
      pend = false;
      if (a11y.pausar) {
        fo.style.setProperty('--parallax', '0px');
        return;
      }
      var r = f.getBoundingClientRect(), vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      var prog = (vh - r.top) / (vh + r.height);
      fo.style.setProperty('--parallax', ((prog - .5) * r.height * .35).toFixed(1) + 'px');
    }
    function pedir() {
      if (!pend) {
        pend = true;
        requestAnimationFrame(mover);
      }
    }
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    pedir();
  })();

  /* ══════════ HEADER QUE SE ENCOGE AL HACER SCROLL ══════════ */
  var header = $('#header');
  if (header) {
    var pendienteHdr = false;
    var aplicarHdr = function () {
      pendienteHdr = false;
      header.classList.toggle('compacto', window.scrollY > 50);
    };
    var pedirHdr = function () {
      if (!pendienteHdr) { pendienteHdr = true; requestAnimationFrame(aplicarHdr); }
    };
    window.addEventListener('scroll', pedirHdr, { passive: true });
    aplicarHdr();
  }

  /* ══════════ BARRA SUPERIOR: CUENTA AL PRÓXIMO ENTRENAMIENTO ══════════ */
  function proximoEntreno() {
    var ahora = new Date();
    var enCurso = false, prox = null;
    for (var i = 0; i < 8 && !enCurso; i++) {
      var d = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate() + i);
      for (var j = 0; j < ENTRENAMIENTOS.length; j++) {
        var e = ENTRENAMIENTOS[j];
        if (d.getDay() !== e.dia) continue;
        var ini = new Date(d.getFullYear(), d.getMonth(), d.getDate(), e.h, 0, 0, 0);
        var fin = new Date(d.getFullYear(), d.getMonth(), d.getDate(), e.hFin, 0, 0, 0);
        if (ahora >= ini && ahora < fin) { enCurso = true; break; }
        if (ini > ahora && (!prox || ini < prox)) prox = ini;
      }
    }
    return { enCurso: enCurso, fecha: prox };
  }
  function textoCuenta() {
    var p = proximoEntreno();
    if (p.enCurso) return '¡Ahora estamos jugando! Ven a entrenar';
    if (!p.fecha) return 'Próximo entrenamiento: te avisamos pronto';
    var min = Math.max(1, Math.floor((p.fecha - new Date()) / 60000));
    var dias = Math.floor(min / 1440);
    var horas = Math.floor((min % 1440) / 60);
    var resto;
    if (dias >= 1) resto = dias + (dias === 1 ? ' día' : ' días') + (horas ? ' ' + horas + ' h' : '');
    else if (horas >= 1) resto = horas + (horas === 1 ? ' hora' : ' horas') + ' ' + (min % 60) + ' min';
    else resto = min + ' min';
    return 'Próximo entrenamiento en ' + resto;
  }
  function pintarCuenta() {
    var el = $('#tbCuentaTexto');
    if (el) el.textContent = textoCuenta();
  }
  pintarCuenta();
  setInterval(pintarCuenta, 30000);

  var anioEl = $('#anioFooter');
  if (anioEl) anioEl.textContent = String(new Date().getFullYear());
})();
