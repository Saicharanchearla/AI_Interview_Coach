
import { useNavigate } from "react-router-dom";
import "./Companies.css";

function ServiceCompanies() {
  const navigate = useNavigate();

  const companies = [
    {
      name: "Cognizant",
      difficulty: "Medium",
      description:
        "Prepare for Cognizant recruitment, programming, SQL, aptitude, and technical interviews.",
    },
    {
      name: "TCS",
      difficulty: "Easy-Medium",
      description:
        "Prepare for TCS Ninja, Digital, and Prime recruitment assessments.",
    },
    {
      name: "Infosys",
      difficulty: "Medium",
      description:
        "Prepare for System Engineer and Specialist Programmer recruitment.",
    },
    {
      name: "Accenture",
      difficulty: "Easy-Medium",
      description:
        "Prepare for Accenture assessments covering pseudocode, programming, SQL, and problem-solving.",
    },
    {
      name: "Capgemini",
      difficulty: "Medium",
      description:
        "Prepare for programming, SQL, OOP, coding assessments, and technical interviews.",
    },
    {
      name: "Deloitte",
      difficulty: "Medium",
      description:
        "Prepare for analyst and software engineering recruitment with coding and technical practice.",
    },
  ];

  const openCompany = (company) => {
    localStorage.setItem("selectedCompany", company.name);
    localStorage.setItem("targetCompany", company.name);
    localStorage.setItem("companyCategory", "Service Based");

    navigate(`/company/${encodeURIComponent(company.name)}`);
  };

  return (
    <main className="companies-page">
      <header className="companies-header">
        <span className="companies-eyebrow">COMPANY PREPARATION</span>
        <h1>Service-Based Companies</h1>
        <p>
          Select a company to explore its interview preparation details.
        </p>
      </header>

      <section className="companies-grid">
        {companies.map((company) => (
          <article className="company-card" key={company.name}>
            <div>
              <span className="company-type">Service Based</span>
              <h2>{company.name}</h2>
              <p className="company-description">
                {company.description}
              </p>
            </div>

            <div className="company-difficulty">
              <span>Interview Difficulty</span>
              <strong>{company.difficulty}</strong>
            </div>

            <button
              type="button"
              className="company-button"
              onClick={() => openCompany(company)}
            >
              View Details <span aria-hidden="true">→</span>
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default ServiceCompanies;
