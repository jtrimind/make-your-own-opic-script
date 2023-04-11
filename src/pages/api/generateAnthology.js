export default async function handler(req, res) {
  if (req.method === "POST") {
    const { topic, subtopic, answers } = req.body;
    console.log('topic:', topic);
    console.log('subtopic:', subtopic);
    console.log('answers:', answers);

    // Replace this with the actual script generation logic based on the answers
    const generatedScript = `Generated script for topic: ${topic}, subtopic: ${subtopic}.`;

    res.status(200).send(generatedScript);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
