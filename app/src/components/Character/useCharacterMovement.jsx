
import { useState, useEffect, useCallback } from 'react';

// Manages the character's movement and direction state.

const TILE_SIZE = 32; // The size of one grid tile

const useCharacterMovement = (overlayLayout) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('down'); // 'up', 'down', 'left', 'right'
  const [moving, setMoving] = useState(false); // Track if the character is moving

  const handleKeyDown = useCallback(
    (e) => {
      let newDirection = direction;
      let newPos = { ...position };

      const mapWidth = TILE_SIZE * 10; // Assuming your map is 10 tiles wide
      const mapHeight = TILE_SIZE * 10; // Assuming your map is 10 tiles tall

      switch (e.key) {
        case 'ArrowUp':
          newDirection = 'up';
          newPos.y = Math.max(position.y - TILE_SIZE, 0); // Prevent moving out of bounds at the top
          break;
        case 'ArrowDown':
          newDirection = 'down';
          newPos.y = Math.min(position.y + TILE_SIZE, mapHeight - TILE_SIZE); // Allow full movement into the last tile
          break;
        case 'ArrowLeft':
          newDirection = 'left';
          if (direction === 'right') {
            newPos.x = position.x; // Stay in the same position when flipping
          } else {
            newPos.x = Math.max(position.x - TILE_SIZE, 0); // Move left if not flipping
          }
          break;
        case 'ArrowRight':
          newDirection = 'right';
          if (direction === 'left') {
            newPos.x = position.x; // Stay in the same position when flipping
          } else {
            newPos.x = Math.min(position.x + TILE_SIZE, mapWidth - TILE_SIZE); // Move right if not flipping
          }
          break;
        default:
          return;
      }

      // Adjust zIndex based on position if needed for correct layering
      const characterZIndex = newPos.y + TILE_SIZE; // This is a simple method where z-index increases as the character moves downwards.

      setDirection(newDirection);
      if (newDirection === direction) {
        setPosition(newPos); // Only update position if the direction hasn't changed
      }
      setMoving(true);
      return characterZIndex;
    },
    [direction, position, overlayLayout]
  );

  const handleKeyUp = useCallback(() => {
    setMoving(false);
    console.log('Key released, stopping movement');
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return { position, direction, moving, zIndex: handleKeyDown };
};

export default useCharacterMovement;
