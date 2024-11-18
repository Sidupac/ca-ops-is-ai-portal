import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import LandingPage from './components/LandingPage';
import { saveChatData, loadChatData } from './utils/storage';
import './App.css';

const AppLayout = ({ user }) => {
  const [selectedBot, setSelectedBot] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load saved data from local storage
  useEffect(() => {
    const savedBot = loadChatData('selectedBot');
    const savedChat = loadChatData('selectedChat');
    const savedMessages = loadChatData('messages');
    setSelectedBot(savedBot);
    setSelectedChat(savedChat);
    setMessages(savedMessages || []);
  }, []);

  // Handle bot selection and navigate to chat window
  const handleSelectBot = (botName) => {
    setSelectedBot(botName);
    saveChatData('selectedBot', botName);
    navigate("/chat"); // Navigate to the chat window route
  };

  return (
    <div className="app-layout">
      {/* Sidebar on the left */}
      <Sidebar 
        selectedBot={selectedBot} 
        setSelectedBot={setSelectedBot}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        messages={messages}
        setMessages={setMessages}
      />

      {/* Main content on the right */}
      <div className="main-content">
        {location.pathname === "/" ? (
          <LandingPage user={user} onSelectBot={handleSelectBot} />
        ) : (
          selectedBot && (
            <ChatWindow 
              selectedBot={selectedBot}
              selectedChat={selectedChat}
              messages={messages}
              setMessages={setMessages}
            />
          )
        )}
      </div>
    </div>
  );
};

export default AppLayout;
