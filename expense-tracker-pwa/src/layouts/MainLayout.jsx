import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import NewExpenseModal from '../components/NewExpenseModal';

export default function MainLayout() {
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const { pathname } = useLocation();
  const title =
    pathname === '/'
      ? 'Inicio'
      : pathname === '/expenses'
        ? 'Gastos'
        : pathname.startsWith('/expenses/')
          ? 'Detalle de Transacción'
          : pathname === '/settings'
            ? 'Ajustes'
            : 'ExpenseTracker';
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Ir al contenido
      </a>
      <header className="app-header">
        <h1>{title}</h1>
      </header>
      <main id="main" className="main-content">
        {notice && (
          <p className="notice" role="status">
            {notice}
          </p>
        )}
        <Outlet
          context={{
            openNewExpense: () => {
              setNotice('');
              setModalOpen(true);
            },
          }}
        />
      </main>
      <nav className="simple-nav" aria-label="Navegación principal">
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/expenses">Gastos</NavLink>
        <NavLink to="/settings">Ajustes</NavLink>
      </nav>

      {modalOpen && (
        <NewExpenseModal
          onClose={() => setModalOpen(false)}
          onSave={(message) => setNotice(message)}
        />
      )}
    </div>
  );
}
