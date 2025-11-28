import chromadb
from .embeddings import embed_text

from chromadb.config import Settings

# Persistent Chroma client
chroma_client = chromadb.PersistentClient(
    path="./storage/chroma",
    settings=Settings(anonymized_telemetry=False)
)

# Collections for resumes and HR documents
resume_collection = chroma_client.get_or_create_collection(
    name="resumes",
    metadata={"hnsw:space": "cosine"}
)

hr_collection = chroma_client.get_or_create_collection(
    name="hr_documents",
    metadata={"hnsw:space": "cosine"}
)

# ================================
# RESUME FUNCTIONS
# ================================

def add_resume_to_db(resume_id: str, text_chunks: list):
    embeddings = [embed_text(chunk) for chunk in text_chunks]
    ids = [f"{resume_id}_{i}" for i in range(len(text_chunks))]
    metadatas = [{"resume_id": resume_id} for _ in text_chunks]

    resume_collection.add(
        ids=ids,
        documents=text_chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )
    return True


def search_resumes(query: str, top_k: int = 5):
    query_embedding = embed_text(query)

    return resume_collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )


def get_resume_chunks(resume_id: str):
    """
    Returns ALL chunks from the resume (flattened).
    """
    results = resume_collection.get(where={"resume_id": resume_id})
    docs = results.get("documents", [])

    # flatten
    if len(docs) > 0 and isinstance(docs[0], list):
        # Chroma sometimes returns nested lists, fix it
        return docs[0]
    return docs


def get_all_chunks_by_resume_id(resume_id: str):
    """
    SAFE function used by the RAG pipeline.
    Always returns a flat list of text chunks.
    """
    results = resume_collection.get(where={"resume_id": resume_id})
    docs = results.get("documents", [])

    # docs = [["chunk1", "chunk2"]]  -> flatten
    if len(docs) == 1 and isinstance(docs[0], list):
        return docs[0]

    # docs = ["chunk1", "chunk2"]
    return docs


# ================================
# HR DOCUMENT FUNCTIONS
# ================================

def add_hr_doc_to_db(doc_id: str, text_chunks: list):
    embeddings = [embed_text(chunk) for chunk in text_chunks]
    ids = [f"{doc_id}_{i}" for i in range(len(text_chunks))]
    metadatas = [{"doc_id": doc_id} for _ in text_chunks]

    hr_collection.add(
        ids=ids,
        documents=text_chunks,
        embeddings=embeddings,
        metadatas=metadatas
    )
    return True


def search_hr_docs(query: str, top_k: int = 5):
    query_embedding = embed_text(query)

    return hr_collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k
    )
