// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css'; // Import global styles

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || 'http://localhost:3000',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <MsalProvider instance={msalInstance}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </MsalProvider>,
  document.getElementById('root')
);

export default App;
