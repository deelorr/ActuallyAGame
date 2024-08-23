import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import CharacterWrapper from './CharacterWrapper';
import CharacterSprite from './CharacterSprite';
import useCharacterAnimation from './useCharacterAnimation';
import useCharacterMovement from './useCharacterMovement';

// The main Character component which manages the player's character

const Character = () => {

  // Extracts position and playerStateMachine from the GameContext using the useContext hook
  const { position, playerStateMachine } = useContext(GameContext);
  
  // Custom hook that manages all movement-related logic based on the character's position and state
  useCharacterMovement(position, playerStateMachine); 

  // Custom hook that manages all animation-related logic based on the character's state
  useCharacterAnimation(playerStateMachine); 

  return (
    // CharacterWrapper component is responsible for positioning the character on the map
    <CharacterWrapper position={position}>
      {/* CharacterSprite component renders the character's visual representation */}
      <CharacterSprite />
    </CharacterWrapper>
  );
};

export default Character; // Exports the Character component as the default export
