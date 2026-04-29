# Architecture

The app is a static Vite + TypeScript site.

Core concepts are intentionally separate:

- `appLocale`: interface language.
- `keyboardLayout`: concrete keyboard layout.
- `defaultText`: training text attached to the selected keyboard layout.
- `keyCommandMap`: character-to-command data attached to the selected `appLocale` and `keyboardLayout`.

Open layout data lives in `src/data/layouts/`. Each layout pack stores labels, default text, input locale, and command maps for every supported interface language.
