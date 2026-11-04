# AI Interview Coach

An interview preparation app with a React/Vite frontend and a FastAPI backend.

## Project layout

- `frontend/` — primary Vite frontend
- `backend/` — primary FastAPI API
- `AI-Interview-Coach-v2/` — an additional version included in the source archive

## Run locally

1. Install frontend dependencies in `frontend/` with `npm install`, then run `npm run dev`.
2. Install backend dependencies from `backend/requirements.txt`.
3. Set `GEMINI_API_KEY` in your local environment (or a local, untracked `backend/.env` file), then run `uvicorn app:app --reload` from `backend/`.

The frontend reads `VITE_API_URL` at build time and falls back to the prior Render API URL.
