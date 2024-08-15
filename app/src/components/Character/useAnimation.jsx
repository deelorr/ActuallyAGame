
import { useState, useEffect } from 'react';

// Controls the animation frame based on whether the character is moving or idle.

const MOVE_SPEED = 8; // Adjust this value to slow down movement
const WALK_FRAME_COUNT = 9; // Number of frames in the walking animation
const IDLE_FRAME_COUNT = 8; // Number of frames in the idle animation
const ATTACK_FRAME_COUNT = 6; // Number of frames in the attack animation

const useAnimation = (moving) => {
  const [step, setStep] = useState(0); // Current animation frame

  useEffect(() => {
    const frameCount = moving ? WALK_FRAME_COUNT : IDLE_FRAME_COUNT;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % frameCount);
    }, 1000 / MOVE_SPEED); // Control the movement speed

    return () => clearInterval(interval);
  }, [moving]);

  return step;
};

export default useAnimation;
