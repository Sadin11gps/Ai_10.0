const chat = document.getElementById('chat');
const msgInput = document.getElementById('msg');
const keyInput = document.getElementById('key');
const modelSelect = document.getElementById('model');

function addMsg(text, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const message = msgInput.value.trim();
  const apiKey = keyInput.value.trim();
  const model = modelSelect.value;

  if (!message) return alert("মেসেজ লেখো ভাই!");

  addMsg(message, 'user');
  msgInput.value = '';

  const res = await fetch('https://ai-10-0-backend.onrender.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, model, apiKey })
  });

  const data = await res.json();
  addMsg(data.reply || data.error, 'bot');
}

msgInput.addEventListener('keypress', e => { if (e.key === 'Enter') send(); });
