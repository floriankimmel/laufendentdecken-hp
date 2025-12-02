import { defineConfig, fontProviders } from 'astro/config';
import db from '@astrojs/db';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  build: {
    inlineStylesheets: 'always'
  },
  experimental: {
    clientPrerender: true,
    fonts: [
      {
        provider: fontProviders.google({
          experimental: { variableAxis: { Inter: { opsz: ['14..32'] } } }
        }),
        name: 'Inter',
        cssVariable: '--astro-font-inter',
        weights: ['300 900'],
        styles: ['normal'],
        subsets: ['latin']
      }
    ]
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https'
      },
      {
        protocol: 'http'
      }
    ],
    service: { entrypoint: 'astro/assets/services/noop' }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  site: 'https://whiskey.fm',
  trailingSlash: 'never',
  integrations: [
    db(),
    preact(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        // Exclude episode number pages and only include slug pages.
        return !/^\/\d+\/?$/.test(pathname);
      }
    })
  ],
  // These were specific redirects we needed for our podcast, if you do not have any routes to redirect, you can safely remove this.
  redirects: {
    '/hot-takes-tan-stack-and-open-source-with-tanner-linsley':
      '/hot-takes-tanstack-and-open-source-with-tanner-linsley',
    '/creating-code-pen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier':
      'creating-codepen-tackling-tailwind-and-keeping-it-simple-with-chris-coyier',
    '/coding-languages-ai-and-the-evolution-of-game-development-with-phillip-winston':
      '/coding-languages-ai-and-the-evolution-of-game-development-with-philip-winston'
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
