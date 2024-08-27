import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';

// Constants defining the number of frames and duration for each animation type
const ATTACK_FRAME_COUNT = 10;
const ATTACK_FRAME_DURATION = 50; // in milliseconds
const IDLE_FRAME_COUNT = 9;
const IDLE_FRAME_DURATION = 120; // in milliseconds
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 70; // in milliseconds

// Custom hook to manage character animations based on the player's state
const useCharacterAnimation = () => {
  const { 
    setAttackFrame,    
    setIdleFrame,      
    setMoveFrame,      
    isAttacking,
    isMoving,
    isPlayerAttacked,
    setHealth,  // Assuming you have a health state for the player
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    console.log("Starting attack animation");
    setAttackFrame(0); // Reset to the first frame
    clearInterval(attackIntervalRef.current);

    let currentFrame = 0;

    attackIntervalRef.current = setInterval(() => {
      if (currentFrame < ATTACK_FRAME_COUNT - 1) {
        setAttackFrame(currentFrame);
        currentFrame += 1;
      } else {
        setAttackFrame(0); // Reset the frame to 0 after the animation completes
        clearInterval(attackIntervalRef.current); // Stop the attack animation
      }
    }, ATTACK_FRAME_DURATION);
  };

  const handleIdle = () => {
    console.log("Starting idle animation");
    clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = setInterval(() => {
      setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT); // Update idle frame
    }, IDLE_FRAME_DURATION);
  };

  const handleMove = () => {
    console.log("Starting move animation");
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      setMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT); // Update move frame
    }, MOVE_FRAME_DURATION);
  };

  useEffect(() => {
    clearInterval(attackIntervalRef.current);
    clearInterval(idleIntervalRef.current);
    clearInterval(moveIntervalRef.current);

    if (isAttacking) {
      handleAttack();
    } else if (isMoving) {
      handleMove();
    } else {
      handleIdle();
    }

    return () => {
      clearInterval(attackIntervalRef.current);
      clearInterval(idleIntervalRef.current);
      clearInterval(moveIntervalRef.current);
    };
  }, [isAttacking, isMoving, isPlayerAttacked, setHealth]);

  return null;
};

export default useCharacterAnimation;
