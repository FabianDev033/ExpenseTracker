import React, { createContext, useContext, useState } from "react";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  notes: string;
  createdAt: string;
}

export interface NewExpenseData {
  title: string;
  amount: number;
  category: string;
  notes?: string;
}

interface ExpensesContextValue {
  expenses: Expense[];
  isLoaded: boolean;
  addExpense: (data: NewExpenseData) => void;
  removeExpense: (id: string) => void;
}

const INITIAL_EXPENSES: Expense[] = [
  {
    id: "1",
    title: "Supermercado",
    amount: 25000,
    category: "Alimentación",
    notes: "Compra semanal de alimentos y productos de limpieza.",
    createdAt: "2026-10-28T12:00:00.000Z",
  },
  {
    id: "2",
    title: "Combustible",
    amount: 18000,
    category: "Transporte",
    notes: "Carga de combustible para los traslados de la semana.",
    createdAt: "2026-10-27T12:00:00.000Z",
  },
  {
    id: "3",
    title: "Internet",
    amount: 32000,
    category: "Servicios",
    notes: "Abono mensual del servicio de internet.",
    createdAt: "2026-10-25T12:00:00.000Z",
  },
];

const ExpensesContext = createContext<ExpensesContextValue | null>(null);

function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function ExpensesProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [isLoaded] = useState<boolean>(true);

  const addExpense = (data: NewExpenseData) => {
    const newExpense: Expense = {
      id: generateId(),
      title: data.title.trim(),
      amount: data.amount,
      category: data.category,
      notes: data.notes?.trim() ?? "",
      createdAt: new Date().toISOString(),
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  return (
    <ExpensesContext.Provider
      value={{ expenses, isLoaded, addExpense, removeExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses(): ExpensesContextValue {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses debe utilizarse dentro de un ExpensesProvider");
  }
  return context;
}
