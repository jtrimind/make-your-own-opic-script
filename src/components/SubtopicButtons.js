import React from "react";
import styles from './SubtopicButtons.module.css';

const SubtopicButtons = ({
  subtopics,
  handleSubtopicClick,
  activeSubtopic,
}) => {
  return (
    <div>
      {subtopics.map((subtopic) => (
        <button
          key={subtopic.value}
          onClick={() => handleSubtopicClick(subtopic)}
          className={`${styles.button} ${subtopic.value === activeSubtopic?.value ? styles.active : ''}`}
        >
          {subtopic.label}
        </button>
      ))}
    </div>
  );
};

export default SubtopicButtons;
