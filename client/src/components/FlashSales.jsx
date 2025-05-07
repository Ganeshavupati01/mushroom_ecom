import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Item from "./Items";
import Timer from "./Timer";
import "../styles/FlashSales.css";

const FlashSales = ({ items }) => {
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
            <span className="today-text">Today's</span>
          </div>
          <h2 className="section-title">Flash Sales</h2>
        </div>
        <Timer className="timer" endTime={new Date().getTime() + 360000000} />
        <div className="navigation-buttons">
          <button className="nav-button" onClick={scrollLeft}>
            <ChevronLeft />
          </button>
          <button className="nav-button" onClick={scrollRight}>
            <ChevronRight />
          </button>
        </div>
      </div>
      <div className="items-container" ref={scrollContainerRef}>
        {items.map((item, index) => (
          <Item key={index} {...item} />
        ))}
      </div>

      <hr style={{ borderColor: "#4e3b31", width: "85%" }} />
    </div>
  );
};

export default FlashSales;
