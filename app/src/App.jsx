import GameMap from './components/GameMap'; // Import the GameMap component, which renders the game world
import StatsPanel from './components/Panels/StatsPanel'; // Import the StatsPanel component for displaying player stats
import DebugPanel from './components/Panels/DebugPanel'; // Import the DebugPanel component for debugging information
import { GameProvider } from './contexts/GameContext'; // Import the GameProvider to manage and provide the game state

function App() {
  return (
    <>
      {/* Wrap the GameMap component with the GameProvider */}
      <GameProvider>
        <StatsPanel />
        <GameMap /> {/* Render the GameMap component, which includes the game grid, characters, and other elements */}
        <DebugPanel /> {/* Render the debug panel for debugging information */}
      </GameProvider>
    </>
  );
}

export default App;
