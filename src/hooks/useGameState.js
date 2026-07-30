import { useState, useEffect } from 'react';
import { cells } from '../data/gameData';

// Хук для управления состоянием игры с localStorage
export function useGameState() {
  const [gameState, setGameState] = useState(() => {
    const saved = localStorage.getItem('lila-game-state');
    return saved ? JSON.parse(saved) : {
      isPlaying: false,
      currentPosition: null,
      intention: '',
      currentRoll: null,
      history: [], // история ходов в текущей партии
      gamesPlayed: 0,
      gamesWon: 0
    };
  });

  // Сохранение в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('lila-game-state', JSON.stringify(gameState));
  }, [gameState]);

  // Найти клетку по ID
  const getCell = (id) => cells.find(c => c.id === id);

  // Начать новую игру с намерением
  const startGame = (intention) => {
    setGameState(prev => ({
      ...prev,
      isPlaying: true,
      intention,
      currentPosition: null, // ждём броска 6
      currentRoll: null,
      history: []
    }));
  };

  // Бросок кубика с обработкой змей и стрел
  const rollDice = () => {
    const roll = Math.floor(Math.random() * 6) + 1;
    setGameState(prev => {
      let newPosition = prev.currentPosition;
      let finalPosition = null;
      let newHistory = [...prev.history];
      let extraRoll = false;
      let moveNote = '';

      // Если ещё не на доске (ждем 6 для входа)
      if (prev.currentPosition === null) {
        if (roll === 6) {
          newPosition = 6; // вход на клетку 6 "Заблуждение"
          extraRoll = true;
          moveNote = 'Вход в игру';
          finalPosition = newPosition;
        } else {
          moveNote = `Выпало ${roll}, нужна 6 для входа`;
          finalPosition = null;
        }
      } else {
        // Уже играем
        newPosition = prev.currentPosition + roll;
        
        // Проверка на перебор (цель - 68)
        if (newPosition > 68) {
          // Идём к 69-72
          if (newPosition > 72) {
            // Если больше 72 - это змея на 51
            newPosition = 51;
            moveNote = 'Перебор! Падение на 51';
          } else {
            moveNote = 'Перебор на верхнюю линию';
          }
        }
        
        finalPosition = newPosition;
        
        // Проверка на змею или стрелу
        const cell = getCell(finalPosition);
        if (cell && (cell.type === 'snake' || cell.type === 'arrow')) {
          finalPosition = cell.target;
          if (cell.type === 'snake') {
            moveNote += ` → Змея! Падение на ${cell.target}`;
          } else if (cell.type === 'arrow') {
            moveNote += ` → Стрела! Подъём на ${cell.target}`;
            extraRoll = true; // стрела даёт дополнительный бросок
          }
        }
        
        // Проверка на 6 - дополнительный бросок
        if (roll === 6 && cell?.type !== 'arrow') {
          extraRoll = true;
        }
        
        // Проверка победы
        if (finalPosition === 68) {
          moveNote += ' → КОСМИЧЕСКОЕ СОЗНАНИЕ! Победа!';
        }
        
        newHistory.push({ 
          roll, 
          from: prev.currentPosition, 
          to: finalPosition, 
          note: moveNote,
          cellName: cell?.name || ''
        });
      }

      return {
        ...prev,
        currentRoll: { value: roll, hasExtraRoll: extraRoll },
        currentPosition: finalPosition,
        history: newHistory,
        gamesWon: finalPosition === 68 ? prev.gamesWon + 1 : prev.gamesWon,
        isPlaying: finalPosition === 68 ? false : prev.isPlaying
      };
    });
  };

  // Завершить игру
  const endGame = () => {
    setGameState(prev => ({
      ...prev,
      isPlaying: false,
      currentPosition: null,
      currentRoll: null,
      history: [],
      gamesPlayed: prev.gamesPlayed + 1
    }));
  };

  // Сохранить запись дневника для клетки
  const saveJournalEntry = (cellId, entry) => {
    const journalKey = `lila-journal-${cellId}`;
    const entries = JSON.parse(localStorage.getItem(journalKey) || '[]');
    entries.unshift({ ...entry, date: new Date().toISOString() });
    localStorage.setItem(journalKey, JSON.stringify(entries));
    
    // Также сохраняем в общий дневник
    const allEntries = JSON.parse(localStorage.getItem('lila-all-journal') || '[]');
    allEntries.unshift({ 
      cellId, 
      ...entry, 
      date: new Date().toISOString(),
      intention: gameState.intention
    });
    localStorage.setItem('lila-all-journal', JSON.stringify(allEntries));
  };

  // Получить записи дневника для клетки
  const getJournalEntries = (cellId) => {
    const journalKey = `lila-journal-${cellId}`;
    return JSON.parse(localStorage.getItem(journalKey) || '[]');
  };

  // Получить все записи дневника
  const getAllJournalEntries = () => {
    return JSON.parse(localStorage.getItem('lila-all-journal') || '[]');
  };

  // Сбросить всё
  const resetAll = () => {
    localStorage.clear();
    setGameState({
      isPlaying: false,
      currentPosition: null,
      intention: '',
      currentRoll: null,
      history: [],
      gamesPlayed: 0,
      gamesWon: 0
    });
  };

  return {
    gameState,
    startGame,
    rollDice,
    endGame,
    saveJournalEntry,
    getJournalEntries,
    getAllJournalEntries,
    resetAll
  };
}

export default useGameState;
