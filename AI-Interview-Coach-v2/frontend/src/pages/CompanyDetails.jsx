import { useParams } from "react-router-dom";

function CompanyDetails() {
  const { name } = useParams();

  const companies = {
    Google: {
      role: "Software Engineer",
      salary: "₹35 LPA+",
      difficulty: "Hard",
      rounds: [
        "Online Assessment",
        "DSA Interview",
        "System Design",
        "HR Round",
      ],
      topics: [
        "Arrays",
        "Graphs",
        "Trees",
        "Dynamic Programming",
        "System Design",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },

    Microsoft: {
      role: "Software Engineer",
      salary: "₹40 LPA+",
      difficulty: "Hard",
      rounds: [
        "Online Assessment",
        "Technical Round 1",
        "Technical Round 2",
        "HR",
      ],
      topics: [
        "Arrays",
        "Strings",
        "Linked List",
        "Trees",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },

    Amazon: {
      role: "SDE-1",
      salary: "₹28 LPA+",
      difficulty: "Medium",
      rounds: [
        "OA",
        "Coding",
        "Leadership Principles",
        "HR",
      ],
      topics: [
        "Arrays",
        "HashMap",
        "Trees",
        "Graphs",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },

    TCS: {
      role: "Prime/Digital",
      salary: "₹7-9 LPA",
      difficulty: "Easy",
      rounds: [
        "Aptitude",
        "Coding",
        "Technical",
        "HR",
      ],
      topics: [
        "C",
        "Java",
        "SQL",
        "OOP",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },

    Infosys: {
      role: "Specialist Programmer",
      salary: "₹9.5 LPA",
      difficulty: "Medium",
      rounds: [
        "Coding Test",
        "Technical",
        "HR",
      ],
      topics: [
        "Java",
        "SQL",
        "DBMS",
        "Operating System",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },

    Accenture: {
      role: "ASE",
      salary: "₹4.5-6.5 LPA",
      difficulty: "Easy",
      rounds: [
        "Assessment",
        "Coding",
        "Technical",
        "HR",
      ],
      topics: [
        "Java",
        "SQL",
        "Aptitude",
        "Communication",
      ],
      leetcode: "https://leetcode.com/problemset/",
    },
  };

  const company = companies[name];

  if (!company) {
    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Company Not Found
      </h1>
    );
  }

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1100px",
        margin: "50px auto",
      }}
    >
      <div
        className="resume-card"
        style={{
          padding: "40px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          🏢 {name} Interview Preparation
        </h1>

        <div className="stats">

          <div className="stat-card">
            <h2>{company.role}</h2>
            <p>Role</p>
          </div>

          <div className="stat-card">
            <h2>{company.salary}</h2>
            <p>Package</p>
          </div>

          <div className="stat-card">
            <h2>{company.difficulty}</h2>
            <p>Difficulty</p>
          </div>

        </div>

        <br />

        <h2>📋 Interview Rounds</h2>

        <ul>
          {company.rounds.map((round, index) => (
            <li
              key={index}
              style={{
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              {round}
            </li>
          ))}
        </ul>

        <br />

        <h2>📚 Important Topics</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          {company.topics.map((topic, index) => (
            <div
              key={index}
              className="stat-card"
              style={{
                width: "170px",
                padding: "20px",
              }}
            >
              <h3>{topic}</h3>
            </div>
          ))}
        </div>

        <br />

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "40px",
          }}
        >
          <button
            className="primary-btn"
            onClick={() =>
              window.open(company.leetcode, "_blank")
            }
          >
            💻 Practice on LeetCode
          </button>

          <button
            className="secondary-btn"
            onClick={() =>
              alert(`${name} Mock Interview Coming Soon`)
            }
          >
            🎤 Start Mock Interview
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;