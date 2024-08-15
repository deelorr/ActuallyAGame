import { useContext } from 'react'; // Import useContext
import GameContext from '../contexts/GameContext'; // Import GameContext

const DebugPanel = () => {

  const { isAttacking } = useContext(GameContext); // Use GameContext to get isAttacking

  const { 
    position, 
    direction,
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
      </div>
    </div>
  );
};

export default DebugPanel;
