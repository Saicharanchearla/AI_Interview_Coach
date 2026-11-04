import { Link } from "react-router-dom";

function Companies() {
  const companies = [
    {
      name: "Google",
      role: "Software Engineer",
      difficulty: "Hard",
      salary: "₹35 LPA+",
    },
    {
      name: "Amazon",
      role: "SDE-1",
      difficulty: "Medium",
      salary: "₹28 LPA+",
    },
    {
      name: "Microsoft",
      role: "Software Engineer",
      difficulty: "Hard",
      salary: "₹40 LPA+",
    },
    {
      name: "TCS",
      role: "Prime/Digital",
      difficulty: "Easy",
      salary: "₹7-9 LPA",
    },
    {
      name: "Infosys",
      role: "Specialist Programmer",
      difficulty: "Medium",
      salary: "₹9.5 LPA",
    },
    {
      name: "Accenture",
      role: "ASE",
      difficulty: "Easy",
      salary: "₹4.5-6.5 LPA",
    },
  ];

  return (
    <div className="companies-page">
      <h2 className="company-title">
        💼 Company Preparation
      </h2>

      <div className="company-grid">
        {companies.map((company, index) => (
          <div key={index} className="company-card">
            <h3>{company.name}</h3>
            
            <p className="role">{company.role}</p>
            
            <p className="difficulty">Difficulty: {company.difficulty}</p>
            
            <p className="salary">{company.salary}</p>

            <Link to={`/company/${company.name}`}>
              <button
                className="primary-btn"
                style={{
                  marginTop: "auto",
                  padding: "12px 20px",
                  fontSize: "14px",
                  borderRadius: "12px",
                  width: "100%",
                }}
              >
                Start Preparation
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;