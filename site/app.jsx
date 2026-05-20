// App shell — two-pane TOC. Persists current view in URL hash.

const NAV = [
  { id: "_daily", label: "Daily", group: "section" },
  { id: "habits",       label: "Habits",                crumb: "Daily · Habits",                       group: "daily" },
  { id: "p0-sched",     label: "Schedule",              crumb: "Daily · Schedule",                     group: "daily" },

  { id: "_learn", label: "Learn", group: "section" },
  { id: "sre-fnd",      label: "Foundations",           crumb: "Learn · SRE · Foundations",            group: "learn" },
  { id: "sre-cod",      label: "Coding",                crumb: "Learn · SRE · Coding",                 group: "learn" },
  { id: "sre-cloud",    label: "Cloud + K8s",           crumb: "Learn · SRE · Cloud + K8s",            group: "learn" },
  { id: "sre-auto",     label: "Automation",            crumb: "Learn · SRE · Automation",             group: "learn" },
  { id: "sre-rel",      label: "Observability + SRE",   crumb: "Learn · SRE · Observability + SRE",    group: "learn" },
  { id: "part-ai",      label: "AI Engineer · L1–4",    crumb: "Learn · AI Engineering for SRE",       group: "learn" },
  { id: "part-a",       label: "Lifecycle",             crumb: "Learn · Lifecycle",                    group: "learn" },

  { id: "_practice", label: "Practice", group: "section" },
  { id: "p0-sd",        label: "System Design",         crumb: "Practice · System Design",             group: "practice" },
  { id: "p0-behavior",  label: "Behavioral",            crumb: "Practice · Behavioral",                group: "practice" },
  { id: "p0-lld",       label: "LLD",                   crumb: "Practice · Low-Level Design",          group: "practice" },
  { id: "p0-sql",       label: "SQL · 30",              crumb: "Practice · SQL",                       group: "practice" },
  { id: "p0-dsa",       label: "DSA · 150",             crumb: "Practice · DSA",                       group: "practice" },
  { id: "part-b",       label: "Hands-on",              crumb: "Practice · Hands-on phases",           group: "practice" },
  { id: "part-d",       label: "SD for SRE",            crumb: "Practice · System Design for SRE",     group: "practice" },
  { id: "part-e",       label: "Coding (Part E)",       crumb: "Practice · Coding (Part E)",           group: "practice" },

  { id: "_apply", label: "Apply", group: "section" },
  { id: "part-g",       label: "Jobs · APAC",           crumb: "Apply · APAC jobs",                    group: "apply" },
  { id: "part-h",       label: "Interview loop",        crumb: "Apply · Interview prep",               group: "apply" },
  { id: "part-i",       label: "Branding",              crumb: "Apply · Personal branding",            group: "apply" },
  { id: "part-j",       label: "Resources",             crumb: "Apply · Resources",                    group: "apply" },
];

const DEFAULT_VIEW = "sre-fnd";

const VIEW_MAP = {
  "overview":     OverviewView,
  "habits":       HabitsView,
  "p0-sd":        P0_SysDesignView,
  "p0-behavior":  P0_BehaviorView,
  "p0-lld":       P0_LLDView,
  "p0-sql":       P0_SQLView,
  "p0-dsa":       P0_DSAView,
  "p0-sched":     P0_ScheduleView,
  "sre-fnd":      SRE_FoundationsView,
  "sre-cod":      SRE_CodingView,
  "sre-cloud":    SRE_CloudView,
  "sre-auto":     SRE_AutomationView,
  "sre-rel":      SRE_ReliabilityView,
  "part-ai":      PartAIView,
  "part-a":       PartAView,
  "part-b":       PartBView,
  "part-d":       PartDView,
  "part-e":       PartEView,
  "part-g":       PartGView,
  "part-h":       PartHView,
  "part-i":       PartIView,
  "part-j":       PartJView,
};

function renderCrumb(crumb) {
  if (!crumb) return null;
  const parts = crumb.split(" · ");
  if (parts.length === 1) return <span className="leaf">{parts[0]}</span>;
  const head = parts.slice(0, -1).join(" · ");
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
