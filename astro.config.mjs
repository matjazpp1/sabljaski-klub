// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Naslov strani: najprej SITE_URL (lastna domena), nato samodejni naslov Cloudflare Pages.
const site = process.env.SITE_URL || process.env.CF_PAGES_URL || 'http://localhost:4321';

export default defineConfig({
  site,
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'sl',
    locales: ['sl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'sl', locales: { sl: 'sl-SI', en: 'en-GB' } },
    }),
  ],
});
