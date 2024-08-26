import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';

// Constants defining the number of frames and duration for each animation type
const ATTACK_FRAME_COUNT = 10;
const ATTACK_FRAME_DURATION = 500; // in milliseconds
const IDLE_FRAME_COUNT = 9;
const IDLE_FRAME_DURATION = 70; // in milliseconds
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 20; // in milliseconds

// Custom hook to manage character animations based on the player's state
const useCharacterAnimation = () => {

  // Extract necessary state and setters from GameContext
  const { 
    setAttackFrame,    // Function to update the attack frame
    setIdleFrame,      // Function to update the idle frame
    setMoveFrame,      // Function to update the move frame
    playerStateMachine, // The state machine managing the character's state (not used in this code snippet)
    playerState,       // The current state of the player (attacking, moving, idle)
  } = useContext(GameContext);

  // Refs to store interval IDs, allowing us to clear them when needed
  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Function to handle the attack animation
  const handleAttack = () => {
    console.log("Starting attack animation");
    clearInterval(attackIntervalRef.current); // Clear any existing attack interval
    attackIntervalRef.current = setInterval(() => {
      setAttackFrame((prev) => (prev + 1) % ATTACK_FRAME_COUNT); // Update attack frame
    }, ATTACK_FRAME_DURATION);
  };

  // Function to handle the idle animation
  const handleIdle = () => {
    console.log("Starting idle animation");
    clearInterval(idleIntervalRef.current); // Clear any existing idle interval
    idleIntervalRef.current = setInterval(() => {
      setIdleFrame((prev) => (prev + 1) % IDLE_FRAME_COUNT); // Update idle frame
    }, IDLE_FRAME_DURATION);
  };

  // Function to handle the move animation
  const handleMove = () => {
    console.log("Starting move animation");
    clearInterval(moveIntervalRef.current); // Clear any existing move interval
    moveIntervalRef.current = setInterval(() => {
      setMoveFrame((prev) => (prev + 1) % MOVE_FRAME_COUNT); // Update move frame
    }, MOVE_FRAME_DURATION);
  };

  // useEffect to monitor changes in the player's state and trigger the appropriate animation
  useEffect(() => {
    // Clear any existing intervals before starting a new one
    clearInterval(attackIntervalRef.current);
    clearInterval(idleIntervalRef.current);
    clearInterval(moveIntervalRef.current);
  
    // Determine which animation to start based on the player's state
    if (playerStateMachine.getState() === 'attacking') {
      handleAttack();
    } else if (playerStateMachine.getState() === 'moving') {
      handleMove();
    } else if (playerStateMachine.getState() === 'idle') {
      handleIdle();
    }
  
    // Cleanup function to clear intervals when the component unmounts or when the state changes
    return () => {
      clearInterval(attackIntervalRef.current);
      clearInterval(idleIntervalRef.current);
      clearInterval(moveIntervalRef.current);
    };
  }, [playerStateMachine.getState()]); // Monitor the state from the state machine
};

export default useCharacterAnimation;