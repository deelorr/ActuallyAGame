import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import Tile from '../Tiles/Tile'; // Import Tile component for rendering the map tiles
import OverlayTile from '../Tiles/OverlayTile'; // Import OverlayTile component for rendering overlay items
import Character from '../Character/Character'; // Import Character component for rendering the player character
import Enemy from '../Enemy/Enemy'; // Import Enemy component for rendering the enemy
import useCharacterMovement from '../Character/useCharacterMovement'; // Import useCharacterMovement hook for player movement
import useEnemyMovement from '../Enemy/useEnemyMovement'; // Import useEnemyMovement hook for enemy movement
import './GameMap.css'; // Import CSS file for styling the game map

const GameMap = () => {
  const { 
    position, 
    updateTileType,
    mapLayout,
    overlayLayout,
  } = useContext(GameContext); // Access position and updateTileType from GameContext

  // Define the style for the game map, setting up a grid layout
  const gameMapStyle = {
    display: 'grid', // Display as a grid
    gridTemplateColumns: 'repeat(10, 32px)', // 10 columns with 32px width each
    gridTemplateRows: 'repeat(10, 32px)', // 10 rows with 32px height each
    position: 'relative', // Position the map relative to other elements
    width: '320px', // Total width of the map (10 tiles * 32px)
    height: '320px', // Total height of the map (10 tiles * 32px)
  };

  useCharacterMovement(); // Handle player movement
  useEnemyMovement();     // Handle enemy movement

  // Function to check if the character is on the current tile
  const isCharacterOnTile = (rowIndex, colIndex) => {
    const tileX = colIndex * 32; // Calculate the X position of the tile
    const tileY = rowIndex * 32; // Calculate the Y position of the tile
    return position.x === tileX && position.y === tileY; // Check if the character's position matches the tile's position
  };

  return (
        <div className='mapBox' 
        style={gameMapStyle}>
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
                <Tile 
                  type={tile} 
                  updateTileType={isCharacterOnTile(rowIndex, colIndex) ? updateTileType : () => {}} 
                /> {/* Render the tile component with the specified type */}
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
          <Character />
          <Enemy />
        </div>
  );
};

export default GameMap; // Export the GameMap component as the default export
