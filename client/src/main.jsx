import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { FavoritosProvider } from "./Context/FavoritosContext.jsx";
import { AssistidosProvider } from "./Context/AssistidosContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FavoritosProvider>
      <AssistidosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AssistidosProvider>
    </FavoritosProvider>
  </React.StrictMode>
);
