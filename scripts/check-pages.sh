#!/usr/bin/env bash
set -euo pipefail

URL="${1:-https://coffeedev2k.github.io/matrixtype/}"

html="$(curl -L -s "$URL")"

if grep -q 'src="/src/main.ts"' <<<"$html"; then
  echo "GitHub Pages is serving the repository root, not the Vite dist artifact."
  echo "The live HTML still references /src/main.ts."
  echo
  echo "Fix in GitHub:"
  echo "Settings -> Pages -> Build and deployment -> Source -> GitHub Actions"
  echo "Then rerun the CI and GitHub Pages workflow on main."
  exit 1
fi

if ! grep -q './assets/' <<<"$html"; then
  echo "GitHub Pages HTML does not look like a Vite production build."
  echo "Expected built asset references like ./assets/index-*.js."
  exit 1
fi

echo "GitHub Pages looks like a Vite production build: $URL"
