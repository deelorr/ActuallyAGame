import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32; // Assuming each tile is 32x32 pixels
const MOVE_DELAY = 1000; // Delay between enemy movements

const useEnemyMovement = () => {
  const { playerPosition, enemyPosition, setEnemyPosition } = useContext(GameContext);

  const moveEnemyTowardPlayer = useCallback(() => {
    if (!playerPosition || !enemyPosition) return;
  
    let newEnemyPosition = { ...enemyPosition };
  
    if (playerPosition.x > enemyPosition.x) {
      newEnemyPosition.x += TILE_SIZE;
    } else if (playerPosition.x < enemyPosition.x) {
      newEnemyPosition.x -= TILE_SIZE;
    }
  
    if (playerPosition.y > enemyPosition.y) {
      newEnemyPosition.y += TILE_SIZE;
    } else if (playerPosition.y < enemyPosition.y) {
      newEnemyPosition.y -= TILE_SIZE;
    }
  
    console.log('Updated Enemy Position:', newEnemyPosition);
    setEnemyPosition(newEnemyPosition);
  }, [playerPosition, enemyPosition, setEnemyPosition]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer();
    }, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]);

  return null; // or return any state if needed
};

export default useEnemyMovement;
