import { describe, expect, it } from 'vitest';
import { appCopy } from '../src/i18n';
import { appLocales } from '../src/types';

describe('interface copy', () => {
  it('keeps welcome promise and motivation localized for every interface language', () => {
    const englishMotivation = appCopy.en.welcomeMotivation.join('\n');

    for (const locale of appLocales) {
      const copy = appCopy[locale];

      expect(copy.welcomeTitle, locale).toBeTruthy();
      expect(copy.welcomeMotivation, locale).toHaveLength(3);
      expect(copy.welcomeMotivation.join('\n'), locale).toContain('MatrixType');
      expect(copy.methodSteps, locale).toHaveLength(9);
      expect(copy.methodSteps.join('\n'), locale).toContain('MatrixType');

      if (locale !== 'en') {
        expect(copy.welcomeMotivation.join('\n'), locale).not.toBe(englishMotivation);
        expect(copy.welcomeMotivation.join('\n'), locale).not.toContain('For people who work at a computer');
        expect(copy.welcomeMotivation.join('\n'), locale).not.toContain('Two and a half hours');
        expect(copy.methodSteps.join('\n'), locale).not.toContain('The principle of blind typing is simple');
        expect(copy.methodSteps.join('\n'), locale).not.toContain('The color scheme below');
      }
    }
  });
});
