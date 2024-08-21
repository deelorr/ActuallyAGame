import { useContext, useEffect, useRef } from 'react';
import CharacterWrapper from './CharacterWrapper';
import useCharacterMovement from './useCharacterMovement';
import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext';
import StateMachine from '../../classes/StateMachine';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 10;
const ATTACK_DURATION = 500;
const IDLE_FRAME_COUNT = 9;
const IDLE_FRAME_DURATION = 100;

const Character = () => {
  const { 
    position, 
    direction,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);

  const states = {
    idle: {
      MOVE: 'moving',
      ATTACK: 'attacking',
    },
    moving: {
      STOP: 'idle',
      ATTACK: 'attacking',
    },
    attacking: {
      STOP_ATTACK: 'idle',
    },
  };

  const actions = {
    idle: {
      onEnter: () => {
        idleIntervalRef.current = setInterval(() => {
          setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
        }, IDLE_FRAME_DURATION);
      },
      onExit: () => {
        if (idleIntervalRef.current) {
          clearInterval(idleIntervalRef.current);
        }
      },
    },
    moving: {
      onEnter: () => {
        // Handle entering the moving state
      },
      onExit: () => {
        // Handle exiting the moving state
      },
    },
    attacking: {
      onEnter: () => handleAttack(),
      onExit: () => {
        if (attackIntervalRef.current) {
          clearInterval(attackIntervalRef.current);
        }
      },
    },
  };

  const stateMachine = useRef(new StateMachine('idle', states, actions)).current;

  useEffect(() => {
    stateMachine.transition('MOVE');
    stateMachine.transition('STOP');
  }, [stateMachine]);

  const handleAttack = () => {
    setAttackFrame(0);

    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current);
          stateMachine.transition('STOP_ATTACK');
          return prev;
        }
        return prev + 1;
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  useCharacterMovement(stateMachine);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        stateMachine.transition('ATTACK');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (attackIntervalRef.current) {
        clearInterval(attackIntervalRef.current);
      }
    };
  }, [stateMachine]);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame = attackFrame;

    if (stateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/character-attack.png`;
    } else if (stateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = attackFrame % ATTACK_FRAME_COUNT;
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
      marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`,
      marginTop: `${(TILE_SIZE - SPRITE_HEIGHT) / 2}px`,
      imageRendering: 'pixelated',
    };
  };

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
