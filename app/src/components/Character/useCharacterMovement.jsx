import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const TILE_SIZE = 16;
const MOVE_DELAY = 80;

const useCharacterMovement = () => {
  const { 
    position, 
    setPosition, 
    direction, 
    setDirection, 
    moving, 
    setMoving
  } = useContext(GameContext);

  const handleKeyDown = useCallback((event) => {

      if (moving) return; // Prevent movement if already moving

      let newDirection = direction;
      let newPos = { ...position };

      switch (event.key) {
        case 'ArrowUp':
          newDirection = 'up';
          newPos.y = Math.max(position.y - TILE_SIZE, 0);
          break;
        case 'ArrowDown':
          newDirection = 'down';
          newPos.y = Math.min(position.y + TILE_SIZE, TILE_SIZE * 18);
          break;
        case 'ArrowLeft':
          newDirection = 'left';
          newPos.x = Math.max(position.x - TILE_SIZE, 0);
          break;
        case 'ArrowRight':
          newDirection = 'right';
          newPos.x = Math.min(position.x + TILE_SIZE, TILE_SIZE * 18);
          break;
        default:
          return;
      }

      setDirection(newDirection);
      setPosition(newPos);
      setMoving(true);

      setTimeout(() => {
        setMoving(false);
      }, MOVE_DELAY);
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
