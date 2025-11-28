from sentence_transformers import SentenceTransformer

_embedder = SentenceTransformer("all-MiniLM-L6-v2")

def embed_text(text: str):
    return _embedder.encode(text).tolist()
