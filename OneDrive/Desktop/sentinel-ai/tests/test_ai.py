import pytest
from backend.ai import analyze_threat

def test_ai_json_format():
    result = analyze_threat({"cpu": 90})
    assert "risk_score" in result
    assert "level" in result
    assert isinstance(result["risk_score"], int)
    assert result["level"] in ["low", "medium", "high"]
