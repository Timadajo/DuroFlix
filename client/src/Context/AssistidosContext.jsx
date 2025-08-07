import { createContext, useContext, useState } from "react";

const AssistidosContext = createContext();

export const AssistidosProvider = ({ children }) => {
  const [assistidos, setAssistidos] = useState([]);

  const marcarComoAssistido = (filme) => {
    setAssistidos((prev) =>
      prev.some((f) => f.id === filme.id)
        ? prev.filter((f) => f.id !== filme.id)
        : [...prev, filme]
    );
  };

  const isAssistido = (id) => assistidos.some((f) => f.id === id);

  return (
    <AssistidosContext.Provider
      value={{ assistidos, marcarComoAssistido, isAssistido }}
    >
      {children}
    </AssistidosContext.Provider>
  );
};

export const useAssistidos = () => useContext(AssistidosContext);
