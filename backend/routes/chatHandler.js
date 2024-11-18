
const express = require('express');
const router = express.Router();
const { hasAccessToBot } = require('../utils/authService');
const { trackUserUsage } = require('../utils/usageService');
const { sanitizeInput } = require('../utils/sanitizationService');
const { bots } = require('../../frontend/src/config');

router.post('/chat/:botName', async (req, res) => {
  const { botName } = req.params;
  const { userId, message } = req.body;

  try {
    // Check if the bot exists
    const botConfig = bots.find(bot => bot.urlname === botName);
    if (!botConfig) {
      return res.status(404).json({ error: 'Bot not found' });
    }

    // Check if the user has access to this bot
    const hasAccess = await hasAccessToBot(userId, botName);
    if (!hasAccess) {
      return res.status(403).json({ error: 'Access denied: You do not have permission to access this assistant.' });
    }

    // Track the user's usage and check if they are close to the limit
    const usageWarning = trackUserUsage(userId, botName);
    if (usageWarning) {
      res.setHeader('X-Usage-Warning', usageWarning);
    }

    // Sanitize the user input before sending it to the assistant
    const { sanitizedText, redactionCount } = sanitizeInput(message);
    console.log(\`Sanitized input for bot \${botName}: \${sanitizedText}\`);

    // Handle the chat request with the sanitized input
    const response = await fetch(botConfig.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: sanitizedText, assistantID: botConfig.assistantID })
    });
    const botResponse = await response.json();

    return res.json({ botResponse, redactions: redactionCount });

  } catch (error) {
    console.error('Error handling chat:', error);
    return res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;
