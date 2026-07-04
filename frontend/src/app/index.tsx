import { AppProviders } from './providers';
import { AppRouter } from './routes';
import './styles/globals.css';

export const App = () => {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};
