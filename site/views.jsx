// Views — one per dashboard route.

const D = window.SRE_DATA;

// ───────── OVERVIEW ─────────
function OverviewView() {
  const all = useAllProgress();
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Hello there. 👋</h1>
        <p className="page-sub">A six-month plan to land a visa-sponsored SRE role somewhere in APAC. One small box at a time.</p>
      </div>

      <div className="row-grid-2">
        <SectionCard title="Roadmap at a glance" tilted="right" group="overview-roadmap">
          <ul className="checklist">
            {Object.entries({
              "Part 0 · Interview Prep": ["sdConcepts","sdDeep","sdWalk","star","lldV","lldP","sqlC","sqlP","dsa","schedule"],
              "Part A · Lifecycle": ["lifecycle"],
              "Part B · Hands-on Phases": ["phase"],
              "Part D · System Design (SRE)": ["sreBooks","sreTopics","sreFlavor"],
              "Part E · Coding": ["goPath","otherSk"],
              "Part H · Interview prep": ["loop","qAsk"],
              "Part I · Branding": ["repos","blog","certs"],
              "Part J · Resources": ["books","courses"],
            }).map(([label, groups]) => {
              const done = groups.reduce((s,g) => s + (all.groups[g]?.done || 0), 0);
              const total = groups.reduce((s,g) => s + (all.groups[g]?.total || 0), 0);
              const pct = total ? Math.round(done/total*100) : 0;
              return (
                <li key={label}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex", justifyContent:"space-between", marginBottom: 3}}>
                      <span>{label}</span>
                      <span style={{fontFamily:"Caveat, cursive", fontSize: 17, color: "var(--ink-soft)"}}>{done}/{total} · {pct}%</span>
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

        <SectionCard title="This week's checklist" tilted="left">
          <p className="lead">Tick these every week. Keeps the gears turning.</p>
          <Checklist items={D.habits.map(h => ({ id: "ovw-"+h.id, name: h.name + (h.target ? `  — target: ${h.target}` : "") }))} group="overview-week" />
          <p style={{marginTop:10, fontSize:13, color:"var(--ink-faint)"}}>(Detailed tracking lives in the <strong>Habits</strong> view in the sidebar.)</p>
        </SectionCard>
      </div>

      <section className="section-card">
        <h2>What this dashboard tracks</h2>
        <p className="lead">Every section in your study guide → a view here. Tick items, log hours per section, leave notes. Everything persists in your browser.</p>
        <div className="callout">
          15 hrs/week · 6-month timeline · Bangladesh → SG / JP / MY / TH. Comp follows skill. Don't optimize for highest salary on day one.
        </div>
      </section>
    </div>
  );
}

// ───────── PART 0A — SYSTEM DESIGN ─────────
function P0_SysDesignView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0A · System Design</h1>
        <p className="page-sub">Hello Interview framework — 5-step delivery, core concepts, deep dives, then walkthroughs.</p>
      </div>

      <section className="section-card tilted-l">
        <span className="tape tl"></span>
        <h2>5-step delivery framework</h2>
        <p className="lead">Practice this template before every walkthrough — clarify → estimate → high level → deep dives → trade-offs.</p>
        <Checklist
          group="sd-framework"
          items={[
            { id: "sdf-clarify", name: "Clarify Requirements — functional + non-functional (5 min)" },
            { id: "sdf-estimate", name: "Estimate Scale — DAU, QPS, storage, bandwidth (3 min)" },
            { id: "sdf-hld", name: "High-Level Design — components, data flow, API (10 min)" },
            { id: "sdf-deep", name: "Deep Dives — bottlenecks, failure modes (20 min)" },
            { id: "sdf-tradeoff", name: "Trade-offs — why X over Y; behavior at 10× scale (5 min)" },
          ]}
        />
        <TimeLog id="sd-framework" />
      </section>

      <SectionCard title="Core concepts" lead="The 9 building blocks. Watch each Hello Interview video, then write a 5-line summary." items={D.sysDesignConcepts} group="sdConcepts" tilted="right">
        <TimeLog id="sdConcepts" />
        <Notes id="sdConcepts" placeholder="Cache eviction, partition keys, idempotency tokens — anything weird worth remembering." />
      </SectionCard>

      <SectionCard title="Deep dives" lead="Watch on demand — when a walkthrough hits a tech you don't know cold." items={D.sysDesignDeepDives} group="sdDeep">
        <TimeLog id="sdDeep" />
      </SectionCard>

      <section className="section-card tilted-r">
        <h2>Walkthroughs — 2 per week</h2>
        <p className="lead">Easy → Medium → Hard. Talk through your approach before drawing.</p>
        <Progress
          done={D.sysDesignWalkthroughs.filter(w => (loadJSON("done:sdWalk", {}))[w.id]).length}
          total={D.sysDesignWalkthroughs.length}
        />
        <Checklist
          group="sdWalk"
          items={D.sysDesignWalkthroughs}
          renderItem={(it) => (
            <span>{it.name} <Tag level={it.level} /></span>
          )}
        />
        <TimeLog id="sdWalk" />
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
        <p className="page-sub">STAR framework: Situation → Task → Action ("I", not "we") → Result. Each story 90–120 sec.</p>
      </div>

      <SectionCard
        title="Write your 8 stories"
        lead="One memorized story per theme. Quantify results."
        items={D.starStories}
        group="star"
        tilted="left"
      />

      <section className="section-card tilted-r">
        <h2>Story bank — drafts</h2>
        <p className="lead">Pull up these notes before every behavioral round. Edit until each fits in 2 minutes spoken.</p>
        {D.starStories.map(s => (
          <details key={s.id} style={{marginBottom: 10, borderBottom: "1px dotted var(--paper-line)", paddingBottom: 8}}>
            <summary style={{cursor: "pointer", fontFamily: "Caveat, cursive", fontSize: 22}}>{s.name}</summary>
            <Notes id={"story-" + s.id} placeholder="Situation: ...&#10;Task: ...&#10;Action (I): ...&#10;Result (quantify): ..." />
          </details>
        ))}
      </section>

      <section className="section-card">
        <h2>Amazon Leadership Principles (top 8)</h2>
        <p className="lead">Tick when you have a story locked for each.</p>
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
        <p className="page-sub">SOLID + design patterns + a few classic OOP problems.</p>
      </div>

      <div className="row-grid-2">
        <SectionCard title="Videos" lead="Hello Interview's LLD walkthroughs." items={D.lldVideos} group="lldV" tilted="left" />
        <SectionCard title="Practice problems" lead="Design + code these end-to-end." items={D.lldPractice} group="lldP" tilted="right" />
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
        <p className="page-sub">Master core syntax → grind 30 LeetCode SQL problems.</p>
      </div>

      <SectionCard title="Core concepts" lead="Internalize these before grinding problems." items={D.sqlConcepts} group="sqlC" tilted="left">
        <TimeLog id="sqlC" />
      </SectionCard>

      <section className="section-card tilted-r">
        <h2>Top 30 LeetCode SQL problems</h2>
        <p className="lead">Easy first to lock JOIN/NULL/GROUP BY → then mediums in order. 601 + 1321 last.</p>
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
        <p className="page-sub">Quality over quantity. Talk through approach → brute force → optimize → test edges.</p>
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

// ───────── 0G Schedule ─────────
function P0_ScheduleView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">0G · Interview Prep Schedule</h1>
        <p className="page-sub">24 weeks. Tick each block when its focus is genuinely behind you.</p>
      </div>
      <SectionCard
        items={D.schedule}
        group="schedule"
        renderItem={(it) => (
          <span>
            <strong style={{fontFamily: "Caveat, cursive", fontSize: 22, marginRight: 10, color: "var(--red)"}}>Wk {it.weeks}</strong>
            {it.focus}
          </span>
        )}
      />
    </div>
  );
}

// ───────── PART A — Lifecycle ─────────
function PartAView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part A · Full Software Lifecycle</h1>
        <p className="page-sub">Plan → Code → Build → Deploy → Operate → Maintain → Cost. Short, opinionated bullets.</p>
      </div>
      {D.lifecycle.map((grp, i) => (
        <SectionCard
          key={grp.group}
          title={grp.group}
          items={grp.items}
          group={"lifecycle"}
          tilted={i % 2 ? "right" : "left"}
        />
      ))}
    </div>
  );
}

// ───────── PART B — Hands-on Phases ─────────
function PartBView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part B · Hands-on Phases</h1>
        <p className="page-sub">One worked example — a Todo app — from <code>docker compose up</code> to AWS production.</p>
      </div>

      {D.phases.map((p, i) => (
        <section key={p.id} className={"section-card " + (i % 2 ? "tilted-r" : "tilted-l")}>
          {i === 0 && <span className="tape tl"></span>}
          <h2>{p.title}</h2>
          <p className="lead">🎯 {p.goal}</p>
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

// ───────── PART D — System Design for SRE ─────────
function PartDView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part D · System Design for SRE</h1>
        <p className="page-sub">SRE interviewers add reliability, observability, deployment, cost on top of vanilla SD.</p>
      </div>
      <SectionCard title="Core books" items={D.sreSysDesignBooks} group="sreBooks" tilted="left" />
      <SectionCard title="SRE-specific topics" items={D.sreSysDesignTopics} group="sreTopics" tilted="right" />
      <SectionCard title="SRE-flavor design questions" lead="Practice each in a 45-min mock." items={D.sreFlavorQuestions} group="sreFlavor">
        <Notes id="sreFlavor" />
      </SectionCard>
    </div>
  );
}

// ───────── PART E — Coding ─────────
function PartEView() {
  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Part E · Coding & Programming</h1>
        <p className="page-sub">Go (primary) · Python (secondary) · Bash + SQL fluency.</p>
      </div>
      <SectionCard title="Go learning path (~40 hrs)" items={D.goPath} group="goPath" tilted="left">
        <TimeLog id="goPath" />
      </SectionCard>
      <SectionCard title="Other skills" items={D.otherSkills} group="otherSk" tilted="right" />
      <section className="section-card">
        <h2>LeetCode strategy</h2>
        <p className="lead">NeetCode 150 · 1 hr/day × 5 days × 12 weeks ≈ enough for SRE coding bars.</p>
        <div className="callout">Skip DP-hard + advanced graph theory unless you have extra time. Focus on the 150 set in <strong>0F</strong>.</div>
      </section>
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
        <p className="page-sub">Track each company through the pipeline. Star your top targets. Apply early, refer often.</p>
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
                <span style={{fontSize: 12, color: "var(--ink-faint)", fontFamily: "Caveat, cursive", fontSize: 16}}>{j.stage === "Offer" ? "🎉" : j.stage === "Rejected" ? "—" : ""}</span>
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
        <p className="page-sub">Standard SRE/DevOps loop = 5 rounds. Know each and have your story bank ready.</p>
      </div>

      <SectionCard title="The 5-round loop" items={D.loopRounds} group="loop" tilted="left" />
      <SectionCard title="Questions to ask the interviewer" lead="Show you care about reliability, ownership, ramp-up." items={D.questionsToAsk} group="qAsk" tilted="right" />

      <section className="section-card">
        <h2>Mock interviews log</h2>
        <p className="lead">Aim: 1 every 2 weeks. Pramp (free) → Hello Interview AI → interviewing.io for FAANG mocks.</p>
        <button onClick={addMock} style={{padding:"6px 14px", border:"1.5px solid var(--ink)", borderRadius: 20, background: "var(--accent)", fontFamily: "Caveat, cursive", fontSize: 20, marginBottom: 10}}>
          + Log a mock
        </button>
        {mocks.length === 0 ? (
          <p style={{color: "var(--ink-faint)", fontStyle: "italic"}}>No mocks logged yet. First one is the hardest.</p>
        ) : (
          <ul className="checklist">
            {mocks.map(m => (
              <li key={m.id}>
                <span style={{fontFamily: "Caveat, cursive", fontSize: 20, color: "var(--blue)", minWidth: 110}}>{m.date}</span>
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
        <p className="page-sub">Visible work is what separates you from the next 200 applications. Build → publish → share.</p>
      </div>

      <SectionCard
        title="Six pinned GitHub repos"
        lead="Each one a real, polished project. Pin them on your profile."
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
        lead="1 post / 3–4 weeks · 1,500–3k words · cross-post to dev.to + Hashnode + LinkedIn"
        items={D.blogIdeas}
        group="blog"
        tilted="right"
      />

      <SectionCard
        title="Certifications"
        lead="Tick when you've passed."
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
        <p className="page-sub">Books + courses to grind through. Tick when finished — or when "good enough for interviews".</p>
      </div>

      <SectionCard title="Must-read books" items={D.books} group="books" tilted="left">
        <TimeLog id="books" />
        <Notes id="books" placeholder="Chapter notes, favorite passages, what to revisit." />
      </SectionCard>

      <SectionCard title="Courses"
        items={D.courses}
        group="courses"
        tilted="right"
        renderItem={(it) => (
          <span><strong>{it.name}</strong>
            <span style={{color:"var(--ink-faint)", marginLeft:8, fontSize:13}}>{it.plat} · {it.cost}</span>
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

// ───────── HABITS ─────────
function HabitsView() {
  const { counts, daily, dayIdx, bump, reset, wk } = useHabits();
  const totalProgress = useMemo(() => {
    let hit = 0, tgt = 0;
    D.habits.forEach(h => {
      tgt += h.target;
      hit += Math.min(counts[h.id] || 0, h.target);
    });
    return { hit, tgt };
  }, [counts]);

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">Weekly Habits</h1>
        <p className="page-sub">Week starting <strong>{wk}</strong>. Bump each habit as you do it. Resets every Sunday.</p>
      </div>

      <section className="section-card tilted-l">
        <h2>This week</h2>
        <Progress done={totalProgress.hit} total={totalProgress.tgt} label="completions" />
        <button onClick={() => { if (confirm("Reset this week's counters?")) reset(); }}
          style={{padding:"4px 12px", border:"1.5px solid var(--paper-line)", borderRadius: 16, background: "var(--paper)", fontSize: 12, color: "var(--ink-soft)"}}>
          Reset week
        </button>

        <div style={{marginTop: 16}}>
          {D.habits.map(h => {
            const c = counts[h.id] || 0;
            const ratio = Math.min(1, c / h.target);
            const dailyMap = daily[h.id] || {};
            return (
              <div key={h.id} className="habit-row">
                <div className="habit-name">{h.name}</div>
                <div className="habit-counter">
                  <button onClick={() => bump(h.id, -1)}>−</button>
                  <span className="num">
                    {c}<span className="target"> / {h.target}</span>
                  </span>
                  <button onClick={() => bump(h.id, +1)}>+</button>
                </div>
                <div className="week-strip">
                  {["S","M","T","W","T","F","S"].map((l, i) => (
                    <div key={i} className={"week-day " + ((dailyMap[i]||0) > 0 ? "done " : "") + (i === dayIdx ? "today" : "")}>{l}</div>
                  ))}
                </div>
                <div style={{width: 30, fontFamily: "Caveat, cursive", fontSize: 22, color: ratio >= 1 ? "var(--green)" : "var(--ink-faint)"}}>
                  {ratio >= 1 ? "✓" : Math.round(ratio*100)+"%"}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="section-card tilted-r">
        <h2>Why habits matter</h2>
        <p>15 hours/week is the budget. Spread it: 5 hrs LeetCode + 5 hrs technical study + 4 hrs hands-on + 1 hr writing/networking. The streak is the goal — daily input beats weekend cramming for skill-building.</p>
      </section>
    </div>
  );
}

// ───────── SRE LEARNING (the curated path: foundations → reliability) ─────────

function ResourceTag({ type }) {
  const map = {
    video:  { l: "VIDEO",  bg: "#fcebe2", c: "var(--red)" },
    course: { l: "COURSE", bg: "#dfeefb", c: "var(--blue)" },
    book:   { l: "BOOK",   bg: "#e3f1da", c: "var(--green)" },
    blog:   { l: "BLOG",   bg: "#fef9e0", c: "#9a6c00" },
  };
  const s = map[type] || { l: "RES", bg: "#eee", c: "#666" };
  return (
    <span
      className="tag"
      style={{ background: s.bg, color: s.c, borderColor: s.c, marginRight: 8, marginLeft: 0 }}
    >{s.l}</span>
  );
}

function SreLearningView({ sectionKey }) {
  const section = D.sreRoadmap[sectionKey];
  if (!section) return null;
  const resGroup = "sreLr_" + sectionKey;
  const milGroup = "sreLm_" + sectionKey;
  const resDone = D.sreRoadmap[sectionKey].resources.filter(r => (loadJSON("done:" + resGroup, {}))[r.id]).length;
  const milDone = section.milestones.filter(m => (loadJSON("done:" + milGroup, {}))[m.id]).length;

  const renderResource = (it) => (
    <span>
      <ResourceTag type={it.type} />
      {it.url ? (
        <a href={it.url} target="_blank" rel="noopener">{it.name}</a>
      ) : <span>{it.name}</span>}
    </span>
  );

  return (
    <div>
      <div className="page-head">
        <h1 className="page-title">{section.title}</h1>
        <p className="page-sub">{section.intro}</p>
      </div>

      {section.why && <div className="callout">{section.why}</div>}

      <section className="section-card tilted-l">
        <span className="tape tl"></span>
        <h2>📚 Curated resources</h2>
        <p className="lead">A mix of videos, courses, books, blogs. Tick when you've worked through it (or honestly decided you don't need to).</p>
        <Progress done={resDone} total={section.resources.length} />
        <Checklist
          items={section.resources}
          group={resGroup}
          renderItem={renderResource}
        />
        <TimeLog id={resGroup} />
      </section>

      <section className="section-card tilted-r">
        <h2>🛠 Hands-on milestones</h2>
        <p className="lead">Do not tick unless you've actually shipped it. This is the difference between "watched a video" and "I can do this."</p>
        <Progress done={milDone} total={section.milestones.length} />
        <Checklist items={section.milestones} group={milGroup} />
        <Notes id={milGroup} placeholder="Log links to commits, gotchas, gnarly bugs that taught you something." />
      </section>
    </div>
  );
}

const SRE_FoundationsView = () => <SreLearningView sectionKey="foundations" />;
const SRE_CodingView      = () => <SreLearningView sectionKey="coding" />;
const SRE_CloudView       = () => <SreLearningView sectionKey="cloud" />;
const SRE_AutomationView  = () => <SreLearningView sectionKey="automation" />;
const SRE_ReliabilityView = () => <SreLearningView sectionKey="reliability" />;

Object.assign(window, {
  OverviewView, P0_SysDesignView, P0_BehaviorView, P0_LLDView, P0_SQLView,
  P0_DSAView, P0_ScheduleView, PartAView, PartBView, PartDView, PartEView,
  PartGView, PartHView, PartIView, PartJView, HabitsView,
  SRE_FoundationsView, SRE_CodingView, SRE_CloudView, SRE_AutomationView, SRE_ReliabilityView,
});
