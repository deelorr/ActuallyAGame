import { useContext } from 'react'; // Import useContext hook from React
import GameContext from '../contexts/GameContext'; // Import GameContext to access the global game state
import './Enemy.css'; // Import CSS for styling the Enemy component

const Enemy = () => {
  // Extract enemy-related state from the GameContext
  const { enemyHealth, enemyMaxHealth, enemyPosition, enemyDirection } = useContext(GameContext);

  // Function to calculate and return the enemy's style based on its position and direction
  const getEnemyStyle = () => {
    // Flip the enemy's sprite horizontally if it's facing left
    const flip = enemyDirection === 'left' ? 'scaleX(-1)' : 'scaleX(1)';
    
    // Return the style object for positioning and transforming the enemy sprite
    return {
      left: `${enemyPosition.x}px`, // Set the left position based on the enemy's x-coordinate
      top: `${enemyPosition.y}px`, // Set the top position based on the enemy's y-coordinate
      transform: flip, // Apply the flip transformation if needed
      position: 'absolute', // Position the enemy absolutely within the game world
    };
  };

  // Render the enemy element with a health bar that reflects the current health
  return (
    <div className="enemy" style={getEnemyStyle()}>
      {/* Render the health bar inside the enemy element */}
      <div 
        className="enemy-health-bar" 
        style={{ width: `${(enemyHealth / enemyMaxHealth) * 100}%` }} // Set the width based on the enemy's current health
      />
    </div>
  );
};

export default Enemy;
