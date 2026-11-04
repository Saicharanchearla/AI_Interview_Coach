import { useEffect, useState } from "react";
import { getDashboardData } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total_interviews: 0,
    best_score: 0,
    average_score: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const email = localStorage.getItem("email");

      if (!email) return;

      const result = await getDashboardData(email);
      setStats(result);
    };

    loadData();
  }, []);

  // --------------------------------------------------------
  // DYNAMIC COMPUTATIONS FOR GOALS & BADGES
  // --------------------------------------------------------
  const localAtsScore = parseInt(localStorage.getItem("atsScore")) || 0;
  
  // Goal: Target 5 interviews completed
  const targetInterviews = 5;
  const interviewProgress = Math.min(stats.total_interviews, targetInterviews);

  // Badge Status: Unlock Gold if Best Score >= 85% and Total Interviews >= 3
  const isGoldUnlocked = stats.best_score >= 85 && stats.total_interviews >= 3;

  // Custom design layout completely separate from your broken css files
  const customizedBoxStyle = {
    background: "#1e2530",
    border: "1px solid #2e3746",
    padding: "20px 15px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    minHeight: "180px",
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div className="dashboard-page" style={{ padding: "20px", color: "#fff" }}>
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Top Main Stat Counters */}
      <div className="stats">
        <div className="stat-card">
          <h2>{stats.total_interviews}</h2>
          <p>Total Interviews</p>
        </div>

        <div className="stat-card">
          <h2>{stats.best_score}%</h2>
          <p>Best Score</p>
        </div>

        <div className="stat-card">
          <h2>{stats.average_score}%</h2>
          <p>Average Score</p>
        </div>
      </div>

      {/* ================= INTERACTIVE GOALS & ACHIEVEMENTS PANEL ================= */}
      <h2 style={{ marginTop: "60px", marginBottom: "25px", fontSize: "24px", textAlign: "left", fontWeight: "600" }}>
        🚀 Your Goals & Milestone Badges
      </h2>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {/* Card 1: Practice Streak Tracker */}
        <div style={customizedBoxStyle}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>🔥 1</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 4px 0", color: "#fff" }}>Practice Streak</div>
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>Keep practicing every day!</div>
        </div>

        {/* Card 2: ATS Score Quick Optimizer Link */}
        <div 
          style={{ ...customizedBoxStyle, cursor: "pointer", transition: "transform 0.2s" }}
          onClick={() => window.location.href = "/"}
          onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.03)"}
          onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>📄 {localAtsScore > 0 ? `${localAtsScore}%` : "0%"}</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 4px 0", color: "#fff" }}>ATS Score</div>
          <div style={{ fontSize: "12px", color: "#60a5fa", fontWeight: "600" }}>
            ➔ Click to optimize
          </div>
        </div>

        {/* Card 3: Milestone Progress Bar Tracker */}
        <div style={customizedBoxStyle}>
          <div style={{ fontSize: "36px", marginBottom: "8px" }}>💼 {interviewProgress}/{targetInterviews}</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 10px 0", color: "#fff" }}>Interviews Goal</div>
          <div style={{ width: "80%", background: "#374151", height: "8px", borderRadius: "5px" }}>
            <div 
              style={{ 
                width: `${(interviewProgress / targetInterviews) * 100}%`, 
                background: "#10b981", 
                height: "100%", 
                borderRadius: "5px",
                transition: "width 0.5s ease"
              }} 
            />
          </div>
        </div>

        {/* Card 4: Locked/Unlocked Logic Reward Badge */}
        <div style={{ ...customizedBoxStyle, opacity: isGoldUnlocked ? 1 : 0.6 }}>
          <div style={{ fontSize: "40px", marginBottom: "6px" }}>{isGoldUnlocked ? "🏆" : "🔒"}</div>
          <div style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 4px 0", color: "#fff" }}>
            {isGoldUnlocked ? "Gold Unlocked!" : "Gold Badge"}
          </div>
          <div style={{ fontSize: "11px", color: "#9ca3af", padding: "0 10px", lineHeight: "1.3" }}>
            {isGoldUnlocked ? "Amazing job!" : "Requires 3+ interviews & 85% Score"}
          </div>
        </div>
      </div>  
    </div>
  );
}

export default Dashboard;