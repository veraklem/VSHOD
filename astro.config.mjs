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
  integrations: [sitemap()],
  // Картинки: srcset и sizes заданы явно в компонентах (widths/sizes),
  // авто-режим responsive-картинок Astro выключен, чтобы на retina
  // выбирались файлы нужного размера.
  prefetch: false,
})
