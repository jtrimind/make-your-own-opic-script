import React, { useState, useEffect } from "react";

const fetchQuestions = async (topic, subtopic) => {
  const response = await fetch(
    `/api/questions?topic=${topic}&subtopic=${subtopic}`
  );
  const questions = await response.json();
  console.log("fetchQuetions: ", questions);
  return questions;
};

const ScriptGenerator = ({ topic, subtopic }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [generatedScript, setGeneratedScript] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuestions(topic.value, subtopic.value);
      setQuestions(data);
    };

    fetchData();
  }, [topic, subtopic]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => {
      const currentAnswers = prevAnswers[questionId] || [];
      const updatedAnswers = currentAnswers.includes(selectedOption)
        ? currentAnswers.filter((option) => option !== selectedOption)
        : [...currentAnswers, selectedOption];
      return {
        ...prevAnswers,
        [questionId]: updatedAnswers,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/generateAnthology", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: topic.value,
        subtopic: subtopic.value,
        answers,
      }),
    });

    const generatedScriptData = await response.text();
    setGeneratedScript(generatedScriptData);
  };

  return (
    <div>
      <h2>
        {topic.label} - {subtopic.label}
      </h2>
      <form onSubmit={handleSubmit}>
        {questions.map((questionObj, index) => (
          <div key={index}>
            <h3>{questionObj.question}</h3>
            {questionObj.options.map((option, idx) => (
              <label key={idx}>
                <input
                  type="checkbox"
                  name={`question-${questionObj.id}`}
                  value={option}
                  onChange={() => handleOptionChange(questionObj.id, option)}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit Answers</button>
      </form>
      {generatedScript && (
        <div>
          <h2>Generated Script</h2>
          <p>{generatedScript}</p>
        </div>
      )}
    </div>
  );
};

export default ScriptGenerator;
