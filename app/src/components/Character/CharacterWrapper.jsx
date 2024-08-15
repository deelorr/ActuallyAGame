
import PropTypes from 'prop-types';

// Handles the positioning of the character in the game world.

const CharacterWrapper = ({ position, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      {children}
    </div>
  );
};

CharacterWrapper.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
    };

export default CharacterWrapper;
