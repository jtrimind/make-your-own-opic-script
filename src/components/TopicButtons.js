import React from "react";
import styles from "./TopicButtons.module.css";

const TopicButtons = ({ topics, handleTopicClick, activeTopic }) => {
  return (
    <div>
      {topics.map((topic) => (
        <button
          key={topic.value}
          onClick={() => handleTopicClick(topic)}
          className={topic.value === activeTopic?.value ? styles.active : ""}
        >
          {topic.label}
        </button>
      ))}
    </div>
  );
};

export default TopicButtons;
