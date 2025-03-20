import { Outlet, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import TrackingPage from "./pages/TrackingPage";
import Footer from "./pages/Footer"

const TrackingLandingPage = () => {
  return (
    <div>
      <Navbar />
      <TrackingPage />
      <Footer />
      <Outlet />
    </div>
  );
};

export default TrackingLandingPage;
