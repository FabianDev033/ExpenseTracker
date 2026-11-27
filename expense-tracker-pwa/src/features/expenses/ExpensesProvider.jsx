import { useCallback, useEffect, useRef, useState } from 'react';
import { readExpenses, saveExpenses } from './expenseStorage';
import { ExpensesContext } from './useExpenses';

/**
 * @typedef {import('../../data/mockExpenses').Expense} Expense
 * @typedef {import('./useExpenses').NewExpenseInput} NewExpenseInput
 */

/** @returns {string} */
function createExpenseId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return String(Date.now());
}

/** @returns {string} */
function getTodayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** @param {{ children: import('react').ReactNode }} props */
export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(() => readExpenses());
  const lastSavedRef = useRef(expenses);

  useEffect(() => {
    if (lastSavedRef.current === expenses) return;
    lastSavedRef.current = expenses;
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = useCallback(
    /** @param {NewExpenseInput} input */
    (input) => {
      /** @type {Expense} */
      const newExpense = {
        id: createExpenseId(),
        name: input.name,
        amount: input.amount,
        category: input.category,
        date: getTodayISODate(),
        ...(input.notes ? { notes: input.notes } : {}),
      };
      setExpenses((current) => [...current, newExpense]);
      return newExpense;
    },
    [],
  );

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}
