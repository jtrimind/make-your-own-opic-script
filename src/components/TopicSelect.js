import React from "react";
import Select from "react-select";

const TopicSelect = ({ topics, handleChange }) => {
  return (
    <Select
      options={topics}
      onChange={handleChange}
      placeholder="Select a topic"
    />
  );
};

export default TopicSelect;
