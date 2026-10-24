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
    password: "lobelie20"
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
     Ogni voce "operativa" (aircon, heating, kitchen, espresso, bathroom,
     waste) usa la forma { intro, list, outro } — intro/outro sono testi
     { it, en, es, fr }, list è un array (anche vuoto) di testi puntati
     { it, en, es, fr }. Testi reali forniti da Mario — non inventare né
     modificare il significato quando si traduce.
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
    },

    aircon: {
      intro: {
        it: "L'appartamento è dotato di aria condizionata. Utilizza il telecomando presente nell'appartamento per accendere, spegnere e regolare la temperatura.",
        en: "The apartment is equipped with air conditioning. Use the remote control provided in the apartment to turn it on, turn it off and adjust the temperature.",
        es: "El apartamento cuenta con aire acondicionado. Utiliza el mando a distancia disponible en el apartamento para encenderlo, apagarlo y regular la temperatura.",
        fr: "L'appartement est équipé de la climatisation. Utilisez la télécommande présente dans l'appartement pour l'allumer, l'éteindre et régler la température."
      },
      list: [
        { it: "Tieni porte e finestre chiuse mentre il climatizzatore è acceso.", en: "Keep doors and windows closed while the air conditioner is on.", es: "Mantén puertas y ventanas cerradas mientras el aire acondicionado esté encendido.", fr: "Gardez portes et fenêtres fermées pendant que le climatiseur est allumé." },
        { it: "Evita temperature eccessivamente basse.", en: "Avoid setting excessively low temperatures.", es: "Evita temperaturas demasiado bajas.", fr: "Évitez des températures trop basses." },
        { it: "Quando lasci l'appartamento per molte ore, spegni il climatizzatore.", en: "Turn off the air conditioner when you leave the apartment for several hours.", es: "Apaga el aire acondicionado cuando salgas del apartamento durante muchas horas.", fr: "Éteignez le climatiseur lorsque vous quittez l'appartement pour plusieurs heures." }
      ],
      outro: {
        it: "Se il telecomando o il climatizzatore non funzionano correttamente, contatta Casa Lobelie tramite WhatsApp.",
        en: "If the remote control or the air conditioner isn't working properly, please contact Casa Lobelie via WhatsApp.",
        es: "Si el mando o el aire acondicionado no funcionan correctamente, contacta con Casa Lobelie por WhatsApp.",
        fr: "Si la télécommande ou le climatiseur ne fonctionnent pas correctement, contactez Casa Lobelie via WhatsApp."
      }
    },

    heating: {
      intro: {
        it: "Casa Lobelie dispone di riscaldamento autonomo. Utilizza solamente i normali comandi messi a disposizione degli ospiti. Non modificare impostazioni tecniche dell'impianto.",
        en: "Casa Lobelie has independent heating. Please use only the standard controls provided for guests. Do not change the system's technical settings.",
        es: "Casa Lobelie dispone de calefacción autónoma. Utiliza solo los mandos habituales puestos a disposición de los huéspedes. No modifiques la configuración técnica del sistema.",
        fr: "Casa Lobelie dispose d'un chauffage autonome. Utilisez uniquement les commandes habituelles mises à disposition des hôtes. Ne modifiez pas les réglages techniques de l'installation."
      },
      list: [],
      outro: {
        it: "In caso di dubbi o malfunzionamenti, contatta Casa Lobelie tramite WhatsApp.",
        en: "If you have any questions or notice a malfunction, please contact Casa Lobelie via WhatsApp.",
        es: "Si tienes dudas o detectas algún fallo, contacta con Casa Lobelie por WhatsApp.",
        fr: "En cas de doute ou de dysfonctionnement, contactez Casa Lobelie via WhatsApp."
      }
    },

    kitchen: {
      intro: {
        it: "La cucina è a disposizione degli ospiti durante il soggiorno. Dopo l'utilizzo:",
        en: "The kitchen is available to guests throughout the stay. After use, please:",
        es: "La cocina está a disposición de los huéspedes durante la estancia. Después de usarla:",
        fr: "La cuisine est à la disposition des hôtes pendant le séjour. Après utilisation :"
      },
      list: [
        { it: "Spegni sempre gli apparecchi utilizzati.", en: "Always turn off any appliances you have used.", es: "Apaga siempre los electrodomésticos que hayas utilizado.", fr: "Éteignez toujours les appareils utilisés." },
        { it: "Non lasciare pentole o apparecchi accesi incustoditi.", en: "Never leave pots or appliances on and unattended.", es: "No dejes ollas o aparatos encendidos sin vigilancia.", fr: "Ne laissez jamais de casseroles ou d'appareils allumés sans surveillance." },
        { it: "Lascia il piano cucina ordinato.", en: "Leave the countertop tidy.", es: "Deja la encimera ordenada.", fr: "Laissez le plan de travail rangé." },
        { it: "Riponi gli alimenti deteriorabili in frigorifero.", en: "Store perishable food in the fridge.", es: "Guarda los alimentos perecederos en la nevera.", fr: "Rangez les aliments périssables au réfrigérateur." },
        { it: "Evita di lasciare residui di cibo in giro.", en: "Avoid leaving food scraps around.", es: "Evita dejar restos de comida.", fr: "Évitez de laisser des résidus de nourriture." }
      ],
      outro: {
        it: "Prima di uscire dall'appartamento verifica sempre che gli apparecchi utilizzati siano spenti.",
        en: "Before leaving the apartment, always check that any appliances you used are switched off.",
        es: "Antes de salir del apartamento, comprueba siempre que los electrodomésticos utilizados estén apagados.",
        fr: "Avant de quitter l'appartement, vérifiez toujours que les appareils utilisés sont éteints."
      }
    },

    espresso: {
      intro: {
        it: "A Casa Lobelie è disponibile una macchina per il caffè espresso. Utilizza la macchina presente in cucina seguendo le indicazioni disponibili accanto all'apparecchio.",
        en: "Casa Lobelie has an espresso machine available. Use the machine in the kitchen following the instructions next to it.",
        es: "En Casa Lobelie hay disponible una cafetera espresso. Utiliza la máquina de la cocina siguiendo las indicaciones que hay junto al aparato.",
        fr: "Casa Lobelie met à disposition une machine à café espresso. Utilisez la machine présente dans la cuisine en suivant les indications situées à côté de l'appareil."
      },
      list: [],
      outro: {
        it: "Se hai dubbi sul funzionamento, contatta Casa Lobelie tramite WhatsApp.",
        en: "If you're not sure how it works, please contact Casa Lobelie via WhatsApp.",
        es: "Si tienes dudas sobre su funcionamiento, contacta con Casa Lobelie por WhatsApp.",
        fr: "En cas de doute sur son fonctionnement, contactez Casa Lobelie via WhatsApp."
      }
    },

    bathroom: {
      intro: {
        it: "Per evitare problemi agli scarichi, nel WC getta esclusivamente carta igienica. Non gettare:",
        en: "To avoid drain problems, only flush toilet paper down the toilet. Please don't flush:",
        es: "Para evitar problemas en los desagües, en el WC tira únicamente papel higiénico. No tires:",
        fr: "Pour éviter les problèmes de canalisation, ne jetez dans les toilettes que du papier toilette. Ne jetez pas :"
      },
      list: [
        { it: "Salviette.", en: "Wet wipes.", es: "Toallitas húmedas.", fr: "Lingettes." },
        { it: "Assorbenti.", en: "Sanitary pads or tampons.", es: "Compresas o tampones.", fr: "Serviettes ou tampons hygiéniques." },
        { it: "Cotton fioc.", en: "Cotton swabs.", es: "Bastoncillos de algodón.", fr: "Cotons-tiges." },
        { it: "Altri oggetti.", en: "Any other objects.", es: "Otros objetos.", fr: "Tout autre objet." }
      ],
      outro: {
        it: "Segnala immediatamente eventuali perdite d'acqua o malfunzionamenti. Dopo l'utilizzo lascia il bagno in condizioni ordinate.",
        en: "Please report any water leaks or malfunctions immediately. Leave the bathroom tidy after use.",
        es: "Informa de inmediato cualquier fuga de agua o mal funcionamiento. Deja el baño ordenado después de usarlo.",
        fr: "Signalez immédiatement toute fuite d'eau ou tout dysfonctionnement. Laissez la salle de bain en ordre après utilisation."
      }
    },

    waste: {
      intro: {
        it: "Ti chiediamo di mantenere l'appartamento ordinato e di separare correttamente i rifiuti quando possibile. Utilizza i contenitori e i sacchetti predisposti nella struttura.",
        en: "Please keep the apartment tidy and sort waste correctly whenever possible. Use the bins and bags provided in the property.",
        es: "Te pedimos mantener el apartamento ordenado y separar correctamente los residuos siempre que sea posible. Utiliza los contenedores y bolsas puestos a disposición en el alojamiento.",
        fr: "Nous vous demandons de garder l'appartement en ordre et de trier correctement les déchets lorsque c'est possible. Utilisez les conteneurs et sacs prévus dans le logement."
      },
      list: [],
      outro: {
        it: "Non lasciare o abbandonare sacchetti di rifiuti nella veranda o nell'area relax.",
        en: "Please don't leave or abandon rubbish bags on the veranda or in the relax area.",
        es: "No dejes ni abandones bolsas de basura en la veranda ni en la zona de relax.",
        fr: "Ne laissez pas et n'abandonnez pas de sacs de déchets sur la véranda ou dans l'espace détente."
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
      { it: "Se l'idromassaggio si arresta automaticamente, è normale.", en: "If hydromassage stops automatically, this is normal.", es: "Si el hidromasaje se detiene automáticamente, es normal.", fr: "Si l'hydromassage s'arrête automatiquement, c'est normal." },
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
     MANGIARE VICINO — i consigli reali di Mario (dalla guida di Roma già
     pubblicata su casalobelie.it/guida). Copiate il blocco di esempio per
     aggiungerne uno nuovo.
     category consigliate: "restaurant" | "pizzeria" | "bar" | "breakfast"
  --------------------------------------------------------------------- */
  restaurants: [
    {
      name: "Cin Cin Bar",
      category: { it: "Ristorante", en: "Restaurant", es: "Restaurante", fr: "Restaurant" },
      description: {
        it: "Potete cenare o pranzare in questo ristorante con cucina tipica romana. Caratteristici sono i due balconi con vista su Piazza Venezia.",
        en: "A restaurant serving classic Roman cuisine, perfect for lunch or dinner. Its two balconies overlooking Piazza Venezia are a real highlight.",
        es: "Un restaurante con cocina típica romana, ideal para comer o cenar. Sus dos balcones con vistas a Piazza Venezia son un verdadero punto fuerte.",
        fr: "Un restaurant de cuisine romaine traditionnelle, parfait pour déjeuner ou dîner. Ses deux balcons avec vue sur la Piazza Venezia sont un vrai plus."
      },
      mapsQuery: "Cin Cin Bar, Roma",
      phone: ""
    },
    {
      name: "Ristorante Sora Lella",
      category: { it: "Ristorante", en: "Restaurant", es: "Restaurante", fr: "Restaurant" },
      description: {
        it: "Ristorante famoso e rinomato, prezzi adeguati alla fama e alla location. Si mangia bene e il personale è professionale: consigliato per un pranzo o una cena speciale.",
        en: "A famous, well-established restaurant with prices that match its reputation and location. Great food and professional staff — recommended for a special lunch or dinner.",
        es: "Un restaurante famoso y de gran reputación, con precios acordes a su fama y ubicación. Se come muy bien y el personal es profesional: recomendado para una comida o cena especial.",
        fr: "Un restaurant réputé et bien établi, avec des prix à la hauteur de sa renommée et de son emplacement. On y mange très bien et le personnel est professionnel : recommandé pour un déjeuner ou un dîner spécial."
      },
      mapsQuery: "Ristorante Sora Lella, Roma",
      phone: ""
    },
    {
      name: "Ovosodo Trattoria Pinseria",
      category: { it: "Trattoria", en: "Trattoria", es: "Trattoria", fr: "Trattoria" },
      description: {
        it: "Una garanzia, non delude mai. I primi piatti sono ottimi, così come i fritti e i dolci — consigliate le fettuccine al ragù in bianco e il cestino di crema/croccante al pistacchio. Molto apprezzata anche la formula aperitivo a 12€, con un tagliere di fritto, pizza, affettati, formaggio, mini panino e patatine fatte in casa. Consigliata la prenotazione.",
        en: "A safe bet that never disappoints. The pasta dishes are excellent, as are the fried starters and desserts — we recommend the fettuccine al ragù in bianco and the pistachio cream basket. The €12 aperitivo, which includes a cocktail and a board of fried snacks, pizza, cold cuts, cheese, a mini sandwich and homemade crisps, is also very popular. Booking ahead is recommended.",
        es: "Una garantía, nunca decepciona. Los primeros platos son excelentes, así como los fritos y los postres — recomendamos las fettuccine al ragù in bianco y la cesta de crema/crujiente de pistacho. También es muy popular el aperitivo por 12€, que incluye un cóctel y una tabla con fritos, pizza, embutidos, queso, mini bocadillo y patatas fritas caseras. Se recomienda reservar.",
        fr: "Une valeur sûre qui ne déçoit jamais. Les plats de pâtes sont excellents, tout comme les fritures et les desserts — nous recommandons les fettuccine al ragù in bianco et la corbeille de crème/croquant à la pistache. L'apéritif à 12 €, qui comprend un cocktail et une planche de fritures, pizza, charcuterie, fromage, mini-sandwich et chips maison, est également très apprécié. Réservation conseillée."
      },
      mapsQuery: "Ovosodo Trattoria Pinseria, Roma",
      phone: ""
    }
    // ESEMPIO — decommentate e completate quando avete altri dati reali:
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
     SHOPPING E SERVIZI — stessa struttura di "restaurants". Attualmente
     vuota: Mario non ha ancora indicato supermercati/farmacie/servizi da
     consigliare. Non è stato inventato nulla — la guida mostra un avviso
     "arriveranno presto" al posto di locali finti.
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
     SCOPRI ROMA — le mete scelte da Mario nella guida di Roma già
     pubblicata su casalobelie.it/guida, con le foto reali del progetto
     (nessuna immagine casuale). "badge" riporta, dove presente, il
     giudizio reale già mostrato sulla guida ("consigliato da... persone").
  --------------------------------------------------------------------- */
  romeHighlights: [
    {
      id: "giardino-aranci",
      name: { it: "Giardino degli Aranci", en: "Giardino degli Aranci (Orange Garden)", es: "Giardino degli Aranci (Jardín de los Naranjos)", fr: "Giardino degli Aranci (Jardin des Orangers)" },
      description: {
        it: "In cima al colle Aventino si trova il Parco Savello, conosciuto da tutti come il Giardino degli Aranci: una location nascosta e un po' misteriosa, ma soprattutto unica, da cui si ammira una vista spettacolare su tutta Roma — magari al tramonto.",
        en: "At the top of the Aventine Hill is Parco Savello, known to everyone as the Giardino degli Aranci (Orange Garden): a hidden, slightly mysterious spot with a truly unique, spectacular view over all of Rome — best enjoyed at sunset.",
        es: "En lo alto de la colina del Aventino se encuentra el Parco Savello, conocido por todos como el Giardino degli Aranci (Jardín de los Naranjos): un lugar escondido y un poco misterioso, pero sobre todo único, desde donde se disfruta de una vista espectacular de toda Roma — ideal al atardecer.",
        fr: "Au sommet de la colline de l'Aventin se trouve le Parco Savello, connu de tous sous le nom de Giardino degli Aranci (Jardin des Orangers) : un lieu caché et un peu mystérieux, mais surtout unique, offrant une vue spectaculaire sur tout Rome — idéal au coucher du soleil."
      },
      badge: { it: "795 persone del luogo lo consigliano", en: "Recommended by 795 locals", es: "Recomendado por 795 personas del lugar", fr: "Recommandé par 795 habitants" },
      mapsQuery: "Giardino degli Aranci (Parco Savello), Roma",
      image: "/images/giardino-aranci.jpg"
    },
    {
      id: "alberto-sordi",
      name: { it: "Galleria Alberto Sordi", en: "Alberto Sordi Gallery", es: "Galería Alberto Sordi", fr: "Galerie Alberto Sordi" },
      description: {
        it: "Una delle passeggiate più eleganti del centro storico: a due passi da Piazza Colonna e da Via del Corso, questa elegante galleria in stile liberty ospita negozi, un cinema e caffè sotto una splendida cupola in vetro e ferro battuto. Il nome è un omaggio al grande attore romano Alberto Sordi. Perfetta per una sosta all'ombra, magari dopo una visita alla Fontana di Trevi, a pochi minuti a piedi.",
        en: "One of the most elegant walks in the historic centre: just steps from Piazza Colonna and Via del Corso, this beautiful Art Nouveau shopping arcade houses boutiques, a cinema and cafés beneath a stunning glass-and-iron dome. It's named after the beloved Roman actor Alberto Sordi. A perfect shady stop, especially after a visit to the Trevi Fountain just a few minutes' walk away.",
        es: "Uno de los paseos más elegantes del centro histórico: a pocos pasos de Piazza Colonna y Via del Corso, esta preciosa galería de estilo modernista alberga tiendas, un cine y cafés bajo una espléndida cúpula de hierro y cristal. Su nombre rinde homenaje al querido actor romano Alberto Sordi. Una parada perfecta a la sombra, sobre todo después de visitar la Fontana di Trevi, a pocos minutos a pie.",
        fr: "L'une des plus belles promenades du centre historique : à quelques pas de la Piazza Colonna et de la Via del Corso, cette élégante galerie Art nouveau abrite des boutiques, un cinéma et des cafés sous une magnifique verrière en fer et verre. Son nom rend hommage au grand acteur romain Alberto Sordi. Une halte parfaite à l'ombre, notamment après une visite à la Fontaine de Trevi, à quelques minutes à pied."
      },
      badge: null,
      mapsQuery: "Galleria Alberto Sordi, Roma",
      image: "/images/alberto-sordi.jpg"
    },
    {
      id: "portico-ottavia",
      name: { it: "Portico d'Ottavia", en: "Portico d'Ottavia", es: "Portico d'Ottavia", fr: "Portico d'Ottavia" },
      description: {
        it: "Il simbolo del Quartiere ebraico, tanto da dare il nome alla sua via principale: fu costruito nel II secolo a.C. in sostituzione del più antico Portico di Metello, con il suo imponente doppio colonnato a circondare l'area centrale su cui sorgevano i templi di Giunone Regina e di Giove Statore. Un tempo era ornato da magnifiche statue equestri di bronzo.",
        en: "The symbol of the Jewish Quarter, which lends its name to the neighbourhood's main street: built in the 2nd century BC to replace the older Portico of Metellus, its imposing double colonnade once enclosed the temples of Juno Regina and Jupiter Stator. It was originally adorned with magnificent bronze equestrian statues.",
        es: "El símbolo del Barrio Judío, que da nombre a su calle principal: construido en el siglo II a.C. para sustituir al más antiguo Pórtico de Metelo, su imponente doble columnata rodeaba antiguamente los templos de Juno Regina y Júpiter Estátor. En origen estaba decorado con magníficas estatuas ecuestres de bronce.",
        fr: "Le symbole du Quartier juif, qui donne son nom à sa rue principale : construit au IIe siècle av. J.-C. pour remplacer l'ancien Portique de Metellus, son imposante double colonnade entourait autrefois les temples de Junon Regina et de Jupiter Stator. Il était à l'origine orné de magnifiques statues équestres en bronze."
      },
      badge: null,
      mapsQuery: "Portico d'Ottavia, Roma",
      image: "/images/portico-ottavia.jpg"
    },
    {
      id: "monte-testaccio",
      name: { it: "Monte Testaccio", en: "Monte Testaccio", es: "Monte Testaccio", fr: "Monte Testaccio" },
      description: {
        it: "Un quartiere molto carino per la vita notturna, con tanti locali dove cenare e trascorrere una piacevole serata romana. Di giorno vale la pena visitare anche il celebre mercato di Testaccio.",
        en: "A lovely neighbourhood for nightlife, full of places to have dinner and spend a pleasant Roman evening. By day, it's also worth visiting the famous Testaccio Market.",
        es: "Un barrio muy agradable para la vida nocturna, con muchos locales donde cenar y pasar una velada romana agradable. De día también merece la pena visitar el famoso mercado de Testaccio.",
        fr: "Un quartier très agréable pour la vie nocturne, avec de nombreux endroits où dîner et passer une belle soirée romaine. De jour, le célèbre marché de Testaccio vaut également le détour."
      },
      badge: { it: "374 persone del luogo lo consigliano", en: "Recommended by 374 locals", es: "Recomendado por 374 personas del lugar", fr: "Recommandé par 374 habitants" },
      mapsQuery: "Mercato di Testaccio, Roma",
      image: "/images/mercato-testaccio.jpg"
    },
    {
      id: "castel-gandolfo",
      name: { it: "Castel Gandolfo (gita fuori Roma)", en: "Castel Gandolfo (day trip)", es: "Castel Gandolfo (excursión)", fr: "Castel Gandolfo (excursion)" },
      description: {
        it: "Il più bello dei Castelli Romani, non solo per la bellezza della natura che lo circonda ma anche per l'eleganza del centro storico. La residenza estiva dei Pontefici lo ha reso famoso in tutto il mondo, con i giardini che ospitano i resti della Villa di Domiziano. Il borgo regala punti panoramici sul lago Albano, tra botteghe e ottimi ristoranti: una visita al lago, passeggiando sul lungolago o in battello, è d'obbligo se avete un giorno in più.",
        en: "The most beautiful of the Castelli Romani — not only for the natural beauty that surrounds it, but also for the elegance of its historic centre. As the Pope's former summer residence, it is famous the world over, its gardens holding the remains of Domitian's Villa. The village offers viewpoints over Lake Albano, dotted with shops and excellent restaurants: a visit to the lake, on foot along the lakefront or by boat, is a must if you have an extra day.",
        es: "El más bello de los Castelli Romani, no solo por la belleza natural que lo rodea sino también por la elegancia de su centro histórico. Antigua residencia de verano de los Papas, es famosa en todo el mundo, con jardines que albergan los restos de la Villa de Domiciano. El pueblo ofrece miradores sobre el lago Albano, entre tiendas y excelentes restaurantes: una visita al lago, paseando por el lungolago o en barco, es imprescindible si tenéis un día más.",
        fr: "Le plus beau des Castelli Romani, non seulement pour la beauté naturelle qui l'entoure, mais aussi pour l'élégance de son centre historique. Ancienne résidence d'été des papes, célèbre dans le monde entier, ses jardins abritent les vestiges de la Villa de Domitien. Le village offre des points de vue sur le lac Albano, parmi les boutiques et les excellents restaurants : une visite au lac, à pied le long des rives ou en bateau, s'impose si vous avez un jour de plus."
      },
      badge: { it: "154 persone del luogo lo consigliano", en: "Recommended by 154 locals", es: "Recomendado por 154 personas del lugar", fr: "Recommandé par 154 habitants" },
      mapsQuery: "Castel Gandolfo, Roma",
      image: "/images/castel-gandolfo.jpg"
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
