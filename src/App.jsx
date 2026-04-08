import { useState, useEffect } from "react";

const alerts = [
  { type: "Trojan infection", device: "LAP456", time: "2 mins ago" },
  { type: "Command injection attempt", device: "DESKTOP-789", time: "8 mins ago" },
  { type: "Malicious network scan", device: "LAPTOP123", time: "16 mins ago" },
];

function GaugeChart({ value = 0.78 }) {
  const radius = 90, cx = 130, cy = 130;
  const startAngle = Math.PI, totalAngle = Math.PI;
  const toXY = (a) => ({ x: cx + radius * Math.cos(a), y: cy + radius * Math.sin(a) });
  const arc = (from, to, r) => {
    const a1 = startAngle + totalAngle * from;
    const a2 = startAngle + totalAngle * to;
    const p1 = toXY(a1), p2 = toXY(a2);
    return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${to - from > 0.5 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
  };
  const segments = [
    { color: "#22c55e", from: 0, to: 0.25 },
    { color: "#84cc16", from: 0.25, to: 0.45 },
    { color: "#eab308", from: 0.45, to: 0.65 },
    { color: "#f97316", from: 0.65, to: 0.82 },
    { color: "#ef4444", from: 0.82, to: 1 },
  ];
  const na = startAngle + totalAngle * value;
  const nx = cx + 78 * Math.cos(na), ny = cy + 78 * Math.sin(na);
  return (
    <svg viewBox="0 0 260 145" className="w-full max-w-xs mx-auto">
      {segments.map((s, i) => (
        <path key={i} d={arc(s.from, s.to, radius)} stroke={s.color} strokeWidth="22" fill="none" strokeLinecap="butt" />
      ))}
      <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="#f1f5f9" />
      <circle cx={cx} cy={cy} r="4" fill="#0f172a" />
      <text x="28" y="143" fill="#22c55e" fontSize="11" fontWeight="700">LOW</text>
      <text x="193" y="143" fill="#ef4444" fontSize="11" fontWeight="700">HIGH</text>
    </svg>
  );
}

function SparkLine({ color = "#06b6d4", points = [] }) {
  if (!points.length) return null;
  const w = 120, h = 40;
  const minY = Math.min(...points), maxY = Math.max(...points);
  const toX = (i) => (i / (points.length - 1)) * w;
  const toY = (v) => h - ((v - minY) / (maxY - minY + 1)) * h;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10">
      <polyline
        points={points.map((p, i) => `${toX(i)},${toY(p)}`).join(" ")}
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}

function NetworkChart() {
  const blue = [80, 110, 100, 130, 120, 150, 140, 170, 160, 190, 180, 210, 200];
  const orange = [40, 60, 55, 90, 80, 120, 110, 160, 150, 200, 220, 250, 270];
  const w = 300, h = 100;
  const all = [...blue, ...orange];
  const minY = Math.min(...all), maxY = Math.max(...all);
  const toX = (i) => (i / (blue.length - 1)) * w;
  const toY = (v) => h - ((v - minY) / (maxY - minY)) * (h - 10) - 5;
  const path = (pts) => pts.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(p)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-24">
      {[100, 200, 300].map((v) => (
        <line key={v} x1="0" y1={toY(v)} x2={w} y2={toY(v)} stroke="#334155" strokeWidth="0.5" strokeDasharray="4" />
      ))}
      {[100, 200, 300].map((v) => (
        <text key={v} x="4" y={toY(v) - 2} fill="#64748b" fontSize="9">{v}</text>
      ))}
      <path d={path(blue)} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {blue.map((p, i) => <circle key={i} cx={toX(i)} cy={toY(p)} r="2.5" fill="#38bdf8" />)}
      <path d={path(orange)} fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {orange.map((p, i) => <circle key={i} cx={toX(i)} cy={toY(p)} r="2.5" fill="#fb923c" />)}
    </svg>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 1600);
    return () => clearInterval(t);
  }, []);

  const navItems = [
    { icon: "⊙", label: "Dashboard" },
    { icon: "⚠", label: "Threats" },
    { icon: "☰", label: "Logs" },
    { icon: "▣", label: "Devices" },
    { icon: "⚙", label: "Settings" },
  ];

  const sparkData = [3, 5, 4, 6, 5, 7, 6, 8, 7, 6];

  return (
    <div
      className="min-h-screen flex flex-col text-slate-100"
      style={{ background: "#0d1117", fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <style>{`
        .card { background: #161b22; border: 1px solid #21262d; border-radius: 10px; }
        .card-blue { border-color: #1d4ed8; box-shadow: 0 0 16px #1d4ed820; }
        .nav-active { background: linear-gradient(90deg,#1d4ed820,#1d4ed808); border-left: 3px solid #3b82f6; color: #60a5fa; }
        .glow-cyan { text-shadow: 0 0 10px #22d3ee88; }
        .glow-green { text-shadow: 0 0 10px #4ade8088; }
        .glow-red { text-shadow: 0 0 10px #f8717188; }
        .glow-amber { text-shadow: 0 0 10px #fbbf2488; }
        .pulse { animation: pulse 1.6s ease-in-out infinite; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .scan { background: linear-gradient(90deg,transparent,#22d3ee18,transparent); animation: scan 3s linear infinite; }
        @keyframes scan { 0%{transform:translateX(-100%)} 100%{transform:translateX(500%)} }
        .optimize-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 10px;
          border: 1px solid #34d39966;
          box-shadow: 0 0 20px #10b98144, 0 4px 12px #05966944;
        }
        .optimize-btn:hover { transform: scale(1.05); box-shadow: 0 0 28px #10b98166; }
      `}</style>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 border-b" style={{ background: "#161b22", borderColor: "#21262d" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>🏠</div>
          <div className="w-7 h-7 rounded grid grid-cols-2 gap-0.5 overflow-hidden">
            {["#3b82f6","#6366f1","#f59e0b","#22c55e"].map((c, i) => (
              <div key={i} style={{ background: c }} />
            ))}
          </div>
          <span className="text-lg font-bold tracking-widest">
            Project <span style={{ color: "#60a5fa" }}>Name</span>
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm" style={{ color: "#8b949e" }}>
          {["User", "Settings", "Alerts"].map((item, i) => (
            <span key={item} className="flex items-center gap-5">
              {i > 0 && <span style={{ color: "#30363d" }}>|</span>}
              <span className="cursor-pointer hover:text-blue-400 transition-colors">{item}</span>
            </span>
          ))}
          <div className="relative ml-1">
            <span className="text-xl cursor-pointer">🔔</span>
            <span className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-slate-900 ${blink ? "bg-amber-400" : "bg-amber-600"}`} style={{ transition: "background 0.3s" }} />
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-52 flex flex-col py-3 gap-0.5 border-r" style={{ background: "#161b22", borderColor: "#21262d" }}>
          {navItems.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all duration-150 ${activeNav === label ? "nav-active" : "hover:bg-white/5"}`}
              style={{ color: activeNav === label ? "#60a5fa" : "#8b949e", border: "none", background: "none", cursor: "pointer", textAlign: "left" }}
            >
              <span className="text-base w-5 text-center">{icon}</span>
              {label}
            </button>
          ))}
        </aside>

        {/* Main grid */}
        <main className="flex-1 p-4 grid gap-3 overflow-hidden relative" style={{ gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto auto auto" }}>

          {/* Device card */}
          <div className="card card-blue p-4 flex items-center gap-4 relative overflow-hidden" style={{ gridColumn: "1 / 3" }}>
            <div className="scan absolute inset-y-0 w-1/4 opacity-60" />
            <div className="relative text-5xl">💻
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "#8b949e" }}>Active Device</p>
              <h2 className="text-lg font-bold">Laptop-Model: <span className="text-cyan-400 glow-cyan">XYZ123</span></h2>

              </div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-widest" style={{ color: "#8b949e" }}>Status</div>
              <div className="text-green-400 font-bold text-sm mt-1 glow-green">● ONLINE</div>
              <div className="text-xs mt-1" style={{ color: "#8b949e" }}>Last sync: 2s ago</div>
            </div>
          </div>

          {/* Network Traffic */}
          <div className="card p-4 flex flex-col" style={{ gridColumn: "3", gridRow: "1 / 3" }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#c9d1d9" }}>Network Traffic</h3>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: "#22d3ee", border: "1px solid #22d3ee44" }}>LIVE</span>
            </div>
            <NetworkChart />
            <div className="flex gap-4 mt-2 text-xs" style={{ color: "#8b949e" }}>
              <span><span style={{ color: "#38bdf8" }}>●</span> Inbound</span>
              <span><span style={{ color: "#fb923c" }}>●</span> Outbound</span>
            </div>
            <div className="mt-auto pt-3 border-t text-xs flex justify-between" style={{ borderColor: "#21262d", color: "#8b949e" }}>
              <span>Peak: <span style={{ color: "#fb923c", fontWeight: 700 }}>270 MB/s</span></span>
              <span>Avg: <span style={{ color: "#38bdf8", fontWeight: 700 }}>185 MB/s</span></span>
            </div>
          </div>

          {/* CPU */}
          <div className="card p-4 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#8b949e" }}>CPU Usage</p>
            <p className="text-4xl font-bold text-cyan-400 glow-cyan">15<span className="text-xl">%</span></p>
            <div className="w-full rounded-full h-1.5 mt-2" style={{ background: "#21262d" }}>
              <div className="h-1.5 rounded-full" style={{ width: "15%", background: "linear-gradient(90deg,#22d3ee,#3b82f6)" }} />
            </div>
          </div>

          {/* Memory */}
          <div className="card p-4 flex flex-col justify-between">
            <p className="text-xs uppercase tracking-widest" style={{ color: "#8b949e" }}>Memory Usage</p>
            <p className="text-4xl font-bold" style={{ color: "#a78bfa", textShadow: "0 0 10px #a78bfa88" }}>47<span className="text-xl">%</span></p>
            <div className="w-full rounded-full h-1.5 mt-2" style={{ background: "#21262d" }}>
              <div className="h-1.5 rounded-full" style={{ width: "47%", background: "linear-gradient(90deg,#8b5cf6,#a78bfa)" }} />
            </div>
          </div>

          {/* Threats + System Status */}
          <div className="card p-4 flex items-center justify-between" style={{ gridColumn: "1 / 3" }}>
            <div>
              <p className="text-xs uppercase tracking-widest" style={{ color: "#8b949e" }}>Active Threats</p>
              <p className="text-4xl font-bold text-amber-400 glow-amber mt-1">3 <span className="text-lg font-normal" style={{ color: "#f59e0b" }}>Active</span></p>
            </div>
            <div className="border-l pl-6 ml-4" style={{ borderColor: "#21262d" }}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: "#c9d1d9" }}>System Status</h3>
                <span className="text-xs px-2 py-0.5 rounded-full ml-3 glow-green" style={{ color: "#4ade80", border: "1px solid #4ade8044" }}>Normal</span>
              </div>
              <div className="flex items-center gap-2 my-1">
                <span className="text-xl">✅</span>
                <span className="text-green-400 font-bold glow-green">Normal</span>
              </div>
              <SparkLine color="#4ade80" points={sparkData} />
            </div>
          </div>

          {/* Risk Gauge */}
          <div className="card p-4 flex flex-col" style={{ gridColumn: "1 / 3" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#c9d1d9" }}>Risk Level</h3>
            <GaugeChart value={0.78} />
            <p className="text-center font-bold text-lg glow-red" style={{ color: "#f87171" }}>⚠ High Risk</p>
          </div>

          {/* Threat Alerts */}
          <div className="card p-4 flex flex-col gap-3 relative" style={{ gridColumn: "3" }}>
            <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: "#c9d1d9" }}>Threat Alerts</h3>
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pl-3" style={{ borderLeft: "2px solid #f59e0b66" }}>
                <span className={`text-amber-400 text-sm mt-0.5 ${blink ? "opacity-100" : "opacity-40"}`} style={{ transition: "opacity 0.3s" }}>▲</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-tight" style={{ color: "#e6edf3" }}>{a.type}</p>
                  <p className="text-xs" style={{ color: "#8b949e" }}>on <span style={{ color: "#22d3ee" }}>{a.device}</span></p>
                </div>
                <span className="text-xs whitespace-nowrap" style={{ color: "#6e7681" }}>{a.time}</span>
              </div>
            ))}
          </div>

        </main>
      </div>

      {/* Optimize button — fixed bottom right, square */}
      <button
        className="optimize-btn fixed flex items-center gap-2 px-5 py-3 text-sm font-bold text-white uppercase tracking-widest transition-all duration-200"
        style={{ bottom: "24px", right: "24px", zIndex: 50 }}
      >
        <span>⚡</span>
        Optimize
      </button>
    </div>
  );
}
