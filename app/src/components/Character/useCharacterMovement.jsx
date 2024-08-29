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
    setIsAttacking,
    hoveredTile,
    setHoveredTile,        
  } = useContext(GameContext);

  // Function to move to the tile that is clicked (not hovered)
  const moveToClickedTile = useCallback(() => {
    if (hoveredTile) {
      setIsMoving(true);
      setPosition(hoveredTile);
      setHoveredTile(null);
      setTimeout(() => setIsMoving(false), 100); // Stop moving after reaching the tile
    }
  }, [hoveredTile, setIsMoving, setPosition, setHoveredTile]);

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
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500); // Example duration
        return; // Return early since there's no need to move
      default:
        return;
    }

    setDirection(newDirection);
    setPosition(newPos);
    setIsMoving(true);

    setTimeout(() => setIsMoving(false), 100); // Example stop after moving
  }, [direction, position, setPosition, setDirection, setIsMoving, setIsAttacking]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Return the movement function to be triggered manually on click
  return { position, direction, isMoving, isAttacking, moveToClickedTile };
};

export default useCharacterMovement;
