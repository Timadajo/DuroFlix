import React from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import "../Styles/Conta.css";
import { NavLink } from "react-router-dom";

function Conta() {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <div className="Conta">
        {isLoggedIn ? (
          <div>
            <h5>Sua Conta</h5>
          </div>
        ) : (
          "Logue para acessar sua conta"
        )}
      </div>
      <div>
        {isLoggedIn ? (
          <>
            <div className="Usuario">
              <h2 className="ContaTexto">Algo</h2>
              <NavLink to="/Login" className="nav logout">
                {isLoggedIn ? "Sair" : "Entrar"}
              </NavLink>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Conta;
