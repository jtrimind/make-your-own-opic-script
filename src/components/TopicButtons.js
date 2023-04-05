import React from "react";

const TopicButtons = ({ topics, handleTopicClick }) => {
  return (
    <div>
      {topics.map((topic) => (
        <button key={topic.value} onClick={() => handleTopicClick(topic)}>
          {topic.label}
        </button>
      ))}
    </div>
  );
};

export default TopicButtons;
