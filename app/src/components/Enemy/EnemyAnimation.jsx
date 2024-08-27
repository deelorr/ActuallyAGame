import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';
import PropTypes from 'prop-types';

const ATTACK_FRAME_COUNT = 7;
const ATTACK_DURATION = 700;
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 120;
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 80;

const EnemyAnimation = () => {
  const { 
    enemyAttackFrame,
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
    setEnemyAttackFrame(0);
    clearInterval(attackIntervalRef.current);
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame(prev => (prev + 1) % ATTACK_FRAME_COUNT);
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  const handleIdle = () => {
    clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame(prev => (prev + 1) % IDLE_FRAME_COUNT);
    }, IDLE_FRAME_DURATION);
  };

  const handleMove = () => {
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame(prev => (prev + 1) % MOVE_FRAME_COUNT);
    }, MOVE_FRAME_DURATION);
  };

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

  return null; 
};

EnemyAnimation.propTypes = {};

export default EnemyAnimation;
