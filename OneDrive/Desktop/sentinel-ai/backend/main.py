from fastapi import FastAPI\nfrom fastapi.middleware.cors import CORSMiddleware\nfrom monitor import get_system_data\nfrom ai import analyze_threat\nfrom db import save_log\n\napp = FastAPI()\n\napp.add_middleware(\n    CORSMiddleware,\n    allow_origins=["http://localhost:3000"],\n    allow_credentials=True,\n    allow_methods=["*"],\n    allow_headers=["*"],\n)\n

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