
function Companies() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Infosys",
    "TCS",
    "Accenture",
    "Capgemini",
    "Deloitte",
  ];

  return (
    <main className="companies-overview">
      <h2 className="company-title">💼 Top Companies</h2>

      <div className="companies-overview-grid">
        {companies.map((company) => (
          <div className="company-card" key={company}>
            {company}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Companies;
