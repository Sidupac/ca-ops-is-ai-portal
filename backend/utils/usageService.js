
const { bots, USAGE_LIMIT_WARNING_THRESHOLD } = require('../../frontend/src/config');

// Usage tracking object (temporary in-memory store for simplicity)
const userUsage = {};

// Function to track and check user usage limits
function trackUserUsage(userId, botName) {
  const botConfig = bots.find(bot => bot.urlname === botName);
  if (!botConfig || !botConfig.usageLimit) return;

  if (!userUsage[userId]) {
    userUsage[userId] = {};
  }
  if (!userUsage[userId][botName]) {
    userUsage[userId][botName] = 0;
  }

  // Increment usage count
  userUsage[userId][botName]++;

  // Check if the user has reached the usage limit
  const usageCount = userUsage[userId][botName];
  const maxMessages = botConfig.usageLimit.maxMessagesPerDay;

  console.log(`User ${userId} has used ${usageCount}/${maxMessages} messages for bot ${botName}`);

  // Return warning if the user is close to the limit
  if (usageCount / maxMessages >= USAGE_LIMIT_WARNING_THRESHOLD) {
    return `Warning: You have used ${usageCount}/${maxMessages} messages today.`;
  }

  return null;
}

module.exports = { trackUserUsage };
