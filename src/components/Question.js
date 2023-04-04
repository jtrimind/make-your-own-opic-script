import React from 'react';

const Question = ({ question, handleChange }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      {question.choices.map((choice, index) => (
        <div key={index}>
          <input
            type="radio"
            id={choice}
            name={question.id}
            value={choice}
            onChange={handleChange}
          />
          <label htmlFor={choice}>{choice}</label>
        </div>
      ))}
    </div>
  );
};

export default Question;