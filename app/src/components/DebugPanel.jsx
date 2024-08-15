import { useContext } from 'react'; // Import useContext
import GameContext from '../contexts/GameContext'; // Import GameContext
import './DebugPanel.css';

const DebugPanel = () => {

  const { 
    position, 
    direction,
    isAttacking,
    attackFrame,
    moving
   } = useContext(GameContext); // Use GameContext to get position

  return (
    <div className="debug-panel">
      DEBUG
      <div>
        X: {position.x}, Y: {position.y}
        <br></br>
        Direction: {direction}
        <br></br>
        Attacking: {isAttacking ? 'Yes' : 'No'}
        <br></br>
        Attack Frame: {attackFrame}
        <br></br>
        Moving: {moving ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default DebugPanel;
