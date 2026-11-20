import ExpenseCard from '../components/ExpenseCard';
import { useExpenses } from '../context/ExpensesContext';
import useExpenseModal from '../hooks/useExpenseModal';
import '../styles/expenses.css';

export default function ExpensesScreen() {
  const { expenses } = useExpenses();
  const { openNewExpense } = useExpenseModal();
  return (
    <section className="expenses-screen" aria-labelledby="expenses-title">
      <header className="section-heading">
        <div>
          <h2 id="expenses-title">Tus movimientos</h2>
          <p className="muted">{expenses.length} gastos registrados</p>
        </div>
      </header>
      <button className="button" onClick={openNewExpense}>
        Registrar Nuevo Gasto
      </button>
      {expenses.length ? (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <li key={expense.id}>
              <ExpenseCard expense={expense} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="empty-state">Todavía no registraste gastos.</p>
      )}
    </section>
  );
}
