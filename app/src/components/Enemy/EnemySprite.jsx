import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import PropTypes from 'prop-types';

// Constants defining the original dimensions of the enemy sprite
const SPRITE_WIDTH = 96; // Original sprite width
const SPRITE_HEIGHT = 64; // Original sprite height

// EnemySprite component is responsible for rendering the enemy's sprite with the correct animation and direction
const EnemySprite = ({ direction }) => {
  // Extract necessary state values from GameContext
  const { enemyAttackFrame, enemyIdleFrame, enemyMoveFrame, enemyStateMachine } = useContext(GameContext);

  // Function to generate the appropriate CSS styles for the sprite based on the enemy's state and direction
  const getSpriteStyle = () => {
    let spriteStrip;    // Holds the path to the sprite sheet
    let currentFrame;   // Holds the current frame of the animation

    // Determine the correct sprite sheet and frame based on the current state of the enemy
    if (enemyStateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/enemy-attack.png`;
      currentFrame = enemyAttackFrame;
    } else if (enemyStateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/enemy-walk.png`;
      currentFrame = enemyMoveFrame;
    } else {
      spriteStrip = `/src/assets/enemy-idle.png`;
      currentFrame = enemyIdleFrame;
    }

    // Determine if the sprite should be flipped horizontally based on the direction
    const flip = direction === 'left'
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` // Flip the sprite if facing left
      : 'scaleX(1)';                               // No flip if facing right

    // Return the style object to be applied to the sprite div
    return {
      backgroundImage: `url(${spriteStrip})`,        // Set the background image to the correct sprite sheet
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`, // Position the sprite to show the correct frame
      width: `${SPRITE_WIDTH}px`,                    // Set the width of the sprite
      height: `${SPRITE_HEIGHT}px`,                  // Set the height of the sprite
      transform: flip,                               // Apply the flip transformation if necessary
      transformOrigin: 'top left',                   // Set the origin for the transform
      marginLeft: `${(35 - SPRITE_WIDTH) / 2}px`,    // Center the sprite horizontally within its container
      marginTop: `${(32 - SPRITE_HEIGHT) / 2}px`,    // Center the sprite vertically within its container
    };
  };

  // Render the sprite with the calculated styles
  return <div style={getSpriteStyle()} className="enemy-sprite" />;
};

// Define prop types for the EnemySprite component to ensure correct usage
EnemySprite.propTypes = {
  direction: PropTypes.string.isRequired, // The direction must be a string and is required
};

export default EnemySprite; // Export the EnemySprite component as the default export
