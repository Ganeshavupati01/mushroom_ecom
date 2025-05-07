import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import HomeHeader from "./HomeHeader";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // run once on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(
        userRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setOrders(data.orders || []);
          } else {
            console.warn("No such document for user:", user.uid);
          }
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        }
      );
      return () => unsubscribe();
    } else {
      console.warn("No user logged in.");
      setLoading(false);
    }
  }, [user]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch {
      return "Invalid date";
    }
  };

  return (
    <div style={{ backgroundColor: "#e8d8c3", minHeight: "100vh" }}>
      <HomeHeader />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "16px", color: "#333", fontWeight: "500" }}>My Orders</h2>

        {loading ? (
          <p style={{ textAlign: "center", padding: "30px 0" }}>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p style={{ textAlign: "center", padding: "30px 0", background: "#f5f5f5", borderRadius: "6px" }}>
            No orders found.
          </p>
        ) : (
          <div>
            {orders.map((order, orderIndex) => (
              <div key={orderIndex} style={{ marginBottom: "35px" }}>
                {/* Header row with column titles */}
                <div style={{ 
                  backgroundColor: "#fff", 
                  padding: "15px",
                  display: "grid",
                  gridTemplateColumns: "40% 20% 20% 20%",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom:"15px",
                  borderRadius: "0",
                  borderTop: "2px solid #4e3b31"
                }}>
                  <div>Product</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div style={{ textAlign: "right" }}>Subtotal</div>
                </div>

                {/* Order items as separate cards */}
                {order.items?.map((item, itemIndex) => (
                  <div key={itemIndex} style={{ 
                    backgroundColor: "#fff", 
                    marginTop: "10px",
                    padding: "10px",
                    display: "grid",
                    gridTemplateColumns: "40% 20% 20% 20%",
                    alignItems: "center",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                    borderRadius: "0"
                  }}>
                    {/* Product column */}
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{
                        width: "80px",
                        height: "60px",
                        border: "2px solid #eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "15px",
                        overflow: "hidden"
                      }}>
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "40px", height: "40px", background: "#ddd" }}></div>
                        )}
                      </div>
                      <div>
                        <h4 style={{ 
                          fontSize: "16px", 
                          fontWeight: "500", 
                          color: "#333", 
                          margin: "0",
                          paddingRight: "10px"
                        }}>
                          {item.name || "Item"}
                        </h4>
                      </div>
                    </div>

                    {/* Price column */}
                    <div style={{ fontSize: "16px" }}>
                      ₹{item.price || 0}
                    </div>

                    {/* Quantity column */}
                    <div>
                      <div style={{
                        display: "inline-block",
                        padding: "5px 15px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px",
                        textAlign: "center",
                        width: "30px",
                        backgroundColor: "white"
                      }}>
                        {item.quantity || 1}
                      </div>
                    </div>

                    {/* Subtotal column */}
                    <div style={{ 
                      fontWeight: "600", 
                      fontSize: "16px",
                      textAlign: "right"
                    }}>
                      ₹{(item.price || 0) * (item.quantity || 1)}
                    </div>
                  </div>
                ))}

                {/* Order details footer */}
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "15px",
                  marginTop:"10px",
                  backgroundColor: "#f9f9f9",
                  borderBottom: "2px solid #4e3b31"
                }}>
                  <div>
                    <div><strong>Order ID:</strong> {order.orderId || `#${orderIndex + 1}`}</div>
                    <div><strong>Date:</strong> {formatDate(order.date)}</div>
                  </div>
                  {order.total && (
                    <div style={{ fontWeight: "600", fontSize: "18px" }}>
                      <strong>Total:</strong> ₹{order.total}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;