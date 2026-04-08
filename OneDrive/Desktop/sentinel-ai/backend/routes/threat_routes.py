from fastapi import APIRouter, Query
from backend.services.ai_service import analyze_threat

router = APIRouter(prefix="/threats", tags=["threats"])

@router.get("/scan")
async def scan_threat(url: str = Query(..., description="URL to analyze")):
    """Scan URL for threats using AI."""
    data = {"url": url}
    result = analyze_threat(data)
    return {"url": url, "analysis": result}

