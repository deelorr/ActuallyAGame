import { useContext, useEffect, useRef } from 'react';
import CharacterWrapper from './CharacterWrapper';
import useCharacterMovement from './useCharacterMovement';
import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext'; // Import GameContext

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 10; // Number of frames in the attack animation
const ATTACK_DURATION = 500; // Duration of the attack animation in milliseconds
const IDLE_FRAME_COUNT = 9; // Number of frames in the idle animation
const IDLE_FRAME_DURATION = 100; // Duration of the idle animation in milliseconds

const Character = () => {
  const { 
    position, 
    direction,
    isAttacking,
    setIsAttacking,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
    setIdle,
    moving,
    setMoving,
   } = useContext(GameContext); // Use GameContext to get state and actions

   useCharacterMovement(); // Use the custom hook for character movement
  
  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);

  const handleAttack = () => {
    if (isAttacking) return; // Prevent re-trigger while already attacking
    setIsAttacking(true);
    setIdle(false); // Ensure idle is deactivated
    setMoving(false); // Ensure moving is deactivated
    setAttackFrame(0); // Starts the first attack frame

    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current);
          setIsAttacking(false); // End the attack after the last frame
          setIdle(true); // Set to idle after attacking
          return prev;
        }
        return prev + 1; // Move to the next frame
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT); // Spread the animation across the duration
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        handleAttack(); // Trigger the attack on space bar press
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current); // Clear interval on unmount
      }
    };
  }, []);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame = attackFrame;
  
    if (isAttacking) {
      spriteStrip = `/src/assets/character-attack.png`;
    } 
    else if (moving) {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = attackFrame % ATTACK_FRAME_COUNT; // Loop walking frames
    } 
    else {
      spriteStrip = `/src/assets/character-idle.png`;
      currentFrame = idleFrame; // Use idle frame state
    }
  
    const flip = direction === 'left' ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` : 'scaleX(1)';
  
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

  useEffect(() => {
    if (!moving && !isAttacking) {
      setIdle(true); // Character should be idle
      idleIntervalRef.current = setInterval(() => {
        setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
      }, IDLE_FRAME_DURATION);
    } else {
      setIdle(false); // Ensure idle is deactivated
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current); // Stop idle animation when not idle
      }
    }

    return () => {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current); // Cleanup on unmount
      }
    };
  }, [moving, isAttacking, setIdleFrame]);

  return (
    <CharacterWrapper position={position} zIndex={position.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} />
    </CharacterWrapper>
  );
};

Character.propTypes = {
  overlayLayout: PropTypes.array,
};

export default Character;
