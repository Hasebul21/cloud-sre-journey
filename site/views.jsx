// Views — one per dashboard route.

const D = window.SRE_DATA;

// ───────── OVERVIEW ─────────
function OverviewView() {
  const all = useAllProgress();
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Hello there. 👋</h1>
      </div>

      <div>
        <SectionCard title="Roadmap at a glance" tilted="right" group="overview-roadmap">
          <ul className="checklist">
            {Object.entries({
              "System Design": ["sdConcepts","sdDeep","sdWalk","sdPlaylists","sdChannels","sdReading"],
              "Interview Prep · Behavioral / LLD / SQL": ["star","lldV","lldP","sqlC","sqlP"],
            }).map(([label, groups]) => {
              const done = groups.reduce((s,g) => s + (all.groups[g]?.done || 0), 0);
              const total = groups.reduce((s,g) => s + (all.groups[g]?.total || 0), 0);
              const pct = total ? Math.round(done/total*100) : 0;
              return (
                <li key={label}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom: 3}}>
                      <span>{label}</span>
                      <span style={{fontFamily:"'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500, color: "var(--ink-soft)"}}>{done}/{total} · {pct}%</span>
                    </div>
                    <div className="progress-track" style={{height: 8}}>
                      <div className="progress-fill" style={{width: pct + "%"}}></div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </SectionCard>

      </div>

      <section className="section-card">
        <h2>What this dashboard tracks</h2>
      </section>
    </div>
  );
}

// ───────── PART 0A — SYSTEM DESIGN ─────────
const SD_FRAMEWORK = [
  { id: "sdf-clarify",  name: "Clarify Requirements — functional + non-functional (5 min)" },
  { id: "sdf-estimate", name: "Estimate Scale — DAU, QPS, storage, bandwidth (3 min)" },
  { id: "sdf-hld",      name: "High-Level Design — components, data flow, API (10 min)" },
  { id: "sdf-deep",     name: "Deep Dives — bottlenecks, failure modes (20 min)" },
  { id: "sdf-tradeoff", name: "Trade-offs — why X over Y; behavior at 10× scale (5 min)" },
];

function P0_SysDesignView() {
  const fwSet = useDoneSet("sd-framework")[0];
  const plSet = useDoneSet("sdPlaylists")[0];
  const cnSet = useDoneSet("sdConcepts")[0];
  const ddSet = useDoneSet("sdDeep")[0];
  const wkSet = useDoneSet("sdWalk")[0];
  const chSet = useDoneSet("sdChannels")[0];
  const rdSet = useDoneSet("sdReading")[0];

  const count = (items, set) => items.filter(it => set[it.id]).length;
  const fwDone = count(SD_FRAMEWORK, fwSet);
  const plFlat = D.sdPlaylists.flatMap(i => i.videos ? i.videos : (i.id ? [i] : []));
  const plDone = count(plFlat, plSet);
  const cnDone = count(D.sysDesignConcepts, cnSet);
  const ddDone = count(D.sysDesignDeepDives, ddSet);
  const wkDone = count(D.sysDesignWalkthroughs, wkSet);
  const chDone = count(D.sdChannels, chSet);
  const rdDone = count(D.sdReading, rdSet);

  const total = SD_FRAMEWORK.length + plFlat.length + D.sysDesignConcepts.length + D.sysDesignDeepDives.length + D.sysDesignWalkthroughs.length + D.sdChannels.length + D.sdReading.length;
  const done = fwDone + plDone + cnDone + ddDone + wkDone + chDone + rdDone;
  const pct = total > 0 ? Math.round(done / total * 100) : 0;

  const renderResource = (it) => (
    <span>
      <ResourceTag type={it.type} />
      {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <span>{it.name}</span>}
    </span>
  );

  const renderWalkthrough = (it) => (
    <span>
      <ResourceTag type="video" />
      {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <span>{it.name}</span>}
      <Tag level={it.level} />
    </span>
  );

  return (
    <div>
      <div className="dash-head">
        <div>
          <div className="dash-eyebrow">interview prep</div>
          <h1 className="dash-title">
            <span className="dash-num">0A</span>
            <span className="dash-slash">/</span>
            <span className="dash-name">System Design</span>
          </h1>
        </div>
        <StatusPill pct={pct} />
      </div>

      <div className="stat-tiles">
        <StatTile label="Complete"   value={pct + "%"}                                       sub={done + " of " + total} accent />
        <StatTile label="Walkthroughs" value={wkDone + "/" + D.sysDesignWalkthroughs.length} sub={Math.round(wkDone / D.sysDesignWalkthroughs.length * 100) + "%"} />
        <StatTile label="Concepts"   value={cnDone + "/" + D.sysDesignConcepts.length}       sub={Math.round(cnDone / D.sysDesignConcepts.length * 100) + "%"} />
        <StatTile label="Deep Dives" value={ddDone + "/" + D.sysDesignDeepDives.length}      sub={Math.round(ddDone / D.sysDesignDeepDives.length * 100) + "%"} />
      </div>

      <ListSection title="5-step delivery framework" done={fwDone} total={SD_FRAMEWORK.length}>
        <Checklist items={SD_FRAMEWORK} group="sd-framework" />
      </ListSection>

      <ListSection title="Playlists" done={plDone} total={plFlat.length}>
        {D.sdPlaylists.map((item, idx) => {
          if (item.videos) {
            return (
              <div key={item.key || idx} className="playlist-group">
                <h3 className="playlist-group-title">
                  <ResourceTag type="playlist" />
                  <a href={item.url} target="_blank" rel="noopener">{item.name}</a>
                  <span className="playlist-group-count">{item.videos.length} videos</span>
                </h3>
                <Checklist
                  items={item.videos}
                  group="sdPlaylists"
                  renderItem={item.videos.some(v => v.level) ? renderWalkthrough : renderResource}
                />
              </div>
            );
          }
          return (
            <Checklist key={item.id} items={[item]} group="sdPlaylists" renderItem={renderResource} />
          );
        })}
      </ListSection>

      <ListSection title="Core concepts" done={cnDone} total={D.sysDesignConcepts.length}>
        <Checklist items={D.sysDesignConcepts} group="sdConcepts" renderItem={renderResource} />
      </ListSection>

      <ListSection title="Deep dives" done={ddDone} total={D.sysDesignDeepDives.length}>
        <Checklist items={D.sysDesignDeepDives} group="sdDeep" renderItem={renderResource} />
      </ListSection>

      <ListSection title="Walkthroughs · 2/week" done={wkDone} total={D.sysDesignWalkthroughs.length}>
        <Checklist items={D.sysDesignWalkthroughs} group="sdWalk" renderItem={renderWalkthrough} />
      </ListSection>

      <ListSection title="Channels" done={chDone} total={D.sdChannels.length}>
        <Checklist items={D.sdChannels} group="sdChannels" renderItem={renderResource} />
      </ListSection>

      <ListSection title="Reading & resources" done={rdDone} total={D.sdReading.length}>
        <Checklist items={D.sdReading} group="sdReading" renderItem={renderResource} />
      </ListSection>

      <section className="notes-section">
        <div className="list-section-head">
          <h2>Notes</h2>
          <TimeLog id="sdWalk" />
        </div>
        <Notes id="sdWalk" placeholder="Patterns you reused: rate limiter for hot keys, CQRS for read-heavy, etc." />
      </section>
    </div>
  );
}

// ───────── 0B BEHAVIORAL ─────────
function P0_BehaviorView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0B · Behavioral</h1>
      </div>

      <SectionCard
        title="Write your 8 stories"
       
        items={D.starStories}
        group="star"
        tilted="left"
      />

      <section className="section-card tilted-r">
        <h2>Story bank — drafts</h2>
        {D.starStories.map(s => (
          <details key={s.id} style={{marginBottom: 10, borderBottom: "1px dotted var(--paper-line)", paddingBottom: 8}}>
            <summary style={{cursor: "pointer", fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "-0.005em"}}>{s.name}</summary>
            <Notes id={"story-" + s.id} placeholder="Situation: ...&#10;Task: ...&#10;Action (I): ...&#10;Result (quantify): ..." />
          </details>
        ))}
      </section>

      <section className="section-card">
        <h2>Amazon Leadership Principles (top 8)</h2>
        <Checklist group="amzn-lp" items={[
          { id: "lp-co", name: "Customer Obsession" },
          { id: "lp-own", name: "Ownership" },
          { id: "lp-invent", name: "Invent and Simplify" },
          { id: "lp-right", name: "Are Right, A Lot" },
          { id: "lp-learn", name: "Learn and Be Curious" },
          { id: "lp-hire", name: "Hire and Develop the Best" },
          { id: "lp-bias", name: "Bias for Action" },
          { id: "lp-deliver", name: "Deliver Results" },
        ]} />
      </section>
    </div>
  );
}

// ───────── 0D LLD ─────────
function P0_LLDView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0D · Low-Level Design</h1>
      </div>

      <div className="row-grid-2">
        <SectionCard title="Videos" items={D.lldVideos} group="lldV" tilted="left"
          renderItem={(it) => (
            <span>
              <ResourceTag type="video" />
              {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <span>{it.name}</span>}
            </span>
          )}
        />
        <SectionCard title="Practice problems" items={D.lldPractice} group="lldP" tilted="right" />
      </div>

      <section className="section-card">
        <h2>Fundamentals</h2>
        <Checklist group="lld-fund" items={[
          { id: "solid-s", name: "S — Single Responsibility" },
          { id: "solid-o", name: "O — Open / Closed" },
          { id: "solid-l", name: "L — Liskov Substitution" },
          { id: "solid-i", name: "I — Interface Segregation" },
          { id: "solid-d", name: "D — Dependency Inversion" },
          { id: "ptn-factory", name: "Factory pattern" },
          { id: "ptn-singleton", name: "Singleton pattern" },
          { id: "ptn-observer", name: "Observer pattern" },
          { id: "ptn-strategy", name: "Strategy pattern" },
          { id: "ptn-decorator", name: "Decorator pattern" },
          { id: "ptn-builder", name: "Builder pattern" },
        ]} />
        <TimeLog id="lld" />
      </section>
    </div>
  );
}

// ───────── 0E SQL ─────────
function P0_SQLView() {
  const sqlPDone = D.sqlProblems.filter(p => (loadJSON("done:sqlP", {}))[p.id]).length;
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0E · SQL / MySQL</h1>
      </div>

      <SectionCard title="Core concepts" items={D.sqlConcepts} group="sqlC" tilted="left">
        <TimeLog id="sqlC" />
      </SectionCard>

      <section className="section-card tilted-r">
        <h2>Top 30 LeetCode SQL problems</h2>
        <Progress done={sqlPDone} total={D.sqlProblems.length} />
        <Checklist
          group="sqlP"
          items={D.sqlProblems}
          renderItem={(it) => (
            <span>
              <span className="tag-num">#{it.num}</span>{it.name} <Tag level={it.level} />
              <a href={"https://leetcode.com/problems/" + slug(it.name)} target="_blank" rel="noopener" style={{marginLeft: 8, fontSize:12}}>↗</a>
            </span>
          )}
        />
        <TimeLog id="sqlP" />
        <Notes id="sqlP" placeholder="Patterns to remember: top-N per group, running totals, gap-and-island…" />
      </section>
    </div>
  );
}
function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
}

// ───────── 0F DSA — 150 problems ─────────
function P0_DSAView() {
  const allDsa = D.dsaTopics.flatMap(t => t.items);
  const done = loadJSON("done:dsa", {});
  const completed = allDsa.filter(p => done[p.id]).length;
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0F · Coding / DSA — 150 problems</h1>
      </div>

      <section className="section-card tilted-l">
        <h2>Total progress</h2>
        <Progress done={completed} total={allDsa.length} />
        <TimeLog id="dsa-all" />
      </section>

      {D.dsaTopics.map((topic, idx) => {
        const dCount = topic.items.filter(p => done[p.id]).length;
        return (
          <section key={topic.topic} className={"section-card " + (idx % 2 ? "tilted-r" : "tilted-l")}>
            <h2>{topic.topic}</h2>
            <Progress done={dCount} total={topic.items.length} />
            <div className="dsa-grid">
              <Checklist
                group="dsa"
                items={topic.items}
                renderItem={(it) => (
                  <span>
                    <span className="tag-num">#{it.num}</span>{it.name} <Tag level={it.level} />
                  </span>
                )}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

// ───────── PART B — Hands-on Phases ─────────
function PartBView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part B · Hands-on Phases</h1>
      </div>

      {D.phases.map((p, i) => (
        <section key={p.id} className={"section-card " + (i % 2 ? "tilted-r" : "tilted-l")}>
          {i === 0 && <span className="tape tl"></span>}
          <h2>{p.title}</h2>
          <Progress
            done={p.tasks.filter(t => (loadJSON("done:phase", {}))[t.id]).length}
            total={p.tasks.length}
          />
          <Checklist group="phase" items={p.tasks} />
          <TimeLog id={"phase-" + p.id} />
          <Notes id={"phase-" + p.id} placeholder="Gotchas, links to repos, commands that worked." />
        </section>
      ))}
    </div>
  );
}

// ───────── PART G — APAC Jobs ─────────
function PartGView() {
  const countries = Object.keys(D.jobsByCountry);
  const [country, setCountry] = useStored("ui:job-country", countries[0]);
  const [jobs, setJobs] = useStored("jobs", {});
  const stages = ["Not yet", "Saved", "Applied", "Phone screen", "Interview", "Offer", "Rejected"];

  const setStage = (key, stage) => setJobs(prev => ({ ...prev, [key]: { ...(prev[key] || {}), stage } }));
  const toggleStar = (key) => setJobs(prev => ({ ...prev, [key]: { ...(prev[key] || {}), starred: !(prev[key]?.starred) } }));

  const counts = useMemo(() => {
    const out = { applied: 0, interview: 0, offer: 0 };
    Object.values(jobs).forEach(j => {
      const s = j.stage;
      if (s === "Applied" || s === "Phone screen" || s === "Interview") out.applied++;
      if (s === "Phone screen" || s === "Interview") out.interview++;
      if (s === "Offer") out.offer++;
    });
    return out;
  }, [jobs]);

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part G · APAC Job Search</h1>
      </div>

      <div className="stat-row" style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
        <div className="stat"><div className="v">{counts.applied}</div><div className="l">In pipeline</div></div>
        <div className="stat"><div className="v">{counts.interview}</div><div className="l">Interviewing</div></div>
        <div className="stat"><div className="v">{counts.offer}</div><div className="l">Offers</div></div>
      </div>

      <section className="section-card">
        <div className="tabs">
          {countries.map(c => (
            <button key={c} className={"tab " + (c === country ? "active" : "")} onClick={() => setCountry(c)}>{c}</button>
          ))}
        </div>
        <p className="legend">★ to mark a top target · drop-down sets stage</p>

        <div>
          {D.jobsByCountry[country].map(([name, url]) => {
            const key = country + ":" + name;
            const j = jobs[key] || {};
            return (
              <div key={key} className="job-row">
                <button title="Star" onClick={() => toggleStar(key)} style={{fontSize: 20, color: j.starred ? "var(--yellow)" : "var(--ink-faint)"}}>{j.starred ? "★" : "☆"}</button>
                <div><a href={url} target="_blank" rel="noopener">{name}</a></div>
                <select value={j.stage || "Not yet"} onChange={e => setStage(key, e.target.value)}>
                  {stages.map(s => <option key={s}>{s}</option>)}
                </select>
                <span style={{fontSize: 14, color: "var(--ink-faint)"}}>{j.stage === "Offer" ? "🎉" : j.stage === "Rejected" ? "—" : ""}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

// ───────── PART H — Interview Prep ─────────
function PartHView() {
  const [mocks, setMocks] = useStored("mocks", []);
  const addMock = () => {
    const date = prompt("Mock interview date (YYYY-MM-DD):", todayKey());
    if (!date) return;
    const type = prompt("Type (SD / Coding / Behavioral / Full loop):", "SD") || "SD";
    const notes = prompt("Notes:", "") || "";
    setMocks(prev => [...prev, { date, type, notes, id: Date.now() }]);
    window.dispatchEvent(new CustomEvent("sre:activity"));
  };
  const removeMock = (id) => setMocks(prev => prev.filter(m => m.id !== id));

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part H · Interview Preparation</h1>
      </div>

      <SectionCard title="The 5-round loop" items={D.loopRounds} group="loop" tilted="left" />
      <SectionCard title="Questions to ask the interviewer" items={D.questionsToAsk} group="qAsk" tilted="right" />

      <section className="section-card">
        <h2>Mock interviews log</h2>
        <button onClick={addMock} style={{padding:"6px 14px", border:"1px solid var(--line)", borderRadius: 6, background: "var(--paper)", fontFamily: "'IBM Plex Sans', system-ui, sans-serif", fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 10}}>
          + Log a mock
        </button>
        {mocks.length === 0 ? (
          <p style={{color: "var(--ink-faint)", fontStyle: "italic"}}>No mocks logged yet. First one is the hardest.</p>
        ) : (
          <ul className="checklist">
            {mocks.map(m => (
              <li key={m.id}>
                <span style={{fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 500, color: "var(--blue)", minWidth: 110}}>{m.date}</span>
                <Tag level={m.type === "SD" ? "Hard" : m.type === "Coding" ? "Medium" : "Easy"} />
                <span style={{flex:1, marginLeft: 8}}>{m.notes}</span>
                <button onClick={() => removeMock(m.id)} style={{color: "var(--red)", fontSize: 14}}>×</button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="section-card">
        <h2>Salary negotiation prep</h2>
        <Checklist group="salary" items={[
          { id: "sal-research", name: "Research bands: levels.fyi + NodeFlair (SG) + TokyoDev" },
          { id: "sal-no-anchor", name: "Recruiter screen: 'I'd love to understand the band first'" },
          { id: "sal-package", name: "Ask for full package — base + bonus + RSU + relocation + sign-on" },
          { id: "sal-write", name: "Negotiate in writing; ask 2–5 days to consider offer" },
        ]} />
      </section>
    </div>
  );
}

// ───────── PART I — Personal Branding ─────────
function PartIView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part I · Personal Branding</h1>
      </div>

      <SectionCard
        title="Six pinned GitHub repos"
       
        items={D.repos}
        group="repos"
        tilted="left"
        renderItem={(it) => (
          <span>
            <strong>{it.name}</strong> <span style={{color:"var(--ink-soft)"}}>— {it.desc}</span>
          </span>
        )}
      />

      <SectionCard
        title="Blog post ideas"
       
        items={D.blogIdeas}
        group="blog"
        tilted="right"
      />

      <SectionCard
        title="Certifications"
       
        items={D.certs}
        group="certs"
        renderItem={(it) => (
          <span><strong>{it.name}</strong> <span style={{color: "var(--ink-faint)", fontSize: 12, marginLeft: 6}}>{it.weeks} weeks</span></span>
        )}
      />
    </div>
  );
}

// ───────── PART J — Resources ─────────
function PartJView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part J · Resources</h1>
      </div>

      <SectionCard title="Must-read books"
        items={D.books}
        group="books"
        tilted="left"
        renderItem={(it) => (
          <span>
            <ResourceTag type="book" />
            {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <span>{it.name}</span>}
          </span>
        )}
      >
        <TimeLog id="books" />
        <Notes id="books" placeholder="Chapter notes, favorite passages, what to revisit." />
      </SectionCard>

      <SectionCard title="Courses"
        items={D.courses}
        group="courses"
        tilted="right"
        renderItem={(it) => (
          <span>
            <ResourceTag type="course" />
            {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <strong>{it.name}</strong>}
            <span style={{color:"var(--ink-faint)", marginLeft:8, fontSize:13}}>{it.plat} · {it.cost}</span>
          </span>
        )}
      />

      <SectionCard title="Language"
        items={D.language}
        group="language"
        tilted="left"
        renderItem={(it) => (
          <span>
            <ResourceTag type={it.type} />
            {it.url ? <a href={it.url} target="_blank" rel="noopener">{it.name}</a> : <strong>{it.name}</strong>}
            <span style={{color:"var(--ink-faint)", marginLeft:8, fontSize:13}}>{it.lang} · {it.plat}</span>
          </span>
        )}
      />

      <section className="section-card">
        <h2>Practice platforms</h2>
        <ul className="checklist">
          {[
            ["NeetCode", "neetcode.io", "FREE"],
            ["LeetCode Premium", "leetcode.com", "$35/mo"],
            ["Pramp", "pramp.com", "FREE peer mocks"],
            ["interviewing.io", "interviewing.io", "$200–400/session"],
            ["Hello Interview", "hellointerview.com", "Freemium"],
            ["killer.sh", "killer.sh", "CKA simulator"],
          ].map(([n, u, c]) => (
            <li key={n}>
              <div className="check"></div>
              <div className="item-label"><a href={"https://"+u} target="_blank" rel="noopener"><strong>{n}</strong></a> <span style={{color:"var(--ink-faint)", marginLeft:8, fontSize:13}}>{c}</span></div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

// ───────── SRE LEARNING (the curated path: networking → fastly) ─────────

function ResourceTag({ type }) {
  const labels = {
    video: "VIDEO", course: "COURSE", book: "BOOK", blog: "BLOG",
    playlist: "PLAYLIST", channel: "CHANNEL", github: "GITHUB",
  };
  return (
    <span className={"htag htag-" + (type || "res")}>
      {labels[type] || "RES"}
    </span>
  );
}

const STAGE_NUM = {
  networking:  "01",
  cloud:       "02",
  reliability: "03",
  edge:        "04",
  revproxy:    "05",
  fwdproxy:    "06",
  varnish:     "07",
  fastly:      "08",
  automation:  "09",
};

function StatusPill({ pct }) {
  let label = "not started", cls = "neutral";
  if (pct >= 100) { label = "complete"; cls = "done"; }
  else if (pct > 0) { label = "in progress"; cls = "active"; }
  return (
    <span className={"status-pill status-" + cls}>
      <span className="dot" /> {label}
    </span>
  );
}

function StatTile({ label, value, sub, accent }) {
  return (
    <div className="stat-tile">
      <div className="stat-tile-label">{label}</div>
      <div className={"stat-tile-value" + (accent ? " accent" : "")}>{value}</div>
      {sub && <div className="stat-tile-sub">{sub}</div>}
    </div>
  );
}

function Sparkbar({ pct, bars = 14 }) {
  const filled = Math.round(bars * pct / 100);
  return (
    <span className="sparkbar">
      {Array.from({ length: bars }).map((_, i) => (
        <span key={i} className={"sparkbar-tick" + (i < filled ? " on" : "")} />
      ))}
    </span>
  );
}

function ListSection({ title, lead, done, total, children }) {
  const pct = total > 0 ? Math.round(done / total * 100) : 0;
  return (
    <section className="list-section">
      <div className="list-section-head">
        <h2>{title}</h2>
        <div className="list-section-progress">
          <Sparkbar pct={pct} />
          <span className="pct">{pct}%</span>
          <span className="frac">{done}/{total}</span>
        </div>
      </div>
      {children}
    </section>
  );
}

function SreLearningView({ sectionKey }) {
  const section = D.sreRoadmap[sectionKey];
  if (!section) return null;
  const resGroup = "sreLr_" + sectionKey;
  const milGroup = "sreLm_" + sectionKey;
  const resDoneSet = useDoneSet(resGroup)[0];
  const resDone = section.resources.filter(r => resDoneSet[r.id]).length;
  const total = section.resources.length;
  const pct = total > 0 ? Math.round(resDone / total * 100) : 0;
  const [hoursLogged] = useStored("time:" + resGroup, 0);

  // Existing titles look like "SRE 1 · Foundations" — pull the stage name out
  // and prefix with a clean two-digit number to match the redesign mocks.
  const stageName = section.title.split(" · ").slice(-1)[0];
  const stageNum = STAGE_NUM[sectionKey] || "··";

  const renderResource = (it) => (
    <span>
      <ResourceTag type={it.type} />
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener">{it.name}</a>
      ) : <span>{it.name}</span>}
    </span>
  );

  // Group resources into ordered topic subsections by their `sub` label.
  const resSubs = [];
  const subIndex = {};
  section.resources.forEach(r => {
    const label = r.sub || "Resources";
    if (subIndex[label] === undefined) { subIndex[label] = resSubs.length; resSubs.push({ label, items: [] }); }
    resSubs[subIndex[label]].items.push(r);
  });
  const showSubHeads = resSubs.length > 1 || (resSubs[0] && resSubs[0].label !== "Resources");

  return (
    <div>
      <div className="dash-head">
        <div>
          <div className="dash-eyebrow">stage</div>
          <h1 className="dash-title">
            <span className="dash-num">{stageNum}</span>
            <span className="dash-slash">/</span>
            <span className="dash-name">{stageName}</span>
          </h1>
        </div>
        <aside className="dash-rail">
          <h4>where you are</h4>
          <div className="row"><span>Complete</span><b className="accent">{pct}%</b></div>
          <div className="row"><span>Resources</span><b>{resDone}/{section.resources.length}</b></div>
          <div className="row"><span>Hours logged</span><b>{hoursLogged}h</b></div>
        </aside>
      </div>

      <ListSection title="Curated resources"
        done={resDone} total={section.resources.length}>
        {resSubs.map(g => (
          <div key={g.label} className="res-subgroup">
            {showSubHeads && (
              <h4 className="res-subgroup-head">{g.label}<span className="res-subgroup-count">{g.items.length}</span></h4>
            )}
            <Checklist items={g.items} group={resGroup} renderItem={renderResource} />
          </div>
        ))}
      </ListSection>

      <section className="notes-section">
        <div className="list-section-head">
          <h2>Notes</h2>
          <TimeLog id={resGroup} />
        </div>
        <Notes id={milGroup} placeholder="Links to commits, screenshots, gotchas, things to come back to." />
      </section>
    </div>
  );
}

function RoadmapView() {
  const r = window.SRE_DATA.hldRoadmap;
  return (
    <div>
      <div className="dash-head">
        <div>
          <div className="dash-eyebrow">roadmap</div>
          <h1 className="dash-title">
            <span className="dash-num">00</span>
            <span className="dash-slash">/</span>
            <span className="dash-name">Build-It-Up HLDs</span>
          </h1>
        </div>
        <aside className="dash-rail">
          <h4>how to use</h4>
          <div className="row"><span>HLDs</span><b className="accent">{r.hlds.length}</b></div>
          <div className="row"><span>Stages mapped</span><b>{r.stageMap.length}</b></div>
          <div className="row"><span>Read order</span><b>sequential</b></div>
        </aside>
      </div>

      <section className="list-section">
        <div className="list-section-head"><h2>Sidebar stages at a glance</h2></div>
        <table className="hld-stagemap">
          <thead><tr><th>#</th><th>Sidebar stage</th><th>What's in it</th></tr></thead>
          <tbody>
            {r.stageMap.map(s => (
              <tr key={s.num}>
                <td className="hld-stagemap-num">{s.num}</td>
                <td className="hld-stagemap-name">{s.name}</td>
                <td className="hld-stagemap-desc">{s.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {r.hlds.map(h => (
        <section key={h.id} className="hld-card">
          <div className="hld-card-head">
            <h2>{h.title}</h2>
            <div className="hld-unlocks">Unlocks: {h.unlocks}</div>
          </div>
          <pre className="hld-diagram">{h.diagram}</pre>
          <p className="hld-body">{h.body}</p>
          <div className="hld-why-list">
            {h.why.map((w, i) => (
              <div key={i} className="hld-why">
                <div className="hld-why-stage">Why learn {w.stage}</div>
                <div className="hld-why-text">{w.text}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="list-section">
        <div className="list-section-head"><h2>Reading order at a glance</h2></div>
        <pre className="hld-diagram">{r.readingOrder.diagram}</pre>
        <p className="hld-body">{r.readingOrder.note}</p>
      </section>
    </div>
  );
}

const SRE_NetworkingView  = () => <SreLearningView sectionKey="networking" />;
const SRE_CloudView       = () => <SreLearningView sectionKey="cloud" />;
const SRE_AutomationView  = () => <SreLearningView sectionKey="automation" />;
const SRE_EdgeView        = () => <SreLearningView sectionKey="edge" />;
const SRE_RevProxyView    = () => <SreLearningView sectionKey="revproxy" />;
const SRE_FwdProxyView    = () => <SreLearningView sectionKey="fwdproxy" />;
const SRE_ReliabilityView = () => <SreLearningView sectionKey="reliability" />;
const SRE_VarnishView     = () => <SreLearningView sectionKey="varnish" />;
const SRE_FastlyView      = () => <SreLearningView sectionKey="fastly" />;

// Part AI renders 4 difficulty levels on one page (sourced from sreRoadmap.ai-l1..l4)
function AILevelCard({ levelNum, sectionKey }) {
  const D = window.SRE_DATA;
  const sec = D.sreRoadmap[sectionKey];
  const resGroup = "sreLr_" + sectionKey;
  const resDoneSet = useDoneSet(resGroup)[0];
  const resDone = sec.resources.filter(r => resDoneSet[r.id]).length;
  const resTotal = sec.resources.length;

  // Level title: data has "AI · Level 1 — Foundations" → use the part after "— "
  const levelTail = sec.title.split(" — ").slice(-1)[0];

  const renderResource = (it) => (
    <span>
      <ResourceTag type={it.type} />
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener">{it.name}</a>
      ) : <span>{it.name}</span>}
    </span>
  );

  return (
    <section id={"ai-l" + levelNum} className="level-card-v2">
      <div className="level-card-head">
        <div className="level-card-title">
          <span className="level-card-num">L{levelNum}</span>
          <span className="level-card-slash">/</span>
          <span className="level-card-name">{levelTail}</span>
        </div>
        <StatusPill pct={resTotal > 0 ? Math.round(resDone / resTotal * 100) : 0} />
      </div>

      <ListSection title="Resources" done={resDone} total={resTotal}>
        <Checklist items={sec.resources} group={resGroup} renderItem={renderResource} />
      </ListSection>
    </section>
  );
}

function LevelTile({ levelNum, sectionKey }) {
  const D = window.SRE_DATA;
  const sec = D.sreRoadmap[sectionKey];
  const resGroup = "sreLr_" + sectionKey;
  const resDoneSet = useDoneSet(resGroup)[0];
  const done = sec.resources.filter(r => resDoneSet[r.id]).length;
  const total = sec.resources.length;
  const pct = total > 0 ? Math.round(done / total * 100) : 0;
  const target = "ai-l" + levelNum;
  // Map data title "AI · Level 1 — Foundations" → "Foundations"
  const levelTail = sec.title.split(" — ").slice(-1)[0];

  return (
    <a href={"#" + target} className="level-tile" onClick={(e) => {
      e.preventDefault();
      document.getElementById(target)?.scrollIntoView({behavior: "smooth", block: "start"});
    }}>
      <div className="level-tile-head">
        <span className="level-tile-num">L{levelNum}</span>
        <span className="level-tile-pct">{pct}%</span>
      </div>
      <div className="level-tile-name">{levelTail}</div>
      <Sparkbar pct={pct} bars={18} />
    </a>
  );
}

// Full DataCamp Artificial Intelligence catalog (115 courses), sorted beginner → advanced.
function AiDatacampCatalog() {
  const D = window.SRE_DATA;
  const courses = D.aiDatacampCourses || [];
  const doneSet = useDoneSet("aiDatacamp")[0];
  const done = courses.filter(c => doneSet[c.id]).length;
  const total = courses.length;
  const pct = total > 0 ? Math.round(done / total * 100) : 0;

  const renderCourse = (it) => (
    <span>
      <ResourceTag type="course" />
      <a href={it.url} target="_blank" rel="noopener">{it.name}</a>
      <span style={{ color: "var(--ink-faint)", marginLeft: 8, fontSize: 13 }}>{it.hours}h</span>
    </span>
  );

  // Group by level: Basic → Intermediate → Advanced.
  const byLevel = ["Basic", "Intermediate", "Advanced"]
    .map(level => ({ level, items: courses.filter(c => c.level === level) }))
    .filter(g => g.items.length > 0);

  return (
    <section id="ai-datacamp" className="level-card-v2">
      <div className="level-card-head">
        <div className="level-card-title">
          <span className="level-card-num">DC</span>
          <span className="level-card-slash">/</span>
          <span className="level-card-name">DataCamp AI catalog</span>
        </div>
        <StatusPill pct={pct} />
      </div>
      <ListSection title="Courses" done={done} total={total}>
        {byLevel.map(g => (
          <div key={g.level} className="res-subgroup">
            <h4 className="res-subgroup-head">{g.level}<span className="res-subgroup-count">{g.items.length}</span></h4>
            <Checklist items={g.items} group="aiDatacamp" renderItem={renderCourse} />
          </div>
        ))}
      </ListSection>
    </section>
  );
}

function PartAIView() {
  const D = window.SRE_DATA;
  const levelKeys = ["ai-l1", "ai-l2", "ai-l3", "ai-l4"];

  // Aggregate resource progress across all 4 levels
  const allResDone = ["sreLr_ai-l1","sreLr_ai-l2","sreLr_ai-l3","sreLr_ai-l4"]
    .reduce((s, g) => s + Object.keys(loadJSON("done:" + g, {})).length, 0);
  const allResTotal = levelKeys.reduce((s, k) => s + D.sreRoadmap[k].resources.length, 0);
  const allPct = allResTotal > 0 ? Math.round(allResDone / allResTotal * 100) : 0;

  return (
    <div>
      <div className="dash-head">
        <div>
          <div className="dash-eyebrow">specialization</div>
          <h1 className="dash-title">
            <span className="dash-num">AI</span>
            <span className="dash-slash">/</span>
            <span className="dash-name">Engineering</span>
          </h1>
        </div>
        <StatusPill pct={allPct} />
      </div>

      <AiDatacampCatalog />

      <div className="level-tiles">
        {levelKeys.map((key, idx) => (
          <LevelTile key={key} levelNum={idx + 1} sectionKey={key} />
        ))}
      </div>

      {levelKeys.map((key, idx) => (
        <AILevelCard key={key} levelNum={idx + 1} sectionKey={key} />
      ))}
    </div>
  );
}

Object.assign(window, {
  OverviewView, P0_SysDesignView, P0_BehaviorView, P0_LLDView, P0_SQLView,
  P0_DSAView, PartAIView, PartBView,
  PartGView, PartHView, PartIView, PartJView,
  SRE_NetworkingView, SRE_CloudView, SRE_AutomationView, SRE_EdgeView, SRE_RevProxyView, SRE_FwdProxyView, SRE_ReliabilityView,
  SRE_VarnishView, SRE_FastlyView, RoadmapView,
});
