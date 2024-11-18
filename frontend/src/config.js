
export const DEBUG_MODE = true;
export const BYPASS_AUTHENTICATION = true;
export const AUTO_DELETE_UNUSED_CHATS = true;

export const bots = [
  {
    name: 'HR Bot',
    urlname: 'hr-bot',
    greeting: 'How can I assist you today?',
    assistantID: 'sk-hr123',
    endpoint: 'https://api.openai.com/v1/assistants/hr-bot',
    icon: '🧑‍💼',
    groups: ['HR.Access'],
    usageLimit: { maxMessagesPerDay: 50, currentUsage: 0 }
  },
  {
    name: 'IT Support Bot',
    urlname: 'it-support-bot',
    greeting: "Need IT help? I'm here!",
    assistantID: 'sk-it456',
    endpoint: 'https://api.openai.com/v1/assistants/it-bot',
    icon: '💻',
    groups: ['IT.Access'],
    usageLimit: { maxMessagesPerDay: 100, currentUsage: 0 }
  }
];

// Mock data for demo chats and folders
export const demoChats = [
  {
    name: 'Chat with HR Bot',
    botType: 'hr-bot',
    folder: 'HR',
    content: [{ sender: 'bot', text: 'Welcome to HR assistance!' }]
  },
  {
    name: 'Chat with IT Bot',
    botType: 'it-support-bot',
    folder: 'IT',
    content: [{ sender: 'bot', text: 'How can I help you with IT?' }]
  }
];

export const demoFolders = [
  { name: 'HR', color: '#ff6b6b' },
  { name: 'IT', color: '#1f8ef1' }
];

export const trackUsage = (botName) => {
  console.log(`Tracking usage for bot: ${botName}`);
};

export const adminConfig = {
  enableAdminUI: true,
  adminGroups: ['Admin.Access']
};

export const USAGE_LIMIT_WARNING_THRESHOLD = 0.9;
