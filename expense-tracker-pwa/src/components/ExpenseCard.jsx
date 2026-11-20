import { Link } from 'react-router-dom';
import CategoryBadge from './CategoryBadge';
import { formatAmount } from '../data/mockExpenses';

/** @param {{ expense: import('../data/mockExpenses').Expense }} props */
export default function ExpenseCard({ expense }) {
  return (
    <article>
      <Link className="expense-card" to={'/expenses/' + expense.id}>
        <div className="expense-card-description">
          <h3>{expense.name}</h3>
          <CategoryBadge category={expense.category} />
        </div>
        <p className="expense-amount">
          <span className="sr-only">Gasto: </span>− {formatAmount(expense.amount)}
        </p>
      </Link>
    </article>
  );
}
