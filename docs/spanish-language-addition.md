# Spanish Language Addition Notes

Date: 2026-04-29

## Research Result

Spanish needs at least two keyboard layout packs:

- `es-latam-qwerty`: Latin American Spanish. Microsoft identifies this as `KBDLA`, with `es-MX` metadata and a direct `ñ` key to the right of `l`.
- `es-es-qwerty`: Spanish Spain. Microsoft identifies this as `KBDSP`, with `es-ES` metadata, direct `ñ`, and Spain-specific surrounding symbol keys such as `ç`.

References used:

- Microsoft Latin American keyboard layout: https://learn.microsoft.com/en-us/msdn-files/resources/msdn/goglobal/keyboards/kbdla.html
- Keyboard Layout Info `KBDLA`: https://kbdlayout.info/KBDLA/
- Keyboard Layout Info `KBDSP`: https://kbdlayout.info/KBDSP/

Both layouts are QWERTY and close to the current English layout for letters. This made the first implementation straightforward for direct keys: most commands can be copied from English QWERTY physical positions, with `ñ` added as the right hand, 4th finger, in-place key.

## Decisions

- Added both Latin American and Spain layouts because they are distinct OS-level Spanish layouts and both are significant for real users.
- Default Spanish keyboard for Spanish UI is `es-latam-qwerty`, because Latin America covers many Spanish-speaking countries.
- V1 Spanish layout supports direct keys only: letters, `ñ`, space, and basic punctuation.
- Accented vowels such as `á`, `é`, `í`, `ó`, `ú` are not yet supported because they require dead-key/compose behavior. This should be designed separately before adding accent-heavy text.

## Implementation Friction

- Adding an interface language touches more files than adding only a keyboard layout because `AppLocale` is used in labels, notes, command maps, UI copy, browser-language detection, and tests.
- The easiest reusable improvement was `src/data/layouts/shared.ts`, which generates Spanish spoken commands from the existing method fields: `hand + fingerNumber + position`.
- The current app model handled the new layouts cleanly once `AppLocale` and `KeyboardLayoutId` were widened.

## Files Changed

- `src/types.ts`: added `es`, `es-es-qwerty`, and `es-latam-qwerty`.
- `src/i18n/es.ts` and `src/i18n/index.ts`: added Spanish UI copy.
- `src/data/layouts/shared.ts`: shared command helpers and Spanish command generation.
- `src/data/layouts/spanishQwerty.ts`: Spanish Spain and Latin American layout packs.
- `src/data/layouts/ruQwerty.ts` and `src/data/layouts/enUsQwerty.ts`: added Spanish interface command maps and Spanish labels/notes.
- `src/data/config.ts`: registered Spanish layouts.
- `src/main.ts`: made locale selection and defaults support `es`.
- `tests/`: added Spanish locale and layout coverage.

## Next Steps

- Design dead-key support before using accented Spanish training texts.
- Use `docs/add-keyboard-layout.md` for future keyboard-first layout additions.
