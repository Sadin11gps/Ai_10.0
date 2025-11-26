require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.send(`
    <h1 style="text-align:center; margin-top:100px;">
      Ai_10.0~•×RDS TEAM×•~ Backend Running ⚡
    </h1>
    <p style="text-align:center;">Multi AI API Ready!</p>
  `);
});

// Chat route
app.post('/api/chat', async (req, res) => {
  const { message, model = 'grok', apiKey } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });
  if (!apiKey) return res.status(400).json({ error: 'API Key is required' });

  try {
    let response;
    if (model === 'grok') {
      response = await axios.post('https://api.x.ai/v1/chat/completions', {
        model: 'grok-beta',
        messages: [{ role: 'user', content: message }],
        temperature: 0.7
      }, {
        headers: { Authorization: `Bearer ${apiKey}` }
      });
      res.json({ reply: response.data.choices[0].message.content });
    } 
    else if (model === 'claude') {
      response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: [{ role: 'user', content: message }]
      }, {
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json'
        }
      });
      res.json({ reply: response.data.content[0].text });
    }
    else {
      res.status(400).json({ error: 'Model not supported yet' });
    }
  } catch (err) {
    res.status(500).json({ 
      error: err.response?.data?.error || err.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Ai_10.0 Backend by RDS TEAM running on port ${PORT}`);
});
