import { useState } from 'react';
import './Settings.css';

export default function Settings() {
  const [theme, setTheme] = useState(() => 
    localStorage.getItem('lila-theme') || 'system'
  );
  
  const [soundEnabled, setSoundEnabled] = useState(() => 
    localStorage.getItem('lila-sound') !== 'false'
  );
  
  const [vibrationEnabled, setVibrationEnabled] = useState(() => 
    localStorage.getItem('lila-vibration') !== 'false'
  );

  // Сохранение настроек
  const updateSetting = (key, value) => {
    localStorage.setItem(`lila-${key}`, value.toString());
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    updateSetting('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.style.colorScheme = 'dark';
    } else if (newTheme === 'light') {
      document.documentElement.style.colorScheme = 'light';
    } else {
      document.documentElement.style.colorScheme = '';
    }
  };

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    updateSetting('sound', !soundEnabled);
  };

  const handleVibrationToggle = () => {
    setVibrationEnabled(!vibrationEnabled);
    updateSetting('vibration', !vibrationEnabled);
  };

  return (
    <div className="settings-page">
      <h1>Настройки</h1>

      <div className="settings-section">
        <h2>Тема оформления</h2>
        <div className="option-group">
          <button
            className={`option-btn ${theme === 'light' ? 'active' : ''}`}
            onClick={() => handleThemeChange('light')}
          >
            ☀️ Светлая
          </button>
          <button
            className={`option-btn ${theme === 'dark' ? 'active' : ''}`}
            onClick={() => handleThemeChange('dark')}
          >
            🌙 Тёмная
          </button>
          <button
            className={`option-btn ${theme === 'system' ? 'active' : ''}`}
            onClick={() => handleThemeChange('system')}
          >
            💻 Системная
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>Звук и вибрация</h2>
        
        <div className="toggle-row">
          <span>Звуковые эффекты</span>
          <button
            className={`toggle-btn ${soundEnabled ? 'on' : 'off'}`}
            onClick={handleSoundToggle}
          >
            {soundEnabled ? 'Вкл' : 'Выкл'}
          </button>
        </div>

        <div className="toggle-row">
          <span>Вибрация</span>
          <button
            className={`toggle-btn ${vibrationEnabled ? 'on' : 'off'}`}
            onClick={handleVibrationToggle}
          >
            {vibrationEnabled ? 'Вкл' : 'Выкл'}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>О приложении</h2>
        <p className="version-info">
          Лила — Игра самопознания<br />
          Версия 1.0.0
        </p>
        <p className="description">
          Полноценное PWA-приложение для практики игры Лила по книге Хариша Джохари.
          Все данные хранятся локально в вашем браузере.
        </p>
      </div>
    </div>
  );
}
