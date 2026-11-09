from google import genai

from app.config.settings import get_settings


async def generate_answer(question: str, campus_context: str) -> str | None:
    settings = get_settings()
    if not settings.gemini_api_key or settings.gemini_api_key == "your_gemini_api_key":
        return None

    prompt = (
        "Answer using only the approved campus information below. "
        "If the answer is not supported by it, say that the information is unavailable.\n\n"
        f"Approved campus information:\n{campus_context}\n\nQuestion: {question}"
    )

    try:
        client = genai.Client(api_key=settings.gemini_api_key)
        response = await client.aio.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        return response.text.strip() if response.text else None
    except Exception:
        return None
