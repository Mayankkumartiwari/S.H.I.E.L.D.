from app.api.schemas.matching_schema import MatchResult, MatchingRequest, MatchingResponse
from app.core.similarity import similarity_scores


def find_matches(request: MatchingRequest) -> MatchingResponse:
    candidates = [candidate.model_dump() for candidate in request.candidates]
    query = request.query.model_dump()
    scores = similarity_scores(query, candidates)
    ranked = sorted(
        zip(request.candidates, scores),
        key=lambda result: result[1],
        reverse=True,
    )

    return MatchingResponse(
        matches=[
            MatchResult(item=item, similarity_score=round(score, 4))
            for item, score in ranked[: request.limit]
        ]
    )
