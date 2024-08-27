import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import mapLayout from "../components/GameMaps/mapLayout";
import overlayLayout from "../components/GameMaps/overlayLayout";

// Create a context for the game state
const GameContext = createContext();

const GameProvider = ({ children }) => {
  // Player States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("down");
  const [isMoving, setIsMoving] = useState(false);
  const [isAttacking, setIsAttacking ] = useState(false);
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
  const [isPlayerAttacked, setIsPlayerAttacked] = useState(false);

  // Enemy States
  const [enemyHealth, setEnemyHealth] = useState(50);
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(50);
  const [enemyPosition, setEnemyPosition] = useState({ x: 128, y: 96 });
  const [enemyAttackPower, setEnemyAttackPower] = useState(8);
  const [enemyDirection, setEnemyDirection] = useState("left");
  const [enemyIsMoving, setEnemyIsMoving] = useState(false);
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);
  const [enemyMoveFrame, setEnemyMoveFrame] = useState(0);
  const [enemyAttackFrame, setEnemyAttackFrame] = useState(0);
  const [enemyIdleFrame, setEnemyIdleFrame] = useState(0);

  // Tile States
  const [tileType, setTileType] = useState("grass-d");

  // Function to update the tile type based on the character's position
  const updateTileType = (x, y) => {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);  
    const type = mapLayout[tileY]?.[tileX] || 'unknown';
    setTileType(type);
  };

  useEffect(() => {
    updateTileType(position.x, position.y);
  }, [position]);

  // Combine all state values and setters into a single object to pass through the context
  const value = {
    position,
    setPosition,
    direction,
    setDirection,
    isMoving,
    setIsMoving,
    isAttacking,
    setIsAttacking,
    attackFrame,
    setAttackFrame,
    isPlayerAttacked,
    setIsPlayerAttacked,
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
    enemyMoveFrame,
    setEnemyMoveFrame,
    tileType,
    setTileType,
    updateTileType,
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
export default GameContext;
