import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import { UserProvider, useUser } from './contexts/UserContex';
import MemebersDisplay from './pages/secure/members/display';
import Dashboard from './pages/secure/dashboard/Dashboard';
import Home from './pages/public/Home';
import MembersCreate from './pages/secure/members/create';


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
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path="/members" element={<MemebersDisplay />} />
              <Route path="/members/create" element={<MembersCreate />} />
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