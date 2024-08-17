import { useContext, useState, useEffect } from 'react'; // Import necessary hooks
import GameContext from '../contexts/GameContext'; // Import GameContext
import './DebugPanel.css';

const DebugPanel = () => {
  const { 
    position, 
    direction,
    isAttacking,
    attackFrame,
    moving,
    idle
   } = useContext(GameContext); // Use GameContext to get position

  const [debugMode, setDebugMode] = useState(false); // Initialize state for debug mode

  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev); // Toggle debug mode on 'd' key press
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd') toggleDebugMode();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Cleanup listener on unmount
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return debugMode ? (
    <div className="debug-panel">
      <span>DEBUG</span>
      <div className='debug-item'>
        Position: X-{position.x}, Y-{position.y}
      </div>
      <div className='debug-item'>
        Direction: {direction}
      </div>
      <div className='debug-item'>
        Attacking: {isAttacking ? 'yes' : 'no'}
      </div>
      <div className='debug-item'>
        Attack Frame: {attackFrame}
      </div>
      <div className='debug-item'>
        Moving: {moving ? 'yes' : 'no'}
      </div>
      <div className='debug-item'>
        Idle: {idle ? 'yes' : 'no'}
      </div>
    </div>
  ) : null;
};

export default DebugPanel;
