from backend.db import supabase_client
from datetime import datetime

logs = []

def get_logs():
    """Get all security logs."""
    return logs

def add_log(data):
    """Add log entry to DB or local storage."""
    try:
        log_entry = {
            **data,
            "timestamp": datetime.now().isoformat(),
            "cpu": data.get('cpu', 0)
        }
        logs.append(log_entry)
        # supabase_client.table('logs').insert(log_entry).execute()
        return len(logs) - 1
    except Exception:
        logs.append(log_entry)
        return len(logs) - 1

