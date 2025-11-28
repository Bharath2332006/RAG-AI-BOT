from contextlib import asynccontextmanager
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRouter
from typing import Optional
from pydantic import BaseModel
import uuid

# Correct imports based on your folder structure
from core.parsing import extract_text
from core.vectorstore import (
    add_resume_to_db,
    search_resumes,
    get_resume_chunks,
    add_hr_doc_to_db,
    search_hr_docs,
)
from backend.llm import generate_answer


# ------------------------------------------
# FASTAPI SETUP
# ------------------------------------------

app = FastAPI(title="RAG Resume Analyzer", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex="https?://.*",  # Allow all http and https origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

upload_router = APIRouter(prefix="/upload", tags=["Upload"])
chat_router = APIRouter(prefix="/api", tags=["Chat"])

# Store the last uploaded resume
last_uploaded_resume_id = None


# ------------------------------------------
# Models
# ------------------------------------------

class ChatRequest(BaseModel):
    question: str
    resume_id: Optional[str] = None


# ------------------------------------------
# UPLOAD RESUME
# ------------------------------------------

@upload_router.post("/resume")
async def upload_resume(file: UploadFile = File(...)):
    global last_uploaded_resume_id

    content = await file.read()
    resume_id = str(uuid.uuid4())

    text_chunks = extract_text(content, file.filename)

    add_resume_to_db(resume_id, text_chunks)

    last_uploaded_resume_id = resume_id

    return {
        "resume_id": resume_id,
        "message": "Resume uploaded successfully"
    }


# ------------------------------------------
# UPLOAD HR DOCUMENT
# ------------------------------------------

@upload_router.post("/hr-document")
async def upload_hr_doc(file: UploadFile = File(...)):
    content = await file.read()
    doc_id = "HRDOC-" + str(uuid.uuid4())

    text_chunks = extract_text(content, file.filename)
    add_hr_doc_to_db(doc_id, text_chunks)

    return {
        "doc_id": doc_id,
        "message": "HR document uploaded successfully"
    }


# ------------------------------------------
# CHAT ENDPOINT (RAG)
# ------------------------------------------

@chat_router.post("/chat")
async def chat(req: ChatRequest):

    # Auto-use last resume if not provided
    resume_id = req.resume_id or last_uploaded_resume_id

    if not resume_id:
        raise HTTPException(
            status_code=400,
            detail="Please upload a resume first."
        )

    # -----------------------------
    # 1. Fetch resume chunks (All)
    # -----------------------------
    resume_chunks = get_resume_chunks(resume_id)

    # -----------------------------
    # 2. Search HR doc chunks
    # -----------------------------
    hr_results = search_hr_docs(req.question, top_k=3)
    hr_chunks = hr_results.get("documents", [[]])[0]

    # -----------------------------
    # 3. Build final RAG context
    # -----------------------------
    full_context = "\n\n".join((resume_chunks + hr_chunks)[:5])

    # -----------------------------
    # 4. Generate answer (Groq LLM)
    # -----------------------------
    try:
        answer = generate_answer(full_context, req.question)
    except Exception as e:
        print(f"LLM Error: {e}")
        answer = "I apologize, but I'm currently experiencing high traffic (Rate Limit Reached). Please try again in a moment."

    return {
        "answer": answer,
        "resume_id": resume_id,
        "sources": ["resume", "hr-docs"]
    }

@chat_router.post("/recommend-role")
async def recommend_role(req: dict):
    resume_id = req.get("resume_id")

    if not resume_id:
        raise HTTPException(status_code=400, detail="resume_id missing")

    chunks = get_resume_chunks(resume_id)
    resume_text = "\n".join(chunks)

    instruction = """
    Analyze the resume and provide:
    - Recommended Role
    - Top Strengths
    - Reasoning
    """

    try:
        answer = generate_answer(resume_text, instruction)
    except Exception as e:
        print(f"LLM Error: {e}")
        answer = "Rate Limit Reached. Please try again later."

    return {
        "resume_id": resume_id,
        "recommended_role": "Software Engineer",
        "strengths": ["Problem Solving", "Logical Thinking"],
        "reasoning": ["Matches resume details"],
        "raw_answer": answer
    }

# ------------------------------------------
# ROUTERS
# ------------------------------------------

app.include_router(upload_router)
app.include_router(chat_router)


@app.get("/")
def root():
    return {"message": "API Running!", "docs": "/docs"}
