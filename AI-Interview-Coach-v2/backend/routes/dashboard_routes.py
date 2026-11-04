from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import get_db
from models import User, Interview

router = APIRouter()


# ----------------------------
# DASHBOARD
# ----------------------------

@router.get("/dashboard/{email}")
def dashboard(
    email: str,
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        return {
            "total_interviews": 0,
            "best_score": 0,
            "average_score": 0
        }

    interviews = (
        db.query(Interview)
        .filter(Interview.user_id == user.id)
        .all()
    )

    if len(interviews) == 0:
        return {
            "total_interviews": 0,
            "best_score": 0,
            "average_score": 0
        }

    total = len(interviews)

    best = max(
        interview.interview_score
        for interview in interviews
    )

    average = int(
        sum(
            interview.interview_score
            for interview in interviews
        ) / total
    )

    return {
        "total_interviews": total,
        "best_score": best,
        "average_score": average
    }