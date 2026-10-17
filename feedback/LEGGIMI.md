# Questionario ospiti — Casa Lobelie

Cartella autonoma da pubblicare in `https://casalobelie.it/feedback/` (accanto a `self-check-in/` e `guest/`).

- `index.html`, `style.css`, `script.js`: questionario pubblico (schermata lingua identica a /self-check-in/, 8 domande, Cloudflare Turnstile, invio alla Edge Function `submit-feedback`).
- `admin/`: dashboard privata. Accesso con Supabase Auth (email + password + codice a 6 cifre); i dati arrivano solo dalla Edge Function `feedback-admin`, che verifica l'amministratore lato server.
- `images/logo.jpg`, `icons/`: gli stessi della pagina self check-in.

Nessuna chiave segreta è presente in questi file. In `admin/admin.js` va inserita solo la chiave PUBBLICA del progetto Supabase (vedi GUIDA-CONFIGURAZIONE.md).
Pagine con `noindex, nofollow`: non serve modificare menu, sitemap.xml o robots.txt.
