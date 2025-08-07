import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavoritos } from "../Context/FavoritosContext";
import { useAssistidos } from "../Context/AssistidosContext";
import "../Styles/Filme.css";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);

  const { toggleFavorito, isFavorito } = useFavoritos();
  const { marcarComoAssistido, isAssistido } = useAssistidos();

  useEffect(() => {
    fetch("/banco_de_filmes.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((f) => f.id === parseInt(id));
        setFilme(encontrado);
      })
      .catch((err) => console.error("Erro ao buscar filme:", err));
  }, [id]);

  if (!filme) return <div>Carregando...</div>;

  return (
    <div className="containerFilme">
      <div className="coluna-esquerda">
        <h1>{filme.titulo}</h1>
        <img src={filme.capa} alt={filme.titulo} />
      </div>

      <div className="coluna-direita">
        <h3>Gênero: {filme.genero}</h3>
        <h3>Duração: {filme.duracao_min} min</h3>
        <h3>Ano Lançamento: {filme.ano_lancamento}</h3>
        <h3>Plataformas: {filme.plataformas.join(", ")}</h3>
        <h3>Nacionalidade: {filme.nacionalidade}</h3>
        <h3>Classificação: {filme.classificacao_etaria}</h3>
        <h3>Sinopse: {filme.sinopse}</h3>

        {/* Botões abaixo das informações */}
        <div className="botoes-filme">
          <button
            onClick={() => toggleFavorito(filme)}
            className={isFavorito(filme.id) ? "ativo" : ""}
          >
            {isFavorito(filme.id) ? "★ Favorito" : "☆ Favoritar"}
          </button>

          <button
            onClick={() => marcarComoAssistido(filme)}
            className={isAssistido(filme.id) ? "ativo" : ""}
          >
            {isAssistido(filme.id) ? "✓ Assistido" : "Assistir"}
          </button>
        </div>
      </div>
    </div>
  );
}
