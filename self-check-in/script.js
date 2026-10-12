/* ============================================================================
   CASA LOBELIE — SELF CHECK-IN — LOGICA E TRADUZIONI
   - Lingue: le stesse della Guest Guide (it, en, es, fr).
   - Routing via hash, come la Guest Guide:
       (nessun hash)  → schermata di selezione lingua
       #/it  #/en ... → guida nella lingua scelta
       #/lingua       → ritorno esplicito alla schermata di selezione
   - La lingua scelta resta valida per la sessione (sessionStorage):
     non viene richiesta di nuovo mentre l'ospite consulta la guida.
   - La lingua del browser NON viene mai usata per saltare la scelta.
   SICUREZZA: questo file non contiene e non deve contenere il codice della
   cassetta portachiavi. Il codice viene inviato agli ospiti via SMS.
   ============================================================================ */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "393335638730"; // stesso numero usato in tutto il sito
  var LANGS = ["it", "en", "es", "fr"];
  var SESSION_KEY = "cl_selfcheckin_lang";
  var GATE_HASH = "#/lingua";

  var T = {
    it: {
      langName: "Italiano",
      pageTitle: "Self Check-in — Casa Lobelie",
      title: "Benvenuti a Casa Lobelie",
      subtitle: "La guida al vostro self check-in",
      intro: "Seguite questi semplici passaggi per accedere all'appartamento in completa autonomia. In pochi minuti sarete a casa!",
      s1title: "Ritirate le chiavi 🔑",
      s1p1: "Accanto al cancello esterno troverete una cassetta portachiavi nera.",
      smsLabel: "Codice via SMS",
      s1p2: "Il codice per aprire la cassetta vi verrà inviato tramite SMS al numero di cellulare indicato al momento della prenotazione.",
      s1p3: "Inserite il codice ricevuto, aprite la cassetta e ritirate le chiavi.",
      s2title: "Entrate dal cancello",
      s2p1: "Utilizzate la chiave per aprire il cancello esterno ed entrare nel cortile.",
      s3title: "Entrate a Casa Lobelie",
      s3p1: "Raggiungete il pianerottolo e individuate la porta con la targhetta Casa Lobelie.",
      s3p2: "Utilizzate la chiave dell'appartamento per entrare.",
      keysTitle: "Le vostre chiavi 🔑",
      keysP1: "Conservate le chiavi per tutta la durata del soggiorno: vi serviranno per entrare e uscire liberamente.",
      keysP2: "Al momento del check-out, le chiavi dovranno essere riconsegnate seguendo le indicazioni ricevute.",
      helpTitle: "Avete bisogno di aiuto?",
      helpText: "Se avete difficoltà durante il self check-in, contattateci. Saremo felici di aiutarvi.",
      helpButton: "Contattaci su WhatsApp",
      waMessage: "Buongiorno, siamo ospiti di Casa Lobelie e abbiamo bisogno di assistenza per il self check-in.",
      changeLanguage: "Cambia lingua",
      footerLink: "casalobelie.it",
      enlarge: "Ingrandisci la foto",
      close: "Chiudi",
      photoMissing: "Foto non disponibile",
      alt: {
        box: "La cassetta portachiavi nera fissata sulla parete esterna arancione, accanto al cancello",
        gate: "Il cancello esterno nero e la parete su cui è installata la cassetta portachiavi",
        door: "La porta marrone dell'appartamento sul pianerottolo, con la targhetta Casa Lobelie"
      }
    },
    en: {
      langName: "English",
      pageTitle: "Self Check-in — Casa Lobelie",
      title: "Welcome to Casa Lobelie",
      subtitle: "Your Self Check-in Guide",
      intro: "Follow these simple steps to access the apartment independently. You'll feel at home in just a few minutes!",
      s1title: "Collect your keys 🔑",
      s1p1: "Next to the external gate, you will find a black key lockbox.",
      smsLabel: "Code sent by SMS",
      s1p2: "The access code will be sent via SMS to the mobile phone number provided when making your reservation.",
      s1p3: "Enter the code you received, open the lockbox and collect your keys.",
      s2title: "Enter through the gate",
      s2p1: "Use the key to unlock the external gate and enter the courtyard.",
      s3title: "Enter Casa Lobelie",
      s3p1: "Make your way to the landing and look for the door displaying the Casa Lobelie sign.",
      s3p2: "Use the apartment key to enter.",
      keysTitle: "Your keys 🔑",
      keysP1: "Please keep the keys with you throughout your stay, as you will need them to enter and leave the property.",
      keysP2: "At check-out, please return the keys according to the instructions provided.",
      helpTitle: "Need assistance?",
      helpText: "If you experience any difficulties during self check-in, please contact us. We'll be happy to help.",
      helpButton: "Contact us on WhatsApp",
      waMessage: "Hello, we are guests at Casa Lobelie and we need assistance with self check-in.",
      changeLanguage: "Change language",
      footerLink: "casalobelie.it",
      enlarge: "Enlarge photo",
      close: "Close",
      photoMissing: "Photo not available",
      alt: {
        box: "The black key lockbox mounted on the orange exterior wall, next to the gate",
        gate: "The black external gate and the wall where the key lockbox is installed",
        door: "The brown apartment door on the landing, with the Casa Lobelie sign"
      }
    },
    es: {
      langName: "Español",
      pageTitle: "Self check-in — Casa Lobelie",
      title: "Bienvenidos a Casa Lobelie",
      subtitle: "Vuestra guía de self check-in",
      intro: "Seguid estos sencillos pasos para acceder al apartamento con total autonomía. ¡En pocos minutos estaréis en casa!",
      s1title: "Recoged las llaves 🔑",
      s1p1: "Junto a la verja exterior encontraréis una caja de seguridad para llaves de color negro.",
      smsLabel: "Código por SMS",
      s1p2: "El código para abrir la caja se os enviará por SMS al número de móvil indicado al hacer la reserva.",
      s1p3: "Introducid el código recibido, abrid la caja y recoged las llaves.",
      s2title: "Entrad por la verja",
      s2p1: "Utilizad la llave para abrir la verja exterior y entrar en el patio.",
      s3title: "Entrad en Casa Lobelie",
      s3p1: "Subid hasta el rellano y buscad la puerta con la placa de Casa Lobelie.",
      s3p2: "Utilizad la llave del apartamento para entrar.",
      keysTitle: "Vuestras llaves 🔑",
      keysP1: "Conservad las llaves durante toda la estancia: las necesitaréis para entrar y salir libremente.",
      keysP2: "En el momento del check-out, deberéis devolver las llaves siguiendo las indicaciones recibidas.",
      helpTitle: "¿Necesitáis ayuda?",
      helpText: "Si tenéis alguna dificultad durante el self check-in, contactad con nosotros. Estaremos encantados de ayudaros.",
      helpButton: "Contactadnos por WhatsApp",
      waMessage: "Hola, somos huéspedes de Casa Lobelie y necesitamos ayuda con el self check-in.",
      changeLanguage: "Cambiar idioma",
      footerLink: "casalobelie.it",
      enlarge: "Ampliar la foto",
      close: "Cerrar",
      photoMissing: "Foto no disponible",
      alt: {
        box: "La caja de seguridad negra para llaves, fijada en la pared exterior naranja, junto a la verja",
        gate: "La verja exterior negra y la pared donde está instalada la caja de llaves",
        door: "La puerta marrón del apartamento en el rellano, con la placa de Casa Lobelie"
      }
    },
    fr: {
      langName: "Français",
      pageTitle: "Self check-in — Casa Lobelie",
      title: "Bienvenue à Casa Lobelie",
      subtitle: "Votre guide du self check-in",
      intro: "Suivez ces quelques étapes simples pour accéder à l'appartement en toute autonomie. Dans quelques minutes, vous serez chez vous !",
      s1title: "Récupérez les clés 🔑",
      s1p1: "À côté du portail extérieur, vous trouverez une boîte à clés noire.",
      smsLabel: "Code envoyé par SMS",
      s1p2: "Le code d'ouverture de la boîte vous sera envoyé par SMS au numéro de téléphone portable indiqué lors de la réservation.",
      s1p3: "Saisissez le code reçu, ouvrez la boîte et récupérez les clés.",
      s2title: "Entrez par le portail",
      s2p1: "Utilisez la clé pour ouvrir le portail extérieur et entrer dans la cour.",
      s3title: "Entrez à Casa Lobelie",
      s3p1: "Rejoignez le palier et repérez la porte portant la plaque Casa Lobelie.",
      s3p2: "Utilisez la clé de l'appartement pour entrer.",
      keysTitle: "Vos clés 🔑",
      keysP1: "Conservez les clés pendant toute la durée de votre séjour : elles vous permettront d'entrer et de sortir librement.",
      keysP2: "Au moment du check-out, les clés devront être restituées selon les indications reçues.",
      helpTitle: "Besoin d'aide ?",
      helpText: "Si vous rencontrez des difficultés pendant le self check-in, contactez-nous. Nous serons ravis de vous aider.",
      helpButton: "Contactez-nous sur WhatsApp",
      waMessage: "Bonjour, nous séjournons à Casa Lobelie et nous avons besoin d'aide pour le self check-in.",
      changeLanguage: "Changer de langue",
      footerLink: "casalobelie.it",
      enlarge: "Agrandir la photo",
      close: "Fermer",
      photoMissing: "Photo non disponible",
      alt: {
        box: "La boîte à clés noire fixée sur le mur extérieur orange, à côté du portail",
        gate: "Le portail extérieur noir et le mur sur lequel est installée la boîte à clés",
        door: "La porte marron de l'appartement sur le palier, avec la plaque Casa Lobelie"
      }
    }
  };

  var body = document.body;
  var gateEl = document.getElementById("langGate");
  var headerEl = document.getElementById("appHeader");
  var guideEl = document.getElementById("guide");
  var langSwitchEl = document.getElementById("langSwitch");
  var changeLangBtns = [document.getElementById("changeLangBtn"), document.getElementById("changeLangBtn2")];
  var waBtn = document.getElementById("waBtn");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var currentLang = null;
  var lastTrigger = null;

  /* ---------------- storage (protetto: può non essere disponibile) ---------------- */
  function getSessionLang() {
    try {
      var v = sessionStorage.getItem(SESSION_KEY);
      return LANGS.indexOf(v) !== -1 ? v : null;
    } catch (e) { return null; }
  }
  function setSessionLang(lang) {
    try { sessionStorage.setItem(SESSION_KEY, lang); } catch (e) {}
  }

  /* ---------------- routing ---------------- */
  function langFromHash() {
    var m = /^#\/([a-z]{2})\/?$/.exec(window.location.hash || "");
    return m && LANGS.indexOf(m[1]) !== -1 ? m[1] : null;
  }

  function route() {
    var lang = langFromHash();
    if (lang) { showGuide(lang); return; }
    if (window.location.hash === GATE_HASH) { showGate(); return; }
    // Nessun hash: se nella stessa sessione l'ospite ha già scelto, si torna
    // alla guida; altrimenti si mostra la schermata di selezione.
    var stored = getSessionLang();
    if (stored) {
      history.replaceState(null, "", "#/" + stored);
      showGuide(stored);
    } else {
      showGate();
    }
  }

  /* ---------------- schermata lingua ---------------- */
  function showGate() {
    currentLang = null;
    document.documentElement.setAttribute("lang", "it");
    document.title = "Self Check-in — Casa Lobelie";
    body.classList.add("lang-gate-active");
    gateEl.hidden = false;
    headerEl.hidden = true;
    guideEl.hidden = true;
    window.scrollTo(0, 0);
  }

  Array.prototype.forEach.call(gateEl.querySelectorAll(".lang-gate-btn"), function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      setSessionLang(lang);
      // Sostituisce la voce di cronologia: il tasto Indietro del telefono
      // non riporta in loop alla schermata lingua.
      history.replaceState(null, "", "#/" + lang);
      route();
    });
  });

  function goToGate() {
    window.location.hash = GATE_HASH;
  }
  changeLangBtns.forEach(function (b) { if (b) b.addEventListener("click", goToGate); });

  /* ---------------- guida ---------------- */
  function showGuide(lang) {
    var firstShow = currentLang === null;
    var fromGate = !gateEl.hidden;
    currentLang = lang;
    setSessionLang(lang);
    applyTranslations(lang);
    body.classList.remove("lang-gate-active");
    gateEl.hidden = true;
    headerEl.hidden = false;
    guideEl.hidden = false;
    if (firstShow) window.scrollTo(0, 0);
    if (fromGate) focusGuide();
  }

  function focusGuide() {
    var h1 = document.getElementById("scTitle");
    if (!h1) return;
    h1.setAttribute("tabindex", "-1");
    try { h1.focus({ preventScroll: true }); } catch (e) { h1.focus(); }
  }

  function applyTranslations(lang) {
    var t = T[lang];
    document.documentElement.setAttribute("lang", lang);
    document.title = t.pageTitle;

    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var key = el.getAttribute("data-i18n");
      if (typeof t[key] === "string") el.textContent = t[key];
    });

    // Foto: alt, etichetta per l'ingrandimento, testo di riserva
    Array.prototype.forEach.call(document.querySelectorAll(".sc-photo"), function (a) {
      var key = a.getAttribute("data-photo");
      var alt = t.alt[key] || "";
      var img = a.querySelector("img");
      if (img) img.alt = alt;
      a.setAttribute("aria-label", t.enlarge + ": " + alt);
      a.setAttribute("data-missing", t.photoMissing);
    });

    // Header: pulsante "cambia lingua" e selettore rapido (come Guest Guide)
    changeLangBtns.forEach(function (b) { if (b) b.setAttribute("aria-label", t.changeLanguage); });
    document.getElementById("changeLangBtn").setAttribute("title", t.changeLanguage);
    langSwitchEl.setAttribute("aria-label", t.changeLanguage);
    langSwitchEl.innerHTML = "";
    LANGS.forEach(function (l) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = l.toUpperCase();
      b.setAttribute("lang", l);
      b.setAttribute("aria-label", T[l].langName);
      if (l === lang) b.setAttribute("aria-current", "true");
      b.addEventListener("click", function () {
        if (l === currentLang) return;
        history.replaceState(null, "", "#/" + l);
        route();
        var active = langSwitchEl.querySelector('[aria-current="true"]');
        if (active) active.focus();
      });
      langSwitchEl.appendChild(b);
    });

    // WhatsApp con messaggio precompilato nella lingua scelta
    waBtn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(t.waMessage);

    lightboxClose.setAttribute("aria-label", t.close);
  }

  /* ---------------- foto: segnaposto se mancante ---------------- */
  Array.prototype.forEach.call(document.querySelectorAll(".sc-photo img"), function (img) {
    function markMissing() { img.parentNode.classList.add("is-missing"); }
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) markMissing();
  });

  /* ---------------- ingrandimento foto ---------------- */
  var supportsDialog = typeof lightbox.showModal === "function";

  Array.prototype.forEach.call(document.querySelectorAll(".sc-photo"), function (a) {
    a.addEventListener("click", function (ev) {
      if (a.classList.contains("is-missing")) { ev.preventDefault(); return; }
      if (!supportsDialog) return; // senza <dialog>: apre la foto a schermo intero nel browser
      ev.preventDefault();
      lastTrigger = a;
      lightboxImg.src = a.getAttribute("href");
      lightboxImg.alt = (a.querySelector("img") || {}).alt || "";
      lightbox.showModal();
      lightboxClose.focus();
    });
  });

  function closeLightbox() { if (lightbox.open) lightbox.close(); }
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (ev) {
    if (ev.target === lightbox || ev.target === lightboxImg) closeLightbox();
  });
  lightbox.addEventListener("close", function () {
    lightboxImg.src = "data:,";
    if (lastTrigger) lastTrigger.focus();
  });

  /* ---------------- avvio ---------------- */
  window.addEventListener("hashchange", function () {
    closeLightbox();
    route();
  });
  document.documentElement.classList.remove("sc-direct");
  route();
})();
