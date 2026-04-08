import psutil
from datetime import datetime

def get_system_data():
    """Get comprehensive system metrics."""
    cpu = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory().percent
    timestamp = datetime.now().isoformat()
    
    return {
        "cpu": cpu,
        "memory": memory,
        "timestamp": timestamp,
        "baseline_cpu": 30
    }

