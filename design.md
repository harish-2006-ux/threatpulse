# ThreatPulse AI — Design Document

## Overview

ThreatPulse AI (internally: Sentinel AI) is a cybersecurity monitoring and threat detection platform. It provides real-time system visibility, AI-powered threat analysis, and persistent logging through a web interface.

---

## Architecture

```
Frontend (React 18)
    │
    │  HTTP (proxied)
    ▼
Backend (FastAPI)
    ├── Monitor Module (psutil)       — system metrics
    ├── AI Module (Claude 3 Haiku)    — threat analysis
    └── DB Module (Supabase)          — event logging
```

### Component Breakdown

**Frontend** (`src/`)
- `App.js` — root component, routing, layout
- `components/Dashboard.js` — overview of system health and recent alerts
- `components/Monitor.js` — live CPU/process display with threat flags
- `components/Scanner.js` — URL input and AI scan results
- `components/Logs.js` — paginated threat log viewer
- `services/api.js` — Axios wrapper for all backend calls

**Backend** (`backend/`)
- `main.py` — FastAPI app, CORS, endpoint definitions
- `moniter.py` — psutil integration, returns CPU % and top processes
- `ai.py` — Anthropic Claude client, prompt construction, response parsing
- `db.py` — Supabase client, insert/query threat logs

---

## Data Flow

### System Monitor Flow
```
User opens Monitor tab
  → GET /monitor
  → psutil collects CPU % + top processes
  → if CPU > 80%: trigger Claude analysis
  → result + metrics returned to frontend
  → logged to Supabase
```

### URL Scanner Flow
```
User submits URL
  → GET /scan?url=<url>
  → Claude analyzes URL for threat indicators
  → result returned to frontend
  → logged to Supabase
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/monitor` | Returns CPU %, top processes, optional AI analysis |
| GET | `/scan?url=` | Returns AI threat assessment for a given URL |
| GET | `/logs` | Returns paginated threat log entries from Supabase |

---

## Database Schema (Supabase)

**Table: `threat_logs`**

| Column | Type | Description |
|--------|------|-------------|
| `id` | uuid | Primary key |
| `created_at` | timestamp | Auto-generated |
| `type` | text | `monitor` or `scan` |
| `input` | text | URL or system snapshot |
| `result` | text | AI analysis output |
| `severity` | text | `low`, `medium`, `high` |

---

## AI Integration

- Model: `claude-3-haiku-20240307`
- Provider: Anthropic
- Usage: Threat classification from system state or URL input
- Prompt strategy: structured input with explicit severity output format

---

## Frontend–Backend Communication

- React dev server proxies `/api/*` to `http://localhost:8000`
- Axios base URL configured in `services/api.js`
- CORS enabled on FastAPI for `http://localhost:3000`

---

## Security Considerations

- API keys stored in `.env`, never committed
- No authentication layer yet (planned)
- Input sanitization needed on URL scanner endpoint
- Supabase RLS policies recommended for production

---

## Deployment (Planned)

- Docker Compose: one container for FastAPI, one for React (or static build served via nginx)
- Environment variables injected at runtime
- Supabase hosted (no self-hosting needed)
