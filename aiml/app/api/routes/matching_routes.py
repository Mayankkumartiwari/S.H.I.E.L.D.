from fastapi import APIRouter, HTTPException

from app.api.schemas.matching_schema import MatchingRequest, MatchingResponse
from app.services.matching_service import find_matches

router = APIRouter(prefix="/api/matching", tags=["matching"])


@router.post("/find", response_model=MatchingResponse)
def find_matching_items(request: MatchingRequest) -> MatchingResponse:
    try:
        return find_matches(request)
    except Exception as error:
        raise HTTPException(status_code=500, detail="Unable to process matching request.") from error
