import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import Game from './pages/Game';
import Rules from './pages/Rules';
import History from './pages/History';
import Journal from './pages/Journal';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Game />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/history" element={<History />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
