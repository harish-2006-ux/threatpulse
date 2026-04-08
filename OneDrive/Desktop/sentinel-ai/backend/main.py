from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .monitor import get_system_data
from .ai import analyze_threat
from .db import save_log
from datetime import datetime
import json

app = FastAPI(title="Sentinel AI API", description="Cybersecurity monitoring backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def home():
    return {"message": "Sentinel AI Backend Running", "endpoints": ["/monitor", "/scan?url=..."]}

@app.get("/monitor")
async def monitor():
    data = get_system_data()
    data["time"] = datetime.now().strftime("%H:%M")
    
    NORMAL_CPU = 30
    if data["cpu"] > NORMAL_CPU + 40:
        try:
            result = analyze_threat(data)
        except:
            result = {
                "risk_score": 70,
                "level": "medium",
                "explanation": "Fallback detection based on CPU spike",
                "action": "Investigate processes"
            }
        
        save_log({
            "cpu": data["cpu"],
            "risk": result["level"],
            "message": result["explanation"],
            "risk_score": result["risk_score"]
        })
        
        return {
            "status": "anomaly",
            "analysis": result,
            "data": data
        }
    
    return {
        "status": "normal",
        "data": data
    }

@app.get("/scan")
async def scan(url: str):
    data = {"url": url, "time": datetime.now().strftime("%H:%M")}
    try:
        result = analyze_threat(data)
    except:
        result = {
            "risk_score": 50,
            "level": "low",
            "explanation": "URL scan fallback",
            "action": "Review manually"
        }
    
    save_log({
        "cpu": 0,
        "risk": result["level"],
        "message": result["explanation"],
        "risk_score": result["risk_score"]
    })
    return {
        "analysis": result
    }

