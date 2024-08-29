import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32;
const MOVE_DELAY = 1000;

const useEnemyMovement = () => {
  const { 
    position,             
    enemyPosition,        
    setEnemyPosition,     
    enemyDirection,       
    setEnemyDirection,    
    enemyIsMoving,        
    setEnemyIsMoving,     
    enemyIsAttacking,     
    setEnemyIsAttacking   
  } = useContext(GameContext);

  const moveEnemyTowardPlayer = useCallback(() => {
    let newDirection = enemyDirection;
    let newEnemyPos = { ...enemyPosition };
    const { x: playerX, y: playerY } = position;
    const { x: enemyX, y: enemyY } = enemyPosition;

    const deltaX = playerX - enemyX;
    const deltaY = playerY - enemyY;

    let isMoving = false;

    // Prioritize horizontal movement
    if (Math.abs(deltaX) > TILE_SIZE) {
      newDirection = deltaX > 0 ? 'right' : 'left';
      newEnemyPos.x += deltaX > 0 ? TILE_SIZE : -TILE_SIZE;
      isMoving = true;
    } 
    // Vertical movement if horizontally aligned
    else if (Math.abs(deltaY) > 0) {
      newDirection = deltaY > 0 ? 'down' : 'up';
      newEnemyPos.y += deltaY > 0 ? TILE_SIZE : -TILE_SIZE;
      isMoving = true;
    }

    setEnemyDirection(newDirection);
    setEnemyPosition(newEnemyPos);

    if (isMoving) {
      setEnemyIsMoving(true);
    } else {
      setEnemyIsMoving(false);

      // Check if enemy is next to the player (adjacent)
      if (Math.abs(deltaX) <= TILE_SIZE && Math.abs(deltaY) <= TILE_SIZE) {
        setEnemyIsAttacking(true);  // Trigger the attack animation
        setTimeout(() => setEnemyIsAttacking(false), 500); // Example duration
      }
    }
  }, [enemyDirection, enemyPosition, position, setEnemyDirection, setEnemyPosition, setEnemyIsMoving, setEnemyIsAttacking]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer();
    }, MOVE_DELAY);

    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]);

  return null;
};

export default useEnemyMovement;
