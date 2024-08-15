import { useState, useEffect, useCallback } from 'react';

const Character = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('down'); // 'up', 'down', 'left', 'right'
  const [step, setStep] = useState(0); // Current animation frame
  const [moving, setMoving] = useState(false); // Track if the character is moving

  const SPRITE_WIDTH = 96; // Width of each sprite frame
  const SPRITE_HEIGHT = 64; // Height of each sprite frame
  const TILE_SIZE = 64; // The size of one grid tile
  const WALK_FRAME_COUNT = 9; // Number of frames in the walking animation
  const IDLE_FRAME_COUNT = 8; // Number of frames in the idle animation
  const MOVE_SPEED = 8; // Adjust this value to slow down movement

  const handleKeyDown = useCallback((e) => {
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
  
    setDirection(newDirection);
    if (newDirection === direction) {
      setPosition(newPos); // Only update position if the direction hasn't changed
    }
    setStep((prev) => (prev + 1) % WALK_FRAME_COUNT);
    setMoving(true);
  }, [direction, position]);
  

  const handleKeyUp = useCallback(() => {
    setMoving(false);
    console.log('Key released, stopping movement');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!moving) {
        setStep((prev) => (prev + 1) % IDLE_FRAME_COUNT); // Advance the idle animation frame
      }
      setMoving(false); // Reset moving after the interval
    }, 1000 / MOVE_SPEED); // Control the movement speed

    return () => clearInterval(interval);
  }, [moving]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  const getSpriteStyle = () => {
    const spriteStrip = moving
      ? `/src/assets/character-walk.png` 
      : `/src/assets/character-idle.png`; 
  
    // Adjusting for flip by shifting position
    const flip = direction === 'left' ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` : 'scaleX(1)';
    
    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${step * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`, 
      height: `${SPRITE_HEIGHT}px`, 
      transform: flip,
      transformOrigin: 'top left',
      marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`, // Center the character on the tile
    };
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        ...getSpriteStyle(),
      }}
    />
  );
};

export default Character;
