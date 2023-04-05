import fs from 'fs';

import path from 'path';

export default async function handler(req, res) {
  const { topic } = req.query;
  const filePath = path.join(process.cwd(), 'data', `${topic}.json`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const questions = JSON.parse(fileContent);
  res.status(200).json(questions);
}