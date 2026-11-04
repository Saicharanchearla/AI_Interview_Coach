from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from database import get_db
from models import User, Interview
from schemas import InterviewResult

router = APIRouter()


# ----------------------------
# SAVE INTERVIEW RESULT
# ----------------------------
@router.post("/save-result")
def save_result(
    result: InterviewResult,
    db: Session = Depends(get_db)
):
    print("Received:", result)

    user = (
        db.query(User)
        .filter(User.email == result.email)
        .first()
    )

    print("User found:", user)

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    interview = Interview(
        ats_score=result.ats_score,
        interview_score=result.interview_score,
        created_at=datetime.now().strftime("%d-%m-%Y %H:%M"),
        user_id=user.id
    )

    db.add(interview)
    db.commit()

    print("Interview saved successfully!")

    return {
        "success": True,
        "message": "Interview Saved Successfully"
    }


# ----------------------------
# INTERVIEW HISTORY
# ----------------------------
@router.get("/history/{email}")
def history(
    email: str,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return []

    interviews = (
        db.query(Interview)
        .filter(Interview.user_id == user.id)
        .order_by(Interview.id.desc())
        .all()
    )

    return [
        {
            "ats_score": interview.ats_score,
            "interview_score": interview.interview_score,
            "created_at": interview.created_at
        }
        for interview in interviews
    ]