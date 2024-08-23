import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 32; // Assuming each tile is 32x32 pixels
const MOVE_DELAY = 1000; // Delay between enemy movements in milliseconds

// Custom hook to handle enemy movement towards the player
const useEnemyMovement = () => {
  // Extract the player's position, enemy's position, and the function to update the enemy's position from the GameContext
  const { position, enemyPosition, setEnemyPosition } = useContext(GameContext);

  // useCallback to memoize the movement logic, preventing unnecessary re-renders
  const moveEnemyTowardPlayer = useCallback(() => {
    let newEnemyX = enemyPosition.x; // Initialize new X position for the enemy
    let newEnemyY = enemyPosition.y; // Initialize new Y position for the enemy
    const { x: playerX, y: playerY } = position; // Destructure player's current position
    const { x: enemyX, y: enemyY } = enemyPosition; // Destructure enemy's current position

    // Move enemy horizontally toward the player
    if (enemyX < playerX) {
      newEnemyX += TILE_SIZE; // Move enemy right
    } else if (enemyX > playerX) {
      newEnemyX -= TILE_SIZE; // Move enemy left
    }

    // Move enemy vertically toward the player
    if (enemyY < playerY) {
      newEnemyY += TILE_SIZE; // Move enemy down
    } else if (enemyY > playerY) {
      newEnemyY -= TILE_SIZE; // Move enemy up
    }

    // Update the enemy's position
    setEnemyPosition({ x: newEnemyX, y: newEnemyY });
  }, [enemyPosition, position, setEnemyPosition]); // Dependencies to ensure the callback updates when these change

  // useEffect to set up an interval that moves the enemy toward the player at a regular interval
  useEffect(() => {
    const interval = setInterval(() => {
      moveEnemyTowardPlayer(); // Call the movement function at each interval
    }, MOVE_DELAY);

    // Cleanup the interval when the component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [moveEnemyTowardPlayer]); // Dependency to ensure the effect re-runs if the callback changes

  return null; // This hook does not return any UI, only manages movement logic
};

export default useEnemyMovement; // Export the custom hook as the default export
