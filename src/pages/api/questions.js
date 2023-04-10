import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { topic, subtopic } = req.query;
  const filePath = path.join(process.cwd(), "data", topic, `${subtopic}.json`);
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const questions = JSON.parse(fileContent);
    res.status(200).json(questions);
  } catch (error) {
    res
      .status(404)
      .json({
        message: "Questions not found for the given topic and subtopic",
      });
  }
}
