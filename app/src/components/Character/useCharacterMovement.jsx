import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

// Constants defining the size of a tile and the overall map dimensions
const tileSize = 32;
const mapHeight = tileSize * 10; // 10 tiles high
const mapWidth = tileSize * 10;  // 10 tiles wide
const MOVE_DELAY = 80;           // Delay between move steps in milliseconds

// Custom hook to manage character movement based on keyboard input
const useCharacterMovement = () => {

  // Extract necessary state and functions from GameContext
  const { 
    position,             // The current position of the character
    setPosition,          // Function to update the character's position
    direction,            // The current direction the character is facing
    setDirection,         // Function to update the character's direction
    playerStateMachine    // The state machine managing the character's state (idle, moving, attacking)
  } = useContext(GameContext);

  // Callback function to handle keydown events for character movement and actions
  const handleKeyDown = useCallback((event) => {
 
    let newDirection = direction;  // Initialize the new direction
    let newPos = { ...position };  // Initialize the new position based on the current position

    switch (event.key) {
      case 'ArrowUp':
        newDirection = 'up';                               // Set direction to 'up'
        newPos.y = Math.max(position.y - tileSize, 0);     // Move up, but not past the top edge
        break;
      case 'ArrowDown':
        newDirection = 'down';                             // Set direction to 'down'
        newPos.y = Math.min(mapHeight - tileSize, position.y + tileSize); // Move down, but not past the bottom edge
        break;
      case 'ArrowLeft':
        newDirection = 'left';                             // Set direction to 'left'
        newPos.x = Math.max(position.x - tileSize, 0);     // Move left, but not past the left edge
        break;
      case 'ArrowRight':
        newDirection = 'right';                            // Set direction to 'right'
        newPos.x = Math.min(mapWidth - tileSize, position.x + tileSize); // Move right, but not past the right edge
        break;
      case ' ':
        playerStateMachine.transition('ATTACK');           // Transition to the attack state
        playerStateMachine.transition('STOP_ATTACK');      // Immediately stop the attack state (placeholder behavior)
        return;
      default:
        return; // If any other key is pressed, do nothing
    }

    setDirection(newDirection);                            // Update the character's direction
    setPosition(newPos);                                   // Update the character's position
    playerStateMachine.transition('MOVE');                 // Transition to the move state

    // After a delay, transition to the stop state (end of movement)
    setTimeout(() => {
      playerStateMachine.transition('STOP');
    }, MOVE_DELAY);
  }, [direction, position, playerStateMachine, setPosition, setDirection]);

  // useEffect to add and remove the keydown event listener when the component mounts and unmounts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown); // Attach the keydown event listener

    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Clean up by removing the keydown event listener
    };
  }, [handleKeyDown]);

  // Return the current position and direction, though they are not directly used in this hook
  return { position, direction };
};

export default useCharacterMovement; // Export the custom hook as the default export
