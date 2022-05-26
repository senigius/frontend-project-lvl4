import React, { createContext, useState } from 'react';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const logIn = (data) => {
    localStorage.setItem('userId', JSON.stringify(data));
    setLogged(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    setLogged(false);
  };

  return (
        <AuthContext.Provider value ={{ logged, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
