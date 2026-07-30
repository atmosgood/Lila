import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import './Journal.css';

export default function Journal() {
  const { getAllJournalEntries } = useGameState();
  const [searchTerm, setSearchTerm] = useState('');
  
  const allEntries = getAllJournalEntries();
  
  // Фильтрация по поиску
  const filteredEntries = allEntries.filter(entry => 
    entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.intention?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Форматирование даты
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="journal-page">
      <h1>Дневник</h1>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Поиск по записям..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredEntries.length === 0 ? (
        <div className="empty-state">
          <p>Нет записей в дневнике</p>
          <p className="hint">Записи появятся после первых ходов в игре</p>
        </div>
      ) : (
        <div className="entries-list">
          {filteredEntries.map((entry, index) => (
            <div key={index} className="entry-card">
              <div className="entry-header">
                <span className="entry-cell">Клетка {entry.cellId}</span>
                <span className="entry-date">{formatDate(entry.date)}</span>
              </div>
              
              {entry.intention && (
                <div className="entry-intention">
                  <strong>Намерение:</strong> {entry.intention}
                </div>
              )}
              
              <p className="entry-text">{entry.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
