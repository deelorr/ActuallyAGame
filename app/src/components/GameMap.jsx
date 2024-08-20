import { useContext } from 'react'; // Import useContext hook from React
import Tile from './Tile'; // Import Tile component for rendering the map tiles
import OverlayTile from './OverlayTile'; // Import OverlayTile component for rendering overlay items
import Character from './Character/Character'; // Import Character component for rendering the player character
import DebugPanel from './DebugPanel'; // Import DebugPanel component for debugging
import HealthBar from '../components/HealthBar'; // Import HealthBar component for displaying player's health
import GameContext from '../contexts/GameContext'; // Import GameContext for accessing game state
import StatsPanel from '../components/StatsPanel'; // Import StatsPanel component for displaying player's stats
import Enemy from '../components/Enemy'; // Import Enemy component for rendering the enemy

const GameMap = () => {
  // Extract health and maxHealth from GameContext
  const { health, maxHealth } = useContext(GameContext);

  // Define the base map layout with different types of tiles
  const mapLayout = [
    ['grass-d', 'grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'water', 'water', 'water', 'water'],
  ];

  // Define the overlay layout with items such as bushes, trees, and buildings
  const overlayLayout = [
    [null, null, null, 'bush', 'tree', 'tree', null, null, null, null],
    [null, null, null, 'bush', 'bush', 'bush', null, null, 'store', null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  // Define the style for the game map, setting up a grid layout
  const gameMapStyle = {
    display: 'grid', // Display as a grid
    gridTemplateColumns: 'repeat(10, 32px)', // 10 columns with 32px width each
    gridTemplateRows: 'repeat(10, 32px)', // 10 rows with 32px height each
    position: 'relative', // Position the map relative to other elements
    width: '320px', // Total width of the map (10 tiles * 32px)
    height: '320px', // Total height of the map (10 tiles * 32px)
  };

  return (
    <>
      <div style={gameMapStyle}>
        {/* Render the base map layer */}
        {mapLayout.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <div
              key={`base-${rowIndex}-${colIndex}`} // Unique key for each tile
              style={{
                gridRow: rowIndex + 1, // Set the row position in the grid
                gridColumn: colIndex + 1, // Set the column position in the grid
              }}
            >
              <Tile type={tile} /> {/* Render the tile component with the specified type */}
            </div>
          ))
        )}

        {/* Render the overlay layer (e.g., bushes, trees) */}
        {overlayLayout.map((row, rowIndex) =>
          row.map((overlay, colIndex) =>
            overlay ? (
              <div
                key={`overlay-${rowIndex}-${colIndex}`} // Unique key for each overlay item
                style={{
                  gridRow: rowIndex + 1, // Set the row position in the grid
                  gridColumn: colIndex + 1, // Set the column position in the grid
                  zIndex: 2, // Set z-index to ensure overlay appears above base tiles
                  position: 'relative', // Ensure positioned within the grid
                }}
              >
                <OverlayTile type={overlay} /> {/* Render the overlay component with the specified type */}
              </div>
            ) : null
          )
        )}

        {/* Render the character, enemy, and battle components on top of all layers */}
        <Character />
        <Enemy />

        {/* Render the debug panel for debugging information */}
        <DebugPanel />
      </div>

      {/* Render the health bar and stats panel below the game map */}
      <div>
        <HealthBar currentHealth={health} maxHealth={maxHealth} /> {/* Display the player's health */}
        <StatsPanel /> {/* Display the player's stats */}
      </div>
    </>
  );
};

export default GameMap;
