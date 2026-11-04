from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin
from auth import (
    hash_password,
    verify_password,
    create_access_token,
)

router = APIRouter()


# -------------------------
# SIGNUP
# -------------------------

@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    token = create_access_token(
        {"sub": new_user.email}
    )

    return {
        "success": True,
        "message": "Account Created Successfully",
        "token": token,
        "name": new_user.name,
        "email": new_user.email
    }


# -------------------------
# LOGIN
# -------------------------

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if not db_user:
        return {
            "success": False,
            "message": "User not found"
        }

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {
            "success": False,
            "message": "Invalid Password"
        }

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "success": True,
        "message": "Login Successful",
        "token": token,
        "name": db_user.name,
        "email": db_user.email
    }