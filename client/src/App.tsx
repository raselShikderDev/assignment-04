import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./apps/custom_components/NavBar";
import Footer from "./apps/custom_components/Footer";

function App() {
  const location = useLocation();
  if (location.pathname === "/") {
    return <Navigate to="/books" replace />;
  }
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] text-[#2E2E2E]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
