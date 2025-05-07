import React from "react";
import Header from "../components/Header";
import "../styles/createaccount.css";
import mushroom from "../asserts/mushroom.jpg";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const CreateAccountPage = () => {
  return (
    <div>
      <Header />

      <div className="main-container">
        <div className="image-container">
          <img
            src={mushroom} // Replace with your shopping cart image
            alt="Shopping Cart"
            className="shopping-cart-image"
          />
        </div>
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};
export default CreateAccountPage;
