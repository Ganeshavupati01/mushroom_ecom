import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/signupform.css";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if the user is already in Firestore, otherwise add them
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // Add user information to Firestore
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          orders: [], // Other fields as needed
        });

        alert("Google Sign-in successful and user data saved!");
      } else {
        alert("Google Sign-in successful! User already exists.");
      }

      navigate("/home");
    } catch (error) {
      console.error("Error with Google Sign-in:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    try {
      console.log("Attempting login with:", email, password);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("UserCredential:", userCredential);

      const user = userCredential.user;
      console.log("User:", user);

      // Skip email verification for now to troubleshoot
      // if (!user.emailVerified) {
      //   alert("Please verify your email before logging in.");
      //   return;
      // }

      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      console.error("Firebase Error:", error);

      if (error.code === "auth/invalid-credential") {
        alert("Invalid email or password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        alert("No user found with this email.");
      } else {
        alert("An error occurred: " + error.message);
      }
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login to your account</h2>
      <form className="form" onSubmit={handleLogin}>
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
        <button type="submit" className="form-button">
          Log In
        </button>
      </form>
      <button
        type="button"
        className="google-button"
        onClick={handleGoogleLogin}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          alt="Google Logo"
          className="google-logo"
        />
        Sign up with Google
      </button>
      <p className="signup-text">
        Don't have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/signup")}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default LoginForm;
