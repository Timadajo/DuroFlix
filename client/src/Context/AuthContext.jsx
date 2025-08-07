// src/Context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../apiService.js";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  async function register(email, username, password) {
    try {
      const response = await registerUser(email, username, password);
      setMessage(response.message);
      setError(null);
      await login(email, password);
      return response;
    } catch (err) {
      setError(err.message);
      setMessage(null);
      throw err;
    }
  }

  async function login(email, password) {
    try {
      const response = await loginUser(email, password);
      setUser({ email: response.email, username: response.username });
      setError(null);
      setMessage(response.message);
      navigate('/');
      return response;
    } catch (err) {
      setError(err.message);
      setMessage(null);
      throw err;
    }
  }

  function logout() {
    setUser(null);
    setError(null);
    setMessage(null);
    localStorage.removeItem("access_token");
    navigate('/login');
  }

  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register, error, message }}>
      {children}
    </AuthContext.Provider>
  );
}

// Garante que o hook useAuth seja exportado corretamente
export const useAuth = () => useContext(AuthContext);