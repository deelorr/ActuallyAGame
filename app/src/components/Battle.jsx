import { useContext, useEffect } from 'react';
import GameContext from '../contexts/GameContext';

const Battle = () => {
  const {
    health,
    setHealth,
    attackPower,
    enemyHealth,
    setEnemyHealth,
    enemyAttackPower,
    isAttacking,
    setIsAttacking,
    enemyIsAttacking,
    setEnemyIsAttacking,
  } = useContext(GameContext);

  const playerAttack = () => {
    if (!isAttacking && enemyHealth > 0) {
      setIsAttacking(true);
      setEnemyHealth((prev) => Math.max(prev - attackPower, 0));

      setTimeout(() => {
        setIsAttacking(false);
        if (enemyHealth > 0) {
          enemyAttack(); // Trigger enemy attack after player's attack
        }
      }, 500);
    }
  };

  const enemyAttack = () => {
    if (!enemyIsAttacking && health > 0) {
      setEnemyIsAttacking(true);
      setHealth((prev) => Math.max(prev - enemyAttackPower, 0));

      setTimeout(() => setEnemyIsAttacking(false), 500);
    }
  };

  useEffect(() => {
    if (enemyHealth <= 0 || health <= 0) {
      setIsAttacking(false);
      setEnemyIsAttacking(false);
    }
  }, [enemyHealth, health]);

  return (
    <button onClick={playerAttack}>
      Attack Enemy
    </button>
  );
};

export default Battle;
