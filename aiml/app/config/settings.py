from functools import lru_cache
import os

from dotenv import load_dotenv
from pydantic import BaseModel, Field

load_dotenv()


class Settings(BaseModel):
    gemini_api_key: str = Field(default="", alias="GEMINI_API_KEY")
    environment: str = Field(default="development", alias="ENVIRONMENT")
    host: str = Field(default="127.0.0.1", alias="HOST")
    port: int = Field(default=8000, alias="PORT")

    model_config = {"populate_by_name": True}


@lru_cache
def get_settings() -> Settings:
    return Settings(
        GEMINI_API_KEY=os.getenv("GEMINI_API_KEY", ""),
        ENVIRONMENT=os.getenv("ENVIRONMENT", "development"),
        HOST=os.getenv("HOST", "127.0.0.1"),
        PORT=int(os.getenv("PORT", "8000")),
    )
