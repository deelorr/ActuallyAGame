import { useContext, useEffect, useRef } from 'react';
import GameContext from '../contexts/GameContext';
import './Enemy.css'; // Create this CSS file to style the enemy

const SPRITE_WIDTH = 96; // Adjust to match your sprite sheet
const SPRITE_HEIGHT = 64; // Adjust to match your sprite sheet
const ATTACK_FRAME_COUNT = 7; // Number of frames in the attack animation
const IDLE_FRAME_COUNT = 6; // Number of frames in the idle animation
const ATTACK_DURATION = 500; // Duration of the attack animation in milliseconds
const IDLE_FRAME_DURATION = 100; // Duration of each idle frame in milliseconds

const Enemy = () => {
  const { 
    enemyPosition, 
    enemyDirection, 
    enemyIsMoving, 
    enemyIsAttacking, 
    enemyAttackFrame, 
    setEnemyAttackFrame, 
    enemyIdleFrame, 
    setEnemyIdleFrame,
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);

  useEffect(() => {
    if (enemyIsAttacking) {
      attackIntervalRef.current = setInterval(() => {
        setEnemyAttackFrame(prev => (prev + 1) % ATTACK_FRAME_COUNT);
      }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
    } else {
      clearInterval(attackIntervalRef.current);
      setEnemyAttackFrame(0);
    }

    return () => clearInterval(attackIntervalRef.current);
  }, [enemyIsAttacking, setEnemyAttackFrame]);

  useEffect(() => {
    if (!enemyIsMoving && !enemyIsAttacking) {
      idleIntervalRef.current = setInterval(() => {
        setEnemyIdleFrame(prev => (prev + 1) % IDLE_FRAME_COUNT);
      }, IDLE_FRAME_DURATION);
    } else {
      clearInterval(idleIntervalRef.current);
      setEnemyIdleFrame(0);
    }

    return () => clearInterval(idleIntervalRef.current);
  }, [enemyIsMoving, enemyIsAttacking, setEnemyIdleFrame]);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;

    if (enemyIsAttacking) {
      spriteStrip = '/src/assets/enemy-attack.png';
      currentFrame = enemyAttackFrame;
    } else if (enemyIsMoving) {
      spriteStrip = '/src/assets/character-walk.png';
      currentFrame = 0; // You can loop movement frames if you have them
    } else {
      spriteStrip = '/src/assets/enemy-idle.png';
      currentFrame = enemyIdleFrame;
    }

    const flip = enemyDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)';

    return {
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${currentFrame * SPRITE_WIDTH}px 0px`,
      transform: flip,
      position: 'absolute',
      top: `${enemyPosition.y}px`,
      left: `${enemyPosition.x}px`,
    };
  };

  return <div style={getSpriteStyle()} className="enemy-sprite"></div>;
};

export default Enemy;
