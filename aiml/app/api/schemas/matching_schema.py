from pydantic import BaseModel, Field


class MatchingItem(BaseModel):
    title: str
    description: str = ""
    category: str = ""
    location: str = ""
    date: str = ""


class MatchingRequest(BaseModel):
    query: MatchingItem
    candidates: list[MatchingItem] = Field(default_factory=list)
    limit: int = Field(default=5, ge=1, le=50)


class MatchResult(BaseModel):
    item: MatchingItem
    similarity_score: float


class MatchingResponse(BaseModel):
    matches: list[MatchResult]
