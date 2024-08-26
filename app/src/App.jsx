import { GameProvider } from './contexts/GameContext'; // Import the GameProvider to manage and provide the game state
import GameMap from './components/GameMaps/GameMap'; // Import the GameMap component, which renders the game world
import StatsPanel from './components/Panels/StatsPanel'; // Import the StatsPanel component for displaying player stats
import DebugPanel from './components/Panels/DebugPanel'; // Import the DebugPanel component for debugging information

// App component serves as the root component of the application, combining all major UI elements
function App() {
  return (
      <GameProvider> {/* Wrap the game components with the GameProvider to provide access to the global game state */}
        <StatsPanel /> {/* Render the StatsPanel component to display player stats */}
        <GameMap /> {/* Render the GameMap component, which includes the game grid, characters, and other elements */}
        <DebugPanel /> {/* Render the DebugPanel component for debugging information */}
      </GameProvider>
  );
}

export default App; // Export the App component as the default export
