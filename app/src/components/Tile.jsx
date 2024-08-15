import PropTypes from 'prop-types';

const Tile = ({ type }) => {
  const getTileStyle = () => {
    switch (type) {
      case 'grass-d':
        return { backgroundPosition: '-64px -64px' };
      case 'grass-l':
        return { backgroundPosition: '-128px -64px' };
      case 'dirt-l':
        return { backgroundPosition: '-192px -64px' };
      case 'water':
        return { backgroundPosition: '-256px -64px' };
      case 'sand':
        return { backgroundPosition: '-320px -64px' };
      case 'dirt-d':
        return { backgroundPosition: '-384px -64px' };
      default:
        return { backgroundPosition: '-64px -64px' }; // Default to grass
    }
  };

  return (
    <div
      className='tile'
      style={{
        width: '64px',
        height: '64px',
        backgroundImage: 'url(/src/assets/tileset.png)',
        backgroundSize: '4096px 4096px', // Adjust the background size accordingly for 64x64 tiles
        ...getTileStyle(),
      }}
    />
  );
};

Tile.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tile;
