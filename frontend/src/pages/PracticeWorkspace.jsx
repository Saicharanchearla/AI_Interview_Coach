import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PracticeWorkspace.css";

const starterCode = {
  python: `def solve():
    # Write your solution here
    pass

if __name__ == "__main__":
    solve()`,

  javascript: `function solve() {
    // Write your solution here
}

solve();`,

  sql: `-- Write your SQL query here
SELECT * FROM table_name;`,

  html: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`
};

const getDefaultLanguage = (moduleName) => {
  if (moduleName === "SQL" || moduleName === "SQL Practice") {
    return "sql";
  }

  if (moduleName === "Web Technologies") {
    return "javascript";
  }

  return "python";
};

const fallbackQuestions = {
  sql: [
    {
      title: "Find the highest salary",
      topic: "SQL",
      difficulty: "Easy",
      description: "Given an Employees table with EmployeeID, Name, and Salary, write a query to find the highest salary.",
      example: "Table: Employees\n\nEmployeeID | Name | Salary\n1 | Ravi | 30000\n2 | Priya | 45000\n3 | Arun | 40000\n\nExpected output:\n45000"
    },
    {
      title: "Find duplicate records",
      topic: "SQL",
      difficulty: "Medium",
      description: "Given an Employees table, write a query to find department names that appear more than once.",
      example: "Table: Employees\n\nName | Department\nRavi | IT\nPriya | HR\nArun | IT\n\nExpected output:\nIT"
    },
    {
      title: "Calculate department salaries",
      topic: "SQL",
      difficulty: "Medium",
      description: "Write a query to calculate the total salary for each department.",
      example: "Table: Employees\n\nName | Department | Salary\nRavi | IT | 30000\nPriya | HR | 40000\nArun | IT | 35000\n\nExpected output:\nIT | 65000\nHR | 40000"
    },
    {
      title: "Join two tables",
      topic: "SQL",
      difficulty: "Medium",
      description: "Given Employees(EmployeeID, Name, DepartmentID) and Departments(DepartmentID, DepartmentName), display each employee's name and department name.",
      example: "Expected columns:\nName | DepartmentName\n\nUse an INNER JOIN."
    },
    {
      title: "Find the second-highest salary",
      topic: "SQL",
      difficulty: "Medium",
      description: "Write a query to find the second-highest distinct salary in the Employees table.",
      example: "Salaries: 30000, 45000, 40000, 45000\n\nExpected output:\n40000"
    }
  ],

  web: [
    {
      title: "Validate an email form",
      topic: "Web Technologies",
      difficulty: "Easy",
      description: "Create an HTML form with an email field and a submit button. Use JavaScript to prevent submission when the email is empty or invalid.",
      example: "Input: student@example.com\nExpected: Form accepted\n\nInput: invalid-email\nExpected: Display an error message"
    },
    {
      title: "Change text using the DOM",
      topic: "Web Technologies",
      difficulty: "Easy",
      description: "Create a button that changes the text of a paragraph to 'Welcome!' when clicked.",
      example: "Before click: Hello\nAfter click: Welcome!"
    },
    {
      title: "Create a responsive layout",
      topic: "Web Technologies",
      difficulty: "Medium",
      description: "Use HTML and CSS to create a two-column layout that changes to one column on screens narrower than 600px.",
      example: "Desktop: Two columns\nMobile: One column"
    },
    {
      title: "Validate a password",
      topic: "Web Technologies",
      difficulty: "Medium",
      description: "Write JavaScript validation that requires a password of at least eight characters containing an uppercase letter, a lowercase letter, and a number.",
      example: "Password: Abcdef12 → Valid\nPassword: abc → Invalid"
    },
    {
      title: "Build a task list",
      topic: "Web Technologies",
      difficulty: "Medium",
      description: "Create a simple task list using HTML and JavaScript. Allow users to add a task to the page when they click an Add button.",
      example: "Input: Complete assignment\nExpected: The task appears in the list"
    }
  ],

  programming: [
    {
      title: "Find the highest number",
      topic: "Python",
      difficulty: "Easy",
      description: "Use a loop to find the largest number in a list without using max().",
      example: "Input: [12, 45, 7, 89, 23]\nExpected output: 89"
    },
    {
      title: "Find the lowest number",
      topic: "Python",
      difficulty: "Easy",
      description: "Use a loop to find the smallest number in a list without using min().",
      example: "Input: [12, 45, 7, 89, 23]\nExpected output: 7"
    },
    {
      title: "Count even numbers",
      topic: "Python",
      difficulty: "Easy",
      description: "Count how many even numbers are present in a list using a loop.",
      example: "Input: [2, 5, 8, 11, 14]\nExpected output: 3"
    },
    {
      title: "Calculate the sum",
      topic: "Python",
      difficulty: "Easy",
      description: "Calculate the sum of all numbers in a list using a loop.",
      example: "Input: [10, 20, 30, 40]\nExpected output: 100"
    },
    {
      title: "Reverse a string",
      topic: "Python",
      difficulty: "Easy",
      description: "Reverse a string without using slicing or a built-in reverse function.",
      example: "Input: hello\nExpected output: olleh"
    }
  ],

  dsa: [
    {
      title: "Two Sum",
      topic: "DSA",
      difficulty: "Easy",
      description: "Given an array of integers and a target, find the indices of two numbers whose sum equals the target.",
      example: "Input: nums = [2, 7, 11, 15], target = 9\nExpected output: [0, 1]"
    },
    {
      title: "Binary Search",
      topic: "DSA",
      difficulty: "Easy",
      description: "Find the index of a target value in a sorted array using binary search. Return -1 if it is absent.",
      example: "Input: nums = [1, 3, 5, 7, 9], target = 7\nExpected output: 3"
    },
    {
      title: "Check a palindrome",
      topic: "DSA",
      difficulty: "Easy",
      description: "Determine whether a string reads the same forward and backward.",
      example: "Input: level\nExpected output: True"
    },
    {
      title: "Find the missing number",
      topic: "DSA",
      difficulty: "Easy",
      description: "An array contains distinct numbers from 0 through n with one number missing. Find the missing number.",
      example: "Input: [3, 0, 1]\nExpected output: 2"
    },
    {
      title: "Maximum subarray sum",
      topic: "DSA",
      difficulty: "Medium",
      description: "Find the largest sum of a non-empty contiguous subarray.",
      example: "Input: [-2, 1, -3, 4, -1, 2, 1, -5, 4]\nExpected output: 6"
    }
  ]
};

function getFallbackQuestions(moduleName) {
  const name = moduleName.toLowerCase();

  if (name.includes("sql") || name.includes("database")) {
    return fallbackQuestions.sql;
  }

  if (name.includes("web") || name.includes("html") ||
      name.includes("javascript")) {
    return fallbackQuestions.web;
  }

  if (name.includes("dsa") || name.includes("data structure") ||
      name.includes("algorithm")) {
    return fallbackQuestions.dsa;
  }

  return fallbackQuestions.programming;
}

function PracticeWorkspace() {
  const navigate = useNavigate();
  const { company, module } = useParams();

  const moduleName = decodeURIComponent(module || "DSA Practice");

  const defaultLang = getDefaultLanguage(moduleName);

  const [questions, setQuestions] = useState([]);
  const [selectedId, setSelectedId] = useState(0);
  const [questionLoading, setQuestionLoading] = useState(true);
  const [questionError, setQuestionError] = useState("");

  const [language, setLanguage] = useState(defaultLang);
  const [code, setCode] = useState(starterCode[defaultLang] || starterCode.python);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  // Update default language and template if the module changes
  useEffect(() => {
    const newDefaultLang = getDefaultLanguage(moduleName);
    setLanguage(newDefaultLang);
    setCode(starterCode[newDefaultLang] || starterCode.python);
  }, [moduleName]);

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      setQuestionLoading(true);
      setQuestionError("");
      setQuestions([]);
      setSelectedId(0);

      try {
        const API_URL =
          import.meta.env.VITE_API_URL ||
          "https://ai-interview-coach-v2-1.onrender.com";

        const historyKey = `practiceQuestions:${moduleName}`;
        const previousQuestions = JSON.parse(
          localStorage.getItem(historyKey) || "[]"
        );

        const response = await fetch(`${API_URL}/generate-questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: company || "General",
            topic: moduleName,
            category: "Coding",
            difficulty: "Mixed",
            count: 5,
            previous_questions: previousQuestions,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.detail || "Unable to generate practice questions."
          );
        }

        if (!Array.isArray(result.questions) || result.questions.length === 0) {
          throw new Error("The AI did not return any questions.");
        }

        if (cancelled) return;

        const formattedQuestions = result.questions.map((item, index) => {
          const text =
            typeof item === "string" ? item : item.question || "";

          return {
            id: index,
            title: item.title || `${moduleName} — Problem ${index + 1}`,
            topic: item.topic || moduleName,
            difficulty: item.difficulty || "Mixed",
            description: text,
            example: item.example || "See the problem statement above.",
          };
        });

        setQuestions(formattedQuestions);

        const generated = formattedQuestions
          .map((item) => item.description)
          .filter(Boolean);

        localStorage.setItem(
          historyKey,
          JSON.stringify([...previousQuestions, ...generated].slice(-50))
        );
      } catch (error) {
        if (!cancelled) {
          console.warn("API question generation failed, using fallback questions:", error);
          const fallbacks = getFallbackQuestions(moduleName);
          const formattedFallbacks = fallbacks.map((item, index) => ({
            id: index,
            title: item.title,
            topic: item.topic,
            difficulty: item.difficulty,
            description: item.description,
            example: item.example,
          }));
          setQuestions(formattedFallbacks);
        }
      } finally {
        if (!cancelled) {
          setQuestionLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [company, moduleName]);

  const selectedQuestion =
    questions.find((question) => question.id === selectedId) ||
    questions[0];

  const chooseLanguage = (nextLanguage) => {
    setLanguage(nextLanguage);
    setCode(starterCode[nextLanguage] || starterCode.python);
    setOutput("");
  };

  const reviewCode = async () => {
    if (!code.trim()) {
      setOutput("Enter your code before submitting.");
      return;
    }

    if (!selectedQuestion) {
      setOutput("No active question selected for review.");
      return;
    }

    setLoading(true);
    setOutput("");

    try {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://ai-interview-coach-v2-1.onrender.com";

      const response = await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: `${selectedQuestion.description}\n${selectedQuestion.example}`,
          answer: code,
          category: "Coding",
          company: company || "",
          language,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.detail || "Code review failed.");
      }

      setOutput(
        `AI Code Review\n\nScore: ${result.score}/100\nResult: ${result.result}\n\n${result.feedback}\n\nImprovements:\n${(result.improvements || []).map((item) => `- ${item}`).join("\n")}`
      );
    } catch (error) {
      setOutput(error.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="practice-workspace">
      <header className="workspace-header">
        <button
          className="workspace-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div>
          <span className="workspace-eyebrow">
            {company ? `${decodeURIComponent(company)} PREPARATION` : "PRACTICE"}
          </span>
          <h1>{moduleName}</h1>
          <p>Practice problems in a dedicated workspace.</p>
        </div>
      </header>

      <div className="workspace-layout">
        <aside className="workspace-sidebar">
          <h2>Questions</h2>

          {questionLoading && <p>Generating fresh questions...</p>}
          {questionError && <p role="alert" style={{ color: "red" }}>{questionError}</p>}

          {questions.map((question) => (
            <button
              key={question.id}
              className={`workspace-question ${
                selectedId === question.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedId(question.id);
                setOutput("");
              }}
            >
              <strong>{question.title}</strong>
              <span>{question.topic} · {question.difficulty}</span>
            </button>
          ))}
        </aside>

        {selectedQuestion && (
          <section className="workspace-problem">
            <span className="workspace-difficulty">
              {selectedQuestion.difficulty}
            </span>
            <h2>{selectedQuestion.title}</h2>
            <p>{selectedQuestion.description}</p>
            <h3>Example</h3>
            <pre>{selectedQuestion.example}</pre>
            <p className="workspace-note">
              Submit your solution for AI review. Code execution and automated
              test-case verification are not enabled.
            </p>
          </section>
        )}

        <section className="workspace-editor">
          <div className="editor-toolbar">
            <label htmlFor="language-select">Language</label>
            <select
              id="language-select"
              value={language}
              onChange={(event) => chooseLanguage(event.target.value)}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
              <option value="sql">SQL</option>
              <option value="html">HTML</option>
            </select>
          </div>

          <textarea
            className="code-editor"
            aria-label="Code editor"
            spellCheck={false}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />

          <button
            className="workspace-submit"
            onClick={reviewCode}
            disabled={loading || !selectedQuestion}
          >
            {loading ? "Reviewing..." : "Submit for AI Review"}
          </button>

          {output && (
            <pre className="workspace-output">{output}</pre>
          )}
        </section>
      </div>
    </main>
  );
}

export default PracticeWorkspace;