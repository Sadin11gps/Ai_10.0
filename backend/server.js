require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Telegraf } = require('telegraf');

const app = express();
const PORT = process.env.PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8526094487:AAE_sjiAzkd_C65l5CskdlgLXLkKdPgVQgw';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center; margin-top:100px;">Ai_10.0~•×RDS TEAM×•~ Backend Running ⚡<br>FREE MODE: Gemini + Telegram Bot LIVE</h1>');
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
    else {
      reply = 'এই মডেলটা এখনো যোগ হয়নি!';
    }

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.response?.data?.error?.message || err.message });
  }
});

// Telegram Bot Setup
const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply('হাই! Ai_10.0~•×RDS TEAM×•~ এ স্বাগতম! 🔥\nএখানে যেকোনো প্রশ্ন লেখো, আমি Gemini দিয়ে উত্তর দেব (সব ফ্রি)!\nওয়েবসাইট: https://ai-10-0.vercel.app'));

bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  try {
    const response = await axios.post('https://ai-10-0-backend.onrender.com/api/chat', {
      message,
      model: 'gemini'
    });
    ctx.reply(response.data.reply || 'কোনো সমস্যা হয়েছে, আবার ট্রাই করো!');
  } catch (err) {
    ctx.reply('আমার একটু সমস্যা হচ্ছে... ওয়েবসাইটে চেক করো: https://ai-10-0.vercel.app');
  }
});

bot.launch();
console.log('Ai_10.0 Telegram Bot LIVE! @Ai10_RDS_Bot');

// Express Server
app.listen(PORT, () => console.log(`Ai_10.0 Backend on port ${PORT}`));
