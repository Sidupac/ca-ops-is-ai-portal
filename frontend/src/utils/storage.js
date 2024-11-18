
// Utility functions for storing and retrieving chat data in localStorage

export const saveChatData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving chat data:', error);
  }
};

export const loadChatData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading chat data:', error);
    return null;
  }
};

export const removeChatData = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing chat data:', error);
  }
};
