# Roadmap

Next useful steps:

- Replace the welcome headline `Слепая печать через телесные команды` with: `Учимся слепой печати, как в Матрице, один раз с первого раза и до черного пояса: до навыка, который невозможно забыть.`
- Add multilingual SEO metadata to the main page so Google can find the trainer in every supported interface/training language.
- Add share buttons to the main page for 3-4 major networks or channels.
- Add the keyboard-and-hands reference image from `refs/` to the bottom of the welcome screen so the learner immediately sees the target hand position.
- Add visual keyboard highlights that match the active layout.
- Keep expanding commands for each keyboard layout in Russian and English.
- Add lesson presets that start from the starting finger positions and gradually expand to the whole keyboard.
- Add a compact instruction panel on the trainer screen with the current rule: say the command, feel the movement, press the key.
- Add an error review mode that shows which symbols caused the most wrong attempts.
- Replace demo/test training texts with an original short text that can be translated into every supported training language. It should be calm, simple, familiar, a little playful, and positive. Do not commit copyrighted song lyrics.
- Candidate original text direction: a tiny scene about a warm morning, tea, a cat-shaped cloud, a steady breath, and patient fingers learning one key at a time.
- Add trainer statistics on the main screen: active typing time, typed characters, typed words, and typing speed.
- Count active typing time only while the learner is actively entering characters. If there is no input for 5 seconds, pause the timer until the next input.
- Persist trainer statistics in `localStorage`. This data may be temporary and browser-local; it does not need account-level durability.
- Show a 3-hour skill target on the trainer screen. After active typing time passes 3 hours, change the time indicator color from yellow to blue and add a celebratory marker such as three fireworks.
- Add user-selectable visual styles/themes in settings. Do not expose unfinished styles on the main screen; only tested styles should be selectable.
- Replace the current hand asset with a version where thumbs are separate visible fields. The thumb should remain unfilled when highlighting the active palm and numbered finger.
- Keep the current CSS grayscale treatment for the hand asset for now; it works well enough as the base visual direction.
- Clarify the command grammar in the trainer flow: hand means which hand moves, number means the finger counted from the thumb, and position means the movement of that target finger.
- Add a movement marker near the active finger: a circled cross for "in place" and path arrows for directional commands.
- Design movement arrows as grid-step paths. Example: down-right is one step down and one step right; far up-left can be two repeated up-left steps. This should make the command system feel complete across the keyboard.
- Deepen direct-key layout packs with punctuation and regional variants after checking real keyboard layouts.
- Design dead-key support for Spanish accents before using accent-heavy Spanish texts.
- Add a public command-map editor for contributors, so new layouts can be reviewed without touching the trainer engine.
- Improve completion state with repeat, next lesson, and edit text actions.

Done:

- Replaced the manually drawn trainer hands with `public/assets/hands-from-refs-numbered-v3.svg` as the base visual.
- The trainer overlays active palm and active numbered finger highlights on top of that vector asset using only `hand + fingerNumber`.
- Custom training text keeps its original case so advanced input behavior can be tested. Default layout texts still use V1 lowercase normalization.
- The trainer desaturates the hand asset dynamically and highlights the active hand and active finger in red using asset-derived paths.
- Added Spanish interface copy plus Spanish QWERTY Latin America and Spanish QWERTY Spain layout packs. See `docs/spanish-language-addition.md`.
- Added keyboard-first direct-key layout packs for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak. See `docs/language-layout-rollout.md`.
- Added interface-language support for Portuguese, French, German, Italian, Polish, Ukrainian, Turkish, Dutch, Czech, and Slovak.
