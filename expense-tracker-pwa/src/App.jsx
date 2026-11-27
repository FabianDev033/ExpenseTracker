import { ExpensesProvider } from './features/expenses/ExpensesProvider';
import { SettingsProvider } from './features/settings/SettingsProvider';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <SettingsProvider>
      <ExpensesProvider>
        <AppRouter />
      </ExpensesProvider>
    </SettingsProvider>
  );
}
