import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Carrossel.css";


const API_BASE = "http://localhost:3000/movies";

export default function CarrosselGenero() {
  const [generos, setGeneros] = useState([]);
  const [filmesPorGenero, setFilmesPorGenero] = useState({});
  const navigate = useNavigate();
  const carrosseisRef = useRef({});

  useEffect(() => {
    fetch(`${API_BASE}/genres`)
      .then((res) => res.json())
      .then((data) => {
        setGeneros(data);
        data.forEach((genero) => {
          fetch(`${API_BASE}/genre/${genero.id}?page=1`)
            .then((res) => res.json())
            .then((filmes) => {
              setFilmesPorGenero((prev) => ({ ...prev, [genero.id]: filmes }));
            });
        });
      });
  }, []);

  const handleClick = (id) => {
    navigate(`/filme/${id}`);
  };

  const scroll = (id, direction) => {
    const container = carrosseisRef.current[id];
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="carrossel-generos">
      {generos.map((genero) => (
        <div key={genero.id} className="genero-bloco">
          <h2 className="titulo-genero">{genero.name}</h2>

          <div className="carrossel-wrapper">
            <button
              className="seta esquerda"
              onClick={() => scroll(genero.id, "left")}
            >
              ◀
            </button>

            <div
              className="carrossel-filmes"
              ref={(el) => (carrosseisRef.current[genero.id] = el)}
            >
              {filmesPorGenero[genero.id]?.map((filme) => (
                <div
                  key={filme.id}
                  className="filme-card"
                  onClick={() => handleClick(filme.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300${filme.poster_path}`}
                    alt={filme.title}
                    className="filme-capa"
                  />
                </div>
              ))}
            </div>

            <button
              className="seta direita"
              onClick={() => scroll(genero.id, "right")}
            >
              ▶
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

