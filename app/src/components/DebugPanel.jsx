import { useContext, useState, useEffect } from 'react'; // Import necessary hooks from React
import GameContext from '../contexts/GameContext'; // Import GameContext for accessing game state
import './DebugPanel.css'; // Import the CSS file for styling the DebugPanel

const DebugPanel = () => {
  // Extract necessary state values from GameContext
  const { 
    position, // Character's position on the map
    direction, // Character's current direction (e.g., 'up', 'down', 'left', 'right')
    stateMachine, // The state machine managing the character's state
    tileType, // The type of tile the character is currently on
    attackFrame, // The current frame of the attack animation
    idleFrame, // The current frame of the idle animation
    moveFrame, // The current frame of the moving animation
  } = useContext(GameContext);

  // Local state to manage whether debug mode is active
  const [debugMode, setDebugMode] = useState(true);

  // Function to toggle the debug mode on and off
  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev); // Toggle debugMode state between true and false
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
      <div className='debug-item'>
        Position: X-{position.x}, Y-{position.y} {/* Display the character's X and Y position */}
      </div>
      <div className='debug-item'>
        Direction: {direction} {/* Display the character's current direction */}
      </div>
      <div className='debug-item'>
        State: {stateMachine.getState()} {/* Display the current state of the character */}
      </div>
      <div className="debug-item">
        Tile Type: {tileType} {/* Display the current tile type */}
      </div>
      <div>
        Attack: {attackFrame} Idle: {idleFrame} Move: {moveFrame} {/* Display animation frames */}
      </div>
    </div>
  ) : <div className="debug-panel">
        <span className='debug-item'>Press d for debug menu</span>
      </div>; // If debugMode is false, render this message
};

export default DebugPanel;
