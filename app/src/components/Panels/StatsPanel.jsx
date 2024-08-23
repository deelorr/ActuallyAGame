import { useContext } from 'react';
import GameContext from '../../contexts/GameContext'; // Import GameContext to access the global game state
import HealthBar from '../StatBars/HealthBar'; // Import HealthBar component for displaying player's health
import StaminaBar from '../StatBars/StaminaBar'; // Import StaminaBar component for displaying player's stamina
import ExperienceBar from '../StatBars/ExperienceBar'; // Import ExperienceBar component for displaying player's experience
import './StatsPanel.css'; // Import CSS for styling the StatsPanel

// StatsPanel component is responsible for displaying the player's current stats
const StatsPanel = () => {
  // Extract player stats from GameContext
  const { health, maxHealth, stamina, maxStamina, attackPower, defense, experience, level } = useContext(GameContext);

  return (
    <div className="stats-panel">
      <h3>Player Stats</h3> {/* Heading for the stats panel */}
      
      {/* Display player's level and experience */}
      <div className="stats-item">
        <span>Level {level} - Experience:</span>
        <ExperienceBar currentExperience={experience} level={level} /> {/* Render the ExperienceBar component */}
      </div>

      {/* Display player's health and max health */}
      <div className="stats-item">
        <span>Health:</span>
        <HealthBar currentHealth={health} maxHealth={maxHealth} /> {/* Render the HealthBar component */}
      </div>

      {/* Display player's stamina and max stamina */}
      <div className="stats-item">
        <span>Stamina:</span>
        <StaminaBar currentStamina={stamina} maxStamina={maxStamina} /> {/* Render the StaminaBar component */}
      </div>

      {/* Display player's attack power and defense */}
      <div id='atk' className="stats-item">
        <span>Attack Power:</span> {attackPower} {/* Display player's attack power */}
        <span>Defense:</span> {defense} {/* Display player's defense */}
      </div>
    </div>
  );
};

export default StatsPanel; // Export the StatsPanel component as the default export
