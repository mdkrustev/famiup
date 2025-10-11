// AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import { useUser } from './hooks/useUser';
import MemebersDisplay from './pages/secure/members/display';
import Dashboard from './pages/secure/dashboard/Dashboard';
import Home from './pages/public/Home';
import MembersCreate from './pages/secure/members/create';

export default function AppRoutes() {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>; // или spinner

  return (
    <Layout>
      <Routes>
        {/* Public route */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Home />} />

        {/* Protected routes */}
        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<MemebersDisplay />} />
            <Route path="/members/create" element={<MembersCreate />} />
          </>
        )}

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}
