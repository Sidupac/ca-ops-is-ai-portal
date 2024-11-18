import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedUser from "./utils/AuthenticatedUser";
import { useTheme } from './context/ThemeContext';
import { msalInstance } from "./utils/msalConfig";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        console.log("Initializing MSAL...");
        await msalInstance.initialize();

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("code") || urlParams.has("state")) {
          const response = await msalInstance.handleRedirectPromise();
          if (response) {
            console.log("Login successful, access token:", response.accessToken);
          } else {
            console.warn("No redirect response found.");
          }
        }
        setIsInitialized(true);
      } catch (error) {
        console.error("Error handling redirect response:", error);
        setAuthError(`Authentication Error: ${error.message}`);
      }
      setIsMounted(true);
    };

    initializeMsal();
  }, []);

  if (authError) return <div className="error-message">{authError}</div>;
  if (!isMounted || !isInitialized) return <div>Loading...</div>;

  const { toggleTheme } = useTheme();

  return (
    <Router>
      <div className="app-container">
        <button className="theme-toggle-btn" onClick={toggleTheme}>Toggle Theme</button>
        <Routes>
          <Route path="/*" element={<AuthenticatedUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
