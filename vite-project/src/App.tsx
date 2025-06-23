import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import Resultpage from './pages/Resultpage';
import About from './pages/About';
import Header from './components/Header'; 
import { authService } from './services/authServices';

function App() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const isAuthenticated = authService.isAuthenticated();
    if (isAuthenticated) {
      const userData = authService.getUserFromToken();
      setUser(userData);
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      <Header 
        user={user}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<Resultpage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
