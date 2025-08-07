// src/Filme.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFavoritos } from "../Context/FavoritosContext";
import { useAuth } from "../Context/AuthContext";
import {
  addWatchedMovie,
  removeWatchedMovie,
  checkIfWatched,
} from "../apiService";
import "../Styles/Filme.css";

const API_BASE = "http://localhost:3000/movies";

export default function Filme() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [isAssistido, setIsAssistido] = useState(false);
  const [message, setMessage] = useState(null);

  const { isLoggedIn } = useAuth();
  const { toggleFavorito, isFavorito } = useFavoritos();

  useEffect(() => {
    fetch(`${API_BASE}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFilme(data);
      })
      .catch((err) => console.error("Erro ao buscar filme:", err));
  }, [id]);

  useEffect(() => {
    async function getStatus() {
      if (isLoggedIn && filme) {
        try {
          const status = await checkIfWatched(filme.id);
          setIsAssistido(status.isWatched);
        } catch (err) {
          setMessage(`Erro ao verificar o status: ${err.message}`);
        }
      }
    }
    getStatus();
  }, [isLoggedIn, filme]);

  if (!filme) return <div>Carregando...</div>;

  const handleMarcarAssistido = async () => {
    setMessage(null);
    if (!isLoggedIn) {
      setMessage(
        "Você precisa estar logado para marcar um filme como assistido."
      );
      return;
    }

    try {
      if (isAssistido) {
        await removeWatchedMovie(filme.id);
        setMessage("Filme removido da sua lista.");
      } else {
        await addWatchedMovie(filme.id);
        setMessage("Filme adicionado à sua lista.");
      }
      setIsAssistido(!isAssistido);
    } catch (error) {
      setMessage(`Erro: ${error.message}`);
    }
  };

  const anoLancamento = filme.release_date
    ? new Date(filme.release_date).getFullYear()
    : "N/A";
  const generos = filme.genres
    ? filme.genres.map((g) => g.name).join(", ")
    : "N/A";
  const duracao = filme.runtime ? `${filme.runtime} min` : "N/A";
  const nacionalidade = filme.production_countries
    ? filme.production_countries.map((c) => c.name).join(", ")
    : "N/A";
  const nota = filme.vote_average ? filme.vote_average.toFixed(1) : "N/A";
  const classificacaoEtaria = filme.classificacaoEtaria || "N/A";

  const provedoresStreaming =
    filme.ondeAssistir?.streaming?.map((p) => p.provider_name).join(", ") ||
    "N/A";
  const provedoresAluguel =
    filme.ondeAssistir?.aluguel?.map((p) => p.provider_name).join(", ") ||
    "N/A";
  const provedoresCompra =
    filme.ondeAssistir?.compra?.map((p) => p.provider_name).join(", ") || "N/A";

  return (
    <div className="containerFilme">
      <div className="coluna-esquerda">
        <h1>{filme.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
          alt={filme.title}
        />
      </div>

      <div className="coluna-direita">
        <h3>Gêneros: {generos}</h3>
        <h3>Duração: {duracao}</h3>
        <h3>Ano Lançamento: {anoLancamento}</h3>
        <h3>Nacionalidade: {nacionalidade}</h3>
        <h3>Classificação: {classificacaoEtaria}</h3>
        <h3>Nota: {nota}</h3>
        <h3>Onde Assistir (Streaming): {provedoresStreaming}</h3>
        <h3>Onde Assistir (Alugar): {provedoresAluguel}</h3>
        <h3>Onde Assistir (Comprar): {provedoresCompra}</h3>
        <h3>Sinopse: {filme.overview}</h3>

        {message && <h2 className="status-message">{message}</h2>}

        <div className="botoes-filme">
          <button onClick={handleMarcarAssistido}>
            {isAssistido ? "✓ Assistido" : "Assistido"}
          </button>
        </div>
      </div>
    </div>
  );
}
