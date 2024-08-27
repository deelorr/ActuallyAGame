import { useContext, useCallback, useEffect } from 'react';
import GameContext from '../../contexts/GameContext';

const tileSize = 32;
const mapHeight = tileSize * 10; 
const mapWidth = tileSize * 10;  

const useCharacterMovement = () => {
  const { 
    position,             
    setPosition,          
    direction,            
    setDirection,         
    isMoving,             
    setIsMoving,          
    isAttacking,          
    setIsAttacking        
  } = useContext(GameContext);

  const handleKeyDown = useCallback((event) => {
    let newDirection = direction;
    let newPos = { ...position };

    switch (event.key) {
      case 'ArrowUp':
        newDirection = 'up';
        newPos.y = Math.max(position.y - tileSize, 0);
        setIsMoving(true);
        break;
      case 'ArrowDown':
        newDirection = 'down';
        newPos.y = Math.min(mapHeight - tileSize, position.y + tileSize);
        setIsMoving(true);
        break;
      case 'ArrowLeft':
        newDirection = 'left';
        newPos.x = Math.max(position.x - tileSize, 0);
        setIsMoving(true);
        break;
      case 'ArrowRight':
        newDirection = 'right';
        newPos.x = Math.min(mapWidth - tileSize, position.x + tileSize);
        setIsMoving(true);
        break;
      case ' ':
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Example duration
        break;
      default:
        break;
    }

    setDirection(newDirection);
    setPosition(newPos);

    setTimeout(() => setIsMoving(false), 100); // Example stop after moving
  }, [direction, position, setPosition, setDirection, setIsMoving, setIsAttacking]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return { position, direction, isMoving, isAttacking };
};

export default useCharacterMovement;
