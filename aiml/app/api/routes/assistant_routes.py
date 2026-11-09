from fastapi import APIRouter, HTTPException

from app.api.schemas.assistant_schema import AssistantRequest, AssistantResponse
from app.services.assistant_service import answer_question

router = APIRouter(prefix="/api/assistant", tags=["assistant"])


@router.post("/chat", response_model=AssistantResponse)
async def chat(request: AssistantRequest) -> AssistantResponse:
    try:
        return await answer_question(request.question)
    except Exception as error:
        raise HTTPException(status_code=500, detail="Unable to process assistant request.") from error
