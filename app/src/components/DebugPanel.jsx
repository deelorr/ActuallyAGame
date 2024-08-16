import { useContext } from 'react'; // Import useContext
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

  return (
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
  );
};

export default DebugPanel;
