import PropTypes from 'prop-types';

// The CharacterWrapper component handles the positioning of the character in the game world.
const CharacterWrapper = ({ position, children }) => {
  const centeredX = position.x - 24;
  const centeredY = position.y - 7;

  return (
    <div
      style={{
        position: 'absolute', 
        top: `${centeredY}px`, 
        left: `${centeredX}px`,
        transition: 'top 0.2s ease, left 0.2s ease',
        border: '1px solid red', 
      }}
    >
      {children}
    </div>
  );
};

// Define prop types for the CharacterWrapper component to ensure correct usage
CharacterWrapper.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired, 
    y: PropTypes.number.isRequired, 
  }).isRequired,
  children: PropTypes.node.isRequired, 
};

export default CharacterWrapper;
