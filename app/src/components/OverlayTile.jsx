import PropTypes from 'prop-types';

const OverlayTile = ({ type }) => {
  const getOverlayStyle = () => {
    switch (type) {
      case 'tree':
        return {
          backgroundPosition: '-1660px -64px',
          width: '32px',
          height: '64px', // Tree height
          marginTop: '-32px', // Move the tree up by 32px to overlap the tile below
          zIndex: 1, // Ensure it's layered above other tiles
        };
      case 'cliff':
        return {
          backgroundPosition: '-64px -64px',
          width: '32px',
          height: '32px',
          zIndex: 2, // Higher z-index if needed to layer above other items
        };
      case 'bush':
        return {
          backgroundPosition: '-864px -64px',
          width: '32px',
          height: '32px',
          zIndex: 1,
        };
      default:
        return { width: '32px', height: '32px' };
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        backgroundImage: 'url(/src/assets/tileSet.png)',
        backgroundSize: '2048px 2048px',
        ...getOverlayStyle(),
      }}
    />
  );
};

OverlayTile.propTypes = {
  type: PropTypes.string.isRequired,
};

export default OverlayTile;