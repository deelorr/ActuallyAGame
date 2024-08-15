import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const OverlayTile = ({ type }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (type === 'bush') {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev === 0 ? 1 : 0)); // Toggle between 0 and 1
      }, 500); // Adjust the speed as needed = 0.5s per frame
      return () => clearInterval(interval);
      }
  }, [type]);

  const getOverlayStyle = () => {
    switch (type) {
      case 'tree':
        return {
          backgroundPosition: '-1664px -121px',
          width: '32px',
          height: '72px', // Tree height
          marginTop: '-38px', // Move the tree up by 32px to overlap the tile below
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
          backgroundPosition: animationStep === 0 ? '-868px -63px' : '-900px -63px',
          width: '32px',
          height: '32px',
          zIndex: 1,
        };
      case 'store':
        return {
          backgroundPosition: '-955px -384px',
          width: '42px', // Double the width of a tile
          height: '64px', // Double the height of a tile
          marginTop: '-35px', // Move the store up by 32px to overlap the tile below
          zIndex: 3, // Ensure it's layered above other tiles
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