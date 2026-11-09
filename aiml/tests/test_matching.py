from app.core.similarity import similarity_scores


def test_similarity_scores_rank_related_items() -> None:
    query = {"title": "blue water bottle", "category": "bottle"}
    candidates = [
        {"title": "blue water bottle", "category": "bottle"},
        {"title": "student notebook", "category": "stationery"},
    ]

    scores = similarity_scores(query, candidates)

    assert scores[0] > scores[1]
