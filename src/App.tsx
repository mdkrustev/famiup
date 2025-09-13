import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import { UserProvider } from './contexts/UserContex';

function App() {

  return (
    <Router>
      <main>
        <UserProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </UserProvider>
      </main>
    </Router>
  )
}

export default App
