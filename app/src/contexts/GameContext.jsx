import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('down');
  const [moving, setMoving] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackFrame, setAttackFrame] = useState(0);

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
