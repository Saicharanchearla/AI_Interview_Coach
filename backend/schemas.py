from pydantic import BaseModel, EmailStr


# ----------------------------
# USER SCHEMAS
# ----------------------------

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ----------------------------
# RESUME SCHEMA
# ----------------------------

class ResumeResponse(BaseModel):
    resume_text: str
    ats_score: int
    skills: list[str]
    missing_skills: list[str]
    questions: list[str]


# ----------------------------
# INTERVIEW SCHEMA
# ----------------------------

class InterviewResult(BaseModel):
    email: EmailStr
    ats_score: int
    interview_score: int


# ----------------------------
# DASHBOARD SCHEMA
# ----------------------------

class DashboardResponse(BaseModel):
    total_interviews: int
    best_score: int
    average_score: int