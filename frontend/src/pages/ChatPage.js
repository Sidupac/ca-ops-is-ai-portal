import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import '../components/ChatPage.css';

function ChatPage() {
  const [selectedAssistant, setSelectedAssistant] = useState('general');

  return (
    <div className="chat-app">
      <Sidebar
        selectedAssistant={selectedAssistant}
        onSelectAssistant={setSelectedAssistant}
      />
      <ChatWindow assistantId={selectedAssistant} />
    </div>
  );
}

export default ChatPage;
