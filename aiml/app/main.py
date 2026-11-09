from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes.assistant_routes import router as assistant_router
from app.api.routes.matching_routes import router as matching_router

app = FastAPI(title="CampusBuzz AIML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assistant_router)
app.include_router(matching_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "campusbuzz-aiml"}


@app.exception_handler(Exception)
async def application_error_handler(_request: Request, _error: Exception) -> JSONResponse:
    return JSONResponse(status_code=500, content={"detail": "Internal server error."})
