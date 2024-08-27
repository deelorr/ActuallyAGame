import { useContext, useEffect, useState } from 'react'; 
import GameContext from '../../contexts/GameContext'; 
import './DebugPanel.css'; 

// The DebugPanel component displays debugging information and allows interaction with game state for testing purposes
const DebugPanel = () => {
  const { 
    position,             
    enemyPosition,        
    direction,
    isMoving,
    isAttacking,
    enemyDirection,       
    tileType,             
    enemyTileType,        
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

  const [debugMode, setDebugMode] = useState(true);

  const toggleDebugMode = () => {
    setDebugMode((prev) => !prev);
  };

  const handleTakeDamage = () => {
    setHealth(prevHealth => Math.max(prevHealth - 10, 0));
  };

  const handleAddHealth = () => {
    setHealth(prevHealth => Math.min(prevHealth + 10, maxHealth));
  };

  const handleAddExperience = () => {
    const experienceForNextLevel = level * 100;
    setExperience(prevExperience => prevExperience + 50);

    if (experience + 50 >= experienceForNextLevel) {
      setExperience(0);
      setLevel(prevLevel => prevLevel + 1);
    }
  };

  const handleTakeStamina = () => {
    setStamina(prevStamina => Math.max(prevStamina - 10, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd') toggleDebugMode();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return debugMode ? (
    <div className="debug-panel">
      <span className='debug-title'>DEBUG MENU</span>

      <div className="debug-player">
        <span className='stat-title'>Player Stats</span>
        <div className='player-grid'>
          <span className='player-item'>Position: X-{position.x}, Y-{position.y}</span>
          <span className='player-item'>Direction: {direction}</span>
          <span>Moving: {isMoving ? 'Yes' : 'No'}</span>
          <span>Attacking: {isAttacking ? 'Yes' : 'No'}</span>
          <span className='player-item'>Tile Type: {tileType}</span>
        </div>
      </div>
      <div className="debug-enemy">
        <span className='stat-title'>Enemy Stats</span>
        <div className='enemy-grid'>
          <span className='enemy-item'>Position: X-{enemyPosition.x}, Y-{enemyPosition.y}</span>
          <span className='enemy-item'>Direction: {enemyDirection}</span>
          <span className='enemy-item'>Tile Type: {enemyTileType}</span>
        </div>
      </div>
      <div className="debug-frames">
        <span className='stat-title'>Animation Frames</span>
        <div className='frame-grid'>
          <span className='frame-item'>Attack: {attackFrame}</span>
          <span className='frame-item'>Idle: {idleFrame}</span>
          <span className='frame-item'>Move: {moveFrame}</span>
        </div>
      </div>

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
  );
};

export default DebugPanel;
