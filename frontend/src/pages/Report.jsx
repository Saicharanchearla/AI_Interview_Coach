import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();

  const username =
    localStorage.getItem("username") || "Guest";

  const company =
    localStorage.getItem("targetCompany") ||
    localStorage.getItem("selectedCompany") ||
    "Not Selected";

  const track =
    localStorage.getItem("targetTrack") ||
    "Not Selected";

  const atsScore =
    Number(localStorage.getItem("atsScore")) || 0;

  const progressKey = `progress_${company}_${track}`;

  const completedModules =
    JSON.parse(
      localStorage.getItem(progressKey)
    ) || [];

  const moduleCount = 6;

  const preparationProgress = Math.min(
    Math.round(
      (completedModules.length / moduleCount) * 100
    ),
    100
  );

  const getPerformance = () => {
    if (preparationProgress >= 80) return "Excellent";
    if (preparationProgress >= 60) return "Strong";
    if (preparationProgress >= 40) return "Developing";
    return "Getting Started";
  };

  const strengths = [];

  if (atsScore >= 75) {
    strengths.push("Strong Resume ATS Match");
  }

  if (completedModules.includes("coding")) {
    strengths.push("Coding Practice");
  }

  if (completedModules.includes("dsa")) {
    strengths.push("Data Structures & Algorithms");
  }

  if (completedModules.includes("sql")) {
    strengths.push("SQL Preparation");
  }

  if (completedModules.includes("communication")) {
    strengths.push("Communication Practice");
  }

  if (strengths.length === 0) {
    strengths.push(
      "Company Preparation Started",
      "Target Role Selected"
    );
  }

  const improvements = [];

  if (atsScore < 75) {
    improvements.push(
      "Improve Resume ATS Match"
    );
  }

  if (!completedModules.includes("coding")) {
    improvements.push(
      "Complete Coding Practice"
    );
  }

  if (!completedModules.includes("sql")) {
    improvements.push(
      "Practice SQL"
    );
  }

  if (!completedModules.includes("communication")) {
    improvements.push(
      "Practice Communication"
    );
  }

  if (improvements.length === 0) {
    improvements.push(
      "Continue Daily Practice",
      "Attempt More Mock Interviews"
    );
  }

  const recommendations = [
    `Continue ${company} ${track} preparation`,
    "Practice company-specific coding questions",
    "Improve communication and interview confidence",
    "Keep your resume aligned with the target role",
    "Take regular AI mock interviews",
  ];

  const goToCompany = () => {
    if (company === "Not Selected") {
      navigate("/service-companies");
      return;
    }

    navigate(
      `/company/${encodeURIComponent(company)}`
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "45px 25px",
        color: "white",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#111827",
            border: "1px solid #374151",
            borderRadius: "20px",
            padding: "35px",
            marginBottom: "20px",
          }}
        >
          <p
            style={{
              color: "#60a5fa",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
            }}
          >
            AI INTERVIEW COACH
          </p>

          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              margin: "5px 0 10px",
            }}
          >
            📊 Interview Preparation Report
          </h1>

          <p
            style={{
              color: "#9ca3af",
              margin: 0,
            }}
          >
            Personalized preparation report for your
            selected company and role.
          </p>
        </div>

        {/* Candidate */}
        <div style={section}>
          <h2>👤 Candidate</h2>

          <div style={candidateGrid}>
            <div style={candidateCard}>
              <span>Name</span>
              <strong>{username}</strong>
            </div>

            <div style={candidateCard}>
              <span>Target Company</span>
              <strong>{company}</strong>
            </div>

            <div style={candidateCard}>
              <span>Preparation Track</span>
              <strong>{track}</strong>
            </div>
          </div>
        </div>

        {/* Scores */}
        <div style={scoreGrid}>
          <ScoreCard
            value={`${atsScore}%`}
            title="ATS Score"
            description="Resume compatibility"
          />

          <ScoreCard
            value={`${preparationProgress}%`}
            title="Preparation"
            description="Track completion"
          />

          <ScoreCard
            value={getPerformance()}
            title="Performance"
            description="Current preparation level"
          />

          <ScoreCard
            value={`${completedModules.length}`}
            title="Completed"
            description="Modules completed"
          />
        </div>

        {/* Progress */}
        <div style={section}>
          <h2>📈 Preparation Progress</h2>

          <p
            style={{
              color: "#9ca3af",
              marginBottom: "15px",
            }}
          >
            {completedModules.length} of{" "}
            {moduleCount} preparation modules completed.
          </p>

          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#1f2937",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${preparationProgress}%`,
                height: "100%",
                background: "#10b981",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <p
            style={{
              color: "#10b981",
              fontWeight: "700",
              marginTop: "10px",
            }}
          >
            {preparationProgress}% Ready
          </p>
        </div>

        {/* Strengths */}
        <div style={section}>
          <h2>✅ Current Strengths</h2>

          <div style={listGrid}>
            {strengths.map((item) => (
              <div
                key={item}
                style={{
                  ...listCard,
                  border:
                    "1px solid rgba(16,185,129,0.35)",
                }}
              >
                <span>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Improvements */}
        <div style={section}>
          <h2>⚠️ Areas to Improve</h2>

          <div style={listGrid}>
            {improvements.map((item) => (
              <div
                key={item}
                style={{
                  ...listCard,
                  border:
                    "1px solid rgba(245,158,11,0.35)",
                }}
              >
                <span>→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div style={section}>
          <h2>🎯 Recommended Next Steps</h2>

          <div>
            {recommendations.map(
              (item, index) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                    padding: "12px 0",
                    borderBottom:
                      index !==
                      recommendations.length - 1
                        ? "1px solid #374151"
                        : "none",
                  }}
                >
                  <strong
                    style={{
                      color: "#60a5fa",
                    }}
                  >
                    {index + 1}.
                  </strong>

                  <span>{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Final Feedback */}
        <div
          style={{
            ...section,
            background:
              "linear-gradient(135deg,#111827,#172554)",
          }}
        >
          <h2>💡 AI Coach Feedback</h2>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.8",
              margin: 0,
            }}
          >
            You are preparing for{" "}
            <strong>{company}</strong> under the{" "}
            <strong>{track}</strong> track. Keep
            following the company-specific daily
            preparation plan instead of practicing
            random topics. Your next goal should be
            consistent coding, technical preparation,
            communication practice and mock interviews.
          </p>
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "25px",
            marginBottom: "40px",
          }}
        >
          <button
            onClick={goToCompany}
            style={primaryButton}
          >
            🎯 Continue Company Preparation
          </button>

          <button
            onClick={() => navigate("/coding")}
            style={{
              ...secondaryButton,
              background: "#7c3aed",
            }}
          >
            💻 Coding Practice
          </button>

          <button
            onClick={() => window.print()}
            style={{
              ...secondaryButton,
              background: "#374151",
            }}
          >
            🖨️ Print Report
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              ...secondaryButton,
              background: "#1f2937",
            }}
          >
            🏠 Home
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreCard({
  value,
  title,
  description,
}) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #374151",
        borderRadius: "16px",
        padding: "22px",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "800",
          color: "#60a5fa",
          marginBottom: "5px",
        }}
      >
        {value}
      </div>

      <strong>{title}</strong>

      <p
        style={{
          color: "#9ca3af",
          fontSize: "13px",
          margin: "6px 0 0",
        }}
      >
        {description}
      </p>
    </div>
  );
}

const section = {
  background: "#111827",
  border: "1px solid #374151",
  borderRadius: "16px",
  padding: "25px",
  marginBottom: "20px",
};

const candidateGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "15px",
  marginTop: "18px",
};

const candidateCard = {
  background: "#1f2937",
  borderRadius: "12px",
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const scoreGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(190px, 1fr))",
  gap: "15px",
  marginBottom: "20px",
};

const listGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "12px",
  marginTop: "18px",
};

const listCard = {
  background: "#1f2937",
  padding: "16px",
  borderRadius: "10px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const primaryButton = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
};

const secondaryButton = {
  color: "white",
  border: "none",
  padding: "14px 20px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "700",
};

export default Report;