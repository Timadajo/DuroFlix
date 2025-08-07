import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Styles/Carrossel.css";

const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow prev-arrow" onClick={onClick}>
    <FaChevronLeft />
  </div>
);

const NextArrow = ({ onClick }) => (
  <div className="custom-arrow next-arrow" onClick={onClick}>
    <FaChevronRight />
  </div>
);

const CarrosselFilmes = ({ titulo, filmes }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 7,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 6, slidesToScroll: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4, slidesToScroll: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="carrossel-container">
      <h2>{titulo}</h2>
      <Slider {...settings}>
        {filmes.map((filme) => (
          <div key={filme.id} className="card-filme">
            <Link to={`/filme/${filme.id}`}>
              <img
                src={filme.capa}
                alt={filme.titulo}
                className="filme-img"
                onError={(e) => (e.target.src = "/fallback.jpg")}
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarrosselFilmes;
