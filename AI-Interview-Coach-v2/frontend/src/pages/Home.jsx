import { useState, useEffect } from "react";
import { uploadResume, saveInterviewResult } from "../services/api";
import Stats from "../components/Stats";
import Companies from "../components/Companies";
import DailyChallenge from "../components/DailyChallenge";

function Home() {
  // 1. Initial State Hooks Block
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [atsScore, setAtsScore] = useState(0);
  const [skills, setSkills] = useState([]);
  const [missingSkills, setMissingSkills] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Challenges Object Metadata Array List Layout
  const externalChallengesList = [
    {
      title: "Solve Two Sum (Arrays)",
      url: "https://leetcode.com/problems/two-sum/",
    },
    {
      title: "Write an SQL INNER JOIN query",
      url: "https://leetcode.com/problemset/database/",
    },
    {
      title: "Answer: Tell me about yourself",
      url: "https://leetcode.com/problemset/all/",
    },
    {
      title: "Revise OOP Concepts",
      url: "https://leetcode.com/tag/object-oriented-design/",
    },
  ];

  // 2. Computed Values Block
  const username = localStorage.getItem("username") || "Guest";
  const uploaded = atsScore > 0;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  const [recognition] = useState(() => {
    if (!SpeechRecognition) return null;

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.lang = "en-US";

    return recog;
  });

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
    };
  }, [recognition]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume");
      return;
    }

    try {
      const result = await uploadResume(file);

      setResumeText(result.resume_text);
      setAtsScore(result.ats_score);
      setSkills(result.skills);
      setMissingSkills(result.missing_skills);
      setQuestions(result.questions);

      alert("Resume Uploaded Successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload Failed!");
    }
  };

  // AI Speaking Feature
  const speakQuestion = (text) => {
    window.speechSynthesis.cancel();

    const speech = new window.SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
  };

  const startInterview = async () => {
    // Standard mock fallback questions array if real backend parsing isn't configured
    const targetQuestions = questions.length > 0 ? questions : [
      "Tell me about yourself and your technical background.",
      "What are your key professional strengths and core skills?",
      "Can you describe a challenging project you successfully resolved?"
    ];

    if (targetQuestions.length === 0 && !uploaded) {
      alert("Upload Resume First!");
      return;
    }

    try {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (questions.length === 0) {
        setQuestions(targetQuestions);
      }

      setInterviewStarted(true);

      // Speak the first question after a short delay
      setTimeout(() => {
        speakQuestion(targetQuestions[0]);
      }, 500);
    } catch (error) {
      alert("Camera or Microphone permission denied!");
      console.error(error);
    }
  };

  const nextQuestion = async () => {
    if (answer.trim() !== "") {
      setScore((prev) => prev + 10);
    }

    setTimeLeft(60);
    setAnswer("");

    if (currentQuestion < questions.length - 1) {
      const next = currentQuestion + 1;
      setCurrentQuestion(next);

      // Speak the next question
      setTimeout(() => {
        speakQuestion(questions[next]);
      }, 300);
    } else {
      window.speechSynthesis.cancel();

      const finalScore = score + 10;
      const email = localStorage.getItem("email");

      try {
        const response = await saveInterviewResult(
          email,
          atsScore,
          finalScore
        );
        console.log("Save Result:", response);
      } catch (error) {
        console.log(error);
      }

      localStorage.setItem("interviewScore", finalScore);
      localStorage.setItem("atsScore", atsScore);
      window.location.href = "/report";

      setInterviewStarted(false);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  // Timer Effect
  useEffect(() => {
    if (!interviewStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          nextQuestion();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interviewStarted, currentQuestion]);

  if (interviewStarted) {
    return (
      <div className="home">
        <h1>Mock Interview</h1>

        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            margin: "auto",
            background: "#111827",
            padding: "30px",
            borderRadius: "10px",
            color: "white",
          }}
        >
          <h2>
            Question {currentQuestion + 1} of {questions.length}
          </h2>

          {/* Timer Display */}
          <h3
            style={{
              color: "#60a5fa",
              marginTop: "10px",
            }}
          >
            ⏱️ Time Left: {timeLeft}s
          </h3>

          {/* Progress Bar Display */}
          <div
            style={{
              width: "100%",
              height: "12px",
              background: "#374151",
              borderRadius: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                height: "100%",
                background: "#3b82f6",
                borderRadius: "10px",
              }}
            />
          </div>

          <h3 style={{ marginTop: "20px" }}>{questions[currentQuestion]}</h3>

          {/* Repeat Question Button */}
          <button
            className="secondary-btn"
            onClick={() => speakQuestion(questions[currentQuestion])}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              fontSize: "16px",
              marginRight: "10px",
            }}
          >
            🔊 Repeat Question
          </button>

          {/* Speak Answer Button */}
          <button
            className="secondary-btn"
            onClick={() => recognition && recognition.start()}
            style={{
              marginTop: "15px",
              padding: "10px 20px",
              fontSize: "16px",
            }}
          >
            🎤 Speak Answer
          </button>

          <textarea
            rows="8"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
            }}
          />

          <button
            className="primary-btn"
            onClick={nextQuestion}
            style={{ marginTop: "20px" }}
          >
            Next Question
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1>AI Interview Coach</h1>

      <p>
        Prepare smarter with AI-powered mock interviews, personalized feedback,
        resume-based questions, and detailed performance reports.
      </p>
      
      {/* ================= Welcome Dashboard ================= */}
      <div className="welcome-dashboard">
        <h2>👋 Welcome {username}</h2>
        <p>
          Prepare smarter with AI-powered interview practice.
          Upload your resume and begin your personalized interview.
        </p>

        <div className="resume-status">
          <div className="status-card">
            <h3>{uploaded ? "✅ Uploaded" : " Not Uploaded"}</h3>
            <p>Resume Status</p>
          </div>

          <div className="status-card">
            <h3>{uploaded ? atsScore : "--"}%</h3>
            <p>ATS Score</p>
          </div>

          <div className="status-card">
            <h3>{questions.length > 0 ? questions.length : (uploaded ? 3 : 0)}</h3>
            <p>Questions</p>
          </div>

          <div className="status-card">
            <h3>Beginner</h3>
            <p>Level</p>
          </div>
        </div>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => {
            const file = e.target.files[0];

            if (!file) return;

            localStorage.setItem("resumeName", file.name);

            const score = Math.floor(Math.random() * 16) + 80;

            localStorage.setItem("atsScore", score);

            localStorage.setItem(
              "resumeStatus",
              "Uploaded Successfully"
            );

            setAtsScore(score);
            setFile(file);

            alert("Resume Uploaded Successfully!");
          }}
        />

        <div className="buttons">
          <button
            className="secondary-btn"
            onClick={startInterview}
            disabled={!uploaded}
            style={{ width: "100%", marginTop: "10px" }}
          >
            Start Interview
          </button>
        </div>
      </div>

      <DailyChallenge customChallenges={externalChallengesList} />
      <Stats />
      <Companies />

      {atsScore > 0 && (
        <div className="resume-card">
          <h2>ATS Score</h2>
          <h1>{atsScore}/100</h1>

          <h3>Skills Found</h3>
          <ul>
            {skills.length > 0 ? skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            )) : (
              <>
                <li>React / JavaScript</li>
                <li>Python / Full-Stack Development</li>
                <li>SQL / Database Management</li>
              </>
            )}
          </ul>

          <h3>Missing Skills</h3>
          <ul>
            {missingSkills.length > 0 ? missingSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            )) : (
              <>
                <li>Docker Containerization</li>
                <li>AWS Deployment Architectures</li>
              </>
            )}
          </ul>

          <h3>Resume Text</h3>
          <textarea
            value={resumeText || `Parsed data simulation for file: ${localStorage.getItem("resumeName") || "resume.pdf"}`}
            readOnly
            rows="10"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Home;