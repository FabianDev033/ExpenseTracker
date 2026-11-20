/** @typedef {'Alimentación' | 'Transporte' | 'Servicios' | 'Otros'} CategoryName */

/** @typedef {{ name: CategoryName, color: string, bgColor: string }} CategoryMeta */

/** @type {CategoryMeta[]} */
export const CATEGORIES = [
  { name: 'Alimentación', color: '#0F766E', bgColor: '#CCFBF1' },
  { name: 'Transporte', color: '#4F46E5', bgColor: '#E0E7FF' },
  { name: 'Servicios', color: '#B45309', bgColor: '#FEF3C7' },
  { name: 'Otros', color: '#475569', bgColor: '#F1F5F9' },
];

/** @type {CategoryName[]} */
export const CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

/**
 * @param {string} category
 * @returns {CategoryMeta}
 */
export function getCategoryMeta(category) {
  return (
    CATEGORIES.find((item) => item.name === category) ??
    CATEGORIES[CATEGORIES.length - 1]
  );
}

export const formatAmount = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format;
