import { useContext, useEffect, useState } from 'react'; // Import necessary hooks from React
import GameContext from '../contexts/GameContext'; // Import GameContext for accessing game state
import './DebugPanel.css'; // Import the CSS file for styling the DebugPanel

const DebugPanel = () => {
  // Extract necessary state values from GameContext
  const { 
    position, 
    direction,
    stateMachine,
    enemyStateMachine, 
    tileType, 
    attackFrame, 
    idleFrame, 
    moveFrame,
    setHealth,
    experience,
    setExperience,
    maxHealth,
    level,
    setLevel,
    setStamina
  } = useContext(GameContext);

  // Local state to manage whether debug mode is active
  const [debugMode, setDebugMode] = useState(false);

  // Function to toggle the debug mode on and off
  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev); // Toggle debugMode state between true and false
  };

  // Functions to simulate taking damage and adding experience
  const handleTakeDamage = () => {
    setHealth(prevHealth => Math.max(prevHealth - 10, 0)); // Subtract 10 from health, but don't go below 0
  };

  const handleAddHealth = () => {
    setHealth(prevHealth => Math.min(prevHealth + 10, maxHealth)); // Add 10 to health, but don't exceed maxHealth
  };

  const handleAddExperience = () => {
    const experienceForNextLevel = level * 100;
    setExperience(prevExperience => prevExperience + 50); // Add 50 experience points

    // Check if level up is necessary
    if (experience + 50 >= experienceForNextLevel) {
      setExperience(0); // Reset experience for the next level
      // Level up logic can be added here
      setLevel(prevLevel => prevLevel + 1); // Increase level by 1
    }
  };

  const handleTakeStamina = () => {
    setStamina(prevStamina => Math.max(prevStamina - 10, 0)); // Subtract 10 from stamina, but don't go below 0
  };

  // Effect to handle keydown event for toggling debug mode
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd') toggleDebugMode(); // Toggle debug mode when 'd' key is pressed
    };

    // Add keydown event listener when the component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Conditionally render the debug panel only when debugMode is true
  return debugMode ? (
    <div className="debug-panel">
      <span>DEBUG MENU</span> {/* Label indicating debug mode */}
      <div className="debug-item">
        Position: X-{position.x}, Y-{position.y} {/* Display the character's X and Y position */}
      </div>
      <div className="debug-item">
        Direction: {direction} {/* Display the character's current direction */}
      </div>
      <div className="debug-item">
        State: {stateMachine.getState()} {/* Display the current state of the character */}
      </div>
      <div className='debug-item'>
        Enemy State: {enemyStateMachine.getState()} {/* Display the current state of the enemy */}
      </div>
      <div className="debug-item">
        Tile Type: {tileType} {/* Display the current tile type */}
      </div>
      <div className="debug-item">
        Attack: {attackFrame} Idle: {idleFrame} Move: {moveFrame} {/* Display animation frames */}
      </div>

      {/* New Buttons for Debugging */}
      <div className='debug-buttons'>
        <div className="debug-button">
          <button onClick={handleTakeDamage}>Take Damage</button>
        </div>
        <div className="debug-button">
          <button onClick={handleAddExperience}>Add XP</button>
        </div>
        <div className="debug-button">
          <button onClick={handleAddHealth}>Add Health</button>
        </div>
        <div className="debug-button">
          <button onClick={handleTakeStamina}>Take Stamina</button>
        </div>
      </div>
    </div>
  ) : (
    <div className="debug-panel">
      <span className='debug-item'>Press d for debug menu</span>
    </div>
  ); // If debugMode is false, render this message
};

export default DebugPanel;
