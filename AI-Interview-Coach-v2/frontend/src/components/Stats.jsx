import { FaUsers, FaFileAlt, FaAward, FaBriefcase } from "react-icons/fa";

function Stats() {
  // Pull live metrics from localStorage fallbacks
  const localAtsScore = localStorage.getItem("atsScore") ? `${localStorage.getItem("atsScore")}%` : "0%";
  const localInterviewScore = localStorage.getItem("interviewScore") ? `${localStorage.getItem("interviewScore")}/100` : "--";
  const resumeStatus = localStorage.getItem("resumeStatus") ? "Verified" : "Pending";

  const userStats = [
    {
      icon: <FaFileAlt size={35} />,
      value: localAtsScore,
      title: "Latest ATS Score",
    },
    {
      icon: <FaAward size={35} />,
      value: localInterviewScore,
      title: "Last Interview Score",
    },
    {
      icon: <FaBriefcase size={35} />,
      value: resumeStatus,
      title: "Resume Parsing Status",
    },
    {
      icon: <FaUsers size={35} />,
      value: "Active",
      title: "Account Status",
    },
  ];

  return (
    <div style={{ marginTop: "80px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "36px",
          marginBottom: "40px",
          color: "#fff",
          fontWeight: "600"
        }}
      >
        📊 Your Preparation Overview
      </h2>

      <div className="stats">
        {userStats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div
              style={{
                color: "#60a5fa",
                marginBottom: "15px",
              }}
            >
              {item.icon}
            </div>

            <h2>{item.value}</h2>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stats;