// src/components/LoginForm.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
import { useState } from "react";
import "../Styles/Login.css";

function LoginForm() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
 

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await login(email, password); 
    } catch (err) {
      
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="pagina-total-login">
      <div className="container-login">
        <form onSubmit={handleSubmit}>
          <h1 className="title-login">Login</h1>

          <div className="mb-2 ">
            <div className="input-box">
              <input
                type="email"
                className="login-input"
                placeholder="E-mail"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-2 h-25">
            <div className="input-box">
              <input
                type="password"
                className="login-input"
                placeholder="Senha"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>


          <button type="submit" className="login-button">
            Entrar
          </button>
          <div>
            <NavLink to="/Cadastrar" className="login-cadastro-link">
              Não tem uma conta? Cadastre-se!
            </NavLink>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>} {/* <-- Mostra o erro aqui */}
      </div>
    </div>
  );
}

export default LoginForm;