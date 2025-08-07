import React, { useState, useEffect } from "react";
import "../Styles/Catalogo.css";
import CapaFilme from "../Components/Moldura";

const API_BASE = "http://localhost:3000/movies";

export default function Catalogos() {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [filmes, setFilmes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    // Carrega gêneros uma vez
    fetch(`${API_BASE}/genres`)
      .then((res) => res.json())
      .then((data) => setGeneros(data))
      .catch((err) => console.error("Erro ao carregar gêneros:", err));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, selectedGenre]);

  useEffect(() => {
    carregarFilmes(page, search, selectedGenre);
  }, [page, search, selectedGenre]);

  const carregarFilmes = async (pagina, query, genreId) => {
    setLoading(true);
    try {
      let url = "";

      const temQuery = query.trim() !== "";
      const temGenero = genreId !== "";

      if (temQuery && temGenero) {
        url = `${API_BASE}/advanced-find?query=${encodeURIComponent(
          query
        )}&genre=${genreId}&page=${pagina}`;
      } else if (temQuery) {
        url = `${API_BASE}/search?query=${encodeURIComponent(
          query
        )}&page=${pagina}`;
      } else if (temGenero) {
        url = `${API_BASE}/genre/${genreId}?page=${pagina}`;
      } else {
        url = `${API_BASE}/popular?page=${pagina}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Erro na requisição: ${res.statusText}`);
      }
      const data = await res.json();

      setFilmes((prev) =>
        pagina === 1
          ? data
          : [
              ...prev,
              ...data.filter(
                (novo) => !prev.some((existente) => existente.id === novo.id)
              ),
            ]
      );
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="Title">Catálogo de Filmes</h1>

      <div className="filtro-container">
        <div className="dropdown-custom">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="dropdown-button"
          >
            {selectedGenre
              ? generos.find((g) => g.id === parseInt(selectedGenre))?.name
              : "Selecionar gênero"}
          </button>
          {dropdownOpen && (
            <ul className="dropdown-list">
              <li onClick={() => setSelectedGenre("")}>Todos os gêneros</li>
              {generos.map((g) => (
                <li key={g.id} onClick={() => setSelectedGenre(String(g.id))}>
                  {g.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="text"
          className="search-input"
          placeholder="Buscar por título"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filmes-container">
        {filmes.map((f) => (
          <CapaFilme
            key={f.id}
            imagem={`https://image.tmdb.org/t/p/w300${f.poster_path}`}
            id={f.id}
          />
        ))}
      </div>

      <div className="paginacao-container">
        <button
          className="botao-proxima-pagina"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading || filmes.length === 0}
        >
          {loading ? "Carregando..." : "Carregar Mais"}
        </button>
      </div>
    </>
  );
}
