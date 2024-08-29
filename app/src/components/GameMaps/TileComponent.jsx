import Tile from '../Tiles/Tile';
import PropTypes from 'prop-types';

const TileComponent = ({ rowIndex, colIndex, tile, isValidMove, handleMouseOver, handleTileClick }) => {
  return (
    <div
      onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
      onClick={handleTileClick}
      style={{
        gridRow: rowIndex + 1,
        gridColumn: colIndex + 1,
        border: isValidMove ? '2px solid yellow' : '1px solid black', // Highlight valid moves
        cursor: isValidMove ? 'pointer' : 'default', // Change cursor for valid moves
      }}
    >
      <Tile type={tile} />
    </div>
  );
};

TileComponent.propTypes = {
    rowIndex: PropTypes.number.isRequired,
    colIndex: PropTypes.number.isRequired,
    tile: PropTypes.string.isRequired,
    isValidMove: PropTypes.bool.isRequired,
    handleMouseOver: PropTypes.func.isRequired,
    handleTileClick: PropTypes.func.isRequired,
    };

export default TileComponent;
