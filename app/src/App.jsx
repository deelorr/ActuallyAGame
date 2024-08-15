

import GameMap from './components/GameMap';
import { GameProvider } from './contexts/GameContext';

function App() {
  return (
    <>
      <GameProvider>
      <GameMap />
      </GameProvider>
    </>
  );
}

export default App;
