import Head from "next/head";
import styles from "@/styles/Home.module.css";

import React, { useState } from "react";
import TopicButtons from "../components/TopicButtons";
import Survey from "../components/Survey";

const topics = [
  { value: "topic1", label: "Topic 1" },
  { value: "topic2", label: "Topic 2" },
];

const loadQuestions = async (topicValue) => {
  const response = await fetch(`/api/questions?topic=${topicValue}`);
  const questions = await response.json();
  return questions;
};

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [generatedAnthology, setGeneratedAnthology] = useState(null);

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    const questions = await loadQuestions(topic.value);
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
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Select a Topic</h1>
        <TopicButtons
          topics={topics}
          handleTopicClick={handleTopicClick}
          activeTopic={selectedTopic}
        />
        {selectedTopic && (
          <div>
            <h2>{selectedTopic.label}</h2>
            <Survey questions={questions} handleSubmit={handleSubmit} />
          </div>
        )}
        {generatedAnthology && (
          <div>
            <h3>Generated Anthology:</h3>
            <p>{generatedAnthology}</p>
          </div>
        )}
      </main>
    </>
  );
}
