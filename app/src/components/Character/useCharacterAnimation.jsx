import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';

const ATTACK_FRAME_COUNT = 10;
const ATTACK_FRAME_DURATION = 500;
const IDLE_FRAME_COUNT = 9;
const IDLE_FRAME_DURATION = 70;
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 20;

const useCharacterAnimation = () => {

  const { 
    setAttackFrame, 
    setIdleFrame, 
    setMoveFrame,
    playerStateMachine,
    playerState,
  } = useContext(GameContext);

  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  const handleAttack = () => {
    console.log("Starting attack animation");
    clearInterval(attackIntervalRef.current);
    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => (prev + 1) % ATTACK_FRAME_COUNT);
    }, ATTACK_FRAME_DURATION);
  };

  const handleIdle = () => {
    console.log("Starting idle animation");
    clearInterval(idleIntervalRef.current);
    idleIntervalRef.current = setInterval(() => {
      setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT);
    }, IDLE_FRAME_DURATION);
  };

  const handleMove = () => {
    console.log("Starting move animation");
    clearInterval(moveIntervalRef.current);
    moveIntervalRef.current = setInterval(() => {
      setMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT);
    }, MOVE_FRAME_DURATION);
  };

  useEffect(() => {
    if (playerState === 'attacking') {
      handleAttack();
      // Start the attack animation
    } else if (playerState === 'moving') {
      handleMove();
      // Start the moving animation
    } else {
      handleIdle();
      // Start the idle animation
    }
  }, [playerState]); // React to changes in the player's state
}


export default useCharacterAnimation;
