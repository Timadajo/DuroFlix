import { createContext, useContext, useState } from "react";

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  const toggleFavorito = (filme) => {
    setFavoritos((prev) =>
      prev.some((f) => f.id === filme.id)
        ? prev.filter((f) => f.id !== filme.id)
        : [...prev, filme]
    );
  };

  const isFavorito = (id) => favoritos.some((f) => f.id === id);

  return (
    <FavoritosContext.Provider
      value={{ favoritos, toggleFavorito, isFavorito }}
    >
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => useContext(FavoritosContext);
