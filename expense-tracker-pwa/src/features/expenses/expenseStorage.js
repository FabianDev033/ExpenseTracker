import { readStorageJSON, writeStorageJSON } from '../../storage/localStorage';
import { STORAGE_KEYS } from '../../storage/storageKeys';

/** @typedef {import('../../data/mockExpenses').Expense} Expense */

/**
 * Valida que un elemento leído de almacenamiento tenga la estructura mínima de un gasto.
 *
 * @param {unknown} value
 * @returns {value is Expense}
 */
function isValidExpense(value) {
  if (!value || typeof value !== 'object') return false;
  const candidate = /** @type {Record<string, unknown>} */ (value);
  return (
    typeof candidate.id === 'string' &&
    candidate.id.length > 0 &&
    typeof candidate.name === 'string' &&
    typeof candidate.amount === 'number' &&
    Number.isFinite(candidate.amount) &&
    candidate.amount > 0 &&
    typeof candidate.category === 'string'
  );
}

/**
 * Lee los gastos persistidos en localStorage.
 * Devuelve lista vacía si no hay datos, si el JSON está dañado o si el formato es inválido.
 *
 * @returns {Expense[]}
 */
export function readExpenses() {
  const parsed = readStorageJSON(STORAGE_KEYS.expenses, /** @type {unknown} */ ([]));
  if (!Array.isArray(parsed)) return [];
  return parsed.filter(isValidExpense);
}

/**
 * Guarda la lista de gastos en localStorage.
 *
 * @param {Expense[]} expenses
 * @returns {boolean}
 */
export function saveExpenses(expenses) {
  return writeStorageJSON(STORAGE_KEYS.expenses, expenses);
}
