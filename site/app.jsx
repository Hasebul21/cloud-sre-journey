// App shell — sidebar nav + view router. Persists current view in URL hash.

const NAV = [
  { id: "habits", label: "Weekly Habits", icon: "🔥", group: "" },
  { id: "_p0", label: "Part 0 · Interview Prep", group: "section" },
  { id: "p0-sd", label: "0A  System Design", icon: "🧩", group: "p0" },
  { id: "p0-behavior", label: "0B  Behavioral", icon: "💬", group: "p0" },
  { id: "p0-lld", label: "0D  Low-Level Design", icon: "🧱", group: "p0" },
  { id: "p0-sql", label: "0E  SQL / MySQL", icon: "🗄", group: "p0" },
  { id: "p0-dsa", label: "0F  DSA · 150", icon: "🧠", group: "p0" },
  { id: "p0-sched", label: "0G  Schedule", icon: "🗓", group: "p0" },
  { id: "_sre", label: "SRE Learning", group: "section" },
  { id: "sre-fnd",   label: "SRE 1  Foundations",        icon: "🏛", group: "sre" },
  { id: "sre-cod",   label: "SRE 2  Coding",             icon: "🐍", group: "sre" },
  { id: "sre-cloud", label: "SRE 3  Cloud + K8s",        icon: "☁️", group: "sre" },
  { id: "sre-auto",  label: "SRE 4  Automation",         icon: "⚙️", group: "sre" },
  { id: "sre-rel",   label: "SRE 5  Observability + SRE",icon: "📈", group: "sre" },
  { id: "_parts", label: "Mastery", group: "section" },
  { id: "part-a", label: "Part A · Lifecycle", icon: "🔄", group: "parts" },
  { id: "part-b", label: "Part B · Hands-on phases", icon: "🛠", group: "parts" },
  { id: "part-d", label: "Part D · SD for SRE", icon: "🏗", group: "parts" },
  { id: "part-e", label: "Part E · Coding", icon: "💻", group: "parts" },
  { id: "_jobs", label: "Job hunt", group: "section" },
  { id: "part-g", label: "Part G · APAC jobs", icon: "🌏", group: "jobs" },
  { id: "part-h", label: "Part H · Interview prep", icon: "🎤", group: "jobs" },
  { id: "part-i", label: "Part I · Personal branding", icon: "🌟", group: "jobs" },
  { id: "part-j", label: "Part J · Resources", icon: "📖", group: "jobs" },
];

const DEFAULT_VIEW = "sre-fnd";

const VIEW_MAP = {
  "overview": OverviewView,
  "habits": HabitsView,
  "p0-sd": P0_SysDesignView,
  "p0-behavior": P0_BehaviorView,
  "p0-lld": P0_LLDView,
  "p0-sql": P0_SQLView,
  "p0-dsa": P0_DSAView,
  "p0-sched": P0_ScheduleView,
  "sre-fnd":   SRE_FoundationsView,
  "sre-cod":   SRE_CodingView,
  "sre-cloud": SRE_CloudView,
  "sre-auto":  SRE_AutomationView,
  "sre-rel":   SRE_ReliabilityView,
  "part-a": PartAView,
  "part-b": PartBView,
  "part-d": PartDView,
  "part-e": PartEView,
  "part-g": PartGView,
  "part-h": PartHView,
  "part-i": PartIView,
  "part-j": PartJView,
};

function App() {
  const [view, setView] = useState(() => (location.hash.replace("#", "") || DEFAULT_VIEW));
  useEffect(() => {
    const onHash = () => setView(location.hash.replace("#", "") || DEFAULT_VIEW);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const go = (id) => {
    location.hash = id;
    window.scrollTo(0, 0);
  };

  const all = useAllProgress();
  const vg = viewGroups();
  const sidebarPct = (id) => {
    const groups = vg[id];
    if (!groups || groups.length === 0) return null;
    let d = 0, t = 0;
    groups.forEach(g => { d += all.groups[g]?.done || 0; t += all.groups[g]?.total || 0; });
    if (t === 0) return null;
    return Math.round(d / t * 100);
  };

  const Current = VIEW_MAP[view] || OverviewView;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">SRE Notebook<span className="dot">.</span></div>

        <nav className="nav">
          {NAV.map(n => {
            if (n.group === "section") {
              return <div key={n.id} className="nav-group-label">— {n.label} —</div>;
            }
            const pct = sidebarPct(n.id);
            return (
              <button key={n.id}
                className={"nav-item " + (view === n.id ? "active" : "")}
                onClick={() => go(n.id)}
              >
                <span className="icon">{n.icon}</span>
                <span>{n.label}</span>
                {pct !== null && <span className="mini-bar">{pct}%</span>}
              </button>
            );
          })}
        </nav>

        <div style={{marginTop: 24, fontSize: 11, color: "var(--ink-faint)", textAlign: "center", fontFamily: "Caveat, cursive", fontSize: 14}}>
          Saved in your browser ·
          <button onClick={() => {
            if (confirm("Export all progress to clipboard as JSON?")) {
              const dump = {};
              for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (k && k.startsWith("sre:")) dump[k] = localStorage.getItem(k);
              }
              navigator.clipboard.writeText(JSON.stringify(dump, null, 2));
              alert("Copied to clipboard!");
            }
          }} style={{textDecoration: "underline", marginLeft: 4, color: "var(--blue)"}}>export</button>
        </div>
      </aside>

      <main className="main">
        <Current />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
