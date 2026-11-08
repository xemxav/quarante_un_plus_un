#!/bin/sh
# Builds the zip to upload to the Chrome Web Store and Firefox Add-ons.
set -e
cd "$(dirname "$0")"
version=$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' manifest.json)
out="dist/quarante-un-plus-un-$version.zip"
mkdir -p dist
rm -f "$out"
zip -qr "$out" manifest.json content.js icons LICENSE -x '.*'
echo "$out"
