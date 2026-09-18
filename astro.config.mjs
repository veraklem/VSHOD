// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Боевой домен пока не выбран. Когда появится, поменяйте `site`
// (используется для canonical, Open Graph, sitemap.xml и Schema.org).
// На Vercel до подключения домена можно временно указать адрес *.vercel.app.
export default defineConfig({
  site: 'https://vshod.example',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap()],
  image: {
    // Полные исходники лежат в src/assets/scenes; Astro сам делает AVIF/WebP и srcset.
    responsiveStyles: true,
    layout: 'constrained',
  },
  prefetch: false,
})
