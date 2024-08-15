import PropTypes from 'prop-types';

const Tile = ({ type }) => {
  const getTileStyle = () => {
    switch (type) {
      case 'grass-d':
        return { backgroundPosition: '-32px -32px' };
      case 'grass-l':
        return { backgroundPosition: '-64px -32px' };
      case 'dirt-l':
        return { backgroundPosition: '-96px -32px' };
      case 'water':
        return { backgroundPosition: '-128px -32px' };
      case 'sand':
        return { backgroundPosition: '-160px -32px' };
      case 'dirt-d':
        return { backgroundPosition: '-192px -32px' };
      default:
        return { backgroundPosition: '-32px -32px' }; // grass-d if nothing else
    }
  };

  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        backgroundImage: 'url(/src/assets/tileSet.png)',
        backgroundSize: '2048px 2048px', // 1024x1024px tileSet * 2 for scaling
        ...getTileStyle(),
      }}
    />
  );
};

Tile.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tile;