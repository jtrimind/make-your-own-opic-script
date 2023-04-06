export default async function handler(req, res) {
  if (req.method === "POST") {
    const answers = req.body;
    console.log("Received answers:", answers);

    const anthologySample =
      "This is a sample generated anthology based on the submitted survey answers.";

    res.status(200).json(anthologySample);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
