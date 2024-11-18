const axios = require('axios');
const logger = require('../utils/logger');

exports.handleMessage = async (req, res) => {
  const { assistantId, threadId, messages } = req.body;

  // Prepare messages for OpenAI API
  const formattedMessages = messages.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  try {
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: getSystemPrompt(assistantId) },
          ...formattedMessages,
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const assistantReply = response.data.choices[0].message.content;

    // Log the interaction
    logger.logUsage({
      userId: req.headers['user-id'], // You can get the user ID from the request headers if set
      assistantId,
      messages,
      reply: assistantReply,
    });

    res.json({ reply: assistantReply, threadId: threadId || generateThreadId() });
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    res.status(500).json({ error: 'An error occurred while processing your message.' });
  }
};

function getSystemPrompt(assistantId) {
  switch (assistantId) {
    case 'hr':
      return 'You are a helpful HR assistant.';
    case 'it':
      return 'You are a knowledgeable IT support assistant.';
    default:
      return 'You are ChatGPT.';
  }
}

function generateThreadId() {
  return Math.random().toString(36).substring(2, 15);
}
