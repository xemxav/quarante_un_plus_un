# Store listing

Copy-paste material for the Chrome Web Store and Firefox Add-ons (AMO).

Upload: `dist/quarante-un-plus-un-<version>.zip` (built by `./package.sh`).
Screenshot: `store/screenshot-1280x800.png`. Store icon: `icons/icon128.png`.

## Name

41 + 1

## Short description / summary

**FR:** Transforme chaque 42 en 41 + 1. Allez l'OL !

**EN:** Turns every 42 into 41 + 1. Allez l'OL!

## Description

**FR:**

Un script bête pour une idée bête.

41 + 1 remplace chaque 42 que vous croisez sur le web par 41 + 1. Mathématiquement, rien ne change. Émotionnellement, tout change.

- Le texte des pages, le titre de l'onglet et les infobulles sont concernés, même ce qui se charge après coup.
- 1942, 4200 €, 0,42, A42, 42km et -42 ne sont pas touchés. On est mesquins, pas inconscients.
- Ce que vous tapez n'est jamais modifié. Si vous tapez quand même un 42, un petit « attention au 41 + 1 » apparaît sous le champ.
- Aucune donnée collectée, rien n'est envoyé nulle part.

Code source (GPL-3.0) : https://github.com/xemxav/quarante_un_plus_un

**EN:**

A dumb script for a dumb idea.

41 + 1 replaces every 42 you come across on the web with 41 + 1. Mathematically, nothing changes. Emotionally, everything does.

- Works on page text, the tab title and tooltips, including content that loads later.
- Leaves 1942, 4200 €, 0.42, A42, 42km and -42 alone. Petty, not reckless.
- Never changes what you type. If you type a 42 anyway, a small "attention au 41 + 1" shows up under the field.
- Collects no data and sends nothing anywhere.

Source code (GPL-3.0): https://github.com/xemxav/quarante_un_plus_un

## Category

- Chrome: Lifestyle → Fun
- Firefox: Games & Entertainment

## Chrome Web Store: Privacy practices tab

**Single purpose:**
Replaces the standalone number 42 with "41 + 1" on web pages, and shows a warning under text fields that contain 42.

**Host permission justification** (content script on all sites):
The joke has to work on every website, so the content script runs on all pages. It reads the page text only to swap 42 for 41 + 1 inside the page. Nothing is stored, logged or sent anywhere.

**Remote code:** No, I am not using remote code.

**Data usage:** Leave every data category unchecked. Tick the three certifications (no selling, no unrelated use, no creditworthiness use).

**Privacy policy URL:** Leave empty (no user data is collected).

## Firefox Add-ons: submission answers

- Distribution: On this site (listed).
- Source code: not needed. The code is not minified or bundled.
- License: GNU General Public License v3.0.
- Data collection: none (already declared in `manifest.json`).
- Privacy policy: none.
