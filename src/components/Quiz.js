import React, { useState } from 'react';
import Question from './Question';

const Quiz = ({ questions, handleSubmit }) => {
  const [answers, setAnswers] = useState({});

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  };

  return (
    <div>
      {questions.map((question) => (
        <Question key={question.id} question={question} handleChange={handleChange} />
      ))}
      <button onClick={() => handleSubmit(answers)}>Submit</button>
    </div>
  );
};

export default Quiz;