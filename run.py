import sys
import os

# Add current directory to sys.path
# Add current directory to sys.path
sys.path.append(os.getcwd())

from backend.app import app

if __name__ == "__main__":
    import uvicorn
    print("Starting server from run.py...")
    try:
        uvicorn.run(app, host="127.0.0.1", port=8000)
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
