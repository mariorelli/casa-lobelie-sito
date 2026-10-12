# Self check-in — Casa Lobelie

Cartella autonoma da pubblicare in `https://casalobelie.it/self-check-in/`.

## Contenuto
- `index.html` — pagina (schermata lingua + guida), `noindex, nofollow`
- `style.css` — stile (token, font, pulsanti e schermata lingua della Guest Guide `/guest/`)
- `script.js` — traduzioni IT / EN / ES / FR, cambio lingua, ingrandimento foto, link WhatsApp
- `images/logo.jpg` — logo ufficiale (lo stesso di `/guest/images/logo.png`, ridimensionato a 400 px per caricare più in fretta)
- `images/box-chiavi.jpg`, `cancello-esterno.jpg`, `porta-appartamento.jpg` (+ versioni `-800.jpg`) — le tre foto originali ottimizzate
- `icons/` — favicon della Guest Guide

## Sicurezza
Il codice della cassetta portachiavi NON è presente in nessun file e non va mai aggiunto: viene inviato agli ospiti via SMS.

## Pubblicazione sul ramo main (GitHub Pages)
1. Copiate l'intera cartella `self-check-in` nella cartella principale del repository (accanto a `index.html`, `guest/`, `check-in/`).
2. GitHub Desktop: commit sul ramo `main` (es. "Aggiunta pagina self check-in") → Push.
   Oppure dal sito GitHub: Add file → Upload files → trascinate la cartella → Commit to main.
3. Dopo 1–2 minuti aprite https://casalobelie.it/self-check-in/ da smartphone e provate le 4 lingue.

Non servono modifiche ad altri file: niente menu, niente sitemap.xml, niente robots.txt.
