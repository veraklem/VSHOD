/**
 * Цветовые коды направлений и метки для фильтра каталога.
 * Цвета взяты из бренд-презентации «ВСХОД» (слайды 7 и 10).
 */

export type AccentKey = 'leaf' | 'forest' | 'teal' | 'lilac' | 'amber' | 'sand' | 'mint'

export interface Accent {
  /** Основной цвет: тонкая линия, точка, обводка. */
  color: string
  /** Тёмный вариант для текста на светлой подложке (контраст ≥ 4.5:1). */
  ink: string
  /** Светлая подложка метки. */
  soft: string
  /** Название направления из презентации. */
  label: string
}

export const ACCENTS: Record<AccentKey, Accent> = {
  leaf: { color: '#59A64E', ink: '#2F6A2A', soft: '#E8F3E2', label: 'Питание и рост' },
  forest: { color: '#2E6B3F', ink: '#24532F', soft: '#E3EEE4', label: 'Питание и рост' },
  mint: { color: '#8CCB6A', ink: '#3C6E2C', soft: '#EAF5E2', label: 'Питание и рост' },
  teal: { color: '#20A5B0', ink: '#116A72', soft: '#E0F2F3', label: 'Биозащита' },
  lilac: { color: '#9181BA', ink: '#5B4C87', soft: '#EEEAF5', label: 'Питание и рост' },
  amber: { color: '#F8B510', ink: '#7A5500', soft: '#FBF0D2', label: 'Энергия природы' },
  sand: { color: '#E5C78F', ink: '#6E5320', soft: '#F6EEDC', label: 'Почва и структура' },
}

export interface Tag {
  id: string
  label: string
  /** Короткая формулировка вопроса, на который отвечает фильтр. */
  hint: string
}

/** Фильтр «Что вам нужно?». Один продукт может входить в несколько групп. */
export const TAGS: Tag[] = [
  { id: 'rassada', label: 'Рассада и семена', hint: 'посев, всходы, пикировка' },
  { id: 'ogorod', label: 'Огород и теплица', hint: 'томаты, огурцы, корнеплоды' },
  { id: 'sad', label: 'Сад и цветник', hint: 'деревья, кустарники, розы' },
  { id: 'yagody', label: 'Ягоды', hint: 'клубника, малина, смородина' },
  { id: 'komnatnye', label: 'Комнатные растения', hint: 'горшки, кашпо, балкон' },
  { id: 'gazon', label: 'Газон', hint: 'посев, уход, восстановление' },
  { id: 'kompost', label: 'Компост', hint: 'куча, яма, компостер' },
  { id: 'urozhay', label: 'Хранение урожая', hint: 'погреб, подвал, тара' },
  { id: 'zashchita', label: 'Защита от вредителей', hint: 'гусеницы, тля, трипсы' },
  { id: 'cherenki', label: 'Черенки и укоренение', hint: 'черенкование, саженцы' },
]

export const tagById = (id: string): Tag | undefined => TAGS.find((t) => t.id === id)
