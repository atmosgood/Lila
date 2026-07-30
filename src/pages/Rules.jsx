import { gameRules, creationStory } from '../data/gameData';
import './StaticPages.css';

export default function Rules() {
  return (
    <div className="static-page">
      <h1>Правила игры</h1>
      
      <div className="content-section">
        <h2>Как играть</h2>
        <ul>
          <li><strong>Вход в игру:</strong> {gameRules.entry}</li>
          <li><strong>Движение:</strong> {gameRules.movement}</li>
          <li><strong>Доска:</strong> {gameRules.board}</li>
          <li><strong>Стрелы:</strong> {gameRules.arrows}</li>
          <li><strong>Змеи:</strong> {gameRules.snakes}</li>
          <li><strong>Цель:</strong> {gameRules.goal}</li>
        </ul>
      </div>

      <div className="content-section">
        <h2>Особенности</h2>
        <p>
          Лила — это не азартная игра, а инструмент самонаблюдения. 
          Каждый бросок кубика считается ответом вселенной на ваш вопрос.
        </p>
        <p>
          После каждого хода откройте карточку клетки и запишите в дневник:
          «Что это значит для меня?» Это ключевой момент практики.
        </p>
      </div>

      <div className="disclaimer">
        <p>⚠️ {gameRules.disclaimer}</p>
      </div>
    </div>
  );
}
