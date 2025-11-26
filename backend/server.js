require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; margin-top:100px;">Ai_10.0~•×RDS TEAM×•~ Backend Running ⚡<br>FREE MODE: Gemini 1.5 Flash</h1>');
});

app.post('/api/chat', async (req, res) => {
  const { message, model = 'gemini', apiKey } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  try {
    let reply = '';

    if (model === 'gemini') {
      const key = apiKey || process.env.GEMINI_API_KEY;
      if (!key) return res.status(400).json({ error: 'Gemini key missing' });

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`,
        { contents: [{ parts: [{ text: message }] }] }
      );
      reply = response.data.candidates[0].content.parts[0].text;
    }
    // পরে HuggingFace, Grok, Claude যোগ করবি
    else {
      reply = 'এই মডেলটা এখনো যোগ হয়নি। শুধু Gemini কাজ করছে (ফ্রি)!';
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

app.listen(PORT, () => console.log(`Ai_10.0 FREE Backend LIVE on ${PORT}`));
