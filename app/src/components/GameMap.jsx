import Tile from './Tile';
import OverlayTile from './OverlayTile';
import Character from './Character/Character';
import DebugPanel from './DebugPanel';

const GameMap = () => {
  const mapLayout = [
    ['grass-d', 'grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l'],
    ['grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'water', 'water', 'water', 'water'],
  ];

  const overlayLayout = [
    ['none', 'none', 'none', 'bush', 'tree', 'tree', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'bush', 'bush', 'bush', 'none', 'none', 'store', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
    ['none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none'],
  ];

  const gameMapStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 32px)',
    gridTemplateRows: 'repeat(10, 32px)',
    position: 'relative',
    width: '320px', // 10 tiles * 32px
    height: '320px', // 10 tiles * 32px
  };

  return (
    <>
    <div style={gameMapStyle}>

      {/* Base Map Layer */}
      {mapLayout.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <div
            key={`base-${rowIndex}-${colIndex}`}
            style={{
              gridRow: rowIndex + 1,
              gridColumn: colIndex + 1,
            }}
          >
            <Tile type={tile} />
          </div>
        ))
      )}

      {/* Overlay Layer */}
      {overlayLayout.map((row, rowIndex) =>
        row.map((overlay, colIndex) =>
          overlay ? (
            <div
              key={`overlay-${rowIndex}-${colIndex}`}
              style={{
                gridRow: rowIndex + 1,
                gridColumn: colIndex + 1,
                zIndex: 2,
                position: 'relative', // Ensures positioned within the grid
              }}
            >
              <OverlayTile type={overlay} />
            </div>
          ) : 'none'
        )
      )}

      {/* Character on top of all layers */}
      <Character />
      <DebugPanel />
    </div>
  </>
  );
};

export default GameMap;
