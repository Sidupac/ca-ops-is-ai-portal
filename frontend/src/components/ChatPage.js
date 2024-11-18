
import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { ThemeContext } from '../context/ThemeContext';
import './ChatPage.css';

function ChatPage() {
  const { bot_urlname, thread_id } = useParams(); // Extract URL parameters
  const [selectedAssistant, setSelectedAssistant] = useState(bot_urlname || 'general');
  const [currentThreadId, setCurrentThreadId] = useState(thread_id || null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (bot_urlname && thread_id) {
      // Load existing chat based on URL parameters
      setSelectedAssistant(bot_urlname);
      setCurrentThreadId(thread_id);
    }
  }, [bot_urlname, thread_id]);

  return (
    <div className="chat-app">
      <Sidebar
        selectedAssistant={selectedAssistant}
        onSelectChat={(bot, id) => {
          setSelectedAssistant(bot);
          setCurrentThreadId(id);
        }}
      />
      <ChatWindow threadId={currentThreadId} botType={selectedAssistant} />
    </div>
  );
}

export default ChatPage;
