import PropTypes from 'prop-types'; // Import PropTypes for type-checking

const Tile = ({ type }) => {
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

  return (
    <div
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
};

export default Tile;
