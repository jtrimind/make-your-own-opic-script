import Head from "next/head";
import styles from "@/styles/Home.module.css";

import React, { useState } from "react";
import TopicButtons from "../components/TopicButtons";
import SubtopicButtons from '../components/SubtopicButtons';
import Survey from "../components/Survey";

const topics = [
  {
    value: "topic1",
    label: "Topic 1",
    subtopics: [
      {
        value: "subtopic1-1",
        label: "subtopic 1-1",
      },
      {
        value: "subtopic1-2",
        label: "Subtopic 1-2",
      },
    ],
  },
  { value: "topic2", label: "Topic 2" },
];

const loadQuestions = async (topicValue, subtopicValue) => {
  const response = await fetch(`/api/questions?topic=${topicValue}&subtopic=${subtopicValue}`);
  const questions = await response.json();
  return questions;
};

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [generatedAnthology, setGeneratedAnthology] = useState(null);

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
    setQuestions([]);
  };

  const handleSubtopicClick = async (subtopic) => {
    setSelectedSubtopic(subtopic);
    const questions = await loadQuestions(selectedTopic.value, subtopic.value);
    setQuestions(questions);
  };

  const handleSubmit = async (answers) => {
    console.log("Submitted answers:", answers);
    const response = await fetch("/api/generateAnthology", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answers),
    });
    const anthology = await response.json();
    setGeneratedAnthology(anthology);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <main className={styles.main}>
        <h1>Select a Topic</h1>
        <TopicButtons
          topics={topics}
          handleTopicClick={handleTopicClick}
          activeTopic={selectedTopic}
        />
        {selectedTopic && (
          <>
            <h2>Select a Subtopic</h2>
            <SubtopicButtons
              subtopics={selectedTopic.subtopics}
              handleSubtopicClick={handleSubtopicClick}
              activeSubtopic={selectedSubtopic}
            />
          </>
        )}
        {selectedSubtopic && (
          <div>
            <h2>{selectedSubtopic.label}</h2>
            <Survey questions={questions} handleSubmit={handleSubmit} />
            {generatedAnthology && (
              <div>
                <h3>Generated Anthology:</h3>
                <p>{generatedAnthology}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
