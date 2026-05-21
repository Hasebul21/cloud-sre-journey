// App shell — two-pane TOC. Persists current view in URL hash.

const NAV = [
  { id: "_learn", label: "Learn", group: "section" },
  { id: "sre-fnd",      label: "01 · Foundations",      crumb: "Learn / 01 · Foundations",             group: "learn" },
  { id: "sre-cod",      label: "02 · Coding",           crumb: "Learn / 02 · Coding",                  group: "learn" },
  { id: "sre-cloud",    label: "03 · Cloud & K8s",      crumb: "Learn / 03 · Cloud & K8s",             group: "learn" },
  { id: "sre-auto",     label: "04 · Automation",       crumb: "Learn / 04 · Automation",              group: "learn" },
  { id: "sre-rel",      label: "05 · Reliability",      crumb: "Learn / 05 · Reliability",             group: "learn" },
  { id: "p0-sd",        label: "System Design",         crumb: "Learn / System Design",                group: "learn" },
  { id: "part-ai",      label: "AI Engineering",        crumb: "Learn / AI Engineering",               group: "learn" },

  { id: "_practice", label: "Practice", group: "section" },
  { id: "p0-behavior",  label: "Behavioral",            crumb: "Practice / Behavioral",                group: "practice" },
  { id: "p0-lld",       label: "LLD",                   crumb: "Practice / Low-Level Design",          group: "practice" },
  { id: "p0-sql",       label: "SQL · 30",              crumb: "Practice / SQL",                       group: "practice" },
];

const DEFAULT_VIEW = "sre-fnd";

const VIEW_MAP = {
  "overview":     OverviewView,
  "p0-sd":        P0_SysDesignView,
  "p0-behavior":  P0_BehaviorView,
  "p0-lld":       P0_LLDView,
  "p0-sql":       P0_SQLView,
  "p0-dsa":       P0_DSAView,
  "sre-fnd":      SRE_FoundationsView,
  "sre-cod":      SRE_CodingView,
  "sre-cloud":    SRE_CloudView,
  "sre-auto":     SRE_AutomationView,
  "sre-rel":      SRE_ReliabilityView,
  "part-ai":      PartAIView,
  "part-b":       PartBView,
  "part-e":       PartEView,
  "part-g":       PartGView,
  "part-h":       PartHView,
  "part-i":       PartIView,
  "part-j":       PartJView,
};

function renderCrumb(crumb) {
  if (!crumb) return null;
  const parts = crumb.split(" / ");
  if (parts.length === 1) return <span className="leaf">{parts[0]}</span>;
  const head = parts.slice(0, -1).join(" / ");
  const leaf = parts[parts.length - 1];
  return <>{head}&nbsp;&nbsp;/&nbsp;&nbsp;<span className="leaf">{leaf}</span></>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );
  const flip = () => {
    const next = theme === "dark" ? "light" : "dark";
    if (next === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    try { localStorage.setItem("sre:theme", next); } catch (e) {}
    setTheme(next);
  };
  return <button onClick={flip} title="Toggle dark / light mode">{theme === "dark" ? "light mode" : "dark mode"}</button>;
}

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

  const current = NAV.find(n => n.id === view);
  const Current = VIEW_MAP[view] || OverviewView;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">SRE Notebook<span className="dot">.</span></div>

        <div className="search" title="Search not wired yet">
          <span className="kbd-hint">⌘K</span> search…
        </div>

        <nav className="nav">
          {NAV.map(n => {
            if (n.group === "section") {
              return <div key={n.id} className="nav-group-label">{n.label}</div>;
            }
            const pct = sidebarPct(n.id);
            return (
              <button key={n.id}
                className={"nav-item " + (view === n.id ? "active" : "")}
                onClick={() => go(n.id)}
              >
                <span>{n.label}</span>
                {pct !== null && <span className="mini-bar">{pct}%</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-foot">
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
          }}>export</button>
          {' · '}
          <ThemeToggle />
        </div>
      </aside>

      <main className="main">
        {current?.crumb && <div className="crumb">{renderCrumb(current.crumb)}</div>}
        <Current />
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
