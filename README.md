# MatrixType

MatrixType is a static browser trainer for blind ten-finger typing. V1 supports independent interface language and keyboard layout selection.

The public repository contains the app engine, open Russian and English keyboard command data, schemas, and build setup.

Start with [docs/project-brief.md](docs/project-brief.md) for the product method, screen model, finger numbering, and testing protocol.

## Development

```bash
npm install
npm run dev
```

Or use the local launcher script:

```bash
./scripts/dev.sh
```

It installs dependencies when `node_modules/` is missing and starts the app at `http://localhost:5173/`.

To check the production build locally:

```bash
./scripts/preview.sh
```

## Checks

```bash
npm run check
```

Preferred local gate:

```bash
pre-commit run --all-files
```

Install the git hook with:

```bash
pre-commit install
```

## Future Layout Packs

The app separates:

- `appLocale`: interface language.
- `keyboardLayout`: concrete physical/symbol keyboard layout.
- `keyCommandMap`: mapping from character to spoken body command for the selected interface language.

The current keyboard layouts are Russian ЙЦУКЕН and English QWERTY. Planned layouts after that: Spanish, Portuguese, French, German, Italian, Polish, and Ukrainian. Japanese is not a direct next target because IME composition does not fit the V1 model of one character to one physical command.

See [docs/roadmap.md](docs/roadmap.md) for the next product steps.
