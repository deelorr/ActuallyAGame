import PropTypes from 'prop-types';

const EnemyWrapper = ({ position, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
        transition: 'top 0.2s ease, left 0.2s ease', // Smooth transition for movement
      }}
    >
      {children}
    </div>
  );
};

EnemyWrapper.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default EnemyWrapper;
