function WelcomeCard() {
  const username = localStorage.getItem("username") || "Guest";

  // Dynamic values pulled from localStorage
  const atsScore = localStorage.getItem("atsScore") || "--";
  const resumeStatus = localStorage.getItem("resumeStatus") || "Not Uploaded";

  return (
    <div
      style={{
        marginTop: "70px",
        width: "100%",
        maxWidth: "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "35px",
        borderRadius: "25px",
        background: "linear-gradient(135deg,#2563eb,#7c3aed)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "42px" }}>
        👋 Welcome {username}
      </h1>

      <p
        style={{
          marginTop: "10px",
          opacity: 0.9,
          fontSize: "18px",
        }}
      >
        Prepare smarter with AI-powered interview practice.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginTop: "35px",
        }}
      >
        <div className="stat-card">
          <h2>{atsScore}{atsScore !== "--" ? "%" : ""}</h2>
          <p>Resume ATS</p>
        </div>

        <div className="stat-card">
          <h2>
            {resumeStatus === "Uploaded Successfully" 
              ? "✅ Uploaded Successfully" 
              : "❌ Not Uploaded"}
          </h2>
          <p>Status</p>
        </div>

        <div className="stat-card">
          <h2>1250</h2>
          <p>XP Points</p>
        </div>

        <div className="stat-card">
          <h2>Gold</h2>
          <p>Level</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;