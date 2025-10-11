// App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <main>
          <AppRoutes />
        </main>
      </Router>
    </Provider>
  );
}