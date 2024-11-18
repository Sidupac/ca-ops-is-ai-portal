
import React, { createContext, useState, useContext } from 'react';

export const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState(null);

  const handleError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  };

  return (
    <ErrorContext.Provider value={{ error, handleError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export const useError = () => useContext(ErrorContext);
