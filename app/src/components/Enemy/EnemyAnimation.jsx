import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';
import PropTypes from 'prop-types';

const ATTACK_FRAME_COUNT = 7;
const ATTACK_DURATION = 700;
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 120;
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 80;

const EnemyAnimation = ({ stateMachine }) => {

  const { 
    enemyAttackFrame,
    setEnemyAttackFrame, 
    setEnemyIdleFrame, 
    setEnemyMoveFrame 
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    setEnemyAttackFrame(0);
    clearInterval(attackIntervalRef.current);
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame(prev => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current);
          setEnemyAttackFrame(0);
          stateMachine.transition('STOP_ATTACK');
          return prev;
        }
        return prev + 1;
      });
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
    const currentState = stateMachine.getState();

    if (currentState === 'idle') {
      handleIdle();
    } else if (currentState === 'attacking') {
      handleAttack();
    } else if (currentState === 'moving') {
      handleMove();
    }

    return () => {
      clearInterval(attackIntervalRef.current);
      clearInterval(idleIntervalRef.current);
      clearInterval(moveIntervalRef.current);
    };
  }, [stateMachine.getState()]);

  return null; // No need to return any UI
};

EnemyAnimation.propTypes = {
    stateMachine: PropTypes.object.isRequired,
    };

export default EnemyAnimation;
