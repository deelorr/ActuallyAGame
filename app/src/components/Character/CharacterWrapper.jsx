import PropTypes from 'prop-types';

// The CharacterWrapper component handles the positioning of the character in the game world.
const CharacterWrapper = ({ position, children }) => {

  const centeredX = position.x - 24;
  const centeredY = position.y - 7;

  return (
    <div
      style={{
        position: 'absolute', 
        top: `${centeredY}px`, // Adjust the top position to center the sprite
        left: `${centeredX}px`, // Adjust the left position to center the sprite
        transition: 'top 0.2s ease, left 0.2s ease',
        border: '1px solid red', // Add a red border around the character wrapper
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
