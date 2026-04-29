#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

PORT="${PORT:-4173}"

npm run build

echo "Starting production preview..."
echo "Open: http://localhost:${PORT}/"

npm run preview -- --port "${PORT}"
