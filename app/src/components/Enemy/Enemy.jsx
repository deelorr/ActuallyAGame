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
  // Extract enemy-related state and functions from GameContext
  const { 
    enemyPosition,         // Current position of the enemy
    enemyDirection,        // Direction the enemy is facing
    enemyAttackFrame,      // Current frame of the enemy's attack animation
    setEnemyAttackFrame,   // Function to update the attack frame
    enemyIdleFrame,        // Current frame of the enemy's idle animation
    setEnemyIdleFrame,     // Function to update the idle frame
    enemyMoveFrame,        // Current frame of the enemy's move animation
    setEnemyMoveFrame,     // Function to update the move frame
    enemyStateMachine,     // State machine managing the enemy's state
  } = useContext(GameContext);

  // Refs to store interval IDs, allowing for animation frame updates and cleanup
  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Function to handle the attack animation
  const handleAttack = () => {
    setEnemyAttackFrame(0); // Reset attack frame to the start
    if (attackIntervalRef.current) {
      clearInterval(attackIntervalRef.current);
      setEnemyAttackFrame(0); // Ensure the attack frame is reset when clearing the interval
    }
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current); // Stop animation when last frame is reached
          setEnemyAttackFrame(0); // Reset frame to start after animation ends
          enemyStateMachine.transition('STOP_ATTACK'); // Transition to stop attack state
          return prev;
        }
        return prev + 1; // Move to the next frame
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  // Function to handle the idle animation
  const handleIdle = () => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      setEnemyIdleFrame(0); // Reset idle frame when clearing the interval
    }
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT); // Cycle through idle frames
    }, IDLE_FRAME_DURATION);
  };

  // Function to handle the move animation
  const handleMove = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      setEnemyMoveFrame(0); // Reset move frame when clearing the interval
    }
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT); // Cycle through move frames
    }, MOVE_FRAME_DURATION);
  };

  // useEffect to handle initial idle animation and cleanup on unmount
  useEffect(() => {
    if (enemyStateMachine.getState() === 'idle') {
      handleIdle();
    }

    // Cleanup all intervals when the component unmounts
    return () => {
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
      }
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
      }
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect only runs on mount and unmount

  // useEffect to handle animation changes based on the enemy's state
  useEffect(() => {
    const currentState = enemyStateMachine.getState(); // Get the current state of the enemy

    if (currentState === 'idle') {
      handleIdle(); // Start the idle animation
    } else if (currentState === 'attacking') {
      handleAttack(); // Start the attack animation
    } else if (currentState === 'moving') {
      handleMove(); // Start the move animation
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        setEnemyIdleFrame(0); // Reset idle frame when moving
      }
    }

    // Cleanup animation intervals when the state changes
    return () => {
      if (currentState === 'attacking' && attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
        setEnemyAttackFrame(0); // Reset attack frame when exiting attack state
      }
      if (currentState === 'idle' && idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        setEnemyIdleFrame(0); // Reset idle frame when exiting idle state
      }
      if (currentState === 'moving' && moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
        setEnemyMoveFrame(0); // Reset move frame when exiting move state
      }
    };
  }, [enemyStateMachine.getState()]); // Dependency array ensures this effect runs when the enemy's state changes

  // Function to generate the sprite style based on the enemy's current state and direction
  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;

    // Determine which sprite strip and frame to use based on the current state
    if (enemyStateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/enemy-attack.png`;
      currentFrame = enemyAttackFrame;
    } else if (enemyStateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/enemy-walk.png`;
      currentFrame = enemyMoveFrame;
    } else {
      spriteStrip = `/src/assets/enemy-idle.png`;
      currentFrame = enemyIdleFrame;
    }

    // Determine if the sprite should be flipped based on the direction
    const flip = enemyDirection === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` // Flip the sprite if facing left
      : 'scaleX(1)';                               // No flip if facing right

    return {
      backgroundImage: `url(${spriteStrip})`,            // Set the background image to the correct sprite sheet
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`, // Position the sprite to show the correct frame
      width: `${SPRITE_WIDTH}px`,                        // Set the width of the sprite
      height: `${SPRITE_HEIGHT}px`,                      // Set the height of the sprite
      transform: flip,                                   // Apply the flip transformation if necessary
      transformOrigin: 'top left',                       // Set the origin for the transform
      border: '1px solid blue',                          // Add a blue border around the enemy sprite (for debugging purposes)
    };
  };

  // Render the EnemyWrapper component with the correct position and zIndex
  return (
    <EnemyWrapper position={enemyPosition} zIndex={enemyPosition.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} className='enemy-sprite'/>
    </EnemyWrapper>
  );

};

export default Enemy; // Export the Enemy component as the default export
