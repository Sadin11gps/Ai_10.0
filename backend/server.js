require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Telegraf } = require('telegraf');

const app = express();
app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN || '8526094487:AAE_sjiAzkd_C65l5CskdlgLXLkKdPgVQgw';
const GEMINI_KEY = process.env.GEMINI_API_KEY;

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`হাই! Ai_10.0~•×RDS TEAM×•~ এ স্বাগতম! 🔥
এখানে যেকোনো প্রশ্ন লেখো, আমি Gemini দিয়ে উত্তর দেব (সব ফ্রি)!
ওয়েবসাইট: https://ai-10-0.vercel.app`));

bot.on('text', async (ctx) => {
  const message = ctx.message.text;
  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`,
      { contents: [{ parts: [{ text: message }] }] },
      { timeout: 15000 }
    );
    const reply = res.data.candidates?.[0]?.content?.parts?.[0]?.text || "কিছু বলতে পারছি না ভাই...";
    ctx.reply(reply);
  } catch (err) {
    ctx.reply("একটু সমস্যা হচ্ছে, আবার চেষ্টা করো বা ওয়েবসাইটে যাও: https://ai-10-0.vercel.app");
  }
});

bot.launch();
console.log("@Ai10_RDS_Bot চালু হয়েছে!");

app.get('/', (req, res) => res.send('<h1>Ai_10.0 Backend + Telegram Bot LIVE</h1>'));
app.listen(process.env.PORT || 5000);
