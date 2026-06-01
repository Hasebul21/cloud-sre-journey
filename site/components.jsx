// Shared components + hooks for the SRE dashboard.
// Storage helpers: each item lives under "sre:" + id.

const { useState, useEffect, useMemo, useRef, useCallback } = React;

const STORAGE_PREFIX = "sre:";

function loadJSON(key, fallback) {
  try {
    const v = localStorage.getItem(STORAGE_PREFIX + key);
    if (v === null) return fallback;
    return JSON.parse(v);
  } catch (e) { return fallback; }
}
function saveJSON(key, value) {
  try { localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value)); }
  catch (e) {}
}

// Hook: localStorage-backed state
function useStored(key, fallback) {
  const [v, setV] = useState(() => loadJSON(key, fallback));
  useEffect(() => { saveJSON(key, v); }, [key, v]);
  return [v, setV];
}

// Global "done" set across all items — one key per group, with cross-instance
// sync so multiple <Checklist> components sharing the same group stay in step.
// (Previously a write from instance B could clobber instance A's recent toggle
// because B's React state was stale relative to localStorage.)
function useDoneSet(group) {
  const key = "done:" + group;
  const [set, setSet] = useState(() => loadJSON(key, {}));

  // Listen for activity events from sibling instances of the same group and
  // re-read from localStorage so all instances see the latest state.
  useEffect(() => {
    const sync = (e) => {
      if (e && e.detail && e.detail.group === group) {
        setSet(loadJSON(key, {}));
      }
    };
    window.addEventListener("sre:activity", sync);
    return () => window.removeEventListener("sre:activity", sync);
  }, [group, key]);

  const toggle = useCallback((id) => {
    setSet(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id]; else next[id] = Date.now();
      // Persist synchronously so other instances see fresh data when the
      // activity event fires.
      saveJSON(key, next);
      // Defer the event to a microtask so React has finished the commit
      // before siblings re-read state.
      Promise.resolve().then(() => {
        window.dispatchEvent(new CustomEvent("sre:activity", { detail: { id, group, done: !!next[id] } }));
      });
      return next;
    });
  }, [key, group]);

  return [set, toggle];
}

// ───────── Currently-exploring set ─────────
// Items the user has flagged as "currently exploring". Map id → { name, group, at }.
// Auto-removes an entry when that item is marked done elsewhere.
function useExploring() {
  const KEY = "exploring";
  const [map, setMap] = useState(() => loadJSON(KEY, {}));

  useEffect(() => {
    const sync = () => setMap(loadJSON(KEY, {}));
    window.addEventListener("sre:exploring", sync);
    return () => window.removeEventListener("sre:exploring", sync);
  }, []);

  useEffect(() => {
    const onAct = (e) => {
      if (!e.detail || !e.detail.done) return;
      const cur = loadJSON(KEY, {});
      if (!cur[e.detail.id]) return;
      const next = { ...cur };
      delete next[e.detail.id];
      saveJSON(KEY, next);
      Promise.resolve().then(() => {
        window.dispatchEvent(new CustomEvent("sre:exploring"));
      });
    };
    window.addEventListener("sre:activity", onAct);
    return () => window.removeEventListener("sre:activity", onAct);
  }, []);

  const toggle = useCallback((id, payload) => {
    const cur = loadJSON(KEY, {});
    const next = { ...cur };
    if (next[id]) delete next[id];
    else next[id] = { ...payload, at: Date.now() };
    saveJSON(KEY, next);
    setMap(next);
    Promise.resolve().then(() => {
      window.dispatchEvent(new CustomEvent("sre:exploring"));
    });
  }, []);

  const remove = useCallback((id) => {
    const cur = loadJSON(KEY, {});
    if (!cur[id]) return;
    const next = { ...cur };
    delete next[id];
    saveJSON(KEY, next);
    setMap(next);
    Promise.resolve().then(() => {
      window.dispatchEvent(new CustomEvent("sre:exploring"));
    });
  }, []);

  // Bump the `at` timestamp for an item — call when the user re-engages so
  // the most-recently-touched one floats to the top of the exploring list.
  const touch = useCallback((id) => {
    const cur = loadJSON(KEY, {});
    if (!cur[id]) return;
    const next = { ...cur, [id]: { ...cur[id], at: Date.now() } };
    saveJSON(KEY, next);
    setMap(next);
    Promise.resolve().then(() => {
      window.dispatchEvent(new CustomEvent("sre:exploring"));
    });
  }, []);

  // Persist a one-line "where I left off" breadcrumb for an item.
  const setNote = useCallback((id, note) => {
    const cur = loadJSON(KEY, {});
    if (!cur[id]) return;
    const trimmed = (note || "").trim();
    const next = { ...cur, [id]: { ...cur[id], note: trimmed, at: Date.now() } };
    saveJSON(KEY, next);
    setMap(next);
    Promise.resolve().then(() => {
      window.dispatchEvent(new CustomEvent("sre:exploring"));
    });
  }, []);

  return { map, toggle, remove, touch, setNote };
}

// ───────── Progress bar ─────────
function Progress({ done, total, label }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div className="progress">
      <div className="progress-pct">{pct}%</div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: pct + "%" }}></div>
      </div>
      <div className="progress-frac">{done} / {total}{label ? " " + label : ""}</div>
    </div>
  );
}

// ───────── Tag (difficulty etc) ─────────
function Tag({ level }) {
  if (!level) return null;
  const cls = "tag tag-" + level.toLowerCase();
  return <span className={cls}>{level}</span>;
}

// ───────── Checklist ─────────
function Checklist({ items, group, renderItem }) {
  const [done, toggle] = useDoneSet(group);
  const { map: exploring, toggle: toggleExploring } = useExploring();
  // Clicks that land on (or inside) a link should navigate, not toggle.
  const onLabelClick = (e, id) => {
    if (e.target.closest && e.target.closest("a")) return;
    toggle(id);
  };
  return (
    <ul className="checklist">
      {items.map(it => {
        const isDone = !!done[it.id];
        const isExp = !!exploring[it.id];
        return (
          <li key={it.id}>
            <div
              className={"check " + (isDone ? "checked" : "")}
              onClick={() => toggle(it.id)}
              role="checkbox"
              aria-checked={isDone}
            >
              {isDone ? "✓" : ""}
            </div>
            <div
              className={"item-label " + (isDone ? "done" : "")}
              onClick={(e) => onLabelClick(e, it.id)}
            >
              {renderItem ? renderItem(it, isDone) : it.name}
            </div>
            {!isDone && (
              <button
                type="button"
                className={"explore-btn " + (isExp ? "active" : "")}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExploring(it.id, { name: it.name, group });
                }}
                title={isExp ? "Stop tracking — remove from sidebar" : "Mark as currently exploring — show in sidebar"}
                aria-label={isExp ? "Stop exploring" : "Mark as exploring"}
                aria-pressed={isExp}
              >
                {isExp ? "★" : "☆"}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ───────── Section card with auto progress ─────────
function SectionCard({ title, lead, items, group, renderItem, tilted, children }) {
  const [done] = useDoneSet(group);
  const completed = items ? items.filter(it => done[it.id]).length : 0;
  const total = items ? items.length : 0;
  const tiltClass = tilted === "left" ? "tilted-l" : tilted === "right" ? "tilted-r" : "";
  return (
    <section className={"section-card " + tiltClass}>
      {title && <h2>{title}</h2>}
      {lead && <p className="lead">{lead}</p>}
      {items && <Progress done={completed} total={total} />}
      {items && <Checklist items={items} group={group} renderItem={renderItem} />}
      {children}
    </section>
  );
}

// ───────── Notes (per section, persists) ─────────
function Notes({ id, placeholder }) {
  const [v, setV] = useStored("notes:" + id, "");
  return (
    <textarea
      className="notes"
      value={v}
      onChange={(e) => setV(e.target.value)}
      placeholder={placeholder || "Scribble notes, gotchas, links…"}
    />
  );
}

// ───────── Time log (hours per group) ─────────
function TimeLog({ id }) {
  const [hours, setHours] = useStored("time:" + id, 0);
  return (
    <span className="time-log">
      ⏱
      <input
        type="number"
        min="0"
        step="0.5"
        value={hours}
        onChange={(e) => setHours(parseFloat(e.target.value) || 0)}
      /> hrs logged
    </span>
  );
}

// ───────── Streak engine ─────────
// Tracks days with any activity. Streak = consecutive days ending today (or yesterday).
function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}
function useStreak() {
  const [days, setDays] = useStored("activity-days", {}); // {YYYY-MM-DD: true}
  useEffect(() => {
    function onAct() {
      const k = todayKey();
      setDays(prev => prev[k] ? prev : { ...prev, [k]: true });
    }
    window.addEventListener("sre:activity", onAct);
    return () => window.removeEventListener("sre:activity", onAct);
  }, [setDays]);

  const { streak, longest } = useMemo(() => {
    const ks = Object.keys(days).sort();
    if (ks.length === 0) return { streak: 0, longest: 0 };
    const set = new Set(ks);
    // current streak
    let s = 0;
    let cursor = new Date();
    if (!set.has(todayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
    while (set.has(todayKey(cursor))) {
      s++;
      cursor.setDate(cursor.getDate() - 1);
    }
    // longest streak
    let best = 0, run = 1;
    for (let i = 1; i < ks.length; i++) {
      const prev = new Date(ks[i-1]);
      prev.setDate(prev.getDate() + 1);
      if (todayKey(prev) === ks[i]) { run++; } else { best = Math.max(best, run); run = 1; }
    }
    best = Math.max(best, run);
    return { streak: s, longest: best };
  }, [days]);

  return { days, streak, longest };
}

// ───────── Compute aggregate progress across all groups ─────────
function useAllProgress() {
  // collect all item ids by group from SRE_DATA
  const groups = useMemo(() => buildGroupIndex(SRE_DATA), []);
  // re-read on storage events
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const onStorage = () => setTick(t => t + 1);
    const onAct = () => setTick(t => t + 1);
    window.addEventListener("storage", onStorage);
    window.addEventListener("sre:activity", onAct);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("sre:activity", onAct);
    };
  }, []);
  const summary = useMemo(() => {
    const out = {};
    let allDone = 0, allTotal = 0;
    for (const [g, ids] of Object.entries(groups)) {
      const done = loadJSON("done:" + g, {});
      const d = ids.filter(id => done[id]).length;
      out[g] = { done: d, total: ids.length };
      allDone += d;
      allTotal += ids.length;
    }
    return { groups: out, total: allTotal, done: allDone };
  }, [groups, tick]);
  return summary;
}

// Map each group → array of item ids (for aggregate stats)
function buildGroupIndex(D) {
  const g = {};
  g.sdConcepts = D.sysDesignConcepts.map(i => i.id);
  g.sdDeep = D.sysDesignDeepDives.map(i => i.id);
  g.sdWalk = D.sysDesignWalkthroughs.map(i => i.id);
  g.sdPlaylists = D.sdPlaylists.flatMap(i => i.videos ? i.videos.map(v => v.id) : (i.id ? [i.id] : []));
  g.sdChannels = D.sdChannels.map(i => i.id);
  g.sdReading = D.sdReading.map(i => i.id);
  g.star = D.starStories.map(i => i.id);
  g.lldV = D.lldVideos.map(i => i.id);
  g.lldP = D.lldPractice.map(i => i.id);
  g.sqlC = D.sqlConcepts.map(i => i.id);
  g.sqlP = D.sqlProblems.map(i => i.id);
  g.dsa = D.dsaTopics.flatMap(t => t.items.map(i => i.id));
  g.phase = D.phases.flatMap(p => p.tasks.map(i => i.id));
  g.goPath = D.goPath.map(i => i.id);
  g.otherSk = D.otherSkills.map(i => i.id);
  g.loop = D.loopRounds.map(i => i.id);
  g.qAsk = D.questionsToAsk.map(i => i.id);
  g.repos = D.repos.map(i => i.id);
  g.blog = D.blogIdeas.map(i => i.id);
  g.certs = D.certs.map(i => i.id);
  g.books = D.books.map(i => i.id);
  g.courses = D.courses.map(i => i.id);
  if (D.aiDatacampCourses) g.aiDatacamp = D.aiDatacampCourses.map(i => i.id);
  // SRE Learning sections (each view has resources + milestones)
  if (D.sreRoadmap) {
    for (const [key, sec] of Object.entries(D.sreRoadmap)) {
      g["sreLr_" + key] = sec.resources.map(i => i.id);
      g["sreLm_" + key] = sec.milestones.map(i => i.id);
    }
  }
  return g;
}

// Combined per-view ids (used by the sidebar mini progress)
function viewGroups() {
  return {
    overview: [],
    "p0-sd": ["sdConcepts","sdDeep","sdWalk","sdPlaylists","sdChannels","sdReading"],
    "p0-behavior": ["star"],
    "p0-lld": ["lldV","lldP"],
    "p0-sql": ["sqlC","sqlP"],
    "p0-dsa": ["dsa"],
    "sre-roadmap": [],
    "sre-net":   ["sreLr_networking"],
    "sre-cloud": ["sreLr_cloud"],
    "sre-auto":  ["sreLr_automation"],
    "sre-edge":  ["sreLr_edge"],
    "sre-revproxy": ["sreLr_revproxy"],
    "sre-fwdproxy": ["sreLr_fwdproxy"],
    "sre-rel":   ["sreLr_reliability"],
    "sre-varnish": ["sreLr_varnish"],
    "sre-fastly":  ["sreLr_fastly"],
    "part-ai":   ["sreLr_ai-l1","sreLr_ai-l2","sreLr_ai-l3","sreLr_ai-l4","aiDatacamp"],
    "part-b": ["phase"],
    "part-g": [], // tracked via job-status
    "part-h": ["loop","qAsk","star"],
    "part-i": ["repos","blog","certs"],
    "part-j": ["books","courses"],
  };
}

// expose globally
Object.assign(window, {
  loadJSON, saveJSON, useStored, useDoneSet, useExploring,
  Progress, Tag, Checklist, SectionCard, Notes, TimeLog,
  useStreak, useAllProgress, viewGroups, buildGroupIndex,
  todayKey,
});
