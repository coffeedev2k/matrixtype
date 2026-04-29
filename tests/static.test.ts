import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('static document metadata', () => {
  it('keeps multilingual SEO and social sharing metadata in index.html', () => {
    const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');

    expect(html).toContain('MatrixType — Blind Typing Trainer');
    expect(html).toContain('name="keywords"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('name="twitter:card"');

    for (const locale of ['ru', 'en', 'es', 'pt', 'fr', 'de', 'it', 'pl', 'uk', 'tr', 'nl', 'cs', 'sk']) {
      expect(html).toContain(`hreflang="${locale}"`);
    }
  });
});
