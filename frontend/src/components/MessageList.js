import React from 'react';
import Message from './Message';
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
  );
}

export default MessageList;
