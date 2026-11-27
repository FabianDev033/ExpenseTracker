import { ExpensesProvider } from './features/expenses/ExpensesProvider';
import AppRouter from './router/AppRouter';

export default function App() {
  return (
    <ExpensesProvider>
      <AppRouter />
    </ExpensesProvider>
  );
}
