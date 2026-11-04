function Certificate() {
  const username = localStorage.getItem("username") || "Guest";
  const atsScore = localStorage.getItem("atsScore") || 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "900px",
          background: "#fff",
          borderRadius: "20px",
          padding: "60px",
          textAlign: "center",
          color: "#000",
          boxShadow: "0 20px 40px rgba(0,0,0,.5)",
        }}
      >
        <h4>🏆 CERTIFICATE OF ACHIEVEMENT</h4>

        <h1 style={{ marginTop: 30 }}>
          {username}
        </h1>

        <p style={{ marginTop: 25, fontSize: 20 }}>
          Successfully completed the AI Mock Interview
          and achieved an ATS Score of
        </p>

        <h2
          style={{
            color: "#2563eb",
            fontSize: "60px",
            margin: "30px 0",
          }}
        >
          {atsScore}%
        </h2>

        <p>
          AI Interview Coach Platform
        </p>

        <button
          style={{
            marginTop: 40,
            padding: "12px 35px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => window.print()}
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
}

export default Certificate;