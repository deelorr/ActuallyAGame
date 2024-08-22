import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import CharacterWrapper from './CharacterWrapper';
import CharacterSprite from './CharacterSprite';
import useCharacterAnimation from './useCharacterAnimation';
import useCharacterMovement from './useCharacterMovement';

const Character = () => {

  const { position, playerStateMachine } = useContext(GameContext);
  
  useCharacterMovement(position, playerStateMachine); // Handles all movement logic

  useCharacterAnimation(playerStateMachine); // Handles all animation logic

  return (
    <CharacterWrapper position={position}>
      <CharacterSprite />
    </CharacterWrapper>
  );
};

export default Character;