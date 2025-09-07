import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  // Hydrate session on refresh
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setAuthLoading(false);
      return;
    }
    fetch('http://localhost:5000/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Unauthenticated');
        return res.json();
      })
      .then((me) => {
        setUser({ ...me, token });
      })
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setAuthLoading(false));
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authAPI.login({ email, password });
      const userData = { ...data.user, token: data.token };
      setUser(userData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      throw new Error(error.message || 'Invalid credentials');
    }
  };

  const register = async (email, password) => {
    try {
      const data = await authAPI.register({ email, password });
      const userData = { ...data.user, token: data.token };
      setUser(userData);
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}