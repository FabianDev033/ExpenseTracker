import { Link, useNavigate, useParams } from 'react-router-dom';
import CategoryBadge from '../components/CategoryBadge';
import { mockExpenses, formatAmount } from '../data/mockExpenses';
import '../styles/expenses.css';

export default function ExpenseDetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const expense = mockExpenses.find((item) => item.id === id);
  // A direct visit has no in-app history entry to return to.
  function goBack() {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate('/expenses', { replace: true });
  }
  if (!expense)
    return (
      <section className="empty-state">
        <h2>Gasto no encontrado</h2>
        <p className="muted">No encontramos un movimiento con ese identificador.</p>
        <Link className="button" to="/expenses">
          Volver a Gastos
        </Link>
      </section>
    );
  const date = expense.date
    ? new Intl.DateTimeFormat('es-AR', { dateStyle: 'long' }).format(
        new Date(expense.date + 'T12:00:00'),
      )
    : 'Sin fecha';
  return (
    <section className="expense-detail" aria-labelledby="expense-title">
      <button className="button button-secondary back-button" onClick={goBack}>
        ← Volver
      </button>
      <article className="detail-card">
        <header>
          <CategoryBadge category={expense.category} />
          <h2 id="expense-title">{expense.name}</h2>
          <p className="detail-amount">− {formatAmount(expense.amount)}</p>
        </header>
        <dl>
          <div>
            <dt>Descripción</dt>
            <dd>{expense.name}</dd>
          </div>
          <div>
            <dt>Categoría</dt>
            <dd>{expense.category}</dd>
          </div>
          <div>
            <dt>Fecha</dt>
            <dd>{expense.date ? <time dateTime={expense.date}>{date}</time> : date}</dd>
          </div>
          <div>
            <dt>Notas</dt>
            <dd>{expense.notes || 'Sin notas'}</dd>
          </div>
        </dl>
      </article>
    </section>
  );
}
