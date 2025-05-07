import React from "react";
import Header from "../components/Header";
import FlashSales from "../components/FlashSales";
import BestSeller from "../components/BestSeller";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/Home.css";
import M1 from "../asserts/m1.jpg";
import M3 from "../asserts/m3.jpeg";
import M5 from "../asserts/m5.jpeg";
import M2 from "../asserts/m2.jpg";
import Products from "../components/Products";
import Silder from "../components/ImageSlider";
import ServiceFeatures from "../components/ServiceFeatures";
const flashSaleItems = [
  {
    id: 1,
    image: M1,
    name: "HAVIT HV-G92 Gamepad",
    price: 120,
    originalPrice: 160,
    discount: 40,
    rating: 4.5,
    reviews: 88,
  },
  {
    id: 2,
    image: M2,
    name: "AK-900 Wired Keyboard",
    price: 960,
    originalPrice: 1160,
    discount: 35,
    rating: 4,
    reviews: 75,
  },
  {
    id: 3,
    image: M3,
    name: "IPS LCD Gaming Monitor",
    price: 370,
    originalPrice: 400,
    discount: 30,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 4,
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 5,
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 6,
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 6,
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
  {
    id: 7,
    image: M5,
    name: "S-Series Comfort Chair",
    price: 375,
    originalPrice: 400,
    discount: 25,
    rating: 4.5,
    reviews: 99,
  },
];

const Home = () => {
  return (
    <div className="home">
      <HomeHeader />
      <Silder />
      <FlashSales items={flashSaleItems} />
      <BestSeller items={flashSaleItems} />
      <Products items={flashSaleItems} />
      <ServiceFeatures />
      <Footer />
    </div>
  );
};

export default Home;
