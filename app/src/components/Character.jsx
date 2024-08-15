import { useState, useEffect, useCallback } from 'react';

/** Constants **/
const SPRITE_WIDTH = 96; // Width of each sprite frame
const SPRITE_HEIGHT = 64; // Height of each sprite frame
const TILE_SIZE = 32; // The size of one grid tile
const WALK_FRAME_COUNT = 9; // Number of frames in the walking animation
const IDLE_FRAME_COUNT = 8; // Number of frames in the idle animation
const MOVE_SPEED = 8; // Adjust this value to slow down movement

/** Custom Hooks **/

// Hook to manage character position and direction
const useCharacterMovement = () => {
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

      setDirection(newDirection);
      if (newDirection === direction) {
        setPosition(newPos); // Only update position if the direction hasn't changed
      }
      setMoving(true);
    },
    [direction, position]
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

  return { position, direction, moving };
};

// Hook to manage animation frames
const useAnimation = (moving) => {
  const [step, setStep] = useState(0); // Current animation frame

  useEffect(() => {
    const frameCount = moving ? WALK_FRAME_COUNT : IDLE_FRAME_COUNT;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % frameCount);
    }, 1000 / MOVE_SPEED); // Control the movement speed

    return () => clearInterval(interval);
  }, [moving]);

  return step;
};

/** Helper Functions **/

const getSpriteStyle = (step, direction, moving) => {
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
    marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`, // Center the character horizontally on the tile
    marginTop: `${(TILE_SIZE - SPRITE_HEIGHT) / 2}px`, // Center the character vertically on the tile
    imageRendering: 'pixelated', // Ensures crisp rendering of pixel art
  };
};

/** Main Component **/

const Character = () => {
  const { position, direction, moving } = useCharacterMovement();
  const step = useAnimation(moving);
  const spriteStyle = getSpriteStyle(step, direction, moving);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        ...spriteStyle,
      }}
    />
  );
};

export default Character;
