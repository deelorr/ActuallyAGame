import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import './HealthBar.css'; // Import CSS for styling the HealthBar
import { useContext } from 'react'; // Import useContext hook from React
import GameContext from '../contexts/GameContext'; // Import GameContext to access the global game state

const HealthBar = ({ currentHealth, maxHealth }) => {
  // Extract the setHealth function from the GameContext
  const { setHealth } = useContext(GameContext);

  // Calculate the health percentage to determine the width of the health bar
  const healthPercentage = (currentHealth / maxHealth) * 100;

  return (
    <div className="health-bar-container">
      {/* Render the health bar with dynamic width based on the health percentage */}
      <div
        className="health-bar"
        style={{ width: `${healthPercentage}%` }}
      ></div>
      
      {/* Button to simulate taking damage, reducing health by 10 points */}
      <button onClick={() => setHealth((prev) => Math.max(prev - 10, 0))}>
        Take Damage
      </button>
    </div>
  );
};

// Define the expected prop types for the HealthBar component
HealthBar.propTypes = {
  currentHealth: PropTypes.number.isRequired, // The current health value (required)
  maxHealth: PropTypes.number.isRequired, // The maximum health value (required)
};

export default HealthBar;
