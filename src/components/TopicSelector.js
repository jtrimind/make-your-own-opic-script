import React, { useState } from 'react';

const TopicSelector = ({ topicsAndSubtopics, onTopicChange, onSubtopicChange }) => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  const handleTopicChange = (e) => {
    const topicValue = e.target.value;
    const topic = topicsAndSubtopics.find((t) => t.value === topicValue);
    setSelectedTopic(topic);
    onTopicChange(topic);
  };

  const handleSubtopicChange = (e) => {
    const subtopicValue = e.target.value;
    const subtopic = selectedTopic.subtopics.find((s) => s.value === subtopicValue);
    setSelectedSubtopic(subtopic);
    onSubtopicChange(subtopic);
  };

  return (
    <div>
      <div>
        <label htmlFor="topic">Topic: </label>
        <select id="topic" value={selectedTopic?.value || ''} onChange={handleTopicChange}>
          <option value="">Select a topic</option>
          {topicsAndSubtopics.map((topic) => (
            <option key={topic.value} value={topic.value}>
              {topic.label}
            </option>
          ))}
        </select>
      </div>
      {selectedTopic && (
        <div>
          <label htmlFor="subtopic">Subtopic: </label>
          <select id="subtopic" value={selectedSubtopic?.value || ''} onChange={handleSubtopicChange}>
            <option value="">Select a subtopic</option>
            {selectedTopic.subtopics.map((subtopic) => (
              <option key={subtopic.value} value={subtopic.value}>
                {subtopic.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default TopicSelector;