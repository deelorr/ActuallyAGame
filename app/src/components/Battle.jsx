import { useContext, useEffect } from 'react';
import GameContext from '../contexts/GameContext';

// The Battle component handles the logic for a battle between the player and an enemy.
const Battle = () => {
  // Extract state and actions from the GameContext
  const {
    health, // Player's health
    setHealth, // Function to update player's health
    attackPower, // Player's attack power
    enemyHealth, // Enemy's health
    setEnemyHealth, // Function to update enemy's health
    enemyAttackPower, // Enemy's attack power
    isAttacking, // Boolean indicating if the player is currently attacking
    setIsAttacking, // Function to update the player's attacking state
    enemyIsAttacking, // Boolean indicating if the enemy is currently attacking
    setEnemyIsAttacking, // Function to update the enemy's attacking state
  } = useContext(GameContext);

  // Function to handle the player's attack
  const playerAttack = () => {
    // Only allow the attack if the player is not already attacking and the enemy is still alive
    if (!isAttacking && enemyHealth > 0) {
      setIsAttacking(true); // Set player's attacking state to true
      setEnemyHealth((prev) => Math.max(prev - attackPower, 0)); // Reduce enemy's health by player's attack power

      // After a short delay, end the player's attack and trigger the enemy's attack if the enemy is still alive
      setTimeout(() => {
        setIsAttacking(false); // Set player's attacking state to false
        if (enemyHealth > 0) {
          enemyAttack(); // Trigger enemy attack after player's attack
        }
      }, 500); // 500 milliseconds delay for the attack action
    }
  };

  // Function to handle the enemy's attack
  const enemyAttack = () => {
    // Only allow the attack if the enemy is not already attacking and the player is still alive
    if (!enemyIsAttacking && health > 0) {
      setEnemyIsAttacking(true); // Set enemy's attacking state to true
      setHealth((prev) => Math.max(prev - enemyAttackPower, 0)); // Reduce player's health by enemy's attack power

      // After a short delay, end the enemy's attack
      setTimeout(() => setEnemyIsAttacking(false), 500); // 500 milliseconds delay for the attack action
    }
  };

  // Effect to monitor the health of both the player and the enemy
  useEffect(() => {
    // If either the enemy's or player's health drops to 0 or below, stop both attacking states
    if (enemyHealth <= 0 || health <= 0) {
      setIsAttacking(false); // Ensure player's attacking state is set to false
      setEnemyIsAttacking(false); // Ensure enemy's attacking state is set to false
    }
  }, [enemyHealth, health]); // Dependency array to re-run the effect when health changes

  // Render the attack button, which triggers the player's attack when clicked
  return (
    <button onClick={playerAttack}>
      Attack Enemy
    </button>
  );
};

export default Battle;
