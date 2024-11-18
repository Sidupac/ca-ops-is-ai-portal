
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bots } from '../config';
import './LandingPage.css';

const LandingPage = () => {
  const [assistants, setAssistants] = useState(bots);
  const navigate = useNavigate();

  const handleStartChat = (bot) => {
    navigate(`/chat/${bot.urlname}`);
  };

  const moveTile = (index, direction) => {
    const newOrder = [...assistants];
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newOrder.length) return;

    [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
    setAssistants(newOrder);
  };

  return (
    <div className="landing-page">
      <h1>Select an Assistant</h1>
      <div className="tiles-container">
        {assistants.map((bot, index) => (
          <div key={bot.urlname} className="assistant-tile">
            <div className="tile-content" onClick={() => handleStartChat(bot)}>
              <span className="icon">{bot.icon}</span>
              <h3>{bot.name}</h3>
              <p>{bot.greeting}</p>
            </div>
            <div className="tile-controls">
              <button onClick={() => moveTile(index, 'left')}>&#9664;</button>
              <button onClick={() => moveTile(index, 'right')}>&#9654;</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
