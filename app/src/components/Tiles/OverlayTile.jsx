import PropTypes from 'prop-types'; // Import PropTypes for type-checking
import { useEffect, useState } from 'react'; // Import useEffect and useState hooks from React

const OverlayTile = ({ type }) => {
  // State to manage the animation step for animated overlay tiles
  const [animationStep, setAnimationStep] = useState(0);

  // useEffect hook to handle animations based on the type of tile
  useEffect(() => {
    if (type === 'bush') {
      // If the tile type is 'bush', start an interval to toggle the animation step
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev === 0 ? 1 : 0)); // Toggle between 0 and 1
      }, 500); // Adjust the speed as needed (0.5 seconds per frame)

      // Cleanup function to clear the interval when the component unmounts or the type changes
      return () => clearInterval(interval);
    }
  }, [type]); // Dependency array ensures this effect runs only when 'type' changes

  // Function to get the style for the overlay tile based on its type
  const getOverlayStyle = () => {
    switch (type) {
      case 'tree':
        return {
          backgroundPosition: '-1664px -121px', // Position of the tree sprite in the sprite sheet
          width: '32px', // Width of the tile
          height: '72px', // Height of the tree, overlapping multiple tiles
          marginTop: '-38px', // Move the tree up to overlap the tile below
          zIndex: 1, // Ensure it's layered above other tiles
        };
      case 'cliff':
        return {
          backgroundPosition: '-64px -64px', // Position of the cliff sprite in the sprite sheet
          width: '32px', // Width of the tile
          height: '32px', // Height of the tile
          zIndex: 2, // Higher z-index if needed to layer above other items
        };
      case 'bush':
        return {
          backgroundPosition: animationStep === 0 ? '-868px -63px' : '-900px -63px', // Toggle between two positions for animation
          width: '32px', // Width of the tile
          height: '32px', // Height of the tile
          zIndex: 1, // Ensure it's layered above other tiles
        };
      case 'store':
        return {
          backgroundPosition: '-955px -384px', // Position of the store sprite in the sprite sheet
          width: '42px', // Double the width of a standard tile
          height: '64px', // Double the height of a standard tile
          marginTop: '-35px', // Move the store up to overlap the tile below
          zIndex: 3, // Ensure it's layered above other tiles
        };
      default:
        return { width: '32px', height: '32px' }; // Default size for tiles
    }
  };

  // Render the overlay tile with calculated styles
  return (
    <div
      style={{
        position: 'absolute', // Position the tile absolutely within its container
        backgroundImage: 'url(/src/assets/tileSet.png)', // Set the background image from the sprite sheet
        backgroundSize: '2048px 2048px', // Set the size of the entire sprite sheet
        ...getOverlayStyle(), // Apply the specific styles based on the tile type
      }}
    />
  );
};

// Define the expected prop types for the OverlayTile component
OverlayTile.propTypes = {
  type: PropTypes.string.isRequired, // The type of overlay tile (required)
};

export default OverlayTile;
