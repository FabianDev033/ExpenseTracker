import { createContext, useContext } from 'react';

/**
 * @typedef {import('../../data/mockExpenses').Expense} Expense
 * @typedef {{ name: string, amount: number, category: string, notes?: string }} NewExpenseInput
 * @typedef {{
 *   expenses: Expense[],
 *   isLoaded: boolean,
 *   addExpense: (input: NewExpenseInput) => void,
 *   deleteExpense: (id: string) => Promise<void>,
 * }} ExpensesContextValue
 */

export const ExpensesContext = createContext(/** @type {ExpensesContextValue | null} */ (null));

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error('useExpenses debe usarse dentro de ExpensesProvider');
  }
  return context;
}
