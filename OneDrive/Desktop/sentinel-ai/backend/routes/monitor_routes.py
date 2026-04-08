from fastapi import APIRouter
from backend.services.monitor_service import get_system_data

router = APIRouter(prefix="/monitor", tags=["monitor"])

@router.get("/")
async def monitor():
    """Get system monitoring data and AI analysis."""
    data = get_system_data()
    return {"status": "active", "data": data}

