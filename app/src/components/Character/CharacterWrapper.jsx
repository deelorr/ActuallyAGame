import PropTypes from 'prop-types';

// The CharacterWrapper component handles the positioning of the character in the game world.

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;

const CharacterWrapper = ({ position, children }) => {

  const centeredX = position.x - (SPRITE_WIDTH - TILE_SIZE) / 2;
  const centeredY = position.y - (SPRITE_HEIGHT - TILE_SIZE) / 2;

  return (
    <div
      style={{
        position: 'absolute', 
        top: `${centeredY}px`, // Adjust the top position to center the sprite
        left: `${centeredX}px`, // Adjust the left position to center the sprite
        transition: 'top 0.2s ease, left 0.2s ease',
      }}
    >
      {children}
    </div>
  );
};

// Define prop types for the CharacterWrapper component to ensure correct usage
CharacterWrapper.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired, // x-coordinate of the character's position (required)
    y: PropTypes.number.isRequired, // y-coordinate of the character's position (required)
  }).isRequired,
  children: PropTypes.node.isRequired, // The children to be rendered inside the wrapper (required)
};

export default CharacterWrapper;
