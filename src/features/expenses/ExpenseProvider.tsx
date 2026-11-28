import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  createExpense,
  removeExpense,
  subscribeToExpenses,
  type NewExpenseInput,
} from './expenseRepository';
import type { Expense } from './types';

interface ExpensesContextValue {
  expenses: Expense[];
  isLoaded: boolean;
  addExpense: (expense: Expense | NewExpenseInput) => void;
  deleteExpense: (id: string) => Promise<void>;
}

const ExpensesContext = createContext<ExpensesContextValue | undefined>(undefined);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
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

  const addExpense = useCallback((expense: Expense | NewExpenseInput) => {
    void createExpense({
      name: expense.name,
      amount: expense.amount,
      category: expense.category,
    }).catch((error) => {
      console.error('No se pudo guardar el gasto en Firestore:', error);
    });
  }, []);

  const deleteExpense = useCallback((id: string) => removeExpense(id), []);

  return (
    <ExpensesContext.Provider value={{ expenses, isLoaded, addExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpense debe usarse dentro de ExpensesProvider');
  }
  return context;
}
