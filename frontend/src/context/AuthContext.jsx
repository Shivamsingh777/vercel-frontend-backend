// context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => setUser(res.data))
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, [token]);

  const login = newToken => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
