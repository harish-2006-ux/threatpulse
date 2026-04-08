from fastapi import APIRouter
from backend.services.log_service import get_logs, add_log

router = APIRouter(prefix="/logs", tags=["logs"])

@router.get("/")
async def get_all_logs():
    """Get all security logs."""
    logs = get_logs()
    return {"logs": logs}

@router.post("/")
async def create_log(log_data: dict):
    """Add new security log."""
    result = add_log(log_data)
    return {"status": "log created", "id": result}

