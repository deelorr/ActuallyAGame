import PropTypes from 'prop-types';

// The CharacterWrapper component handles the positioning of the character in the game world.

const CharacterWrapper = ({ position, children }) => {
  return (
    <div
      style={{
        position: 'absolute', // Position the character absolutely within the parent container
        top: `${position.y}px`, // Set the top position based on the character's y-coordinate
        left: `${position.x}px`, // Set the left position based on the character's x-coordinate
        transition: 'top 0.2s ease, left 0.2s ease', // Apply a smooth transition effect when the character moves
      }}
    >
      {children} {/* Render the character or other child elements within this wrapper */}
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
