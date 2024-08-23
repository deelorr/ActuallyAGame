import GameMap from './components/GameMap'; // Import the GameMap component, which renders the game world
import StatsPanel from './components/Panels/StatsPanel'; // Import the StatsPanel component for displaying player stats
import DebugPanel from './components/Panels/DebugPanel'; // Import the DebugPanel component for debugging information
import { GameProvider } from './contexts/GameContext'; // Import the GameProvider to manage and provide the game state

// App component serves as the root component of the application, combining all major UI elements
function App() {
  return (
    <>
      {/* Wrap the game components with the GameProvider to provide access to the global game state */}
      <GameProvider>
        <StatsPanel /> {/* Render the StatsPanel component to display player stats */}
        <GameMap /> {/* Render the GameMap component, which includes the game grid, characters, and other elements */}
        <DebugPanel /> {/* Render the DebugPanel component for debugging information */}
      </GameProvider>
    </>
  );
}

export default App; // Export the App component as the default export
