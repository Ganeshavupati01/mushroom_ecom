import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Item from "./Items";
import Timer from "./Timer";
import "../styles/FlashSales.css";

const Products = ({ items }) => {
  const scrollContainerRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="flash-sales">
      <div className="flash-sales-header">
        <div className="title-container">
          <div className="today-indicator">
            <div className="indicator-bar"></div>
            <span className="today-text">our products</span>
          </div>
          <h2 className="section-title">Explore Our Products</h2>
        </div>
        <div className="navigation-buttons">
          <button className="nav-button" onClick={scrollLeft}>
            <ChevronLeft />
          </button>
          <button className="nav-button" onClick={scrollRight}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        className="items-container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", // 4 items per row
          gap: "20px",
          paddingBottom: "16px",
          maxWidth: "100%",
          overflow: "hidden", // Prevents horizontal scrolling
        }}
        ref={scrollContainerRef}
      >
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>

      <hr style={{ borderColor: "#4e3b31", width: "85%" }} />
    </div>
  );
};

export default Products;
