import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../Styles/Carrossel.css";

const CarrosselManual = ({ children }) => {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="carrossel-wrapper">
      <button className="seta-carrossel esquerda" onClick={() => scroll(-300)}>
        <FaChevronLeft />
      </button>

      <div className="scroll-carrossel" ref={scrollRef}>
        {children}
      </div>

      <button className="seta-carrossel direita" onClick={() => scroll(300)}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default CarrosselManual;

// import "../Styles/Carrossel.css";

// const CarrosselManual = ({ children }) => {
//   return <div className="scroll-carrossel">{children}</div>;
// };

// export default CarrosselManual;
