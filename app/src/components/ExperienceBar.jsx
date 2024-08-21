
import './ExperienceBar.css';
import PropTypes from 'prop-types';

const ExperienceBar = ({ currentExperience, level }) => {
  // Assuming experience needed for next level increases by a constant factor
  const experienceForNextLevel = level * 100;
  const experiencePercentage = (currentExperience / experienceForNextLevel) * 100;

  return (
    <div className="experience-bar-container">
      <div
        className="experience-bar"
        style={{ width: `${experiencePercentage}%` }}
      ></div>
      <div className="experience-bar-text">
        {currentExperience} / {experienceForNextLevel}
      </div>
    </div>
  );
};

ExperienceBar.propTypes = {
    currentExperience: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    };

export default ExperienceBar;
