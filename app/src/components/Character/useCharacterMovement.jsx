import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 16; // Size of each tile in the game grid
const MOVE_DELAY = 80; // Delay between movements in milliseconds

// Custom hook for handling character movement
const useCharacterMovement = (stateMachine) => {
  // Extracting state and actions from the GameContext
  const { 
    position, // Current position of the character
    setPosition, // Function to update the character's position
    direction, // Current direction the character is facing
    setDirection, // Function to update the character's direction

  } = useContext(GameContext);

  // Function to handle keydown events for character movement
  const handleKeyDown = useCallback((event) => {
    // Prevent movement if the character is already moving
    if (stateMachine.getState() === 'moving') return;

    let newDirection = direction; // Initialize newDirection with the current direction
    let newPos = { ...position }; // Create a copy of the current position

    // Determine the new direction and position based on the pressed key
    switch (event.key) {
      case 'ArrowUp':
        newDirection = 'up'; // Set direction to 'up'
        newPos.y = Math.max(position.y - TILE_SIZE, 0); // Move up by reducing the y-coordinate
        break;
      case 'ArrowDown':
        newDirection = 'down'; // Set direction to 'down'
        newPos.y = Math.min(position.y + TILE_SIZE, TILE_SIZE * 18); // Move down by increasing the y-coordinate
        break;
      case 'ArrowLeft':
        newDirection = 'left'; // Set direction to 'left'
        newPos.x = Math.max(position.x - TILE_SIZE, 0); // Move left by reducing the x-coordinate
        break;
      case 'ArrowRight':
        newDirection = 'right'; // Set direction to 'right'
        newPos.x = Math.min(position.x + TILE_SIZE, TILE_SIZE * 18); // Move right by increasing the x-coordinate
        break;
      default:
        return; // Exit the function if a non-movement key is pressed
    }

    // Update the character's direction and position
    setDirection(newDirection);
    setPosition(newPos);
    stateMachine.transition('MOVE'); // Transition to the 'moving' state

    // After a short delay, transition back to the 'idle' state
    setTimeout(() => {
      stateMachine.transition('STOP'); // Transition back to 'idle' after movement
    }, MOVE_DELAY);
  }, [direction, position, stateMachine, setPosition, setDirection]);

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
