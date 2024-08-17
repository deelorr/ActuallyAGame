import { useContext } from 'react';
import GameContext from '../contexts/GameContext';
import './StatsPanel.css';

const StatsPanel = () => {
  const { health, maxHealth, stamina, maxStamina, attackPower, defense, experience, level } = useContext(GameContext);

  return (
    <div className="stats-panel">
      <h3>Player Stats</h3>
      <div className="stats-item">
        <span>Level:</span> {level}
      </div>
      <div className="stats-item">
        <span>Health:</span> {health} / {maxHealth}
      </div>
      <div className="stats-item">
        <span>Stamina:</span> {stamina} / {maxStamina}
      </div>
      <div className="stats-item">
        <span>Attack Power:</span> {attackPower}
      </div>
      <div className="stats-item">
        <span>Defense:</span> {defense}
      </div>
      <div className="stats-item">
        <span>Experience:</span> {experience}
      </div>
    </div>
  );
};

export default StatsPanel;
