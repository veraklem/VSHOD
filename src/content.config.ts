import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

/**
 * Контентная модель продукта линейки «ВСХОД».
 *
 * Правило: на сайт попадает только то, что подтверждено паспортом изделия.
 * Поля, отмеченные в паспорте «уточнить у технолога», НЕ заполняются
 * (штаммы, титр, декларация, срок ожидания и т. п.). Пока поле пустое,
 * соответствующий блок на странице не выводится.
 *
 * Как добавить продукт: см. README, раздел «Как добавить новый продукт».
 */
const schedule = z.object({
  stage: z.string(),
  dilution: z.string(),
  method: z.string(),
  when: z.string(),
})

const faq = z.object({ q: z.string(), a: z.string() })

const products = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/products' }),
  schema: ({ image }) =>
    z.object({
      /** Порядок в каталоге. */
      order: z.number(),
      /** Розничное название на этикетке: «Для рассады», «MBioFit». */
      name: z.string(),
      /** Техническое имя из паспорта: ИНБИО-РАСС. Показывается мелко. */
      techName: z.string().optional(),
      /** Одно предложение о назначении. Для карточки в каталоге. */
      tagline: z.string(),
      /** Вводный абзац из паспорта. */
      description: z.string(),
      /**
       * `active` — паспорт есть, страница полная.
       * `coming` — продукт анонсирован, паспорта нет: страница короткая,
       * без дозировок и регламента.
       */
      status: z.enum(['active', 'coming']).default('active'),
      /** Цветовой код направления: ключ из src/data/taxonomy.ts → ACCENTS. */
      accent: z.enum(['leaf', 'forest', 'teal', 'lilac', 'amber', 'sand', 'mint']),
      /** Метки задач/культур для фильтра: ключи из src/data/taxonomy.ts → TAGS. */
      tags: z.array(z.string()).min(1),
      /** «Кому подходит» — область применения из паспорта. */
      forWhom: z.array(z.string()).default([]),
      /** «Какие задачи помогает решать» — только из паспорта. */
      tasks: z.array(z.string()).default([]),
      /** Принцип действия простыми словами. */
      howItWorks: z.string().optional(),
      usage: z
        .object({
          preparation: z.string(),
          /** Регламент из паспорта. В паспортах помечен «уточнить у технолога». */
          schedule: z.array(schedule).default([]),
          /** Показывать ли таблицу регламента. Выключите, если технолог не подтвердил. */
          showSchedule: z.boolean().default(true),
          note: z.string().optional(),
        })
        .optional(),
      compatibility: z.string().optional(),
      safety: z.string().optional(),
      storage: z.string().optional(),
      shelfLife: z.string().optional(),
      /** Варианты объёма: «Флакон 0,5 л». Пусто → блок скрыт. */
      formats: z.array(z.string()).default([]),
      /** FAQ выводится, только если есть хотя бы один вопрос. */
      faq: z.array(faq).default([]),
      image: z.object({
        /** Сцена применения (культура/среда). Файл в src/assets/scenes. */
        scene: image(),
        sceneAlt: z.string(),
        /**
         * Точка фокуса кадра для object-position, например "50% 70%":
         * первое число — по горизонтали, второе — по вертикали (0% верх, 100% низ).
         * Нужна, потому что портретные сцены 4:5 обрезаются в карточке 4:3
         * и в шапке страницы.
         */
        focus: z.string().default('50% 50%'),
        /** Вторая сцена для шапки страницы продукта. Пусто → используется scene. */
        page: image().optional(),
        pageAlt: z.string().optional(),
        /** Фото флакона. Пока нет ни у одного продукта — карточка показывает сцену. */
        bottle: image().optional(),
        bottleAlt: z.string().optional(),
        /** Фото результатов применения. Пусто → галерея скрыта. */
        results: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      }),
      seo: z.object({
        title: z.string().max(70),
        description: z.string().max(170),
      }),
      /**
       * Что ждём от технолога/владельца. На сайт не выводится,
       * попадает в README-чеклист через `npm run pending`.
       */
      pending: z.array(z.string()).default([]),
    }),
})

export const collections = { products }
