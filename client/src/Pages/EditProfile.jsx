import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Firestore config
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import "../styles/EditProfile.css"; // Import the CSS file

const EditProfile = () => {
  const { user } = useAuth(); // Get logged-in user
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch user data from Firestore
  useEffect(() => {
    if (user?.uid) {
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData((prev) => ({ ...prev, ...userDoc.data() }));
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!user?.uid) return;

    setLoading(true);

    try {
      const updatedData = {
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile,
        address: userData.address,
      };

      // Update Firestore user document
      await updateDoc(doc(db, "users", user.uid), updatedData);
      console.log("User profile updated in Firestore ✅");

      // Handle Password Update if provided
      if (userData.newPassword && userData.confirmNewPassword) {
        if (userData.newPassword !== userData.confirmNewPassword) {
          alert("New passwords do not match!");
          setLoading(false);
          return;
        }

        // Reauthenticate user before updating password
        if (userData.currentPassword) {
          const credential = EmailAuthProvider.credential(
            user.email,
            userData.currentPassword
          );
          await reauthenticateWithCredential(user, credential);
          console.log("User reauthenticated successfully ✅");
        }

        // Update password in Firebase Auth
        await updatePassword(user, userData.newPassword);
        console.log("Password updated successfully ✅");
        alert("Password updated successfully!");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Check password or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mainWrapper">
      <HomeHeader />
      <div className="container">
        <div className="sidebar">
          <div className="sectionTitle">Manage My Account</div>
          <div className="menuItem activeMenuItem">My Profile</div>
          <div className="menuItem">Address Book</div>
          <div className="menuItem">My Payment Options</div>

          <div className="sectionTitle">My Orders</div>
          <div className="menuItem">My Returns</div>
          <div className="menuItem">My Cancellations</div>

          <div className="sectionTitle">My Wishlist</div>
        </div>

        {/* Profile Edit Form */}
        <div className="profileContainer">
          <div className="title">Edit Your Profile</div>

          <div className="formGroup">
            <div className="inputGroup">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label className="label">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={userData.mobileNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          <div className="formGroup">
            <div className="inputGroup">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="input"
              />
            </div>
            <div className="inputGroup">
              <label className="label">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                value={userData.mobile}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          <div className="formGroup">
            <div className="inputGroup">
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          {/* Password Section */}
          <div className="passwordSection">
            <div className="passwordTitle">Password Changes</div>
            <div className="formGroup">
              <div className="inputGroup">
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Current Password (required for update)"
                  value={userData.currentPassword}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="formGroup">
              <div className="inputGroup">
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={userData.newPassword}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
            <div className="formGroup">
              <div className="inputGroup">
                <input
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  value={userData.confirmNewPassword}
                  onChange={handleInputChange}
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="buttonContainer">
            <button className="cancelButton" disabled={loading}>
              Cancel
            </button>
            <button
              className="saveButton"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;
