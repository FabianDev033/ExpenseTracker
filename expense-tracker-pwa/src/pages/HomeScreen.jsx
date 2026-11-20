import { Link } from 'react-router-dom';
import { mockExpenses, formatAmount } from '../data/mockExpenses';
import useExpenseModal from '../hooks/useExpenseModal';
import '../styles/home.css';

export default function HomeScreen() {
  const { openNewExpense } = useExpenseModal();
  const total = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  return (
    <section className="home-screen" aria-labelledby="welcome-title">
      <header className="welcome">
        <h2 id="welcome-title">
          Bienvenido a <span>ExpenseTracker</span>
        </h2>
        <p>Llevá un registro de tus gastos personales de forma simple y organizada.</p>
        <p>Controlá tus finanzas y descubrí en qué gastás tu dinero.</p>
      </header>
      <section className="summary" aria-labelledby="summary-title">
        <h3 id="summary-title">Tus gastos registrados</h3>
        <p className="summary-total">{formatAmount(total)}</p>
        <p className="muted">{mockExpenses.length} movimientos</p>
      </section>
      <section className="quick-actions" aria-label="Accesos rápidos">
        <button className="button" onClick={openNewExpense}>
          Registrar Nuevo Gasto
        </button>
        <Link className="button button-secondary" to="/expenses">
          Ver Listado Completo
        </Link>
      </section>
    </section>
  );
}
