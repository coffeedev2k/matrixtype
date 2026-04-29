# Roadmap

Next useful steps:

- Replace the welcome headline `Слепая печать через телесные команды` with: `Учимся слепой печати, как в Матрице, один раз с первого раза и до черного пояса: до навыка, который невозможно забыть.`
- Add the keyboard-and-hands reference image from `refs/` to the bottom of the welcome screen so the learner immediately sees the target hand position.
- Add visual keyboard highlights that match the active layout.
- Keep expanding commands for each keyboard layout in Russian and English.
- Add lesson presets that start from the starting finger positions and gradually expand to the whole keyboard.
- Add a compact instruction panel on the trainer screen with the current rule: say the command, feel the movement, press the key.
- Add an error review mode that shows which symbols caused the most wrong attempts.
- Replace demo/test training texts with memorable licensed or user-provided Russian and English texts. Do not commit copyrighted song lyrics, including Eagles lyrics, unless rights are cleared or the text is provided under an appropriate license.
- Add layout packs for Spanish and Portuguese after checking real keyboard layouts.
- Add a public command-map editor for contributors, so new layouts can be reviewed without touching the trainer engine.
- Improve completion state with repeat, next lesson, and edit text actions.

Done:

- Replaced the manually drawn trainer hands with `public/assets/hands-from-refs-numbered-v3.svg` as the base visual.
- The trainer overlays active palm and active numbered finger highlights on top of that vector asset using only `hand + fingerNumber`.
- Custom training text keeps its original case so advanced input behavior can be tested. Default layout texts still use V1 lowercase normalization.
- The trainer desaturates the hand asset dynamically and highlights the active hand and active finger in red using asset-derived paths.
