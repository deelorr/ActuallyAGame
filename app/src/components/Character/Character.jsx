import { useState, useEffect } from 'react';
import CharacterWrapper from './CharacterWrapper';
import useCharacterMovement from './useCharacterMovement';
import PropTypes from 'prop-types';

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 64;
const TILE_SIZE = 32;
const ATTACK_FRAME_COUNT = 5; // Number of frames in the attack animation
const ATTACK_DURATION = 500; // Duration of the attack animation in milliseconds

const Character = ({ overlayLayout }) => {
  const { position, direction, moving } = useCharacterMovement(overlayLayout);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackFrame, setAttackFrame] = useState(0);

  const handleAttack = () => {
    if (isAttacking) return; // Prevent re-triggering the attack while already attacking

    setIsAttacking(true);
    setAttackFrame(0); // Start at the first attack frame

    const attackInterval = setInterval(() => {
      setAttackFrame((prev) => {
        if (prev === ATTACK_FRAME_COUNT - 1) {
          clearInterval(attackInterval);
          setIsAttacking(false); // End the attack after the last frame
          return prev;
        }
        return prev + 1; // Move to the next frame
      });
    }, ATTACK_DURATION / ATTACK_FRAME_COUNT); // Spread the animation across the duration
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        handleAttack(); // Trigger the attack on space bar press
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },);

  const getSpriteStyle = () => {
    let spriteStrip;
    let currentFrame = attackFrame;

    if (isAttacking) {
      spriteStrip = `/src/assets/character-attack.png`; // Use the attack sprite sheet
    } else if (moving) {
      spriteStrip = `/src/assets/character-walk.png`;
      currentFrame = attackFrame % ATTACK_FRAME_COUNT;
    } else {
      spriteStrip = `/src/assets/character-idle.png`;
      currentFrame = 0; // Default to idle frame
    }

    const flip = direction === 'left' ? `translateX(${SPRITE_WIDTH}px) scaleX(-1)` : 'scaleX(1)';

    return {
      backgroundImage: `url(${spriteStrip})`,
      backgroundPosition: `-${currentFrame * SPRITE_WIDTH}px 0px`,
      width: `${SPRITE_WIDTH}px`,
      height: `${SPRITE_HEIGHT}px`,
      transform: flip,
      transformOrigin: 'top left',
      marginLeft: `${(TILE_SIZE - SPRITE_WIDTH) / 2}px`,
      marginTop: `${(TILE_SIZE - SPRITE_HEIGHT) / 2}px`,
      imageRendering: 'pixelated',
    };
  };

  return (
    <CharacterWrapper position={position} zIndex={position.y / TILE_SIZE + 2}>
      <div style={getSpriteStyle()} />
    </CharacterWrapper>
  );
};

Character.propTypes = {
  overlayLayout: PropTypes.array,
};

export default Character;
