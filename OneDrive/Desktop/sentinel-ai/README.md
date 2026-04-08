# Sentinel AI - Cybersecurity Demo ✅ LIVE

## 🎯 Quick Demo (1 minute setup)
1. Backend running: `http://localhost:8000` ✅
2. Open `index.html` in browser
3. **LIVE MONITORING** auto-refreshes CPU + AI threats
4. **SCAN URL** test phishing sites

## 🚀 Backend Status
```
Endpoints:
/monitor → CPU + processes + AI risk score
/scan?url=... → URL threat analysis
```
**Test:** `curl http://localhost:8000/monitor`

## 📱 Frontend Dashboard
- `index.html` (standalone, no build needed)
- Real-time CPU monitoring
- AI risk detection (low/medium/high)
- URL scanner
- Auto-refresh 10s

## 🛠️ Setup (Production Ready)
```powershell
# Backend
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn backend.main:app --reload --port 8000

# Open Demo
start index.html
```

**.env.example** (copy to .env)
```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=https://...
SUPABASE_KEY=eyJ...
```
**One-click:** `python run.py`


## 🧪 Features LIVE
| Endpoint | CPU Trigger | AI Analysis | Logs |
|----------|-------------|-------------|------|
| /monitor | >70% spike | ✅ JSON risk | Supabase/mock |
| /scan    | URL input  | ✅ Threat score | ✅ Saved |

## 🎉 DEMO FLOW
1. **Normal**: CPU 20% → "normal"
2. **Anomaly**: Run stress test → CPU 80% → "HIGH RISK" + AI explanation
3. **Scan**: "phishing.com" → AI verdict
4. **Logs**: Check Supabase/console

**Sentinel AI: Backend + Dashboard COMPLETE. Ready for judges!**


