import { useCallback, useEffect, useState } from 'react';
import { createExpense, removeExpense, subscribeToExpenses } from './expenseRepository';
import { ExpensesContext } from './useExpenses';

/**
 * @typedef {import('../../data/mockExpenses').Expense} Expense
 * @typedef {import('./useExpenses').NewExpenseInput} NewExpenseInput
 */

/** @param {{ children: import('react').ReactNode }} props */
export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState(/** @type {Expense[]} */ ([]));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToExpenses(
      (nextExpenses) => {
        setExpenses(nextExpenses);
        setIsLoaded(true);
      },
      (error) => {
        console.error('No se pudieron sincronizar los gastos con Firestore:', error);
        setIsLoaded(true);
      },
    );

    return unsubscribe;
  }, []);

  const addExpense = useCallback(
    /** @param {NewExpenseInput} input */
    (input) => {
      void createExpense(input).catch((error) => {
        console.error('No se pudo guardar el gasto en Firestore:', error);
      });
    },
    [],
  );

  const deleteExpense = useCallback(
    /** @param {string} id */
    (id) => {
      void removeExpense(id).catch((error) => {
        console.error('No se pudo eliminar el gasto en Firestore:', error);
      });
    },
    [],
  );

  return (
    <ExpensesContext.Provider value={{ expenses, isLoaded, addExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}
