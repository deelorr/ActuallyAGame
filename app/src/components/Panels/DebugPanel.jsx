import { useContext, useEffect, useState } from 'react'; // Import necessary hooks from React
import GameContext from '../../contexts/GameContext'; // Import GameContext for accessing game state
import './DebugPanel.css'; // Import the CSS file for styling the DebugPanel

// The DebugPanel component displays debugging information and allows interaction with game state for testing purposes
const DebugPanel = () => {
  // Extract necessary state values from GameContext
  const { 
    position,             // Character's current position
    enemyPosition,        // Enemy's current position
    direction,            // Character's current direction
    playerStateMachine,   // State machine managing the character's state
    enemyStateMachine,    // State machine managing the enemy's state
    tileType,             // Current tile type the character is on
    attackFrame,          // Current frame of the attack animation
    idleFrame,            // Current frame of the idle animation
    moveFrame,            // Current frame of the movement animation
    setHealth,            // Function to update the character's health
    experience,           // Current experience points of the character
    setExperience,        // Function to update the character's experience
    maxHealth,            // Maximum health the character can have
    level,                // Current level of the character
    setLevel,             // Function to update the character's level
    setStamina            // Function to update the character's stamina
  } = useContext(GameContext);

  // Local state to manage whether debug mode is active
  const [debugMode, setDebugMode] = useState(true);

  // Function to toggle the debug mode on and off
  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev); // Toggle debugMode state between true and false
  };

  // Function to simulate taking damage
  const handleTakeDamage = () => {
    setHealth(prevHealth => Math.max(prevHealth - 10, 0)); // Subtract 10 from health, but don't go below 0
  };

  // Function to simulate adding health
  const handleAddHealth = () => {
    setHealth(prevHealth => Math.min(prevHealth + 10, maxHealth)); // Add 10 to health, but don't exceed maxHealth
  };

  // Function to simulate adding experience and potentially leveling up
  const handleAddExperience = () => {
    const experienceForNextLevel = level * 100; // Calculate the experience needed for the next level
    setExperience(prevExperience => prevExperience + 50); // Add 50 experience points

    // Check if level up is necessary
    if (experience + 50 >= experienceForNextLevel) {
      setExperience(0); // Reset experience for the next level
      setLevel(prevLevel => prevLevel + 1); // Increase level by 1
    }
  };

  // Function to simulate stamina loss
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
        <span>Position: X-{position.x}, Y-{position.y}</span> {/* Display the character's X and Y position */}
        <span>Direction: {direction} </span> {/* Display the character's current health */}
        <span>State: {playerStateMachine.getState()}</span>
      </div>
      <div className="debug-item">
        Enemy Position: X-{enemyPosition.x}, Y-{enemyPosition.y} {/* Display the enemy's X and Y position */}
        Enemy State: {enemyStateMachine.getState()} {/* Display the current state of the enemy */}
      </div>
      <div className="debug-item">
        Tile Type: {tileType} {/* Display the current tile type */}
      </div>
      <div className="debug-item">
        Attack: {attackFrame} Idle: {idleFrame} Move: {moveFrame} {/* Display the current animation frames */}
      </div>

      {/* New Buttons for Debugging */}
      <div className='debug-buttons'>
        <div className="debug-button">
          <button onClick={handleTakeDamage}>Take Damage</button> {/* Button to simulate taking damage */}
        </div>
        <div className="debug-button">
          <button onClick={handleAddExperience}>Add XP</button> {/* Button to simulate gaining experience */}
        </div>
        <div className="debug-button">
          <button onClick={handleAddHealth}>Add Health</button> {/* Button to simulate gaining health */}
        </div>
        <div className="debug-button">
          <button onClick={handleTakeStamina}>Take Stamina</button> {/* Button to simulate losing stamina */}
        </div>
      </div>
    </div>
  ) : (
    <div className="debug-panel">
      <span className='debug-item'>Press d for debug menu</span> {/* Display message to enable debug mode */}
    </div>
  ); // If debugMode is false, render this message
};

export default DebugPanel; // Export the DebugPanel component as the default export
