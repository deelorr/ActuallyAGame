import PropTypes from 'prop-types';

// The CharacterWrapper component handles the positioning of the character in the game world.
const CharacterWrapper = ({ position, children }) => {
  // Adjust the character's position to ensure it is centered correctly on the screen
  const centeredX = position.x - 24; // Center the character horizontally (24 pixels adjustment)
  const centeredY = position.y - 7;  // Center the character vertically (7 pixels adjustment)

  return (
    <div
      style={{
        position: 'absolute', // Position the character absolutely within the parent container
        top: `${centeredY}px`, // Position the character based on the calculated Y value
        left: `${centeredX}px`, // Position the character based on the calculated X value
        transition: 'top 0.2s ease, left 0.2s ease', // Smooth transition for movement
        border: '1px solid red', // Red border around the character wrapper (for debugging purposes)
      }}
    >
      {children} {/* Render any child components inside the wrapper, such as the CharacterSprite */}
    </div>
  );
};

// Define prop types for the CharacterWrapper component to ensure correct usage
CharacterWrapper.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired, // x coordinate is a required number
    y: PropTypes.number.isRequired, // y coordinate is a required number
  }).isRequired,
  children: PropTypes.node.isRequired, // children is required and must be a valid React node
};

export default CharacterWrapper; // Export the CharacterWrapper component as the default export
