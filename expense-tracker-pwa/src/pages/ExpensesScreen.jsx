import ExpenseCard from '../components/ExpenseCard';
import { mockExpenses } from '../data/mockExpenses';
import useExpenseModal from '../hooks/useExpenseModal';
import '../styles/expenses.css';

export default function ExpensesScreen() {
  const { openNewExpense } = useExpenseModal();
  return (
    <section className="expenses-screen" aria-labelledby="expenses-title">
      <header className="section-heading">
        <div>
          <h2 id="expenses-title">Tus movimientos</h2>
          <p className="muted">{mockExpenses.length} gastos registrados</p>
        </div>
      </header>
      <button className="button" onClick={openNewExpense}>
        Registrar Nuevo Gasto
      </button>
      {mockExpenses.length ? (
        <ul className="expense-list">
          {mockExpenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">No hay gastos registrados.</p>
      )}
    </section>
  );
}
