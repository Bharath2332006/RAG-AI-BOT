import uvicorn
import sys
import os
sys.path.append(os.getcwd())
try:
    import chromadb
    print("chromadb imported")
    from backend.app import app
    print("app imported")
except Exception as e:
    print(f"Error: {e}")
