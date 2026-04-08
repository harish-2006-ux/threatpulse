from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ThreatAnalysis(BaseModel):
    risk_score: int
    level: str
    explanation: str
    action: str

class SystemMetrics(BaseModel):
    cpu: float
    memory: float
    timestamp: str
    baseline_cpu: float = 30.0

class LogEntry(BaseModel):
    cpu: float
    risk: str
    message: str
    risk_score: int
    timestamp: str

