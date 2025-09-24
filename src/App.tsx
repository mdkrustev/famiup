import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import { UserProvider, useUser } from './contexts/UserContex';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


function AppRoutes() {
  const { user, loading } = useUser();

  return (
    <Layout>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={user ? <Dashboard /> : <Home />} />

        {/* Protected routes */}
        {!loading && (
          <>
            {user && <>
              <Route path="/accounts" element={<Accounts />} />
            </>
            }
          </>
        )}
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <main>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </main>
    </Router>
  )
}