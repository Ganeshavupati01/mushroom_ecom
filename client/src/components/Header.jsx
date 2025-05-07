import React from "react";
import "../styles/header.css";
import { Search } from "lucide-react";

const styles = {
  nav: {
    padding: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#E8D8C3",
    borderBottom: "1px solid black",
  },
  navLinks: {
    display: "flex",
    gap: "39px",
    flex: 1,
    justifyContent: "center",
  },
  navLink: { textDecoration: "none", color: "black", transition: "color 0.3s" },
  searchContainer: { position: "relative", marginLeft: "auto" },
  searchInput: {
    paddingLeft: "16px",
    paddingRight: "40px",
    paddingTop: "10px",
    paddingBottom: "10px",
    borderRadius: "6px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    marginRight: "220px",
    fontSize: "14px",
  },
  searchIcon: {
    position: "absolute",
    right: "9px",
    top: "10px",
    width: "20px",
    height: "20px",
    color: "black",
    marginRight: "220px",
  },
  logo: {
    fontSize: "34px",
    fontWeight: "bold",
    marginLeft: "200px", // Moves Exclusive left
  },
};

const Header = () => {
  return (
    <div>
    <div className="base">Mushrooms</div>
    <nav style={styles.nav}>
      
      <div style={styles.logo}>Exclusive</div>
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink}>
          Home
        </a>
        <a href="#" style={styles.navLink}>
          Contact
        </a>
        <a href="#" style={styles.navLink}>
          About
        </a>
        <a href="#" style={styles.navLink}>
          Sign Up
        </a>
      </div>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="What are you looking for?"
          style={styles.searchInput}
        />
        <Search style={styles.searchIcon} />
      </div>
    </nav>
    </div>
  );
};

export default Header;
