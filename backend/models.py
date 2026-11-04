from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    interviews = relationship("Interview", back_populates="user")

    resumes = relationship("Resume", back_populates="user")


class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    ats_score = Column(Integer)

    interview_score = Column(Integer)

    created_at = Column(String)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="interviews")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)

    resume_name = Column(String)

    resume_text = Column(String)

    ats_score = Column(Integer)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="resumes")