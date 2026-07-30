import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { cells } from '../data/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import './Game.css';

export default function Game() {
  const { gameState, startGame, rollDice, endGame, saveJournalEntry } = useGameState();
  const [intention, setIntention] = useState('');
  const [showCard, setShowCard] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  
  // Получить текущую клетку
  const currentCell = gameState.currentPosition 
    ? cells.find(c => c.id === gameState.currentPosition) 
    : null;

  // Обработка начала игры
  const handleStartGame = () => {
    if (intention.trim()) {
      startGame(intention);
      setHasStarted(true);
    }
  };

  // Обработка броска кубика
  const handleRoll = () => {
    rollDice();
    setShowCard(true);
    
    // Вибрация при броске
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Сохранение записи дневника
  const handleSaveJournal = () => {
    if (gameState.currentPosition && journalText.trim()) {
      saveJournalEntry(gameState.currentPosition, {
        text: journalText,
        intention: gameState.intention
      });
      setJournalText('');
      setShowCard(false);
    }
  };

  // Если игра не начата - показываем экран намерения
  if (!hasStarted || !gameState.isPlaying) {
    return (
      <div className="game-screen">
        <div className="intention-container">
          <h1>Лила</h1>
          <p className="subtitle">Игра самопознания</p>
          
          <div className="intention-form">
            <label htmlFor="intention">Ваше намерение (вопрос)</label>
            <textarea
              id="intention"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="Сформулируйте вопрос, на который хотите получить ответ..."
              rows={4}
            />
            <button 
              onClick={handleStartGame}
              disabled={!intention.trim()}
              className="start-btn"
            >
              Начать игру
            </button>
          </div>

          <div className="quick-rules">
            <p>🎲 Для входа нужно выбросить 6</p>
            <p>🐍 Змеи опускают вниз (пороки)</p>
            <p>➡️ Стрелы поднимают вверх (добродетели)</p>
            <p>🎯 Цель — клетка 68 «Космическое сознание»</p>
          </div>
        </div>
      </div>
    );
  }

  // Экран игры
  return (
    <div className="game-screen playing">
      {/* Интенция */}
      <div className="intention-display">
        <span className="label">Намерение:</span>
        <span className="text">{gameState.intention}</span>
      </div>

      {/* Доска - упрощённая сетка */}
      <div className="board-container">
        <div className="board-grid">
          {Array.from({ length: 72 }, (_, i) => i + 1).map(cellId => {
            const isActive = gameState.currentPosition === cellId;
            const isGoal = cellId === 68;
            
            return (
              <motion.div
                key={cellId}
                className={`cell ${isActive ? 'active' : ''} ${isGoal ? 'goal' : ''}`}
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              >
                {cellId}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Кубик и статистика */}
      <div className="dice-section">
        {gameState.currentRoll && (
          <div className="last-roll">
            Бросок: <strong>{gameState.currentRoll.value}</strong>
            {gameState.currentRoll.hasExtraRoll && (
              <span className="extra-roll"> + дополнительный бросок!</span>
            )}
          </div>
        )}
        
        <button 
          onClick={handleRoll}
          className="dice-btn"
          disabled={gameState.currentPosition === 68}
        >
          🎲 Бросить кубик
        </button>
        
        {gameState.currentPosition === 68 && (
          <button onClick={endGame} className="end-game-btn">
            Завершить партию
          </button>
        )}
      </div>

      {/* Bottom Sheet карточка клетки */}
      <AnimatePresence>
        {showCard && currentCell && (
          <motion.div
            className="cell-card-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="sheet-handle" onClick={() => setShowCard(false)} />
            <div className="sheet-content">
              <h3>Клетка {currentCell.id}: {currentCell.name}</h3>
              <p className="cell-description">
                {currentCell.description}
              </p>
              
              {gameState.currentRoll && gameState.currentRoll.note && (
                <div className="roll-note">
                  <strong>Ход:</strong> {gameState.currentRoll.note}
                </div>
              )}
              
              <div className="journal-input">
                <label>Что это значит для меня?</label>
                <textarea
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Запишите ваши мысли..."
                  rows={4}
                />
                <button onClick={handleSaveJournal} className="save-btn">
                  Сохранить в дневник
                </button>
              </div>
              
              <button 
                onClick={() => setShowCard(false)}
                className="close-sheet-btn"
              >
                Закрыть
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
