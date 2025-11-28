import pdfplumber
import docx
from typing import List


def extract_text(content: bytes, filename: str) -> List[str]:
    """
    Extract text from PDF or DOCX and return as chunks.
    """

    if filename.lower().endswith(".pdf"):
        return extract_pdf(content)

    elif filename.lower().endswith(".docx"):
        return extract_docx(content)

    else:
        # fallback (treat as raw text)
        text = content.decode("utf-8", errors="ignore")
        return chunk_text(text)


def extract_pdf(content: bytes) -> List[str]:
    text = ""

    # pdfplumber requires a file-like object
    import io
    with pdfplumber.open(io.BytesIO(content)) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""

    return chunk_text(text)


def extract_docx(content: bytes) -> List[str]:
    import io
    doc = docx.Document(io.BytesIO(content))

    text = "\n".join([p.text for p in doc.paragraphs])

    return chunk_text(text)


def chunk_text(text: str, chunk_size: int = 500) -> List[str]:
    """
    Splits text into chunks of 500 characters.
    """
    chunks = []
    text = text.replace("\n", " ")

    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])

    return chunks
