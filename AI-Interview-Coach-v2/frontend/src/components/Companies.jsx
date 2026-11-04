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
    <div
      style={{
        marginTop: "90px",
        textAlign: "center",
      }}
    >
      {/* Fixed: Replaced inline sizing styles with global className to handle automatic theme swapping */}
      <h2 className="company-title">
        💼 Top Companies
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {companies.map((company, index) => (
          /* Fixed: Swapped hardcoded background and border with global className */
          <div
            key={index}
            className="company-card"
            style={{
              padding: "20px 35px",
              borderRadius: "18px",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {company}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;