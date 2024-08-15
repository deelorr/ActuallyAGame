
import CharacterWrapper from './CharacterWrapper';
import Sprite from './Sprite';
import useCharacterMovement from './useCharacterMovement';
import useAnimation from './useAnimation';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;

// Main character component that combines all the logic and rendering.

const Character = () => {
  const { position, direction, moving } = useCharacterMovement();
  const step = useAnimation(moving);
  
  return (
    <CharacterWrapper position={position}>
      <Sprite
        step={step}
        direction={direction}
        moving={moving}
        SPRITE_WIDTH={SPRITE_WIDTH}
        SPRITE_HEIGHT={SPRITE_HEIGHT}
        TILE_SIZE={TILE_SIZE}
      />
    </CharacterWrapper>
  );
};

export default Character;
