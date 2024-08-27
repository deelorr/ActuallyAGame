import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32;
const MOVE_DELAY = 1000;

const useEnemyMovement = () => {
  const { 
    position, 
    enemyPosition, 
    setEnemyPosition, 
    setEnemyIsMoving, 
    setEnemyIsAttacking,
    setEnemyIdle,
    isPlayerAttacked, 
    setIsPlayerAttacked
  } = useContext(GameContext);

  const moveEnemyTowardPlayer = useCallback(() => {
    let newEnemyX = enemyPosition.x;
    let newEnemyY = enemyPosition.y;
    const { x: playerX, y: playerY } = position;
    const { x: enemyX, y: enemyY } = enemyPosition;

    const deltaX = playerX - enemyX;
    const deltaY = playerY - enemyY;

    let isMoving = false;

    // Prioritize horizontal movement
    if (Math.abs(deltaX) > TILE_SIZE) {
      isMoving = true;
      newEnemyX += deltaX > 0 ? TILE_SIZE : -TILE_SIZE;
    } 
    // Vertical movement if horizontally aligned
    else if (Math.abs(deltaY) > 0) {
      isMoving = true;
      newEnemyY += deltaY > 0 ? TILE_SIZE : -TILE_SIZE;
    }

    setEnemyPosition({ x: newEnemyX, y: newEnemyY });

    if (isMoving) {
      setEnemyIsMoving(true);
    } else {
      setEnemyIsMoving(false);

      // Check if enemy is next to the player (adjacent)
      if (Math.abs(deltaX) <= TILE_SIZE && Math.abs(deltaY) <= TILE_SIZE) {
        setEnemyIsAttacking(true);  // Trigger the attack animation
        setIsPlayerAttacked(true);  // Indicate the player is being attacked
      } else {
        setEnemyIdle(true);
      }
    }

  }, [enemyPosition, position, setEnemyPosition, setEnemyIsMoving, setEnemyIsAttacking, setEnemyIdle, setIsPlayerAttacked]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer();
    }, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]);

  return null;
};

export default useEnemyMovement;
