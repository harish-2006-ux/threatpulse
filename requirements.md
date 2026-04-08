# ThreatPulse AI — Requirements

## Functional Requirements

### FR-1: System Monitor
- The system shall collect CPU usage percentage via psutil at request time.
- The system shall return the top N running processes (name, PID, CPU %).
- If CPU usage exceeds 80%, the system shall automatically trigger an AI threat analysis.
- The frontend shall display CPU metrics and process list in real time.
- High-CPU events shall be flagged visually in the UI.

### FR-2: URL Scanner
- Users shall be able to submit a URL for threat analysis.
- The backend shall pass the URL to Claude for assessment.
- The response shall include a threat classification and explanation.
- Results shall be displayed in the Scanner component.

### FR-3: AI Threat Analysis
- The system shall use Claude 3 Haiku to analyze threat inputs.
- Analysis output shall include a severity level: `low`, `medium`, or `high`.
- The AI module shall handle API errors gracefully and return a fallback message.

### FR-4: Logging
- All threat analysis results (monitor and scan) shall be persisted to Supabase.
- Each log entry shall include: type, input, result, severity, and timestamp.
- The Logs component shall display historical entries with pagination.

### FR-5: Dashboard
- The dashboard shall show a summary of recent alerts and system status.
- It shall surface the most recent high-severity events.

---

## Non-Functional Requirements

### NFR-1: Performance
- Monitor endpoint response time should be under 3 seconds under normal load.
- URL scan response time should be under 5 seconds (AI latency dependent).

### NFR-2: Reliability
- The backend shall not crash on missing or malformed input — return structured error responses.
- Missing environment variables shall produce a clear startup error, not a runtime crash.

### NFR-3: Security
- API keys (Anthropic, Supabase) shall never be hardcoded or committed to version control.
- The URL scanner shall validate and sanitize input before passing to the AI model.
- Supabase Row Level Security (RLS) shall be enabled in production.

### NFR-4: Maintainability
- Backend modules (monitor, ai, db) shall remain decoupled and independently testable.
- A `requirements.txt` shall be maintained for all Python dependencies.

### NFR-5: Usability
- The UI shall be responsive and usable on desktop browsers.
- Threat severity levels shall be color-coded (e.g., red = high, yellow = medium, green = low).

---

## Environment Requirements

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | Yes | Claude API access |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_KEY` | Yes | Supabase anon/service key |

---

## Dependencies

### Backend (Python)
```
fastapi
uvicorn
psutil
anthropic
supabase
python-dotenv
```

### Frontend (Node)
```
react@18
axios
react-scripts (or vite)
```

---

## Out of Scope (Current Version)

- User authentication and role-based access
- Real-time WebSocket streaming for monitor data
- Mobile-responsive design
- Automated threat response actions
- Docker deployment (planned, not required for v1)
