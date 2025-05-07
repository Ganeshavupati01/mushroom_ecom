import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styles/ShoppingCart.css";
import HomeHeader from "./HomeHeader";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchWishlist = async () => {
        const userRef = doc(db, "users", user.uid);
        try {
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const wishlist = userSnap.data().wishlist || [];
            setWishlistItems(wishlist);
          }
        } catch (error) {
          console.error("Error fetching wishlist:", error);
        }
      };
      fetchWishlist();
    }
  }, [user]);

  const handleAddToCart = async (item) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    try {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const wishlist = data.wishlist || [];
        const cart = data.cart || [];

        // Remove from wishlist
        const updatedWishlist = wishlist.filter((i) => i.id !== item.id);

        // Add to cart
        const existingCartItem = cart.find((i) => i.id === item.id);
        let updatedCart;
        if (existingCartItem) {
          updatedCart = cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updatedCart = [...cart, { ...item, quantity: 1 }];
        }

        await updateDoc(userRef, {
          wishlist: updatedWishlist,
          cart: updatedCart,
        });

        setWishlistItems(updatedWishlist);
      }
    } catch (error) {
      console.error("Error updating cart and wishlist:", error);
    }
  };

  return (
    <>
      <HomeHeader />
      <div className="cart-container">
        <h2 style={{ padding: "10px" }}>My Wishlist</h2>

        <div className="cart-header">
          <div>Product</div>
          <div>Price</div>
          <div>Action</div>
        </div>

        {wishlistItems.length === 0 ? (
          <p style={{ padding: "10px" }}>Your wishlist is empty.</p>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />
                <span>{item.name}</span>
              </div>
              <div>${item.price}</div>
              <div>
                <button
                  className="action-button"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}

        <div className="cart-actions">
          <button className="action-button">Return To Shop</button>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
