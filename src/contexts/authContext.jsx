import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setUserId(data);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
        <AuthContext.Provider value ={{ userId, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
