
import React, { useState, useRef } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage }) {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  // Voice-to-text functionality using Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prevInput) => prevInput + ' ' + transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  }

  const handleVoiceInput = () => {
    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recognition.start();
    }
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="message-input-container">
      <div className="icon-container">
        <button className="icon-button" onClick={handleVoiceInput} title="Voice Input">
          {isRecording ? '🛑' : '🎤'}
        </button>
        <button className="icon-button" onClick={handleSendMessage} title="Send message">➤</button>
      </div>
      <textarea
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="message-textarea"
        aria-label="Chat input"
      />
    </div>
  );
}

export default MessageInput;
