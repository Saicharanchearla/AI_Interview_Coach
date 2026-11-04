from fastapi import APIRouter

router = APIRouter()


@router.get("/report/{email}")
def interview_report(email: str):

    return {
        "success": True,

        "candidate": email,

        "communication": 86,

        "technical": 91,

        "confidence": 84,

        "problem_solving": 89,

        "overall_score": 88,

        "strengths": [
            "Good Communication",
            "Strong Java Knowledge",
            "Good Problem Solving",
            "Confident Answers"
        ],

        "weaknesses": [
            "Improve SQL",
            "Revise DBMS",
            "Practice System Design"
        ],

        "recommendations": [
            "Solve 2 LeetCode problems daily",
            "Take Mock Interviews",
            "Practice HR Questions",
            "Improve Resume ATS Score"
        ],

        "feedback":
        "Excellent performance. Continue practicing technical interviews and communication skills."
    }