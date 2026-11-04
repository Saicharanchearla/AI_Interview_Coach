import { Link } from "react-router-dom";

function Report() {
  const username = localStorage.getItem("username") || "Guest";

  const atsScore =
    localStorage.getItem("atsScore") || 0;

  const interviewScore =
    localStorage.getItem("interviewScore") || 0;

  const strengths = [
    "Java Programming",
    "Problem Solving",
    "Communication",
  ];

  const improvements = [
    "SQL",
    "System Design",
    "Confidence",
  ];

  const recommendations = [
    "Practice Arrays",
    "Revise OOP",
    "Solve 2 SQL Problems Daily",
    "Take 3 Mock Interviews Weekly",
  ];

  return (
    <div
      style={{
        width: "95%",
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "40px",
        }}
      >
        📄 AI Interview Report
      </h1>

      <div className="stats">

        <div className="stat-card">
          <h2>{atsScore}%</h2>
          <p>ATS Score</p>
        </div>

        <div className="stat-card">
          <h2>{interviewScore}%</h2>
          <p>Interview Score</p>
        </div>

        <div className="stat-card">
          <h2>Gold</h2>
          <p>Level</p>
        </div>

        <div className="stat-card">
          <h2>⭐⭐⭐⭐☆</h2>
          <p>Performance</p>
        </div>

      </div>

      <div
        className="resume-card"
        style={{
          marginTop: "40px",
        }}
      >
        <h2>👤 Candidate</h2>

        <p>{username}</p>

        <hr />

        <h2>✅ Strengths</h2>

        <ul>
          {strengths.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <hr />

        <h2>⚠ Needs Improvement</h2>

        <ul>
          {improvements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <hr />

        <h2>📚 Recommended Topics</h2>

        <ul>
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <hr />

        <h2>🎯 Overall Feedback</h2>

        <p>
          Good interview performance.
          Continue practicing coding,
          communication and system design
          to improve your placement chances.
        </p>

        <div
          style={{
            marginTop: "35px",
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button
            className="primary-btn"
            onClick={() => window.print()}
          >
            Download Report
          </button>

          <Link to="/certificate">
            <button className="primary-btn">
              🏆 View Certificate
            </button>
          </Link>

          <Link to="/dashboard">
            <button className="secondary-btn">
              Dashboard
            </button>
          </Link>

          <Link to="/">
            <button className="secondary-btn">
              Home
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Report;