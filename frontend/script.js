const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');
const modelSelect = document.getElementById('model');

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.innerHTML = text.replace(/\n/g, '<br>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const message = msgInput.value.trim();
  if (!message) return;

  addMsg(message, 'user');
  msgInput.value = '';
  addMsg('টাইপ করছে...', 'bot');

  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBIegoGvQPgAINM0hHUqNa_Kw6xD6pOH2Y`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: message }] }] })
    });
    const data = await res.json();
    const reply = data.candidates[0].content.parts[0].text;
    chat.lastChild.innerHTML = reply.replace(/\n/g, '<br>');
  } catch (err) {
    chat.lastChild.innerHTML = 'ইন্টারনেট চেক করো বা আবার চেষ্টা করো';
  }
}

msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
