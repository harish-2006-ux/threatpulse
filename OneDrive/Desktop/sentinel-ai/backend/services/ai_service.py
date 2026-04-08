import anthropic
from backend.ai import analyze_threat_raw

def analyze_threat(data):
    """AI threat analysis service."""
    cpu = data.get('cpu', 0)
    url = data.get('url', '')
    
    # Fallback CPU logic
    if cpu > 70:
        return {
            "risk_score": 70 + (cpu - 70) * 2,
            "level": "high",
            "explanation": f"CPU anomaly {cpu}% above baseline",
            "action": "Investigate process spikes"
        }
    
    # AI analysis
    try:
        return analyze_threat_raw(data)
    except Exception as e:
        return {
            "risk_score": 50,
            "level": "medium",
            "explanation": "AI fallback detection",
            "action": "Check connectivity"
        }

