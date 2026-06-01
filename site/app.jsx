// App shell — two-pane TOC. Persists current view in URL hash.

const NAV = [
  { id: "_learn", label: "Learn", group: "section" },
  { id: "sre-roadmap",  label: "00 · Roadmap (HLDs)",   crumb: "Learn / 00 · Build-It-Up Roadmap (HLDs)", group: "learn" },
  { id: "sre-net",      label: "01 · Networking",       crumb: "Learn / 01 · Networking",              group: "learn" },
  { id: "sre-cloud",    label: "02 · Cloud & K8s",      crumb: "Learn / 02 · Cloud & K8s",             group: "learn" },
  { id: "sre-rel",      label: "03 · Reliability",      crumb: "Learn / 03 · Reliability",             group: "learn" },
  { id: "sre-edge",     label: "04 · CDN, API Gateway & HTTP Caching", crumb: "Learn / 04 · CDN, API Gateway & HTTP Caching (Fastly / Kong / HAProxy)", group: "learn" },
  { id: "sre-revproxy", label: "05 · Reverse Proxy",    crumb: "Learn / 05 · Reverse Proxy (NGINX / Envoy)",          group: "learn" },
  { id: "sre-fwdproxy", label: "06 · Proxy (Forward / Egress)", crumb: "Learn / 06 · Proxy (Forward / Egress) (Squid / mitmproxy / NAT)", group: "learn" },
  { id: "sre-varnish",  label: "07 · Varnish & VCL",    crumb: "Learn / 07 · Varnish & VCL",           group: "learn" },
  { id: "sre-fastly",   label: "08 · Fastly CDN",       crumb: "Learn / 08 · Fastly CDN & VCL",        group: "learn" },
  { id: "sre-auto",     label: "09 · Automation",       crumb: "Learn / 09 · Automation",              group: "learn" },
  { id: "p0-sd",        label: "System Design",         crumb: "Learn / System Design",                group: "learn" },
  { id: "part-ai",      label: "AI Engineering",        crumb: "Learn / AI Engineering",               group: "learn" },

  { id: "_practice", label: "Practice", group: "section" },
  { id: "p0-behavior",  label: "Behavioral",            crumb: "Practice / Behavioral",                group: "practice" },
  { id: "p0-lld",       label: "LLD",                   crumb: "Practice / Low-Level Design",          group: "practice" },
  { id: "p0-sql",       label: "SQL · 30",              crumb: "Practice / SQL",                       group: "practice" },
];

const DEFAULT_VIEW = "overview";

const VIEW_MAP = {
  "overview":     OverviewView,
  "p0-sd":        P0_SysDesignView,
  "p0-behavior":  P0_BehaviorView,
  "p0-lld":       P0_LLDView,
  "p0-sql":       P0_SQLView,
  "p0-dsa":       P0_DSAView,
  "sre-roadmap":  RoadmapView,
  "sre-net":      SRE_NetworkingView,
  "sre-cloud":    SRE_CloudView,
  "sre-auto":     SRE_AutomationView,
  "sre-edge":     SRE_EdgeView,
  "sre-revproxy": SRE_RevProxyView,
  "sre-fwdproxy": SRE_FwdProxyView,
  "sre-rel":      SRE_ReliabilityView,
  "sre-varnish":  SRE_VarnishView,
  "sre-fastly":   SRE_FastlyView,
  "part-ai":      PartAIView,
  "part-b":       PartBView,
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

// LeetCode's own GraphQL endpoint doesn't return CORS headers, so fetch the
// daily slug from a public mirror (leetcode-api-pied) and cache it for the
// rest of the day. Falls back to the daily filter page on any failure.
function DailyLeetCodeLink() {
  const FALLBACK = "https://leetcode.com/problemset/?daily=true";
  const todayUTC = () => new Date().toISOString().slice(0, 10);
  const getCached = () => {
    const c = loadJSON("lc-daily", null);
    return c && c.date === todayUTC() ? c.url : null;
  };

  const handleClick = (e) => {
    e.preventDefault();
    const cached = getCached();
    if (cached) {
      window.open(cached, "_blank", "noopener");
      return;
    }
    const win = window.open("about:blank", "_blank", "noopener");
    const finish = (url) => {
      if (win) win.location.href = url;
      else window.open(url, "_blank", "noopener");
    };
    fetch("https://leetcode-api-pied.vercel.app/daily")
      .then((r) => r.json())
      .then((d) => {
        const path = d && d.link;
        const url = path ? "https://leetcode.com" + path : FALLBACK;
        if (path) saveJSON("lc-daily", { date: todayUTC(), url });
        finish(url);
      })
      .catch(() => finish(FALLBACK));
  };

  return (
    <a
      className="lc-daily"
      href={getCached() || FALLBACK}
      target="_blank"
      rel="noopener noreferrer"
      title="Open today's LeetCode Daily Challenge in a new tab"
      onClick={handleClick}
    >
      <span className="lc-daily-badge">LC</span>
      <span className="lc-daily-label">Daily LeetCode</span>
      <span className="lc-daily-arrow">↗</span>
    </a>
  );
}

function ExploringPanel({ go }) {
  const { map, remove } = useExploring();
  const entries = Object.entries(map).sort((a, b) => (b[1].at || 0) - (a[1].at || 0));
  if (entries.length === 0) return null;
  const vg = viewGroups();
  const findView = (grp) => {
    for (const [v, gs] of Object.entries(vg)) if (gs.includes(grp)) return v;
    return null;
  };
  return (
    <div className="exploring-panel">
      <div className="exploring-head">
        <span>Currently exploring</span>
        <span className="exploring-count">{entries.length}</span>
      </div>
      <ul>
        {entries.map(([id, meta]) => {
          const view = findView(meta.group);
          return (
            <li key={id}>
              <button
                className="exploring-item"
                onClick={() => view && go(view)}
                title={meta.name + (view ? "" : " (no destination view)")}
                disabled={!view}
              >
                {meta.name}
              </button>
              <button
                className="exploring-x"
                onClick={() => remove(id)}
                title="Remove from currently exploring"
                aria-label="Remove"
              >×</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
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

        <DailyLeetCodeLink />

        <div className="search" title="Search not wired yet">
          <span className="kbd-hint">⌘K</span> search…
        </div>

        <ExploringPanel go={go} />

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
