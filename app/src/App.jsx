import GameMap from './components/GameMap'; // Import the GameMap component, which renders the game world
import { GameProvider } from './contexts/GameContext'; // Import the GameProvider to manage and provide the game state

function App() {
  return (
    <>
      {/* Wrap the GameMap component with the GameProvider */}
      <GameProvider>
        <GameMap /> {/* Render the GameMap component, which includes the game grid, characters, and other elements */}
      </GameProvider>
    </>
  );
}

export default App;
