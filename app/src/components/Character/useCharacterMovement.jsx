import { useCallback, useEffect, useContext } from 'react';
import GameContext from '../../contexts/GameContext'; // Import the GameContext

const TILE_SIZE = 16; // The size of one grid tile, reduced by half
const MOVE_DELAY = 80; // Match this with the CSS transition duration

const useCharacterMovement = () => {
  const { 
    position, 
    setPosition,
    direction,
    setDirection,
    moving,
    setMoving
  } = useContext(GameContext);

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
    [direction, position, moving, setPosition, setDirection, setMoving]
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
