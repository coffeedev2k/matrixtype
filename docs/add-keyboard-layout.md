# Add A Keyboard Layout

Use this checklist when adding a new training keyboard layout.

1. Research a real OS-level layout first.
   Prefer Microsoft keyboard docs and Keyboard Layout Info:
   - https://learn.microsoft.com/en-us/globalization/keyboards/
   - https://kbdlayout.info/

2. Pick the layout id and regional variant.
   Use explicit ids such as `pt-br-abnt2`, `fr-fr-azerty`, or `de-de-qwertz`.

3. Decide what is supported in V1.
   Current V1 support is direct keys plus Shift-derived uppercase. Dead keys, AltGr, compose, IME, and CapsLock-specific behavior are deferred.

4. Add the layout pack.
   Provide labels and notes for `ru`, `en`, and `es`. Keep default text limited to supported characters.

5. Add tests.
   Check at least one representative key, uppercase derivation when applicable, and that the default text contains only supported characters.

6. Update docs.
   Add the layout to `docs/language-layout-rollout.md` and update architecture or roadmap notes when a new limitation is discovered.

7. Run the local gate.
   Use:

   ```bash
   pre-commit run --all-files
   ```
