import Head from "next/head";
import styles from "@/styles/Home.module.css";

import React, { useState, useEffect } from "react";
import TopicSelector from "../components/TopicSelector";
import ScriptGenerator from "../components/ScriptGenerator";

const fetchTopicsAndSubtopics = async () => {
  const response = await fetch("/api/topicList");
  const topicsAndSubtopics = await response.json();
  return topicsAndSubtopics;
};

export default function Home() {
  const [topicsAndSubtopics, setTopicsAndSubtopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopicsAndSubtopics();
      setTopicsAndSubtopics(data);
    };

    fetchData();
  }, []);

  const onTopicChange = (topic) => {
    setSelectedTopic(topic);
    setSelectedSubtopic(null);
  };

  const onSubtopicChange = (subtopic) => {
    setSelectedSubtopic(subtopic);
  };

  return (
    <>
      <Head>
        <title>Make Your Own Opic Script</title>
        <meta name="description" content="Generate your own Opic script" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Make Your Own Opic Script</h1>
        <TopicSelector
          topicsAndSubtopics={topicsAndSubtopics}
          onTopicChange={onTopicChange}
          onSubtopicChange={onSubtopicChange}
        />
        {selectedTopic && selectedSubtopic && (
          <ScriptGenerator topic={selectedTopic} subtopic={selectedSubtopic} />
        )}
      </main>
    </>
  );
}
