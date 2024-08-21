import { useContext, useEffect, useRef } from 'react';
import GameContext from '../contexts/GameContext';
import EnemyWrapper from '../components/Enemy/EnemyWrapper';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 8;
const ATTACK_DURATION = 500;
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 70;
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 20;

const Enemy = () => {
  const { 
    enemyPosition, 
    enemyDirection,
    enemyAttackFrame,
    setEnemyAttackFrame,
    enemyIdleFrame,
    setEnemyIdleFrame,
    enemyMoveFrame,
    setEnemyMoveFrame,
    enemyStateMachine, // Access the enemy state machine from context
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    setEnemyAttackFrame(0);
    if (attackIntervalRef.current) {
      clearInterval(attackIntervalRef.current);
      setEnemyAttackFrame(0); // Reset to 0 when clearing the interval
    }
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current);
          setEnemyAttackFrame(0); // Reset to 0 when the animation completes
          enemyStateMachine.transition('STOP_ATTACK');
          return prev;
        }
        return prev + 1;
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  const handleIdle = () => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      setEnemyIdleFrame(0); // Reset to 0 when clearing the interval
    }
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
    }, IDLE_FRAME_DURATION);
  };

  const handleMove = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      setEnemyMoveFrame(0); // Reset to 0 when clearing the interval
    }
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT);
    }, MOVE_FRAME_DURATION);
  };

  useEffect(() => {
    if (enemyStateMachine.getState() === 'idle') {
      handleIdle();
    }

    // Cleanup on unmount
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
  }, []);

  useEffect(() => {
    const currentState = enemyStateMachine.getState();

    if (currentState === 'idle') {
      handleIdle();
    } else if (currentState === 'attacking') {
      handleAttack();
    } else if (currentState === 'moving') {
      handleMove();
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        setEnemyIdleFrame(0); // Reset idle frame when exiting idle state
      }
    }

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
  }, [enemyStateMachine.getState()]);

  const getSpriteStyle = () => {
    
    let spriteStrip;
    let currentFrame;
  
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
      };
    };

  return (
    <EnemyWrapper position={enemyPosition} zIndex={enemyPosition.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} className='enemy-sprite'/>
    </EnemyWrapper>
  );

};

export default Enemy;
