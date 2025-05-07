import React, { useEffect, useState } from "react";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebaseConfig"; // Make sure to import your Firestore config
import { doc, getDoc } from "firebase/firestore"; // Firestore functions to fetch data
import Slider from "../components/ImageSlider";

const HomePage = () => {
  const { user, logout } = useAuth(); // Accessing user and logout from AuthContext
  const [userDetails, setUserDetails] = useState(null); // State to hold user details
  const uid = user?.uid; // Get the user's UID
  console.log("User's UID:", uid);

  useEffect(() => {
    if (uid) {
      const fetchUserDetails = async () => {
        try {
          // Get user details from Firestore
          const userDoc = await getDoc(doc(db, "users", uid));

          if (userDoc.exists()) {
            setUserDetails(userDoc.data()); // Set user details to state
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error getting user details: ", error);
        }
      };

      fetchUserDetails();
    }
  }, [uid]); // Run this effect when uid changes

  return (
    <div>
      <HomeHeader />
      <div>
        <Slider />
        <h1>Home Page</h1>
        {user ? (
          <div>
            <p>Welcome, {user.displayName || "User"}</p>
            {userDetails && (
              <div>
                <p>
                  <strong>Name:</strong> {userDetails.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails.email}
                </p>
                <p>
                  <strong>Mobile:</strong> {userDetails.mobile}
                </p>
                <p>
                  <strong>Address:</strong> {userDetails.address}
                </p>
                <p>
                  <strong>Pin Code:</strong> {userDetails.pinCode}
                </p>
              </div>
            )}
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please login to access the dashboard.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
