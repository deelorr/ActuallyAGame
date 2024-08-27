import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';
import EnemyWrapper from './EnemyWrapper';

// Constants for sprite dimensions and animation frame configurations
const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 8;
const ATTACK_DURATION = 500; // Total duration for the attack animation in milliseconds
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 70; // Duration of each idle frame in milliseconds
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 20; // Duration of each move frame in milliseconds

// Enemy component manages the rendering and animation of the enemy character
const Enemy = () => {
  const { 
    enemyPosition,         // Current position of the enemy
    enemyDirection,        // Direction the enemy is facing
    enemyAttackFrame,      // Current frame of the enemy's attack animation
    setEnemyAttackFrame,   // Function to update the attack frame
    enemyIdleFrame,        // Current frame of the enemy's idle animation
    setEnemyIdleFrame,     // Function to update the idle frame
    enemyMoveFrame,        // Current frame of the enemy's move animation
    setEnemyMoveFrame,     // Function to update the move frame
    enemyIsMoving,         // Boolean indicating if the enemy is moving
    enemyIsAttacking,      // Boolean indicating if the enemy is attacking
  } = useContext(GameContext);

  // Refs to store interval IDs, allowing for animation frame updates and cleanup
  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Function to handle the attack animation
  const handleAttack = () => {
    setEnemyAttackFrame(0); // Reset attack frame to the start
    clearInterval(attackIntervalRef.current);
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame((prev) => (prev + 1) % ATTACK_FRAME_COUNT);
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  // Function to handle the idle animation
  const handleIdle = () => {
    clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
    }, IDLE_FRAME_DURATION);
  };

  // Function to handle the move animation
  const handleMove = () => {
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT);
    }, MOVE_FRAME_DURATION);
  };

  // useEffect to handle animation based on the enemy's state
  useEffect(() => {
    if (enemyIsAttacking) {
      handleAttack();
    } else if (enemyIsMoving) {
      handleMove();
    } else {
      handleIdle();
    }

    return () => {
      clearInterval(attackIntervalRef.current);
      clearInterval(idleIntervalRef.current);
      clearInterval(moveIntervalRef.current);
    };
  }, [enemyIsAttacking, enemyIsMoving]);

  // Function to generate the sprite style based on the enemy's current state and direction
  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;

    if (enemyIsAttacking) {
      spriteStrip = `/src/assets/enemy-attack.png`;
      currentFrame = enemyAttackFrame;
    } else if (enemyIsMoving) {
      spriteStrip = `/src/assets/enemy-walk.png`;
      currentFrame = enemyMoveFrame;
    } else {
      spriteStrip = `/src/assets/enemy-idle.png`;
      currentFrame = enemyIdleFrame;
    }

    const flip = enemyDirection === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` 
      : 'scaleX(1)';

    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      border: '1px solid blue',
    };
  };

  // Render the EnemyWrapper component with the correct position and zIndex
  return (
    <EnemyWrapper position={enemyPosition} zIndex={enemyPosition.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} className='enemy-sprite'/>
    </EnemyWrapper>
  );
};

export default Enemy;
