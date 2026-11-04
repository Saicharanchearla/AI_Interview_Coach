import "./CodingPractice.css";

const topics = [
  {
    name: "Arrays",
    problems: 25,
    link: "https://leetcode.com/tag/array/",
  },
  {
    name: "Strings",
    problems: 20,
    link: "https://leetcode.com/tag/string/",
  },
  {
    name: "Linked List",
    problems: 18,
    link: "https://leetcode.com/tag/linked-list/",
  },
  {
    name: "Trees",
    problems: 22,
    link: "https://leetcode.com/tag/tree/",
  },
  {
    name: "Graphs",
    problems: 16,
    link: "https://leetcode.com/tag/graph/",
  },
  {
    name: "Dynamic Programming",
    problems: 30,
    link: "https://leetcode.com/tag/dynamic-programming/",
  },
];

function CodingPractice() {
  return (
    <div className="coding-page">

      <h1 className="coding-title">
        💻 Coding Practice
      </h1>

      <p className="coding-subtitle">
        Practice the most asked coding interview questions.
      </p>

      <div className="coding-grid">

        {topics.map((topic, index) => (

          <div className="coding-card" key={index}>

            <h2>{topic.name}</h2>

            <p>{topic.problems} Problems</p>

            <button
              onClick={() => window.open(topic.link, "_blank")}
            >
              Start Practice
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CodingPractice;