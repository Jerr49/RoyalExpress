import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import { ProductProvider } from "./context/ProductContext";
import Login from "./pages/Login";
import { SnackbarProvider } from "notistack";
import PrivateRoute from "./components/PrivateRoute";
import TrackingDetailsPage from "./pages/TrackingDetails";
import TrackingLandingPage from "./TrackingLandingPage";

function App() {
  return (
    <div>
      <ProductProvider>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <Routes>
              {/* Default route: Tracking page */}
              <Route path="/" element={<TrackingLandingPage />} />
              <Route
                path="tracking-details"
                element={<TrackingDetailsPage />}
              />

              {/* Admin route */}
              <Route path="/admin" element={<Login />} />

              {/* Protected Admin route */}
              <Route
                path="/admin/products"
                element={<PrivateRoute element={<AdminPage />} />}
              />
            </Routes>
          </Router>
        </SnackbarProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
