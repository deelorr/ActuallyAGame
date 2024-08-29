import OverlayTile from '../Tiles/OverlayTile';
import PropTypes from 'prop-types';

const OverlayLayer = ({ overlayLayout }) => {
  return (
    <>
      {overlayLayout.map((row, rowIndex) =>
        row.map((overlay, colIndex) =>
          overlay ? (
            <div
              key={`overlay-${rowIndex}-${colIndex}`}
              style={{
                gridRow: rowIndex + 1,
                gridColumn: colIndex + 1,
                zIndex: 2,
                position: 'relative',
              }}
            >
              <OverlayTile type={overlay} />
            </div>
          ) : null
        )
      )}
    </>
  );
};

OverlayLayer.propTypes = {
    overlayLayout: PropTypes.array.isRequired,
    };

export default OverlayLayer;
