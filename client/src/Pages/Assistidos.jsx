// src/Assistidos.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { getWatchedMovies } from "../apiService";
import { Link } from "react-router-dom";
import "../Styles/Assistidos.css";

const API_BASE_MOVIES = "http://localhost:3000/movies";

const Assistidos = () => {
  const { isLoggedIn } = useAuth();
  const [moviesDetails, setMoviesDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWatchedMoviesDetails() {
      if (!isLoggedIn) {
        setIsLoading(false);
        setMoviesDetails([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        const watchedMovieIds = await getWatchedMovies();
        if (watchedMovieIds.length === 0) {
          setMoviesDetails([]);
          setIsLoading(false);
          return;
        }

        const moviesPromises = watchedMovieIds.map((movieId) =>
          fetch(`${API_BASE_MOVIES}/${movieId}`).then((res) => res.json())
        );
        const details = await Promise.all(moviesPromises);
        setMoviesDetails(details);
      } catch (err) {
        console.error("Erro ao buscar detalhes dos filmes:", err);
        setError("Não foi possível carregar a lista de filmes.");
        setMoviesDetails([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatchedMoviesDetails();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="pagina-lista">
        <h2>
          Você precisa estar logado para ver sua lista de filmes assistidos.
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return <div className="pagina-lista">Carregando filmes...</div>;
  }

  if (error) {
    return <div className="pagina-lista error">{error}</div>;
  }

  if (moviesDetails.length === 0) {
    return (
      <div className="pagina-lista">
        <h2>Sua lista de filmes assistidos está vazia.</h2>
      </div>
    );
  }

  return (
    <div className="pagina-lista">
      <h1 className="Title">Filmes Assistidos</h1>
      <div className="lista-de-filmes">
        {moviesDetails.map((filme) => (
          <Link
            to={`/filme/${filme.id}`}
            key={filme.id}
            className="cartao-filme"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${filme.poster_path}`}
              alt={filme.title}
            />
            <h3>{filme.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Assistidos;
