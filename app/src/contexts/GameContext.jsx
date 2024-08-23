import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import createUnifiedStateMachine from "../components/createUnifiedStateMachine";

// Create a context for the game state
const GameContext = createContext();

const GameProvider = ({ children }) => {
  
  // Example tile layout for determining tile types based on position
  const tiles = [
    ['grass-d', 'grass-l', 'dirt-l'],
    ['water', 'sand', 'dirt-d'],
  ];

  // Determine the tile type based on the character's x and y position
  const determineTileType = (x, y) => {
    const tileX = Math.floor(x / 32); // Calculate the tile's X index
    const tileY = Math.floor(y / 32); // Calculate the tile's Y index
    return tiles[tileY]?.[tileX] || 'unknown'; // Return the tile type or 'unknown' if out of bounds
  };

  const initialState = 'idle'; // Initial state for state machines

  const transitions = {
    idle: { MOVE: 'moving', ATTACK: 'attacking' },
    moving: { STOP: 'idle', ATTACK: 'attacking' },
    attacking: { ATTACK: 'attacking', STOP_ATTACK: 'idle' },
  };

  const actions = {
    attacking: {
      onEnter: () => console.log('Entering attacking state'), // Action on entering attacking state
      onExit: () => console.log('Exiting attacking state'), // Action on exiting attacking state
    },
    idle: {
      onEnter: () => console.log('Entering idle state'), // Action on entering idle state
      onExit: () => console.log('Exiting idle state'), // Action on exiting idle state
    },
    moving: {
      onEnter: () => console.log('Entering moving state'), // Action on entering moving state
      onExit: () => console.log('Exiting moving state'), // Action on exiting moving state
    },
  };

  // Create a unified state machine for both player and enemy
  const playerStateMachine = createUnifiedStateMachine(initialState, transitions, actions, 'player');
  const enemyStateMachine = createUnifiedStateMachine(initialState, transitions, actions, 'enemy');

  // Player States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("down");
  const [attackFrame, setAttackFrame] = useState(0);
  const [idleFrame, setIdleFrame] = useState(0);
  const [health, setHealth] = useState(100);
  const [moveFrame, setMoveFrame] = useState(0);
  const [stamina, setStamina] = useState(50);
  const [attackPower, setAttackPower] = useState(10);
  const [defense, setDefense] = useState(5);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [playerState, setPlayerState] = useState(playerStateMachine.getState());

  const maxHealth = 100;
  const maxStamina = 50;

  // Enemy States
  const [enemyHealth, setEnemyHealth] = useState(50);
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(50);
  const [enemyPosition, setEnemyPosition] = useState({ x: 128, y: 96 });
  const [enemyAttackPower, setEnemyAttackPower] = useState(8);
  const [enemyDirection, setEnemyDirection] = useState("left");
  const [enemyIsMoving, setEnemyIsMoving] = useState(false);
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);
  const [enemyAttackFrame, setEnemyAttackFrame] = useState(0);
  const [enemyIdleFrame, setEnemyIdleFrame] = useState(0);
  const [enemyState, setEnemyState] = useState(enemyStateMachine.getState());

  // Track the current tile type the player is on
  const [tileType, setTileType] = useState("grass");

  // Function to update the tile type based on the character's position
  const updateTileType = (type) => {
    setTileType(type);
  };

  useEffect(() => {
    // Determine the current tile type whenever the player's position changes
    const currentTileType = determineTileType(position.x, position.y);
    setTileType(currentTileType);
  }, [position]);

  // Combine all state values and setters into a single object to pass through the context
  const value = {
    position,
    setPosition,
    direction,
    setDirection,
    attackFrame,
    setAttackFrame,
    idleFrame,
    setIdleFrame,
    moveFrame,
    setMoveFrame,
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
    enemyIsMoving,
    setEnemyIsMoving,
    enemyAttackFrame,
    setEnemyAttackFrame,
    enemyIdleFrame,
    setEnemyIdleFrame,
    tileType,
    setTileType,
    updateTileType,
    playerStateMachine, // Pass the current state of the player state machine
    enemyStateMachine, // Pass the current state of the enemy state machine
  };

  return (
    <GameContext.Provider value={value}>
      {children} {/* Render children components with access to the game context */}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is provided and is a React node
};

export { GameProvider };
export default GameContext; // Export GameContext and GameProvider for use in the application
