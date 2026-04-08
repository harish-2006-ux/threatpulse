from fastapi import FastAPI
from monitor import get_system_data
from ai import analyze_threat
from db import save_log

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Sentinel AI Running"}

# 🔥 SYSTEM MONITOR + AI
@app.get("/monitor")
def monitor():

    data = get_system_data()

    # simple detection
    if data["cpu"] > 80:
        result = analyze_threat(data)

        save_log({
            "cpu": data["cpu"],
            "risk": "high",
            "message": result
        })

        return {
            "status": "suspicious",
            "analysis": result,
            "data": data
        }

    return {
        "status": "normal",
        "data": data
    }

# 🌐 URL SCANNER
@app.get("/scan")
def scan(url: str):

    data = {"url": url}

    result = analyze_threat(data)

    save_log({
        "cpu": 0,
        "risk": "url",
        "message": result
    })

    return {
        "analysis": result
    }