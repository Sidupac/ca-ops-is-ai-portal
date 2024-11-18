
const sensitivePatterns = {
  phoneNumber: /(?:\+61|0)[2-478](?:[ -]?\d){8}|(?:\+61|0)4(?:[ -]?\d){8}/g, // Australian phone numbers
  email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, // Email addresses
  address: /(\d{1,4} [\w ]+ (Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Boulevard|Blvd|Drive|Dr|Court|Ct|Place|Pl|Terrace|Terr|Crescent|Cres|Parkway|Pkwy|Square|Sq))/gi // Addresses
};

// Function to sanitize input text by replacing sensitive data with [REDACTED]
function sanitizeInput(text) {
  let redactedText = text;
  let redactionCount = 0;

  for (const [key, pattern] of Object.entries(sensitivePatterns)) {
    const matches = redactedText.match(pattern);
    if (matches) {
      redactedText = redactedText.replace(pattern, '[REDACTED]');
      redactionCount += matches.length;
      console.log(\`Redacted \${matches.length} instances of \${key}\`);
    }
  }
  return { sanitizedText: redactedText, redactionCount };
}

module.exports = { sanitizeInput };
