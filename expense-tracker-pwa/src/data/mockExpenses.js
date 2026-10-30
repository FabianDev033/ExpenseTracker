/** @typedef {{ id: string, name: string, amount: number, category: string, date?: string, notes?: string }} Expense */

/** @type {Expense[]} */
export const mockExpenses = [
  { id: '1', name: 'Supermercado', amount: 25000, category: 'Alimentación' },
  { id: '2', name: 'Combustible', amount: 18000, category: 'Transporte' },
  { id: '3', name: 'Internet', amount: 32000, category: 'Servicios' },
];

export const categories = ['Alimentación', 'Transporte', 'Servicios', 'Otros'];
export const formatAmount = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format;
