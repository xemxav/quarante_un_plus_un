# 41 + 1

A dumb script for a dumb idea.

This browser extension finds every 42 on every web page and replaces it with **41 + 1**.

Mathematically, nothing changes. Emotionally, everything does.

## What it does

- Turns 42 into 41 + 1 in page text, the tab title and hover tooltips, including text that loads later.
- Leaves 1942, 4200 €, 0.42, 42,5, A42 and 42km alone. We're petty, not reckless.
- Leaves -42 alone too. A minus in front of 42 is exactly where it belongs.
- Never touches what you type. If you type a 42 anyway, it puts **attention au 41 + 1** under the field. You've been warned.
- Shows no warning in password fields, because "your password contains 42" is a weird thing to put on screen.

## Install

Clone or download this repo first.

**Chrome**

1. Open `chrome://extensions` and turn on **Developer mode**.
2. Click **Load unpacked** and pick this folder.
3. Ignore the warning about `browser_specific_settings`. That part is for Firefox.

**Firefox**

1. Open `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…** and pick `manifest.json`.
3. Firefox forgets it on restart. Repeat as needed, like supporting a football club.

## Packaging for the stores

```sh
./package.sh
```

This builds `dist/quarante-un-plus-un-<version>.zip`, the file you upload to the Chrome Web Store and Firefox Add-ons. Listing texts and the screenshot are in [`store/`](store/listing.md). Bump `version` in `manifest.json` before each new upload.

## Known dumbness

- A 42 split by formatting (4**2**) survives.
- The warning floats over the page and can cover the line below the field.
- The answer to life, the universe and everything is now 41 + 1.

## FAQ

**Is it useful?** No.

**Does it work on Saint-Étienne's website?** Especially there.

**Why?** Allez l'OL.

## License

[GPL-3.0](LICENSE). Fork it, change it, share it, as long as your version stays open source too.
