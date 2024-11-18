
const { bots, DEBUG_MODE } = require('../../frontend/src/config');
const { getUserGroups } = require('./graphService');

// Function to check if the user has access to the requested bot
async function hasAccessToBot(user, botName) {
  if (DEBUG_MODE) {
    console.log('Debug mode enabled, bypassing group checks.');
    return true;
  }

  const botConfig = bots.find(bot => bot.urlname === botName);
  if (!botConfig) return false;

  // Fetch user groups from Azure AD
  const userGroups = await getUserGroups(user);
  console.log('User groups:', userGroups);

  // Check if user belongs to any of the bot's required groups
  return botConfig.groups.some(group => userGroups.includes(group));
}

module.exports = { hasAccessToBot };
