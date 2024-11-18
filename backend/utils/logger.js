const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/usage.log');

exports.logUsage = (data) => {
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(data)}\n`;
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) console.error('Logging error:', err);
  });
};
