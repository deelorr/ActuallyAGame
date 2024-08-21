import { useContext, useEffect, useRef } from 'react';
import CharacterWrapper from './CharacterWrapper';
import GameContext from '../../contexts/GameContext';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 10;
const ATTACK_DURATION = 500;
const IDLE_FRAME_COUNT = 9;
const IDLE_FRAME_DURATION = 70;
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 20;

const Character = () => {
  const { 
    position, 
    direction,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
    moveFrame,
    setMoveFrame,
    stateMachine,
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    setAttackFrame(0);
    if (attackIntervalRef.current) {
      clearInterval(attackIntervalRef.current);
      setAttackFrame(0); // Reset to 0 when clearing the interval
    }
    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current);
          setAttackFrame(0); // Reset to 0 when the animation completes
          stateMachine.transition('STOP_ATTACK');
          return prev;
        }
        return prev + 1;
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };
  

  const handleIdle = () => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      setIdleFrame(0); // Reset to 0 when clearing the interval
    }
    idleIntervalRef.current = setInterval(() => {
      setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
    }, IDLE_FRAME_DURATION);
  };
  

  const handleMove = () => {
    if (moveIntervalRef.current) {
      clearInterval(moveIntervalRef.current);
      setMoveFrame(0); // Reset to 0 when clearing the interval
    }
    moveIntervalRef.current = setInterval(() => {
      setMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT);
    }, MOVE_FRAME_DURATION);
  };
  

  useEffect(() => {
    // Initialize the idle state animation when the component mounts
    if (stateMachine.getState() === 'idle') {
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
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        stateMachine.transition('ATTACK');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [stateMachine]);

  useEffect(() => {
    const currentState = stateMachine.getState();
  
    if (currentState === 'idle') {
      handleIdle();
    } else if (currentState === 'attacking') {
      handleAttack();
    } else if (currentState === 'moving') {
      handleMove();
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        setIdleFrame(0); // Reset idle frame when exiting idle state
      }
    }
  
    return () => {
      if (currentState === 'attacking' && attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
        setAttackFrame(0); // Reset attack frame when exiting attack state
      }
      if (currentState === 'idle' && idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        setIdleFrame(0); // Reset idle frame when exiting idle state
      }
      if (currentState === 'moving' && moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
        setMoveFrame(0); // Reset move frame when exiting move state
      }
    };
  }, [stateMachine.getState()]);
  

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;
  
    if (stateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/character-attack.png`;
      currentFrame = attackFrame;
    } else if (stateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = moveFrame;
    } else {
      spriteStrip = `/src/assets/character-idle.png`;
      currentFrame = idleFrame;
    }
  
    const flip = direction === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` 
      : 'scaleX(1)';
  
    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      imageRendering: 'pixelated',
    };
  };
  

  return (
    <CharacterWrapper position={position} zIndex={position.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} className='player-sprite'/>
    </CharacterWrapper>
  );
};

export default Character;
