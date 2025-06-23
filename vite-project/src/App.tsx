import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import Resultpage from './pages/Resultpage';
import About from './pages/About';
import Header from './components/Header'; 

function App() {
  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      <Header /> {/* Header compartilhado por todas as páginas */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<Resultpage />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;