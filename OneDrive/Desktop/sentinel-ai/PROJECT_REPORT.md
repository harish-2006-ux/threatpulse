# Sentinel AI - Cybersecurity Monitoring Backend

## Overview
Sentinel AI is a FastAPI backend for real-time system monitoring, threat analysis using Anthropic AI, and logging to Supabase. Backend-only (frontend removed).

## Features
- **/monitor**: System metrics (CPU/RAM/psutil), AI threat analysis, Supabase logging.
- **/scan**: URL threat scan via AI.
- **CORS** enabled for future FE.

## Tech Stack
- **Backend**: FastAPI, Uvicorn
- **Monitoring**: psutil
- **AI**: Anthropic API (.env)
- **DB**: Supabase (logs table)
- **Env**: Python 3.14 .venv

## Setup
```
cd sentinel-ai
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```
- Update `.env`: ANTHROPIC_API_KEY, SUPABASE_URL, SUPABASE_KEY
- Run: `uvicorn backend.main:app --reload`
- Local Supabase: `npx supabase start`

## Supabase Schema
```
create table logs (
  id bigserial primary key,
  cpu numeric,
  risk text,
  message text,
  created_at timestamp default now()
);
```

## Tests
- API: localhost:8000/
- Monitor: localhost:8000/monitor
- Scan: localhost:8000/scan?url=example.com

## GitHub
https://github.com/Amoghboss/ThreatPulse-AI (main: 3e99c0a)

Backend ready for production!

