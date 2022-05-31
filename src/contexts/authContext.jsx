import React, { createContext, useMemo, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem('userId')) || null;
  const [userId, setUserId] = useState(initialState);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserId(data);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  const memeizedValue = useMemo(() => ({
    userId,
    logIn,
    logOut,
    getAuthHeader: () => {
      if (userId && userId.token) {
        return { Authorization: `Bearer ${userId.token}` };
      }

      return {};
    },
  }), [userId]);

  return (
    <AuthContext.Provider value={memeizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
