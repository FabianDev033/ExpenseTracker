/** @param {{ expense: import('../data/mockExpenses').Expense }} props */
export default function ExpenseCard({ expense }) {
  return <article>{expense.name}</article>;
}
