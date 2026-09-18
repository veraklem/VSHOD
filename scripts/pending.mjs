#!/usr/bin/env node
/**
 * Печатает чек-лист «что нужно добавить до публикации»:
 * поле `pending` каждого продукта + общие TODO сайта.
 * Запуск: npm run pending
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const dir = fileURLToPath(new URL('../src/content/products/', import.meta.url))
const files = readdirSync(dir).filter((f) => f.endsWith('.json'))

const general = [
  'Домен: astro.config.mjs → site, public/robots.txt → Sitemap',
  'Логотип: установлен фирменный (лента-бесконечность с листьями). Файлы растровые PNG (src/assets/brand/); при желании заменить на SVG-вектор для идеальной резкости на любом размере',
  'Ссылка на Ozon: src/data/site.ts → ozon.available = true, ozon.url',
  'Телефон (если нужен): src/data/site.ts → contacts.phone',
  'Реквизиты ИП (ИНН, ОГРНИП) — понадобятся, если появятся формы/оферта; сейчас на сайте не выводятся',
  'Фото флаконов: image.bottle в JSON каждого продукта',
]

console.log('\n=== ОБЩЕЕ ===')
general.forEach((g) => console.log(' •', g))

for (const f of files.sort()) {
  const data = JSON.parse(readFileSync(join(dir, f), 'utf8'))
  if (!data.pending?.length) continue
  console.log(`\n=== ${data.name} (${f}) — ${data.status === 'coming' ? 'СКОРО' : 'активен'} ===`)
  data.pending.forEach((p) => console.log(' •', p))
}
console.log()
