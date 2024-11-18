module.exports = (req, res, next) => {
    if (req.body.messages) {
      req.body.messages = req.body.messages.map((msg) => ({
        ...msg,
        text: sanitizeMessage(msg.text),
      }));
    }
    next();
  };
  
  function sanitizeMessage(text) {
    let sanitizedText = text;
  
    // Remove email addresses
    sanitizedText = sanitizedText.replace(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
      '[email removed]'
    );
  
    // Remove phone numbers
    sanitizedText = sanitizedText.replace(
      /(\+?\d{1,3}[-.\s]?(\d{2,3}[-.\s]?){2,4}\d{2,4})/g,
      '[phone number removed]'
    );
  
    return sanitizedText;
  }
  