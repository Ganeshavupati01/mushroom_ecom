import React from "react";
import { Heart, Eye } from "lucide-react";
import { db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styles/item.css";

const Item = ({ id, image, name, price, originalPrice, discount }) => {
  const { user } = useAuth();
  const addToCart = async () => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
  
    const userId = user.uid;
    const userRef = doc(db, "users", userId);
  
    try {
      const userSnap = await getDoc(userRef);
      let cart =
        userSnap.exists() && userSnap.data().cart ? userSnap.data().cart : [];
  
      // Ensure valid item data
      if (!id || !name || !price || !image) {
        console.error("Invalid item data:", { id, name, price, image });
        alert("Invalid item data. Please try again.");
        return;
      }
  
      // Check if item is already in cart
      const itemIndex = cart.findIndex((item) => item.id === id);
  
      if (itemIndex !== -1) {
        // Item already in cart, increase quantity
        cart[itemIndex].quantity += 1;
      } else {
        // Item not in cart, add new item
        cart.push({
          id,
          name,
          price,
          image, // ✅ Add image here
          quantity: 1,
          originalPrice: originalPrice || null,
          discount: discount || null,
        });
      }
  
      // Clean up invalid entries
      cart = cart.filter((item) => item.id && item.name && item.price && item.image);
  
      // Update Firestore
      await updateDoc(userRef, { cart });
      console.log("Cart updated successfully!", cart);
      alert(`${name} added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item. Check console for details.");
    }
  };
  
  const addToWishlist = async () => {
    if (!user) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    const userId = user.uid;
    const userRef = doc(db, "users", userId);

    try {
      const userSnap = await getDoc(userRef);
      let wishlist =
        userSnap.exists() && userSnap.data().wishlist
          ? userSnap.data().wishlist
          : [];

      // Check if item already exists
      const exists = wishlist.some((item) => item.id === id);
      if (exists) {
        alert("Item already in wishlist.");
        return;
      }

      wishlist.push({
        id,
        name,
        price,
        image,
        originalPrice: originalPrice || null,
        discount: discount || null,
      });

      await updateDoc(userRef, { wishlist });
      alert(`${name} added to wishlist!`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Failed to add item to wishlist.");
    }
  };

  return (
    <div className="item-container">
      <div className="item">
        <div className="item-image-container">
          {discount && <span className="discount-badge">-{discount}%</span>}
          <button className="icon-button wishlist" onClick={addToWishlist}>
            <Heart />
          </button>
          <button className="icon-button quick-view">
            <Eye />
          </button>
          <img src={image} alt={name} className="item-image" />
        </div>
        <button className="add-to-cart" onClick={addToCart}>
          Add To Cart
        </button>
      </div>
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <div className="price-container">
          <span className="current-price">${price}</span>
          {originalPrice && (
            <span className="original-price">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Item;
