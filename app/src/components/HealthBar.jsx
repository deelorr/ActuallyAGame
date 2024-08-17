import PropTypes from 'prop-types';
import './HealthBar.css';
import { useContext } from 'react';
import GameContext from '../contexts/GameContext';

const HealthBar = ({ currentHealth, maxHealth }) => {

  const { setHealth } = useContext(GameContext);
  
  const healthPercentage = (currentHealth / maxHealth) * 100;

  return (
    <div className="health-bar-container">
      <div
        className="health-bar"
        style={{ width: `${healthPercentage}%` }}
      ></div>
      <button onClick={() => setHealth((prev) => Math.max(prev - 10, 0))}>
        Take Damage
      </button>
    </div>
  );
};

HealthBar.propTypes = {
  currentHealth: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
};

export default HealthBar;
