import { useGameState } from '../hooks/useGameState';
import './Profile.css';

export default function Profile() {
  const { gameState, resetAll, getAllJournalEntries } = useGameState();
  const allEntries = getAllJournalEntries();

  // Экспорт данных
  const handleExport = () => {
    const data = {
      gameState,
      journal: allEntries,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lila-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="profile-page">
      <h1>Профиль</h1>
      
      <div className="stats-section">
        <h2>Статистика</h2>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{gameState.gamesPlayed}</span>
            <span className="stat-label">Сыграно партий</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-value">{gameState.gamesWon}</span>
            <span className="stat-label">Достигнуто цели (68)</span>
          </div>
          
          <div className="stat-card">
            <span className="stat-value">{allEntries.length}</span>
            <span className="stat-label">Записей в дневнике</span>
          </div>
          
          {gameState.gamesPlayed > 0 && (
            <div className="stat-card">
              <span className="stat-value">
                {Math.round((gameState.gamesWon / gameState.gamesPlayed) * 100)}%
              </span>
              <span className="stat-label">Успешных партий</span>
            </div>
          )}
        </div>
      </div>

      <div className="actions-section">
        <h2>Действия</h2>
        
        <button onClick={handleExport} className="action-btn">
          📥 Экспорт данных (JSON)
        </button>
        
        <button onClick={resetAll} className="action-btn danger">
          ⚠️ Очистить все данные
        </button>
      </div>

      <div className="info-section">
        <h2>О приложении</h2>
        <p>
          <strong>Лила</strong> — игра самопознания по книге Хариша Джохари.
        </p>
        <p>
          Версия: 1.0.0<br />
          Все данные хранятся локально в вашем браузере.
        </p>
      </div>
    </div>
  );
}
