import json
from pathlib import Path

from app.api.schemas.assistant_schema import AssistantResponse
from app.core.gemini import generate_answer

_CAMPUS_DATA_PATH = Path(__file__).parents[1] / "knowledge_base" / "campus_data.json"


def _load_campus_context() -> str:
    with _CAMPUS_DATA_PATH.open(encoding="utf-8") as campus_file:
        return json.dumps(json.load(campus_file), ensure_ascii=False)


async def answer_question(question: str) -> AssistantResponse:
    context = _load_campus_context()
    answer = await generate_answer(question, context)

    if answer is None:
        return AssistantResponse(
            answer="I do not have approved campus information for that question yet.",
            source="approved campus information",
        )

    return AssistantResponse(answer=answer, source="Gemini with approved campus information")
