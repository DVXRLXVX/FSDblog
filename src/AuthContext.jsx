// src/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return localStorage.getItem('myapp_user') || null;
    } catch {
      return null;
    }
  });

  const login = (email) => {
    localStorage.setItem('myapp_user', email);
    setUser(email);
  };

  const logout = () => {
    localStorage.removeItem('myapp_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
