import { useOutletContext } from 'react-router-dom';

/** @returns {{ openNewExpense: () => void }} */
export default function useExpenseModal() {
  return useOutletContext();
}
