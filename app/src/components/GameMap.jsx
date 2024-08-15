
import Tile from './Tile';
import Character from './Character/Character';

const GameMap = () => {
  const mapLayout = [
    ['grass-d', 'grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-d', 'grass-d', 'dirt-l', 'dirt-l', 'dirt-l'],
    ['grass-d', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'sand', 'sand'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand'],
    ['grass-l', 'grass-l', 'grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'water', 'water'],
    ['grass-l', 'grass-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water'],
    ['dirt-l', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'sand', 'sand', 'water', 'water', 'water'],
    ['dirt-d', 'dirt-d', 'dirt-d', 'dirt-l', 'sand', 'sand', 'water', 'water', 'water', 'water'],
  ];

  const gameMapStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 32px)',
    gridTemplateRows: 'repeat(10, 32px)',
    position: 'relative',
  };

  return (
    <div style={gameMapStyle}>
      {mapLayout.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} type={tile} />
        ))
      )}
      <Character />
    </div>
  );
};

export default GameMap;