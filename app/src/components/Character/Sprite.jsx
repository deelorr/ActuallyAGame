
import PropTypes from 'prop-types';

// Manages the rendering of the character's sprite, handling animation and flipping.

const Sprite = ({ step, direction, moving, SPRITE_WIDTH, SPRITE_HEIGHT, TILE_SIZE }) => {
  const spriteStrip = moving
    ? `/src/assets/character-walk.png`
    : `/src/assets/character-idle.png`;

  // Adjusting for flip by shifting position
  const flip = direction === 'left' ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` : 'scaleX(1)';

  const spriteStyle = {
    backgroundImage: `url(${spriteStrip})`,
    backgroundPosition: `-${step * SPRITE_WIDTH}px 0px`,
    width: `${SPRITE_WIDTH}px`,
    height: `${SPRITE_HEIGHT}px`,
    transform: flip,
    transformOrigin: 'top left',
    marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`, // Center the character horizontally on the tile
    marginTop: `${(TILE_SIZE - SPRITE_HEIGHT) / 2}px`, // Center the character vertically on the tile
    imageRendering: 'pixelated', // Ensures crisp rendering of pixel art
  };

  return <div style={spriteStyle} />;
};

Sprite.propTypes = {
    step: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    moving: PropTypes.bool.isRequired,
    SPRITE_WIDTH: PropTypes.number.isRequired,
    SPRITE_HEIGHT: PropTypes.number.isRequired,
    TILE_SIZE: PropTypes.number.isRequired,
    };

export default Sprite;
