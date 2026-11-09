# CampusBuzz AIML Service

Independent FastAPI service foundation for CampusBuzz assistant and lost-and-found matching capabilities.

## Setup

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Copy `.env.example` to `.env` and set `GEMINI_API_KEY` when Gemini integration is enabled.

## Run

```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

## Endpoints

- `GET /health`
- `POST /api/assistant/chat`
- `POST /api/matching/find`
