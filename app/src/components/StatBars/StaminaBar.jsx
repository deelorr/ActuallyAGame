
import './StaminaBar.css';
import PropTypes from 'prop-types';

const StaminaBar = ({ currentStamina, maxStamina }) => {
  const staminaPercentage = (currentStamina / maxStamina) * 100;

  return (
    <div className="stamina-bar-container">
      <div
        className="stamina-bar"
        style={{ width: `${staminaPercentage}%` }}
      ></div>
      <div className="stamina-bar-text">
        {currentStamina} / {maxStamina}
      </div>
    </div>
  );
};

StaminaBar.propTypes = {
    currentStamina: PropTypes.number.isRequired,
    maxStamina: PropTypes.number.isRequired,
    };

export default StaminaBar;
