# RAG AI Bot (Resume & HR Assistant)

A powerful Retrieval Augmented Generation (RAG) application designed to streamline HR processes and resume analysis. This tool leverages the speed of Groq's LLM inference to provide instant feedback on resumes, recommend suitable job roles, and answer queries based on internal company documents.

## 🚀 Features

- **Resume Analysis**: Upload resumes (PDF/DOCX) to extract text and gain insights.
- **Smart Role Recommendation**: AI analyzes the resume to suggest the best-fitting job roles, highlighting strengths and reasoning.
- **HR Policy Chatbot**: Upload HR documents (handbooks, policies) and ask questions. The bot answers strictly from the provided context.
- **RAG Architecture**: Combines vector search with Large Language Models for accurate, context-aware responses.
- **Modern UI**: Built with **React**, **Vite**, and **Mantine UI** for a responsive and polished user experience.

## 🛠️ Tech Stack

### Frontend
- **React** (v19)
- **Vite** (Build tool)
- **Mantine UI** (Component library)
- **Tailwind CSS** (Styling)
- **Axios** (API requests)
- **React Router** (Navigation)

### Backend
- **Python** (v3.9+)
- **FastAPI** (High-performance web framework)
- **Groq API** (LLM Provider - Llama 3)
- **Vector Store** (For document embedding and retrieval)

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher)
- **Python** (v3.9 or higher)
- **Git**

You will also need a **Groq API Key**.

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Bharath2332006/RAG-AI-BOT.git
cd RAG-AI-BOT
```

### 2. Backend Setup
Navigate to the root directory and set up the Python environment.

```bash
# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# Windows:
.venv\Scripts\activate
# Mac/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**Environment Variables:**
Create a `.env` file in the root directory (`d:\RAG\.env`) and add your API key:
```env
GROQ_API_KEY=your_gsk_key_here
```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies.

```bash
cd my-react-ui
npm install
```

## 🏃‍♂️ Running the Application

### Start the Backend Server
From the root directory (ensure your virtual environment is active):

```bash
python run.py
```
*Alternatively, you can run it using uvicorn directly:*
```bash
uvicorn backend.app:app --reload
```
The backend API will be available at `http://localhost:8000`.

### Start the Frontend Client
Open a new terminal, navigate to the frontend folder, and start the dev server:

```bash
cd my-react-ui
npm run dev
```
The application will be running at `http://localhost:5173`.

## 📖 Usage

1.  **Upload Resume**: Go to the "Upload Resume" page to submit a candidate's CV.
2.  **Upload HR Docs**: Upload company policy documents to the knowledge base.
3.  **Chat**: Use the "Chat" interface to ask questions like:
    *   *"What is the leave policy for probationers?"*
    *   *"Based on the uploaded resume, is this candidate a good fit for a Senior Dev role?"*
4.  **Recommend Role**: Use the recommendation feature to let the AI suggest the best role for a candidate.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.