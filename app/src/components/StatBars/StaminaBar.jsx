import './StaminaBar.css'; // Import CSS for styling the StaminaBar
import PropTypes from 'prop-types'; // Import PropTypes for type-checking

// StaminaBar component displays the player's current stamina and the maximum stamina
const StaminaBar = ({ currentStamina, maxStamina }) => {
  // Calculate the stamina percentage to determine the width of the stamina bar
  const staminaPercentage = (currentStamina / maxStamina) * 100;

  return (
    <div className="stamina-bar-container">
      {/* Render the stamina bar with dynamic width based on the stamina percentage */}
      <div
        className="stamina-bar"
        style={{ width: `${staminaPercentage}%` }}
      ></div>
      {/* Display the current stamina out of the maximum stamina */}
      <div className="stamina-bar-text">
        {currentStamina} / {maxStamina}
      </div>
    </div>
  );
};

// Define the expected prop types for the StaminaBar component
StaminaBar.propTypes = {
  currentStamina: PropTypes.number.isRequired, // The current stamina value (required)
  maxStamina: PropTypes.number.isRequired, // The maximum stamina value (required)
};

export default StaminaBar; // Export the StaminaBar component as the default export
