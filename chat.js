// api/chat.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  // Grab the hidden API key from Vercel's settings
  const apiKey = process.env.GEMINI_API_KEY;
  const userMessages = req.body.contents;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: req.body.system_instruction,
        contents: userMessages,
        generationConfig: { temperature: 0.7 }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to AI' });
  }
}