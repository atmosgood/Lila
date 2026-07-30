import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const navItems = [
  { path: '/', label: 'Игра', icon: '🎲' },
  { path: '/rules', label: 'Правила', icon: '📜' },
  { path: '/history', label: 'История', icon: '📖' },
  { path: '/journal', label: 'Дневник', icon: '📔' },
  { path: '/profile', label: 'Профиль', icon: '👤' }
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map(item => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
