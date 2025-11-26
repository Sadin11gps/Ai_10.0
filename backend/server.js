const express = require('express');
const { Telegraf } = require('telegraf');
const axios = require('axios');

const app = express();
const BOT_TOKEN = '8526094487:AAE_sjiAzkd_C65l5CskdlgLXLkKdPgVQgw';
const GEMINI_KEY = 'AIzaSyBIegoGvQPgAINM0hHUqNa_Kw6xD6pOH2Y';

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply(`হাই! Ai_10.0~•×RDS TEAM×•~ এ স্বাগতম! 🔥
এখানে যেকোনো প্রশ্ন লেখো, আমি Gemini দিয়ে উত্তর দেব (সব ফ্রি)!
ওয়েবসাইট: https://ai-10-0.vercel.app`));

bot.on('text', async (ctx) => {
  try {
    const res = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`, {
      contents: [{ parts: [{ text: ctx.message.text }] }]
    }, { timeout: 20000 });

    const reply = res.data.candidates[0].content.parts[0].text;
    ctx.reply(reply);
  } catch (err) {
    ctx.reply("একটু সমস্যা হচ্ছে, ১ মিনিট পর আবার চেষ্টা করো 😊");
  }
});

bot.launch();
console.log("@Ai10_RDS_Bot ১০০% লাইভ!");

app.get('/', (req, res) => res.send('<h1>Ai_10.0 Bot LIVE</h1>'));
app.listen(process.env.PORT || 5000);
