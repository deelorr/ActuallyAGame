import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';

// Define the width and height of each sprite frame in pixels
const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;

// The CharacterSprite component is responsible for rendering the character's sprite on the screen
const CharacterSprite = () => {
  // Extract relevant state values from GameContext using the useContext hook
  const { 
    direction,      // The direction the character is facing (left or right)
    attackFrame,    // The current frame of the attack animation
    idleFrame,      // The current frame of the idle animation
    moveFrame,      // The current frame of the moving animation
    playerStateMachine // The state machine managing the character's state (idle, moving, attacking)
  } = useContext(GameContext);

  // A function to determine the appropriate style for the sprite based on the character's state
  const getSpriteStyle = () => {
    let spriteStrip;  // The sprite sheet to be used based on the current state
    let currentFrame; // The current frame of animation based on the current state

    // Determine the sprite strip and current frame based on the character's state
    if (playerStateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/character-attack.png`;  // Use attack sprite sheet
      currentFrame = attackFrame;                        // Use attack animation frame
    } else if (playerStateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/character-walk.png`;    // Use walking sprite sheet
      currentFrame = moveFrame;                          // Use walking animation frame
    } else {
      spriteStrip = `/src/assets/character-idle.png`;    // Use idle sprite sheet
      currentFrame = idleFrame;                          // Use idle animation frame
    }

    // Determine whether to flip the sprite horizontally based on the direction
    const flip = direction === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` // Flip the sprite if facing left
      : 'scaleX(1)';                               // No flip needed if facing right

    // Return the style object to be applied to the sprite div
    return {
      backgroundImage: `url(${spriteStrip})`,            // Set the background image to the correct sprite sheet
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`, // Position the sprite to show the correct frame
      width: `${SPRITE_WIDTH}px`,                        // Set the width of the sprite
      height: `${SPRITE_HEIGHT}px`,                      // Set the height of the sprite
      transform: flip,                                   // Apply the flip transformation if necessary
      transformOrigin: 'top left',                       // Set the origin for the transform
      imageRendering: 'pixelated',                       // Ensure the sprite is rendered with pixelated edges
      border: '1px solid blue',                          // Add a blue border around the character sprite (for debugging purposes)
    };
  };

  // Render the sprite with the calculated styles
  return <div style={getSpriteStyle()} className='player-sprite' />;
};

export default CharacterSprite; // Export the CharacterSprite component as the default export
