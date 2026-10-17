/* ============================================================================
   CASA LOBELIE — DASHBOARD QUESTIONARI (area riservata)
   Sicurezza:
   - Accesso con Supabase Auth: email + password.
   - Il browser NON legge mai la tabella: i dati arrivano solo dalla Edge
     Function "feedback-admin", che verifica sul server il token (Supabase
     Auth) e l'ID dell'amministratore (secret ADMIN_USER_ID).
   - In questo file c'è solo la chiave PUBBLICA del progetto (anon /
     publishable), che è fatta per stare nel browser. Mai la service_role.
   - Sessione salvata in sessionStorage (si chiude con la scheda) e
     disconnessione automatica dopo 30 minuti di inattività.
   ============================================================================ */
(function () {
  "use strict";

  var CONFIG = {
    supabaseUrl: "https://adusdmsraxbtytmtxdqe.supabase.co",
    // Chiave PUBBLICA: Supabase → Project Settings → API Keys →
    // "Publishable key" (sb_publishable_…) oppure la "anon" legacy.
    supabasePublicKey: "sb_publishable_omlDqW8fPh1Du_KJrgBGTg_l54KuM3Y",
    adminFunction: "feedback-admin",
    idleLogoutMs: 30 * 60 * 1000
  };

  /* ---------------- Etichette italiane dei codici ---------------- */
  var LABELS = {
    overall_rating: { "5": "Eccellente (5)", "4": "Molto buono (4)", "3": "Buono (3)", "2": "Sufficiente (2)", "1": "Deludente (1)" },
    most_appreciated: { spa: "Vasca idromassaggio", veranda: "Veranda privata", comfort: "Comfort e pulizia", privacy: "Atmosfera e privacy", location: "Posizione", welcome: "Accoglienza" },
    improvements: { perfect: "Tutto perfetto così", cleanliness: "Pulizia", bed: "Comfort del letto", spa: "Vasca idromassaggio", amenities: "Dotazioni dell'appartamento", checkin: "Check-in e comunicazione", value: "Rapporto qualità/prezzo" },
    discovery_channel: { booking: "Booking.com", airbnb: "Airbnb", google: "Google", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", referral: "Amici o conoscenti", website: "Sito Casa Lobelie", other: "Altro" },
    booking_channel: { booking: "Booking.com", airbnb: "Airbnb", website: "Sito ufficiale", whatsapp: "WhatsApp / diretto", other: "Altro" },
    booking_reasons: { photos: "Fotografie dell'appartamento", spa: "Vasca idromassaggio privata", veranda: "Veranda e privacy", price: "Prezzo", reviews: "Recensioni positive", location: "Posizione a Roma", romantic: "Atmosfera romantica" },
    booking_hesitations: { none: "Nessun dubbio", price: "Prezzo totale del soggiorno", reviews: "Numero di recensioni", location: "Posizione e collegamenti", information: "Informazioni sull'appartamento", direct_booking: "Sicurezza della prenotazione diretta", conditions: "Disponibilità e condizioni" },
    recommendation: { definitely: "Assolutamente sì", probably: "Probabilmente sì", unsure: "Non saprei", unlikely: "Probabilmente no" },
    language: { it: "Italiano", en: "Inglese", es: "Spagnolo", fr: "Francese" }
  };
  function label(field, code) {
    var m = LABELS[field];
    return (m && m[String(code)]) || String(code == null ? "—" : code);
  }

  var $ = function (id) { return document.getElementById(id); };
  var views = { login: $("viewLogin"), dash: $("viewDash"), config: $("viewConfig") };
  function show(name) { Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; }); }

  if (!window.supabase || !CONFIG.supabasePublicKey || CONFIG.supabasePublicKey.indexOf("INSERISCI") === 0) {
    show("config");
    return;
  }

  var sb = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabasePublicKey, {
    auth: {
      storage: window.sessionStorage,
      storageKey: "cl-feedback-admin-auth",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  });

  var rows = [];
  var currentRange = null;

  function busy(btn, on) { btn.disabled = on; btn.setAttribute("aria-busy", on ? "true" : "false"); }
  function showErr(el, msg) { el.textContent = msg; el.hidden = !msg; }

  /* =====================================================================
     FLUSSO DI ACCESSO
     ===================================================================== */
  async function start() {
    var s = await sb.auth.getSession();
    if (!s.data || !s.data.session) { show("login"); return; }
    await afterPassword();
  }

  $("loginForm").addEventListener("submit", async function (ev) {
    ev.preventDefault();
    var btn = $("loginBtn"), err = $("loginError");
    showErr(err, "");
    var email = $("loginEmail").value.trim(), pwd = $("loginPassword").value;
    if (!email || !pwd) { showErr(err, "Inserisci email e password."); return; }
    busy(btn, true);
    try {
      var r = await sb.auth.signInWithPassword({ email: email, password: pwd });
      if (r.error) {
        showErr(err, r.error.status === 429 ? "Troppi tentativi. Riprova tra qualche minuto." : "Accesso non riuscito. Controlla email e password.");
        return;
      }
      $("loginPassword").value = "";
      await afterPassword();
    } catch (e) {
      showErr(err, "Connessione non riuscita. Riprova.");
    } finally { busy(btn, false); }
  });

  async function afterPassword() {
    // L'autorizzazione vera avviene sul server (feedback-admin): se l'utente
    // non è l'amministratore, la funzione risponde 403 e i dati non arrivano.
    enterDashboard();
  }

  $("logoutBtn").addEventListener("click", function () { signOut(""); });

  async function signOut(msg) {
    try { await sb.auth.signOut(); } catch (e) {}
    rows = [];
    $("content").hidden = true;
    show("login");
    showErr($("loginError"), msg || "");
  }

  /* Disconnessione automatica per inattività */
  var idleTimer = null;
  function bumpIdle() {
    if (views.dash.hidden) return;
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () { signOut("Sessione chiusa per inattività. Accedi di nuovo."); }, CONFIG.idleLogoutMs);
  }
  ["click", "keydown", "touchstart", "scroll"].forEach(function (e) { document.addEventListener(e, bumpIdle, { passive: true }); });

  /* =====================================================================
     DASHBOARD
     ===================================================================== */
  function enterDashboard() {
    show("dash");
    bumpIdle();
    loadData();
  }

  function startOfDay(d) { var x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
  function fmtDate(d) { return d.toLocaleDateString("it-IT", { day: "2-digit", month: "short", year: "numeric" }); }
  function isoDay(d) { var z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); }

  function computeRange() {
    var p = $("period").value, now = new Date(), from = null, to = null, lbl;
    if (p === "all") { lbl = "Tutti i questionari"; }
    else if (p === "year") { from = new Date(now.getFullYear(), 0, 1); lbl = "Dal " + fmtDate(from) + " a oggi"; }
    else if (p === "custom") {
      var a = $("dateFrom").value, b = $("dateTo").value;
      if (!a || !b) return { error: "Indica entrambe le date." };
      from = startOfDay(a + "T00:00:00"); to = startOfDay(b + "T00:00:00"); to.setDate(to.getDate() + 1);
      if (to <= from) return { error: "La data finale deve essere successiva a quella iniziale." };
      var last = new Date(to); last.setDate(last.getDate() - 1);
      lbl = "Dal " + fmtDate(from) + " al " + fmtDate(last);
    } else {
      var days = parseInt(p, 10);
      from = startOfDay(now); from.setDate(from.getDate() - (days - 1));
      lbl = (days === 365 ? "Ultimi 12 mesi" : "Ultimi " + days + " giorni") + " (dal " + fmtDate(from) + ")";
    }
    return { from: from ? from.toISOString() : null, to: to ? to.toISOString() : null, label: lbl };
  }

  $("period").addEventListener("change", function () {
    var custom = this.value === "custom";
    $("customRange").hidden = !custom;
    if (custom) {
      if (!$("dateTo").value) $("dateTo").value = isoDay(new Date());
      if (!$("dateFrom").value) { var d = new Date(); d.setDate(d.getDate() - 29); $("dateFrom").value = isoDay(d); }
      $("dateFrom").focus();
      return;
    }
    loadData();
  });
  $("applyRange").addEventListener("click", loadData);
  $("refreshBtn").addEventListener("click", loadData);
  $("csvBtn").addEventListener("click", exportCsv);

  var loadSeq = 0;
  async function loadData() {
    var range = computeRange();
    var errEl = $("dashError");
    if (range.error) { showErr(errEl, range.error); return; }
    showErr(errEl, "");
    var seq = ++loadSeq;
    $("loading").hidden = false;
    $("refreshBtn").disabled = true;
    try {
      var s = await sb.auth.getSession();
      var token = s.data && s.data.session && s.data.session.access_token;
      if (!token) { await signOut("Sessione scaduta. Accedi di nuovo."); return; }
      var res = await fetch(CONFIG.supabaseUrl + "/functions/v1/" + CONFIG.adminFunction, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token, "apikey": CONFIG.supabasePublicKey },
        body: JSON.stringify({ from: range.from, to: range.to }),
        cache: "no-store",
        credentials: "omit"
      });
      if (seq !== loadSeq) return;
      if (res.status === 401) { await signOut("Sessione scaduta. Accedi di nuovo."); return; }
      if (res.status === 403) { showErr(errEl, "Accesso negato: questo account non è autorizzato."); $("content").hidden = true; return; }
      if (!res.ok) { showErr(errEl, "Impossibile caricare i dati (errore " + res.status + "). Riprova tra poco."); return; }
      var data = await res.json();
      rows = Array.isArray(data.rows) ? data.rows : [];
      currentRange = range;
      $("periodLabel").textContent = range.label + (data.truncated ? " · attenzione: mostrati solo i primi " + rows.length + " questionari" : "");
      render();
    } catch (e) {
      if (seq === loadSeq) showErr(errEl, "Connessione non riuscita. Controlla la rete e premi «Aggiorna».");
    } finally {
      if (seq === loadSeq) { $("loading").hidden = true; $("refreshBtn").disabled = false; }
    }
  }

  /* ---------------- Calcoli ---------------- */
  function countSingle(field) {
    var c = {}; rows.forEach(function (r) { var v = r[field]; if (v != null) c[v] = (c[v] || 0) + 1; }); return c;
  }
  function countMulti(field) {
    var c = {}; rows.forEach(function (r) { (Array.isArray(r[field]) ? r[field] : []).forEach(function (v) { c[v] = (c[v] || 0) + 1; }); }); return c;
  }
  function pct(n, d) { return d ? Math.round(n / d * 100) : 0; }
  function fmtNum(n, dec) { return n.toLocaleString("it-IT", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 }); }

  /* ---------------- Rendering ---------------- */
  function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); }
  function mk(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }

  // Barre orizzontali: percentuale sul totale dei questionari.
  function bars(elId, field, counts, opts) {
    opts = opts || {};
    var el = $(elId); clear(el);
    var total = rows.length;
    var codes = field === "overall_rating" ? ["5", "4", "3", "2", "1"] : Object.keys(LABELS[field]);
    Object.keys(counts).forEach(function (c) { if (codes.indexOf(c) === -1) codes.push(c); }); // codici imprevisti
    var items = codes.map(function (c) { return { code: c, n: counts[c] || 0 }; });
    if (!opts.keepOrder) items.sort(function (a, b) { return b.n - a.n; });
    var max = Math.max.apply(null, items.map(function (i) { return i.n; }).concat([1]));
    items.forEach(function (it) {
      var p = pct(it.n, total);
      var row = mk("div", "bar-row" + (it.n === 0 ? " is-zero" : ""));
      var tip = label(field, it.code) + ": " + it.n + " su " + total + " questionari (" + p + "%)";
      row.title = tip;
      row.setAttribute("role", "img");
      row.setAttribute("aria-label", tip);
      row.appendChild(mk("span", "bar-label", label(field, it.code)));
      var v = mk("span", "bar-value"); var s = mk("strong", null, p + "%"); v.appendChild(s); v.appendChild(document.createTextNode(" · " + it.n));
      row.appendChild(v);
      var track = mk("span", "bar-track"); var fill = mk("span", "bar-fill");
      fill.style.display = "block";
      fill.style.width = (it.n / max * 100) + "%";
      track.appendChild(fill); row.appendChild(track);
      el.appendChild(row);
    });
  }

  function mix(a, b, t) {
    var pa = [1, 3, 5].map(function (i) { return parseInt(a.substr(i, 2), 16); });
    var pb = [1, 3, 5].map(function (i) { return parseInt(b.substr(i, 2), 16); });
    return "rgb(" + pa.map(function (x, i) { return Math.round(x + (pb[i] - x) * t); }).join(",") + ")";
  }

  function matrix() {
    var wrap = $("chMatrix"); clear(wrap);
    var dCodes = Object.keys(LABELS.discovery_channel), bCodes = Object.keys(LABELS.booking_channel);
    var m = {}, max = 0, rowT = {}, colT = {};
    rows.forEach(function (r) {
      var d = r.discovery_channel, b = r.booking_channel;
      if (dCodes.indexOf(d) === -1) dCodes.push(d);
      if (bCodes.indexOf(b) === -1) bCodes.push(b);
      var k = d + "|" + b; m[k] = (m[k] || 0) + 1; if (m[k] > max) max = m[k];
      rowT[d] = (rowT[d] || 0) + 1; colT[b] = (colT[b] || 0) + 1;
    });
    var tbl = mk("table", "matrix");
    var cap = mk("caption", null, "Canale di scoperta (righe) e canale di prenotazione (colonne)");
    cap.style.position = "absolute"; cap.style.left = "-9999px";
    tbl.appendChild(cap);
    var thead = mk("thead"), hr = mk("tr");
    hr.appendChild(mk("th", null, "Scoperta ↓ / Prenotazione →"));
    bCodes.forEach(function (b) { var th = mk("th", null, label("booking_channel", b)); th.scope = "col"; hr.appendChild(th); });
    var tt = mk("th", null, "Totale"); tt.scope = "col"; hr.appendChild(tt);
    thead.appendChild(hr); tbl.appendChild(thead);
    var tbody = mk("tbody");
    dCodes.forEach(function (d) {
      var tr = mk("tr"); var th = mk("th", null, label("discovery_channel", d)); th.scope = "row"; tr.appendChild(th);
      bCodes.forEach(function (b) {
        var n = m[d + "|" + b] || 0, td = mk("td", n ? null : "is-zero", n ? String(n) : "0");
        if (n) {
          var t = Math.sqrt(n / max);
          td.style.background = mix("#eef3f8", "#0d4a78", t);
          td.style.color = t > 0.55 ? "#fff" : "#08395d";
        }
        td.title = "Scoperto su " + label("discovery_channel", d) + ", prenotato su " + label("booking_channel", b) + ": " + n;
        tr.appendChild(td);
      });
      var tot = mk("td", "total", String(rowT[d] || 0)); tr.appendChild(tot);
      tbody.appendChild(tr);
    });
    tbl.appendChild(tbody);
    var tfoot = mk("tfoot"), fr = mk("tr"); var fth = mk("th", null, "Totale"); fth.scope = "row"; fr.appendChild(fth);
    bCodes.forEach(function (b) { fr.appendChild(mk("td", "total", String(colT[b] || 0))); });
    fr.appendChild(mk("td", "total", String(rows.length)));
    tfoot.appendChild(fr); tbl.appendChild(tfoot);
    wrap.appendChild(tbl);

    // Sintesi testuale
    var ul = $("matrixInsights"); clear(ul);
    var direct = function (b) { return b === "website" || b === "whatsapp"; };
    var otaDisc = rows.filter(function (r) { return r.discovery_channel === "booking" || r.discovery_channel === "airbnb"; });
    var otaToDirect = otaDisc.filter(function (r) { return direct(r.booking_channel); }).length;
    var social = rows.filter(function (r) { return ["facebook", "instagram", "tiktok"].indexOf(r.discovery_channel) !== -1; });
    var socialDirect = social.filter(function (r) { return direct(r.booking_channel); }).length;
    var google = rows.filter(function (r) { return r.discovery_channel === "google"; });
    var googleDirect = google.filter(function (r) { return direct(r.booking_channel); }).length;
    var same = rows.filter(function (r) { return r.discovery_channel === r.booking_channel; }).length;
    [
      "Hanno prenotato sullo stesso canale in cui ci hanno scoperto: " + same + " su " + rows.length + " (" + pct(same, rows.length) + "%).",
      "Scoperti su Booking.com/Airbnb e poi prenotati direttamente (sito o WhatsApp): " + otaToDirect + " su " + otaDisc.length + (otaDisc.length ? " (" + pct(otaToDirect, otaDisc.length) + "%)." : "."),
      "Scoperti sui social (Facebook, Instagram, TikTok) e prenotati direttamente: " + socialDirect + " su " + social.length + (social.length ? " (" + pct(socialDirect, social.length) + "%)." : "."),
      "Scoperti su Google e prenotati direttamente: " + googleDirect + " su " + google.length + (google.length ? " (" + pct(googleDirect, google.length) + "%)." : ".")
    ].forEach(function (t) { ul.appendChild(mk("li", null, t)); });
  }

  function render() {
    var total = rows.length;
    $("content").hidden = false;
    $("csvBtn").disabled = total === 0;
    $("emptyState").hidden = total !== 0;
    $("charts").hidden = total === 0;

    $("kpiTotal").textContent = fmtNum(total);
    var first = total ? new Date(rows[0].created_at) : null, last = total ? new Date(rows[total - 1].created_at) : null;
    var nNotes = rows.filter(function (r) { return typeof r.additional_notes === "string" && r.additional_notes.trim() !== ""; }).length;
    $("kpiTotalSub").textContent = total ? ("dal " + fmtDate(first) + " al " + fmtDate(last) + " · " + nNotes + (nNotes === 1 ? " con nota" : " con note")) : "";
    var ratings = rows.map(function (r) { return Number(r.overall_rating); }).filter(function (n) { return n >= 1 && n <= 5; });
    var avg = ratings.length ? ratings.reduce(function (a, b) { return a + b; }, 0) / ratings.length : null;
    $("kpiAvg").textContent = avg == null ? "–" : fmtNum(avg, 1);
    var five = ratings.filter(function (n) { return n === 5; }).length;
    $("kpiAvgSub").textContent = ratings.length ? (pct(five, ratings.length) + "% «Eccellente»") : "";
    var rec = countSingle("recommendation");
    var yes = (rec.definitely || 0) + (rec.probably || 0);
    $("kpiRec").textContent = total ? pct(yes, total) + "%" : "–";
    $("kpiRecSub").textContent = total ? ("«Assolutamente sì» " + pct(rec.definitely || 0, total) + "% · «Probabilmente sì» " + pct(rec.probably || 0, total) + "%") : "";
    var bc = countSingle("booking_channel");
    $("kpiDirect").textContent = total ? pct((bc.website || 0) + (bc.whatsapp || 0), total) + "%" : "–";

    if (!total) return;
    bars("chRating", "overall_rating", countSingle("overall_rating"), { keepOrder: true });
    bars("chRecommend", "recommendation", rec, { keepOrder: true });
    bars("chAppreciated", "most_appreciated", countMulti("most_appreciated"));
    bars("chImprove", "improvements", countMulti("improvements"));
    bars("chDiscovery", "discovery_channel", countSingle("discovery_channel"));
    bars("chBooking", "booking_channel", bc);
    bars("chReasons", "booking_reasons", countMulti("booking_reasons"));
    bars("chHesitations", "booking_hesitations", countMulti("booking_hesitations"));
    bars("chLanguage", "language", countSingle("language"));
    matrix();
    renderNotes(true);
  }

  /* ---------------- Note degli ospiti ----------------
     Mostrate SOLO come testo (textContent): eventuale HTML scritto
     dall'ospite non viene mai interpretato. */
  var NOTES_PAGE = 20;
  var notesShown = 0;
  function notesRows() {
    return rows.filter(function (r) { return typeof r.additional_notes === "string" && r.additional_notes.trim() !== ""; })
      .slice().sort(function (a, b) { return new Date(b.created_at) - new Date(a.created_at); });
  }
  function renderNotes(reset) {
    var list = $("notesList"), withNotes = notesRows();
    if (reset) { clear(list); notesShown = 0; }
    var next = withNotes.slice(notesShown, notesShown + NOTES_PAGE);
    next.forEach(function (r) {
      var li = mk("li", "note-item");
      var meta = mk("p", "note-meta");
      meta.appendChild(mk("span", null, new Date(r.created_at).toLocaleString("it-IT", { timeZone: "Europe/Rome", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })));
      meta.appendChild(mk("span", null, label("language", r.language)));
      var n = Number(r.overall_rating);
      if (n >= 1 && n <= 5) {
        var st = mk("span", "note-stars", "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n));
        st.setAttribute("aria-label", "Valutazione " + n + " su 5");
        meta.appendChild(st);
      }
      li.appendChild(meta);
      li.appendChild(mk("p", "note-text", r.additional_notes));
      list.appendChild(li);
    });
    notesShown += next.length;
    $("notesEmpty").hidden = withNotes.length !== 0;
    var rest = withNotes.length - notesShown;
    $("notesMore").hidden = rest <= 0;
    $("notesMore").textContent = "Mostra altre note (" + rest + ")";
    $("notesNote").textContent = withNotes.length
      ? withNotes.length + (withNotes.length === 1 ? " nota" : " note") + " nel periodo · testi facoltativi lasciati alla fine del questionario, dal più recente"
      : "Testi facoltativi lasciati alla fine del questionario";
  }
  $("notesMore").addEventListener("click", function () { renderNotes(false); });

  /* ---------------- Esportazione CSV (Excel italiano: separatore ;) ---------------- */
  function csvCell(v) {
    var s = v == null ? "" : String(v);
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;                // protezione formula injection
    return /[";\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  }
  function multi(field, arr) { return (Array.isArray(arr) ? arr : []).map(function (c) { return label(field, c); }).join(" | "); }

  function exportCsv() {
    if (!rows.length) return;
    var head = ["ID", "Data e ora", "Lingua", "Valutazione (1-5)", "Valutazione", "Più apprezzato", "Da migliorare",
      "Canale di scoperta", "Canale di prenotazione", "Motivi della scelta", "Dubbi prima della prenotazione", "Consiglierebbe", "Note"];
    var lines = [head.map(csvCell).join(";")];
    rows.forEach(function (r) {
      var d = new Date(r.created_at);
      lines.push([
        r.id,
        d.toLocaleString("it-IT", { timeZone: "Europe/Rome", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
        label("language", r.language),
        r.overall_rating,
        label("overall_rating", r.overall_rating).replace(/ \(\d\)$/, ""),
        multi("most_appreciated", r.most_appreciated),
        multi("improvements", r.improvements),
        label("discovery_channel", r.discovery_channel),
        label("booking_channel", r.booking_channel),
        multi("booking_reasons", r.booking_reasons),
        multi("booking_hesitations", r.booking_hesitations),
        label("recommendation", r.recommendation),
        r.additional_notes || ""
      ].map(csvCell).join(";"));
    });
    var blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "questionari-casa-lobelie-" + isoDay(new Date()).replace(/-/g, "") + ".csv";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  sb.auth.onAuthStateChange(function (event) {
    if (event === "SIGNED_OUT" && !views.dash.hidden) { show("login"); }
  });

  start().catch(function () { show("login"); });
})();
