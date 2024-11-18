import React from 'react';
import './Message.css';

function Message({ message }) {
  return (
    <div className={`message ${message.sender}`}>
      <div className="avatar">
        {message.sender === 'assistant' ? '🤖' : '👤'}
      </div>
      <div className="content">
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
