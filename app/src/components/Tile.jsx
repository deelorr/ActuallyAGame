import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { useEffect } from 'react';

const Tile = ({ type, updateTileType }) => {
  // Function to determine the CSS styles based on the tile type
  const getTileStyle = () => {
    switch (type) {
      case 'grass-d':
        return { backgroundPosition: '-32px -32px' }; // Position in the sprite sheet for 'grass-d'
      case 'grass-l':
        return { backgroundPosition: '-64px -32px' }; // Position in the sprite sheet for 'grass-l'
      case 'dirt-l':
        return { backgroundPosition: '-96px -32px' }; // Position in the sprite sheet for 'dirt-l'
      case 'water':
        return { backgroundPosition: '-128px -32px' }; // Position in the sprite sheet for 'water'
      case 'sand':
        return { backgroundPosition: '-160px -32px' }; // Position in the sprite sheet for 'sand'
      case 'dirt-d':
        return { backgroundPosition: '-192px -32px' }; // Position in the sprite sheet for 'dirt-d'
      default:
        return { backgroundPosition: '-32px -32px' }; // Default to 'grass-d' if type is not recognized
    }
  };

  // Update the tile type in context when this tile is rendered
  useEffect(() => {
    updateTileType(type);
  }, [type, updateTileType]);

  return (
    <div 
      className={type}
      style={{
        width: '32px', // Width of each tile
        height: '32px', // Height of each tile
        backgroundImage: 'url(/src/assets/tileSet.png)', // The tile set sprite sheet
        backgroundSize: '2048px 2048px', // Size of the entire sprite sheet (scaled up)
        ...getTileStyle(), // Apply the calculated background position based on the tile type
      }}
    />
  );
};

// Define the expected prop types for the Tile component
Tile.propTypes = {
  type: PropTypes.string.isRequired, // The type of tile (required)
  updateTileType: PropTypes.func.isRequired, // Function to update the tile type in context (required)
};

export default Tile;
