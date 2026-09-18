/**
 * Настройки сайта: бренд, контакты, навигация.
 * Единственное место, где меняются почта и Telegram.
 */
export const site = {
  name: 'ВСХОД',
  /** Подпись под названием, как в презентации. */
  tagline: 'Наука · Рост · Будущее',
  /** Позиционирование одной строкой для title/description. */
  claim: 'Микробиологические решения для растений, урожая и почвы',
  developer: 'INBIOLAB',
  developerUrl: 'https://inbiolab.ru',
  /** Оператор/владелец бренда. Реквизиты (ИНН, ОГРНИП) — TODO(client), см. README. */
  legalName: 'ИП Проскурянова Мария',
  locale: 'ru_RU',
  contacts: {
    email: 'info@inbiolab.ru',
    telegram: 'https://t.me/inbiolabbot',
    telegramHandle: '@inbiolabbot',
    telegramChannel: 'https://t.me/inbiolab',
    /** Телефона пока нет — TODO(client). Пустая строка = не показывать. */
    phone: '' as string,
  },
  /** Продажи на Ozon ещё не открыты: показываем «Скоро на Ozon» без ссылки. */
  ozon: { available: false, url: '' },
  nav: [
    { label: 'Продукты', href: '/catalog' },
    { label: 'Для бизнеса', href: '/business' },
    { label: 'О технологии', href: '/about' },
    { label: 'Контакты', href: '/contacts' },
  ],
  /** Тема письма по умолчанию для mailto-ссылок. */
  mailSubjects: {
    general: 'Вопрос по продуктам ВСХОД',
    wholesale: 'Оптовая поставка ВСХОД',
    pilot: 'Пилотное применение ВСХОД',
  },
} as const

export function mailto(subject?: string, product?: string): string {
  const s = product && subject ? `${subject}: ${product}` : subject
  return s ? `mailto:${site.contacts.email}?subject=${encodeURIComponent(s)}` : `mailto:${site.contacts.email}`
}
