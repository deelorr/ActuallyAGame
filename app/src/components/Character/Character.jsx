import CharacterWrapper from './CharacterWrapper';
import CharacterSprite from './CharacterSprite';
import useCharacterAnimation from './useCharacterAnimation';
import useCharacterMovement from './useCharacterMovement';

// The main Character component which manages the player's character
const Character = () => {

  // manages all movement-related logic
  useCharacterMovement();
  // manages all animation-related logic
  useCharacterAnimation();

  return (
    <CharacterWrapper>{/* CharacterWrapper component is responsible for positioning the character on the map */}
      <CharacterSprite />{/*CharacterSprite component renders the character's visual representation */}
    </CharacterWrapper>
  );
};

export default Character; // Exports the Character component as the default export
