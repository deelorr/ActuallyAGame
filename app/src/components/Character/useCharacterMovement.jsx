import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const tileSize = 32; // Size of each tile in the game grid
const mapHeight = tileSize * 10; // Height of the game map in pixels
const mapWidth = tileSize * 10; // Width of the game map in pixels
const MOVE_DELAY = 80; // Delay between movements in milliseconds

// Custom hook for handling character movement
const useCharacterMovement = () => {
  // Extracting state and actions from the GameContext
  const { 
    position, // Current position of the character
    setPosition, // Function to update the character's position
    enemyPosition,
    setEnemyPosition,
    direction, // Current direction the character is facing
    setDirection, // Function to update the character's direction
    stateMachine, // State machine for character states
  } = useContext(GameContext);

  // Function to handle keydown events for character movement
  const handleKeyDown = useCallback((event) => {
    if (stateMachine.getState() === 'moving') return;
  
    let newDirection = direction;
    let newPos = { ...position };
  
    switch (event.key) {
      case 'ArrowUp':
        newDirection = 'up';
        newPos.y = Math.max(position.y - tileSize, 0);
        break;
      case 'ArrowDown':
        newDirection = 'down';
        newPos.y = Math.min(mapHeight - tileSize, position.y + tileSize);
        break;
      case 'ArrowLeft':
        newDirection = 'left';
        newPos.x = Math.max(position.x - tileSize, 0);
        break;
      case 'ArrowRight':
        newDirection = 'right';
        newPos.x = Math.min(mapWidth - tileSize, position.x + tileSize);
        break;
      default:
        return;
    }
  
    setDirection(newDirection);
    setPosition(newPos);
    stateMachine.transition('MOVE');
  
    // Move the enemy toward the player;
  
    setTimeout(() => {
      stateMachine.transition('STOP');
    }, MOVE_DELAY);
  }, [direction, position, enemyPosition, stateMachine, setPosition, setDirection, setEnemyPosition]);
  

  // Effect to add and clean up the keydown event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Listen for keydown events

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Remove the event listener on cleanup
    };
  }, [handleKeyDown]);

  // Return the current position and direction from the hook
  return { position, direction };
};

export default useCharacterMovement;
