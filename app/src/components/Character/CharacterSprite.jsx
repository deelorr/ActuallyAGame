import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;

const CharacterSprite = () => {
  const { 
    direction, 
    attackFrame, 
    idleFrame, 
    moveFrame, 
    playerStateMachine 
  } = useContext(GameContext);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame;

    if (playerStateMachine.getState() === 'attacking') {
      spriteStrip = `/src/assets/character-attack.png`;
      currentFrame = attackFrame;
    } else if (playerStateMachine.getState() === 'moving') {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = moveFrame;
    } else{
      spriteStrip = `/src/assets/character-idle.png`;
      currentFrame = idleFrame;
    }

    const flip = direction === 'left' 
      ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` 
      : 'scaleX(1)';

    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${Math.floor(currentFrame) * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      imageRendering: 'pixelated',
      border: '1px solid blue', // Add a blue border around the character sprite
    };
  };

  return <div style={getSpriteStyle()} className='player-sprite' />;
};

export default CharacterSprite;
