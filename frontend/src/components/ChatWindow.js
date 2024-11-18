
import React, { useEffect, useRef, useState } from 'react';
import './ChatWindow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { demoChats, trackUsage, AUTO_DELETE_UNUSED_CHATS } from '../config';

const ChatWindow = ({ botType }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const { threadId } = useParams();
  const navigate = useNavigate();
  const isChatActive = useRef(false);

  // Load chat history
  useEffect(() => {
    const chat = demoChats.find(chat => chat.botType === botType && chat.name === threadId);
    if (chat) {
      setMessages(chat.content);
    }
  }, [botType, threadId]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    trackUsage(botType);
    setInput('');
    setIsTyping(true);
    isChatActive.current = true; // Mark chat as active

    setTimeout(() => {
      const botResponse = 'I am here to help!';
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleCloseChat = () => {
    if (AUTO_DELETE_UNUSED_CHATS && !isChatActive.current) {
      console.log(`Auto-deleting chat: ${threadId}`);
      // Code to delete the chat from storage can be added here
    }
    navigate('/');
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{threadId}</h3>
        <button className="close-button" onClick={handleCloseChat}>X</button>
      </div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Assistant is typing...</div>}
      </div>
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message... (Ctrl + Enter for new line)"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatWindow;
