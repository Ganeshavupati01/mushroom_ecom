import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext"; // Import AuthProvider
import CreateAccountPage from "./Pages/CreateAccountPage";
import LoginAccountPage from "./Pages/LoginAccountPage";
import ShoppingCart from "./components/ShoppingCart";
import ContactForm from "./Pages/ContactForm";
import Home from "./Pages/Home";
import EditProfile from "./Pages/EditProfile";
import Wishlist from "./components/Wishlist";
import Orders from "./components/Orders";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<CreateAccountPage />} />
          <Route path="/login" element={<LoginAccountPage />} />
          <Route path="/signup" element={<CreateAccountPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <ShoppingCart /> {/* Add CartPage */}
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactForm /> {/* Add CartPage */}
              </PrivateRoute>
            }
          />
          <Route
            path="/wish"
            element={
              <PrivateRoute>
                <Wishlist /> {/* Add CartPage */}
              </PrivateRoute>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route
            path="/editprofile"
            element={
              <PrivateRoute>
                <EditProfile /> {/* Add CartPage */}
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ✅ Fix: Return {children} instead of <HomePage />
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user);
  return user ? children : <Navigate to="/login" />;
};

export default App;
