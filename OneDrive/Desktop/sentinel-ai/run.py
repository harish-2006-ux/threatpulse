#!/usr/bin/env python3
\"\"\"One-click Sentinel AI demo.\"\"\"
import os
import subprocess
import webbrowser
import time

print("🚀 Sentinel AI Backend: http://localhost:8000")
print("📱 Dashboard: frontend/index.html")
print("Run: uvicorn backend.main:app --reload --port 8000")
print("Open: start frontend/index.html")

if __name__ == "__main__":
    subprocess.Popen([".venv/Scripts/Activate.ps1", "&", "uvicorn", "backend.main:app", "--reload", "--port", "8000"], shell=True)
    time.sleep(2)
    webbrowser.open("file:///c:/Users/User/OneDrive/Desktop/sentinel-ai/frontend/index.html")
