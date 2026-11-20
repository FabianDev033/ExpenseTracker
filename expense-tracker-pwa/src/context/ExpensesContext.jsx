import { createContext, useContext, useState } from 'react';

/**
 * @typedef {{
 *   id: string,
 *   title: string,
 *   amount: number,
 *   category: string,
 *   notes: string,
 *   createdAt: string
 * }} Expense
 */

/**
 * @typedef {{
 *   title: string,
 *   amount: number,
 *   category: string,
 *   notes?: string
 * }} NewExpenseData
 */

/**
 * @typedef {{
 *   expenses: Expense[],
 *   isLoaded: boolean,
 *   addExpense: (data: NewExpenseData) => void,
 *   removeExpense: (id: string) => void
 * }} ExpensesContextValue
 */

/** @type {Expense[]} */
const INITIAL_EXPENSES = [
  {
    id: '1',
    title: 'Supermercado',
    amount: 25000,
    category: 'Alimentación',
    notes: 'Compra semanal de alimentos y productos de limpieza.',
    createdAt: '2026-10-28T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Combustible',
    amount: 18000,
    category: 'Transporte',
    notes: 'Carga de combustible para los traslados de la semana.',
    createdAt: '2026-10-27T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Internet',
    amount: 32000,
    category: 'Servicios',
    notes: 'Abono mensual del servicio de internet.',
    createdAt: '2026-10-25T12:00:00.000Z',
  },
];

const ExpensesContext = createContext(
  /** @type {ExpensesContextValue | null} */ (null),
);

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

/** @param {{ children: import('react').ReactNode }} props */
export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [isLoaded] = useState(true);

  /** @param {NewExpenseData} data */
  function addExpense(data) {
    /** @type {Expense} */
    const newExpense = {
      id: generateId(),
      title: data.title.trim(),
      amount: data.amount,
      category: data.category,
      notes: data.notes?.trim() ?? '',
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  }

  /** @param {string} id */
  function removeExpense(id) {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }

  return (
    <ExpensesContext.Provider
      value={{ expenses, isLoaded, addExpense, removeExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

/** @returns {ExpensesContextValue} */
export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe utilizarse dentro de un ExpensesProvider');
  }
  return context;
}
