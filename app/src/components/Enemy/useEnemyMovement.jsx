import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32; // Assuming each tile is 32x32 pixels
const MOVE_DELAY = 1000; // Delay between enemy movements

const useEnemyMovement = () => {
  const { position, enemyPosition, setEnemyPosition } = useContext(GameContext);

  const moveEnemyTowardPlayer = useCallback(() => {
    let newEnemyX = enemyPosition.x;
    let newEnemyY = enemyPosition.y;
    const { x: playerX, y: playerY } = position;
    const { x: enemyX, y: enemyY } = enemyPosition;
  
    // Move enemy horizontally toward the player
    if (enemyX < playerX) {
      newEnemyX += TILE_SIZE;
    } else if (enemyX > playerX) {
      newEnemyX -= TILE_SIZE;
    }
  
    // Move enemy vertically toward the player
    if (enemyY < playerY) {
      newEnemyY += TILE_SIZE;
    } else if (enemyY > playerY) {
      newEnemyY -= TILE_SIZE;
    }
  
    setEnemyPosition({ x: newEnemyX, y: newEnemyY });
  }, [enemyPosition, position, setEnemyPosition]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer();
    }, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]);

  return null; // or return any state if needed
};

export default useEnemyMovement;
