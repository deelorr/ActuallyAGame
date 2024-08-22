import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const tileSize = 32;
const mapHeight = tileSize * 10;
const mapWidth = tileSize * 10;
const MOVE_DELAY = 80;

const useCharacterMovement = () => {

  const { 
    position, 
    setPosition, 
    direction, 
    setDirection, 
    playerStateMachine 
  } = useContext(GameContext);

  const handleKeyDown = useCallback((event) => {
 

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
      case ' ':
        playerStateMachine.transition('ATTACK');
        playerStateMachine.transition('STOP_ATTACK');
        return;
      default:
        return;
    }

    setDirection(newDirection);
    setPosition(newPos);
    playerStateMachine.transition('MOVE');

    setTimeout(() => {
      playerStateMachine.transition('STOP');
    }, MOVE_DELAY);
  }, [direction, position, playerStateMachine, setPosition, setDirection]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { position, direction };
};

export default useCharacterMovement;
