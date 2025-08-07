// src/components/Cadastrar.jsx
import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx"; // <-- Importa o contexto
import "../Styles/Cadastrar.css";

const Cadastrar = () => {
  const { register, error } = useAuth(); // <-- Pega a função de register e o erro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // <-- Adicionado estado para o nome de usuário
  const [message, setMessage] = useState(""); // <-- Adicionado estado para mensagem de sucesso

  async function handleSubmit(e) { // <-- Agora é uma função assíncrona
    e.preventDefault();
    setMessage(""); // Limpa a mensagem anterior

    try {
      const response = await register(email, username, password);
      setMessage(response.message);
    } catch (err) {
      // O erro é tratado no contexto, mas você pode adicionar uma lógica aqui se precisar
    }
  }

  return (
    <div className="pagina-total-cadastrar">
      <form onSubmit={handleSubmit} className="container-cadastrar">
        <h1 className="title-cadastrar">Cadastro</h1>
        <div className="col-md-6">
          <label htmlFor="inputEmail4" className="label-cadastrar">
            Email
          </label>
          <input
            type="email"
            className="input-cadastrar"
            id="inputEmail4"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="label-cadastrar">
            Senha
          </label>
          <input
            type="password"
            className="input-cadastrar"
            id="inputPassword4"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="label-cadastrar">
            Nome
          </label>
          <input
            type="text"
            className="input-cadastrar"
            id="inputAddress"
            placeholder="Nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn-cadastrar">
            Cadastrar
          </button>
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Cadastrar;