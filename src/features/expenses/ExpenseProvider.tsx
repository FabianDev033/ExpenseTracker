import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from '../../storage/storageKeys';
import type { Expense } from './types';

interface ExpensesContextValue {
  expenses: Expense[];
  isLoaded: boolean;
  addExpense: (expense: Expense) => void;
}

const ExpensesContext = createContext<ExpensesContextValue | undefined>(undefined);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const LoadExpenses = async () => {
      try {
        const savedExpenses = await AsyncStorage.getItem(STORAGE_KEYS.expenses);
        if (savedExpenses !== null) {
          setExpenses(JSON.parse(savedExpenses) as Expense[]);
        }
      } catch (error) {
        console.error('No se pudieron cargar los gastos:', error);
      } finally {
        setIsLoaded(true);
      }
    };
    void LoadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const savedExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEYS.expenses, JSON.stringify(expenses));
      } catch (error) {
        console.error('No se pudieron guardar los gastos:', error);
      }
    };
    void savedExpenses();
  }, [expenses, isLoaded]);

  const addExpense = (expense: Expense) => {
    setExpenses((currentExpenses) => [...currentExpenses, expense]);
  };

  return (
    <ExpensesContext.Provider value={{ expenses, isLoaded, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses debe usarse dentro de ExpensesProvider');
  }
  return context;
}
