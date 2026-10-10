/* ============================================================================
   CASA LOBELIE — AREA OSPITE — LOGICA APPLICAZIONE
   ============================================================================
   Gestisce: rilevamento/cambio lingua, le tre schermate (login/OTP/area
   riservata), le chiamate al backend (Cloudflare Worker — mai a Smoobu
   direttamente), il rendering dei dati prenotazione e i link WhatsApp
   precompilati. Nessun dato sensibile viene mai salvato nel browser: email
   e numero prenotazione restano solo in memoria per la durata della pagina.
   ============================================================================ */
(function () {
  "use strict";

  // Dominio del backend Cloudflare Worker. Da aggiornare qui se in fase di
  // configurazione scegli un sottodominio diverso da quello di default
  // (vedi ISTRUZIONI-CONFIGURAZIONE.md).
  var API_BASE = "https://api.casalobelie.it";
  var WHATSAPP_NUMBER = "393335638730";
  var STORAGE_LANG_KEY = "cl_lang"; // solo la preferenza di lingua, nessun dato personale

  var I18N = window.AO_I18N;
  var LANGS = window.AO_LANGS;
  var BOOKING_PATHS = { it: "/prenota/", en: "/book/", es: "/reservar/", fr: "/reserver/" };

  var state = {
    lang: "it",
    email: "",
    reservationNumber: "",
    resendAvailableAt: 0,
    resendTimer: null,
    reservation: null,
  };

  function t() {
    return I18N[state.lang] || I18N.it;
  }

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORAGE_LANG_KEY);
      if (saved && LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) {}
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "it"];
    for (var i = 0; i < langs.length; i++) {
      var code = (langs[i] || "").slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) !== -1) return code;
    }
    return "it";
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function showScreen(name) {
    document.querySelectorAll("[data-ao-screen]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-ao-screen") === name);
    });
    window.scrollTo(0, 0);
  }

  function showError(screenRoot, message) {
    var el = screenRoot.querySelector("[data-ao-error]");
    if (!el) return;
    el.textContent = message || "";
    el.hidden = !message;
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = !!loading;
    btn.classList.toggle("is-loading", !!loading);
  }

  /* ---------------- rendering testi statici ---------------- */
  function renderStaticText() {
    var d = t();
    document.querySelectorAll("[data-ao-t]").forEach(function (el) {
      var key = el.getAttribute("data-ao-t");
      if (typeof d[key] === "string") el.textContent = d[key];
    });
    document.querySelectorAll("[data-ao-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-ao-placeholder");
      if (typeof d[key] === "string") el.setAttribute("placeholder", d[key]);
    });
    document.title = d.pageTitle + " — Casa Lobelie";
    var cta = document.querySelector("[data-ao-cta]");
    if (cta) cta.setAttribute("href", BOOKING_PATHS[state.lang] || "/prenota/");
  }

  /* ---------------- chiamate al backend ---------------- */
  function apiFetch(path, options) {
    options = options || {};
    options.credentials = "include"; // invia/riceve il cookie di sessione HttpOnly
    options.headers = Object.assign({ "Content-Type": "application/json" }, options.headers || {});
    return fetch(API_BASE + path + "?lang=" + state.lang, options).then(function (res) {
      return res.json().then(function (data) {
        return { status: res.status, data: data };
      });
    });
  }

  /* ---------------- SCHERMATA LOGIN ---------------- */
  function initLoginScreen() {
    var root = document.getElementById("ao-screen-login");
    var form = root.querySelector("form");
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var email = root.querySelector("#ao-email").value.trim();
      var resNum = root.querySelector("#ao-resnum").value.trim();
      showError(root, "");
      if (!email || !resNum) return;

      var btn = root.querySelector("[data-ao-submit]");
      setLoading(btn, true);
      apiFetch("/login", { method: "POST", body: JSON.stringify({ email: email, reservationNumber: resNum }) })
        .then(function (res) {
          setLoading(btn, false);
          if (res.status === 0 || !res.data) {
            showError(root, t().errorNetwork);
            return;
          }
          // La risposta e' sempre "generica" per design di sicurezza: non
          // rivela se email o numero prenotazione erano corretti. Passiamo
          // comunque alla schermata OTP, dove l'eventuale codice errato
          // verra' gestito li'.
          state.email = email;
          state.reservationNumber = resNum;
          state.resendAvailableAt = Date.now() + 60 * 1000;
          renderOtpNote();
          startResendCountdown();
          showScreen("otp");
        })
        .catch(function () {
          setLoading(btn, false);
          showError(root, t().errorNetwork);
        });
    });
  }

  function maskEmailClient(email) {
    var parts = String(email).split("@");
    if (parts.length !== 2) return email;
    var user = parts[0], domain = parts[1];
    if (user.length <= 2) return user[0] + "***@" + domain;
    return user[0] + "***" + user[user.length - 1] + "@" + domain;
  }

  function renderOtpNote() {
    var root = document.getElementById("ao-screen-otp");
    var note = root.querySelector("[data-ao-otp-note]");
    if (note) note.textContent = t().otpNote(maskEmailClient(state.email));
  }

  /* ---------------- SCHERMATA OTP ---------------- */
  function initOtpScreen() {
    var root = document.getElementById("ao-screen-otp");
    var form = root.querySelector("form");
    var backLink = root.querySelector("[data-ao-back]");
    var resendBtn = root.querySelector("[data-ao-resend]");

    backLink.addEventListener("click", function (ev) {
      ev.preventDefault();
      showError(root, "");
      showScreen("login");
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var otp = root.querySelector("#ao-otp").value.trim();
      showError(root, "");
      if (!/^\d{6}$/.test(otp)) {
        showError(root, t().errorNetwork);
        return;
      }
      var btn = root.querySelector("[data-ao-submit]");
      setLoading(btn, true);
      apiFetch("/verify", {
        method: "POST",
        body: JSON.stringify({ email: state.email, reservationNumber: state.reservationNumber, otp: otp }),
      })
        .then(function (res) {
          setLoading(btn, false);
          if (!res.data || !res.data.ok) {
            showError(root, (res.data && res.data.message) || t().errorNetwork);
            return;
          }
          loadDashboard();
        })
        .catch(function () {
          setLoading(btn, false);
          showError(root, t().errorNetwork);
        });
    });

    resendBtn.addEventListener("click", function () {
      if (Date.now() < state.resendAvailableAt) return;
      apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email: state.email, reservationNumber: state.reservationNumber }),
      }).then(function () {
        state.resendAvailableAt = Date.now() + 60 * 1000;
        startResendCountdown();
      });
    });
  }

  function startResendCountdown() {
    var root = document.getElementById("ao-screen-otp");
    var resendBtn = root.querySelector("[data-ao-resend]");
    var countdownEl = root.querySelector("[data-ao-countdown]");
    if (state.resendTimer) clearInterval(state.resendTimer);

    function tick() {
      var remaining = Math.ceil((state.resendAvailableAt - Date.now()) / 1000);
      if (remaining <= 0) {
        resendBtn.hidden = false;
        countdownEl.hidden = true;
        clearInterval(state.resendTimer);
        return;
      }
      resendBtn.hidden = true;
      countdownEl.hidden = false;
      countdownEl.textContent = t().resendCooldown(remaining);
    }
    tick();
    state.resendTimer = setInterval(tick, 1000);
  }

  /* ---------------- DASHBOARD ---------------- */
  function loadDashboard() {
    showScreen("dashboard");
    var root = document.getElementById("ao-screen-dashboard");
    root.querySelector("[data-ao-dash-body]").hidden = true;
    root.querySelector("[data-ao-loading]").hidden = false;

    apiFetch("/me", { method: "GET" }).then(function (res) {
      if (!res.data || !res.data.ok) {
        // Sessione non valida/scaduta: torniamo al login.
        showScreen("login");
        return;
      }
      state.reservation = res.data.reservation;
      renderDashboard(state.reservation);
      root.querySelector("[data-ao-loading]").hidden = true;
      root.querySelector("[data-ao-dash-body]").hidden = false;
    }).catch(function () {
      showScreen("login");
    });
  }

  function formatDate(iso) {
    if (!iso) return "—";
    try {
      var d = new Date(iso + "T00:00:00");
      var localeMap = { it: "it-IT", en: "en-GB", es: "es-ES", fr: "fr-FR" };
      return new Intl.DateTimeFormat(localeMap[state.lang] || "it-IT", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(d);
    } catch (e) {
      return iso;
    }
  }

  function formatAmount(amount, currency) {
    if (amount == null) return "—";
    try {
      var localeMap = { it: "it-IT", en: "en-GB", es: "es-ES", fr: "fr-FR" };
      return new Intl.NumberFormat(localeMap[state.lang] || "it-IT", { style: "currency", currency: currency || "EUR" }).format(amount);
    } catch (e) {
      return amount + " " + (currency || "EUR");
    }
  }

  function renderDashboard(r) {
    var d = t();
    var root = document.getElementById("ao-screen-dashboard");

    root.querySelector("[data-ao-welcome]").textContent = d.dashboardWelcome(r.guestName ? r.guestName.split(" ")[0] : "");
    root.querySelector("[data-ao-guest-name]").textContent = r.guestName || "—";
    root.querySelector("[data-ao-res-number]").textContent = r.reservationNumber;
    root.querySelector("[data-ao-checkin]").textContent = formatDate(r.arrival);
    root.querySelector("[data-ao-checkout]").textContent = formatDate(r.departure);
    root.querySelector("[data-ao-guests]").textContent = (r.guests || 0) + " " + d.guestsSuffix;
    root.querySelector("[data-ao-total]").textContent = formatAmount(r.totalAmount, r.currency);

    var statusMap = { confirmed: d.statusConfirmed, cancelled: d.statusCancelled };
    var statusEl = root.querySelector("[data-ao-status]");
    statusEl.textContent = statusMap[r.status] || d.statusUnknown;
    statusEl.className = "ao-status-pill" + (r.status === "cancelled" ? " cancelled" : "");

    var paymentMap = { paid: d.paymentPaid, unpaid: d.paymentUnpaid };
    var paymentEl = root.querySelector("[data-ao-payment]");
    paymentEl.textContent = paymentMap[r.paymentStatus] || d.paymentUnknown;
    paymentEl.className = "ao-status-pill" + (r.paymentStatus === "paid" ? " paid" : "");

    var extraEl = root.querySelector("[data-ao-extra]");
    var extraRow = root.querySelector("[data-ao-extra-row]");
    if (r.extraServices && r.extraServices.length) {
      extraEl.textContent = r.extraServices.join(", ");
      extraRow.hidden = false;
    } else {
      extraRow.hidden = true;
    }

    // Link WhatsApp precompilati con i dati reali della prenotazione.
    var name = r.guestName || "";
    var resNum = r.reservationNumber || "";
    var arrival = formatDate(r.arrival);
    setWaLink(root.querySelector("[data-ao-wa-info]"), d.waInfo(name, resNum));
    setWaLink(root.querySelector("[data-ao-wa-service]"), d.waService(name, resNum));
    setWaLink(root.querySelector("[data-ao-wa-cancel]"), d.waCancel(name, resNum, arrival));
  }

  function setWaLink(el, message) {
    if (!el) return;
    el.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  /* ---------------- GUIDA (iframe verso /guest/, invariata) ---------------- */
  function initGuideTab() {
    var tabBtn = document.getElementById("ao-guide-trigger");
    var panel = document.getElementById("ao-guide-panel");
    var iframe = document.getElementById("ao-guide-iframe");
    if (!tabBtn || !panel || !iframe) return;

    tabBtn.addEventListener("click", function (ev) {
      ev.preventDefault();
      // Caricamento "pigro": l'iframe punta a /guest/ solo al primo utilizzo,
      // per non pesare sul caricamento iniziale della dashboard.
      if (!iframe.src) iframe.src = "/guest/";
      panel.hidden = false;
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    var closeBtn = panel.querySelector("[data-ao-guide-close]");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        panel.hidden = true;
      });
    }
  }

  /* ---------------- LOGOUT ---------------- */
  function initLogout() {
    document.querySelectorAll("[data-ao-logout]").forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        apiFetch("/logout", { method: "POST" }).then(function () {
          state.email = "";
          state.reservationNumber = "";
          state.reservation = null;
          document.getElementById("ao-screen-login").querySelector("form").reset();
          showScreen("login");
        });
      });
    });
  }

  /* ---------------- SELETTORE LINGUA ---------------- */
  function initLangSwitch() {
    document.querySelectorAll("[data-ao-lang]").forEach(function (btn) {
      btn.addEventListener("click", function (ev) {
        ev.preventDefault();
        var lang = btn.getAttribute("data-ao-lang");
        if (LANGS.indexOf(lang) === -1) return;
        state.lang = lang;
        try { localStorage.setItem(STORAGE_LANG_KEY, lang); } catch (e) {}
        document.documentElement.lang = lang;
        document.querySelectorAll("[data-ao-lang]").forEach(function (b) {
          b.classList.toggle("active", b.getAttribute("data-ao-lang") === lang);
        });
        renderStaticText();
        if (state.email) renderOtpNote();
        if (state.reservation) renderDashboard(state.reservation);
      });
    });
  }

  /* ---------------- AVVIO ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    state.lang = detectLang();
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-ao-lang]").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-ao-lang") === state.lang);
    });
    renderStaticText();
    initLoginScreen();
    initOtpScreen();
    initGuideTab();
    initLogout();
    initLangSwitch();
    showScreen("login");

    // Se esiste gia' una sessione valida (l'ospite torna sulla pagina senza
    // aver fatto logout), proviamo a caricare direttamente la dashboard.
    apiFetch("/me", { method: "GET" }).then(function (res) {
      if (res.data && res.data.ok) {
        state.reservation = res.data.reservation;
        showScreen("dashboard");
        renderDashboard(state.reservation);
        document.getElementById("ao-screen-dashboard").querySelector("[data-ao-loading]").hidden = true;
        document.getElementById("ao-screen-dashboard").querySelector("[data-ao-dash-body]").hidden = false;
      }
    }).catch(function () {});
  });
})();
