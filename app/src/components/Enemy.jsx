import { useContext } from 'react';
import GameContext from '../contexts/GameContext';
import './Enemy.css';

const Enemy = () => {
  const { enemyHealth, enemyMaxHealth, enemyPosition, enemyDirection } = useContext(GameContext);

  const getEnemyStyle = () => {
    const flip = enemyDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    return {
      left: `${enemyPosition.x}px`,
      top: `${enemyPosition.y}px`,
      transform: flip,
      position: 'absolute',
    };
  };

  return (
    <div className="enemy" style={getEnemyStyle()}>
      <div className="enemy-health-bar" style={{ width: `${(enemyHealth / enemyMaxHealth) * 100}%` }} />
    </div>
  );
};

export default Enemy;
