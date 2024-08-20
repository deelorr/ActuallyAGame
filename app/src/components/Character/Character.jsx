import { useContext, useEffect, useRef } from 'react';
import CharacterWrapper from './CharacterWrapper';
import useCharacterMovement from './useCharacterMovement';
import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext';
import StateMachine from '../../classes/StateMachine';

// Constants for sprite and animation settings
const SPRITE_WIDTH = 96; // Width of the character sprite
const SPRITE_HEIGHT = 64; // Height of the character sprite
const TILE_SIZE = 32; // Size of each tile in the game grid
const ATTACK_FRAME_COUNT = 10; // Number of frames in the attack animation
const ATTACK_DURATION = 500; // Total duration of the attack animation in milliseconds
const IDLE_FRAME_COUNT = 9; // Number of frames in the idle animation
const IDLE_FRAME_DURATION = 100; // Duration of each idle animation frame in milliseconds

const Character = () => {
  // Extracting state and actions from the GameContext
  const { 
    position, 
    direction,
    setMoving,
    setIsAttacking,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
  } = useContext(GameContext);

  // References for managing intervals
  const attackIntervalRef = useRef(null); // Reference to the attack interval
  const idleIntervalRef = useRef(null); // Reference to the idle animation interval

  // Define the states and their possible transitions
  const states = {
    idle: {
      MOVE: 'moving', // Transition from idle to moving
      ATTACK: 'attacking', // Transition from idle to attacking
    },
    moving: {
      STOP: 'idle', // Transition from moving to idle
      ATTACK: 'attacking', // Transition from moving to attacking
    },
    attacking: {
      STOP_ATTACK: 'idle', // Transition from attacking to idle
    },
  };

  // Define the actions to perform when entering or exiting each state
  const actions = {
    idle: {
      onEnter: () => {
        // Start the idle animation when entering the idle state
        idleIntervalRef.current = setInterval(() => {
          setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
        }, IDLE_FRAME_DURATION);
      },
      onExit: () => {
        // Stop the idle animation when exiting the idle state
        if (idleIntervalRef.current) {
          clearInterval(idleIntervalRef.current);
        }
      },
    },
    moving: {
      onEnter: () => setMoving(true), // Set the moving state to true
      onExit: () => setMoving(false), // Set the moving state to false
    },
    attacking: {
      onEnter: () => handleAttack(), // Trigger the attack logic
      onExit: () => setIsAttacking(false), // Set the attacking state to false
    },
  };

  // Initialize the state machine with the initial state and defined transitions/actions
  const stateMachine = useRef(new StateMachine('idle', states, actions)).current;

  // Function to handle the attack animation logic
  const handleAttack = () => {
    setAttackFrame(0); // Start the attack animation from the first frame
    setIsAttacking(true); // Set the attacking state to true

    // Start the attack animation interval
    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          // Stop the attack animation after the last frame
          clearInterval(attackIntervalRef.current);
          stateMachine.transition('STOP_ATTACK'); // Transition back to idle after attack
          return prev;
        }
        return prev + 1; // Move to the next attack frame
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT); // Spread the animation frames across the duration
  };

  // Use the custom hook for character movement, passing the state machine
  useCharacterMovement(stateMachine);

  // Effect to handle keydown events for attacking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        stateMachine.transition('ATTACK'); // Trigger the attack state when the space bar is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown); // Add event listener for keydown
    return () => {
      window.removeEventListener('keydown', handleKeyDown); // Clean up the event listener on component unmount
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current); // Clear attack interval on unmount
      }
    };
  }, [stateMachine]);

  // Function to get the appropriate sprite style based on the current state
  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame = attackFrame;

    // Determine the sprite strip and frame to display based on the current state
    if (stateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/character-attack.png`;
    } 
    else if (stateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = attackFrame % ATTACK_FRAME_COUNT;
    } 
    else {
      spriteStrip = `/src/assets/character-idle.png`;
      currentFrame = idleFrame;
    }

    // Handle sprite flipping based on the direction
    const flip = direction === 'left' ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` : 'scaleX(1)';

    // Return the style object for the sprite
    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`,
      marginTop: `${(TILE_SIZE - SPRITE_HEIGHT) / 2}px`,
      imageRendering: 'pixelated',
    };
  };

  // Render the character inside the CharacterWrapper with the calculated sprite style
  return (
    <CharacterWrapper position={position} zIndex={position.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} />
    </CharacterWrapper>
  );
};

// PropTypes for the Character component
Character.propTypes = {
  overlayLayout: PropTypes.array,
};

export default Character;
