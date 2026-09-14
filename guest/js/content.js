/* ============================================================================
   CASA LOBELIE â GUEST GUIDE â FILE DEI CONTENUTI
   ============================================================================
   QUESTO Ã L'UNICO FILE CHE DOVRESTE MODIFICARE PER AGGIORNARE LA GUIDA.
   Non serve toccare index.html, style.css o app.js per cambiare un orario,
   aggiungere un ristorante o un servizio: basta modificare i dati qui sotto.

   COME FUNZIONA:
   - I testi che cambiano in base alla lingua sono oggetti con 4 chiavi:
     { it: "...", en: "...", es: "...", fr: "..." }
     Se lasciate una lingua vuota (""), la guida userÃ  automaticamente il
     testo italiano ("it") al suo posto, quindi non Ã¨ mai obbligatorio
     tradurre subito tutto in tutte le lingue.
   - I dati che NON cambiano in base alla lingua (orari, numeri di telefono,
     nome della rete WiFi, coordinate, ecc.) sono scritti una sola volta.
   - Ogni "scaffold" vuoto (es. ristoranti, negozi) Ã¨ giÃ  pronto: basta
     copiare il blocco di esempio, incollarlo e cambiare i valori.

   Dopo aver modificato questo file, salvatelo: la guida si aggiorna da sola,
   non serve nessuna altra operazione tecnica.
   ============================================================================ */

window.GUEST_DATA = {

  /* ---------------------------------------------------------------------
     INFORMAZIONI GENERALI
  --------------------------------------------------------------------- */
  property: {
    name: "Casa Lobelie",
    city: "Roma",
    neighborhood: "Quartiere Alessandrino",
    address: "Via delle Lobelie, 20 â Roma, Italia",
    host: "Mario",
    // Numero WhatsApp reale giÃ  in uso sul sito casalobelie.it (footer).
    // Formato internazionale senza "+", "00" nÃ© spazi (richiesto da wa.me).
    whatsappNumber: "393335638730",
    emergencyNumber: "112",
    // Altri numeri utili (facoltativi). Lasciate l'array vuoto se non ne avete:
    // { label: {it:"Farmacia di turno", en:"...", es:"...", fr:"..."}, phone: "06XXXXXXX" }
    otherContacts: []
  },

  /* ---------------------------------------------------------------------
     WI-FI
     Se non conoscete ancora la password, lasciate password: "" â la guida
     mostrerÃ  un avviso "da configurare" invece di inventarne una.
  --------------------------------------------------------------------- */
  wifi: {
    ssid: "casalobelie",
    password: "" // <-- INSERIRE QUI LA PASSWORD REALE DELLA RETE WI-FI
  },

  /* ---------------------------------------------------------------------
     ORARI
  --------------------------------------------------------------------- */
  hours: {
    checkin: "15:30 â 21:00",
    checkout: "10:00",
    jacuzzi: "09:00 â 21:00",
    quietStart: "22:00",
    quietEnd: "08:00"
  },

  /* ---------------------------------------------------------------------
     COME MUOVERSI â trasporti reali indicati da Mario
  --------------------------------------------------------------------- */
  transport: {
    bus: {
      line: "213",
      stop: "Alessandrino / Incoronata",
      distance: { it: "circa 50â100 metri da casa", en: "about 50â100 metres from the apartment", es: "a unos 50â100 metros de la casa", fr: "Ã  environ 50â100 mÃ¨tres du logement" },
      note: {
        it: "Il bus 213 permette di raggiungere rapidamente la zona della Metro C Alessandrino.",
        en: "Bus 213 quickly connects to the Metro C Alessandrino area.",
        es: "El autobÃºs 213 permite llegar rÃ¡pidamente a la zona del Metro C Alessandrino.",
        fr: "Le bus 213 permet de rejoindre rapidement la zone du MÃ©tro C Alessandrino."
      },
      mapsQuery: "Fermata Alessandrino Incoronata, Roma"
    },
    metro: {
      line: "C",
      station: "Alessandrino",
      distance: { it: "circa 1 km, 15â20 minuti a piedi", en: "about 1 km, a 15â20 minute walk", es: "aproximadamente 1 km, 15â20 minutos a pie", fr: "environ 1 km, 15â20 minutes Ã  pied" },
      note: {
        it: "La Metro C permette di raggiungere direttamente la zona del Colosseo.",
        en: "Metro C takes you directly to the Colosseum area.",
        es: "El Metro C permite llegar directamente a la zona del Coliseo.",
        fr: "Le MÃ©tro C permet de rejoindre directement le quartier du ColisÃ©e."
      },
      mapsQuery: "Metro C Alessandrino, Roma"
    },
    taxiNote: {
      it: "In alternativa potete prenotare un taxi tramite le app piÃ¹ diffuse a Roma (es. FreeNow, ItTaxi) o cercare una fermata taxi nelle vicinanze.",
      en: "Alternatively, you can book a taxi through the main apps used in Rome (e.g. FreeNow, ItTaxi) or find a nearby taxi stand.",
      es: "Como alternativa, podÃ©is pedir un taxi con las apps mÃ¡s usadas en Roma (p. ej. FreeNow, ItTaxi) o buscar una parada de taxis cercana.",
      fr: "Vous pouvez aussi rÃ©server un taxi via les applications les plus utilisÃ©es Ã  Rome (ex. FreeNow, ItTaxi) ou chercher une station de taxis Ã  proximitÃ©."
    }
  },

  parking: {
    freeStreet: true,
    privateSpot: false
  },

  /* ---------------------------------------------------------------------
     LA CASA
  --------------------------------------------------------------------- */
  house: {
    bedroom: {
      config: {
        it: "Il letto puÃ² essere preparato come matrimoniale oppure come due letti singoli, secondo quanto concordato con Mario prima del check-in.",
        en: "The bed can be arranged as a double or as two single beds, as agreed with Mario before check-in.",
        es: "La cama puede prepararse como matrimonio o como dos camas individuales, segÃºn lo acordado con Mario antes del check-in.",
        fr: "Le lit peut Ãªtre prÃ©parÃ© en configuration double ou en deux lits simples, selon ce qui a Ã©tÃ© convenu avec Mario avant le check-in."
      },
      mattress: {
        it: "Materasso memory foam.",
        en: "Memory foam mattress.",
        es: "ColchÃ³n de espuma viscoelÃ¡stica (memory foam).",
        fr: "Matelas Ã  mÃ©moire de forme."
      }
    }
  },

  /* ---------------------------------------------------------------------
     REGOLE DELLA CASA
  --------------------------------------------------------------------- */
  rules: [
    { icon: "moon", text: { it: "Silenzio dalle 22:00 alle 08:00", en: "Quiet hours from 10:00 PM to 8:00 AM", es: "Silencio de 22:00 a 08:00", fr: "Silence de 22h00 Ã  8h00" } },
    { icon: "no-smoking", text: { it: "Vietato fumare in appartamento", en: "No smoking indoors", es: "Prohibido fumar en el apartamento", fr: "Interdiction de fumer dans l'appartement" } },
    { icon: "hot-tub", text: { it: "Vasca idromassaggio utilizzabile dalle 09:00 alle 21:00", en: "Hot tub available from 9:00 AM to 9:00 PM", es: "Jacuzzi disponible de 09:00 a 21:00", fr: "Jacuzzi utilisable de 9h00 Ã  21h00" } },
    { icon: "no-food", text: { it: "Niente cibo o bevande nella vasca", en: "No food or drinks in the hot tub", es: "Nada de comida o bebidas en el jacuzzi", fr: "Ni nourriture ni boissons dans le jacuzzi" } }
  ],

  /* ---------------------------------------------------------------------
     AREA RELAX / VASCA IDROMASSAGGIO
     Contenuto ufficiale della guida Casa Lobelie (riportato fedelmente,
     tradotto in EN/ES/FR senza aggiungere o togliere regole). Se cambia
     qualcosa nella guida ufficiale, aggiornate qui â nient'altro da toccare.
  --------------------------------------------------------------------- */
  relax: {
    beforeEntering: [
      { it: "Fare una doccia prima di entrare.", en: "Shower before entering.", es: "Duchaos antes de entrar.", fr: "Prenez une douche avant d'entrer." },
      { it: "Rimuovere la copertura con attenzione, senza piegarla o trascinarla.", en: "Remove the cover carefully, without folding or dragging it.", es: "Retirad la cubierta con cuidado, sin doblarla ni arrastrarla.", fr: "Retirez la couverture avec prÃ©caution, sans la plier ni la traÃ®ner." },
      { it: "Non entrare con creme, oli o saponi sulla pelle.", en: "Do not enter with creams, oils or soap on your skin.", es: "No entrÃ©is con cremas, aceites o jabÃ³n en la piel.", fr: "N'entrez pas avec des crÃ¨mes, huiles ou savons sur la peau." }
    ],
    duringUse: [
      { it: "Usare solo i comandi del pannello della vasca.", en: "Use only the hot tub control panel.", es: "Usad solo los mandos del panel del jacuzzi.", fr: "Utilisez uniquement les commandes du panneau du jacuzzi." },
      { it: "Per l'idromassaggio usare il comando bolle / massaggio.", en: "Use the bubbles / massage control for hydromassage.", es: "Para el hidromasaje, usad el mando de burbujas / masaje.", fr: "Pour l'hydromassage, utilisez la commande bulles / massage." },
      { it: "Se l'idromassaggio si arresta automaticamente, Ã¨ normale.", en: "If hydromassage stops automatically, this is normal.", es: "Si el hidromasaje se detiene automÃ¡ticamente, es normal.", fr: "Si l'hydromassage s'arxÃªte automatiquement, c'est normal." },
      { it: "Non modificare filtrazione, programmi o impostazioni tecniche.", en: "Do not change filtration, programmes or technical settings.", es: "No modifiquÃ©is la filtraciÃ³n, los programas ni los ajustes tÃ©cnicos.", fr: "Ne modifiez pas la filtration, les programmes ni les rÃ©glages techniques." },
      { it: "Non scollegare la vasca dalla corrente.", en: "Do not unplug the hot tub.", es: "No desconectÃ©is el jacuzzi de la corriente.", fr: "Ne dÃ©branchez pas le jacuzzi de l'alimentation Ã©lectrique." }
    ],
    afterUse: [
      { it: "Terminato l'uso, disattivare l'idromassaggio.", en: "When finished, switch off the hydromassage.", es: "Al terminar, apagad el hidromasaje.", fr: "Une fois terminÃ©, dÃ©sactivez l'hydromassage." },
      { it: "Lasciare attiva la filtrazione.", en: "Keep filtration running.", es: "Dejad la filtraciÃ³n activada.", fr: "Laissez la filtration active." },
      { it: "Riposizionare correttamente la copertura termica.", en: "Replace the thermal cover correctly.", es: "Volved a colocar correctamente la cubierta tÃ©rmica.", fr: "Replacez correctement la couverture thermique." },
      { it: "Lasciare la zona ordinata.", en: "Leave the area tidy.", es: "Dejad la zona ordenada.", fr: "Laissez l'espace bien rangÃ©." }
    ],
    importantRules: [
      { it: "Vietato mangiare o bere nella vasca.", en: "No food or drinks in the hot tub.", es: "Prohibido comer o beber en el jacuzzi.", fr: "Interdiction de manger ou boire dans le jacuzzi." },
      { it: "Vietati bicchieri e bottiglie di vetro.", en: "No glass bottles or glasses.", es: "Prohibidos los vasos y botellas de vidrio.", fr: "Verres et bouteilles en verre interdits." },
      { it: "Non usare saponi, oli, creme o bagnoschiuma.", en: "Do not use soap, oils, creams or bath products.", es: "No usar jabÃ³n, aceites, cremas ni geles de baÃ±o.", fr: "N'utilisez pas de savon, huiles, crÃ¨mes ou produits moussants." },
      { it: "Non saltare o tuffarsi.", en: "Do not jump or dive.", es: "No saltar ni tirarse de cabeza.", fr: "Ne sautez pas et ne plongez pas." },
      { it: "I bambini devono essere sempre sorvegliati da un adulto.", en: "Children must always be supervised by an adult.", es: "Los niÃ±os deben estar siempre supervisados por un adulto.", fr: "Les enfants doivent toujours Ãªtre surveillÃ©s par un adulte." },
      { it: "Non sedersi nÃ© camminare sulla copertura.", en: "Do not sit or walk on the cover.", es: "No sentarse ni caminar sobre la cubierta.", fr: "Ne vous asseyez pas et ne marchez pas sur la couverture." }
    ],
    // Avviso molto evidente, testo ufficiale â non modificare il significato.
    bigWarning: {
      it: "Non svuotare, non spegnere e non modificare le impostazioni tecniche.",
      en: "Do not drain, switch off or change the technical settings.",
      es: "No vaciÃ©is, no apaguÃ©is ni modifiquÃ©is los ajustes tÃ©cnicos.",
      fr: "Ne videz pas, n'Ã©teignez pas et ne modifiez pas les rÃ©glages techniques."
    },
    // Messaggio WhatsApp precompilato per il pulsante "Problemi o dubbi?"
    whatsappProblemMessage: {
      it: "Ciao Mario, ho un problema con la vasca idromassaggio di Casa Lobelie.",
      en: "Hi Mario, I have a problem with the hot tub at Casa Lobelie.",
      es: "Hola Mario, tengo un problema con el jacuzzi de Casa Lobelie.",
      fr: "Bonjour Mario, j'ai un problÃ¨me avec le jacuzzi de Casa Lobelie."
    }
  },

  /* ---------------------------------------------------------------------
     MANGIARE VICINO â struttura pronta, nessun locale inventato.
     Copiate il blocco di esempio per aggiungerne uno nuovo.
     category consigliate: "restaurant" | "pizzeria" | "bar" | "breakfast"
  --------------------------------------------------------------------- */
  restaurants: [
    // ESEMPIO â decommentate e completate quando avete i dati reali:
    // {
    //   name: "Nome del locale",
    //   category: { it: "Ristorante", en: "Restaurant", es: "Restaurante", fr: "Restaurant" },
    //   description: { it: "Breve descrizione.", en: "", es: "", fr: "" },
    //   distance: { it: "5 minuti a piedi", en: "5 minute walk", es: "5 minutos a pie", fr: "5 minutes Ã  pied" },
    //   mapsQuery: "Nome del locale, Roma",
    //   phone: "" // numero reale in formato internazionale, es. "39061234567" â lasciare vuoto se non volete il pulsante "Chiama"
    // }
  ],

  /* ---------------------------------------------------------------------
     SHOPPING E SERVIZI â stessa struttura di "restaurants".
     category consigliate: "supermarket" | "pharmacy" | "tobacco" | "atm" | "laundry" | "other"
  --------------------------------------------------------------------- */
  shopping: [
    // {
    //   name: "Nome dell'attivitÃ ",
    //   category: { it: "Supermercato", en: "Supermarket", es: "Supermercado", fr: "SupermarchÃ©" },
    //   description: { it: "", en: "", es: "", fr: "" },
    //   distance: { it: "3 minuti a piedi", en: "3 minute walk", es: "3 minutos a pie", fr: "3 minutes Ã  pied" },
    //   mapsQuery: "Nome dell'attivitÃ , Roma",
    //   phone: ""
    // }
  ],

  /* ---------------------------------------------------------------------
     SCOPRI ROMA â 6 mete classiche. Testi brevi e informazioni generiche
     e pubbliche; i tempi di percorrenza sono orientativi (il pulsante
     "Apri percorso" calcola sempre il tragitto reale in tempo reale).
     Per ogni voce, aggiungete una foto in guest/images/ con il nome
     indicato in "image" (se il file non esiste, appare un segnaposto).
  --------------------------------------------------------------------- */
  romeHighlights: [
    {
      id: "colosseo",
      name: { it: "Colosseo", en: "Colosseum", es: "Coliseo", fr: "ColisÃ©e" },
      description: {
        it: "Il grande anfiteatro romano, simbolo di Roma nel mondo.",
        en: "Rome's great amphitheatre and the city's most iconic landmark.",
        es: "El gran anfiteatro romano, sÃ­mbolo de Roma en el mundo.",
        fr: "Le grand amphithÃ©Ã¢tre romain, symbole de Rome dans le monde."
      },
      gettingThere: {
        it: "Con la Metro C da Alessandrino, zona raggiungibile direttamente.",
        en: "Take Metro C from Alessandrino â it reaches this area directly.",
        es: "En Metro C desde Alessandrino, zona alcanzable directamente.",
        fr: "En MÃ©tro C depuis Alessandrino, zone accessible directement."
      },
      mapsQuery: "Colosseo, Roma",
      image: "images/roma-colosseo.jpg"
    },
    {
      id: "trevi",
      name: { it: "Fontana di Trevi", en: "Trevi Fountain", es: "Fontana di Trevi", fr: "Fontaine de Trevi" },
      description: {
        it: "La fontana barocca piÃ¹ famosa al mondo, nel cuore del centro storico.",
        en: "The world-famous baroque fountain, in the heart of the historic centre.",
        es: "La fontana barroca mÃ¡s famosa del mundo, en el corazÃ³n del centro histÃ³rico.",
        fr: "La fontaine baroque la plus cÃ©lÃ¨bre au monde, au cÅur du centre historique."
      },
      gettingThere: {
        it: "Consigliati mezzi pubblici o taxi verso il centro storico.",
        en: "Public transport or a taxi to the historic centre is recommended.",
        es: "Se recomienda transporte pÃºblico o taxi hacia el centro histÃ³rico.",
        fr: "Transports en commun ou taxi vers le centre historique recommandÃ©s."
      },
      mapsQuery: "Fontana di Trevi, Roma",
      image: "images/roma-trevi.jpg"
    },
    {
      id: "pantheon",
      name: { it: "Pantheon", en: "Pantheon", es: "PanteÃ³n", fr: "PanthÃ©on" },
      description: {
        it: "Il tempio romano meglio conservato al mondo, oggi basilica.",
        en: "The best-preserved Roman temple in the world, today a basilica.",
        es: "El templo romano mejor conservado del mundo, hoy basÃ­lica.",
        fr: "Le temple romain le mieux conservÃ© au monde, aujourd'hui basilique."
      },
      gettingThere: {
        it: "A pochi passi dalla Fontana di Trevi: si visitano bene insieme.",
        en: "A short walk from the Trevi Fountain â easy to combine in one visit.",
        es: "A pocos pasos de la Fontana di Trevi: se visitan bien juntos.",
        fr: "Ã deux pas de la Fontaine de Trevi : facile Ã  combiner en une visite."
      },
      mapsQuery: "Pantheon, Roma",
      image: "images/roma-pantheon.jpg"
    },
    {
      id: "navona",
      name: { it: "Piazza Navona", en: "Piazza Navona", es: "Piazza Navona", fr: "Piazza Navona" },
      description: {
        it: "Una delle piazze piÃ¹ belle di Roma, con la Fontana dei Quattro Fiumi del Bernini.",
        en: "One of Rome's most beautiful squares, home to Bernini's Fountain of the Four Rivers.",
        es: "Una de las plazas mÃ¡s bellas de Roma, con la Fontana dei Quattro Fiumi de Bernini.",
        fr: "L'une des plus belles places de Rome, avec la fontaine des Quatre-Fleuves du Bernin."
      },
      gettingThere: {
        it: "Zona pedonale del centro storico, ben collegata con il Pantheon.",
        en: "A pedestrian area in the historic centre, close to the Pantheon.",
        es: "Zona peatonal del centro histÃ³rico, bien conectada con el PanteÃ³n.",
        fr: "Zone piÃ©tonne du centre historique, bien reliÃ©e au PanthÃ©on."
      },
      mapsQuery: "Piazza Navona, Roma",
      image: "images/roma-navona.jpg"
    },
    {
      id: "vaticano",
      name: { it: "Musei Vaticani e San Pietro", en: "Vatican Museums & St. Peter's", es: "Museos Vaticanos y San Pedro", fr: "MusÃ©es du Vatican et Saint-Pierre" },
      description: {
        it: "La Cappella Sistina, i Musei Vaticani e la Basilica di San Pietro.",
        en: "The Sistine Chapel, the Vatican Museums and St. Peter's Basilica.",
        es: "La Capilla Sixtina, los Museos Vaticanos y la BasÃ­lica de San Pedro.",
        fr: "La Chapelle Sixtine, les MusÃ©es du Vatican et la Basilique Saint-Pierre."
      },
      gettingThere: {
        it: "Si consiglia di prenotare i biglietti online in anticipo.",
        en: "Booking tickets online in advance is recommended.",
        es: "Se recomienda reservar las entradas online con antelaciÃ³n.",
        fr: "Il est conseillÃ© de rÃ©server les billets en ligne Ã  l'avance."
      },
      mapsQuery: "Musei Vaticani, Roma",
      image: "images/roma-vaticano.jpg"
    },
    {
      id: "trastevere",
      name: { it: "Trastevere", en: "Trastevere", es: "Trastevere", fr: "Trastevere" },
      description: {
        it: "Il quartiere piÃ¹ caratteristico di Roma: vicoli, trattorie e vita serale.",
        en: "Rome's most charming neighbourhood: cobbled lanes, trattorias and evening life.",
        es: "El barrio mÃ¡s pintoresco de Roma: callejuelas, trattorias y vida nocturna.",
        fr: "Le quartier le plus pittoresque de Rome : ruelles, trattorias et vie nocturne."
      },
      gettingThere: {
        it: "Ideale per una passeggiata serale o una cena informale.",
        en: "Perfect for an evening stroll or a casual dinner.",
        es: "Ideal para un paseo por la tarde o una cena informal.",
        fr: "IdÃ©al pour une promenade en soirÃ©e ou un dÃ®ner informel."
      },
      mapsQuery: "Trastevere, Roma",
      image: "images/roma-trastevere.jpg"
    }
  ],

  /* ---------------------------------------------------------------------
     PER IL TUO SOGGIORNO â servizi extra proponibili. price: null = non
     mostrato (nessun prezzo inventato). Quando volete indicarne uno,
     scrivetelo come testo, es. "da 40 â¬".
  --------------------------------------------------------------------- */
  extraServices: [
    {
      id: "transfer",
      icon: "car",
      name: { it: "Transfer", en: "Transfer", es: "Traslado", fr: "Transfert" },
      description: {
        it: "Trasferimento privato da/per aeroporto o stazione.",
        en: "Private transfer to/from the airport or train station.",
        es: "Traslado privado desde/hacia el aeropuerto o la estaciÃ³n.",
        fr: "Transfert privÃ© depuis/vers l'aÃ©roport ou la gare."
      },
      price: null
    },
    {
      id: "flowers",
      icon: "flower",
      name: { it: "Bouquet / fiori", en: "Bouquet / flowers", es: "Ramo de flores", fr: "Bouquet de fleurs" },
      description: {
        it: "Un mazzo di fiori pronto ad accogliervi in camera.",
        en: "A bouquet of flowers waiting for you in the room.",
        es: "Un ramo de flores listo para recibiros en la habitaciÃ³n.",
        fr: "Un bouquet de fleurs pour vous accueillir dans la chambre."
      },
      price: null
    },
    {
      id: "romantic",
      icon: "heart",
      name: { it: "Allestimento romantico", en: "Romantic setup", es: "DecoraciÃ³n romÃ¡ntica", fr: "DÃ©coration romantique" },
      description: {
        it: "Un tocco speciale per un'occasione da ricordare.",
        en: "A special touch for an occasion to remember.",
        es: "Un toque especial para una ocasiÃ³n inolvidable.",
        fr: "Une attention particuliÃ¨re pour une occasion Ã  ne pas oublier."
      },
      price: null
    },
    {
      id: "late-checkout",
      icon: "clock",
      name: { it: "Late check-out", en: "Late check-out", es: "Salida tardÃ­a", fr: "DÃ©part tardif" },
      description: {
        it: "Qualche ora in piÃ¹ per godervi l'appartamento, se disponibile.",
        en: "A few extra hours to enjoy the apartment, if available.",
        es: "Unas horas mÃ¡s para disfrutar del apartamento, si hay disponibilidad.",
        fr: "Quelques heures supplÃ©mentaires pour profiter de l'appartement, si disponible."
      },
      price: null
    },
    {
      id: "other",
      icon: "sparkles",
      name: { it: "Altri servizi", en: "Other services", es: "Otros servicios", fr: "Autres services" },
      description: {
        it: "Avete un'esigenza particolare? Scriveteci, troviamo una soluzione.",
        en: "Have a special request? Get in touch and we'll find a solution.",
        es: "Â¿TenÃ©is una necesidad especial? Escribidnos, encontraremos una soluciÃ³n.",
        fr: "Une demande particuliÃ¨re ? Ãcrivez-nous, nous trouverons une solution."
      },
      price: null
    }
  ]
};
