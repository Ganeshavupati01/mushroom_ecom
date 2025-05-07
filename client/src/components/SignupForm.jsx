import React, { useState } from "react";
import "../styles/signupform.css";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ✅ Step 2: Store user details in Firestore
      await setDoc(doc(collection(db, "users"), user.uid), {
        name,
        email,
        mobile,
        pinCode,
        password,
        address,
        cart: [],
        orders: [], // Empty array for ordered items
        uid: user.uid, // Storing UID for reference
      });

      alert("Account successfully created! Please verify your email.");

      // ✅ Step 3: Clear form fields
      setName("");
      setEmail("");
      setPassword("");
      setMobile("");
      setPinCode("");
      setAddress("");

      // ✅ Step 4: Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create an account</h2>
      <p className="form-subtitle">Enter your details below</p>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Mobile Number"
          className="form-input"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Pin Code"
          className="form-input"
          value={pinCode}
          onChange={(e) => setPinCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="form-input"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <button type="submit" className="form-button">
          Sign Up
        </button>

        <p className="login-text">
          Already have an account?{" "}
          <span className="login-link" onClick={() => navigate("/login")}>
            Log in
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
