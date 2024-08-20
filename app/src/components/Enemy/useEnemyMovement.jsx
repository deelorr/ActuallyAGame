import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../contexts/GameContext';

const TILE_SIZE = 32; // Assuming each tile is 32x32 pixels
const MOVE_DELAY = 1000; // Delay between enemy movements

const useEnemyMovement = () => {
  const { 
    enemyPosition, 
    setEnemyPosition, 
    enemyDirection, 
    setEnemyDirection, 
    setEnemyIsMoving 
  } = useContext(GameContext);

  const moveEnemy = useCallback(() => {
    let newDirection = enemyDirection;
    let newPos = { ...enemyPosition };

    // Simple random movement logic
    const random = Math.random();
    if (random < 0.25) {
      newDirection = 'up';
      newPos.y = Math.max(newPos.y - TILE_SIZE, 0);
    } else if (random < 0.5) {
      newDirection = 'down';
      newPos.y = Math.min(newPos.y + TILE_SIZE, TILE_SIZE * 18); // Assuming map height is 19 tiles
    } else if (random < 0.75) {
      newDirection = 'left';
      newPos.x = Math.max(newPos.x - TILE_SIZE, 0);
    } else {
      newDirection = 'right';
      newPos.x = Math.min(newPos.x + TILE_SIZE, TILE_SIZE * 18); // Assuming map width is 19 tiles
    }

    setEnemyDirection(newDirection);
    setEnemyPosition(newPos);
    setEnemyIsMoving(true);

    setTimeout(() => {
      setEnemyIsMoving(false);
    }, MOVE_DELAY);
  }, [enemyDirection, enemyPosition, setEnemyDirection, setEnemyPosition, setEnemyIsMoving]);

  useEffect(() => {
    const interval = setInterval(moveEnemy, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemy]);

  return { enemyPosition, enemyDirection };
};

export default useEnemyMovement;
