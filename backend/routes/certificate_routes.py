from fastapi import APIRouter
from datetime import datetime
import random

router = APIRouter()


@router.get("/certificate/{username}")
def generate_certificate(username: str):

    certificate_id = (
        "AIC-"
        + str(random.randint(100000, 999999))
    )

    return {
        "success": True,
        "username": username,
        "certificate_id": certificate_id,
        "course": "AI Interview Coach - Mock Interview",
        "completion_date": datetime.now().strftime("%d %B %Y"),
        "organization": "AI Interview Coach",
        "message": "Congratulations! You have successfully completed the AI Mock Interview."
    }