import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createPlayerStateMachine, createEnemyStateMachine } from "./stateMachines";
import mapLayout from "../components/GameMaps/mapLayout";
import overlayLayout from "../components/GameMaps/overlayLayout";

// Create a context for the game state
const GameContext = createContext();

const GameProvider = ({ children }) => {

  // Create state machines for player and enemy
  const playerStateMachine = createPlayerStateMachine();
  const enemyStateMachine = createEnemyStateMachine();

  // Player States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("down");
  const [attackFrame, setAttackFrame] = useState(0);
  const [idleFrame, setIdleFrame] = useState(0);
  const [health, setHealth] = useState(100);
  const maxHealth = 100;
  const [moveFrame, setMoveFrame] = useState(0);
  const [stamina, setStamina] = useState(50);
  const maxStamina = 50;
  const [attackPower, setAttackPower] = useState(10);
  const [defense, setDefense] = useState(5);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

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

  // Tile States
  const [tileType, setTileType] = useState("grass-d");

  // Function to update the tile type based on the character's position
  const updateTileType = (x, y) => {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
  
    // Debugging: Log the computed indices and the resulting tile type
    console.log(`x: ${x}, y: ${y}`);
    console.log(`tileX: ${tileX}, tileY: ${tileY}`);
    console.log(`Tile at [${tileY}][${tileX}]:`, mapLayout[tileY]?.[tileX]);
  
    const type = mapLayout[tileY]?.[tileX] || 'unknown';
    setTileType(type);
  };

  useEffect(() => {
    console.log('Position:', position);
    updateTileType(position.x, position.y);
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
    mapLayout,
    overlayLayout,
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
