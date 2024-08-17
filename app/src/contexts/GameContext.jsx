import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  // Player States
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('down');
  const [moving, setMoving] = useState(false);
  const [idle, setIdle] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackFrame, setAttackFrame] = useState(0);
  const [idleFrame, setIdleFrame] = useState(0);
  const [health, setHealth] = useState(100);
  const maxHealth = 100;
  const [stamina, setStamina] = useState(50);
  const maxStamina = 50;
  const [attackPower, setAttackPower] = useState(10);
  const [defense, setDefense] = useState(5);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);

  // Enemy States
  const [enemyHealth, setEnemyHealth] = useState(50);
  const [enemyMaxHealth, setEnemyMaxHealth] = useState(50);
  const [enemyPosition, setEnemyPosition] = useState({ x: 100, y: 100 });
  const [enemyAttackPower, setEnemyAttackPower] = useState(8);
  const [enemyDirection, setEnemyDirection] = useState('left');
  const [enemyIsAttacking, setEnemyIsAttacking] = useState(false);

  const value = {
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
    enemyHealth,
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
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GameProvider };
export default GameContext;
