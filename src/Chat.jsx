import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setChatLog([...chatLog, { type: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await fetch('https://chatbot-ai-3407.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setChatLog((prev) => [...prev, { type: 'bot', text: data.reply || 'No response' }]);
    } catch {
      setChatLog((prev) => [...prev, { type: 'bot', text: '⚠️ Error connecting to server' }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="chat-wrapper">
      <h2 className="chat-title">Chat with AI</h2>
      <div className="chat-box">
        {chatLog.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing">🟡 AI is typing...</div>}
        <div ref={chatEndRef} />
      </div>
      <div className="input-box">
        <input
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about your career..."
        />
        <button className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
