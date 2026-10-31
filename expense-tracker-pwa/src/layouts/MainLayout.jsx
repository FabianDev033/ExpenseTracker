import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import NewExpenseModal from '../components/NewExpenseModal';
import InstallBanner from '../components/InstallBanner';
import NavigationIcon from '../components/NavigationIcon';
import '../styles/navigation.css';
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
      <nav className="bottom-nav" aria-label="Navegación principal">
        <div className="bottom-nav-inner">
          <NavLink to="/" end>
            <NavigationIcon name="home" />
            <span>Inicio</span>
          </NavLink>
          <NavLink to="/expenses">
            <NavigationIcon name="receipt" />
            <span>Gastos</span>
          </NavLink>
          <NavLink to="/settings">
            <NavigationIcon name="settings" />
            <span>Ajustes</span>
          </NavLink>
        </div>
      </nav>
      <InstallBanner />
      {modalOpen && (
        <NewExpenseModal
          onClose={() => setModalOpen(false)}
          onSave={(message) => setNotice(message)}
        />
      )}
    </div>
  );
}
