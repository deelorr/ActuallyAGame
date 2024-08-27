import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import PropTypes from 'prop-types';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;

const EnemySprite = ({ direction }) => {
  const { enemyAttackFrame, enemyIdleFrame, enemyMoveFrame, enemyIsAttacking, enemyIsMoving } = useContext(GameContext);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;

    if (enemyIsAttacking) {
      spriteStrip = `/src/assets/enemy-attack.png`;
      currentFrame = enemyAttackFrame;
    } else if (enemyIsMoving) {
      spriteStrip = `/src/assets/enemy-walk.png`;
      currentFrame = enemyMoveFrame;
    } else {
      spriteStrip = `/src/assets/enemy-idle.png`;
      currentFrame = enemyIdleFrame;
    }

    const flip = direction === 'left'
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)`
      : 'scaleX(1)';

    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      marginLeft: `${(35 - SPRITE_WIDTH) / 2}px`,
      marginTop: `${(32 - SPRITE_HEIGHT) / 2}px`,
    };
  };

  return <div style={getSpriteStyle()} className="enemy-sprite" />;
};

EnemySprite.propTypes = {
  direction: PropTypes.string.isRequired,
};

export default EnemySprite;
