import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import TileComponent from './TileComponent';
import OverlayLayer from './OverlayLayer';
import Character from '../Character/Character';
import Enemy from '../Enemy/Enemy';
import './GameMap.css';
import useCharacterMovement from '../Character/useCharacterMovement';

const GameMap = () => {
  const { 
    hoveredTile,
    setHoveredTile,
    validMoves,
    mapLayout,
    overlayLayout,
  } = useContext(GameContext);

  const { moveToClickedTile } = useCharacterMovement(); // Access the function here

  // Function to check if the tile is a valid move
  const isValidMove = (rowIndex, colIndex) => {
    return Object.values(validMoves).some(move => 
      move.x === colIndex * 32 && move.y === rowIndex * 32);
  };

  // Function to handle hovering over a tile
  const handleMouseOver = (rowIndex, colIndex) => {
    if (isValidMove(rowIndex, colIndex)) {
      setHoveredTile({ x: colIndex * 32, y: rowIndex * 32 });
    } else {
      setHoveredTile(null);
    }
  };

  // Function to handle clicking on a tile
  const handleTileClick = () => {
    if (hoveredTile && isValidMove(hoveredTile.y / 32, hoveredTile.x / 32)) {
      moveToClickedTile(); // Move the character when the tile is clicked
    }
  };

  // Define the style for the game map, setting up a grid layout
  const gameMapStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 32px)',
    gridTemplateRows: 'repeat(10, 32px)',
    position: 'relative',
    width: '320px',
    height: '320px',
  };

  return (
    <div className='mapBox' style={gameMapStyle}>
      {mapLayout.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <TileComponent
            key={`base-${rowIndex}-${colIndex}`}
            rowIndex={rowIndex}
            colIndex={colIndex}
            tile={tile}
            isValidMove={isValidMove(rowIndex, colIndex)}
            handleMouseOver={handleMouseOver} // Passing the function here
            handleTileClick={handleTileClick}
          />
        ))
      )}
      <OverlayLayer overlayLayout={overlayLayout} />
      <Character />
      <Enemy />
    </div>
  );
};

export default GameMap;
