# Sentinel AI - Backend Cybersecurity API

## Overview
Sentinel AI backend API for real-time system monitoring, AI threat analysis, URL scanning, logs. 
FastAPI with Anthropic, psutil, Supabase.

Hosted at https://github.com/Amoghboss/ThreatPulse-AI.

## Setup
1. **Backend**:
   ```
   .venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```
   Update .env:
   ```
   ANTHROPIC_API_KEY=your_key
   SUPABASE_URL=your_project_url
   SUPABASE_KEY=your_anon_key
   ```

2. **Supabase**: Cloud (.env) or local Docker.

## Run
`uvicorn backend.main:app --reload --port 8000`

Endpoints:
- GET /monitor - system data + AI analysis
- GET /scan?url=example.com - URL threat scan

## Structure
```
sentinel-ai/
├── backend/ (main.py, ai.py, db.py, monitor.py)
├── requirements.txt
├── .env
└── README.md
```

Features complete. Backend ready!


