import sqlite3
import os

# Define the path to the database file in the exact same directory as this script
DB_PATH = os.path.join(os.path.dirname(__file__), "auth.db")

# Establish connection with multithreading checks disabled for FastAPI compatibility
conn = sqlite3.connect(DB_PATH, check_same_thread=False)
cursor = conn.cursor()

# ----------------------------
# INITIALIZE DATABASE TABLES
# ----------------------------

# 1. Create Users Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
)
""")

# 2. Create Interview History Table
cursor.execute("""
CREATE TABLE IF NOT EXISTS interview_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    ats_score INTEGER,
    interview_score INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
""")

# Save the table structures immediately
conn.commit()