import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext';
import { useContext } from 'react';

// The EnemyWrapper component handles the positioning of the enemy in the game world.
const EnemyWrapper = ({ children }) => {
  const { enemyPosition } = useContext(GameContext); // Extract the enemy's position from the GameContext
  
  // Adjust the enemy's position to ensure it is centered correctly on the screen
  const centeredX = enemyPosition.x - 21; // Adjust the X position to center the sprite horizontally
  const centeredY = enemyPosition.y - 7;  // Adjust the Y position to center the sprite vertically

  return (
    <div
      style={{
        position: 'absolute', // Position the enemy absolutely within the parent container
        top: `${centeredY}px`, // Position the enemy based on the calculated Y value
        left: `${centeredX}px`, // Position the enemy based on the calculated X value
        transition: 'top 0.2s ease, left 0.2s ease', // Smooth transition for movement
        border: '1px solid red', // Red border around the enemy wrapper (for debugging purposes)
      }}
    >
      {children} {/* Render any child components inside the wrapper, such as the EnemySprite */}
    </div>
  );
};

// Define prop types for the EnemyWrapper component to ensure correct usage
EnemyWrapper.propTypes = {
  children: PropTypes.node.isRequired, // Children must be a valid React node
};

export default EnemyWrapper; // Export the EnemyWrapper component as the default export
