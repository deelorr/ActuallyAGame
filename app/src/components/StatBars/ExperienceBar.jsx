import './ExperienceBar.css'; // Import CSS for styling the ExperienceBar component
import PropTypes from 'prop-types'; // Import PropTypes for type-checking props

// ExperienceBar component displays the player's current experience relative to the experience needed for the next level
const ExperienceBar = ({ currentExperience, level }) => {
  // Calculate the experience needed for the next level based on the player's current level
  const experienceForNextLevel = level * 100;

  // Calculate the percentage of the experience bar to fill based on current experience
  const experiencePercentage = (currentExperience / experienceForNextLevel) * 100;

  return (
    <div className="experience-bar-container"> {/* Container for the experience bar */}
      <div
        className="experience-bar" // The bar that visually represents the player's experience
        style={{ width: `${experiencePercentage}%` }} // Set the width of the bar based on the experience percentage
      ></div>
      <div className="experience-bar-text">
        {currentExperience} / {experienceForNextLevel} {/* Display current and needed experience as text */}
      </div>
    </div>
  );
};

// Define prop types for the ExperienceBar component to ensure correct usage
ExperienceBar.propTypes = {
  currentExperience: PropTypes.number.isRequired, // currentExperience must be a number and is required
  level: PropTypes.number.isRequired, // level must be a number and is required
};

export default ExperienceBar; // Export the ExperienceBar component as the default export
