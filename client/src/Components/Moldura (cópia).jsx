import React, { useRef } from "react";
import "../Styles/App.css";
import { useNavigate } from "react-router-dom";

export default function CapaFilme({ imagem, id }) {
  const navigate = useNavigate();
  const dragging = useRef(false);

  const handleMouseDown = () => {
    dragging.current = false;
  };

  const handleMouseMove = () => {
    dragging.current = true;
  };

  const handleClick = () => {
    if (!dragging.current) {
      navigate(`/filme/${id}`);
    }
  };

  return (
    <div
      className="moldura"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={imagem}
        alt="Capa do filme"
        className="capa"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />
    </div>
  );
}
