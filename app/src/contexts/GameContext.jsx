import { createContext, useState, useRef } from 'react'; // Import necessary functions from React
import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import StateMachine from '../classes/StateMachine'; // Import the StateMachine class from the 'javascript-state-machine' library

// Create a context for the game state
const GameContext = createContext();

const GameProvider = ({ children }) => {

    // Initialize your state machine here
    const stateMachine = useRef(new StateMachine('idle', {
      idle: { MOVE: 'moving', ATTACK: 'attacking' },
      moving: { STOP: 'idle', ATTACK: 'attacking' },
      attacking: { STOP_ATTACK: 'idle' },
    }, {
      idle: { onEnter: () => console.log('Entering idle state'), onExit: () => console.log('Exiting idle state') },
      moving: { onEnter: () => console.log('Entering moving state'), onExit: () => console.log('Exiting moving state') },
      attacking: { onEnter: () => console.log('Entering attacking state'), onExit: () => console.log('Exiting attacking state') },
    }));

  // Player States
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Player's position on the map
  const [direction, setDirection] = useState('down'); // Player's current facing direction
  const [moving, setMoving] = useState(false); // Whether the player is currently moving
  const [idle, setIdle] = useState(false); // Whether the player is idle
  const [isAttacking, setIsAttacking] = useState(false); // Whether the player is currently attacking
  const [attackFrame, setAttackFrame] = useState(0); // Current frame of the attack animation
  const [idleFrame, setIdleFrame] = useState(0); // Current frame of the idle animation
  const [health, setHealth] = useState(100); // Player's current health
  const maxHealth = 100; // Player's maximum health (constant)
  const [stamina, setStamina] = useState(50); // Player's current stamina
  const maxStamina = 50; // Player's maximum stamina (constant)
  const [attackPower, setAttackPower] = useState(10); // Player's attack power
  const [defense, setDefense] = useState(5); // Player's defense rating
  const [experience, setExperience] = useState(0); // Player's current experience points
  const [level, setLevel] = useState(1); // Player's current level

  // Enemy States
  const [enemyHealth, setEnemyHealth] = useState(50); // Enemy's current health
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(50); // Enemy's maximum health
  const [enemyPosition, setEnemyPosition] = useState({ x: 100, y: 100 }); // Enemy's position on the map
  const [enemyAttackPower, setEnemyAttackPower] = useState(8); // Enemy's attack power
  const [enemyDirection, setEnemyDirection] = useState('left'); // Enemy's current facing direction
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false); // Whether the enemy is currently attacking

  // Combine all state values and setters into a single object to pass through the context
  const value = {

    // Player-related state and setters
    position,
    setPosition,
    direction,
    setDirection,
    moving,
    setMoving,
    isAttacking,
    setIsAttacking,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
    idle,
    setIdle,
    health,
    setHealth,
    maxHealth,
    stamina,
    setStamina,
    maxStamina,
    attackPower,
    setAttackPower,
    defense,
    setDefense,
    experience,
    setExperience,
    level,
    setLevel,

    stateMachine: stateMachine.current, // Pass the current state of the state machine

    // Enemy-related state and setters
    enemyHealth,
    setEnemyHealth,
    enemyMaxHealth,
    setEnemyMaxHealth,
    enemyPosition,
    setEnemyPosition,
    enemyAttackPower,
    setEnemyAttackPower,
    enemyDirection,
    setEnemyDirection,
    enemyIsAttacking,
    setEnemyIsAttacking,
  };

  // Return the context provider with the state values and setters passed down
  return (
    <GameContext.Provider value={value}>
      {children} {/* Render the child components that consume the context */}
    </GameContext.Provider>
  );
};

// Define the expected prop types for the GameProvider component
GameProvider.propTypes = {
  children: PropTypes.node.isRequired, // The child components that the provider will wrap (required)
};

export { GameProvider }; // Export the provider for use in the application
export default GameContext; // Export the context for use in the application
