# Project Brief

MatrixType is an open browser trainer for blind ten-finger typing.

## Core Method

The trainer binds each key press to a spoken body command. The learner reads the command, says it aloud, notices the physical movement, and only then presses the key. The app advances only after the correct key.

The method prioritizes accuracy over speed. The learner should move slowly, say commands aloud, avoid looking at the keyboard, and press the correct keys. Speed is expected to develop later.

## App Shape

The app has exactly three screens:

- Welcome: explains what the learner must do and how finger numbering works.
- Trainer: shows the current command, target text, typed text, active hand/finger, active-time statistics, common errors, and practical training rules.
- Settings: lets the learner edit custom training text, choose visual theme, and change preferences.

## Languages And Layouts

Interface language and keyboard layout are independent:

- `appLocale`: language of UI and spoken commands.
- `keyboardLayout`: physical/symbol keyboard being trained.

On the first visit, `appLocale` follows the browser language when supported. The initial keyboard layout is chosen to match that first interface locale when possible. Once the learner changes settings, saved preferences take precedence.

Examples:

- Russian UI + English QWERTY shows Russian commands for English keys.
- English UI + Russian ЙЦУКЕН shows English commands for Russian keys.

Commands are stored in layout packs under `src/data/layouts/`. UI text is stored under `src/i18n/`.

## Finger Numbering

Finger numbers follow the original method and should not be replaced with names like `index`, `pinky`, or other new method entities without explicit agreement.

- Thumb is not counted.
- The next finger after the thumb is `1`, then `2`, `3`, `4`.
- Left hand visual order from left to right is `4, 3, 2, 1`.
- Right hand visual order from left to right is `1, 2, 3, 4`.

The SVG hands should show both hands as outlines, fill the active hand palm, and fill only the active numbered finger.

## Practice Statistics

The trainer stores browser-local progress only. It tracks active typing time, typed characters, typed words, and word speed. Active time pauses when more than 5 seconds pass without input, and resumes after the next correct typed character.

The current skill target is 3 hours of active typing time. When the target is reached, the trainer changes the active-time card from yellow to blue and shows three fireworks.

## Testing And Done

Use pre-commit as the local quality gate:

```bash
pre-commit run --all-files
```

The pre-commit hook runs `npm run check`, which includes typecheck, tests, and production build.

Test logic belongs in `tests/`. Pre-commit should orchestrate checks, not contain test logic.
