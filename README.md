# Casa Lobelie — Sito Web

Sito statico in 4 lingue (Italiano, Inglese, Spagnolo, Francese) per l'appartamento Casa Lobelie a Roma.

## Struttura

- `index.html` — versione italiana (pagina principale)
- `en.html` — versione inglese
- `es.html` — versione spagnola
- `fr.html` — versione francese
- `images/` — tutte le foto usate nel sito

Le pagine sono collegate tra loro tramite i pulsanti IT/EN/ES/FR nel menu: devono sempre stare tutte insieme nella stessa cartella, altrimenti i link si rompono.

## Come pubblicarlo gratis su GitHub Pages

1. **Crea un account GitHub** (se non ce l'hai già) su github.com — è gratuito.
2. **Crea un nuovo repository** (pulsante verde "New"): dagli un nome a scelta, ad esempio `casa-lobelie`. Lascialo pubblico. Non aggiungere README/licenza (li abbiamo già).
3. **Carica questi file**: nella pagina del repository appena creato, clicca "uploading an existing file" e trascina dentro tutti i file e la cartella `images` di questa cartella. Conferma il commit.
4. **Attiva GitHub Pages**: vai su Settings → Pages (menu a sinistra). In "Source" scegli il branch `main` e la cartella `/ (root)`. Salva. Dopo un paio di minuti GitHub ti darà un indirizzo tipo `https://tuonomeutente.github.io/casa-lobelie/` dove il sito è già online.
5. **Collega il tuo dominio** (quando lo acquisti): sempre in Settings → Pages, nel campo "Custom domain" scrivi il tuo dominio (es. `casalobelie.it`) e salva — GitHub crea automaticamente un file `CNAME` nel repository. Poi vai sul pannello di controllo DNS del tuo dominio (dal sito dove l'hai comprato) e aggiungi i record che GitHub ti indica nella loro guida ufficiale (in genere un record A verso gli IP di GitHub Pages, oppure un CNAME se usi un sottodominio come `www`). Il certificato HTTPS viene generato automaticamente da GitHub, gratis, di solito entro 24 ore.

Se preferisci, mandami le credenziali del dominio (o fammi accedere al pannello DNS) quando lo hai comprato e ti guido passo passo nella configurazione.
