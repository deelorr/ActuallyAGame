import { useState, useCallback, useEffect } from 'react';

const TILE_SIZE = 16; // The size of one grid tile, reduced by half
const MOVE_DELAY = 80; // Match this with the CSS transition duration

const useCharacterMovement = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('down');
  const [moving, setMoving] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (moving) return; // Prevent new movement until the current one is done

      let newDirection = direction;
      let newPos = { ...position };

      switch (e.key) {
        case 'ArrowUp':
          newDirection = 'up';
          newPos.y = Math.max(position.y - TILE_SIZE, 0);
          break;
        case 'ArrowDown':
          newDirection = 'down';
          newPos.y = Math.min(position.y + TILE_SIZE, TILE_SIZE * 18); // Adjusted for smaller tile size
          break;
        case 'ArrowLeft':
          newDirection = 'left';
          newPos.x = Math.max(position.x - TILE_SIZE, 0);
          break;
        case 'ArrowRight':
          newDirection = 'right';
          newPos.x = Math.min(position.x + TILE_SIZE, TILE_SIZE * 18); // Adjusted for smaller tile size
          break;
        default:
          return;
      }

      setDirection(newDirection);
      setPosition(newPos);
      setMoving(true);

      setTimeout(() => setMoving(false), MOVE_DELAY); // Prevent further movement during the transition
    },
    [direction, position, moving]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { position, direction, moving };
};

export default useCharacterMovement;
