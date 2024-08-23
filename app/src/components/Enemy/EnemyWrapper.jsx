import PropTypes from 'prop-types';

// The EnemyWrapper component handles the positioning of the enemy in the game world.
const EnemyWrapper = ({ position, children }) => {

  // Calculate the centered position of the enemy sprite within its container
  const centeredX = position.x - 21; // Adjust the X position to center the sprite horizontally
  const centeredY = position.y - 7;  // Adjust the Y position to center the sprite vertically

  return (
    <div
      style={{
        position: 'absolute',  // Position the enemy absolutely within the parent container
        top: `${centeredY}px`,  // Set the top position based on the calculated centered Y value
        left: `${centeredX}px`, // Set the left position based on the calculated centered X value
        transition: 'top 0.2s ease, left 0.2s ease', // Smooth transition for movement to avoid abrupt changes
        border: '1px solid red', // Add a red border around the enemy wrapper (useful for debugging)
      }}
    >
      {children} {/* Render any child components inside the wrapper, typically the EnemySprite */}
    </div>
  );
};

// Define prop types for the EnemyWrapper component to ensure correct usage
EnemyWrapper.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired, // x-coordinate of the enemy's position (required and must be a number)
    y: PropTypes.number.isRequired, // y-coordinate of the enemy's position (required and must be a number)
  }).isRequired,
  children: PropTypes.node.isRequired, // The children to be rendered inside the wrapper (required and must be a valid React node)
};

export default EnemyWrapper; // Export the EnemyWrapper component as the default export
