import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;

// The EnemySprite component is responsible for rendering the enemy's sprite on the screen
const EnemySprite = () => {
  const { 
    enemyDirection,  // The direction the enemy is facing (left or right)
    enemyAttackFrame, // The current frame of the enemy's attack animation
    enemyIdleFrame,  // The current frame of the enemy's idle animation
    enemyMoveFrame,  // The current frame of the enemy's moving animation
    enemyIsAttacking, // Boolean indicating if the enemy is attacking
    enemyIsMoving, // Boolean indicating if the enemy is moving
  } = useContext(GameContext);

  const getSpriteStyle = () => {
    let spriteStrip;  // The sprite sheet to be used based on the current state
    let currentFrame; // The current frame of animation based on the current state

    if (enemyIsAttacking) {
      spriteStrip = `/src/assets/enemy-attack.png`;  // Use attack sprite sheet
      currentFrame = enemyAttackFrame;               // Use attack animation frame
    } else if (enemyIsMoving) {
      spriteStrip = `/src/assets/enemy-walk.png`;    // Use walking sprite sheet
      currentFrame = enemyMoveFrame;                 // Use walking animation frame
    } else {
      spriteStrip = `/src/assets/enemy-idle.png`;    // Use idle sprite sheet
      currentFrame = enemyIdleFrame;                 // Use idle animation frame
    }

    const flip = enemyDirection === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` // Flip the sprite if facing left
      : 'scaleX(1)';                               // No flip needed if facing right

    return {
      backgroundImage: `url(${spriteStrip})`,        // Set the background image to the correct sprite sheet
      backgroundPosition: `-${Math.floor(currentFrame) * 96}px 0px`, // Position the sprite to show the correct frame
      width: `${SPRITE_WIDTH}px`,                    // Set the width of the sprite
      height: `${SPRITE_HEIGHT}px`,                  // Set the height of the sprite
      transform: flip,                               // Apply the flip transformation if necessary
      transformOrigin: 'top left',                   // Set the origin for the transform
      imageRendering: 'pixelated',                   // Ensure the sprite is rendered with pixelated edges
      border: '1px solid blue',                      // Add a blue border around the enemy sprite (for debugging purposes)
    };
  };

  return <div style={getSpriteStyle()} className='enemy-sprite' />;
};

export default EnemySprite;
