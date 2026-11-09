from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def item_text(item: dict[str, str]) -> str:
    fields = ("title", "description", "category", "location", "date")
    return " ".join(item.get(field, "") for field in fields)


def similarity_scores(query: dict[str, str], candidates: list[dict[str, str]]) -> list[float]:
    if not candidates:
        return []

    texts = [item_text(query), *(item_text(candidate) for candidate in candidates)]
    matrix = TfidfVectorizer().fit_transform(texts)
    return cosine_similarity(matrix[0:1], matrix[1:]).flatten().tolist()
