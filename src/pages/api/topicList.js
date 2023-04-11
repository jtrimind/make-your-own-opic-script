import fs from 'fs';
import path from 'path';

// Utility function to get the list of topics and subtopics
const getTopicsAndSubtopics = () => {
  const topicsPath = path.join(process.cwd(), 'data');
  const topicFolders = fs.readdirSync(topicsPath).filter((item) => {
    const itemPath = path.join(topicsPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const topicsAndSubtopics = topicFolders.map((topicFolder) => {
    const subtopicFiles = fs.readdirSync(path.join(topicsPath, topicFolder)).filter((file) => file.endsWith('.json'));

    const subtopics = subtopicFiles.map((subtopicFile) => {
      return {
        value: subtopicFile.replace('.json', ''),
        label: subtopicFile.replace('.json', '').split('_').join(' '),
      };
    });

    return {
      value: topicFolder,
      label: topicFolder.split('_').join(' '),
      subtopics,
    };
  });

  return topicsAndSubtopics;
};

// API route handler
export default async function handler(req, res) {
  const topicsAndSubtopics = getTopicsAndSubtopics();
  res.status(200).json(topicsAndSubtopics);
}
