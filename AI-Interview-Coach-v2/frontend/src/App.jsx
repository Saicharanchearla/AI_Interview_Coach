import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import CodingPractice from "./components/CodingPractice"; // Fixed path!

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Companies from "./pages/Companies";
import Report from "./pages/Report";
import CompanyDetails from "./pages/CompanyDetails";
import Certificate from "./pages/Certificate";

// --- Custom Footer Component ---
function Footer() {
  return (
    <footer 
      style={{
        width: "100%",
        padding: "25px 20px",
        background: "#111827", 
        borderTop: "1px solid #1f2937",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "auto", // Pushes the footer cleanly to the bottom
        boxSizing: "border-box"
      }}
    >
      <div 
        style={{ 
          fontSize: "16px", 
          fontWeight: "500", 
          color: "#9ca3af", 
          marginBottom: "6px",
          letterSpacing: "0.5px"
        }}
      >
        AI-Powered Interview Coach and Career Intelligence Platform
      </div>
      <div 
        style={{ 
          fontSize: "14px", 
          color: "#60a5fa", 
          fontWeight: "600" 
        }}
      >
        Developed By Kasuri Rohith | B.Tech Computer Science & Engineering
      </div>
    </footer>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Flex container wrapper forces layout structure consistency */}
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/history" element={<History />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/coding" element={<CodingPractice />} />
            <Route path="/report" element={<Report />} />
            <Route path="/company/:name" element={<CompanyDetails />} />
            <Route path="/certificate" element={<Certificate />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;