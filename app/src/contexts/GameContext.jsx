import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import mapLayout from "../components/GameMaps/mapLayout";
import overlayLayout from "../components/GameMaps/overlayLayout";

// Create a context for the game state
const GameContext = createContext();

const GameProvider = ({ children }) => {
  
// Player States
  // Player Position States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState("down");
  // Player Animation States
  const [isMoving, setIsMoving] = useState(false);
  const [moveFrame, setMoveFrame] = useState(0);
  const [isAttacking, setIsAttacking ] = useState(false);
  const [attackFrame, setAttackFrame] = useState(0);
  const [isIdle, setIsIdle] = useState(true);
  const [idleFrame, setIdleFrame] = useState(0);
  // Player Stats States
  const [health, setHealth] = useState(100);
  const maxHealth = 100;
  const [stamina, setStamina] = useState(50);
  const maxStamina = 50;
  const [attackPower, setAttackPower] = useState(10);
  const [defense, setDefense] = useState(5);
  const [experience, setExperience] = useState(0); // Experience points for player level only
  const [level, setLevel] = useState(1);
  
  // Player Attack States
  const [isPlayerAttacked, setIsPlayerAttacked] = useState(false);

// Enemy States
  // Enemy Position States
  const [enemyPosition, setEnemyPosition] = useState({ x: 128, y: 96 });
  const [enemyDirection, setEnemyDirection] = useState("left");
  // Enemy Animation States
  const [enemyIsMoving, setEnemyIsMoving] = useState(false);
  const [enemyMoveFrame, setEnemyMoveFrame] = useState(0);
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);
  const [enemyAttackFrame, setEnemyAttackFrame] = useState(0);
  // const [enemyIsIdle, setEnemyIsIdle] = useState(true); // Not used in the current implementation
  const [enemyIdleFrame, setEnemyIdleFrame] = useState(0);
  // Enemy Stats States
  const [enemyHealth, setEnemyHealth] = useState(80);
  const enemyMaxHealth = 80;
  // const [enemyStamina, setEnemyStamina] = useState(50); // Not used in the current implementation
  // const enemyMaxStamina = 50; // Not used in the current implementation
  const [enemyAttackPower, setEnemyAttackPower] = useState(8);
  // const [enemyDefense, setEnemyDefense] = useState(3); // Not used in the current implementation
  // const [enemyLevel, setEnemyLevel] = useState(1); // Not used in the current implementation

  // Enemy Attack States
  // const [isEnemyAttacked, setIsEnemyAttacked] = useState(false); // Not used in the current implementation
  
  
  // Tile States
  const [tileType, setTileType] = useState("grass-d");
  const [hoveredTile, setHoveredTile] = useState(null);
  const [validMoves, setValidMoves] = useState({});
  
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

  // Update the valid moves based on the player's position
  const updateValidMoves = () => {
    const potentialMoves = {
      up: { x: position.x, y: position.y - 32 },
      down: { x: position.x, y: position.y + 32 },
      left: { x: position.x - 32, y: position.y },
      right: { x: position.x + 32, y: position.y },
    };

    const valid = {};
    Object.keys(potentialMoves).forEach((dir) => {
      const { x, y } = potentialMoves[dir];
      if (mapLayout[y / 32] && mapLayout[y / 32][x / 32]) {
        valid[dir] = potentialMoves[dir];
      }
    });
    setValidMoves(valid);
  };

    useEffect(() => {
      updateValidMoves();
    }, [position]);


  // Combine all state values and setters into a single object to pass through the context
  const value = {

    // Player States

    // Player Position States and Setters
    position,
    setPosition,
    direction,
    setDirection,

    // Player Animation States and Setters
    isMoving,
    setIsMoving,
    moveFrame,
    setMoveFrame,
    isAttacking,
    setIsAttacking,
    attackFrame,
    setAttackFrame,
    isIdle,
    setIsIdle,
    idleFrame,
    setIdleFrame,

    isPlayerAttacked,
    setIsPlayerAttacked,
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

    // Enemy States
    setEnemyHealth,
    enemyMaxHealth,
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

    // Tile States
    tileType,
    setTileType,
    updateTileType,
    mapLayout,
    overlayLayout,
    hoveredTile,
    setHoveredTile,
    validMoves,
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
