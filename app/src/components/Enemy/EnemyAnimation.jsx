import { useContext, useEffect, useRef } from 'react';
import GameContext from '../../contexts/GameContext';
import PropTypes from 'prop-types';

// Constants defining the number of frames and duration for each animation type
const ATTACK_FRAME_COUNT = 7;
const ATTACK_DURATION = 700; // Total duration for the attack animation in milliseconds
const IDLE_FRAME_COUNT = 6;
const IDLE_FRAME_DURATION = 120; // Duration of each idle frame in milliseconds
const MOVE_FRAME_COUNT = 8;
const MOVE_FRAME_DURATION = 80; // Duration of each move frame in milliseconds

// EnemyAnimation component handles the enemy's animation logic based on its state
const EnemyAnimation = ({ stateMachine }) => {

  // Extract functions from GameContext to update animation frames
  const { 
    enemyAttackFrame,       // Current frame of the enemy's attack animation
    setEnemyAttackFrame,    // Function to update the attack frame
    setEnemyIdleFrame,      // Function to update the idle frame
    setEnemyMoveFrame       // Function to update the move frame
  } = useContext(GameContext);

  // Refs to store interval IDs, allowing for animation frame updates and cleanup
  const attackIntervalRef = useRef(null);
  const idleIntervalRef = useRef(null);
  const moveIntervalRef = useRef(null);

  // Function to handle the attack animation
  const handleAttack = () => {
    setEnemyAttackFrame(0); // Reset attack frame to the start
    clearInterval(attackIntervalRef.current); // Clear any existing attack interval
    attackIntervalRef.current = setInterval(() => {
      setEnemyAttackFrame(prev => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackIntervalRef.current); // Stop animation when last frame is reached
          setEnemyAttackFrame(0); // Reset frame to start after animation ends
          stateMachine.transition('STOP_ATTACK'); // Transition to stop attack state
          return prev;
        }
        return prev + 1; // Move to the next frame
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT);
  };

  // Function to handle the idle animation
  const handleIdle = () => {
    clearInterval(idleIntervalRef.current); // Clear any existing idle interval
    idleIntervalRef.current = setInterval(() => {
      setEnemyIdleFrame(prev => (prev + 1) % IDLE_FRAME_COUNT); // Cycle through idle frames
    }, IDLE_FRAME_DURATION);
  };

  // Function to handle the move animation
  const handleMove = () => {
    clearInterval(moveIntervalRef.current); // Clear any existing move interval
    moveIntervalRef.current = setInterval(() => {
      setEnemyMoveFrame(prev => (prev + 1) % MOVE_FRAME_COUNT); // Cycle through move frames
    }, MOVE_FRAME_DURATION);
  };

  // useEffect to manage animation based on the enemy's current state
  useEffect(() => {
    const currentState = stateMachine.getState(); // Get the current state of the enemy

    // Trigger the appropriate animation based on the state
    if (currentState === 'idle') {
      handleIdle();
    } else if (currentState === 'attacking') {
      handleAttack();
    } else if (currentState === 'moving') {
      handleMove();
    }

    // Cleanup intervals when the component unmounts or state changes
    return () => {
      clearInterval(attackIntervalRef.current);
      clearInterval(idleIntervalRef.current);
      clearInterval(moveIntervalRef.current);
    };
  }, [stateMachine.getState()]); // Dependency array ensures this effect runs when the enemy's state changes

  return null; // This component does not render any UI
};

// Define prop types for the EnemyAnimation component to ensure correct usage
EnemyAnimation.propTypes = {
  stateMachine: PropTypes.object.isRequired, // stateMachine must be an object and is required
};

export default EnemyAnimation; // Export the EnemyAnimation component as the default export
