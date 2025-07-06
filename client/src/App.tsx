import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./apps/custom_components/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#F8F9FA] text-[#2E2E2E]">
        <Outlet />
      </main>
    </>
  );
}

export default App;
