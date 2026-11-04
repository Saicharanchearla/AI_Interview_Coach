import { useState } from "react";

function DailyChallenge({ customChallenges }) {
  // Use the list passed from Home.jsx or fallback to standard ones
  const initialChallenges = customChallenges && customChallenges.length > 0 
    ? customChallenges 
    : [
        { title: "Solve Two Sum (Arrays)", url: "https://leetcode.com/problems/two-sum/" },
        { title: "Write an SQL INNER JOIN query", url: "https://leetcode.com/problemset/database/" },
        { title: "Answer: Tell me about yourself", url: "https://leetcode.com/problemset/all/" },
        { title: "Revise OOP Concepts", url: "https://leetcode.com/tag/object-oriented-design/" },
      ];

  // Set up dynamic tracking state
  const [tasks, setTasks] = useState(
    initialChallenges.map((item, index) => ({
      id: index,
      title: item.title || item, // fallback if a plain string array is passed
      url: item.url || "#",
      completed: false,
    }))
  );

  const [xpClaimed, setXpClaimed] = useState(false);

  // Mark task as completed and open URL when user clicks Start
  const handleStart = (id, url) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );
    if (url !== "#") {
      window.open(url, "_blank");
    }
  };

  const allCompleted = tasks.every((task) => task.completed);

  const handleClaimXp = () => {
    if (!allCompleted) return;
    setXpClaimed(true);
    alert("🔥 +50 XP Claimed Successfully!");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "70px auto",
        padding: "35px",
        background: "#111827",
        borderRadius: "25px",
        border: "1px solid #374151",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "35px",
          color: "#60a5fa",
        }}
      >
        🔥 Today's Challenge
      </h2>

      {tasks.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "12px",
            background: "#1f2937",
            border: item.completed ? "1px solid #10b981" : "1px solid transparent",
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              color: "#fff",
              textDecoration: item.completed ? "line-through" : "none",
              opacity: item.completed ? 0.5 : 1,
            }}
          >
            {item.completed ? "✅" : "⬜"} {item.title}
          </span>

          <button
            className="secondary-btn"
            onClick={() => handleStart(item.id, item.url)}
            disabled={item.completed}
            style={{
              opacity: item.completed ? 0.5 : 1,
              cursor: item.completed ? "not-allowed" : "pointer",
            }}
          >
            {item.completed ? "Done" : "Start"}
          </button>
        </div>
      ))}

      <button
        className="primary-btn"
        onClick={handleClaimXp}
        disabled={!allCompleted || xpClaimed}
        style={{
          marginTop: "25px",
          width: "100%",
          background: xpClaimed ? "#1f2937" : allCompleted ? "#2563eb" : "#4b5563",
          color: xpClaimed ? "#9ca3af" : "#fff",
          cursor: allCompleted && !xpClaimed ? "pointer" : "not-allowed",
          opacity: allCompleted ? 1 : 0.6,
        }}
      >
        {xpClaimed ? "🎁 XP Claimed!" : "🎁 Claim +50 XP"}
      </button>
    </div>
  );
}

export default DailyChallenge;