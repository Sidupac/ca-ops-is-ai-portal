
import { DEBUG_MODE } from '../config';

// Configuration for bots with required Azure AD group memberships
export const bots = [
  { 
    name: 'HR Bot', 
    description: 'Ask HR-related questions', 
    icon: '🧑‍💼',
    groups: ['HR.Access', 'All.Access']
  },
  { 
    name: 'IT Support Bot', 
    description: 'Technical support and troubleshooting', 
    icon: '💻',
    groups: ['IT.Access', 'All.Access']
  },
  { 
    name: 'Finance Bot', 
    description: 'Financial queries and reports', 
    icon: '💰',
    groups: ['Finance.Access', 'All.Access']
  },
  { 
    name: 'Operations Bot', 
    description: 'Operations-related assistance', 
    icon: '📊',
    groups: ['Ops.Access', 'All.Access']
  },
];

// Function to filter bots based on user group memberships
export const getAccessibleBots = (userGroups) => {
  if (DEBUG_MODE) {
    console.log("DEBUG MODE ON: Displaying all bots");
    return bots;
  }
  return bots.filter(bot => bot.groups.some(group => userGroups.includes(group)));
};
