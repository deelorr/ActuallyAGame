import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';

// Constants defining the number of frames and duration for each animation type
const ATTACK_FRAME_COUNT = 8;
const ATTACK_FRAME_DURATION = 70; // in milliseconds
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 120; // in milliseconds
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 70; // in milliseconds

// Custom hook to manage enemy animations based on the enemy's state
const useEnemyAnimation = () => {
  const { 
    setEnemyAttackFrame,    
    setEnemyIdleFrame,      
    setEnemyMoveFrame,      
    enemyIsAttacking,
    enemyIsMoving,
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    setEnemyAttackFrame(0); // Reset to the first frame
    clearInterval(attackIntervalRef.current);

    let currentFrame = 0;

    attackIntervalRef.current = setInterval(() => {
      if (currentFrame < ATTACK_FRAME_COUNT - 1) {
        setEnemyAttackFrame(currentFrame);
        currentFrame += 1;
      } else {
        setEnemyAttackFrame(0); // Reset the frame to 0 after the animation completes
        clearInterval(attackIntervalRef.current); // Stop the attack animation
      }
    }, ATTACK_FRAME_DURATION);
  };

  const handleIdle = () => {
    clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT); // Update idle frame
    }, IDLE_FRAME_DURATION);
  };

  const handleMove = () => {
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT); // Update move frame
    }, MOVE_FRAME_DURATION);
  };

  useEffect(() => {
    clearInterval(attackIntervalRef.current);
    clearInterval(idleIntervalRef.current);
    clearInterval(moveIntervalRef.current);

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

  return null;
};

export default useEnemyAnimation;
