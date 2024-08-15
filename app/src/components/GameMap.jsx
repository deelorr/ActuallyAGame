// src/components/GameMap.jsx

import Tile from './Tile';
import Character from './Character';
import './GameMap.css';

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
  
  

  return (
    <div className='gameBox'>
      <div className='gameMap'>
        {mapLayout.map((row, rowIndex) =>
          row.map((tile, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} type={tile} />
          ))
        )}
        <Character />
      </div>
    </div>
  );
};

export default GameMap;