/* ============================================================================
   CASA LOBELIE — GUEST GUIDE — LOGICA APPLICAZIONE
   Router leggero via hash (#/lingua/sezione), rendering e interazioni.
   Non è necessario modificare questo file per aggiornare i contenuti:
   per quello usate content.js (dati) e i18n.js (testi di interfaccia).
   ============================================================================ */
(function () {
  "use strict";

  var DATA = window.GUEST_DATA;
  var I18N = window.GUEST_I18N;
  var LANGS = window.GUEST_LANGS;
  var STORAGE_LANG_KEY = "cl_guest_lang";

  var appEl = document.getElementById("app");
  var headerEl = document.getElementById("appHeader");
  var headerSubrowEl = document.getElementById("headerSubrow");
  var headerTitleEl = document.getElementById("headerTitle");
  var backBtnEl = document.getElementById("backBtn");
  var langSwitchEl = document.getElementById("langSwitch");
  var waFloatingEl = document.getElementById("waFloating");

  /* ---------------- helpers ---------------- */
  function tr(field, lang) {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang] || field.it || "";
  }

  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  function mapsDirUrl(destination, travelmode) {
    var url = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(destination);
    if (travelmode) url += "&travelmode=" + travelmode;
    return url;
  }

  function waUrl(number, message) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  function detectInitialLang() {
    try {
      var stored = localStorage.getItem(STORAGE_LANG_KEY);
      if (stored && LANGS.indexOf(stored) !== -1) return stored;
    } catch (e) {}
    var nav = (navigator.language || "it").slice(0, 2).toLowerCase();
    return LANGS.indexOf(nav) !== -1 ? nav : "it";
  }

  /* ---------------- icons (linear, minimal) ---------------- */
  var ICONS = {
    wifi: '<path d="M2 8.5c5.5-5.3 14.5-5.3 20 0"/><path d="M5.5 12.2c3.6-3.4 9.4-3.4 13 0"/><path d="M9 15.8c1.9-1.7 4.1-1.7 6 0"/><circle cx="12" cy="19" r="1"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M14 9l2.5 2.5"/>',
    keyOut: '<circle cx="8" cy="15" r="4"/><path d="M11 12l9-9"/><path d="M17 6l3 3"/><path d="M14 9l2.5 2.5"/><path d="M3 21l3-3"/>',
    compass: '<circle cx="12" cy="12" r="9.5"/><path d="M15 9l-2 5.5L8 16l2-5.5z"/>',
    hotTub: '<path d="M3 15h18"/><path d="M3 15v3a3 3 0 003 3h12a3 3 0 003-3v-3"/><path d="M6 15V8a2 2 0 012-2h1"/><path d="M12 4c-1.2 1-1.2 2 0 3s1.2 2 0 3"/>',
    house: '<path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/><path d="M10 20v-5h4v5"/>',
    parking: '<rect x="4" y="3.5" width="16" height="17" rx="3"/><path d="M9.5 16V8h3a2.75 2.75 0 010 5.5h-3"/>',
    utensils: '<path d="M7 3v7a2 2 0 002 2v9"/><path d="M7 3v5"/><path d="M10 3v5"/><path d="M17 3c-1.7 0-3 1.8-3 5s1 5 3 5v8"/>',
    bag: '<path d="M6 8h12l1 12a2 2 0 01-2 2H7a2 2 0 01-2-2z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
    landmark: '<path d="M4 21h16"/><path d="M5 21V10"/><path d="M19 21V10"/><path d="M3 10l9-6 9 6"/><path d="M9 21v-6"/><path d="M15 21v-6"/>',
    gift: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M3.5 12.5h17"/><path d="M12 9v11"/><path d="M12 9C9.5 9 8 7.6 8 6.3 8 5.1 9 4 10.2 4 11.7 4 12 6.2 12 9z"/><path d="M12 9c2.5 0 4-1.4 4-2.7C16 5.1 15 4 13.8 4 12.3 4 12 6.2 12 9z"/>',
    warning: '<path d="M12 3.5L2.5 20h19z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="1"/>',
    chat: '<path d="M4 5h16v11H8l-4 4z"/>',
    arrowLeft: '<path d="M15 5l-7 7 7 7"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    whatsapp: '<path fill="currentColor" stroke="none" d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.1-.2.2-.3.3-.4.1-.2 0-.4 0-.5-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s1 2.5 1.1 2.6c.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3z"/><path d="M12 3a9 9 0 00-7.7 13.6L3 21l4.5-1.2A9 9 0 1012 3z"/>',
    phone: '<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.9 21 3 12.1 3 1.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1z"/>',
    pin: '<path d="M12 21s7-6.3 7-11.5A7 7 0 105 9.5C5 14.7 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
    moon: '<path d="M20 14.5A8.5 8.5 0 1110 3.8a6.5 6.5 0 0010 10.7z"/>',
    noSmoking: '<circle cx="12" cy="12" r="9.5"/><path d="M5.5 5.5l13 13"/><path d="M3 14h9"/><path d="M14 14h2"/><path d="M17.5 14v-2"/><path d="M20.5 14v-3"/>',
    noFood: '<circle cx="12" cy="12" r="9.5"/><path d="M5.5 5.5l13 13"/><path d="M9 9v6"/><path d="M15 8v3.5a1.5 1.5 0 003 0V8"/>',
    car: '<path d="M4 16V11l2-5h12l2 5v5"/><path d="M4 16h16"/><circle cx="7.5" cy="16" r="1.5"/><circle cx="16.5" cy="16" r="1.5"/>',
    flower: '<circle cx="12" cy="12" r="2.2"/><circle cx="12" cy="6.5" r="2.2"/><circle cx="12" cy="17.5" r="2.2"/><circle cx="6.5" cy="12" r="2.2"/><circle cx="17.5" cy="12" r="2.2"/>',
    heart: '<path d="M12 20s-7.5-4.8-9.5-9.4C1.3 7.3 3 4.5 6 4c2-.3 3.6.7 6 3.2C14.4 4.7 16 3.7 18 4c3 .5 4.7 3.3 3.5 6.6C19.5 15.2 12 20 12 20z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    sparkles: '<path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    bus: '<rect x="4" y="4" width="16" height="12.5" rx="2.5"/><path d="M4 12h16"/><circle cx="8" cy="19" r="1.3"/><circle cx="16" cy="19" r="1.3"/>',
    droplet: '<path d="M12 3.5s6 6.6 6 11a6 6 0 01-12 0c0-4.4 6-11 6-11z"/>',
    alertTriangle: '<path d="M12 3.5L2.5 20h19z"/><path d="M12 9.5v4.5"/><circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none"/>',
    powerOff: '<path d="M12 3v7"/><path d="M6.3 6.3a8 8 0 1011.4 0"/>',
    train: '<rect x="6" y="3.5" width="12" height="13" rx="4"/><path d="M6 12h12"/><path d="M9 20l-2 2M15 20l2 2"/><circle cx="9.3" cy="14.2" r=".9" fill="currentColor" stroke="none"/><circle cx="14.7" cy="14.2" r=".9" fill="currentColor" stroke="none"/>',
    home: '<path d="M4 11.5L12 4l8 7.5"/><path d="M6 10v9a1 1 0 001 1h10a1 1 0 001-1v-9"/>',
    download: '<path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/>',
    printer: '<path d="M7 8V4h10v4"/><rect x="5" y="8" width="14" height="7" rx="1.5"/><path d="M7 15h10v6H7z"/>'
  };
  function icon(name, extraClass) {
    var body = ICONS[name] || "";
    return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" viewBox="0 0 24 24" aria-hidden="true">' + body + "</svg>";
  }

  /* ---------------- state ---------------- */
  var state = { lang: detectInitialLang(), section: "home" };

  /* ---------------- routing ---------------- */
  function parseHash() {
    var h = window.location.hash.replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    var lang = LANGS.indexOf(parts[0]) !== -1 ? parts[0] : null;
    var section = lang ? (parts[1] || "home") : (parts[0] || "home");
    if (!lang) lang = state.lang;
    return { lang: lang, section: section };
  }

  function buildHash(lang, section) {
    return "#/" + lang + "/" + (section || "home");
  }

  function navigate(lang, section, replace) {
    var hash = buildHash(lang, section);
    if (replace) {
      window.location.replace(window.location.pathname + window.location.search + hash);
    } else {
      window.location.hash = hash;
    }
  }

  window.addEventListener("hashchange", function () {
    var parsed = parseHash();
    state.lang = parsed.lang;
    state.section = parsed.section;
    try { localStorage.setItem(STORAGE_LANG_KEY, state.lang); } catch (e) {}
    render();
    window.scrollTo(0, 0);
  });

  /* ---------------- render: header ---------------- */
  function renderHeader() {
    var t = I18N[state.lang];
    var isHome = state.section === "home";
    backBtnEl.classList.toggle("visible", !isHome);
    headerEl.classList.toggle("is-inner", !isHome);
    headerSubrowEl.hidden = isHome;
    headerTitleEl.textContent = isHome ? "" : (t.nav[state.section] || t.appTitle);

    langSwitchEl.innerHTML = LANGS.map(function (l) {
      return '<button type="button" data-lang="' + l + '" class="' + (l === state.lang ? "active" : "") + '" aria-label="' + esc(I18N[l].langName) + '">' + l.toUpperCase() + "</button>";
    }).join("");

    Array.prototype.forEach.call(langSwitchEl.querySelectorAll("button"), function (btn) {
      btn.addEventListener("click", function () {
        var newLang = btn.getAttribute("data-lang");
        state.lang = newLang;
        try { localStorage.setItem(STORAGE_LANG_KEY, newLang); } catch (e) {}
        navigate(newLang, state.section, true);
        state.section = parseHash().section;
        render();
      });
    });
  }

  backBtnEl.addEventListener("click", function () {
    navigate(state.lang, "home");
  });

  /* ---------------- render: sections ---------------- */
  var NAV_ITEMS = [
    { key: "wifi", icon: "wifi" },
    { key: "checkin", icon: "key" },
    { key: "checkout", icon: "keyOut" },
    { key: "transport", icon: "compass" },
    { key: "relax", icon: "hotTub" },
    { key: "house", icon: "house" },
    { key: "parking", icon: "parking" },
    { key: "eat", icon: "utensils" },
    { key: "shopping", icon: "bag" },
    { key: "rome", icon: "landmark" },
    { key: "stay", icon: "gift" },
    { key: "rules", icon: "warning" },
    { key: "emergency", icon: "warning" },
    { key: "contact", icon: "chat" }
  ];
  var QUICK_ITEMS = ["wifi", "checkin", "checkout", "transport"];

  function sectionHead(t, key, subtitle) {
    return (
      '<div class="section-head"><h1>' + esc(t.nav[key] || t[key].title || "") + "</h1>" +
      (subtitle ? "<p>" + esc(subtitle) + "</p>" : "") +
      "</div>"
    );
  }

  var DURING_STAY_ITEMS = ["relax", "transport", "rules"];
  var NEED_SOMETHING_ITEMS = ["stay", "emergency", "contact"];

  function listRow(key, lang, t) {
    var item = NAV_ITEMS.filter(function (n) { return n.key === key; })[0];
    return '<a class="list-row" href="' + buildHash(lang, key) + '">' +
      '<span class="icon-wrap">' + icon(item.icon) + '</span>' +
      '<span class="content"><span class="label">' + esc(t.nav[key]) + '</span><span class="desc">' + esc(t.navDesc[key]) + '</span></span>' +
      '<span class="chev">' + icon("arrowLeft") + '</span></a>';
  }

  function renderHome() {
    var t = I18N[state.lang];
    var lang = state.lang;
    var html = "";
    html += '<div class="hero-welcome"><h1>' + esc(t.welcomeTitle) + "</h1><p>" + esc(t.welcomeSubtitle) + "</p></div>";

    html += '<div class="quick-row">';
    QUICK_ITEMS.forEach(function (key) {
      var item = NAV_ITEMS.filter(function (n) { return n.key === key; })[0];
      var label = key === "transport" ? t.quickAccessArrival : t.nav[key];
      html += '<a class="quick-btn" href="' + buildHash(lang, key) + '"><span class="icon-wrap">' + icon(item.icon) + "</span>" + esc(label) + "</a>";
    });
    html += "</div>";

    html += '<div class="section-title-row"><h2>' + esc(t.allSections) + "</h2></div>";
    html += '<div class="card-grid">';
    NAV_ITEMS.forEach(function (item) {
      html += '<a class="grid-card" href="' + buildHash(lang, item.key) + '"><span class="icon-wrap">' + icon(item.icon) + '</span><span class="label">' + esc(t.nav[item.key]) + '</span><span class="desc">' + esc(t.navDesc[item.key]) + '</span></a>';
    });
    html += "</div>";

    html += '<div class="section-title-row"><h2>' + esc(t.duringStayTitle) + "</h2></div>";
    html += '<div class="list-rows">';
    DURING_STAY_ITEMS.forEach(function (key) { html += listRow(key, lang, t); });
    html += "</div>";

    html += '<div class="section-title-row"><h2>' + esc(t.needSomethingTitle) + "</h2></div>";
    html += '<div class="list-rows">';
    NEED_SOMETHING_ITEMS.forEach(function (key) { html += listRow(key, lang, t); });
    html += "</div>";

    html += '<div class="install-hint">' + icon("home") + "<span>" + esc(t.installApp) + "</span></div>";
    return html;
  }

  function renderWifi() {
    var t = I18N[state.lang].wifi;
    var wifi = DATA.wifi;
    var html = sectionHead(I18N[state.lang], "wifi", t.subtitle);
    html += '<div class="panel wifi-box">';
    html += '<div class="wifi-field"><span><span class="label">' + esc(t.network) + '</span><span class="value">' + esc(wifi.ssid) + "</span></span></div>";
    if (wifi.password) {
      html += '<div class="wifi-field"><span><span class="label">' + esc(t.password) + '</span><span class="value" id="wifiPasswordValue">' + esc(wifi.password) + '</span></span>' +
        '<button type="button" class="wifi-copy-btn" id="copyWifiBtn" aria-label="' + esc(t.copy) + '">' + icon("copy") + "</button></div>";
      html += '<div class="wifi-qr" id="wifiQrWrap"><div id="wifiQrCanvas"></div><span style="font-size:.8rem;color:var(--ink-soft);">' + esc(t.qrHint) + "</span></div>";
    } else {
      html += '<div class="notice">' + esc(t.notSet) + "</div>";
    }
    html += "</div>";
    return html;
  }

  function afterRenderWifi() {
    var wifi = DATA.wifi;
    var t = I18N[state.lang].wifi;
    var copyBtn = document.getElementById("copyWifiBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = wifi.password;
        var done = function () {
          copyBtn.innerHTML = icon("check");
          setTimeout(function () { copyBtn.innerHTML = icon("copy"); }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text); done(); });
        } else {
          fallbackCopy(text);
          done();
        }
      });
    }
    var qrWrap = document.getElementById("wifiQrCanvas");
    if (qrWrap && window.QRCode && wifi.password) {
      var wifiString = "WIFI:T:WPA;S:" + wifi.ssid + ";P:" + wifi.password + ";;";
      new QRCode(qrWrap, { text: wifiString, width: 148, height: 148, colorDark: "#3a2a20", colorLight: "#ffffff" });
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
  }

  function renderCheckin() {
    var tAll = I18N[state.lang];
    var t = tAll.checkin;
    var html = sectionHead(tAll, "checkin");
    html += '<div class="panel">';
    html += '<div class="stat-pill">' + icon("clock") + esc(DATA.hours.checkin) + "</div>";
    html += "<p>" + esc(t.text) + "</p>";
    html += "</div>";
    return html;
  }

  function renderCheckout() {
    var tAll = I18N[state.lang];
    var t = tAll.checkout;
    var html = sectionHead(tAll, "checkout");
    html += '<div class="panel">';
    html += '<div class="stat-pill">' + icon("clock") + esc(DATA.hours.checkout) + "</div>";
    html += '<ul class="steps-list">';
    t.steps.forEach(function (step, i) {
      html += "<li><span class=\"num\">" + (i + 1) + "</span><span>" + esc(step) + "</span></li>";
    });
    html += "</ul></div>";
    return html;
  }

  function renderTransport() {
    var tAll = I18N[state.lang];
    var t = tAll.transport;
    var lang = state.lang;
    var tr_ = DATA.transport;
    var html = sectionHead(tAll, "transport", t.subtitle);

    html += '<div class="panel">';
    html += '<div class="btn-row" style="margin-bottom:18px;">';
    html += '<a class="btn btn-primary" href="' + mapsDirUrl(DATA.property.address) + '" target="_blank" rel="noopener">' + icon("compass") + t.openRoute + "</a>";
    html += "</div>";

    html += '<h3 style="font-size:1rem;margin-bottom:6px;">' + icon("bus", "") + " " + esc(t.busTitle) + "</h3>";
    html += "<p style=\"color:var(--ink-soft);font-size:.9rem;margin:0 0 6px;\">" + esc(tr(tr_.bus.distance, lang)) + "</p>";
    html += "<p style=\"color:var(--ink-soft);font-size:.88rem;margin:0 0 12px;\">" + esc(tr(tr_.bus.note, lang)) + "</p>";
    html += '<div class="btn-row" style="margin-bottom:20px;"><a class="btn btn-outline" href="' + mapsDirUrl(tr_.bus.mapsQuery, "transit") + '" target="_blank" rel="noopener">' + icon("bus") + t.bus + "</a></div>";

    html += '<h3 style="font-size:1rem;margin-bottom:6px;">' + icon("train", "") + " " + esc(t.metroTitle) + "</h3>";
    html += "<p style=\"color:var(--ink-soft);font-size:.9rem;margin:0 0 6px;\">" + esc(tr(tr_.metro.distance, lang)) + "</p>";
    html += "<p style=\"color:var(--ink-soft);font-size:.88rem;margin:0 0 12px;\">" + esc(tr(tr_.metro.note, lang)) + "</p>";
    html += '<div class="btn-row" style="margin-bottom:20px;"><a class="btn btn-outline" href="' + mapsDirUrl(tr_.metro.mapsQuery, "transit") + '" target="_blank" rel="noopener">' + icon("train") + t.metro + "</a></div>";

    html += '<h3 style="font-size:1rem;margin-bottom:6px;">' + icon("car", "") + " " + t.taxi + "</h3>";
    html += "<p style=\"color:var(--ink-soft);font-size:.88rem;margin:0 0 12px;\">" + esc(tr(tr_.taxiNote, lang)) + "</p>";
    html += '<div class="btn-row"><a class="btn btn-outline" href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent("taxi vicino a " + DATA.property.address) + '" target="_blank" rel="noopener">' + icon("car") + t.taxi + "</a></div>";
    html += "</div>";
    return html;
  }

  function relaxChecklist(items, lang) {
    var html = '<ul class="mini-list">';
    items.forEach(function (it) {
      html += "<li>" + icon("check") + "<span>" + esc(tr(it, lang)) + "</span></li>";
    });
    return html + "</ul>";
  }

  function renderRelax() {
    var tAll = I18N[state.lang];
    var t = tAll.relax;
    var lang = state.lang;
    var r = DATA.relax;
    var html = sectionHead(tAll, "relax");

    // Orario ben visibile in cima, come richiesto.
    html += '<div class="stat-pill" style="font-size:1.05rem;padding:13px 22px;">' + icon("hotTub") + esc(DATA.hours.jacuzzi) + "</div>";

    html += '<details class="accordion" open><summary><span style="display:flex;align-items:center;gap:10px;">' + icon("droplet") + esc(t.beforeEntering) + '</span>' + icon("arrowLeft", "chev") + '</summary><div class="accordion-body">' + relaxChecklist(r.beforeEntering, lang) + "</div></details>";

    html += '<details class="accordion"><summary><span style="display:flex;align-items:center;gap:10px;">' + icon("hotTub") + esc(t.duringUse) + '</span>' + icon("arrowLeft", "chev") + '</summary><div class="accordion-body">' + relaxChecklist(r.duringUse, lang) + "</div></details>";

    html += '<details class="accordion"><summary><span style="display:flex;align-items:center;gap:10px;">' + icon("check") + esc(t.afterUse) + '</span>' + icon("arrowLeft", "chev") + '</summary><div class="accordion-body">' + relaxChecklist(r.afterUse, lang) + "</div></details>";

    html += '<details class="accordion" open><summary><span style="display:flex;align-items:center;gap:10px;">' + icon("alertTriangle") + esc(t.importantRules) + '</span>' + icon("arrowLeft", "chev") + '</summary><div class="accordion-body">' + relaxChecklist(r.importantRules, lang) + "</div></details>";

    // Avviso molto evidente ma non aggressivo.
    html += '<div class="relax-warning"><span class="icon-wrap">' + icon("powerOff") + '</span><div><span class="relax-warning-label">' + esc(t.warningLabel) + '</span><p>' + esc(tr(r.bigWarning, lang)) + "</p></div></div>";

    // Problemi o dubbi? -> WhatsApp (stesso numero già configurato nel sito).
    html += '<div class="panel" style="text-align:center;margin-top:20px;">';
    html += '<h3 style="font-size:1rem;color:var(--terracotta-deep);margin-bottom:14px;">' + esc(t.problemsTitle) + "</h3>";
    html += '<a class="btn btn-primary" href="' + waUrl(DATA.property.whatsappNumber, tr(r.whatsappProblemMessage, lang)) + '" target="_blank" rel="noopener">' + icon("whatsapp") + t.whatsappButton + "</a>";
    html += "</div>";
    return html;
  }

  function renderHouse() {
    var tAll = I18N[state.lang];
    var t = tAll.house;
    var lang = state.lang;
    var html = sectionHead(tAll, "house");
    var order = ["aircon", "heating", "kitchen", "espresso", "bathroom", "bedroom", "wifi", "waste"];
    order.forEach(function (key) {
      var body = "";
      if (key === "bedroom") {
        body = esc(tr(DATA.house.bedroom.config, lang)) + " " + esc(tr(DATA.house.bedroom.mattress, lang));
      } else if (key === "wifi") {
        body = I18N[lang].wifi.network + ": " + esc(DATA.wifi.ssid) + '. <a href="' + buildHash(lang, "wifi") + '" style="color:var(--terracotta-deep);font-weight:700;">' + I18N[lang].wifi.title + " →</a>";
      } else {
        body = esc(t.genericComingSoon);
      }
      html += '<details class="accordion"><summary>' + esc(t.sections[key]) + icon("arrowLeft", "chev") + '</summary><div class="accordion-body">' + body + "</div></details>";
    });
    return html;
  }

  function renderParking() {
    var tAll = I18N[state.lang];
    var t = tAll.parking;
    var html = sectionHead(tAll, "parking");
    html += '<div class="panel">';
    html += '<ul class="mini-list" style="font-size:.98rem;">';
    html += "<li>" + icon("check") + "<span>" + esc(t.free) + "</span></li>";
    html += "<li>" + icon("warning") + "<span>" + esc(t.noPrivate) + "</span></li>";
    html += "</ul></div>";
    return html;
  }

  function renderRules() {
    var tAll = I18N[state.lang];
    var t = tAll.rules;
    var lang = state.lang;
    var html = sectionHead(tAll, "rules", t.subtitle);
    html += '<div class="rules-grid">';
    DATA.rules.forEach(function (r) {
      html += '<div class="rule-card"><span class="icon-wrap">' + icon(r.icon === "no-smoking" ? "noSmoking" : r.icon === "no-food" ? "noFood" : r.icon === "hot-tub" ? "hotTub" : r.icon) + "</span><p>" + esc(tr(r.text, lang)) + "</p></div>";
    });
    html += "</div>";
    return html;
  }

  function placeCard(place, lang, t) {
    var html = '<div class="place-card">';
    html += '<span class="badge">' + esc(tr(place.category, lang)) + "</span>";
    html += "<h3>" + esc(place.name) + "</h3>";
    if (place.description) html += "<p>" + esc(tr(place.description, lang)) + "</p>";
    if (place.distance) html += '<div class="dist">' + esc(tr(place.distance, lang)) + "</div>";
    html += '<div class="btn-row">';
    html += '<a class="btn btn-outline" href="' + mapsDirUrl(place.mapsQuery || place.name) + '" target="_blank" rel="noopener">' + icon("pin") + t.directions + "</a>";
    if (place.phone) html += '<a class="btn btn-ghost" href="tel:' + place.phone + '">' + icon("phone") + t.call + "</a>";
    html += "</div></div>";
    return html;
  }

  function emptyState(text) {
    return '<div class="empty-state"><span class="icon-wrap">' + icon("utensils") + "</span><p>" + esc(text) + "</p></div>";
  }

  function renderEat() {
    var tAll = I18N[state.lang];
    var t = tAll.eat;
    var lang = state.lang;
    var html = sectionHead(tAll, "eat", t.subtitle);
    if (!DATA.restaurants.length) {
      html += emptyState(t.empty);
    } else {
      DATA.restaurants.forEach(function (r) { html += placeCard(r, lang, t); });
    }
    return html;
  }

  function renderShopping() {
    var tAll = I18N[state.lang];
    var t = tAll.shopping;
    var lang = state.lang;
    var html = sectionHead(tAll, "shopping", t.subtitle);
    if (!DATA.shopping.length) {
      html += emptyState(t.empty);
    } else {
      DATA.shopping.forEach(function (r) { html += placeCard(r, lang, t); });
    }
    return html;
  }

  window.guestImgFallback = function (imgEl, label) {
    var div = document.createElement("div");
    div.className = "photo-fallback";
    div.textContent = label;
    imgEl.replaceWith(div);
  };

  function renderRome() {
    var tAll = I18N[state.lang];
    var t = tAll.rome;
    var lang = state.lang;
    var html = sectionHead(tAll, "rome", t.subtitle);
    DATA.romeHighlights.forEach(function (place) {
      var name = tr(place.name, lang);
      html += '<div class="rome-card">';
      html += '<img class="photo" src="' + esc(place.image) + '" alt="' + esc(name) + '" loading="lazy" data-fallback-label="' + esc(name) + '">';
      html += '<div class="body"><h3>' + esc(name) + "</h3>";
      html += "<p>" + esc(tr(place.description, lang)) + "</p>";
      html += '<div class="getting-there">' + esc(tr(place.gettingThere, lang)) + "</div>";
      html += '<a class="btn btn-primary" href="' + mapsDirUrl(place.mapsQuery) + '" target="_blank" rel="noopener">' + icon("compass") + t.openRoute + "</a>";
      html += "</div></div>";
    });
    return html;
  }

  function renderStay() {
    var tAll = I18N[state.lang];
    var t = tAll.stay;
    var lang = state.lang;
    var html = sectionHead(tAll, "stay", t.subtitle);
    DATA.extraServices.forEach(function (s) {
      var name = tr(s.name, lang);
      var msg = state.lang === "it" ? "Ciao Mario, vorrei richiedere: " + name : "Hi Mario, I'd like to request: " + name;
      html += '<div class="service-card"><span class="icon-wrap">' + icon(s.icon) + '</span><div class="content">';
      html += "<h3>" + esc(name) + "</h3>";
      html += "<p>" + esc(tr(s.description, lang)) + "</p>";
      html += '<span class="price">' + (s.price ? esc(s.price) : esc(t.priceOnRequest)) + "</span>";
      html += '<a class="btn btn-primary" href="' + waUrl(DATA.property.whatsappNumber, msg) + '" target="_blank" rel="noopener">' + icon("whatsapp") + t.request + "</a>";
      html += "</div></div>";
    });
    return html;
  }

  function renderEmergency() {
    var tAll = I18N[state.lang];
    var t = tAll.emergency;
    var html = sectionHead(tAll, "emergency");
    html += '<div class="emergency-number"><span><span class="lab">' + esc(t.numberLabel) + '</span><br><span class="num">' + esc(DATA.property.emergencyNumber) + '</span></span><a class="call-btn" href="tel:' + esc(DATA.property.emergencyNumber) + '" aria-label="' + esc(t.call) + '">' + icon("phone") + "</a></div>";
    html += '<div class="panel"><h3 style="font-size:.95rem;color:var(--terracotta-deep);margin-bottom:10px;">' + esc(t.otherTitle) + "</h3>";
    if (!DATA.property.otherContacts.length) {
      html += '<p style="color:var(--ink-soft);font-size:.88rem;margin:0;">' + esc(t.otherEmpty) + "</p>";
    } else {
      html += '<ul class="mini-list">';
      DATA.property.otherContacts.forEach(function (c) {
        html += '<li>' + icon("phone") + '<span>' + esc(tr(c.label, state.lang)) + ' — <a href="tel:' + esc(c.phone) + '" style="color:var(--terracotta-deep);font-weight:700;">' + esc(c.phone) + "</a></span></li>";
      });
      html += "</ul>";
    }
    html += "</div>";
    return html;
  }

  function renderContact() {
    var tAll = I18N[state.lang];
    var t = tAll.contact;
    var html = '<div class="panel contact-card">';
    html += '<div class="avatar-ring">' + icon("chat") + "</div>";
    html += "<h2>" + esc(t.title) + "</h2>";
    html += '<div class="since">' + esc(t.hostSince) + "</div>";
    html += "<p class=\"lead\">" + esc(t.subtitle) + "</p>";
    html += '<a class="btn btn-primary" href="' + waUrl(DATA.property.whatsappNumber, tAll.whatsappDefaultMessage) + '" target="_blank" rel="noopener">' + icon("whatsapp") + t.whatsappButton + "</a>";
    html += "</div>";
    return html;
  }

  var RENDERERS = {
    home: renderHome,
    wifi: renderWifi,
    checkin: renderCheckin,
    checkout: renderCheckout,
    transport: renderTransport,
    relax: renderRelax,
    house: renderHouse,
    parking: renderParking,
    rules: renderRules,
    eat: renderEat,
    shopping: renderShopping,
    rome: renderRome,
    stay: renderStay,
    emergency: renderEmergency,
    contact: renderContact
  };

  function renderWhatsappFloating() {
    var t = I18N[state.lang];
    waFloatingEl.innerHTML =
      '<div class="wa-floating-inner">' +
      '<a class="wa-fab" href="' + waUrl(DATA.property.whatsappNumber, t.whatsappDefaultMessage) + '" target="_blank" rel="noopener" aria-label="' + esc(t.whatsappFloating) + '">' +
      icon("whatsapp") + "</a>" +
      '<span class="wa-fab-label">' + esc(t.whatsappFloating) + '</span>' +
      "</div>";
  }

  function render() {
    var renderer = RENDERERS[state.section] || renderHome;
    document.documentElement.setAttribute("lang", state.lang);
    appEl.innerHTML = '<div class="view">' + renderer() + "</div>";
    renderHeader();
    renderWhatsappFloating();
    if (state.section === "wifi") afterRenderWifi();
    if (state.section === "rome") afterRenderRome();
  }

  function afterRenderRome() {
    Array.prototype.forEach.call(appEl.querySelectorAll("img[data-fallback-label]"), function (img) {
      img.addEventListener("error", function () {
        guestImgFallback(img, img.getAttribute("data-fallback-label"));
      });
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    var parsed = parseHash();
    state.lang = parsed.lang;
    state.section = parsed.section;
    if (!window.location.hash) {
      navigate(state.lang, "home", true);
    }
    render();

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/guest/sw.js", { scope: "/guest/" }).catch(function () {});
      });
    }
  }

  init();
})();
