import React from "react";
import "../styles/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Exclusive</h3>
        <p>Subscribe</p>
        <p>Get 10% off your first order</p>
        
      </div>

      <div className="footer-section">
        <h3>Support</h3>
        <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
        <p>exclusive@gmail.com</p>
        <p>+88015-88888-9999</p>
      </div>

      <div className="footer-section">
        <h3>Account</h3>
        <ul>
          <li>My Account</li>
          <li>Login / Register</li>
          <li>Cart</li>
          <li>Wishlist</li>
          <li>Shop</li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Quick Link</h3>
        <ul>
          <li>Privacy Policy</li>
          <li>Terms Of Use</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
      </div>

      

      <div className="footer-bottom">
        <p>© Copyright Rimel 2022. All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
