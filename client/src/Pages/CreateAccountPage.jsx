import React from "react";
import Header from "../components/Header";
import SignupForm from "../components/SignupForm";
import "../styles/createaccount.css";
import mushroom from "../asserts/mushroom.jpg";
import Footer from "../components/Footer";

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
        <SignupForm />
        
      </div>
      <Footer />
    </div>
  );
};

export default CreateAccountPage;

