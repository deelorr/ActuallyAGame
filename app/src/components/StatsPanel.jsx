import { useContext } from 'react'; // Import useContext hook from React
import GameContext from '../contexts/GameContext'; // Import GameContext to access the global game state
import './StatsPanel.css'; // Import CSS for styling the StatsPanel
import HealthBar from './HealthBar'; // Import HealthBar component for displaying player's health

const StatsPanel = () => {
  // Extract player stats from GameContext
  const { health, maxHealth, stamina, maxStamina, attackPower, defense, experience, level } = useContext(GameContext);

  return (
    <div className="stats-panel">
      <h3>Player Stats</h3> {/* Heading for the stats panel */}
      
      {/* Display player's level */}
      <div className="stats-item">
        <span>Level:</span> {level}
      </div>

      {/* Display player's health and max health */}
      <div className="stats-item">
        <span>Health:</span>
        <HealthBar currentHealth={health} maxHealth={maxHealth} /> {/* Display the player's health */}
      </div>

      {/* Display player's stamina and max stamina */}
      <div className="stats-item">
        <span>Stamina:</span> {stamina} / {maxStamina}
      </div>

      {/* Display player's attack power */}
      <div className="stats-item">
        <span>Attack Power:</span> {attackPower}
      </div>

      {/* Display player's defense */}
      <div className="stats-item">
        <span>Defense:</span> {defense}
      </div>

      {/* Display player's experience points */}
      <div className="stats-item">
        <span>Experience:</span> {experience}
      </div>
    </div>

  );
};

export default StatsPanel;
