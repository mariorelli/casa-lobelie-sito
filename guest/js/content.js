/* ============================================================================
   CASA LOBELIE — GUEST GUIDE — FILE DEI CONTENUTI
   ============================================================================
   QUESTO È L'UNICO FILE CHE DOVRESTE MODIFICARE PER AGGIORNARE LA GUIDA.
   Non serve toccare index.html, style.css o app.js per cambiare un orario,
   aggiungere un ristorante o un servizio: basta modificare i dati qui sotto.

   COME FUNZIONA:
   - I testi che cambiano in base alla lingua sono oggetti con 4 chiavi:
     { it: "...", en: "...", es: "...", fr: "..." }
     Se lasciate una lingua vuota (""), la guida userà automaticamente il
     testo italiano ("it") al suo posto, quindi non è mai obbligatorio
     tradurre subito tutto in tutte le lingue.
   - I dati che NON cambiano in base alla lingua (orari, numeri di telefono,
     nome della rete WiFi, coordinate, ecc.) sono scritti una sola volta.
   - Ogni "scaffold" vuoto (es. ristoranti, negozi) è già pronto: basta
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
    address: "Via delle Lobelie, 20 — Roma, Italia",
    host: "Mario",
    // Numero WhatsApp reale già in uso sul sito casalobelie.it (footer).
    // Formato internazionale senza "+", "00" né spazi (richiesto da wa.me).
    whatsappNumber: "393335638730",
    emergencyNumber: "112",
    // Altri numeri utili (facoltativi). Lasciate l'array vuoto se non ne avete:
    // { label: {it:"Farmacia di turno", en:"...", es:"...", fr:"..."}, phone: "06XXXXXXX" }
    otherContacts: []
  },

  /* ---------------------------------------------------------------------
     WI-FI
     Se non conoscete ancora la password, lasciate password: "" — la guida
     mostrerà un avviso "da configurare" invece di inventarne una.
  --------------------------------------------------------------------- */
  wifi: {
    ssid: "casalobelie",
    password: "" // <-- INSERIRE QUI LA PASSWORD REALE DELLA RETE WI-FI
  },

  /* ---------------------------------------------------------------------
     ORARI
  --------------------------------------------------------------------- */
  hours: {
    checkin: "15:30 – 21:00",
    checkout: "10:00",
    jacuzzi: "09:00 – 21:00",
    quietStart: "22:00",
    quietEnd: "08:00"
  },

  /* ---------------------------------------------------------------------
     COME MUOVERSI — trasporti reali indicati da Mario
  --------------------------------------------------------------------- */
  transport: {
    bus: {
      line: "213",
      stop: "Alessandrino / Incoronata",
      distance: { it: "circa 50–100 metri da casa", en: "about 50–100 metres from the apartment", es: "a unos 50–100 metros de la casa", fr: "à environ 50–100 mètres du logement" },
      note: {
        it: "Il bus 213 permette di raggiungere rapidamente la zona della Metro C Alessandrino.",
        en: "Bus 213 quickly connects to the Metro C Alessandrino area.",
        es: "El autobús 213 permite llegar rápidamente a la zona del Metro C Alessandrino.",
        fr: "Le bus 213 permet de rejoindre rapidement la zone du Métro C Alessandrino."
      },
      mapsQuery: "Fermata Alessandrino Incoronata, Roma"
    },
    metro: {
      line: "C",
      station: "Alessandrino",
      distance: { it: "circa 1 km, 15–20 minuti a piedi", en: "about 1 km, a 15–20 minute walk", es: "aproximadamente 1 km, 15–20 minutos a pie", fr: "environ 1 km, 15–20 minutes à pied" },
      note: {
        it: "La Metro C permette di raggiungere direttamente la zona del Colosseo.",
        en: "Metro C takes you directly to the Colosseum area.",
        es: "El Metro C permite llegar directamente a la zona del Coliseo.",
        fr: "Le Métro C permet de rejoindre directement le quartier du Colisée."
      },
      mapsQuery: "Metro C Alessandrino, Roma"
    },
    taxiNote: {
      it: "In alternativa potete prenotare un taxi tramite le app più diffuse a Roma (es. FreeNow, ItTaxi) o cercare una fermata taxi nelle vicinanze.",
      en: "Alternatively, you can book a taxi through the main apps used in Rome (e.g. FreeNow, ItTaxi) or find a nearby taxi stand.",
      es: "Como alternativa, podéis pedir un taxi con las apps más usadas en Roma (p. ej. FreeNow, ItTaxi) o buscar una parada de taxis cercana.",
      fr: "Vous pouvez aussi réserver un taxi via les applications les plus utilisées à Rome (ex. FreeNow, ItTaxi) ou chercher une station de taxis à proximité."
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
        it: "Il letto può essere preparato come matrimoniale oppure come due letti singoli, secondo quanto concordato con Mario prima del check-in.",
        en: "The bed can be arranged as a double or as two single beds, as agreed with Mario before check-in.",
        es: "La cama puede prepararse como matrimonio o como dos camas individuales, según lo acordado con Mario antes del check-in.",
        fr: "Le lit peut être préparé en configuration double ou en deux lits simples, selon ce qui a été convenu avec Mario avant le check-in."
      },
      mattress: {
        it: "Materasso memory foam.",
        en: "Memory foam mattress.",
        es: "Colchón de espuma viscoelástica (memory foam).",
        fr: "Matelas à mémoire de forme."
      }
    }
  },

  /* ---------------------------------------------------------------------
     REGOLE DELLA CASA
  --------------------------------------------------------------------- */
  rules: [
    { icon: "moon", text: { it: "Silenzio dalle 22:00 alle 08:00", en: "Quiet hours from 10:00 PM to 8:00 AM", es: "Silencio de 22:00 a 08:00", fr: "Silence de 22h00 à 8h00" } },
    { icon: "no-smoking", text: { it: "Vietato fumare in appartamento", en: "No smoking indoors", es: "Prohibido fumar en el apartamento", fr: "Interdiction de fumer dans l'appartement" } },
    { icon: "hot-tub", text: { it: "Vasca idromassaggio utilizzabile dalle 09:00 alle 21:00", en: "Hot tub available from 9:00 AM to 9:00 PM", es: "Jacuzzi disponible de 09:00 a 21:00", fr: "Jacuzzi utilisable de 9h00 à 21h00" } },
    { icon: "no-food", text: { it: "Niente cibo o bevande nella vasca", en: "No food or drinks in the hot tub", es: "Nada de comida o bebidas en el jacuzzi", fr: "Ni nourriture ni boissons dans le jacuzzi" } }
  ],

  /* ---------------------------------------------------------------------
     AREA RELAX / VASCA IDROMASSAGGIO
     Contenuto ufficiale della guida Casa Lobelie (riportato fedelmente,
     tradotto in EN/ES/FR senza aggiungere o togliere regole). Se cambia
     qualcosa nella guida ufficiale, aggiornate qui — nient'altro da toccare.
  --------------------------------------------------------------------- */
  relax: {
    beforeEntering: [
      { it: "Fare una doccia prima di entrare.", en: "Shower before entering.", es: "Duchaos antes de entrar.", fr: "Prenez une douche avant d'entrer." },
      { it: "Rimuovere la copertura con attenzione, senza piegarla o trascinarla.", en: "Remove the cover carefully, without folding or dragging it.", es: "Retirad la cubierta con cuidado, sin doblarla ni arrastrarla.", fr: "Retirez la couverture avec précaution, sans la plier ni la traîner." },
      { it: "Non entrare con creme, oli o saponi sulla pelle.", en: "Do not enter with creams, oils or soap on your skin.", es: "No entréis con cremas, aceites o jabón en la piel.", fr: "N'entrez pas avec des crèmes, huiles ou savons sur la peau." }
    ],
    duringUse: [
      { it: "Usare solo i comandi del pannello della vasca.", en: "Use only the hot tub control panel.", es: "Usad solo los mandos del panel del jacuzzi.", fr: "Utilisez uniquement les commandes du panneau du jacuzzi." },
      { it: "Per l'idromassaggio usare il comando bolle / massaggio.", en: "Use the bubbles / massage control for hydromassage.", es: "Para el hidromasaje, usad el mando de burbujas / masaje.", fr: "Pour l'hydromassage, utilisez la commande bulles / massage." },
      { it: "Se l'idromassaggio si arresta automaticamente, è normale.", en: "If hydromassage stops automatically, this is normal.", es: "Si el hidromasaje se detiene automáticamente, es normal.", fr: "Si l'hydromassage s'arxête automatiquement, c'est normal." },
      { it: "Non modificare filtrazione, programmi o impostazioni tecniche.", en: "Do not change filtration, programmes or technical settings.", es: "No modifiquéis la filtración, los programas ni los ajustes técnicos.", fr: "Ne modifiez pas la filtration, les programmes ni les réglages techniques." },
      { it: "Non scollegare la vasca dalla corrente.", en: "Do not unplug the hot tub.", es: "No desconectéis el jacuzzi de la corriente.", fr: "Ne débranchez pas le jacuzzi de l'alimentation électrique." }
    ],
    afterUse: [
      { it: "Terminato l'uso, disattivare l'idromassaggio.", en: "When finished, switch off the hydromassage.", es: "Al terminar, apagad el hidromasaje.", fr: "Une fois terminé, désactivez l'hydromassage." },
      { it: "Lasciare attiva la filtrazione.", en: "Keep filtration running.", es: "Dejad la filtración activada.", fr: "Laissez la filtration active." },
      { it: "Riposizionare correttamente la copertura termica.", en: "Replace the thermal cover correctly.", es: "Volved a colocar correctamente la cubierta térmica.", fr: "Replacez correctement la couverture thermique." },
      { it: "Lasciare la zona ordinata.", en: "Leave the area tidy.", es: "Dejad la zona ordenada.", fr: "Laissez l'espace bien rangé." }
    ],
    importantRules: [
      { it: "Vietato mangiare o bere nella vasca.", en: "No food or drinks in the hot tub.", es: "Prohibido comer o beber en el jacuzzi.", fr: "Interdiction de manger ou boire dans le jacuzzi." },
      { it: "Vietati bicchieri e bottiglie di vetro.", en: "No glass bottles or glasses.", es: "Prohibidos los vasos y botellas de vidrio.", fr: "Verres et bouteilles en verre interdits." },
      { it: "Non usare saponi, oli, creme o bagnoschiuma.", en: "Do not use soap, oils, creams or bath products.", es: "No usar jabón, aceites, cremas ni geles de baño.", fr: "N'utilisez pas de savon, huiles, crèmes ou produits moussants." },
      { it: "Non saltare o tuffarsi.", en: "Do not jump or dive.", es: "No saltar ni tirarse de cabeza.", fr: "Ne sautez pas et ne plongez pas." },
      { it: "I bambini devono essere sempre sorvegliati da un adulto.", en: "Children must always be supervised by an adult.", es: "Los niños deben estar siempre supervisados por un adulto.", fr: "Les enfants doivent toujours être surveillés par un adulte." },
      { it: "Non sedersi né camminare sulla copertura.", en: "Do not sit or walk on the cover.", es: "No sentarse ni caminar sobre la cubierta.", fr: "Ne vous asseyez pas et ne marchez pas sur la couverture." }
    ],
    // Avviso molto evidente, testo ufficiale — non modificare il significato.
    bigWarning: {
      it: "Non svuotare, non spegnere e non modificare le impostazioni tecniche.",
      en: "Do not drain, switch off or change the technical settings.",
      es: "No vaciéis, no apaguéis ni modifiquéis los ajustes técnicos.",
      fr: "Ne videz pas, n'éteignez pas et ne modifiez pas les réglages techniques."
    },
    // Messaggio WhatsApp precompilato per il pulsante "Problemi o dubbi?"
    whatsappProblemMessage: {
      it: "Ciao Mario, ho un problema con la vasca idromassaggio di Casa Lobelie.",
      en: "Hi Mario, I have a problem with the hot tub at Casa Lobelie.",
      es: "Hola Mario, tengo un problema con el jacuzzi de Casa Lobelie.",
      fr: "Bonjour Mario, j'ai un problème avec le jacuzzi de Casa Lobelie."
    }
  },

  /* ---------------------------------------------------------------------
     MANGIARE VICINO — struttura pronta, nessun locale inventato.
     Copiate il blocco di esempio per aggiungerne uno nuovo.
     category consigliate: "restaurant" | "pizzeria" | "bar" | "breakfast"
  --------------------------------------------------------------------- */
  restaurants: [
    // ESEMPIO — decommentate e completate quando avete i dati reali:
    // {
    //   name: "Nome del locale",
    //   category: { it: "Ristorante", en: "Restaurant", es: "Restaurante", fr: "Restaurant" },
    //   description: { it: "Breve descrizione.", en: "", es: "", fr: "" },
    //   distance: { it: "5 minuti a piedi", en: "5 minute walk", es: "5 minutos a pie", fr: "5 minutes à pied" },
    //   mapsQuery: "Nome del locale, Roma",
    //   phone: "" // numero reale in formato internazionale, es. "39061234567" — lasciare vuoto se non volete il pulsante "Chiama"
    // }
  ],

  /* ---------------------------------------------------------------------
     SHOPPING E SERVIZI — stessa struttura di "restaurants".
     category consigliate: "supermarket" | "pharmacy" | "tobacco" | "atm" | "laundry" | "other"
  --------------------------------------------------------------------- */
  shopping: [
    // {
    //   name: "Nome dell'attività",
    //   category: { it: "Supermercato", en: "Supermarket", es: "Supermercado", fr: "Supermarché" },
    //   description: { it: "", en: "", es: "", fr: "" },
    //   distance: { it: "3 minuti a piedi", en: "3 minute walk", es: "3 minutos a pie", fr: "3 minutes à pied" },
    //   mapsQuery: "Nome dell'attività, Roma",
    //   phone: ""
    // }
  ],

  /* ---------------------------------------------------------------------
     SCOPRI ROMA — 6 mete classiche. Testi brevi e informazioni generiche
     e pubbliche; i tempi di percorrenza sono orientativi (il pulsante
     "Apri percorso" calcola sempre il tragitto reale in tempo reale).
     Per ogni voce, aggiungete una foto in guest/images/ con il nome
     indicato in "image" (se il file non esiste, appare un segnaposto).
  --------------------------------------------------------------------- */
  romeHighlights: [
    {
      id: "colosseo",
      name: { it: "Colosseo", en: "Colosseum", es: "Coliseo", fr: "Colisée" },
      description: {
        it: "Il grande anfiteatro romano, simbolo di Roma nel mondo.",
        en: "Rome's great amphitheatre and the city's most iconic landmark.",
        es: "El gran anfiteatro romano, símbolo de Roma en el mundo.",
        fr: "Le grand amphithéâtre romain, symbole de Rome dans le monde."
      },
      gettingThere: {
        it: "Con la Metro C da Alessandrino, zona raggiungibile direttamente.",
        en: "Take Metro C from Alessandrino — it reaches this area directly.",
        es: "En Metro C desde Alessandrino, zona alcanzable directamente.",
        fr: "En Métro C depuis Alessandrino, zone accessible directement."
      },
      mapsQuery: "Colosseo, Roma",
      image: "images/roma-colosseo.jpg"
    },
    {
      id: "trevi",
      name: { it: "Fontana di Trevi", en: "Trevi Fountain", es: "Fontana di Trevi", fr: "Fontaine de Trevi" },
      description: {
        it: "La fontana barocca più famosa al mondo, nel cuore del centro storico.",
        en: "The world-famous baroque fountain, in the heart of the historic centre.",
        es: "La fontana barroca más famosa del mundo, en el corazón del centro histórico.",
        fr: "La fontaine baroque la plus célèbre au monde, au cœur du centre historique."
      },
      gettingThere: {
        it: "Consigliati mezzi pubblici o taxi verso il centro storico.",
        en: "Public transport or a taxi to the historic centre is recommended.",
        es: "Se recomienda transporte público o taxi hacia el centro histórico.",
        fr: "Transports en commun ou taxi vers le centre historique recommandés."
      },
      mapsQuery: "Fontana di Trevi, Roma",
      image: "images/roma-trevi.jpg"
    },
    {
      id: "pantheon",
      name: { it: "Pantheon", en: "Pantheon", es: "Panteón", fr: "Panthéon" },
      description: {
        it: "Il tempio romano meglio conservato al mondo, oggi basilica.",
        en: "The best-preserved Roman temple in the world, today a basilica.",
        es: "El templo romano mejor conservado del mundo, hoy basílica.",
        fr: "Le temple romain le mieux conservé au monde, aujourd'hui basilique."
      },
      gettingThere: {
        it: "A pochi passi dalla Fontana di Trevi: si visitano bene insieme.",
        en: "A short walk from the Trevi Fountain — easy to combine in one visit.",
        es: "A pocos pasos de la Fontana di Trevi: se visitan bien juntos.",
        fr: "À deux pas de la Fontaine de Trevi : facile à combiner en une visite."
      },
      mapsQuery: "Pantheon, Roma",
      image: "images/roma-pantheon.jpg"
    },
    {
      id: "navona",
      name: { it: "Piazza Navona", en: "Piazza Navona", es: "Piazza Navona", fr: "Piazza Navona" },
      description: {
        it: "Una delle piazze più belle di Roma, con la Fontana dei Quattro Fiumi del Bernini.",
        en: "One of Rome's most beautiful squares, home to Bernini's Fountain of the Four Rivers.",
        es: "Una de las plazas más bellas de Roma, con la Fontana dei Quattro Fiumi de Bernini.",
        fr: "L'une des plus belles places de Rome, avec la fontaine des Quatre-Fleuves du Bernin."
      },
      gettingThere: {
        it: "Zona pedonale del centro storico, ben collegata con il Pantheon.",
        en: "A pedestrian area in the historic centre, close to the Pantheon.",
        es: "Zona peatonal del centro histórico, bien conectada con el Panteón.",
        fr: "Zone piétonne du centre historique, bien reliée au Panthéon."
      },
      mapsQuery: "Piazza Navona, Roma",
      image: "images/roma-navona.jpg"
    },
    {
      id: "vaticano",
      name: { it: "Musei Vaticani e San Pietro", en: "Vatican Museums & St. Peter's", es: "Museos Vaticanos y San Pedro", fr: "Musées du Vatican et Saint-Pierre" },
      description: {
        it: "La Cappella Sistina, i Musei Vaticani e la Basilica di San Pietro.",
        en: "The Sistine Chapel, the Vatican Museums and St. Peter's Basilica.",
        es: "La Capilla Sixtina, los Museos Vaticanos y la Basílica de San Pedro.",
        fr: "La Chapelle Sixtine, les Musées du Vatican et la Basilique Saint-Pierre."
      },
      gettingThere: {
        it: "Si consiglia di prenotare i biglietti online in anticipo.",
        en: "Booking tickets online in advance is recommended.",
        es: "Se recomienda reservar las entradas online con antelación.",
        fr: "Il est conseillé de réserver les billets en ligne à l'avance."
      },
      mapsQuery: "Musei Vaticani, Roma",
      image: "images/roma-vaticano.jpg"
    },
    {
      id: "trastevere",
      name: { it: "Trastevere", en: "Trastevere", es: "Trastevere", fr: "Trastevere" },
      description: {
        it: "Il quartiere più caratteristico di Roma: vicoli, trattorie e vita serale.",
        en: "Rome's most charming neighbourhood: cobbled lanes, trattorias and evening life.",
        es: "El barrio más pintoresco de Roma: callejuelas, trattorias y vida nocturna.",
        fr: "Le quartier le plus pittoresque de Rome : ruelles, trattorias et vie nocturne."
      },
      gettingThere: {
        it: "Ideale per una passeggiata serale o una cena informale.",
        en: "Perfect for an evening stroll or a casual dinner.",
        es: "Ideal para un paseo por la tarde o una cena informal.",
        fr: "Idéal pour une promenade en soirée ou un dîner informel."
      },
      mapsQuery: "Trastevere, Roma",
      image: "images/roma-trastevere.jpg"
    }
  ],

  /* ---------------------------------------------------------------------
     PER IL TUO SOGGIORNO — servizi extra proponibili. price: null = non
     mostrato (nessun prezzo inventato). Quando volete indicarne uno,
     scrivetelo come testo, es. "da 40 €".
  --------------------------------------------------------------------- */
  extraServices: [
    {
      id: "transfer",
      icon: "car",
      name: { it: "Transfer", en: "Transfer", es: "Traslado", fr: "Transfert" },
      description: {
        it: "Trasferimento privato da/per aeroporto o stazione.",
        en: "Private transfer to/from the airport or train station.",
        es: "Traslado privado desde/hacia el aeropuerto o la estación.",
        fr: "Transfert privé depuis/vers l'aéroport ou la gare."
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
        es: "Un ramo de flores listo para recibiros en la habitación.",
        fr: "Un bouquet de fleurs pour vous accueillir dans la chambre."
      },
      price: null
    },
    {
      id: "romantic",
      icon: "heart",
      name: { it: "Allestimento romantico", en: "Romantic setup", es: "Decoración romántica", fr: "Décoration romantique" },
      description: {
        it: "Un tocco speciale per un'occasione da ricordare.",
        en: "A special touch for an occasion to remember.",
        es: "Un toque especial para una ocasión inolvidable.",
        fr: "Une attention particulière pour une occasion à ne pas oublier."
      },
      price: null
    },
    {
      id: "late-checkout",
      icon: "clock",
      name: { it: "Late check-out", en: "Late check-out", es: "Salida tardía", fr: "Départ tardif" },
      description: {
        it: "Qualche ora in più per godervi l'appartamento, se disponibile.",
        en: "A few extra hours to enjoy the apartment, if available.",
        es: "Unas horas más para disfrutar del apartamento, si hay disponibilidad.",
        fr: "Quelques heures supplémentaires pour profiter de l'appartement, si disponible."
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
        es: "¿Tenéis una necesidad especial? Escribidnos, encontraremos una solución.",
        fr: "Une demande particulière ? Écrivez-nous, nous trouverons une solution."
      },
      price: null
    }
  ]
};
