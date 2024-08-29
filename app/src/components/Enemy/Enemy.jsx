import EnemyWrapper from './EnemyWrapper';
import EnemySprite from './EnemySprite';
// import useEnemyAnimation from './useEnemyAnimation';
// import useEnemyMovement from './useEnemyMovement';

// The main Enemy component which manages the enemy character
const Enemy = () => {
  // Manages all movement-related logic
  // useEnemyMovement();
  // Manages all animation-related logic
  // useEnemyAnimation();

  return (
    <EnemyWrapper>{/* EnemyWrapper component is responsible for positioning the enemy on the map */}
      <EnemySprite />{/* EnemySprite component renders the enemy's visual representation */}
    </EnemyWrapper>
  );
};

export default Enemy; // Exports the Enemy component as the default export
