/** @typedef {{ id: string, name: string, amount: number, category: string, date?: string, notes?: string }} Expense */

/** @type {Expense[]} */
export const mockExpenses = [
  {
    id: '1',
    name: 'Supermercado',
    amount: 25000,
    category: 'Alimentación',
    date: '2026-10-28',
    notes: 'Compra semanal de alimentos y productos de limpieza.',
  },
  {
    id: '2',
    name: 'Combustible',
    amount: 18000,
    category: 'Transporte',
    date: '2026-10-27',
    notes: 'Carga de combustible para los traslados de la semana.',
  },
  {
    id: '3',
    name: 'Internet',
    amount: 32000,
    category: 'Servicios',
    date: '2026-10-25',
    notes: 'Abono mensual del servicio de internet.',
  },
];

export const categories = ['Alimentación', 'Transporte', 'Servicios', 'Otros'];
export const formatAmount = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
}).format;
