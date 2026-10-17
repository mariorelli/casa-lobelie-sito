/* ============================================================================
   CASA LOBELIE — QUESTIONARIO OSPITI — LOGICA E TRADUZIONI
   - Schermata lingua e routing via hash come /self-check-in/ e /guest/:
       (nessun hash) → selezione lingua · #/it #/en #/es #/fr → questionario
       #/lingua → ritorno esplicito alla selezione
   - La lingua del browser NON viene mai usata per saltare la scelta.
   - Invio SOLO tramite la Edge Function Supabase "submit-feedback".
     Nessuna chiave segreta in questo file. Nessun accesso diretto alla tabella.
   - Il ringraziamento compare SOLO dopo una risposta positiva del server.
   - GA4: caricato solo se l'ospite ha già dato il consenso "analytics" sul
     sito (stessa chiave localStorage "cl_cookie_consent"). Nessuna risposta
     individuale e nessun token viene inviato a GA4.
   ============================================================================ */
(function () {
  "use strict";

  /* ---------------- CONFIGURAZIONE ---------------- */
  var CONFIG = {
    endpoint: "https://adusdmsraxbtytmtxdqe.supabase.co/functions/v1/submit-feedback",
    // Lasciare vuoto se la funzione è pubblicata con "Verify JWT" disattivato.
    // Se invece è attivo, inserire qui la chiave PUBBLICA "anon"/"publishable"
    // (mai la service_role).
    publicApiKey: "",
    turnstileSiteKey: "0x4AAAAAAFYqv0Dgn7sd0lgC",
    turnstileAction: "guest_feedback",
    ga4Id: "G-1PVZ9RM2ME",
    requestTimeoutMs: 20000,
    notesMaxLength: 500
  };

  var LANGS = ["it", "en", "es", "fr"];
  var SESSION_KEY = "cl_feedback_lang";
  var SENT_KEY = "cl_feedback_sent";
  var GATE_HASH = "#/lingua";
  var PRIVACY = { it: "/privacy.html", en: "/privacy-en.html", es: "/privacy-es.html", fr: "/privacy-fr.html" };

  /* ---------------- DOMANDE (codici database invariati) ---------------- */
  var QUESTIONS = [
    { id: "overall_rating", section: 1, type: "single", numeric: true,
      options: ["5", "4", "3", "2", "1"] },
    { id: "most_appreciated", section: 1, type: "multi",
      options: ["spa", "veranda", "comfort", "privacy", "location", "welcome"] },
    { id: "improvements", section: 1, type: "multi", exclusive: "perfect",
      options: ["perfect", "cleanliness", "bed", "spa", "amenities", "checkin", "value"] },
    { id: "discovery_channel", section: 2, type: "single",
      options: ["booking", "airbnb", "google", "facebook", "instagram", "tiktok", "referral", "website", "other"] },
    { id: "booking_channel", section: 2, type: "single",
      options: ["booking", "airbnb", "website", "whatsapp", "other"] },
    { id: "booking_reasons", section: 2, type: "multi",
      options: ["photos", "spa", "veranda", "price", "reviews", "location", "romantic"] },
    { id: "booking_hesitations", section: 2, type: "multi", exclusive: "none",
      options: ["none", "price", "reviews", "location", "information", "direct_booking", "conditions"] },
    { id: "recommendation", section: 2, type: "single",
      options: ["definitely", "probably", "unsure", "unlikely"] }
  ];

  /* ---------------- TRADUZIONI ---------------- */
  var T = {
    it: {
      langName: "Italiano",
      pageTitle: "Questionario ospiti — Casa Lobelie",
      title: "Com'è andato il tuo soggiorno?",
      subtitle: "Questionario ospiti",
      intro: "Ti chiediamo circa un minuto per otto risposte. Il questionario è anonimo: non ti chiediamo nome, email o telefono.",
      section1Kicker: "Sezione 1 di 2", section1: "La tua esperienza",
      section2Kicker: "Sezione 2 di 2", section2: "Come ci hai scelto",
      hintSingle: "Una sola risposta", hintMulti: "Puoi scegliere più risposte",
      errSingle: "Seleziona una risposta.", errMulti: "Seleziona almeno una risposta.",
      errSummary: "Mancano ancora alcune risposte: completa le domande evidenziate.",
      progress: "{n} di 8 risposte",
      submit: "Invia il questionario", sending: "Invio in corso…",
      tsLoading: "Verifica di sicurezza in corso…",
      tsReady: "Verifica di sicurezza completata.",
      tsNeeded: "Attendi il completamento della verifica di sicurezza, poi invia di nuovo.",
      tsExpired: "La verifica di sicurezza è scaduta e viene ripetuta: attendi qualche secondo.",
      tsError: "Non è stato possibile completare la verifica di sicurezza.",
      tsLoadFail: "La verifica di sicurezza non si è caricata. Controlla la connessione e riprova.",
      tsRetry: "Ripeti la verifica",
      errNetwork: "Connessione assente o instabile. Le tue risposte sono ancora qui: riprova tra qualche istante.",
      errForbidden: "La verifica di sicurezza non è stata accettata. Attendi che venga ripetuta e invia di nuovo.",
      errRate: "Abbiamo già ricevuto diversi questionari da questa connessione. Riprova più tardi.",
      errInvalid: "Alcune risposte non sono state accettate. Controllale e riprova.",
      errServer: "Si è verificato un problema temporaneo. Riprova tra qualche minuto.",
      privacyNote: "Questionario anonimo. Per proteggere il modulo dallo spam utilizziamo Cloudflare Turnstile.",
      privacyLink: "Privacy Policy",
      changeLanguage: "Cambia lingua",
      notesKicker: "Facoltativo",
      notesTitle: "Vuoi aggiungere qualcosa sulla tua esperienza?",
      notesHelp: "Un suggerimento, qualcosa che hai apprezzato o che possiamo migliorare. Ogni opinione è preziosa!",
      notesPrivacy: "Ti chiediamo di non inserire nomi, email o numeri di telefono.",
      notesLeft: "Restano {n} caratteri",
      notesFull: "Hai raggiunto il limite di 500 caratteri",
      thanksTitle: "Grazie per aver condiviso la tua esperienza!",
      thanksText: "La tua opinione è preziosa e ci aiuta a rendere Casa Lobelie sempre più accogliente.",
      thanksHope: "Speriamo di poterti ospitare nuovamente presto. ❤️",
      q: {
        overall_rating: { label: "Come valuti complessivamente il tuo soggiorno?",
          o: { "5": "Eccellente", "4": "Molto buono", "3": "Buono", "2": "Sufficiente", "1": "Deludente" } },
        most_appreciated: { label: "Cosa hai apprezzato maggiormente di Casa Lobelie?",
          o: { spa: "Vasca idromassaggio", veranda: "Veranda privata", comfort: "Comfort e pulizia", privacy: "Atmosfera e privacy", location: "Posizione", welcome: "Accoglienza" } },
        improvements: { label: "Cosa potremmo migliorare?",
          o: { perfect: "Tutto perfetto così", cleanliness: "Pulizia", bed: "Comfort del letto", spa: "Vasca idromassaggio", amenities: "Dotazioni dell'appartamento", checkin: "Check-in e comunicazione", value: "Rapporto qualità/prezzo" } },
        discovery_channel: { label: "Dove hai scoperto Casa Lobelie per la prima volta?",
          o: { booking: "Booking.com", airbnb: "Airbnb", google: "Google", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", referral: "Amici o conoscenti", website: "Sito Casa Lobelie", other: "Altro" } },
        booking_channel: { label: "Dove hai effettuato la prenotazione?",
          o: { booking: "Booking.com", airbnb: "Airbnb", website: "Sito ufficiale Casa Lobelie", whatsapp: "WhatsApp / contatto diretto", other: "Altro" } },
        booking_reasons: { label: "Cosa ti ha convinto a scegliere Casa Lobelie?",
          o: { photos: "Fotografie dell'appartamento", spa: "Vasca idromassaggio privata", veranda: "Veranda e privacy", price: "Prezzo", reviews: "Recensioni positive", location: "Posizione a Roma", romantic: "Atmosfera romantica" } },
        booking_hesitations: { label: "Prima di prenotare, hai avuto qualche dubbio?",
          o: { none: "Nessun dubbio", price: "Prezzo totale del soggiorno", reviews: "Numero di recensioni", location: "Posizione e collegamenti", information: "Informazioni sull'appartamento", direct_booking: "Sicurezza della prenotazione diretta", conditions: "Disponibilità e condizioni" } },
        recommendation: { label: "Consiglieresti Casa Lobelie ad amici o parenti?",
          o: { definitely: "Assolutamente sì", probably: "Probabilmente sì", unsure: "Non saprei", unlikely: "Probabilmente no" } }
      }
    },
    en: {
      langName: "English",
      pageTitle: "Guest questionnaire — Casa Lobelie",
      title: "How was your stay?",
      subtitle: "Guest questionnaire",
      intro: "It takes about a minute to answer eight questions. The questionnaire is anonymous: we won't ask for your name, email or phone number.",
      section1Kicker: "Section 1 of 2", section1: "Your experience",
      section2Kicker: "Section 2 of 2", section2: "How you chose us",
      hintSingle: "Choose one answer", hintMulti: "You can choose more than one answer",
      errSingle: "Please choose an answer.", errMulti: "Please choose at least one answer.",
      errSummary: "A few answers are still missing: please complete the highlighted questions.",
      progress: "{n} of 8 answered",
      submit: "Send questionnaire", sending: "Sending…",
      tsLoading: "Running a quick security check…",
      tsReady: "Security check completed.",
      tsNeeded: "Please wait for the security check to finish, then send again.",
      tsExpired: "The security check has expired and is being repeated: please wait a few seconds.",
      tsError: "The security check could not be completed.",
      tsLoadFail: "The security check did not load. Please check your connection and try again.",
      tsRetry: "Repeat the check",
      errNetwork: "No connection or an unstable connection. Your answers are still here: please try again in a moment.",
      errForbidden: "The security check was not accepted. Please wait for it to repeat and send again.",
      errRate: "We have already received several questionnaires from this connection. Please try again later.",
      errInvalid: "Some answers were not accepted. Please check them and try again.",
      errServer: "A temporary problem occurred. Please try again in a few minutes.",
      privacyNote: "Anonymous questionnaire. We use Cloudflare Turnstile to protect this form from spam.",
      privacyLink: "Privacy Policy",
      changeLanguage: "Change language",
      notesKicker: "Optional",
      notesTitle: "Would you like to add anything about your experience?",
      notesHelp: "A suggestion, something you enjoyed or something we could improve. Every opinion matters!",
      notesPrivacy: "Please do not include names, email addresses or phone numbers.",
      notesLeft: "{n} characters left",
      notesFull: "You have reached the 500-character limit",
      thanksTitle: "Thank you for sharing your experience!",
      thanksText: "Your feedback is invaluable and helps us make Casa Lobelie ever more welcoming.",
      thanksHope: "We hope to welcome you back again soon. ❤️",
      q: {
        overall_rating: { label: "Overall, how would you rate your stay?",
          o: { "5": "Excellent", "4": "Very good", "3": "Good", "2": "Fair", "1": "Disappointing" } },
        most_appreciated: { label: "What did you appreciate most about Casa Lobelie?",
          o: { spa: "Hot tub", veranda: "Private veranda", comfort: "Comfort and cleanliness", privacy: "Atmosphere and privacy", location: "Location", welcome: "Welcome and hospitality" } },
        improvements: { label: "What could we improve?",
          o: { perfect: "Everything was perfect", cleanliness: "Cleanliness", bed: "Bed comfort", spa: "Hot tub", amenities: "Apartment amenities", checkin: "Check-in and communication", value: "Value for money" } },
        discovery_channel: { label: "Where did you first discover Casa Lobelie?",
          o: { booking: "Booking.com", airbnb: "Airbnb", google: "Google", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", referral: "Friends or acquaintances", website: "Casa Lobelie website", other: "Other" } },
        booking_channel: { label: "Where did you make your booking?",
          o: { booking: "Booking.com", airbnb: "Airbnb", website: "Official Casa Lobelie website", whatsapp: "WhatsApp / direct contact", other: "Other" } },
        booking_reasons: { label: "What convinced you to choose Casa Lobelie?",
          o: { photos: "Photos of the apartment", spa: "Private hot tub", veranda: "Veranda and privacy", price: "Price", reviews: "Positive reviews", location: "Location in Rome", romantic: "Romantic atmosphere" } },
        booking_hesitations: { label: "Before booking, did you have any doubts?",
          o: { none: "No doubts", price: "Total price of the stay", reviews: "Number of reviews", location: "Location and transport links", information: "Information about the apartment", direct_booking: "Security of booking direct", conditions: "Availability and terms" } },
        recommendation: { label: "Would you recommend Casa Lobelie to friends or family?",
          o: { definitely: "Definitely yes", probably: "Probably yes", unsure: "Not sure", unlikely: "Probably not" } }
      }
    },
    es: {
      langName: "Español",
      pageTitle: "Cuestionario para huéspedes — Casa Lobelie",
      title: "¿Qué tal tu estancia?",
      subtitle: "Cuestionario para huéspedes",
      intro: "Solo te llevará un minuto responder a ocho preguntas. El cuestionario es anónimo: no te pedimos nombre, email ni teléfono.",
      section1Kicker: "Sección 1 de 2", section1: "Tu experiencia",
      section2Kicker: "Sección 2 de 2", section2: "Cómo nos elegiste",
      hintSingle: "Una sola respuesta", hintMulti: "Puedes elegir varias respuestas",
      errSingle: "Selecciona una respuesta.", errMulti: "Selecciona al menos una respuesta.",
      errSummary: "Aún faltan algunas respuestas: completa las preguntas resaltadas.",
      progress: "{n} de 8 respuestas",
      submit: "Enviar el cuestionario", sending: "Enviando…",
      tsLoading: "Verificación de seguridad en curso…",
      tsReady: "Verificación de seguridad completada.",
      tsNeeded: "Espera a que termine la verificación de seguridad y vuelve a enviar.",
      tsExpired: "La verificación de seguridad ha caducado y se está repitiendo: espera unos segundos.",
      tsError: "No se ha podido completar la verificación de seguridad.",
      tsLoadFail: "La verificación de seguridad no se ha cargado. Comprueba la conexión e inténtalo de nuevo.",
      tsRetry: "Repetir la verificación",
      errNetwork: "Sin conexión o conexión inestable. Tus respuestas siguen aquí: inténtalo de nuevo en unos instantes.",
      errForbidden: "La verificación de seguridad no ha sido aceptada. Espera a que se repita y vuelve a enviar.",
      errRate: "Ya hemos recibido varios cuestionarios desde esta conexión. Inténtalo más tarde.",
      errInvalid: "Algunas respuestas no han sido aceptadas. Revísalas e inténtalo de nuevo.",
      errServer: "Se ha producido un problema temporal. Inténtalo de nuevo dentro de unos minutos.",
      privacyNote: "Cuestionario anónimo. Utilizamos Cloudflare Turnstile para proteger el formulario del spam.",
      privacyLink: "Política de privacidad",
      changeLanguage: "Cambiar idioma",
      notesKicker: "Opcional",
      notesTitle: "¿Quieres añadir algo sobre tu experiencia?",
      notesHelp: "Una sugerencia, algo que te haya gustado o que podamos mejorar. ¡Cada opinión es valiosa!",
      notesPrivacy: "Te pedimos que no incluyas nombres, emails ni números de teléfono.",
      notesLeft: "Quedan {n} caracteres",
      notesFull: "Has alcanzado el límite de 500 caracteres",
      thanksTitle: "¡Gracias por compartir tu experiencia!",
      thanksText: "Tu opinión es muy valiosa y nos ayuda a que Casa Lobelie sea cada vez más acogedora.",
      thanksHope: "Esperamos poder recibirte de nuevo muy pronto. ❤️",
      q: {
        overall_rating: { label: "En general, ¿cómo valoras tu estancia?",
          o: { "5": "Excelente", "4": "Muy buena", "3": "Buena", "2": "Aceptable", "1": "Decepcionante" } },
        most_appreciated: { label: "¿Qué es lo que más te ha gustado de Casa Lobelie?",
          o: { spa: "Jacuzzi", veranda: "Veranda privada", comfort: "Comodidad y limpieza", privacy: "Ambiente y privacidad", location: "Ubicación", welcome: "Acogida" } },
        improvements: { label: "¿Qué podríamos mejorar?",
          o: { perfect: "Todo perfecto así", cleanliness: "Limpieza", bed: "Comodidad de la cama", spa: "Jacuzzi", amenities: "Equipamiento del apartamento", checkin: "Check-in y comunicación", value: "Relación calidad-precio" } },
        discovery_channel: { label: "¿Dónde descubriste Casa Lobelie por primera vez?",
          o: { booking: "Booking.com", airbnb: "Airbnb", google: "Google", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", referral: "Amigos o conocidos", website: "Web de Casa Lobelie", other: "Otro" } },
        booking_channel: { label: "¿Dónde hiciste la reserva?",
          o: { booking: "Booking.com", airbnb: "Airbnb", website: "Web oficial de Casa Lobelie", whatsapp: "WhatsApp / contacto directo", other: "Otro" } },
        booking_reasons: { label: "¿Qué te convenció para elegir Casa Lobelie?",
          o: { photos: "Fotos del apartamento", spa: "Jacuzzi privado", veranda: "Veranda y privacidad", price: "Precio", reviews: "Reseñas positivas", location: "Ubicación en Roma", romantic: "Ambiente romántico" } },
        booking_hesitations: { label: "Antes de reservar, ¿tuviste alguna duda?",
          o: { none: "Ninguna duda", price: "Precio total de la estancia", reviews: "Número de reseñas", location: "Ubicación y transporte", information: "Información sobre el apartamento", direct_booking: "Seguridad de la reserva directa", conditions: "Disponibilidad y condiciones" } },
        recommendation: { label: "¿Recomendarías Casa Lobelie a amigos o familiares?",
          o: { definitely: "Sí, sin duda", probably: "Probablemente sí", unsure: "No lo sé", unlikely: "Probablemente no" } }
      }
    },
    fr: {
      langName: "Français",
      pageTitle: "Questionnaire clients — Casa Lobelie",
      title: "Comment s'est passé votre séjour ?",
      subtitle: "Questionnaire clients",
      intro: "Il vous faudra environ une minute pour répondre à huit questions. Le questionnaire est anonyme : nous ne vous demandons ni nom, ni e-mail, ni téléphone.",
      section1Kicker: "Partie 1 sur 2", section1: "Votre expérience",
      section2Kicker: "Partie 2 sur 2", section2: "Comment vous nous avez choisis",
      hintSingle: "Une seule réponse", hintMulti: "Plusieurs réponses possibles",
      errSingle: "Veuillez choisir une réponse.", errMulti: "Veuillez choisir au moins une réponse.",
      errSummary: "Il manque encore quelques réponses : veuillez compléter les questions signalées.",
      progress: "{n} sur 8 réponses",
      submit: "Envoyer le questionnaire", sending: "Envoi en cours…",
      tsLoading: "Vérification de sécurité en cours…",
      tsReady: "Vérification de sécurité terminée.",
      tsNeeded: "Veuillez attendre la fin de la vérification de sécurité, puis envoyer à nouveau.",
      tsExpired: "La vérification de sécurité a expiré et va être répétée : veuillez patienter quelques secondes.",
      tsError: "La vérification de sécurité n'a pas pu être effectuée.",
      tsLoadFail: "La vérification de sécurité ne s'est pas chargée. Vérifiez votre connexion et réessayez.",
      tsRetry: "Relancer la vérification",
      errNetwork: "Connexion absente ou instable. Vos réponses sont toujours là : réessayez dans quelques instants.",
      errForbidden: "La vérification de sécurité n'a pas été acceptée. Attendez qu'elle soit répétée, puis envoyez à nouveau.",
      errRate: "Nous avons déjà reçu plusieurs questionnaires depuis cette connexion. Veuillez réessayer plus tard.",
      errInvalid: "Certaines réponses n'ont pas été acceptées. Vérifiez-les et réessayez.",
      errServer: "Un problème temporaire est survenu. Veuillez réessayer dans quelques minutes.",
      privacyNote: "Questionnaire anonyme. Nous utilisons Cloudflare Turnstile pour protéger ce formulaire contre le spam.",
      privacyLink: "Politique de confidentialité",
      changeLanguage: "Changer de langue",
      notesKicker: "Facultatif",
      notesTitle: "Souhaitez-vous ajouter quelque chose sur votre expérience ?",
      notesHelp: "Une suggestion, quelque chose que vous avez apprécié ou que nous pourrions améliorer. Chaque avis compte !",
      notesPrivacy: "Merci de ne pas indiquer de nom, d'adresse e-mail ni de numéro de téléphone.",
      notesLeft: "Il reste {n} caractères",
      notesFull: "Vous avez atteint la limite de 500 caractères",
      thanksTitle: "Merci d'avoir partagé votre expérience !",
      thanksText: "Votre avis est précieux et nous aide à rendre Casa Lobelie toujours plus accueillante.",
      thanksHope: "Nous espérons avoir le plaisir de vous accueillir à nouveau très bientôt. ❤️",
      q: {
        overall_rating: { label: "Dans l'ensemble, comment évaluez-vous votre séjour ?",
          o: { "5": "Excellent", "4": "Très bien", "3": "Bien", "2": "Correct", "1": "Décevant" } },
        most_appreciated: { label: "Qu'avez-vous le plus apprécié à Casa Lobelie ?",
          o: { spa: "Jacuzzi", veranda: "Véranda privée", comfort: "Confort et propreté", privacy: "Atmosphère et intimité", location: "Emplacement", welcome: "Accueil" } },
        improvements: { label: "Que pourrions-nous améliorer ?",
          o: { perfect: "Tout était parfait", cleanliness: "Propreté", bed: "Confort du lit", spa: "Jacuzzi", amenities: "Équipements de l'appartement", checkin: "Check-in et communication", value: "Rapport qualité-prix" } },
        discovery_channel: { label: "Où avez-vous découvert Casa Lobelie pour la première fois ?",
          o: { booking: "Booking.com", airbnb: "Airbnb", google: "Google", facebook: "Facebook", instagram: "Instagram", tiktok: "TikTok", referral: "Amis ou connaissances", website: "Site de Casa Lobelie", other: "Autre" } },
        booking_channel: { label: "Où avez-vous effectué votre réservation ?",
          o: { booking: "Booking.com", airbnb: "Airbnb", website: "Site officiel de Casa Lobelie", whatsapp: "WhatsApp / contact direct", other: "Autre" } },
        booking_reasons: { label: "Qu'est-ce qui vous a décidé à choisir Casa Lobelie ?",
          o: { photos: "Les photos de l'appartement", spa: "Le jacuzzi privatif", veranda: "La véranda et l'intimité", price: "Le prix", reviews: "Les avis positifs", location: "L'emplacement à Rome", romantic: "L'atmosphère romantique" } },
        booking_hesitations: { label: "Avant de réserver, avez-vous eu des hésitations ?",
          o: { none: "Aucune hésitation", price: "Le prix total du séjour", reviews: "Le nombre d'avis", location: "L'emplacement et les transports", information: "Les informations sur l'appartement", direct_booking: "La sécurité de la réservation directe", conditions: "Les disponibilités et conditions" } },
        recommendation: { label: "Recommanderiez-vous Casa Lobelie à vos amis ou à votre famille ?",
          o: { definitely: "Oui, sans hésiter", probably: "Probablement oui", unsure: "Je ne sais pas", unlikely: "Probablement pas" } }
      }
    }
  };

  /* ---------------- RIFERIMENTI DOM ---------------- */
  var $ = function (id) { return document.getElementById(id); };
  var body = document.body;
  var gateEl = $("langGate"), headerEl = $("appHeader"), surveyEl = $("survey"), thanksEl = $("thanks");
  var langSwitchEl = $("langSwitch"), formEl = $("fbForm");
  var submitBtn = $("submitBtn"), submitLabel = $("submitLabel"), alertEl = $("formAlert");
  var tsWidgetEl = $("tsWidget"), tsStatusEl = $("tsStatus"), tsRetryBtn = $("tsRetry");
  var progressEl = $("progress"), progressBar = $("progressBar"), progressLabel = $("progressLabel");
  var changeLangBtns = [$("changeLangBtn"), $("changeLangBtn2")];
  var notesEl = $("fbNotes"), notesCountEl = $("notesCount"), notesCountSrEl = $("notesCountSr");

  var currentLang = null;
  var submitAttempted = false;
  var sending = false;
  var started = false;

  /* ---------------- storage (protetto: può non essere disponibile) ---------------- */
  function ssGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  function getSessionLang() { var v = ssGet(SESSION_KEY); return LANGS.indexOf(v) !== -1 ? v : null; }

  /* =====================================================================
     GA4 — solo con consenso analytics già espresso sul sito
     ===================================================================== */
  var ga = { enabled: false, pageViewSent: false };
  function hasAnalyticsConsent() {
    try {
      var raw = localStorage.getItem("cl_cookie_consent");
      var c = raw ? JSON.parse(raw) : null;
      return !!(c && c.analytics === true);
    } catch (e) { return false; }
  }
  function initGA() {
    if (!hasAnalyticsConsent()) return;
    ga.enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "denied" });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", CONFIG.ga4Id, { send_page_view: false });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(CONFIG.ga4Id);
    document.head.appendChild(s);
  }
  // Solo eventi senza parametri personali: nessuna risposta, nessun token.
  function track(name) {
    if (!ga.enabled || !window.gtag) return;
    try { window.gtag("event", name, { page_path: "/feedback/" }); } catch (e) {}
  }
  function trackPageViewOnce() {
    if (!ga.enabled || ga.pageViewSent || !window.gtag) return;
    ga.pageViewSent = true;
    try {
      window.gtag("event", "page_view", { page_location: location.origin + "/feedback/", page_path: "/feedback/", page_title: "Questionario ospiti — Casa Lobelie" });
    } catch (e) {}
    track("feedback_page_view");
  }

  /* =====================================================================
     COSTRUZIONE DEL QUESTIONARIO (una volta sola; i testi si aggiornano
     al cambio lingua senza perdere le risposte già date)
     ===================================================================== */
  var qEls = {}; // id → { fieldset, legendText, hint, error, optTexts: {code: el} }

  function el(tag, cls, attrs) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function buildQuestions() {
    QUESTIONS.forEach(function (q, idx) {
      var fs = el("fieldset", "fb-q", { id: "q-" + q.id, "aria-describedby": "hint-" + q.id });
      var legend = el("legend");
      var num = el("span", "fb-q-num", { "aria-hidden": "true" });
      num.textContent = String(idx + 1);
      var legendText = el("span");
      legend.appendChild(num); legend.appendChild(legendText);
      var hint = el("p", "fb-hint", { id: "hint-" + q.id });
      var opts = el("div", "fb-options" + (q.type === "multi" ? " is-multi" : ""));
      var optTexts = {};
      q.options.forEach(function (code) {
        var label = el("label", "fb-opt" + (q.exclusive === code ? " is-exclusive" : ""));
        var input = el("input", null, {
          type: q.type === "single" ? "radio" : "checkbox",
          name: q.id, value: code
        });
        var ui = el("span", "fb-opt-ui");
        var mark = el("span", "fb-mark", { "aria-hidden": "true" });
        var text = el("span", "fb-opt-text");
        ui.appendChild(mark); ui.appendChild(text);
        if (q.numeric) {
          var n = parseInt(code, 10);
          var stars = el("span", "fb-stars", { "aria-hidden": "true" });
          stars.innerHTML = "★★★★★".slice(0, n) + '<span class="off">' + "★★★★★".slice(0, 5 - n) + "</span>";
          ui.appendChild(stars);
        }
        label.appendChild(input); label.appendChild(ui);
        opts.appendChild(label);
        optTexts[code] = text;
      });
      var err = el("p", "fb-error", { id: "err-" + q.id });
      err.hidden = true;
      fs.appendChild(legend); fs.appendChild(hint); fs.appendChild(opts); fs.appendChild(err);
      $(q.section === 1 ? "sec1Questions" : "sec2Questions").appendChild(fs);
      qEls[q.id] = { q: q, fieldset: fs, legendText: legendText, hint: hint, error: err, optTexts: optTexts };
    });
  }

  function valuesOf(id) {
    var out = [];
    Array.prototype.forEach.call(formEl.querySelectorAll('input[name="' + id + '"]:checked'), function (i) { out.push(i.value); });
    return out;
  }
  function isAnswered(id) { return valuesOf(id).length > 0; }
  function answeredCount() {
    return QUESTIONS.reduce(function (n, q) { return n + (isAnswered(q.id) ? 1 : 0); }, 0);
  }

  /* Opzioni esclusive: "perfect" e "none" deselezionano le altre e viceversa */
  function handleExclusive(input) {
    var q = qEls[input.name] && qEls[input.name].q;
    if (!q || !q.exclusive || input.type !== "checkbox" || !input.checked) return;
    var all = formEl.querySelectorAll('input[name="' + q.id + '"]');
    Array.prototype.forEach.call(all, function (i) {
      if (input.value === q.exclusive) { if (i !== input) i.checked = false; }
      else if (i.value === q.exclusive) { i.checked = false; }
    });
  }

  function setQuestionError(id, show) {
    var r = qEls[id];
    var t = T[currentLang];
    r.error.hidden = !show;
    r.fieldset.classList.toggle("has-error", show);
    r.error.textContent = show ? (r.q.type === "multi" ? t.errMulti : t.errSingle) : "";
    r.fieldset.setAttribute("aria-describedby", show ? ("hint-" + id + " err-" + id) : ("hint-" + id));
    Array.prototype.forEach.call(r.fieldset.querySelectorAll("input"), function (i) {
      if (show) i.setAttribute("aria-invalid", "true"); else i.removeAttribute("aria-invalid");
    });
  }

  function validate() {
    var missing = [];
    QUESTIONS.forEach(function (q) {
      var ok = isAnswered(q.id);
      setQuestionError(q.id, !ok);
      if (!ok) missing.push(q.id);
    });
    return missing;
  }

  function updateProgress() {
    var n = answeredCount();
    progressBar.style.width = (n / QUESTIONS.length * 100) + "%";
    progressLabel.textContent = n + "/" + QUESTIONS.length;
    progressEl.setAttribute("aria-valuenow", String(n));
    if (currentLang) {
      var txt = T[currentLang].progress.replace("{n}", n);
      progressEl.setAttribute("aria-valuetext", txt);
      progressEl.setAttribute("aria-label", txt);
    }
    submitBtn.classList.toggle("is-incomplete", n < QUESTIONS.length);
  }

  formEl.addEventListener("change", function (ev) {
    var t = ev.target;
    if (!t || !t.name || !qEls[t.name]) return;
    handleExclusive(t);
    if (!started) { started = true; track("feedback_started"); }
    if (submitAttempted) setQuestionError(t.name, !isAnswered(t.name));
    if (submitAttempted && answeredCount() === QUESTIONS.length) hideAlert();
    updateProgress();
  });

  /* =====================================================================
     NOTE FACOLTATIVE (testo libero, max 500 caratteri)
     ===================================================================== */
  // Stessa normalizzazione applicata dal server: a capo uniformi, nessun
  // carattere di controllo, spazi iniziali/finali rimossi. Vuoto → null.
  function cleanNotes(v) {
    var x = String(v || "").replace(/\r\n?/g, "\n")
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .trim();
    if (x.length > CONFIG.notesMaxLength) x = x.slice(0, CONFIG.notesMaxLength);
    // Rimuove eventuali metà di emoji rimaste spezzate dal taglio
    x = x.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/g, "$1").trim();
    return x ? x : null;
  }

  var lastSrBucket = -1;
  function updateNotesCount() {
    var n = notesEl.value.length;
    var max = CONFIG.notesMaxLength;
    notesCountEl.textContent = n + "/" + max;
    notesCountEl.classList.toggle("is-near", n >= max - 50 && n < max);
    notesCountEl.classList.toggle("is-full", n >= max);
    // Annuncio per i lettori di schermo solo a soglie (non a ogni tasto)
    var bucket = n >= max ? 3 : n >= max - 10 ? 2 : n >= max - 50 ? 1 : 0;
    if (bucket !== lastSrBucket) {
      lastSrBucket = bucket;
      if (!currentLang || bucket === 0) { notesCountSrEl.textContent = ""; return; }
      var t = T[currentLang];
      notesCountSrEl.textContent = bucket === 3 ? t.notesFull : t.notesLeft.replace("{n}", String(max - n));
    }
  }
  notesEl.addEventListener("input", function () {
    if (notesEl.value.length > CONFIG.notesMaxLength) notesEl.value = notesEl.value.slice(0, CONFIG.notesMaxLength);
    if (!started && notesEl.value) { started = true; track("feedback_started"); }
    updateNotesCount();
  });

  /* =====================================================================
     CLOUDFLARE TURNSTILE (rendering esplicito, action "guest_feedback")
     ===================================================================== */
  var ts = { scriptState: "idle", widgetId: null, token: null, state: "idle", renderedLang: null };

  function setTsStatus(key, isError) {
    var t = T[currentLang] || T.it;
    tsStatusEl.textContent = key ? t[key] : "";
    tsStatusEl.classList.toggle("is-error", !!isError);
    tsRetryBtn.hidden = !isError;
  }

  window.clTurnstileReady = function () {
    ts.scriptState = "loaded";
    renderTurnstile();
  };

  function loadTurnstile() {
    if (ts.scriptState === "loading" || ts.scriptState === "loaded") return;
    ts.scriptState = "loading";
    setTsStatus("tsLoading");
    var s = document.createElement("script");
    s.id = "cfTurnstileScript";
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=clTurnstileReady";
    s.async = true; s.defer = true;
    s.onerror = function () {
      ts.scriptState = "failed";
      if (s.parentNode) s.parentNode.removeChild(s);
      ts.state = "error";
      setTsStatus("tsLoadFail", true);
    };
    document.head.appendChild(s);
  }

  function renderTurnstile() {
    if (!window.turnstile || !currentLang) return;
    if (ts.widgetId !== null && ts.renderedLang === currentLang) return;
    if (ts.widgetId !== null) { try { window.turnstile.remove(ts.widgetId); } catch (e) {} ts.widgetId = null; }
    ts.token = null; ts.state = "pending";
    setTsStatus("tsLoading");
    try {
      ts.widgetId = window.turnstile.render(tsWidgetEl, {
        sitekey: CONFIG.turnstileSiteKey,
        action: CONFIG.turnstileAction,
        language: currentLang,
        theme: "light",
        size: "flexible",
        appearance: "interaction-only",
        "refresh-expired": "auto",
        "refresh-timeout": "auto",
        retry: "auto",
        callback: function (token) {
          ts.token = token; ts.state = "ready";
          setTsStatus("tsReady");
          if (alertEl.getAttribute("data-key") === "tsNeeded" || alertEl.getAttribute("data-key") === "errForbidden") hideAlert();
        },
        "expired-callback": function () {
          ts.token = null; ts.state = "pending";
          setTsStatus("tsExpired");
        },
        "timeout-callback": function () {
          ts.token = null; ts.state = "pending";
          setTsStatus("tsExpired");
        },
        "before-interactive-callback": function () { setTsStatus(""); },
        "error-callback": function () {
          ts.token = null; ts.state = "error";
          setTsStatus("tsError", true);
          return true; // gestito qui: nessun errore in console
        }
      });
      ts.renderedLang = currentLang;
    } catch (e) {
      ts.state = "error";
      setTsStatus("tsError", true);
    }
  }

  function resetTurnstile() {
    ts.token = null;
    if (window.turnstile && ts.widgetId !== null) {
      ts.state = "pending";
      setTsStatus("tsLoading");
      try { window.turnstile.reset(ts.widgetId); } catch (e) { ts.widgetId = null; renderTurnstile(); }
    } else if (ts.scriptState === "failed") {
      ts.scriptState = "idle";
      loadTurnstile();
    }
  }

  tsRetryBtn.addEventListener("click", resetTurnstile);

  /* =====================================================================
     INVIO
     ===================================================================== */
  function showAlert(key) {
    alertEl.textContent = T[currentLang][key];
    alertEl.setAttribute("data-key", key);
    alertEl.hidden = false;
  }
  function hideAlert() { alertEl.hidden = true; alertEl.textContent = ""; alertEl.removeAttribute("data-key"); }

  function setSending(on) {
    sending = on;
    submitBtn.disabled = on;
    submitBtn.setAttribute("aria-busy", on ? "true" : "false");
    submitLabel.textContent = T[currentLang][on ? "sending" : "submit"];
    Array.prototype.forEach.call(formEl.querySelectorAll("input, textarea"), function (i) { i.disabled = on; });
  }

  function buildPayload() {
    var p = { language: currentLang };
    QUESTIONS.forEach(function (q) {
      var v = valuesOf(q.id);
      if (q.type === "multi") p[q.id] = v.slice();           // array JavaScript
      else if (q.numeric) p[q.id] = parseInt(v[0], 10);       // intero
      else p[q.id] = v[0];
    });
    p.additional_notes = cleanNotes(notesEl.value);   // facoltativo: testo o null
    p.turnstileToken = ts.token;
    return p;
  }

  formEl.addEventListener("submit", function (ev) {
    ev.preventDefault();
    if (sending) return;                          // nessun doppio invio
    submitAttempted = true;
    hideAlert();

    var missing = validate();
    if (missing.length) {
      showAlert("errSummary");
      var first = qEls[missing[0]].fieldset;
      first.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      var firstInput = first.querySelector("input");
      if (firstInput) { try { firstInput.focus({ preventScroll: true }); } catch (e) { firstInput.focus(); } }
      return;
    }
    if (!ts.token) {
      showAlert("tsNeeded");
      if (ts.state === "error" || ts.scriptState === "failed") resetTurnstile();
      else if (ts.scriptState !== "loaded") loadTurnstile();
      return;
    }
    send(buildPayload());
  });

  function send(payload) {
    setSending(true);
    var headers = { "Content-Type": "application/json" };
    if (CONFIG.publicApiKey) {
      headers.apikey = CONFIG.publicApiKey;
      headers.Authorization = "Bearer " + CONFIG.publicApiKey;
    }
    var ctrl = typeof AbortController === "function" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, CONFIG.requestTimeoutMs);

    fetch(CONFIG.endpoint, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
      credentials: "omit",
      cache: "no-store",
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (res) {
      clearTimeout(timer);
      return res.text().then(function (txt) {
        var data = null;
        try { data = txt ? JSON.parse(txt) : null; } catch (e) {}
        var explicitFail = data && (data.ok === false || data.success === false);
        // Se l'ospite ha scritto una nota, il server deve confermare di averla
        // salvata (notes_saved: true). Senza conferma non si mostra il
        // ringraziamento: nessun falso messaggio di successo.
        var notesUnconfirmed = payload.additional_notes !== null && !(data && data.notes_saved === true);
        if (res.ok && !explicitFail && !notesUnconfirmed) { onSuccess(); return; }
        if (res.ok && notesUnconfirmed) { onFailure(500); return; }
        onFailure(res.status);
      });
    }).catch(function () {
      clearTimeout(timer);
      onFailure(0);
    });
  }

  function onFailure(status) {
    setSending(false);
    // Il token Turnstile è monouso: dopo qualunque tentativo va rigenerato.
    resetTurnstile();
    var key = "errServer";
    if (status === 0) key = "errNetwork";
    else if (status === 403 || status === 401) key = "errForbidden";
    else if (status === 429) key = "errRate";
    else if (status === 400 || status === 422) key = "errInvalid";
    showAlert(key);
    alertEl.scrollIntoView({ block: "center", behavior: "auto" });
  }

  function onSuccess() {
    ssSet(SENT_KEY, currentLang);
    track("feedback_completed");
    if (window.turnstile && ts.widgetId !== null) { try { window.turnstile.remove(ts.widgetId); } catch (e) {} }
    ts.widgetId = null; ts.token = null;
    formEl.reset();
    updateNotesCount();
    showThanks(currentLang, true);
  }

  /* =====================================================================
     SCHERMATE E ROUTING
     ===================================================================== */
  function applyTranslations(lang) {
    var t = T[lang];
    document.documentElement.setAttribute("lang", lang);
    document.title = t.pageTitle;
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (e) {
      var key = e.getAttribute("data-i18n");
      if (typeof t[key] === "string") e.textContent = t[key];
    });
    if (sending) submitLabel.textContent = t.sending;
    QUESTIONS.forEach(function (q) {
      var r = qEls[q.id], tq = t.q[q.id];
      r.legendText.textContent = tq.label;
      r.hint.textContent = q.type === "multi" ? t.hintMulti : t.hintSingle;
      q.options.forEach(function (code) { r.optTexts[code].textContent = tq.o[code]; });
      if (!r.error.hidden) r.error.textContent = q.type === "multi" ? t.errMulti : t.errSingle;
    });
    var ak = alertEl.getAttribute("data-key");
    if (ak && t[ak]) alertEl.textContent = t[ak];
    if (tsStatusEl.textContent) {
      // Ripropone lo stato Turnstile corrente nella nuova lingua
      var map = { ready: "tsReady", pending: "tsLoading", error: ts.scriptState === "failed" ? "tsLoadFail" : "tsError" };
      if (map[ts.state]) setTsStatus(map[ts.state], ts.state === "error");
    }
    $("privacyLink").href = PRIVACY[lang];
    lastSrBucket = -1; updateNotesCount();

    changeLangBtns.forEach(function (b) { if (b) b.setAttribute("aria-label", t.changeLanguage); });
    $("changeLangBtn").setAttribute("title", t.changeLanguage);
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
        if (l === currentLang || sending) return;
        history.replaceState(null, "", "#/" + l);
        route();
        var active = langSwitchEl.querySelector('[aria-current="true"]');
        if (active) active.focus();
      });
      langSwitchEl.appendChild(b);
    });
    updateProgress();
  }

  function langFromHash() {
    var m = /^#\/([a-z]{2})\/?$/.exec(window.location.hash || "");
    return m && LANGS.indexOf(m[1]) !== -1 ? m[1] : null;
  }

  function route() {
    var sentLang = ssGet(SENT_KEY);
    if (LANGS.indexOf(sentLang) !== -1) { showThanks(langFromHash() || sentLang, false); return; }
    var lang = langFromHash();
    if (lang) { showSurvey(lang); return; }
    if (window.location.hash === GATE_HASH) { showGate(); return; }
    var stored = getSessionLang();
    if (stored) { history.replaceState(null, "", "#/" + stored); showSurvey(stored); }
    else showGate();
  }

  function showGate() {
    if (sending) return;
    currentLang = null;
    document.documentElement.setAttribute("lang", "it");
    document.title = "Questionario ospiti — Casa Lobelie";
    body.classList.add("lang-gate-active");
    gateEl.hidden = false; headerEl.hidden = true; surveyEl.hidden = true; thanksEl.hidden = true;
    window.scrollTo(0, 0);
  }

  function showSurvey(lang) {
    var firstShow = currentLang === null;
    var fromGate = !gateEl.hidden;
    currentLang = lang;
    ssSet(SESSION_KEY, lang);
    applyTranslations(lang);
    body.classList.remove("lang-gate-active");
    gateEl.hidden = true; headerEl.hidden = false; surveyEl.hidden = false; thanksEl.hidden = true;
    if (firstShow) window.scrollTo(0, 0);
    if (fromGate) {
      var h1 = $("fbTitle");
      h1.setAttribute("tabindex", "-1");
      try { h1.focus({ preventScroll: true }); } catch (e) { h1.focus(); }
    }
    trackPageViewOnce();
    if (ts.scriptState === "loaded") renderTurnstile(); else loadTurnstile();
  }

  function showThanks(lang, focus) {
    currentLang = lang;
    var t = T[lang];
    document.documentElement.setAttribute("lang", lang);
    document.title = t.pageTitle;
    $("thanksTitle").textContent = t.thanksTitle;
    thanksEl.querySelector('[data-i18n="thanksText"]').textContent = t.thanksText;
    thanksEl.querySelector('[data-i18n="thanksHope"]').textContent = t.thanksHope;
    body.classList.remove("lang-gate-active");
    gateEl.hidden = true; headerEl.hidden = true; surveyEl.hidden = true; thanksEl.hidden = false;
    window.scrollTo(0, 0);
    if (focus) { try { $("thanksTitle").focus({ preventScroll: true }); } catch (e) {} }
  }

  Array.prototype.forEach.call(gateEl.querySelectorAll(".lang-gate-btn"), function (btn) {
    btn.addEventListener("click", function () {
      var lang = btn.getAttribute("data-lang");
      ssSet(SESSION_KEY, lang);
      history.replaceState(null, "", "#/" + lang);
      route();
    });
  });
  changeLangBtns.forEach(function (b) {
    if (b) b.addEventListener("click", function () { if (!sending) window.location.hash = GATE_HASH; });
  });

  /* ---------------- avvio ---------------- */
  buildQuestions();
  initGA();
  window.addEventListener("hashchange", route);
  document.documentElement.classList.remove("sc-direct");
  route();
})();
