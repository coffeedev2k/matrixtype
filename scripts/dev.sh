#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

PORT="${PORT:-5173}"

echo "Starting MatrixType locally..."
echo "Open: http://localhost:${PORT}/"

npm run dev -- --port "${PORT}"
