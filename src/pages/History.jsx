import { creationStory } from '../data/gameData';
import './StaticPages.css';

export default function History() {
  return (
    <div className="static-page">
      <h1>История создания</h1>
      
      <div className="content-section">
        <p className="intro">
          Лила — древняя индийская игра самопознания, основанная на философии Веданты.
        </p>
        
        <div className="story-text">
          {creationStory.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Философская основа</h2>
        <p>
          Слово «Лила» означает «божественную игру» — концепция в индуизме, 
          что вселенная создана Богом как форма игры, не из необходимости, 
          а из радости творчества.
        </p>
        <p>
          72 клетки соответствуют 72 таттвам (состояниям сознания) в ведической космологии.
          Путь от клетки 1 до 68 символизирует эволюцию души от рождения до освобождения (мокши).
        </p>
      </div>

      <div className="quote-block">
        <blockquote>
          «Вселенная — это божественная игра сознания, познающего себя через бесконечные формы.»
        </blockquote>
        <cite>— Хариш Джохари</cite>
      </div>
    </div>
  );
}
