import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32;
const MOVE_DELAY = 1000;

const useEnemyMovement = () => {
  const { position, enemyPosition, setEnemyPosition, setEnemyIsMoving } = useContext(GameContext);

  const moveEnemyTowardPlayer = useCallback(() => {
    let newEnemyX = enemyPosition.x;
    let newEnemyY = enemyPosition.y;
    const { x: playerX, y: playerY } = position;
    const { x: enemyX, y: enemyY } = enemyPosition;

    if (enemyX < playerX) {
      newEnemyX += TILE_SIZE;
    } else if (enemyX > playerX) {
      newEnemyX -= TILE_SIZE;
    }

    if (enemyY < playerY) {
      newEnemyY += TILE_SIZE;
    } else if (enemyY > playerY) {
      newEnemyY -= TILE_SIZE;
    }

    setEnemyIsMoving(true);
    setEnemyPosition({ x: newEnemyX, y: newEnemyY });
    setTimeout(() => setEnemyIsMoving(false), MOVE_DELAY - 100); // Briefly delay stopping the movement
  }, [enemyPosition, position, setEnemyPosition, setEnemyIsMoving]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer();
    }, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]);

  return null;
};

export default useEnemyMovement;
