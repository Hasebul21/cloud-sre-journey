# SRE / DevOps Mastery + APAC SWE Job Search Guide

> **For:** Bangladesh-based Junior SRE — Docker, CI/CD, K8s basics, some AWS
> **Goal:** Master full software lifecycle + land visa-sponsored SRE/DevOps role in SG/JP/MY/TH
> **Time:** 15 hrs/week | **Timeline:** 6 months

---

## Table of Contents

0. [Mental Model — Where Each Technology Fits](#mental-model)
1. [Part 0 — Interview Prep Track (Hello Interview Framework)](#part-0)
2. [Part SRE — Dedicated SRE Learning Track (Beginner → Advanced)](#part-sre)
   - **Level 1 — Foundations** (Stages 0–2)
   - **Level 2 — Core SRE Skills** (Stages 3–5)
   - **Level 3 — Advanced SRE** (Stages 6–7)
   - **Level 4 — Mastery & Leadership** (Stage 8+)
3. [Part AI — AI Engineering for SRE/DevOps](#part-ai)
   - **Level 1 — Foundations** (concepts, videos, books)
   - **Level 2 — Core Engineering** (stack, RAG, blogs, agentic playlists)
   - **Level 3 — Advanced / Production** (agents, AIOps, infra ops, safety)
   - **Level 4 — Specialist** (papers, APAC signal, antipatterns)
4. [Part A — Full Software Lifecycle Mastery](#part-a)
   - [A1–A2. Plan + Code](#a1a2-plan--code)
   - [A3–A4. Build + Deploy](#a3a4-build--deploy)
   - [A5–A6. Operate + Maintain](#a5a6-operate--maintain)
   - [A7. Cost Optimization](#a7-cost-optimization)
5. [Part B — AWS, Kubernetes & Observability (Hands-On)](#part-b)
   - **Level 1 — Local & Containerized**
     - [Phase 1 — Build & Containerize](#phase-1--build--containerize)
     - [Phase 2 — Kubernetes (Local with kind)](#phase-2--kubernetes-local-with-kind)
   - **Level 2 — Observability Stack**
     - [Phase 3 — ELK Stack (Logging)](#phase-3--elk-stack-logging)
     - [Phase 4 — Observability (Metrics + Traces + Alerts)](#phase-4--observability-metrics--traces--alerts)
   - **Level 3 — Production on AWS**
     - [Phase 5 — AWS Deployment](#phase-5--aws-deployment)
     - [Phase 6 — IaC with Terraform](#phase-6--iac-with-terraform)
     - [Phase 7 — CI/CD Pipeline](#phase-7--cicd-pipeline-github-actions)
6. [Part D — System Design for SRE Interviews](#part-d)
   - **Level 1 — Foundations** · **Level 2 — Core** · **Level 3 — Advanced** · **Level 4 — Specialist**
7. [Part G — APAC Job Search](#part-g)
8. [Part H — Interview Preparation](#part-h)
9. [Part I — Personal Branding](#part-i)
10. [Part J — Resources](#part-j)
11. [Part K — Build-It-Up Roadmap: HLDs Per Learn Stage](#part-k)

---

## <a id="mental-model"></a>Mental Model — Where Each Technology Fits

> **Read this first.** It is the map for the rest of the guide. Every Stage / Phase / Level you learn slots into one of these tiers — when you finish one, come back here and ask *"which tier did I just deepen, and which is still weakest?"*

### The request path (vertical stack)

```
TIER                  CLASS        TECH YOU'RE LEARNING            WHERE YOU LEARN IT
─────────────────────────────────────────────────────────────────────────────────────
User / browser        FRONTEND     (out of scope — you're SRE)     —
        │
        ▼
CDN edge              EDGE         Fastly + VCL                    Stage 5.5 (Fastly / VCL)
                                   CloudFront                      Part B Phase 5 (AWS)
                                   Cloudflare (vocab only)
        │
        ▼
Load balancer         EDGE (L4/L7) HAProxy                         Stage 5.5 (HAProxy)
                                   AWS ALB / NLB                   Part B Phase 5
                                   Envoy as L7 LB                  Stage 5.5 (Envoy)
        │
        ▼
API gateway           EDGE → APP   Kong + Kong Ingress Controller  Stage 5.5 (Kong / K8s ingress)
(K8s ingress)
        │
        ▼
Reverse proxy         EDGE → APP   NGINX (proxy_pass, microcache)  Stage 5.6 (NGINX)
                                   Envoy (L7 front-proxy)          Stage 5.6 (Envoy)
                                   Envoy (sidecar / mesh)          Stage 7 (service mesh)
        │
        ▼
Forward proxy         APP → INTERNET Squid + mitmproxy              Stage 5.7 (forward / egress)
(outbound / egress)                NAT Gateway / Cloud NAT
                                   Istio EgressGateway             Stage 7 (service mesh)
        │
        ▼
Cache layer           DATA         Redis / Memcached (in-mem)      Part D L2 (caching), Part B Phase 4
                                   (Varnish skipped — Fastly
                                    covers VCL at the edge)
        │
        ▼
App servers           BACKEND      Go (Todo API — primary)         Part B Phase 1–2
(horizontally                      Python (scripts, Lambda)
scaled in K8s)                     Running on:
                                     • kind (local)                Part B Phase 2
                                     • EKS (prod)                  Part B Phase 5, Stage 4
                                   Containerized via Docker        Stage 3, Part B Phase 1
        │
        ▼
Database              DATA         PostgreSQL (RDS in prod)        Part B Phase 2, 5
                                   Redis (cache + sessions)        Part D L2
                                   DDIA mental model               Stage 7, Part D L2–L3
```

### Cross-cutting layers (touch every tier above)

| Layer | Where you learn it | Tools |
|-------|--------------------|-------|
| **Observability** | Stage 5 + Part B Phase 3–4 | Prometheus + Grafana (metrics) · Loki / ELK (logs) · OpenTelemetry + Jaeger (traces) · multi-window burn-rate SLO alerts |
| **CI/CD + GitOps** | Stage 4 + Part B Phase 7 | GitHub Actions (build/push) · ArgoCD (reconcile K8s) · Helm + Kustomize (templating) |
| **IaC** | Stage 3 + Part B Phase 6 | Terraform → CDN, ALB, EKS, RDS, IAM |
| **Reliability practice** | Stage 6 | Incident command, chaos game days, runbooks, capacity planning, PRRs |
| **DevSecOps + Security** | Stage 7 | WAF + rate-limit at CDN/Kong · mTLS via Linkerd/Istio · Vault + External Secrets Operator · SBOM/Sigstore in CI |
| **AI layer (optional)** | Part AI L3.3 | vLLM cluster = specialized backend tier · RAG over runbooks = ops tooling, NOT in request path |

### Frontend / Edge / Backend / Data boundaries

- **Frontend** (browser, JS/CSS/HTML, mobile clients) — you don't study this; it sits above the CDN. Know enough to talk to FE engineers, no more.
- **Edge** (CDN → LB → API gateway → reverse proxy) — **Stage 5.5** (CDN + API gateway + HAProxy) and **Stage 5.6** (NGINX + Envoy reverse proxies) own this inbound vertical block. **Stage 5.7** covers the outbound/egress mirror (forward proxies, Squid, NAT, mesh egress). Whoever owns the edge owns the SLOs for everyone behind it.
- **Backend** (app servers + their orchestration) — **Part B's Todo App** is the worked example here; Stages 3 (containers), 4 (K8s/CI), 5 (observability), 7 (mesh) all wrap this tier.
- **Data** (cache + database) — **Part D L2** covers the design patterns; **Part B Phase 2 / 5** covers the implementation.

### How to use this map

When you finish a Stage or Phase, point at this diagram and ask: *"Which tier did I just deepen, and which tier is still my weakest?"* For the APAC SRE bar, you want depth in **Edge → Backend → Observability**; the other tiers can stay at "explain it well in an interview" level.

---

## <a id="part-0"></a>Part 0 — Interview Prep Track (Hello Interview Framework)

> Source: [Hello Interview YouTube](https://www.youtube.com/@hello_interview) | [hellointerview.com](https://www.hellointerview.com)
>
> All video links below are from the Hello Interview channel. Full playlists:
> - [Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2) · [Deep Dives](https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6) · [System Design Walkthroughs](https://www.youtube.com/playlist?list=PL5q3E8eRUieWtYLmRU3z94-vGRcwKr9tM) · [Low-Level Design](https://www.youtube.com/playlist?list=PL5q3E8eRUieUQCl6CAF4AlOZnmICKmAec) · [Hello Interviews](https://www.youtube.com/playlist?list=PL5q3E8eRUieUwRxPDt_JkpFI407PyXZth)

---

### 0A. System Design Interviews

> Start here: [How to Prepare for System Design Interviews](https://www.youtube.com/watch?v=Ru54dxzCyD0)

#### Level 1 — Foundations

> Master these before any walkthrough. ~2 weeks.

**Core Concepts to Master (with videos):**

| Concept | Video |
|---------|-------|
| Caching (cache-aside, write-through, TTL, eviction) | [Caching in System Design Interviews](https://www.youtube.com/watch?v=1NngTUYPdpI) |
| Message Queues (Kafka vs RabbitMQ vs SQS) | [Message Queues in System Design Interviews](https://www.youtube.com/watch?v=1ISRd0bS714) |
| Kafka vs RabbitMQ deep comparison | [Kafka vs RabbitMQ](https://www.youtube.com/watch?v=1HOVtQ-_fcE) |
| Sharding (hash vs range, consistent hashing, hot keys) | [Sharding in System Design Interviews](https://www.youtube.com/watch?v=L521gizea4s) |
| Consistent Hashing | [Consistent Hashing: Easy Explanation](https://www.youtube.com/watch?v=vccwdhfqIrI) |
| API Design (REST, gRPC, idempotency, pagination) | [API Design in System Design Interviews](https://www.youtube.com/watch?v=DQ57zYedMdQ) |
| Data Modeling (schema design, normalization) | [Data Modeling in System Design Interviews](https://www.youtube.com/watch?v=TUcPS6dsWx4) |
| Object Storage (S3, blob storage internals) | [Object Storage in System Design Interviews](https://www.youtube.com/watch?v=RvaMHMxHjp4) |
| Networking (DNS, HTTP/1/2/3, TCP, load balancers) | [Networking Essentials for System Design](https://www.youtube.com/watch?v=SHkbPm1Wrno) |

**Easy walkthroughs:**

| Problem | Video |
|---------|-------|
| Design Bitly (URL Shortener) | https://www.youtube.com/watch?v=iUU4O1sWtJA |
| Design Dropbox / Google Drive | https://www.youtube.com/watch?v=_UZ1ngy-kOI |

#### Level 2 — Core

> Mid-level walkthroughs + storage deep dives. Most APAC mid-SRE rounds target this. ~3 weeks.

**Deep Dive Videos (watch when a topic appears in a walkthrough):**

| Topic | Video |
|-------|-------|
| Kafka internals (topics, partitions, consumer groups) | [Kafka System Design Deep Dive](https://www.youtube.com/watch?v=DU8o-OTeoCc) |
| Redis (sorted sets, clustering, persistence) | [Redis Deep Dive](https://www.youtube.com/watch?v=fmT5nlEkl3U) |
| Elasticsearch (inverted index, shards, scoring) | [Elasticsearch Deep Dive](https://www.youtube.com/watch?v=PuZvF2EyfBM) |
| DB Indexing (B-tree, geospatial, inverted index) | [DB Indexing in System Design Interviews](https://www.youtube.com/watch?v=BHCSL_ZifI0) |
| API Gateways (rate limiting, auth, routing) | [API Gateways in System Design Interviews](https://www.youtube.com/watch?v=7-6F3b14baA) |
| Recommendation System infrastructure | [Recommendation System Infra Basics](https://www.youtube.com/watch?v=GncgOIiMII8) |
| Big Data Structures (Bloom filters, HyperLogLog) | [Data Structures for Big Data](https://www.youtube.com/watch?v=IgyU0iFIoqM) |

**Medium walkthroughs:**

| Problem | Video |
|---------|-------|
| Design WhatsApp | https://www.youtube.com/watch?v=cr6p0n0N-VA |
| Design Twitter | https://www.youtube.com/watch?v=Nfa-uUHuFHg |
| Design FB News Feed | https://www.youtube.com/watch?v=Qj4-GruzyDU |
| Design Tinder | https://www.youtube.com/watch?v=18Fg5Akhkqw |
| Design Live Comments | https://www.youtube.com/watch?v=LjLx0fCd1k8 |
| Design a Distributed Rate Limiter | https://www.youtube.com/watch?v=MIJFyUPG4Z4 |
| Design Web Crawler | https://www.youtube.com/watch?v=krsuaUp__pM |

#### Level 3 — Advanced

> Consistency, distributed transactions, multi-region. Senior SRE rounds. ~3 weeks.

**Advanced Deep Dives:**

| Topic | Video |
|-------|-------|
| DynamoDB (single-table design, GSI, hot partitions) | [DynamoDB Deep Dive](https://www.youtube.com/watch?v=2X2SO3Y-af8) |
| Cassandra (wide-column, partition key, vs DynamoDB) | [Cassandra Deep Dive](https://www.youtube.com/watch?v=TD3-INhm60Q) |
| CAP Theorem (CP vs AP, eventual consistency) | [CAP Theorem in System Design Interviews](https://www.youtube.com/watch?v=VdrEq0cODu4) |
| Distributed Transactions (2PC vs Saga) | [Distributed Transactions: 2PC vs Saga](https://www.youtube.com/watch?v=DOFflggE_0Q) |
| Time Series Databases | [How do Time Series Databases Work?](https://www.youtube.com/watch?v=Qd76ZmfRs_Q) |

**Design Patterns (senior signal):**
- **Real-time Updates** — WebSockets vs SSE vs Long Polling vs Short Polling
- **Contention Management** — Redis Redlock, optimistic locking, queue-based serialization
- **Multi-step Processes** — Saga (choreography vs orchestration), idempotent retries, outbox pattern
- **Read/Write Scaling** — CQRS, read replicas, materialized views, event sourcing
- **Large Data Handling** — batch (MapReduce/Spark), stream (Kafka+Flink), columnar (Parquet/Iceberg)
- **Long-running Jobs** — async queues (SQS/Celery), polling vs webhooks, distributed scheduling

**Hard walkthroughs:**

| Problem | Video |
|---------|-------|
| Design Ticketmaster | https://www.youtube.com/watch?v=fhdPyoO6aXI |
| Design Uber | https://www.youtube.com/watch?v=lsKU38RKQSo |
| Design YouTube | https://www.youtube.com/watch?v=IUrQ5_g3XKs |
| Design LeetCode (Online Judge) | https://www.youtube.com/watch?v=1xHADtekTNg |

#### Level 4 — Specialist

> Hardest walkthroughs + specialized analytics/search systems. Staff-level interview territory.

**Specialist walkthroughs:**

| Problem | Video |
|---------|-------|
| Design Ad Click Aggregator | https://www.youtube.com/watch?v=Zcv_899yqhI |
| Design Ad Click Aggregator (original version) | https://www.youtube.com/watch?v=1oFVUT4_Yy0 |
| Design Top-K System | https://www.youtube.com/watch?v=y-tA2NW4LNY |
| Design FB Post Search | https://www.youtube.com/watch?v=l38XL9914fs |

Cross-reference: see **Part D Level 4 (SRE Flavor)** for SRE-specific senior questions (multi-region active-active, log pipeline at 10TB/day, etc.).

#### Distributed Systems Deep Dive — MIT 6.824 (Spring 2020)

> Robert Morris's canonical distributed systems course. Covers Raft, GFS, Spanner, Aurora, Spark, and the core papers behind every modern data system. Strongest signal for L3–L4 system design rounds and paper-driven follow-ups. 20 lectures; pair each lecture with the assigned paper from the [course site](https://pdos.csail.mit.edu/6.824/schedule.html).
>
> [Full playlist](https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB)

| # | Lecture | Link |
|---|---------|------|
| 1 | Introduction | https://www.youtube.com/watch?v=cQP8WApzIQQ |
| 2 | RPC and Threads | https://www.youtube.com/watch?v=gA4YXUJX7t8 |
| 3 | GFS | https://www.youtube.com/watch?v=EpIgvowZr00 |
| 4 | Primary-Backup Replication | https://www.youtube.com/watch?v=M_teob23ZzY |
| 5 | Go, Threads, and Raft | https://www.youtube.com/watch?v=UzzcUS2OHqo |
| 6 | Fault Tolerance: Raft (1) | https://www.youtube.com/watch?v=64Zp3tzNbpE |
| 7 | Fault Tolerance: Raft (2) | https://www.youtube.com/watch?v=4r8Mz3MMivY |
| 8 | Zookeeper | https://www.youtube.com/watch?v=pbmyrNjzdDk |
| 9 | More Replication, CRAQ | https://www.youtube.com/watch?v=IXHzbCuADt0 |
| 10 | Cloud Replicated DB, Aurora | https://www.youtube.com/watch?v=jJSh54J1s5o |
| 11 | Cache Consistency: Frangipani | https://www.youtube.com/watch?v=-pKNCjUhPjQ |
| 12 | Distributed Transactions | https://www.youtube.com/watch?v=aDp99WDIM_4 |
| 13 | Spanner | https://www.youtube.com/watch?v=4eW5SWBi7vs |
| 14 | Optimistic Concurrency Control | https://www.youtube.com/watch?v=Cw6Nj2evjSs |
| 15 | Big Data: Spark | https://www.youtube.com/watch?v=mzIoSW-cInA |
| 16 | Cache Consistency: Memcached at Facebook | https://www.youtube.com/watch?v=Myp8z0ybdzM |
| 17 | COPS, Causal Consistency | https://www.youtube.com/watch?v=fR_NB714EAI |
| 18 | Fork Consistency, Certificate Transparency | https://www.youtube.com/watch?v=UKdLJ7-0iFM |
| 19 | Bitcoin | https://www.youtube.com/watch?v=K_euhRou98Y |
| 20 | Blockstack | https://www.youtube.com/watch?v=XvXK_vZ0BNw |

---

### 0B. Behavioral Interviews

> Watch first: [Behavioral Interview: Common Questions Broken Down](https://www.youtube.com/watch?v=CAda15Tawlg)

**Videos:**

| Video | Link |
|-------|------|
| Behavioral Interview: Common Questions (Ex-Meta & Amazon) | [Watch](https://www.youtube.com/watch?v=CAda15Tawlg) |
| Behavioral Interview Discussion w/ Ex-Meta Hiring Committee Member | [Watch](https://www.youtube.com/watch?v=bBvPQZmPXwQ) |
| The Art of People Manager Interviews | [Watch](https://www.youtube.com/watch?v=dYrMSHZnqw0) |
| Interview with a Meta EM: AI Impact, Team Match, How to Learn | [Watch](https://www.youtube.com/watch?v=3Hb5An-NaX8) |
| How to Learn System Design w/ Jordan Has No Life | [Watch](https://www.youtube.com/watch?v=nJsVO84LCGs) |

**STAR framework:** Situation → Task → Action (say "I" not "we") → Result (quantify). Each story: 90–120 seconds.

| Theme | Question type |
|-------|---------------|
| Ownership | End-to-end project you drove |
| Conflict | Disagreed with a tech decision |
| Failure | Production incident you caused |
| Initiative | Took on task without being asked |
| Collaboration | Worked cross-functionally |
| Ambiguity | No clear spec — what did you do? |
| Technical Influence | Convinced team to adopt better practice |
| Prioritization | Multiple fires — how did you triage? |

**Amazon-specific:** Know all 14 Leadership Principles; have a story for the top 8.

---

### 0D. Low-Level Design (OOP)

**Videos:**

| Video | Link |
|-------|------|
| Concurrency in Low-Level Design Interviews | [Watch](https://www.youtube.com/watch?v=d8rmosXttTE) |
| LLD Interview: Design an Elevator | [Watch](https://www.youtube.com/watch?v=fODT0ldeBiU) |
| LLD Interview: Design Amazon Locker | [Watch](https://www.youtube.com/watch?v=s6nGkoGJhXk) |
| LLD Interview: Design Connect Four | [Watch](https://www.youtube.com/watch?v=9UI4ikKP3Ws) |

- **SOLID Principles** — Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **Key Patterns** — Factory, Singleton, Observer, Strategy, Decorator, Builder
- **Practice problems** — Parking Lot, Elevator, Chess, Library System, Food Delivery App, Notification System

---

### 0E. SQL / MySQL Interviews

SQL appears in almost every SRE/SWE interview loop — often 1–2 questions in the coding round or a standalone round.

#### Core Syntax to Master

```sql
-- Joins
SELECT a.col, b.col FROM a INNER JOIN b ON a.id = b.id
LEFT JOIN  -- keeps all rows from left, NULLs where no match
SELF JOIN  -- join a table to itself (e.g. employee → manager)

-- Aggregation
SELECT dept, COUNT(*), AVG(salary), MAX(salary)
FROM employees
GROUP BY dept
HAVING AVG(salary) > 50000   -- filter AFTER aggregation (WHERE filters before)

-- Window Functions (most common in interviews)
ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC)
RANK()        -- ties get same rank, next rank skips (1,1,3)
DENSE_RANK()  -- ties get same rank, no skip (1,1,2)
LAG(salary, 1) OVER (ORDER BY date)   -- previous row value
LEAD(salary, 1) OVER (ORDER BY date)  -- next row value
SUM(amount) OVER (PARTITION BY user_id ORDER BY date)  -- running total

-- Subqueries vs CTEs
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn = 1;  -- top earner per department
```

#### High-Frequency Interview Patterns

| Pattern | Classic problem |
|---------|----------------|
| **Top N per group** | Highest salary per department |
| **Running totals** | Cumulative revenue by date |
| **Gap & island** | Find consecutive active days |
| **Self join** | Employee + their manager in same row |
| **Pivot / unpivot** | Rows to columns (CASE + GROUP BY) |
| **Deduplication** | Delete duplicates keeping one row |
| **Percentile / median** | Median salary (no built-in in some DBs) |
| **Date arithmetic** | Users active in last 30 days, month-over-month growth |

#### Must-Know Concepts for Interviews

**NULL Handling**
- `IS NULL` / `IS NOT NULL` — never use `= NULL` (always false in MySQL)
- `COALESCE(col, 0)` — returns first non-NULL; use to replace NULLs in output
- `IFNULL(col, 0)` — MySQL shorthand for COALESCE with two args
- `NULLIF(a, b)` — returns NULL if a = b; useful to avoid division-by-zero: `SUM(x) / NULLIF(SUM(y), 0)`
- NULLs are excluded from `COUNT(col)`, `SUM()`, `AVG()` — `COUNT(*)` counts all rows including NULLs
- `NOT IN (subquery)` with NULLs in subquery returns no rows — use `NOT EXISTS` instead

**JOIN Types**
- `INNER JOIN` — only matching rows from both tables
- `LEFT JOIN` — all rows from left, NULLs where no match; use for "find rows with no match" (WHERE right.id IS NULL)
- `SELF JOIN` — same table aliased twice; classic for employee→manager or comparing rows
- `CROSS JOIN` — cartesian product; used for generating combinations
- No FULL OUTER JOIN in MySQL — emulate with `LEFT JOIN UNION RIGHT JOIN`

**Subquery Types**
- **Scalar subquery** — returns single value; usable in SELECT, WHERE, HAVING
- **Correlated subquery** — references outer query; re-runs per row (slow on large tables; prefer JOIN/window)
- **Derived table** — subquery in FROM clause: `FROM (SELECT ...) AS t`
- **EXISTS** — stops at first match, handles NULLs correctly; prefer over `IN` for large datasets

**String Functions**
- `CONCAT(a, b)` / `CONCAT_WS(sep, a, b)` — join strings
- `UPPER(col)` / `LOWER(col)` — case conversion
- `SUBSTRING(col, start, len)` — extract substring (1-indexed)
- `LEFT(col, n)` / `RIGHT(col, n)` — first/last n characters
- `LENGTH(col)` — byte length; `CHAR_LENGTH(col)` — character count (differs for UTF-8)
- `TRIM(col)` / `LTRIM` / `RTRIM` — remove whitespace
- `REPLACE(col, 'old', 'new')` — string replacement
- `LIKE '%pattern%'` — case-insensitive in MySQL default collation; `REGEXP` for complex patterns
- `GROUP_CONCAT(col ORDER BY col SEPARATOR ', ')` — aggregate rows into comma-separated string

**Date & Time Functions**
- `NOW()` / `CURDATE()` / `CURTIME()` — current datetime/date/time
- `DATE(datetime_col)` — extract date part from datetime
- `DATEDIFF(date1, date2)` — days between dates (date1 − date2)
- `DATE_ADD(date, INTERVAL n DAY)` / `DATE_SUB(...)` — add/subtract intervals
- `DATE_FORMAT(date, '%Y-%m')` — format date as string; `%Y` year, `%m` month, `%d` day
- `YEAR(col)` / `MONTH(col)` / `DAY(col)` — extract parts
- `TIMESTAMPDIFF(MONTH, start, end)` — difference in specified unit

**CASE Expressions**
```sql
-- Simple CASE
CASE status WHEN 'active' THEN 1 WHEN 'inactive' THEN 0 ELSE NULL END

-- Searched CASE (more flexible)
CASE WHEN salary > 100000 THEN 'high'
     WHEN salary > 50000  THEN 'medium'
     ELSE 'low' END

-- Pivot pattern: rows to columns
SELECT dept,
  SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
  SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count
FROM employees GROUP BY dept;
```

**UNION & Set Operations**
- `UNION` — combines results, removes duplicates (adds sort overhead)
- `UNION ALL` — combines results, keeps duplicates (faster; prefer unless dedup needed)
- Both SELECT lists must have same number of columns with compatible types
- Classic use: return two different aggregates in one result (e.g., highest earner + most orders)

**DISTINCT vs GROUP BY**
- `SELECT DISTINCT col` — removes duplicate rows; single column or all listed columns together
- `GROUP BY` — aggregates; use when you need COUNT/SUM/AVG alongside the grouped column
- `GROUP BY` with no aggregate = effectively DISTINCT but slower; use DISTINCT instead

**HAVING vs WHERE**
- `WHERE` filters individual rows before grouping; cannot reference aggregate functions
- `HAVING` filters groups after aggregation; can reference aggregates (`HAVING COUNT(*) > 5`)
- Both can appear in the same query: WHERE reduces rows first, then GROUP BY, then HAVING

**Index Usage**
- Full table scan occurs when: no index on filter column, leading column rule violated, `LIKE '%prefix'`, function on indexed column (`WHERE YEAR(date) = 2024` → use range instead)
- Composite index `(a, b, c)` — usable for queries filtering on `a`, `a+b`, or `a+b+c`; not `b` alone
- Covering index — index contains all columns the query needs; no table row lookup required
- `EXPLAIN` / `EXPLAIN ANALYZE` — check `type` column: `ALL` = full scan (bad), `ref`/`range`/`const` = index used

**Transactions & Isolation (MySQL InnoDB)**
- `READ UNCOMMITTED` — dirty reads possible (rarely used)
- `READ COMMITTED` — sees only committed data; phantom reads possible; used at most APAC companies
- `REPEATABLE READ` — MySQL default; same query returns same rows within transaction; prevents dirty + non-repeatable reads
- `SERIALIZABLE` — strictest; full locking; massive performance hit
- Dirty read: reading uncommitted data from another transaction
- Phantom read: same query returns different rows due to concurrent INSERT

**MySQL-Specific Gotchas**
- `LIMIT n OFFSET m` — pagination; MySQL syntax; OFFSET is 0-indexed
- `ON DUPLICATE KEY UPDATE col = VALUES(col)` — upsert pattern
- `INSERT IGNORE` — skips insert on duplicate key error silently
- `AUTO_INCREMENT` — gap behavior: gaps appear after rollbacks or DELETE; never rely on contiguous IDs
- `GROUP BY` in MySQL (pre-8.0) allowed non-aggregated columns without error — dangerous; use `ONLY_FULL_GROUP_BY` mode
- `=` comparison is case-insensitive for strings by default (depends on collation); use `BINARY` for case-sensitive match

#### Top 30 LeetCode SQL Problems (sorted by difficulty)

##### Level 1 — Easy (13 problems) — lock in JOIN / NULL / GROUP BY mechanics

| # | Problem | Key Pattern |
|---|---------|-------------|
| 175 | Combine Two Tables | LEFT JOIN, NULL for missing rows |
| 181 | Employees Earning More Than Managers | Self JOIN |
| 182 | Duplicate Emails | GROUP BY HAVING COUNT > 1 |
| 183 | Customers Who Never Order | LEFT JOIN WHERE NULL / NOT IN |
| 196 | Delete Duplicate Emails | DELETE with self-join or subquery |
| 197 | Rising Temperature | Self JOIN on DATEDIFF = 1 |
| 511 | Game Play Analysis I | MIN(event_date) GROUP BY player |
| 577 | Employee Bonus | LEFT JOIN, NULL check in WHERE |
| 584 | Find Customer Referee | NULL trap — use `IS NULL OR != 2` |
| 595 | Big Countries | WHERE with OR / UNION |
| 1141 | User Activity for the Past 30 Days I | DATEDIFF / DATE range filter |
| 1484 | Group Sold Products By The Date | GROUP_CONCAT with ORDER BY |
| 1667 | Fix Names in a Table | CONCAT + UPPER + LOWER + SUBSTRING |

##### Level 2 — Medium (13 problems) — window functions, subqueries, pivots

| # | Problem | Key Pattern |
|---|---------|-------------|
| 176 | Second Highest Salary | LIMIT/OFFSET, IFNULL, subquery |
| 177 | Nth Highest Salary | Custom function, LIMIT with variable |
| 178 | Rank Scores | DENSE_RANK() window function |
| 180 | Consecutive Numbers | Self-join × 3 or LAG/LEAD |
| 184 | Department Highest Salary | Subquery MAX per group + JOIN |
| 550 | Game Play Analysis IV | DATE_ADD, correlated subquery or window |
| 570 | Managers with ≥5 Direct Reports | GROUP BY HAVING + JOIN |
| 626 | Exchange Seats | CASE + MOD(id,2), edge case last row |
| 1045 | Customers Who Bought All Products | GROUP BY HAVING COUNT(DISTINCT) |
| 1179 | Reformat Department Table | Pivot: SUM(CASE WHEN month=... ) |
| 1193 | Monthly Transactions I | DATE_FORMAT group by month, CASE SUM |
| 1341 | Movie Rating | UNION ALL of two aggregates |
| 1934 | Confirmation Rate | LEFT JOIN + AVG(CASE WHEN) |

##### Level 3 — Hard (4 problems) — multi-pattern, do last

| # | Problem | Key Pattern |
|---|---------|-------------|
| 185 | Department Top Three Salaries | DENSE_RANK() PARTITION BY dept |
| 262 | Trips and Users | Multi-join, rate calculation, date filter |
| 601 | Human Traffic of Stadium | Consecutive rows with ≥100 people |
| 1321 | Restaurant Growth | Sliding 7-day window AVG |

**Study order:** Level 1 → Level 2 → Level 3. Aim to solve each without hints; if stuck after 20 min, read the editorial then re-solve from scratch.

**Tip:** Practice in MySQL 8.0 (matches LeetCode environment). Window functions, CTEs, and DENSE_RANK work identically in PostgreSQL — switch freely for APAC company stacks.

---

### 0F. Coding / DSA — 150 Problems

> Study patterns in this order — quality > quantity. Talk through your approach before coding, start brute force, then optimize. Always test edge cases.
>
> **Two difficulty dimensions:**
> - **Topic-level** — each topic is tagged `[L1]`, `[L2]`, or `[L3]` in its header below (see map).
> - **Problem-level** — within each topic, the table has a Difficulty column (Easy / Medium / Hard) and problems are roughly ordered Easy → Hard.

**Topic level map:**

| Level | Topics | Total problems |
|-------|--------|----------------|
| **Level 1 — Foundations** | Arrays & Strings · Binary Search · Hash Maps & Sets · Linked Lists · Math & Bit | 55 |
| **Level 2 — Core patterns** | Trees · Heaps / Priority Queues · Stack & Monotonic Stack · Intervals | 45 |
| **Level 3 — Advanced** | Graphs · Dynamic Programming · Backtracking | 50 |

**Study order:** complete all Level 1 topics first → then Level 2 → then Level 3. Within a topic, do all Easy before Medium before Hard.

---

#### [L1] Arrays & Strings — 20 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 1 | Two Sum | Easy | Hash map | [LC 1](https://leetcode.com/problems/two-sum/) |
| 2 | Best Time to Buy and Sell Stock | Easy | Sliding window | [LC 121](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) |
| 3 | Contains Duplicate | Easy | Hash set | [LC 217](https://leetcode.com/problems/contains-duplicate/) |
| 4 | Valid Anagram | Easy | Frequency count | [LC 242](https://leetcode.com/problems/valid-anagram/) |
| 5 | Valid Palindrome | Easy | Two pointers | [LC 125](https://leetcode.com/problems/valid-palindrome/) |
| 6 | Product of Array Except Self | Medium | Prefix product | [LC 238](https://leetcode.com/problems/product-of-array-except-self/) |
| 7 | Maximum Subarray | Medium | Kadane's | [LC 53](https://leetcode.com/problems/maximum-subarray/) |
| 8 | Maximum Product Subarray | Medium | DP | [LC 152](https://leetcode.com/problems/maximum-product-subarray/) |
| 9 | 3Sum | Medium | Two pointers | [LC 15](https://leetcode.com/problems/3sum/) |
| 10 | Container With Most Water | Medium | Two pointers | [LC 11](https://leetcode.com/problems/container-with-most-water/) |
| 11 | Longest Substring Without Repeating Characters | Medium | Sliding window | [LC 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/) |
| 12 | Longest Repeating Character Replacement | Medium | Sliding window | [LC 424](https://leetcode.com/problems/longest-repeating-character-replacement/) |
| 13 | Group Anagrams | Medium | Hash map | [LC 49](https://leetcode.com/problems/group-anagrams/) |
| 14 | Subarray Sum Equals K | Medium | Prefix sum + hash | [LC 560](https://leetcode.com/problems/subarray-sum-equals-k/) |
| 15 | Rotate Array | Medium | Reversal | [LC 189](https://leetcode.com/problems/rotate-array/) |
| 16 | Find Minimum in Rotated Sorted Array | Medium | Binary search | [LC 153](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) |
| 17 | Search in Rotated Sorted Array | Medium | Binary search | [LC 33](https://leetcode.com/problems/search-in-rotated-sorted-array/) |
| 18 | Trapping Rain Water | Hard | Two pointers | [LC 42](https://leetcode.com/problems/trapping-rain-water/) |
| 19 | Minimum Window Substring | Hard | Sliding window | [LC 76](https://leetcode.com/problems/minimum-window-substring/) |
| 20 | Sliding Window Maximum | Hard | Monotonic deque | [LC 239](https://leetcode.com/problems/sliding-window-maximum/) |

#### [L1] Binary Search — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 21 | Binary Search | Easy | Classic | [LC 704](https://leetcode.com/problems/binary-search/) |
| 22 | First Bad Version | Easy | Search on answer | [LC 278](https://leetcode.com/problems/first-bad-version/) |
| 23 | Search a 2D Matrix | Medium | Flatten + binary search | [LC 74](https://leetcode.com/problems/search-a-2d-matrix/) |
| 24 | Find Peak Element | Medium | Binary search | [LC 162](https://leetcode.com/problems/find-peak-element/) |
| 25 | Koko Eating Bananas | Medium | Search on answer | [LC 875](https://leetcode.com/problems/koko-eating-bananas/) |
| 26 | Time Based Key-Value Store | Medium | Binary search on values | [LC 981](https://leetcode.com/problems/time-based-key-value-store/) |
| 27 | Capacity to Ship Packages Within D Days | Medium | Search on answer | [LC 1011](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/) |
| 28 | Find the Duplicate Number | Medium | Binary search / cycle | [LC 287](https://leetcode.com/problems/find-the-duplicate-number/) |
| 29 | Split Array Largest Sum | Hard | Search on answer | [LC 410](https://leetcode.com/problems/split-array-largest-sum/) |
| 30 | Median of Two Sorted Arrays | Hard | Binary search | [LC 4](https://leetcode.com/problems/median-of-two-sorted-arrays/) |

#### [L1] Hash Maps & Sets — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 31 | Top K Frequent Elements | Medium | Bucket sort / heap | [LC 347](https://leetcode.com/problems/top-k-frequent-elements/) |
| 32 | Longest Consecutive Sequence | Medium | Hash set | [LC 128](https://leetcode.com/problems/longest-consecutive-sequence/) |
| 33 | Valid Sudoku | Medium | Hash set per row/col/box | [LC 36](https://leetcode.com/problems/valid-sudoku/) |
| 34 | LRU Cache | Medium | HashMap + doubly linked list | [LC 146](https://leetcode.com/problems/lru-cache/) |
| 35 | Insert Delete GetRandom O(1) | Medium | HashMap + array | [LC 380](https://leetcode.com/problems/insert-delete-getrandom-o1/) |
| 36 | Two Sum II — Input Array Is Sorted | Medium | Two pointers | [LC 167](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) |
| 37 | Isomorphic Strings | Easy | Char mapping | [LC 205](https://leetcode.com/problems/isomorphic-strings/) |
| 38 | Word Pattern | Easy | Bijection check | [LC 290](https://leetcode.com/problems/word-pattern/) |
| 39 | Design HashMap | Easy | Hash function + chaining | [LC 706](https://leetcode.com/problems/design-hashmap/) |
| 40 | First Missing Positive | Hard | Index as hash | [LC 41](https://leetcode.com/problems/first-missing-positive/) |

#### [L2] Trees — 20 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 41 | Invert Binary Tree | Easy | DFS | [LC 226](https://leetcode.com/problems/invert-binary-tree/) |
| 42 | Maximum Depth of Binary Tree | Easy | DFS | [LC 104](https://leetcode.com/problems/maximum-depth-of-binary-tree/) |
| 43 | Diameter of Binary Tree | Easy | DFS | [LC 543](https://leetcode.com/problems/diameter-of-binary-tree/) |
| 44 | Balanced Binary Tree | Easy | DFS | [LC 110](https://leetcode.com/problems/balanced-binary-tree/) |
| 45 | Same Tree | Easy | DFS | [LC 100](https://leetcode.com/problems/same-tree/) |
| 46 | Subtree of Another Tree | Easy | DFS | [LC 572](https://leetcode.com/problems/subtree-of-another-tree/) |
| 47 | Path Sum | Easy | DFS | [LC 112](https://leetcode.com/problems/path-sum/) |
| 48 | Binary Tree Level Order Traversal | Medium | BFS | [LC 102](https://leetcode.com/problems/binary-tree-level-order-traversal/) |
| 49 | Binary Tree Right Side View | Medium | BFS | [LC 199](https://leetcode.com/problems/binary-tree-right-side-view/) |
| 50 | Validate Binary Search Tree | Medium | DFS with bounds | [LC 98](https://leetcode.com/problems/validate-binary-search-tree/) |
| 51 | Kth Smallest Element in a BST | Medium | Inorder | [LC 230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) |
| 52 | Lowest Common Ancestor of BST | Medium | BST property | [LC 235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) |
| 53 | Lowest Common Ancestor of Binary Tree | Medium | DFS | [LC 236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) |
| 54 | Construct Tree from Preorder + Inorder | Medium | Divide & conquer | [LC 105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) |
| 55 | Count Good Nodes in Binary Tree | Medium | DFS with max | [LC 1448](https://leetcode.com/problems/count-good-nodes-in-binary-tree/) |
| 56 | Implement Trie | Medium | Trie | [LC 208](https://leetcode.com/problems/implement-trie-prefix-tree/) |
| 57 | Design Add and Search Words | Medium | Trie + DFS | [LC 211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) |
| 58 | Word Search II | Hard | Trie + backtracking | [LC 212](https://leetcode.com/problems/word-search-ii/) |
| 59 | Binary Tree Maximum Path Sum | Hard | DFS | [LC 124](https://leetcode.com/problems/binary-tree-maximum-path-sum/) |
| 60 | Serialize and Deserialize Binary Tree | Hard | BFS/DFS | [LC 297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) |

#### [L3] Graphs — 20 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 61 | Number of Islands | Medium | BFS/DFS | [LC 200](https://leetcode.com/problems/number-of-islands/) |
| 62 | Max Area of Island | Medium | DFS | [LC 695](https://leetcode.com/problems/max-area-of-island/) |
| 63 | Clone Graph | Medium | BFS + hash map | [LC 133](https://leetcode.com/problems/clone-graph/) |
| 64 | Number of Provinces | Medium | Union-Find / DFS | [LC 547](https://leetcode.com/problems/number-of-provinces/) |
| 65 | Rotting Oranges | Medium | BFS multi-source | [LC 994](https://leetcode.com/problems/rotting-oranges/) |
| 66 | 01 Matrix | Medium | BFS multi-source | [LC 542](https://leetcode.com/problems/01-matrix/) |
| 67 | Surrounded Regions | Medium | DFS from border | [LC 130](https://leetcode.com/problems/surrounded-regions/) |
| 68 | Pacific Atlantic Water Flow | Medium | DFS from edges | [LC 417](https://leetcode.com/problems/pacific-atlantic-water-flow/) |
| 69 | Course Schedule | Medium | Topological sort (cycle detect) | [LC 207](https://leetcode.com/problems/course-schedule/) |
| 70 | Course Schedule II | Medium | Topological sort | [LC 210](https://leetcode.com/problems/course-schedule-ii/) |
| 71 | Redundant Connection | Medium | Union-Find | [LC 684](https://leetcode.com/problems/redundant-connection/) |
| 72 | Accounts Merge | Medium | Union-Find | [LC 721](https://leetcode.com/problems/accounts-merge/) |
| 73 | Is Graph Bipartite? | Medium | BFS coloring | [LC 785](https://leetcode.com/problems/is-graph-bipartite/) |
| 74 | All Paths from Source to Target | Medium | DFS | [LC 797](https://leetcode.com/problems/all-paths-from-source-to-target/) |
| 75 | Keys and Rooms | Medium | DFS/BFS | [LC 841](https://leetcode.com/problems/keys-and-rooms/) |
| 76 | Find if Path Exists in Graph | Easy | BFS/Union-Find | [LC 1971](https://leetcode.com/problems/find-if-path-exists-in-graph/) |
| 77 | Network Delay Time | Medium | Dijkstra | [LC 743](https://leetcode.com/problems/network-delay-time/) |
| 78 | Cheapest Flights Within K Stops | Medium | Bellman-Ford / BFS | [LC 787](https://leetcode.com/problems/cheapest-flights-within-k-stops/) |
| 79 | Minimum Height Trees | Medium | Topological sort | [LC 310](https://leetcode.com/problems/minimum-height-trees/) |
| 80 | Word Ladder | Hard | BFS shortest path | [LC 127](https://leetcode.com/problems/word-ladder/) |

#### [L2] Heaps / Priority Queues — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 81 | Last Stone Weight | Easy | Max heap | [LC 1046](https://leetcode.com/problems/last-stone-weight/) |
| 82 | Kth Largest Element in an Array | Medium | Min heap | [LC 215](https://leetcode.com/problems/kth-largest-element-in-an-array/) |
| 83 | K Closest Points to Origin | Medium | Max heap | [LC 973](https://leetcode.com/problems/k-closest-points-to-origin/) |
| 84 | Top K Frequent Words | Medium | Heap + freq count | [LC 692](https://leetcode.com/problems/top-k-frequent-words/) |
| 85 | Task Scheduler | Medium | Greedy + heap | [LC 621](https://leetcode.com/problems/task-scheduler/) |
| 86 | Reorganize String | Medium | Max heap | [LC 767](https://leetcode.com/problems/reorganize-string/) |
| 87 | Design Twitter | Medium | Heap + hash map | [LC 355](https://leetcode.com/problems/design-twitter/) |
| 88 | IPO | Hard | Two heaps | [LC 502](https://leetcode.com/problems/ipo/) |
| 89 | Find Median from Data Stream | Hard | Two heaps | [LC 295](https://leetcode.com/problems/find-median-from-data-stream/) |
| 90 | Merge K Sorted Lists | Hard | Heap | [LC 23](https://leetcode.com/problems/merge-k-sorted-lists/) |

#### [L2] Stack & Monotonic Stack — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 91 | Valid Parentheses | Easy | Stack | [LC 20](https://leetcode.com/problems/valid-parentheses/) |
| 92 | Next Greater Element I | Easy | Monotonic stack | [LC 496](https://leetcode.com/problems/next-greater-element-i/) |
| 93 | Min Stack | Medium | Stack with min tracking | [LC 155](https://leetcode.com/problems/min-stack/) |
| 94 | Evaluate Reverse Polish Notation | Medium | Stack | [LC 150](https://leetcode.com/problems/evaluate-reverse-polish-notation/) |
| 95 | Generate Parentheses | Medium | Backtracking/stack | [LC 22](https://leetcode.com/problems/generate-parentheses/) |
| 96 | Daily Temperatures | Medium | Monotonic stack | [LC 739](https://leetcode.com/problems/daily-temperatures/) |
| 97 | Online Stock Span | Medium | Monotonic stack | [LC 901](https://leetcode.com/problems/online-stock-span/) |
| 98 | Car Fleet | Medium | Monotonic stack | [LC 853](https://leetcode.com/problems/car-fleet/) |
| 99 | Remove K Digits | Medium | Greedy + monotonic stack | [LC 402](https://leetcode.com/problems/remove-k-digits/) |
| 100 | Largest Rectangle in Histogram | Hard | Monotonic stack | [LC 84](https://leetcode.com/problems/largest-rectangle-in-histogram/) |

#### [L1] Linked Lists — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 101 | Reverse Linked List | Easy | Iterative/recursive | [LC 206](https://leetcode.com/problems/reverse-linked-list/) |
| 102 | Merge Two Sorted Lists | Easy | Two pointers | [LC 21](https://leetcode.com/problems/merge-two-sorted-lists/) |
| 103 | Linked List Cycle | Easy | Fast/slow pointers | [LC 141](https://leetcode.com/problems/linked-list-cycle/) |
| 104 | Palindrome Linked List | Easy | Fast/slow + reverse | [LC 234](https://leetcode.com/problems/palindrome-linked-list/) |
| 105 | Intersection of Two Linked Lists | Easy | Two pointers | [LC 160](https://leetcode.com/problems/intersection-of-two-linked-lists/) |
| 106 | Remove Nth Node From End of List | Medium | Fast/slow pointers | [LC 19](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) |
| 107 | Reorder List | Medium | Fast/slow + reverse + merge | [LC 143](https://leetcode.com/problems/reorder-list/) |
| 108 | Add Two Numbers | Medium | Carry simulation | [LC 2](https://leetcode.com/problems/add-two-numbers/) |
| 109 | Copy List with Random Pointer | Medium | Hash map | [LC 138](https://leetcode.com/problems/copy-list-with-random-pointer/) |
| 110 | Reverse Linked List II | Medium | Iterative | [LC 92](https://leetcode.com/problems/reverse-linked-list-ii/) |

#### [L3] Dynamic Programming — 20 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 111 | Climbing Stairs | Easy | 1D DP | [LC 70](https://leetcode.com/problems/climbing-stairs/) |
| 112 | House Robber | Medium | 1D DP | [LC 198](https://leetcode.com/problems/house-robber/) |
| 113 | House Robber II | Medium | 1D DP circular | [LC 213](https://leetcode.com/problems/house-robber-ii/) |
| 114 | Longest Palindromic Substring | Medium | 2D DP / expand | [LC 5](https://leetcode.com/problems/longest-palindromic-substring/) |
| 115 | Palindromic Substrings | Medium | 2D DP / expand | [LC 647](https://leetcode.com/problems/palindromic-substrings/) |
| 116 | Decode Ways | Medium | 1D DP | [LC 91](https://leetcode.com/problems/decode-ways/) |
| 117 | Coin Change | Medium | Unbounded knapsack | [LC 322](https://leetcode.com/problems/coin-change/) |
| 118 | Coin Change II | Medium | Unbounded knapsack | [LC 518](https://leetcode.com/problems/coin-change-ii/) |
| 119 | Word Break | Medium | 1D DP | [LC 139](https://leetcode.com/problems/word-break/) |
| 120 | Longest Increasing Subsequence | Medium | DP / binary search | [LC 300](https://leetcode.com/problems/longest-increasing-subsequence/) |
| 121 | Longest Common Subsequence | Medium | 2D DP | [LC 1143](https://leetcode.com/problems/longest-common-subsequence/) |
| 122 | Unique Paths | Medium | 2D DP | [LC 62](https://leetcode.com/problems/unique-paths/) |
| 123 | Jump Game | Medium | Greedy / DP | [LC 55](https://leetcode.com/problems/jump-game/) |
| 124 | Jump Game II | Medium | Greedy | [LC 45](https://leetcode.com/problems/jump-game-ii/) |
| 125 | Target Sum | Medium | 0/1 knapsack | [LC 494](https://leetcode.com/problems/target-sum/) |
| 126 | Partition Equal Subset Sum | Medium | 0/1 knapsack | [LC 416](https://leetcode.com/problems/partition-equal-subset-sum/) |
| 127 | Best Time to Buy and Sell Stock with Cooldown | Medium | State machine DP | [LC 309](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) |
| 128 | Interleaving String | Medium | 2D DP | [LC 97](https://leetcode.com/problems/interleaving-string/) |
| 129 | Edit Distance | Medium | 2D DP | [LC 72](https://leetcode.com/problems/edit-distance/) |
| 130 | Regular Expression Matching | Hard | 2D DP | [LC 10](https://leetcode.com/problems/regular-expression-matching/) |

#### [L3] Backtracking — 10 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 131 | Subsets | Medium | Backtracking | [LC 78](https://leetcode.com/problems/subsets/) |
| 132 | Subsets II (with duplicates) | Medium | Backtracking + sort | [LC 90](https://leetcode.com/problems/subsets-ii/) |
| 133 | Permutations | Medium | Backtracking | [LC 46](https://leetcode.com/problems/permutations/) |
| 134 | Combination Sum | Medium | Backtracking | [LC 39](https://leetcode.com/problems/combination-sum/) |
| 135 | Combination Sum II | Medium | Backtracking + sort | [LC 40](https://leetcode.com/problems/combination-sum-ii/) |
| 136 | Letter Combinations of a Phone Number | Medium | Backtracking | [LC 17](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) |
| 137 | Word Search | Medium | Backtracking + DFS | [LC 79](https://leetcode.com/problems/word-search/) |
| 138 | Palindrome Partitioning | Medium | Backtracking + DP | [LC 131](https://leetcode.com/problems/palindrome-partitioning/) |
| 139 | Restore IP Addresses | Medium | Backtracking | [LC 93](https://leetcode.com/problems/restore-ip-addresses/) |
| 140 | N-Queens | Hard | Backtracking | [LC 51](https://leetcode.com/problems/n-queens/) |

#### [L2] Intervals — 5 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 141 | Merge Intervals | Medium | Sort + greedy | [LC 56](https://leetcode.com/problems/merge-intervals/) |
| 142 | Insert Interval | Medium | Linear scan | [LC 57](https://leetcode.com/problems/insert-interval/) |
| 143 | Non-overlapping Intervals | Medium | Sort + greedy | [LC 435](https://leetcode.com/problems/non-overlapping-intervals/) |
| 144 | Minimum Number of Arrows to Burst Balloons | Medium | Sort + greedy | [LC 452](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/) |
| 145 | Interval List Intersections | Medium | Two pointers | [LC 986](https://leetcode.com/problems/interval-list-intersections/) |

#### [L1] Math & Bit Manipulation — 5 problems

| # | Problem | Difficulty | Pattern | Link |
|---|---------|------------|---------|------|
| 146 | Number of 1 Bits | Easy | Bit manipulation | [LC 191](https://leetcode.com/problems/number-of-1-bits/) |
| 147 | Counting Bits | Easy | DP + bits | [LC 338](https://leetcode.com/problems/counting-bits/) |
| 148 | Reverse Bits | Easy | Bit manipulation | [LC 190](https://leetcode.com/problems/reverse-bits/) |
| 149 | Missing Number | Easy | XOR / math | [LC 268](https://leetcode.com/problems/missing-number/) |
| 150 | Sum of Two Integers (no + operator) | Medium | Bit manipulation | [LC 371](https://leetcode.com/problems/sum-of-two-integers/) |

**Concurrency (bonus for SRE):** Producer-Consumer, Dining Philosophers, Print in Order ([LC 1114](https://leetcode.com/problems/print-in-order/)), Print FooBar Alternately ([LC 1115](https://leetcode.com/problems/print-foobar-alternately/))

---

### 0G. Interview Prep Schedule

| Weeks | Focus |
|-------|-------|
| 1–2 | Delivery framework + Easy problems (Bitly, Dropbox) |
| 3–4 | Core concepts (caching, sharding, CAP) + DSA arrays/strings/hashmaps |
| 5–8 | Medium system design (2/week) + DSA trees/graphs/binary search |
| 9–12 | Hard system design + Behavioral story bank (write all 8 stories) |
| 13–16 | Mock interviews (hellointerview.com) + LLD basics |
| 17–20 | Company-specific prep (Grab, Shopee, ByteDance) + full mock loops |
| 21–24 | Live interviews + 1 LeetCode/day maintenance |

---

## <a id="part-sre"></a>Part SRE — Dedicated SRE Learning Track (Beginner → Advanced)

> **Sources:** *Enterprise Roadmap to SRE* (Brookbank & McGhee, O'Reilly 2022) · [roadmap.sh/devops](https://roadmap.sh/devops) · [Google SRE canon](https://sre.google/books/) · 12–24 month synthesis
>
> **Commitment:** 300–500 focused hours, runs in parallel with Part 0 + Part B over the 6-month window — the parts overlap heavily, so don't double-count time. Stages 1–5 are the load-bearing months; Stages 6–8 continue past job start.
>
> **"Class SRE implements interface DevOps."** DevOps is *what good looks like*; SRE is the prescriptive *how* — SLOs, error budgets, blameless postmortems, toil budgets, PRRs.

### Three mindsets to internalize before you start
1. **100% reliability is the wrong target.** Pick what users actually need, then defend it. Each "nine" costs ~10× the previous one.
2. **Reliability is a product feature.** It competes with feature work for resources — that's healthy. If your PM isn't in the SLO conversation, the SLO is wrong.
3. **Evolution, not revolution.** Expect a **J-curve**: things get harder before they get better as hidden risk/toil surfaces. Communicate this *up front* or leadership pulls the plug at the bottom of the curve.

---

### Level 1 — Foundations (Stages 0–2)

> **Beginner tier.** Goal: solid Linux/networking baseline plus the SRE mental model (SLOs, error budgets, toil, postmortems). No prior SRE experience required. ~6–10 weeks at 15 hrs/wk.

#### Stage 0 — Prerequisites (confirm before you start)

| Have | Brush up if rusty |
|------|-------------------|
| Go or Python at intermediate level | Concurrency: threads vs processes, async/await, locks, race conditions |
| Git workflow (branches, rebase, PRs, conflict resolution) | Shell beyond `cd`/`ls` — pipes, redirection, exit codes, `xargs` |
| HTTP, REST, JSON, SQL basics | Reading both a statically + dynamically typed language |
| OOP, arrays/maps/queues/trees/hashtables, big-O intuition | The habit of reading other people's code |

**Milestone:** Write a ~200-line CLI in Go or Python — takes structured input (CSV/JSON), transforms it, produces output with proper exit codes, logging, error handling. Seed of every SRE automation script.

**KodeKloud (if gaps):**
- [DevOps Pre-Requisite Course](https://kodekloud.com/courses/devops-pre-requisite-course) — single sweep over Linux CLI, networking, Git, apps, SSL, YAML/JSON
- [Programming Fundamentals](https://kodekloud.com/courses/programming-fundamentals) — only if you've never programmed; skip otherwise

**Time:** 1–2 weeks of evening review *only if needed*.

---

#### Stage 1 — Foundations: Linux, Networking, Scripting, Git Deepening

> **Why it matters:** Almost every production incident eventually touches Linux, a TCP socket, or a misconfigured Git/CI artifact. Google SRE phone screens famously *will not let you past* this — it is the new ground floor.

**Key topics**
- **Linux internals:** processes, threads, file descriptors, signals, cgroups, namespaces, systemd, `/proc`, syscalls, page cache, OOM killer
- **Debugging toolkit:** `top`/`htop`, `ps`, `lsof`, `strace`, `tcpdump`, `ss`, `iostat`, `vmstat`, `dmesg`, `journalctl`, `perf`, `bpftrace` (intro)
- **Networking:** OSI vs TCP/IP, DNS resolution path, HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC), TLS handshake, L4 vs L7 load balancers, NAT, CIDR, BGP basics, retries/timeouts/backoff
- **Shell:** robust bash (`set -euo pipefail`, traps) — but prefer Python/Go for non-trivial scripts
- **Git deepening:** `reflog`, `bisect`, `cherry-pick`, signed commits, trunk-based development

**Resources** *(sorted: beginner books → hands-on → networking → advanced)*

| Resource | Type | Where |
|----------|------|-------|
| *The Linux Command Line* — Shotts | Book (free PDF) | [linuxcommand.org](https://linuxcommand.org) |
| OverTheWire — Bandit / Natas | Wargame | [overthewire.org](https://overthewire.org) |
| *How Linux Works* (3rd ed.) — Ward | Book | No Starch Press |
| *Computer Networking: A Top-Down Approach* — Kurose & Ross | Book | Chapters 1, 2, 3, 5, 6 |
| *Beej's Guide to Network Programming* | Free online | [beej.us/guide/bgnet](https://beej.us/guide/bgnet/) |
| Networking Concepts Every DevOps Engineer Must Know | Video (free) | [YouTube](https://www.youtube.com/watch?v=w0SQGCt-6Ro) |
| *Systems Performance* (2nd ed.) — Brendan Gregg | Book + blog (advanced) | [brendangregg.com](https://www.brendangregg.com) |

**KodeKloud (lab-first complement to the books)**

| Course | Use for |
|--------|---------|
| [Learning Linux Basics Course & Labs](https://kodekloud.com/courses/the-linux-basics-course) | Shell, filesystem, package mgmt, services, perms — browser labs after every lecture |
| [Shell Scripts for Beginners](https://kodekloud.com/courses/shell-scripts-for-beginners/) | First-pass bash if you've never written a script |
| [Advanced Bash Scripting](https://kodekloud.com/courses/advanced-bash-scripting/) | `awk`/`sed`, streams, arrays, `set -euo pipefail` patterns |
| [GIT for Beginners](https://kodekloud.com/courses/git-for-beginners) | Branching, rebase, cherry-pick, internals — instructor: Lydia Hallie |
| [Networks and Communications](https://kodekloud.com/courses/networks-and-communications) | TCP/IP, DNS, routing, ping/traceroute fundamentals |
| [RHCSA Prep Course](https://kodekloud.com/courses/red-hat-certified-system-administrator-rhcsa) | Optional cert path; deepens systemd, SELinux, storage |
| [Python Basics](https://kodekloud.com/courses/python-basics) / [Golang Course](https://kodekloud.com/courses/golang/) | Pick your SRE scripting language and finish one |

**Hands-on milestones**
- Provision a bare Linux VM (Hetzner, DigitalOcean, or a Raspberry Pi). Harden SSH, set up `ufw`, install nginx, serve a static site via a custom systemd unit, set up log rotation, write a bash + Python script that reports CPU/mem/disk and alerts via webhook
- Use `tcpdump` and `ss` to follow a single HTTPS request from client to server. Write up what you saw at each layer

**Time:** 4–6 weeks.

---

#### Stage 2 — Core SRE Principles: SLIs, SLOs, Error Budgets, Toil, Postmortems

> **Why it matters:** Tools change every two years; principles don't. This is the conceptual spine. Without it, you are a DevOps tool operator, not an SRE.

**Key topics**
- **Four Golden Signals:** latency, traffic, errors, saturation
- **SLI / SLO / SLA distinction** — frequent interview gotcha. SLA is *contractual external*; SLO is *internal target*; SLI is *measurement*. Setting SLO = SLA gives you zero headroom.
- **Error budgets** as the policy mechanism linking reliability and feature velocity
- **Error budget policy** (an actual document): when does feature work freeze? Who declares? Who can override?
- **Toil:** manual, repetitive, automatable, tactical, no enduring value, scales linearly. Google's cap: **<50% of an SRE's time**
- **Blameless postmortem culture** — separate actions from people; focus on systemic contributing causes
- **Embracing risk** — pick the *right* reliability target, not the highest
- **Release engineering** — hermetic builds, canarying, progressive rollouts

**From the Enterprise SRE report**
- **Ulysses pact:** commit to error budget policy *before* the incident, when you're calm — under deadline pressure, the predefined action takes over. One of the most underrated cultural tools in SRE.
- **Plan-Do-Check-Act:** SLO setting is iterative; v1 will be wrong, and that's fine
- **Sublinear scaling:** SRE headcount should grow *more slowly* than the systems supported. If you hire an SRE per new service, you've built ops, not SRE.
- **J-curve of transformation:** automation increases test requirements → tech debt blocks progress → relentless improvement → elite performance. Brief leadership before the curve starts.

**Resources** *(sorted: structured course → hands-on → canon → applied → talks)*

| Resource | Why |
|----------|-----|
| [KodeKloud — Fundamentals of SRE](https://kodekloud.com/courses/fundamentals-of-sre) | Hands-on labs for SLI/SLO, error budgets, incidents, release eng, observability, chaos. **Start here.** |
| [KodeKloud — SRE Learning Path](https://kodekloud.com/learning-path/site-reliability-engineer) | Curated multi-course sequence — use as the road map, not as a checklist |
| [Coursera SRE & DevOps Specialization (Google)](https://www.coursera.org/specializations/sre-devops) | Paced, structured exposure |
| [*Site Reliability Engineering*](https://sre.google/sre-book/) — Google (2016) | Ch 1–6 mandatory; Ch 4 (SLOs) is the single highest-leverage chapter |
| [*The Site Reliability Workbook*](https://sre.google/workbook/) — Google (2018) | "Implementing SLOs", "Alerting on SLOs", "Eliminating Toil" |
| [*Enterprise Roadmap to SRE*](https://sre.google/resources/practices-and-processes/enterprise-roadmap-to-sre/) — Brookbank & McGhee (2022) | Free download; J-curve, Ulysses pact, sublinear scaling, platform of capabilities |
| Liz Fong-Jones SREcon talks | YouTube/USENIX — SLOs & error budgets |

**Hands-on milestones**
- Write a full **SLO document** + **Error Budget Policy** for a service you can touch (or a side project): SLI spec, measurement method, target, time window, exclusions, freeze policy. The act of writing it is transformative.
- Write a fictional blameless postmortem for a publicly-known incident (GitHub, AWS, Cloudflare). Use the Workbook's appendix template.

**Time:** 3–4 weeks of reading + writing.

---

### Level 2 — Core SRE Skills (Stages 3–5)

> **Working SRE tier.** Goal: ship and operate cloud-native services with full observability. This is where you become hireable as an SRE in APAC. ~12–16 weeks.

#### Stage 3 — Infrastructure & Cloud: Providers, IaC, Containers

> **Why it matters:** SREs don't click in consoles. Production infrastructure must be code: versioned, reviewable, reproducible.

**Key topics**
- **One cloud, deeply** (AWS for APAC region — Singapore, Tokyo, Mumbai, Jakarta all have AWS strong presence): EC2, S3, IAM, VPC, RDS, EKS, ALB/NLB, Route53
- **Infrastructure as Code:** Terraform (or OpenTofu) — modules, remote state, plan/apply discipline, drift detection
- **Configuration management:** Ansible for VM/server config (Pulumi and AWS CDK as alternatives)
- **Containers:** Docker / Podman — images, layers, OCI spec, multi-stage builds, slim images, container security (non-root, read-only FS, capabilities)
- **Secrets:** never in Git; Vault, SOPS, cloud KMS, External Secrets Operator

**Resources** *(sorted: official tutorials → cloud labs → books → reference)*

| Resource | Type |
|----------|------|
| [Terraform "Get Started"](https://developer.hashicorp.com/terraform/tutorials) | Official tutorials. **Start here.** |
| AWS Skill Builder (free tier) / GCP Skills Boost | Labs, not just videos |
| *Docker Deep Dive* — Nigel Poulton | Book — containers first |
| *Terraform: Up & Running* (3rd ed.) — Brikman | O'Reilly book — IaC depth |
| [CNCF Cloud Native Glossary](https://glossary.cncf.io) | Bookmark for vocab |

**KodeKloud (hands-on labs)**

| Course | Use for |
|--------|---------|
| [AWS Solutions Architect Associate (SAA-C03)](https://kodekloud.com/courses/aws-saa) | EC2/S3/IAM/VPC/RDS depth with browser labs in real AWS — pairs with Stephane Maarek's Udemy course |
| [AWS Networking Fundamentals](https://kodekloud.com/courses/aws-networking-fundamentals) | VPCs, subnets, peering, Transit Gateway, CloudFront, Global Accelerator |
| [Terraform Basics Training](https://kodekloud.com/courses/terraform-for-beginners) | HCL, providers, state, modules — the prerequisite to the cert course |
| [HashiCorp Certified: Terraform Associate 004](https://kodekloud.com/courses/hashicorp-certified-terraform-associate-004) | Cert prep — updated for Terraform 1.12 + HCP Terraform |
| [OpenTofu — Beginner's Guide](https://kodekloud.com/courses/opentofu-a-beginners-guide-to-a-terraform-fork-including-migration-from-terraform/) | Know the fork; migration matters in some APAC orgs |
| [Ansible Basics](https://kodekloud.com/courses/ansible-for-the-absolute-beginners-course) → [Ansible Advanced](https://kodekloud.com/courses/ansible-advanced-course) | Inventory, playbooks, roles, vault, dynamic inventory, AWS/GCP modules |
| [Docker Training for the Absolute Beginner](https://kodekloud.com/courses/docker-for-the-absolute-beginner) | Images, layers, Compose, Dockerfile practice in browser labs |

**Hands-on milestones**
- Build a **three-tier reference architecture** (web → app → DB) entirely in Terraform, one cloud, remote state, modules, staging + prod via workspaces or split state
- Containerize a small app — Dockerfile under 100 MB, runs as non-root, passes `trivy` or `grype` scanning

**Time:** 6–8 weeks. *(Overlaps heavily with Part B Phase 1, 5, 6.)*

---

#### Stage 4 — Orchestration & Deployment: Kubernetes, CI/CD, GitOps

> **Why it matters:** 93% of orgs (CNCF Annual Survey) run or evaluate Kubernetes in prod. SREs own clusters, pipelines, and the connection between them.

**Key topics**
- **K8s fundamentals:** Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, StatefulSets, DaemonSets, Jobs/CronJobs, Namespaces, RBAC, ServiceAccounts
- **K8s ops:** control plane (API server, etcd, scheduler, controller manager), node lifecycle, probes (liveness/readiness/startup), PodDisruptionBudgets, HPA, resource requests/limits, troubleshooting (`kubectl describe` / `logs` / `exec` / `events`)
- **Helm & Kustomize** for templating
- **CI/CD:** GitHub Actions, GitLab CI, Jenkins/Tekton — build → test → scan → publish → deploy as pipeline-as-code
- **GitOps:** ArgoCD or Flux — desired state in Git, cluster reconciles toward it
- **Release engineering:** blue/green, canary, feature flags, rollback strategy, schema migrations, deploy ≠ release
- **Progressive delivery tools:** Argo Rollouts, Flagger, LaunchDarkly / OpenFeature

**Resources** *(sorted: official tutorials → book → GitOps → release theory)*

| Resource | Type |
|----------|------|
| [kubernetes.io Tutorials](https://kubernetes.io/docs/tutorials/) | Start with "Kubernetes Basics". **Start here.** |
| *Kubernetes Up & Running* (3rd ed.) — Burns/Beda/Hightower/Villalba | O'Reilly book |
| [ArgoCD docs](https://argo-cd.readthedocs.io) + [OpenGitOps Principles](https://opengitops.dev) | Free — GitOps depth |
| *Continuous Delivery* — Humble & Farley | Canonical text on release patterns (advanced) |

**KodeKloud (the densest CKA-prep ecosystem online — Mumshad's courses)**

| Course | Use for |
|--------|---------|
| [Kubernetes for the Absolute Beginners — Hands-on](https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on) | Start here if K8s is new |
| [KCNA — Kubernetes & Cloud-native Associate](https://kodekloud.com/courses/kubernetes-and-cloud-native-associate-kcna) | Optional MCQ-format entry cert; good vocab sweep |
| [CKA — Certified Kubernetes Administrator](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/) | THE K8s cert prep; refreshed quarterly; CNCF-endorsed |
| [CKAD — Application Developer](https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad) | Pairs well with CKA for SREs who own services |
| [Helm for Beginners](https://kodekloud.com/courses/helm-for-beginners/) | Charts, templates, releases, dependencies |
| [GitHub Actions](https://kodekloud.com/courses/github-actions) | Reusable workflows, custom actions, self-hosted runners |
| [Jenkins](https://kodekloud.com/courses/jenkins) → [Certified Jenkins Engineer](https://kodekloud.com/courses/certified-jenkins-engineer) | Only if your APAC target uses Jenkins (still common at GovTech/Agoda) |
| [GitOps with ArgoCD](https://kodekloud.com/courses/argocd) | Sealed secrets, Vault, ArgoCD + Jenkins pattern |
| [GitOps Certified Associate (CGOA)](https://kodekloud.com/courses/gitops-certified-associate-cgoa) | New CNCF cert — optional, signals depth |

**Hands-on milestones**
- Deploy the Stage 3 app on **kind**/**minikube** with a full Helm chart, then on managed EKS/GKE provisioned by your Terraform
- Wire a GitHub Actions pipeline: build, test, scan, push, trigger ArgoCD sync. Demonstrate a canary release with **automated rollback** when error rate exceeds threshold

**Time:** 8–12 weeks. The densest technical stage. *(Overlaps with Part B Phase 2, 7.)*

---

#### Stage 5 — Observability & Monitoring

> **Why it matters:** You cannot defend an SLO you cannot measure. Observability is the *enabling layer* for every principle in Stage 2.

**Key topics**
- **Three signals:** metrics, logs, traces (and emerging: continuous profiling). Know each one's strengths.
- **Open-source stack:** Prometheus + PromQL, Grafana, Loki (logs), Tempo or Jaeger (traces), Alertmanager, Mimir/Thanos/VictoriaMetrics (long-term Prometheus)
- **OpenTelemetry (OTel):** CNCF vendor-neutral standard. OTel Metrics is GA as of 2025. Learn the Collector pattern (receivers → processors → exporters) — the universal adapter.
- **Commercial alternatives** to know: Datadog, New Relic, Honeycomb, Splunk, Dynatrace
- **eBPF observability:** Cilium, Pixie, Beyla, Parca — increasingly important for zero-instrumentation
- **Alerting that doesn't suck:** alert on *symptoms* (SLO burn rate), not *causes*. Multi-window, multi-burn-rate (SRE Workbook Ch 5) is best practice.
- **Dashboards as docs:** RED (Rate/Errors/Duration) for request-driven, USE (Utilization/Saturation/Errors) for resources

**Resources** *(sorted: free tutorials → primers → books → reference)*

| Resource | Type |
|----------|------|
| [Grafana Tutorials](https://grafana.com/tutorials/) | Free — get hands-on first. **Start here.** |
| *Distributed Systems Observability* — Sridharan | Free O'Reilly report — the concepts primer |
| SRE Workbook Ch 4 (Monitoring) + Ch 5 (Alerting on SLOs) | Free — alerting theory |
| [opentelemetry.io](https://opentelemetry.io) + CNCF Observability TAG | Free docs — OTel reference |
| *Prometheus: Up & Running* (2nd ed.) — Brazil | Book — Prometheus depth |
| *Observability Engineering* — Majors/Fong-Jones/Miranda | O'Reilly book — full conceptual depth |

**KodeKloud (cert-aligned labs)**

| Course | Use for |
|--------|---------|
| [Prometheus Certified Associate (PCA)](https://kodekloud.com/courses/prometheus-certified-associate-pca) | Install/configure/operate Prometheus, PromQL, exporters, Alertmanager, K8s monitoring |
| [OpenTelemetry Certified Associate (OTCA)](https://kodekloud.com/courses/prep-course-opentelemetry-certified-associate-certification-otca) | Instrument apps, run the OTel Collector in K8s, end-to-end pipelines |
| [AIOps Foundations — Prometheus & Grafana](https://kodekloud.com/courses/aiops-foundations-intelligent-monitoring-with-prometheus-grafana) | Anomaly detection + forecasting layered on Prom/Grafana |
| [AIOps in Practice — Logging & Alerting at Scale](https://kodekloud.com/courses/aiops-in-practice-logging-alerting-at-scale) | Grafana Loki + Alloy + Prometheus alerting pipeline |
| [Advanced AIOps — Distributed Tracing & RCA](https://kodekloud.com/courses/learn-by-doing-advanced-aiops-distributed-tracing-and-rca-curriculum) | OTel + Jaeger trace-driven RCA practice |

**Hands-on milestones**
- Instrument the Stage 4 app end-to-end with **OpenTelemetry SDKs**. Metrics → Prometheus, logs → Loki, traces → Tempo, unified in Grafana. One dashboard answers "Is the service healthy?" in under 10 seconds.
- Convert your Stage 2 SLO into a **working multi-window, multi-burn-rate alert** and demonstrate it firing in a load-test scenario.

**Time:** 4–6 weeks. *(Overlaps with Part B Phase 3, 4.)*

---

#### Stage 5.5 — CDN, API Gateway & HTTP Caching

> **Why it matters:** Most APAC platforms put a CDN edge cache (Fastly / CloudFront / Cloudflare) and an API gateway (Kong / AWS API Gateway / Apigee) in front of every service. Whoever owns the edge owns the SLOs for everyone behind it — and at this team's stack that means **Fastly + Kong**. Varnish is intentionally skipped (legacy on-prem cache; Fastly is its modern hosted successor and already covers the same VCL surface). HAProxy is included here as the L4/L7 load balancer that often sits at the same tier. *L7 reverse proxies (NGINX / Envoy) live in their own stage — see Stage 5.6.*

**Key topics**
- **API gateway responsibilities:** routing, authn/authz, rate-limiting, request/response transforms, plugin model, JWT/OAuth/mTLS termination, observability hooks
- **Kong architecture:** data plane vs control plane, DB-less vs Postgres mode, declarative config (`decK`), Kong Ingress Controller for K8s, plugins (rate-limiting, key-auth, JWT, request-transformer, prometheus, opentelemetry)
- **HAProxy as L4 + L7 LB:** `frontend`/`backend`/`listen` blocks, ACLs, stick tables, slow-start, connection draining, `option httpchk`, `option redispatch`, runtime API + dynamic config reloads, Prometheus exporter
- **Fastly / edge CDN:** VCL basics, surrogate keys, instant purge, stale-while-revalidate, shielding, Compute@Edge (WASM)
- **HTTP caching semantics:** `Cache-Control`, `ETag` / `If-None-Match`, `Last-Modified`, `Vary`, `s-maxage`, `stale-while-revalidate`, `stale-if-error`
- **Operational gotchas:** cache stampede / dogpile, thundering herd, cache poisoning via missing `Vary`, key normalization, p99 spikes from upstream retries, hot-key invalidation

**Resources — CDN, API Gateway & HTTP Caching (Fastly / Kong / HAProxy)**

> Two halves of the same edge story: **Fastly** owns the global CDN + VCL at POPs; **Kong** owns the K8s ingress + API gateway behind it. Same SRE rotation owns both — learn them together. Varnish itself is intentionally skipped (legacy on-prem); Fastly's hosted VCL is the modern path.

*Fastly / VCL — global CDN edge* *(sorted: learn-first → reference → war-stories)*

| Resource | Type |
|----------|------|
| [Fastly Learning Center](https://www.fastly.com/learning) | Concept primers — CDN, caching, edge compute. **Start here.** |
| [Fastly Documentation hub](https://www.fastly.com/documentation/) | The whole Fastly knowledge tree — read "Concepts" first, then "VCL" |
| [Fastly Fiddle — in-browser VCL + Compute@Edge playground](https://fiddle.fastly.dev) | The fastest way to *actually try* edge logic — no account needed. Share fiddles via URL |
| [Fastly — official YouTube channel](https://www.youtube.com/@FastlyInc) | "Fastly Altitude" conference recordings — production CDN stories |
| [Fastly VCL reference](https://www.fastly.com/documentation/reference/vcl/) | Authoritative VCL surface (same syntax Varnish uses — the only piece of Varnish worth keeping) |
| [Fastly Developer Hub](https://www.fastly.com/documentation/developers/) | Developer-focused docs — APIs, Terraform provider, CLI, language SDKs |
| [Fastly GitHub organization](https://github.com/fastly) | Production-grade VCL recipes, Compute starter kits (Rust / Go / JS / AssemblyScript), `fastly-go` / `fastly-py` SDKs |
| [Fastly Help Center](https://support.fastly.com/) | Searchable knowledge base + community Q&A — gold for "why is my cache MISSing?" debugging |
| [Fastly Engineering Blog](https://www.fastly.com/blog/) | Outage postmortems + cache engineering posts |
| [Fastly status & past incidents](https://www.fastlystatus.com) | Real production CDN postmortems — read these alongside your own incidents |

*Kong — K8s ingress + API gateway* *(sorted: learn-first → reference → architecture deep-reads)*

| Resource | Type |
|----------|------|
| [Kong Docs — Get Started with Kong Gateway](https://docs.konghq.com/gateway/latest/get-started/) | Official tutorial. **Start here.** |
| [Hussein Nasser — Kong API Gateway course (Udemy)](https://www.udemy.com/course/kong-api-gateway/) | Hands-on course — the canonical Kong walkthrough for backend/SRE folks |
| [Kong Education portal — courses & certs (Kong Gateway Operator, KCNA-style)](https://education.konghq.com) | Official training (free + paid certs) |
| [Hussein Nasser — YouTube channel (Kong / API Gateway / NGINX deep dives)](https://www.youtube.com/@hnasr) | Free, dense, protocol-level |
| [Kong Inc. — official YouTube channel](https://www.youtube.com/@KongInc) | Webinars, "Kong Summit" recordings, plugin walkthroughs |
| [Kong Ingress Controller docs](https://docs.konghq.com/kubernetes-ingress-controller/latest/) | K8s ingress with Kong CRDs — read once you're comfortable with vanilla Kong |
| [Kong Learning Center — whitepapers & "Mastering Kong" eBooks](https://konghq.com/learning-center) | Free PDFs; the architecture eBook is the best one-sit overview |

**Resources — HAProxy (L4/L7 load balancer)** *(sorted: learn-first → reference → production patterns)*

| Resource | Type |
|----------|------|
| [KodeKloud — HAProxy for Beginners](https://kodekloud.com/courses/haproxy-for-beginners/) | Browser-lab format; mirrors the NGINX-for-Beginners track. **Start here.** |
| [Hussein Nasser — HAProxy Crash Course (TLS 1.3, HTTPS, HTTP/2)](https://www.youtube.com/watch?v=qYnA2DFEELw&list=PLQnljOFTspQUhgfvpgfxc-uFlWElKIBr-) | Full crash-course playlist — install, config anatomy, TLS termination, HTTP/2, modes. Watch right after KodeKloud |
| [HAProxy Starter Guide](https://www.haproxy.com/documentation/haproxy-configuration-tutorials/starter-guide/) | The official first-read — covers `frontend`/`backend`, health checks, TLS termination |
| [Hussein Nasser — HAProxy videos (YouTube)](https://www.youtube.com/@hnasr) | Protocol-level walkthroughs — L4 vs L7, TLS pass-through vs termination |
| [HAProxy — official YouTube channel](https://www.youtube.com/@haproxytech) | "HAProxyConf" recordings + feature deep dives |
| [*Load Balancing with HAProxy* — Nick Ramirez (free eBook from HAProxy)](https://www.haproxy.com/resources/ebooks) | Short, focused; the canonical one-sit overview |
| [HAProxy official docs (configuration manual)](https://docs.haproxy.org/) | Authoritative reference — directives, ACLs, stick tables, runtime API |
| [HAProxy Technologies blog](https://www.haproxy.com/blog) | Production patterns: zero-downtime reloads, Prometheus integration, rate-limiting via stick tables |

**Resources — HTTP caching theory (cross-cutting)** *(sorted: learn-first → tutorials → book/spec)*

| Resource | Type |
|----------|------|
| [MDN — HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching) | Quick reference for `Cache-Control` semantics. **Start here.** |
| [Cloudflare Learning Center — Caching & CDN](https://www.cloudflare.com/learning/cdn/what-is-caching/) | Vendor-neutral primers; useful even if you're on Fastly |
| [Hussein Nasser — CDN & HTTP cache videos (YouTube)](https://www.youtube.com/@hnasr) | Protocol-level walkthroughs of `Cache-Control`, `Vary`, conditional GET — same channel as the NGINX / Kong picks |
| [Mark Nottingham — *Caching Tutorial for Web Authors and Webmasters*](https://www.mnot.net/cache_docs/) | The canonical free caching tutorial, written by the author of HTTP RFCs (RFC 7234 / 9111) |
| [*High Performance Browser Networking* — Ilya Grigorik (free online)](https://hpbn.co) | The single best book on HTTP caching, CDN, HTTP/2/3 — read chapters 8–11 |
| [RFC 9111 — HTTP Caching (current standard)](https://www.rfc-editor.org/rfc/rfc9111) | Skim it once. The spec is short and answers every "what does *X* header actually do?" question |

**Time:** 3–4 weeks if focused. Can run in parallel with Stage 5 if you already know basic HTTP. *(Touches Part B Phase 5 — when you put a real edge in front of the Todo app.)*

---

#### Stage 5.6 — Reverse Proxy (NGINX / Envoy)

> **Why it matters:** Behind every API gateway and CDN sits an L7 reverse proxy that actually terminates TLS, routes by host/path, retries on upstream failure, and shapes the request before it reaches your app. **NGINX** is the de-facto choice for HTTP-first stacks; **Envoy** is the de-facto choice for gRPC + service-mesh data planes (Istio, Kong Mesh, AWS App Mesh). Most SRE rotations expect fluency in at least one and reading-level fluency in the other. *Forward proxies (egress / corporate / Squid) are a different beast — see Stage 5.7.*

**Key topics**
- **NGINX as reverse proxy + L7 LB:** `upstream` + `proxy_pass`, keepalive, health checks, retries, timeouts, TLS termination, HTTP/2, gRPC proxying
- **NGINX caching:** `proxy_cache`, microcaching (1–10s TTL on dynamic responses), `proxy_cache_lock`, `proxy_cache_use_stale`, conditional GET, vary headers
- **NGINX request lifecycle:** rewrite vs access vs content phases, variables, `map` blocks, `if` gotchas, `try_files` order
- **Envoy as L7 proxy / mesh data plane:** xDS APIs (LDS/CDS/RDS/EDS), listeners + filter chains, clusters + endpoints, outlier detection, retry budgets, circuit breakers, gRPC-aware routing
- **Envoy in service meshes:** used as the data plane behind Istio / Kong Mesh / AWS App Mesh — sidecar pattern, mTLS, policy enforcement
- **Operational gotchas:** zero-downtime reloads (NGINX `SIGHUP` vs Envoy hot restart), upstream connection pooling, header buffer sizes, p99 spikes from blocking upstream lookups

**Resources — NGINX (reverse proxy + cache)** *(sorted: learn-first → recipes → reference → deep dive)*

| Resource | Type |
|----------|------|
| [KodeKloud — Nginx for Beginners](https://learn.kodekloud.com/user/courses/nginx-for-beginners) | Browser-lab format; mirrors KodeKloud's other "for Beginners" tracks. **Start here.** |
| [Full NGINX Tutorial — Demo Project with Node.js + Docker (YouTube)](https://www.youtube.com/watch?v=q8OleYuqntY) | ~1-hour project video — install, reverse proxy, static + dynamic, Docker, end-to-end |
| [freeCodeCamp — NGINX Tutorial for Beginners (full course, YouTube)](https://www.youtube.com/watch?v=7VAI73roXaY) | Free ~3-hour course — config anatomy, reverse proxy, load balancing, TLS. Good if you want a structured deep walkthrough without a Udemy account |
| [freeCodeCamp — The NGINX Handbook (written companion)](https://www.freecodecamp.org/news/the-nginx-handbook/) | Free long-form handbook — install, config anatomy, static serving, reverse proxy, load balancing, Dockerized NGINX. Reads like a book; pairs well with the video course above when you want to skim, search, or copy-paste configs |
| [TechWorld with Nana — NGINX in 60 Minutes](https://www.youtube.com/watch?v=9t9Mp0BGnyI) | Beginner-friendly visual explanation — concepts → install → reverse proxy → load balancer in one sitting |
| [Hussein Nasser — NGINX Fundamentals (Udemy)](https://www.udemy.com/course/nginx-fundamentals/) | The go-to NGINX course — directives, proxy, cache, TLS, HTTP/2 |
| [NGINX, Inc. — official YouTube channel](https://www.youtube.com/@nginx) | NGINX Conf talks, deep-dive webinars on modules, ingress, NGINX Plus features |
| [DigitalOcean NGINX tutorials](https://www.digitalocean.com/community/tags/nginx) | Practical, recipe-shaped walkthroughs — load balancing, reverse proxy, Let's Encrypt, microcaching |
| [nginxconfig.io](https://www.digitalocean.com/community/tools/nginx) | Interactive NGINX config generator (DigitalOcean) — sane defaults for TLS, HTTP/2, gzip, security headers |
| [NGINX blog — caching guides](https://www.nginx.com/blog/) | "A Guide to Caching with NGINX and NGINX Plus" is the canonical post |
| [NGINX Cookbook — Derek DeJonghe (free from F5/NGINX)](https://www.nginx.com/resources/library/complete-nginx-cookbook/) | Recipe-format reference; chapter 7 (caching) is the one to highlight |
| [Official NGINX docs](https://nginx.org/en/docs/) | Module reference — `ngx_http_proxy_module`, `ngx_http_upstream_module` |
| [agentzh's nginx tutorials](https://openresty.org/download/agentzh-nginx-tutorials-en.html) | Deep dive on the request lifecycle, variables, and rewrite phase — the only resource that explains *how* NGINX evaluates a request |
| *Mastering NGINX* (2nd ed.) — Dimitri Aivaliotis | Book — advanced |

**Resources — Envoy (L7 proxy + service-mesh data plane)** *(sorted: learn-first → hands-on → reference → architecture deep-reads)*

| Resource | Type |
|----------|------|
| [Tetrate Academy — free Envoy + Istio courses](https://academy.tetrate.io/) | The best structured free Envoy curriculum; certs available. **Start here.** |
| *Envoy Fundamentals* — Tetrate (free PDF) | Short eBook; the cleanest intro to xDS |
| [Envoy "Getting Started" + sandboxes](https://www.envoyproxy.io/docs/envoy/latest/start/start) | Runnable docker-compose sandboxes for front-proxy, gRPC, JWT auth, fault injection |
| [Marcel Dempers (That DevOps Guy) — Envoy series (YouTube)](https://www.youtube.com/@MarcelDempers) | Free hands-on series — install, front-proxy, observability, mesh data plane. Pairs well with the Tetrate Academy course |
| [Tetrate — official YouTube channel](https://www.youtube.com/@tetrateio) | Daniel Bryant + community talks on Envoy / Istio in production; the "Envoy Fundamentals" recorded sessions live here |
| [KubeCon EnvoyCon talks (CNCF YouTube)](https://www.youtube.com/@cncf) | Production stories — Lyft, Pinterest, Reddit, Booking.com |
| [Solo.io Academy — Envoy / Gloo courses](https://academy.solo.io/) | Hands-on labs, free tier |
| [Envoy official docs](https://www.envoyproxy.io/docs/envoy/latest/) | Authoritative — start with "Life of a Request" + the listener/cluster/route concepts |
| [envoyproxy/envoy GitHub — examples directory](https://github.com/envoyproxy/envoy/tree/main/examples) | Production-grade config samples — front-proxy, gRPC bridge, JWT, ext_authz |
| [Matt Klein (Envoy creator) — talks & blog posts](https://blog.envoyproxy.io/) | Architecture rationale from the author — why xDS, why filter chains |

**Time:** 2–3 weeks if focused. Pairs naturally with Stage 5.5 — most engineers learn the gateway + CDN first, then drop down into the proxy that backs them.

---

#### Stage 5.7 — Proxy (Forward / Egress)

> **Why it matters:** A *forward* proxy sits in front of the **client**, not the server — it shapes, caches, filters, or audits *outbound* traffic on behalf of an internal network. SREs hit this when they own corporate egress (Squid behind authenticated PAC files), cloud egress (AWS NAT Gateway, GCP Cloud NAT, VPC endpoints), service-mesh egress gateways (Istio `EgressGateway`, Envoy as egress), or when they need to debug API calls leaving a pod (mitmproxy). The hot path is different from a reverse proxy: TLS interception trade-offs, identity propagation, allowlists, and data-exfiltration controls all become first-class concerns. *Reverse proxies — NGINX / Envoy in front of a backend — live in Stage 5.6.*

**Key topics**
- **Forward vs reverse proxy mental model:** *who* initiates the connection, *who* is hidden, *which side* sets the cache key — read the `Via` and `X-Forwarded-*` headers from both sides
- **Squid as classic forward + caching proxy:** ACLs, `cache_peer`, parent/sibling hierarchies, authentication helpers (LDAP/NTLM/Kerberos), SSL bumping, transparent intercept (`tproxy` / WCCP), access logging
- **mitmproxy / mitmweb / mitmdump:** debug outbound traffic from a pod or laptop; TLS MITM via local CA; scripting interceptors in Python; pairing with `iptables` REDIRECT for transparent mode
- **Cloud egress patterns:** AWS **NAT Gateway** vs **NAT instance** vs **VPC Endpoints** (Interface / Gateway / PrivateLink); GCP **Cloud NAT**; per-AZ NAT cost trap; VPC flow logs as your egress observability
- **Service-mesh egress:** Istio `EgressGateway`, Envoy as an egress proxy in a sidecar mesh, registering external services as a `ServiceEntry`, policy enforcement at the edge of the mesh
- **TLS interception trade-offs:** when MITM is appropriate (DLP, compliance) vs when it breaks pinned clients (mobile apps, gRPC), corporate root-CA distribution
- **NGINX / HAProxy as forward proxies:** rare but possible — when each makes sense and when to reach for Squid instead
- **Operational gotchas:** PAC-file pinning to one upstream proxy (no failover), HTTPS-only via `CONNECT` (no caching unless you bump), DNS leaks, authentication state in long-lived sessions, NAT port-exhaustion under burst

**Resources — Forward proxy (Squid + mitmproxy + cloud/mesh egress)** *(sorted: learn-first → reference → cloud/mesh specifics)*

| Resource | Type |
|----------|------|
| [Cloudflare Learning Center — Forward proxy vs reverse proxy](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/) | Mental model first. **Start here** — vendor-neutral and short |
| [Hussein Nasser — Forward Proxy vs Reverse Proxy (YouTube)](https://www.youtube.com/results?search_query=hussein+nasser+forward+proxy+vs+reverse+proxy) | Protocol-level walkthrough — same channel as the NGINX / HAProxy picks |
| [Squid official documentation](http://www.squid-cache.org/Doc/) | The canonical reference — `squid.conf` directives, ACLs, cache peering |
| [Squid Wiki — Squid in 10 minutes / Beginners FAQ](https://wiki.squid-cache.org/SquidFaq/BeginnersFaq) | Concept primers and the fastest path to a working `squid.conf` |
| [*Squid: The Definitive Guide* — Duane Wessels (O'Reilly)](https://www.oreilly.com/library/view/squid-the-definitive/0596001622/) | The classic book. Older but still the single best deep dive on Squid internals + ACL design |
| [mitmproxy — official docs](https://docs.mitmproxy.org/stable/) | Intercept, modify, replay HTTP/2/gRPC. **Start here** for testing/debugging egress |
| [mitmproxy — YouTube channel (workshops + tutorials)](https://www.youtube.com/@mitmproxy) | Short, focused screencasts — TLS bumping, scripting addons, transparent mode |
| [AWS — NAT Gateway documentation](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html) | Authoritative — bandwidth, cost per AZ, port exhaustion behavior |
| [AWS — VPC Endpoints (Interface, Gateway, PrivateLink)](https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html) | Replace egress to AWS APIs with private endpoints — the canonical "stop paying NAT for S3 traffic" pattern |
| [Istio — EgressGateway documentation](https://istio.io/latest/docs/tasks/traffic-management/egress/egress-gateway/) | Centralized egress in a service mesh: `ServiceEntry`, mTLS to external services, audit + policy |
| [Envoy — egress proxy filter reference](https://www.envoyproxy.io/docs/envoy/latest/intro/arch_overview/security/intro) | How Envoy enforces egress policy in a sidecar mesh — auth filters, RBAC, ext_authz |
| [Julia Evans — *How HTTPS works* zine + corporate-proxy posts](https://wizardzines.com/zines/https/) | Approachable explanation of TLS interception trade-offs and how MITM proxies work |

**Time:** 1–2 weeks. Lighter than Stage 5.6 — most SREs need *reading-level* fluency unless they own corporate egress or a service mesh's egress gateway. Pairs with Stage 7 (service mesh) when you get there.

---

### Level 3 — Advanced SRE (Stages 6–7)

> **Senior-track tier.** Goal: lead incidents, design reliable distributed systems, build internal platforms. Senior SRE roles at Grab/Mercari/Agoda target this level. ~10–16 weeks.

#### Stage 6 — Reliability Practices: Incidents, On-Call, Chaos, Capacity

> **Why it matters:** Where you start *behaving* like an SRE rather than just knowing about it. The work moves from "build" to "operate, learn, harden."

**Key topics**
- **Incident command:** Incident Commander, Ops Lead, Comms Lead — explicit roles (adapted from US Forest Service ICS)
- **On-call practices:** sustainable rotations, primary/secondary, follow-the-sun, compensation, paging hygiene (no pageable alerts that aren't actionable)
- **Blameless postmortems in practice:** writing, reviewing, indexing, *actually closing out action items* — this is where most teams fail
- **Toil reduction:** measure quarterly, continuous 30–50% allocation, *not* "toil fix week" (antipattern)
- **Chaos engineering:** Chaos Monkey, Gremlin, Chaos Mesh, Litmus — hypothesis-driven game days
- **Capacity planning:** organic vs inorganic growth, headroom, policy-driven autoscaling, back-pressure, circuit breakers, rate limits
- **Runbooks:** actionable, dated, tested — not aspirational essays
- **Production Readiness Reviews (PRRs):** before SRE takes ownership of a service
- **Wheel of Misfortune / tabletop exercises** — practice incident response in low-stakes settings

**Resources** *(sorted: applied guides → canon → labs → advanced reading → talks)*

| Resource | Type |
|----------|------|
| [PagerDuty Incident Response training](https://response.pagerduty.com/) | Free OSS docs — most actionable starter. **Start here.** |
| SRE Book Ch 11–15 (on-call, troubleshooting, emergency response, incident mgmt, postmortems) | Free — the canon |
| [KodeKloud — Chaos Engineering](https://kodekloud.com/courses/chaos-engineering) | AWS FIS-driven labs on EC2, Aurora, Fargate, EKS — the practical companion to the book |
| *Chaos Engineering* — Rosenthal & Jones | O'Reilly book |
| [learningfromincidents.io](https://www.learningfromincidents.io/) | Etsy/Adaptive Capacity Labs — modern human-factors flavor |
| SREcon talks on YouTube | Search "blameless", "incident command", "on-call" |

**Hands-on milestones**
- Run a **game day** on your Stage 5 stack: kill pods, sever a network link, fill a disk, exhaust a connection pool. Document hypothesis → experiment → result → what you'd change.
- Write a real postmortem for any incident on your team. Get a teammate to review for blame language and *systemic* contributing causes, not "Bob forgot to."

**Time:** 4–6 weeks, then ongoing.

---

#### Stage 7 — Advanced: Service Mesh, Distributed Systems, DevSecOps, Platform Engineering

> **Why it matters:** Senior SREs are systems thinkers. They reason about how independent components interact under failure. They also design *platforms of capabilities* (the central frame in *Enterprise Roadmap to SRE*) — not bespoke help for every team.

**Key topics**
- **Distributed systems:** CAP, PACELC, consistency models (eventual, causal, linearizable), consensus (Raft, Paxos), idempotency, replication, partitioning, leader election, fallacies of distributed computing
- **Service mesh:** Istio, Linkerd, Cilium Service Mesh (eBPF-native) — mTLS, traffic shifting, retries, outlier detection. *Many teams over-adopt mesh.* Know the cost/complexity tradeoff.
- **Resilience patterns:** circuit breakers, bulkheads, timeouts, retries with jitter, hedged requests, dead-letter queues, idempotency keys
- **DevSecOps:** supply-chain (SBOM, Sigstore, in-toto, SLSA), runtime security (Falco), policy as code (OPA/Gatekeeper, Kyverno), secrets scanning, image signing
- **Platform engineering:** internal developer platform with a "golden path", Backstage as the most common portal. The platform is your **leverage** — how you scale sublinearly.
- **Cost / FinOps:** rightsizing, spot/preemptible, autoscaling policy, the cost/reliability/velocity triangle
- **AI in SRE (2025–2026):** AIOps for anomaly detection, LLMs as on-call *copilot* (not autopilot — Heinrich Hartmann's framing)

**Resources** *(sorted: orient → primary book → team models → deep references)*

| Resource | Type |
|----------|------|
| [CNCF Landscape](https://landscape.cncf.io) | To *orient*, not to install. **Start here.** |
| *Designing Data-Intensive Applications* — Kleppmann | The single most useful book for advanced SRE thinking |
| *Team Topologies* — Skelton & Pais | Platform-team / stream-aligned-team model |
| *Seeking SRE* — Blank-Edelman (ed.) | O'Reilly book; ch 23 has antipatterns catalog |
| [SLSA framework](https://slsa.dev/) | Supply-chain security reference |
| *Database Internals* — Petrov | Book — storage-engine depth |

**KodeKloud (cert-aligned senior-track labs)**

| Course | Use for |
|--------|---------|
| [CKS — Certified Kubernetes Security Specialist](https://kodekloud.com/courses/certified-kubernetes-security-specialist-cks) | The depth credential — runtime security, network policies, supply chain, Falco/Trivy |
| [KCSA — Kubernetes & Cloud-Native Security Associate](https://kodekloud.com/courses/kubernetes-and-cloud-native-security-associate-kcsa) | Lighter MCQ-format cert; vocab pass for DevSecOps |
| [Istio Service Mesh](https://kodekloud.com/courses/istio-service-mesh) → [Istio Certified Associate (ICA)](https://kodekloud.com/courses/istio-certified-associate) | Traffic shifting, mTLS, observability — pair before deciding mesh tradeoffs |
| [AWS EKS](https://kodekloud.com/courses/aws-eks) | Karpenter vs node groups vs Fargate, EKS upgrades, persistent storage |
| [AWS Certified DevOps Engineer — Professional](https://kodekloud.com/courses/aws-certified-devops-engineering) | Optional follow-on after SAA for AWS-heavy APAC roles (Agoda, Grab) |

**Hands-on milestones**
- Install Linkerd or Istio on your cluster — demonstrate mTLS, 5% canary traffic shift, automatic retries on a service that intermittently fails
- Contribute one non-trivial PR (docs count) to a CNCF or major OSS project — navigating their codebase *is* the learning

**Time:** 8–12 weeks, parallelizable with Stage 6.

---

### Level 4 — Mastery & Leadership (Stage 8+)

> **Staff / Principal / Manager tier.** Goal: shape how reliability is *thought about* across the org. Highest-leverage work; primarily cultural, organizational, and strategic. Ongoing post-first-job.

#### Stage 8 — Leadership, Culture, Scaling SRE (ongoing, post-job-start)

> **Why it matters:** Brookbank & McGhee's central thesis — enterprise SRE adoption fails *not on technology* but on culture, staffing, leadership. As you mature, the highest-leverage thing you can do is shape how reliability is *thought about*, not how it is *implemented*.

**Key topics**
- **Westrum's organizational culture typology** (pathological / bureaucratic / generative). Generative culture is the empirically proven DORA predictor of high performance.
- **Influencing without authority** — most reliability wins come from convincing other teams. SREs rarely have org-chart power.
- **Staffing & upskilling** — build, buy, or adopt? Avoid the trap of "rename ops to SRE" (the #1 enterprise failure mode).
- **Three Horizons of Growth** (McKinsey, applied to SRE by Brookbank & McGhee): H1 keep existing reliability work running; H2 grow adjacent capabilities; H3 plant future bets (AI-assisted triage). Invest across all three concurrently.
- **DORA Four Keys** (deploy frequency, lead time, change failure rate, MTTR) — pair *with* SLOs, don't pick one or the other
- **Five team dynamics** (Google Project Aristotle): psychological safety, dependability, structure/clarity, meaning, impact
- **Peacetime vs Wartime** investment modes; **Code Yellow / Code Red** priority codes

**Resources** *(sorted: re-read → applied culture → DORA → soft skills → original paper)*

| Resource | Type |
|----------|------|
| *Enterprise Roadmap to SRE* — Brookbank & McGhee | **Re-read after Stages 1–7** — the second pass is vastly more useful. **Start here.** |
| *The DevOps Handbook* (2nd ed.) — Kim et al. | Book — applied culture |
| *Accelerate* — Forsgren/Humble/Kim | DORA data |
| *Crucial Conversations* — Patterson et al. | Soft-skills foundation for hard reliability conversations |
| Ron Westrum, "A typology of organisational cultures" (2004) | Free academic paper — original source |

**Hands-on milestones**
- Lead a postmortem for your team. Coach a peer through writing the next one.
- Write a one-pager proposing an SRE practice (e.g., PRRs) to leadership — address cost, J-curve, and success metrics explicitly.

**Time:** Ongoing for the rest of your career.

---

### Certifications Worth Considering

Certs are *trust signals*, not substitutes for experience. Prioritize performance-based.

| Cert | Why for SRE | Notes |
|------|-------------|-------|
| **CKA — Certified Kubernetes Administrator** | Highest-signal cert for cloud-native SRE. Live cluster, performance-based. | ~$445, valid 2 yrs. **Start here.** |
| **CKAD** | In-cluster app debugging; lighter than CKA | Optional if you have CKA |
| **CKS** | After CKA; senior SRE / platform roles | Requires valid CKA |
| **Google Pro Cloud DevOps Engineer** | Explicitly tests SRE principles (SLOs, error budgets, monitoring) on GCP — the most SRE-native cloud cert | Recommended even if not using GCP daily |
| **AWS Solutions Architect Associate (SAA-C03)** | Broad AWS literacy, Well-Architected | Most universally recognized cloud cert |
| **AWS Developer Associate (DVA-C02)** | Code-side AWS: Lambda, API GW, DynamoDB, X-Ray | Strong complement to SAA |
| **AWS DevOps Engineer Pro (DOP-C02)** | Senior AWS cert closest to SRE — CI/CD, CloudWatch, incident response, IaC at scale | After SAA + DVA |
| **HashiCorp Terraform Associate** | IaC literacy; quick win | Cheap, online-proctored |
| **Linux Foundation LFCS** or **RHCSA** | If your Linux is shaky. RHCSA is gold standard in many enterprises. | LFCS is the modern choice |
| **Prometheus Certified Associate (PCA)** | Observability credibility | New CNCF cert |

**Skip:** Scrum, ITIL, "DevOps Foundation" certs — they signal little to SRE hiring managers.

---

### Reading List Across the Journey

**Reliability and SRE canon** (read in this order)
1. [*Site Reliability Engineering*](https://sre.google/sre-book/) — Beyer/Jones/Petoff/Murphy (2016)
2. [*The Site Reliability Workbook*](https://sre.google/workbook/) — Beyer et al. (2018)
3. [*Enterprise Roadmap to SRE*](https://sre.google/resources/practices-and-processes/enterprise-roadmap-to-sre/) — Brookbank & McGhee (2022)
4. [*Building Secure & Reliable Systems*](https://sre.google/books/building-secure-reliable-systems/) — Adkins et al. (2020)
5. *Seeking SRE* — Blank-Edelman ed. (2018) — non-Google perspective

**Engineering / systems thinking**
6. *Designing Data-Intensive Applications* — Kleppmann
7. *Systems Performance* (2nd ed.) — Brendan Gregg
8. *Database Internals* — Petrov
9. *Observability Engineering* — Majors/Fong-Jones/Miranda

**Culture / leadership / process**
10. *The Phoenix Project* — Kim/Behr/Spafford (audiobook works well)
11. *The Unicorn Project* — Kim (the dev/SRE counterpoint)
12. *Accelerate* — Forsgren/Humble/Kim
13. *Team Topologies* — Skelton & Pais
14. *An Elegant Puzzle* — Will Larson
15. *Resilience Engineering in Practice* — Hollnagel et al.

---

### Foundational University Course Videos

> Three academic deep-dives that map onto the SRE foundations: distributed systems, computer networking, and end-to-end systems engineering. These go deeper than interview prep — they pay off in production debugging and senior-level design rounds. Watch alongside Stage 1 (Networking) and Stage 7 (Distributed Systems).

#### Course 1 — MIT 6.824 Distributed Systems (Spring 2020, Robert Morris)

> 20 lectures · the canonical graduate distributed-systems course; pairs directly with Stage 7. Full lecture-by-lecture table lives in [Part 0A → Distributed Systems Deep Dive — MIT 6.824](#part-0). [Full playlist](https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB)

#### Course 2 — Stanford CS144 Introduction to Computer Networking (Fall 2013, Philip Levis & Nick McKeown)

> Course pair to Stage 1 networking. [Full playlist](https://www.youtube.com/playlist?list=PLvFG2xYBrYAQCyz4Wx3NPoYJOFjvU7g2Z)
>
> ⚠️ **Warning:** 82 of the 113 entries in this playlist are now marked **[Private video]** on YouTube and cannot be watched. The accessible Fall 2013 lectures below cover Transport, Congestion Control, Routing, and Security; for the missing topics (Internet architecture intro, link layer, packet switching, NAT, DNS, HTTP, SDN, applications), use Stanford's official current course site at [cs144.github.io](https://cs144.github.io) or *Kurose & Ross — Computer Networking: A Top-Down Approach* from the Stage 1 resources.

**Transport Layer (TCP / UDP / ICMP)**

| # | Video | Link |
|---|-------|------|
| 1 | 2-0: Transport (intro) | https://www.youtube.com/watch?v=1CP6aF09OjI |
| 2 | 2-1: TCP service model | https://www.youtube.com/watch?v=l3AhPe4WK0E |
| 3 | 2-2: UDP service model | https://www.youtube.com/watch?v=umqdobwwbFc |
| 4 | 2-3: ICMP service model | https://www.youtube.com/watch?v=LSobIghyLGU |
| 5 | 2-4: End to End Principle | https://www.youtube.com/watch?v=mZcthYLpF9Q |
| 6 | 2-5: Error detection | https://www.youtube.com/watch?v=8DRD-vQam60 |
| 7 | 2-6a: Finite state machines 1 | https://www.youtube.com/watch?v=FYNk9VrMWwc |
| 8 | 2-12: Transport (recap) | https://www.youtube.com/watch?v=vtJ2JzhWTsk |

**Congestion Control**

| # | Video | Link |
|---|-------|------|
| 1 | 4-0: Congestion Control (intro) | https://www.youtube.com/watch?v=nh970YyKRDA |
| 2 | 4-4: AIMD Multiple Flows | https://www.youtube.com/watch?v=OAHga4mQr_A |
| 3 | 4-11: Congestion Control (wrap-up) | https://www.youtube.com/watch?v=JMm2vDkCUJg |

**Routing**

| # | Video | Link |
|---|-------|------|
| 1 | 6-0: Routing (intro) | https://www.youtube.com/watch?v=yfIyxDhhWHU |
| 2 | 6-9: Routing (wrap-up) | https://www.youtube.com/watch?v=VJoYi6UZiCg |

**Network Security**

| # | Video | Link |
|---|-------|------|
| 1 | 8-0: Security (intro) | https://www.youtube.com/watch?v=LHbynG7iYEY |
| 2 | 8-1: Introduction to Network Security | https://www.youtube.com/watch?v=SERez34ww5c |
| 3 | 8-2: Layer 2 Attacks | https://www.youtube.com/watch?v=GkqPLrCqkeo |
| 4 | 8-2a: MAC Overflow Attack | https://www.youtube.com/watch?v=YC_oLgYd_qU |
| 5 | 8-2b: DHCP Attack Demo | https://www.youtube.com/watch?v=_eW_SDyhj-U |
| 6 | 8-3: Layer 3 Attacks | https://www.youtube.com/watch?v=6vudh-STvBM |
| 7 | 8-5: Security Principles | https://www.youtube.com/watch?v=LxtJoXxeDyE |
| 8 | 8-6a: Confidentiality | https://www.youtube.com/watch?v=Pr_vrfRYuvQ |
| 9 | 8-7: Integrity | https://www.youtube.com/watch?v=sRBuAB0reNY |
| 10 | 8-8: Public Key Cryptography | https://www.youtube.com/watch?v=aSh16igtLf4 |
| 11 | 8-9: Certificates | https://www.youtube.com/watch?v=gQ33dMv1aJ8 |
| 12 | 8-10a: TLS | https://www.youtube.com/watch?v=gsLEz6sRPr8 |
| 13 | 8-11: Security (wrap-up) | https://www.youtube.com/watch?v=CxuyR9G1HwA |

**Guest Talks & Interviews**

| # | Video | Link |
|---|-------|------|
| 1 | Nandita Dukkipati Interview (Google, BBR/data-center TCP) | https://www.youtube.com/watch?v=OVhJEn3cu5M |
| 2 | BGP: Putting the "Inter" in Internet — Jennifer Rexford (Princeton) | https://www.youtube.com/watch?v=HAhzj1E1ejI |
| 3 | Sanjit Biswas, CEO of Meraki — interviewed by Nick McKeown | https://www.youtube.com/watch?v=pHULhFc8pwA |
| 4 | Reed Hundt on Security and Openness | https://www.youtube.com/watch?v=0jwuR8YANIk |

#### Course 3 — MIT 6.033 Computer System Engineering (Spring 2018, Katrina LaCurts)

> Undergraduate end-to-end systems course — OS, networking, distributed systems, security — taught around primary research papers. Cross-cuts Stages 1, 5, 6, and 7.
>
> 📖 **Note:** OCW does **not** publish video lectures for the Spring 2018 offering — the course is delivered through readings (Saltzer & Kaashoek, *Principles of Computer System Design*), assigned papers, recitation outlines, and a multi-week design project. Use it as a paper-driven study companion, not a video course.

**Syllabus highlights** ([source](https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/pages/syllabus/))

- **Primary learning objective:** *"Students will design distributed systems addressing real-world problems"* — with secondary abilities to evaluate existing systems, apply technical material to new components, and recognize design patterns in operating systems, Internet architecture, reliable systems, and security. This single-line objective is the lens to read the whole course through.
- **Secondary objective:** communication skills — written reports, oral presentations, peer review. Mirrors what senior SREs do (postmortems, RFCs, design reviews); worth taking seriously when self-studying.
- **Prerequisites (self-check before starting):** *6.004 Computation Structures* (computer architecture fundamentals) **and** *6.005 Software Construction* **or** *6.009 Fundamentals of Programming*. If your background is gaps in OS/arch, do *Operating Systems: Three Easy Pieces* first.
- **Required textbook:** Saltzer & Kaashoek, *Principles of Computer System Design: An Introduction* — Morgan Kaufmann, 2009. ISBN 9780123749574. Part I is the printed book; **Part II is free on MIT OCW** (link below).
- **Format:** 2 lectures/week (high-level framing) + 2 recitations/week (paper discussion — this is where the deep learning happens) + 1 writing tutorial/week. For self-study, the recitation paper list is the highest-value artifact.
- **Major deliverables:** two quizzes (15% each), weekly hands-ons (5%, OCW-restricted), a team **design project** (preliminary report + presentation + final report + peer review = 34%), two paper critiques (6%). Self-study substitute: pick one of the assigned design projects and write the final report solo.
- **Topic emphasis (14 weeks):** Operating Systems (weeks 1–4) → Networking (weeks 5–7) → Distributed Systems (weeks 8–10) → Security (weeks 11–14). Notice security is **the largest** unit — reflects modern SRE reality.
- **Instructor:** Dr. Katrina LaCurts (EECS).

**Resources**

| Resource | Link |
|----------|------|
| OCW course home | https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/ |
| Syllabus | https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/pages/syllabus/ |
| Lecture & recitation outlines | https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/pages/lecture-and-recitation-notes/ |
| Assignments (papers + critiques + design project) | https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/pages/assignments/ |
| Sample papers covered: DNS, UNIX, MapReduce, Raft, Spanner, Eraser, LFS, Landmark routing, RON, DCTCP, CDN, DNSSEC, botnets, Meltdown | (see Assignments page above) |
| Saltzer & Kaashoek, *Principles of Computer System Design* (Part II — free) | https://ocw.mit.edu/resources/res-6-004-principles-of-computer-system-design-an-introduction-spring-2009/online-textbook/ |

**Topic map (use to plug into other stages):**

| 6.033 unit | Maps to | Companion video resource |
|------------|---------|--------------------------|
| Operating Systems (weeks 1–4) | Stage 1 | *Operating Systems: Three Easy Pieces* (free) + Brendan Gregg talks |
| Networking (weeks 5–7) | Stage 1 | CS144 videos above + Kurose & Ross |
| Distributed Systems (weeks 8–10) | Stage 7 | MIT 6.824 videos above |
| Security (weeks 11–14) | Stages 1, 7 (DevSecOps) | CS144 Security videos above |

**Self-study plan (≈8 weeks, 3 hrs/week — compresses 14 weeks of the official course):**

1. Weeks 1–2: read Saltzer & Kaashoek Part I ch. 1–3 (system complexity, naming, modularity). Write a one-page critique of the UNIX paper.
2. Weeks 3–4: networking unit — pair with CS144 Transport + Routing videos. Read the DNS, RON, and DCTCP papers.
3. Weeks 5–6: distributed systems unit — pair with MIT 6.824 lectures 1–9. Read GFS, MapReduce, Raft, Spanner.
4. Weeks 7–8: security unit — read DNSSEC, Meltdown, and one botnet paper. Pair with CS144 8-x security videos.
5. Capstone: pick one OCW design project prompt and write a 2,000-word final report applying the principles. This is the single best transfer-to-interview artifact this course produces.

---

### DevOps Tooling Reference Map (from roadmap.sh/devops)

> Use as a "you are here" map, **not** a learning checklist. Don't try to learn everything — pick *one tool per category* aligned with your target stack (AWS + K8s + Go + GitHub Actions for APAC SRE roles).

| Category | Pick (recommended) | Alternatives to recognize |
|----------|---------------------|---------------------------|
| **Language** | Go *or* Python | Ruby, Rust, JS/Node.js |
| **OS** | Ubuntu/Debian | RHEL/derivatives, SUSE; BSDs for breadth |
| **Editor + shell** | vim + bash | nano/emacs; PowerShell if Windows |
| **VCS hosting** | GitHub | GitLab, Bitbucket |
| **Containers** | Docker | Podman, LXC |
| **Web server / proxy** | nginx | Caddy, Apache, Traefik |
| **API gateway** | Kong (OSS) | AWS API Gateway, Apigee, Tyk, Envoy Gateway, Krakend |
| **CDN / edge cache** | Fastly | CloudFront, Cloudflare, Akamai *(Varnish — legacy, skip; Fastly's VCL is the modern path)* |
| **Cloud provider** | AWS | GCP, Azure, DigitalOcean, Hetzner |
| **Serverless** | AWS Lambda | Cloudflare Workers, Vercel, GCP Functions |
| **Config mgmt** | Ansible | Chef, Salt, Puppet |
| **Provisioning (IaC)** | Terraform / OpenTofu | Pulumi, AWS CDK, CloudFormation |
| **CI/CD** | GitHub Actions | GitLab CI, Jenkins, CircleCI, Tekton |
| **Secret mgmt** | Vault + External Secrets Operator | Sealed Secrets, SOPS, cloud-native KMS |
| **Logs** | Loki + Grafana | Elastic Stack, Splunk, Graylog, Papertrail |
| **Metrics** | Prometheus + Grafana | Datadog, Zabbix, New Relic |
| **Traces** | Tempo or Jaeger | New Relic, Datadog, Dynatrace |
| **Instrumentation** | OpenTelemetry | Vendor SDKs |
| **Orchestration** | Kubernetes (EKS) | ECS/Fargate, OpenShift, Docker Swarm (legacy) |
| **Artifact mgmt** | ECR or GHCR | Artifactory, Nexus, Harbor |
| **GitOps** | ArgoCD | FluxCD |
| **Service mesh** | Linkerd (start simple) | Istio, Cilium, Consul, Envoy |

---

### SRE Interview Loop (differs significantly from SWE)

| Round | What it tests | How to prep |
|-------|---------------|-------------|
| **Coding** | File/log parsing, string processing, concurrency, networking, retries — usually a notch easier than SWE LeetCode | Python or Go preferred. Practice partial-failure + edge cases over clever O(n log n). |
| **Linux internals & troubleshooting** | "A service is slow; walk me through your investigation." | Drill USE method for resources, RED for requests. Verbalize your thought process — interviewers grade *reasoning*, not the answer. |
| **Networking** | DNS, TCP/UDP, HTTP, LBs, proxies, TLS, BGP at a high level | Re-read Stage 1 networking resources. Be ready to whiteboard a DNS resolution path. |
| **Systems design / NALSD** | Google's "Non-Abstract" variant explicitly requires *numbers*: bandwidth, IOPS, latency budgets, fan-out math | Memorize Jeff Dean's latency numbers. Know SSD/NVMe IOPS, 10 GbE throughput, memory bandwidth. A design without back-of-envelope numbers is a fail. |
| **SRE behavioral & culture** | "Tell me about an incident you led", "How would you set an SLO for X", "How would you reduce toil for a team that doesn't want help" | STAR stories: a hard incident, a reliability initiative, a conflict, a time you said no, a time you were wrong. |

**Public postmortems to study** (gold for behavioral questions — "how would you have responded?"): GitHub, Cloudflare, AWS, GCP, Slack post-incident reports.

---

### Antipatterns to Avoid (from *Enterprise Roadmap to SRE* and *Seeking SRE*)

- **Watermelon metrics** — green on the outside, red on the inside. Aggregate availability 99.95%, users furious. Slice by user, region, request type, percentile. **Don't accept averages.**
- **SLO = SLA confusion.** Setting your SLO at your SLA gives you zero headroom.
- **100% reliability targets.** The right answer is almost never "more nines." Cost grows superlinearly.
- **Hero culture.** Rewarding the firefighter rewards the existence of fires. Recognize prevention publicly.
- **"Toil fix week."** Quarterly sprint after which toil regrows. Toil reduction is *continuous* (30–50% allocation), not a heroic burst.
- **Renaming ops to SRE.** Same people, same tools, same processes, new business cards. *The #1 enterprise failure mode.*
- **One SRE team for everything.** Doesn't scale. Either embedded with product teams, or centralized owning a *platform of capabilities*.
- **SLO ceremony without enforcement.** SLOs exist but no one ever stops a release. Pre-commit (Ulysses pact) in writing, with named decision owners.
- **Alerting on causes, not symptoms.** "CPU is high" wakes you at 3am while the user is fine. Alert on SLI burn rate.
- **Tool-first thinking.** "We need Prometheus / Istio / ArgoCD" *before* "We need to know our user-facing latency target." Per the Enterprise SRE authors, *the* chief reason enthusiastic adoption stalls.
- **Skipping the J-curve briefing.** Leaders surprised that things got harder before easier conclude SRE "doesn't work" and roll it back.
- **Toxic combinations.** Mixing old (ITIL problem-mgmt with central problem manager) + new (embedded SREs driving postmortems) *at the same time* causes confusion and worsened outcomes. Choose evolution path.
- **Ignoring Ulysses** — letting outages affect planning cycle even when they were *expected*. Stick to the plan.

---

### Continuous Learning (subscribe to 2–3, not all)

**Newsletters**
- [SRE Weekly](https://sreweekly.com/) — Lex Neva — the canonical SRE newsletter
- KubeWeekly — official CNCF
- Monitoring Weekly — observability focus
- [DevOps'ish](https://devopsish.com/) — Chris Short — culture + tooling
- Resilience Roundup — human factors / resilience engineering

**Conferences (recordings are free)**
- [SREcon (USENIX)](https://www.usenix.org/srecon) — Americas, EMEA, APAC. The flagship.
- KubeCon + CloudNativeCon — three regions per year
- DevOpsDays — local, community-driven
- Monitorama — observability-specific
- QCon — broader SE, strong SRE/platform tracks

**Communities**
- [CNCF Slack](https://slack.cncf.io) — largest cloud-native community
- Kubernetes Slack — same invite as CNCF
- #sre on Rands Leadership Slack
- r/sre, r/devops, r/kubernetes — surprisingly high signal
- [`awesome-sre`](https://github.com/dastergon/awesome-sre) — community-maintained mega-list

**People to follow:** Liz Fong-Jones, Charity Majors, Cindy Sridharan, Niall Murphy, Steve McGhee, Lorin Hochstein, John Allspaw, Brendan Gregg, Kelsey Hightower, Tom Limoncelli.

---

### Soft Skills — The Multiplier

Brookbank & McGhee are blunt: enterprise SRE success depends *more* on these than on technology.

- **Written communication.** A postmortem someone else can learn from is a deliverable. So is a runbook. So is an SLO doc. Write often.
- **Calm under pressure.** Incident command demands it. Practice on game days.
- **Blameless framing.** Replace "Bob did X" with "the system permitted X." Trainable habit.
- **Asking, not telling.** "Help me understand why the 4pm Friday deploy is needed" beats "no Friday deploys."
- **Influencing without authority.** Build relationships *before* you need them. Pair with product, security, platform.
- **Knowing when NOT to automate.** Sometimes the right answer is to delete the toil at the source. Automating bad processes faster is still bad.
- **Saying "I don't know."** In front of senior engineers — then finding out.

---

### Closing the Loop

Commit to ~8–12 focused hours per week for 12–18 months, apply every concept on a real or pet system, and write as you go. You won't just be *employable* as an SRE — you'll be a *thoughtful* one. The kind who walks into a struggling enterprise SRE function, recognizes the J-curve, writes the Ulysses-pact error budget policy, and leads the team out of it.

> "Hope is not a strategy." — Traditional SRE saying
> "Evolution, not revolution." — Brookbank & McGhee
> "There is no perfect end state. There is only continuous improvement, applied with discipline, in the direction of reliability for your users." — *Enterprise Roadmap to SRE*

Page yourself only when it's actionable. Write the postmortem you wish you'd been handed. Keep error budgets honest. Welcome to SRE.

---

## <a id="part-ai"></a>Part AI — AI Engineering for SRE/DevOps

> **Why this is here:** Between 2024 and 2026, AI moved from "research curiosity" to "production tool" inside SRE. LLMs are now plausible on-call copilots, log summarizers, runbook generators, and NL→PromQL/SQL interfaces. SRE teams at Grab, Mercari, Agoda, ByteDance, and PayPay already operate vLLM/TGI clusters, RAG-over-runbooks systems, and AI-driven incident triage. Treat this as a **horizontal specialization** that compounds with Stages 5–7 of Part SRE — not a separate career.
>
> **Scope clarifier:** This is **AI engineering** (using pre-trained models in production), not **ML research** (training foundation models). The latter is a PhD track; the former is what SRE/DevOps roles increasingly require. If you're tempted by the research path, see *AI learning path'.md* in this repo — it's a different game.

### Two roles to keep separate

| Role | What they do | Stance in this guide |
|------|--------------|----------------------|
| **AI Engineer** | Uses pre-trained models + APIs to build features (chat, RAG, agents, NL→X). | Primary focus — pairs naturally with SRE work. |
| **ML Engineer / Researcher** | Trains, fine-tunes, evaluates models; architecture-level work. | Out of scope for a 6-month junior-SRE plan. |

---

### Level 1 — Foundations

> **Beginner tier.** Goal: understand LLM mechanics + see the field once before installing anything. Reading-only. ~1 week at 12 hrs.

#### L1.1 Core concepts (from [roadmap.sh/ai-engineer](https://roadmap.sh/ai-engineer))

**LLM mechanics you must internalize:**
- **Tokens & context window** — pricing, latency, and "out of context" failures all live here
- **Temperature / Top-K / Top-P / repetition penalty** — determinism vs creativity
- **Zero-shot, Few-shot, Chain-of-Thought (CoT), ReAct** — prompting strategies (CoT and ReAct are non-optional in 2026)
- **Inference vs training** — 99% of an AI engineer's job is inference
- **Closed vs open weights** — Claude / GPT / Gemini vs Llama / Mistral / Qwen / DeepSeek / Gemma

**Application lifecycle (the natural progression):**

```
Prompt engineering  →  RAG  →  Fine-tuning  →  Agents (+ MCP)
                       ↑
       most teams should stop here; many escalate prematurely
```

**Prompt vs context engineering:** *context engineering* (controlling what reaches the model — retrieved chunks, tools, structured memory) scales further than clever prompts. This is the 2026 buzzword for what RAG/agent designers actually do.

#### L1.2 Foundational concepts — free YouTube videos (curated)

> Watch these before diving into frameworks. Pick the English playlists below; the Krishna Naik link in L2.4 has Hindi alternatives if you prefer.

*Sorted: visual intuition → 1-hour primer → coding deep-dives → academic/applied courses*

| Topic | Video | Channel | Link |
|-------|-------|---------|------|
| Neural net intuition | But what is a Neural Network? | 3Blue1Brown | https://www.youtube.com/watch?v=aircAruvnKk |
| Transformers — visual | But what is a GPT? Visual intro to Transformers | 3Blue1Brown | https://www.youtube.com/watch?v=wjZofJX0v4M |
| Math intuition for ML | Essence of Linear Algebra | 3Blue1Brown | https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab |
| Intro to LLMs (1 hr) | Intro to Large Language Models | Andrej Karpathy | https://www.youtube.com/watch?v=zjkBMFhNj_g |
| State of GPT | State of GPT — Microsoft Build | Andrej Karpathy | https://www.youtube.com/watch?v=bZQun8Y4L2A |
| Build a GPT from scratch | Let's build GPT: from scratch, in code, spelled out | Andrej Karpathy | https://www.youtube.com/watch?v=kCc8FmEb1nY |
| Tokenizer deep dive | Let's build the GPT Tokenizer | Andrej Karpathy | https://www.youtube.com/watch?v=zduSFxRajkE |
| Full series | Neural Networks: Zero to Hero | Andrej Karpathy | https://www.youtube.com/playlist?list=PLAqhIrjkxbuWI23v9cThsA9GvCAUhRvKZ |
| Practical DL | Practical Deep Learning for Coders (2022) | fast.ai | https://www.youtube.com/playlist?list=PLfYUBJiXbdtSvpQjSnJJ_PmDQB_VyT5iU |
| HF NLP course (video) | Hugging Face NLP Course | HuggingFace | https://www.youtube.com/playlist?list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o |
| Attention paper | Attention Is All You Need — paper walkthrough | Yannic Kilcher | https://www.youtube.com/watch?v=iDulhoQ2pro |
| Transformers United | Stanford CS25 — Transformers United | Stanford Online | https://www.youtube.com/playlist?list=PLoROMvodv4rNiJRchCzutFw5ItR_Z27CM |

#### L1.3 Books — start here

1. ***AI Engineering: Building Applications with Foundation Models*** — Chip Huyen (2025). The single most aligned book for this Part — read first.
2. ***Designing Machine Learning Systems*** — Chip Huyen (2022). The SE4AI/MLOps reference SREs reach for.

---

### Level 2 — Core Engineering

> **Working AI-engineer tier.** Goal: ship a real artifact — RAG over your runbooks, deployed to your kind cluster. ~3 weeks at 12 hrs.

#### L2.1 The AI engineering stack (cherry-pick — don't install everything)

| Layer | Pick first | Strong alternatives |
|-------|-----------|---------------------|
| **Closed model API** | Anthropic Claude (Messages API) | OpenAI Response API, Google Gemini API, OpenRouter (multi-provider router) |
| **Open weights via API** | Llama 3.1/3.2 via Together.ai or Groq | Fireworks, Replicate, OctoAI |
| **Local inference (dev)** | Ollama | LM Studio, llama.cpp, MLX (Apple Silicon) |
| **Local inference (prod throughput)** | vLLM (PagedAttention, continuous batching) | TGI (HuggingFace), TensorRT-LLM, SGLang |
| **App framework** | LangChain (mainstream) or DSPy (programmatic, research-grade) | LlamaIndex (RAG-first), Pydantic-AI, Haystack, RAGFlow |
| **Agent framework** | LangGraph or OpenAI Agents SDK | CrewAI, AutoGen, Claude Agent SDK, Vertex AI Agent Builder, Google ADK |
| **Vector DB** | pgvector on Postgres (start here) | Qdrant, Weaviate, Milvus, LanceDB, Chroma, Pinecone, MongoDB Atlas Vector, Supabase |
| **Embeddings** | OpenAI `text-embedding-3-small` or BGE-M3 | Voyage AI, Nomic Embed, Jina, sentence-transformers, Cohere, Gemini Embedding |
| **Eval / observability** | Langfuse + Ragas | LangSmith, Braintrust, Promptfoo, DeepEval, OpenAI Evals |
| **Guardrails** | Pydantic output schemas + Outlines / Instructor | Guardrails AI, NeMo Guardrails, LlamaGuard |
| **Multimodal** | OpenAI Vision API, Whisper (STT), DALL-E / Gemini image | HF multimodal models, Eleven Labs (TTS) |

**Heuristic:** know one pick per row well enough to ship; know the alternatives well enough to explain trade-offs in an interview.

#### L2.2 RAG (Retrieval-Augmented Generation) — the highest-leverage pattern for SRE

This is what lets an LLM consult **your** runbooks, postmortems, Grafana dashboards, and Slack history without hallucinating.

**Pipeline:**

```
docs → chunk → embed → vector DB index
                              ↓
query → embed → top-K cosine search → stuff into prompt → LLM → answer
```

1. **Chunking** — recursive char-splitter at 500–1500 tokens with 50–100 overlap is a sane default. Markdown-aware splitters preserve section structure; code-aware splitters use AST boundaries.
2. **Embedding** — pass each chunk through an embedding model → vector.
3. **Vector DB index** — store vectors with metadata (`source`, `date`, `service`).
4. **Retrieval** — at query time, embed the question and run cosine/dot-product search; rerank with a cross-encoder (Cohere Rerank, BGE-Reranker) when accuracy matters.
5. **Generation** — stuff retrieved chunks into the LLM context with provenance tags.

**RAG vs fine-tuning:** RAG covers ~80% of "make the LLM know my docs" use cases. Fine-tune only when you need style/domain shift (e.g., always answer in incident-report format) or to compress repeated context. Almost every team should try RAG first.

#### L2.3 6-week learning plan (≈ 12 hrs/week — runs beside Part SRE Stage 5+)

| Week | Level | Topic | Tangible output |
|------|-------|-------|-----------------|
| 1 | L1 | Concepts: tokens, context, prompting strategies, RAG vs fine-tune. Watch DeepLearning.AI "ChatGPT Prompt Engineering for Developers" (free, 1 hr). | Notes repo `sre-ai/concepts.md` |
| 2 | L2 | Stack hands-on: call Anthropic + Ollama from Python; embed with sentence-transformers; pgvector quickstart. | `sre-ai/hello-rag` MVP |
| 3 | L2 | Build a **runbook RAG** over your Part B repo's `docs/` directory. Add Langfuse traces. | `sre-ai/runbook-rag` deployed to kind |
| 4 | L3 | Add an **incident-triage agent** with read-only Prometheus + Loki tools using **MCP**. | `sre-ai/oncall-copilot` |
| 5 | L3 | Operate vLLM locally; benchmark Llama 3.1 8B (4-bit) vs hosted `claude-haiku-4-5` on cost / latency / quality. | Blog post: "vLLM vs hosted Claude for SRE workloads" |
| 6 | L3 | Eval pipeline (Ragas + Langfuse) + adversarial tests (Promptfoo); deploy oncall-copilot with Helm; write SLO doc. | `sre-ai/oncall-copilot` v1.0 + Helm chart + SLO |

> **Deliverable to pin on GitHub:** `sre-ai/oncall-copilot` is the artifact you should walk into an APAC interview with. It compounds Part B (K8s/observability) + Part AI (RAG + agents).

#### L2.4 Agentic AI — Krishna Naik's curated playlists ([repo](https://github.com/krishnaik06/Roadmap-To-Learn-Agentic-AI))

> Most useful for the Bangladeshi/South-Asian audience because of Hindi options + end-to-end project format. Pair with the English-language deep dives in L1.2 — Krishna Naik is strong on practical project builds, lighter on first-principles theory.

| # | Topic | Playlist / video | Link |
|---|-------|------------------|------|
| 1 | Python (English) | Complete Python Playlist | https://www.youtube.com/playlist?list=PLZoTAELRMXVNUL99R4bDlVYsncUNvwUBB |
| 2 | Python (Hindi) | Complete Python Playlist — Hindi | https://www.youtube.com/playlist?list=PLTDARY42LDV4qqiJd1Z1tShm3mp9-rP4v |
| 3 | NLP basics | Basic ML for NLP (one-hot, BoW, TF-IDF, Word2Vec) | https://www.youtube.com/watch?v=ENLEjGozrio |
| 4 | DL for NLP | Complete Deep Learning for NLP playlist | https://www.youtube.com/playlist?list=PLZoTAELRMXVNNrHSKv36Lr3_156yCo6Nn |
| 5 | Transformer | In-depth Transformer explanation | https://www.youtube.com/watch?v=3bPhDUSAUYI |
| 6 | GenAI projects | Generative AI Tutorials With End-to-End Projects | https://www.youtube.com/playlist?list=PLA1lVIthbM1D5I6r5uY2K89X1KD2w5LNh |
| 7 | Agentic AI | Agentic AI Tutorials | https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO |
| 8 | Agentic frameworks | Agentic AI With Different Frameworks | https://www.youtube.com/playlist?list=PLZoTAELRMXVMBr14UQ30AFlnlQ7eL5wjl |
| 9 | Multimodal RAG | MultiModal RAGs | https://www.youtube.com/playlist?list=PLQxDHpeGU14D6dm0rmAXhdLeLYlX2zk7p |
| 10 | MCP | Model Context Protocol playlist | https://www.youtube.com/playlist?list=PLZoTAELRMXVPC8r1xF68Gksi241DAtMsK |

**Agentic frameworks (pick one, then learn the others by analogy):**

| Framework | One-line | Docs |
|-----------|----------|------|
| **LangChain + LangGraph** | Most mainstream; LangGraph for stateful graph-shaped agents | https://www.langchain.com/langgraph |
| **Agno (formerly Phidata)** | Python-native, type-safe agents; lighter than LangChain | https://github.com/agno-agi/agno |
| **CrewAI** | Role-based multi-agent ("crew of agents"); good for parallel research-style tasks | https://www.crewai.com |
| **AutoGen** | Microsoft Research; strong for conversational multi-agent + code execution | https://microsoft.github.io/autogen/ |
| **DSPy** | Stanford; *programmatic* prompt optimization — research-relevant | https://dspy.ai |
| **Pydantic-AI** | Type-safe agents leaning on Pydantic v2 | https://ai.pydantic.dev |
| **Claude Agent SDK** | Anthropic's official SDK; pairs natively with MCP | https://docs.anthropic.com/agents |

#### L2.5 Blogs & newsletters (scan weekly — don't subscribe to everything)

**Practitioner blogs (start here):**

| Source | Why it's worth reading | Link |
|--------|------------------------|------|
| **Simon Willison's blog** | Best practical LLM blog on the internet; daily updates on tools/tricks | https://simonwillison.net |
| **Anthropic Engineering blog** | First-party guidance on Claude, prompt caching, tool use, agents | https://www.anthropic.com/engineering |
| **OpenAI Cookbook** | First-party code examples; great for API patterns | https://cookbook.openai.com |
| **HuggingFace blog** | Open-model releases, fine-tuning guides, leaderboard analyses | https://huggingface.co/blog |
| **Lilian Weng's blog** | Long-form deep dives on agents, LLM hallucination, RLHF | https://lilianweng.github.io |
| **Chip Huyen's blog** | The SE4AI / MLOps perspective; author of *Designing ML Systems* | https://huyenchip.com |
| **Sebastian Raschka's Magazine** | Plain-language LLM internals; great for self-learners | https://magazine.sebastianraschka.com |
| **Eugene Yan's blog** | Recsys + LLM eval; very practical | https://eugeneyan.com |
| **Hamel Husain's blog** | Eval-driven LLM development; "AI for SWEs" framing | https://hamel.dev |
| **Phil Schmid's blog** | Production fine-tuning + serving (HF DevRel) | https://www.philschmid.de |

**Newsletters / podcasts:**

| Source | Format | Link |
|--------|--------|------|
| **The Batch** (DeepLearning.AI) | Weekly newsletter | https://www.deeplearning.ai/the-batch |
| **Sebastian Ruder's NLP newsletter** | Monthly NLP/LLM digest | https://newsletter.ruder.io |
| **Latent Space** (swyx + Alessio) | Newsletter + podcast — top AI engineer interviews | https://www.latent.space |
| **AI Engineer Pod / Summit talks** | Conference talks (free on YouTube) | https://www.youtube.com/@aiDotEngineer |
| **Last Week in AI** | Weekly research + industry roundup | https://lastweekin.ai |
| **Import AI** (Jack Clark) | Weekly research + policy briefing | https://importai.substack.com |
| **The Pragmatic Engineer** (Gergely Orosz) | Engineering practices — has growing AI coverage | https://newsletter.pragmaticengineer.com |
| **Stratechery on AI** | Strategic framing (paid, but essays often go free) | https://stratechery.com |

**SRE-flavored AI blogs:**

| Source | Why | Link |
|--------|-----|------|
| **Heinrich Hartmann** | "LLM as on-call copilot, not autopilot" — origin of the framing | https://heinrichhartmann.com |
| **Honeycomb blog** | "AI assistance for observability" — practical SRE-AI pattern essays | https://www.honeycomb.io/blog |
| **Datadog blog — AI/ML** | AIOps + LLM observability | https://www.datadoghq.com/blog |
| **Google SRE blog** | Increasingly publishing on AI-assisted on-call | https://sre.google/resources/blog |

---

### Level 3 — Advanced / Production

> **Senior AI-engineer tier.** Goal: operate AI infrastructure (vLLM clusters, eval pipelines, drift monitoring) and ship agentic systems safely. ~2 weeks at 12 hrs.

#### L3.1 Agents + MCP (Model Context Protocol)

**Anatomy of an agent:** loop = **perceive** (read tool output) → **reason** (LLM) → **act** (call tool / function). ReAct prompting + function calling is the substrate; orchestration frameworks add memory, retries, multi-agent coordination.

**MCP (2025 standard):** Anthropic's open protocol that lets any LLM client (Claude, Cursor, your custom app) talk to any tool server. Components: **MCP host** (the app), **MCP client** (in-app connector), **MCP server** (exposes tools). Build one server, plug into every agent.

**The SRE killer app:** an **incident-triage agent** with read-only tools — `get_recent_alerts`, `query_loki(service, window)`, `query_prom(promql)`, `read_runbook(name)`, `post_to_slack(channel, text)` — and a system prompt encoding your incident-response playbook. Heinrich Hartmann's framing: *LLM as copilot, not autopilot*. Always human-in-the-loop on actions that mutate state.

#### L3.2 AIOps & SRE-specific use cases

| Use case | Pattern | Where to start |
|----------|---------|----------------|
| **On-call copilot** | RAG over runbooks + recent postmortems; agent with read-only Prom/Loki tools | Start with retrieval; add tools only after retrieval is solid |
| **Log summarization & clustering** | Embed log lines → HDBSCAN cluster → LLM summarizes each cluster | Built over your Part B Phase 3 ELK stack |
| **Anomaly detection** | Classical (Prophet, isolation forest, ARIMA) ≫ LLMs for time-series. Use LLMs to *explain* anomalies, not to detect them | Grafana ML plugins, Anodot, Datadog Watchdog |
| **NL → PromQL / SQL** | Schema-aware prompt + few-shot examples; cite BIRD benchmark numbers in interviews | Vanna.ai (OSS, SQL), PromQL is small enough to DIY |
| **Postmortem assistant** | LLM extracts timeline from Slack + alert logs; drafts contributing-factors section | Mandatory human review — hallucination risk in incident docs is severe |
| **Runbook generation** | LLM drafts from recent incidents → human reviews → versions into Backstage | Always human-in-the-loop |
| **PR review for IaC** | Code-LLM + Semgrep/CodeQL on Terraform/K8s manifests | Atlantis + Aider/Claude as a comment-only reviewer |
| **Capacity forecasting** | Prophet/NeuralProphet for traffic; LLM for narrative + alerts | Classical ML wins; LLM is the wrapper |

#### L3.3 Operating AI in production — what SREs running ML infra need

You'll likely be asked to **operate** AI infrastructure long before you're asked to **build** AI features. Surface area:

| Concern | Tool / pattern |
|---------|----------------|
| **LLM serving** | vLLM (continuous batching, PagedAttention), TGI, TensorRT-LLM, SGLang. KV-cache, speculative decoding, FlashAttention 2/3 |
| **Quantization** | GPTQ, AWQ, GGUF, bitsandbytes — typically 4-bit/8-bit for cost-latency trade |
| **Throughput vs latency** | Continuous batching for throughput; speculative decoding for latency |
| **GPU fleet** | NVIDIA H100/A100; MIG slicing; spot/on-demand mix; Lambda Labs, RunPod, CoreWeave, Modal for burst |
| **Autoscaling** | KEDA on Kubernetes, queue-depth-based; warm pools / snapshots for cold-start |
| **Experiment tracking** | Weights & Biases (industry default), MLflow (OSS default), Neptune, Comet |
| **Eval pipelines in CI** | Langfuse traces + Ragas + GitHub Actions; treat eval failures like test failures |
| **Drift / regression** | Evidently AI, Arize, WhyLabs; alert on embedding-distance drift, not just latency |
| **Cost observability** | Per-tenant token accounting; Anthropic prompt caching; route to cheap models first, escalate to large only on failure |
| **Secrets / IAM** | Never embed API keys in containers; rotate via External Secrets Operator + Vault |
| **Compliance** | PII redaction in prompts; audit logs of every model call (SOC2 / HIPAA / PDPA) |

#### L3.4 AI Safety & Security (this is SRE work)

Safety **is** reliability in this space. SREs should be the loudest voice in the room on:

- **Prompt injection** — assume any text from a user / document / web page is hostile. Sanitize. Tag retrieved chunks with provenance; never let untrusted text issue tool calls.
- **Output validation** — JSON-schema validate every structured response (Pydantic, Outlines, Instructor). A malformed JSON should fail closed, not silently drop a field.
- **Bias & fairness** — content moderation API (OpenAI moderation, Anthropic content-mod, Perspective) as pre/post filter on user-facing surfaces.
- **End-user IDs** — pass `user_id` through to provider APIs for abuse tracing and per-user rate limiting.
- **Adversarial / red-team testing** — Promptfoo, DeepEval, Garak in CI; treat as a security regression suite.
- **Data leakage** — Anthropic ZDR (Zero Data Retention), OpenAI ZDR endpoints, or on-prem inference when handling regulated data.
- **Constraining inputs/outputs** — function calling > free-text where possible; the model can only emit values your schema allows.

#### L3.5 Advanced reading — books & papers

**Books (after L1.3):**

3. ***Hands-On Large Language Models*** — Jay Alammar & Maarten Grootendorst (2024). Best visual companion to embeddings, RAG, fine-tuning.
4. ***Building LLMs for Production*** — Bouchard & Peters. Practical patterns; lighter on theory.
5. ***Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow*** (3rd ed.) — Géron. Optional but useful if your ML background is shaky.

**Papers (skim — don't reproduce unless going PhD):**

| # | Paper | Why |
|---|-------|-----|
| 1 | Vaswani et al. 2017 — *Attention Is All You Need* | The transformer foundation. [arXiv](https://arxiv.org/abs/1706.03762) |
| 2 | Brown et al. 2020 — *Language Models are Few-Shot Learners* (GPT-3) | Few-shot prompting works. [arXiv](https://arxiv.org/abs/2005.14165) |
| 3 | Lewis et al. 2020 — *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks* | The original RAG paper. [arXiv](https://arxiv.org/abs/2005.11401) |
| 4 | Wei et al. 2022 — *Chain-of-Thought Prompting Elicits Reasoning in LLMs* | Why "think step by step" works. [arXiv](https://arxiv.org/abs/2201.11903) |
| 5 | Yao et al. 2022 — *ReAct: Synergizing Reasoning and Acting in Language Models* | Substrate for every modern agent. [arXiv](https://arxiv.org/abs/2210.03629) |
| 6 | Hoffmann et al. 2022 — *Training Compute-Optimal LLMs* (Chinchilla) | Sets the data-vs-params framing for model selection. [arXiv](https://arxiv.org/abs/2203.15556) |
| 7 | Schick et al. 2023 — *Toolformer: LMs Can Teach Themselves to Use Tools* | Origin of LLM tool use. [arXiv](https://arxiv.org/abs/2302.04761) |
| 8 | Sculley et al. 2015 — *Hidden Technical Debt in ML Systems* | The SE4AI canon — every ML platform engineer cites this. [NeurIPS](https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems) |
| 9 | Amershi et al. 2019 — *SE for ML: A Case Study* (Microsoft) | What real ML pipelines look like. [link](https://www.microsoft.com/en-us/research/publication/software-engineering-for-machine-learning-a-case-study/) |
| 10 | Anthropic 2024 — *Building Effective Agents* | The 2024 "Anthropic primer" — best opinionated agent-design doc. [link](https://www.anthropic.com/research/building-effective-agents) |

---

### Level 4 — Specialist / Cross-cutting

> **Senior+ tier.** Career and pattern-recognition material. Read once for context, revisit when planning a job switch or leading a project. Cross-cuts all earlier levels.

#### L4.1 APAC-specific signal (where AI-aware SRE pays off)

| Country / company | What "AI-aware SRE" means there in 2026 |
|---|---|
| **Singapore (Grab, Shopee, Sea, ByteDance/TikTok, Stripe SG)** | Multi-region vLLM/TGI clusters; AI-platform team often *inside* SRE org; NL→SQL for analytics is hot. |
| **Japan (PayPay, Mercari, Rakuten, LINE, SmartNews)** | Conservative on production AI; AIOps + log analysis are the entry points; Japanese-language LLM eval is a niche edge. |
| **Malaysia (Petronas, Maybank, Axiata, AirAsia)** | Heavy on regulated-industry RAG (compliance docs); fewer LLM-native startups. |
| **Thailand (Agoda, SCB, KBank, LINE MAN Wongnai)** | Agoda runs production LLM features in search/recommendations; SRE owns the inference latency SLO. |

**Interview signal:** mentioning that you've *operated* a vLLM cluster or that you've shipped an RAG-over-runbooks system to your own kind cluster is the differentiator. Almost no junior-SRE candidate has hands-on AI-infra experience yet — being in the first 10% is the entire edge.

#### L4.2 Antipatterns to avoid

- **"Let's fine-tune"** as the first instinct. Try prompts → RAG → tools → fine-tune, in that order.
- **Ungrounded LLM in incident response.** Hallucinated runbook steps will outage you. Provenance-tag every retrieved chunk; require citations in the response.
- **LLM in the critical path with no fallback.** Always have a deterministic fallback (cached answer, "I don't know," escalation to human).
- **No eval suite.** "Looks good" is not an SLO. Build Ragas/Promptfoo from day 1.
- **Vendor lock-in via SDK.** Use OpenRouter or LiteLLM so you can swap providers without rewriting application code.
- **Letting context windows grow unbounded.** Token cost is multiplicative; truncate, summarize, or compress.
- **Skipping safety until launch.** Prompt injection is exploitable from any untrusted text source (web pages, PDFs, even logs). Threat-model on day 1.

---

## <a id="part-a"></a>Part A — Full Software Lifecycle Mastery

### A1–A2. Plan + Code
- ADRs (architecture decision records) + C4 model for docs; STRIDE for threat modeling; capacity math (QPS/storage/bandwidth)
- Trunk-based development + conventional commits + pre-commit hooks (`gitleaks`, `trufflehog`, linting)
- Dependabot/Renovate for deps; SBOM awareness; Google Engineering Practices for code review

### A3–A4. Build + Deploy
- GitHub Actions: caching, matrix builds, parallelization; multi-stage Dockerfiles; distroless images
- Trivy/Grype image scanning; Cosign signing; `testcontainers` for integration tests; k6 for load testing
- Deployment strategies: blue-green, canary, rolling, feature flags — know when to use each
- GitOps: ArgoCD or Flux (THE K8s deployment pattern in 2026); Argo Rollouts for automated canary rollback
- Secrets: HashiCorp Vault, AWS Secrets Manager, External Secrets Operator — never commit secrets to Git

### A5–A6. Operate + Maintain
- **Four golden signals:** latency, traffic, errors, saturation (from Google SRE book)
- SLO/SLI/SLA with burn rate alerts (multi-window, multi-burn-rate — better than threshold alerts)
- Incident management: PagerDuty/Opsgenie, on-call rotations, runbooks, blameless postmortems
- Toil reduction: track toil %, automate repetitive tasks; quarterly capacity reviews

### A7. Cost Optimization
- FinOps phases: Inform → Optimize → Operate; FinOps Certified Practitioner cert (~6 hrs study)
- Right-sizing (Compute Optimizer), Savings Plans/RIs, Spot instances (90% off for stateless workloads)
- S3 Intelligent-Tiering + lifecycle to Glacier; VPC Endpoints to cut NAT Gateway costs
- Karpenter for K8s autoscaling (30–50% EC2 savings); tagging: Owner/Environment/CostCenter/Project

---

## <a id="part-b"></a>Part B — AWS, Kubernetes & Observability (Hands-On)

> Everything in this section is built around one project: a **Todo List app** (Go REST API + PostgreSQL) that you progressively containerize, deploy to Kubernetes, instrument with full observability, and push to production on AWS. Each phase produces a real artefact you can show in interviews.

---

### Project Overview: Todo List App

**Stack:** Go (API) + PostgreSQL (DB) + React or plain HTML (frontend)

**Endpoints to implement:**
```
GET    /todos          — list all todos
POST   /todos          — create todo
PUT    /todos/:id      — update todo
DELETE /todos/:id      — delete todo
GET    /health         — liveness probe
GET    /metrics        — Prometheus scrape endpoint
```

**Repo structure to aim for:**
```
todo-app/
├── api/               # Go service
├── frontend/          # static files served via S3 + CloudFront
├── k8s/               # Kubernetes manifests
├── helm/              # Helm chart
├── terraform/         # all AWS infrastructure as code
├── .github/workflows/ # CI/CD pipelines
└── docker-compose.yml # local dev environment
```

---

### Level 1 — Local & Containerized (Phases 1–2)

> **Beginner tier.** Goal: app runs in Docker locally and on a local Kubernetes cluster (kind). No cloud accounts needed. ~3–4 weeks.

#### Phase 1 — Build & Containerize

**Goal:** Run the app locally with Docker Compose.

**Steps:**
1. Write the Go API with `net/http` or `gin` — CRUD + `/health` + `/metrics`
2. Write a `Dockerfile` using multi-stage build:
```dockerfile
# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o todo-api ./cmd/api

# Final stage — distroless for minimal attack surface
FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/todo-api /todo-api
EXPOSE 8080
ENTRYPOINT ["/todo-api"]
```
3. Write `docker-compose.yml` — api + postgres + pgadmin services
4. Add `docker-compose.override.yml` for local hot-reload with Air
5. Scan image: `trivy image todo-api:latest`

**What you learn:** multi-stage builds, distroless images, image scanning, local service networking

---

#### Phase 2 — Kubernetes (Local with kind)

**Goal:** Deploy the Todo app on a local Kubernetes cluster.

**Install:** `kind` (Kubernetes in Docker) — zero cloud cost, runs on your laptop

```bash
kind create cluster --name todo-cluster
kubectl config use-context kind-todo-cluster
```

**Kubernetes manifests to write (`k8s/` folder):**

```
k8s/
├── namespace.yaml
├── configmap.yaml          # DB host, port, name
├── secret.yaml             # DB password (base64) — later replaced by External Secrets
├── deployment.yaml         # todo-api Deployment
├── service.yaml            # ClusterIP Service for api
├── ingress.yaml            # NGINX Ingress → /api routes
├── hpa.yaml                # HorizontalPodAutoscaler (CPU 60%)
└── postgres/
    ├── statefulset.yaml
    ├── service.yaml
    └── pvc.yaml
```

**Key concepts to implement in each manifest:**

`deployment.yaml` — must include:
```yaml
resources:
  requests: { cpu: "100m", memory: "128Mi" }
  limits:   { cpu: "500m", memory: "256Mi" }
livenessProbe:
  httpGet: { path: /health, port: 8080 }
  initialDelaySeconds: 10
readinessProbe:
  httpGet: { path: /health, port: 8080 }
  initialDelaySeconds: 5
```

**Commands to know:**
```bash
kubectl apply -f k8s/
kubectl get pods -n todo
kubectl logs -f deployment/todo-api -n todo
kubectl exec -it <pod> -n todo -- /bin/sh
kubectl rollout history deployment/todo-api -n todo
kubectl rollout undo deployment/todo-api -n todo   # rollback
kubectl top pods -n todo                            # requires metrics-server
```

**Helm chart:** Convert the manifests into a Helm chart under `helm/todo-app/`. Practice:
```bash
helm install todo ./helm/todo-app -f values.yaml
helm upgrade todo ./helm/todo-app --set image.tag=v1.2.0
helm rollback todo 1
helm template todo ./helm/todo-app | kubectl apply -f -
```

**RBAC exercise:** Create a ServiceAccount for the todo-api pod with least-privilege Role — only read ConfigMaps in its namespace.

**What you learn:** Deployments, Services, Ingress, HPA, StatefulSets, PVCs, RBAC, Helm

---

### Level 2 — Observability Stack (Phases 3–4)

> **Core tier.** Goal: full observability for a real service — logs, metrics, traces, alerts. The skill set every APAC SRE interview probes. ~4–6 weeks.

#### Phase 3 — ELK Stack (Logging)

**Goal:** Collect, ship, and search all logs from the Todo app via ELK.

**Stack:** Elasticsearch + Logstash + Kibana + Filebeat (sidecar or DaemonSet)

**Architecture:**
```
Todo API pod → stdout JSON logs
     ↓
Filebeat DaemonSet (reads /var/log/containers/*.log)
     ↓
Logstash (parse, enrich, filter)
     ↓
Elasticsearch (index + store)
     ↓
Kibana (search, dashboards, alerts)
```

**Deploy ELK on kind with Helm:**
```bash
helm repo add elastic https://helm.elastic.co
helm install elasticsearch elastic/elasticsearch -n logging --create-namespace
helm install kibana elastic/kibana -n logging
helm install logstash elastic/logstash -n logging
helm install filebeat elastic/filebeat -n logging
```

**Structured logging in Go — emit JSON logs:**
```go
import "go.uber.org/zap"

logger, _ := zap.NewProduction()
logger.Info("todo created",
    zap.String("id", todo.ID),
    zap.String("user_id", userID),
    zap.Int("duration_ms", elapsed),
)
```

**Logstash pipeline (`logstash.conf`):**
```
filter {
  json { source => "message" }
  date { match => ["ts", "ISO8601"] target => "@timestamp" }
  mutate { add_field => { "env" => "production" } }
}
```

**Kibana exercises:**
- Create an Index Pattern for `filebeat-*`
- Build a dashboard: request rate, error rate, top slow endpoints
- Set a Watcher alert: >10 errors/min → notify

**What you learn:** DaemonSet log collection, structured logging, Logstash pipelines, Kibana dashboards, index lifecycle management (ILM)

**OpenSearch — the AWS fork you'll see in APAC**

After Elastic's 2021 license change, AWS forked Elasticsearch 7.10 + Kibana into **OpenSearch + OpenSearch Dashboards** (Apache 2.0). Grab, Tokopedia, Bukalapak, and most teams on AWS run **Amazon OpenSearch Service** instead of self-hosted Elastic — the API surface is ~95% compatible, so everything you learned above transfers. Worth one focused weekend: spin up OpenSearch via docker-compose, repoint Logstash/Filebeat at it (same `elasticsearch` output, different host), reproduce the Kibana dashboard inside OpenSearch Dashboards.

**Resources — OpenSearch**

| Resource | Type |
|----------|------|
| [OpenSearch official docs](https://docs.opensearch.org/) | Authoritative — install, indexing, search, security, ISM (index state management = ILM equivalent) |
| [OpenSearch Project — getting started](https://docs.opensearch.org/latest/getting-started/) | The "first hour" tutorial — docker-compose, first index, first query |
| [Amazon OpenSearch Service docs](https://docs.aws.amazon.com/opensearch-service/) | Managed-service specifics: domain sizing, UltraWarm/cold storage tiers, fine-grained access, VPC + SAML |
| [OpenSearch — official YouTube channel](https://www.youtube.com/@OpenSearchProject) | OpenSearchCon recordings + feature deep dives |
| [OpenSearch Playground](https://playground.opensearch.org/) | Live demo cluster with sample data — no signup needed |
| [opensearch-project/opensearch-k8s-operator](https://github.com/opensearch-project/opensearch-k8s-operator) | Kubernetes operator — drop-in replacement for the Elastic ECK pattern |
| [Elastic vs OpenSearch — feature matrix](https://opensearch.org/faq/) | Read once so you can answer the inevitable "why did you pick X?" interview question |
| [OpenSearch Benchmark](https://opensearch.org/docs/latest/benchmark/) | The official perf-testing tool — run it against both Elastic and OpenSearch to form your own opinion |

---

#### Phase 4 — Observability (Metrics + Traces + Alerts)

**Goal:** Full three-pillar observability on the Todo app.

#### Metrics — Prometheus + Grafana

**Instrument the Go API:**
```go
import "github.com/prometheus/client_golang/prometheus"

var httpDuration = prometheus.NewHistogramVec(prometheus.HistogramOpts{
    Name:    "http_request_duration_seconds",
    Buckets: prometheus.DefBuckets,
}, []string{"method", "path", "status"})

// Expose at GET /metrics via promhttp.Handler()
```

**Deploy Prometheus + Grafana on K8s:**
```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus-stack prometheus-community/kube-prometheus-stack -n monitoring
```

**PromQL queries to write:**
```promql
# Request rate
rate(http_request_duration_seconds_count[5m])

# Error rate (5xx)
sum(rate(http_request_duration_seconds_count{status=~"5.."}[5m]))
  / sum(rate(http_request_duration_seconds_count[5m]))

# p99 latency
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# CPU throttling
rate(container_cpu_cfs_throttled_seconds_total[5m])
```

**Grafana dashboards to build:**
- Four Golden Signals (latency, traffic, errors, saturation)
- Pod CPU/memory vs requests/limits
- PostgreSQL query rate and connection pool usage

**Alerting rules to write:**
```yaml
- alert: HighErrorRate
  expr: |
    sum(rate(http_request_duration_seconds_count{status=~"5.."}[5m]))
    / sum(rate(http_request_duration_seconds_count[5m])) > 0.05
  for: 2m
  labels: { severity: critical }
  annotations:
    summary: "Error rate > 5% for 2 minutes"
```

#### Traces — OpenTelemetry + Jaeger

**Instrument Go API with OTel:**
```go
import "go.opentelemetry.io/otel"

tracer := otel.Tracer("todo-api")
ctx, span := tracer.Start(ctx, "CreateTodo")
defer span.End()

// Add attributes
span.SetAttributes(attribute.String("todo.id", id))

// Record errors
span.RecordError(err)
span.SetStatus(codes.Error, err.Error())
```

**Deploy Jaeger:**
```bash
helm repo add jaegertracing https://jaegertracing.github.io/helm-charts
helm install jaeger jaegertracing/jaeger -n monitoring
```

**What to trace:** HTTP handler → DB query → external call. Check Jaeger UI for slow spans and N+1 query patterns.

#### SRE Concepts to Apply

- **SLO:** Define `99.5% of requests complete in < 300ms over 30 days`
- **Error budget:** `0.5% of 30-day requests = ~2.2 hrs downtime allowed`
- **Burn rate alert:** Alert when 1-hr burn rate > 14.4× (exhausts monthly budget in 2 hrs)
- **Runbook:** Write one for the `HighErrorRate` alert — check logs → check DB connections → rollback steps

**What you learn:** RED metrics, four golden signals, PromQL, OTel instrumentation, distributed tracing, SLO/burn-rate alerting

---

### Level 3 — Production on AWS (Phases 5–7)

> **Advanced tier.** Goal: ship the same app to AWS with EKS + RDS + ALB, codified in Terraform, deployed via GitHub Actions. Senior-SRE interview territory. ~6–10 weeks.

#### Phase 5 — AWS Deployment

**Goal:** Deploy the production-grade Todo app on AWS using core services.

#### AWS Services Used in This Project

| Service | Role in Todo App | Key concepts |
|---------|-----------------|--------------|
| **VPC** | Network isolation | 2 public + 2 private subnets across 2 AZs; NAT Gateway; security groups |
| **EC2** | Bastion / jump host | Key pair, security group rules, instance connect |
| **S3** | Frontend static files + Terraform state | Versioning, bucket policy, static website hosting |
| **CloudFront** | CDN for frontend | Distribution, origin access control (OAC), cache behaviors |
| **EKS** | Run the Go API | Managed node groups, IRSA for pod-level AWS permissions |
| **RDS (PostgreSQL)** | Production database | Multi-AZ, automated backups, parameter group, subnet group |
| **ALB** | Load balancer for K8s | AWS Load Balancer Controller, target groups, HTTPS listener |
| **ACM** | TLS certificate | DNS validation via Route 53 |
| **Route 53** | DNS | A-record alias to ALB; health checks |
| **ECR** | Container registry | Image lifecycle policy; scan on push |
| **Secrets Manager** | DB password, API keys | External Secrets Operator pulls into K8s Secrets |
| **IAM** | Permissions | IRSA role for EKS pods; least-privilege policies |
| **CloudWatch** | Logs + alarms | Container Insights on EKS; log groups; metric filters |
| **CloudTrail** | Audit log | All API calls; S3 bucket + SNS alert on root login |
| **GuardDuty** | Threat detection | Enable in all regions; findings → EventBridge → SNS |

#### Deployment Architecture

```
Internet
    │
Route 53 (todo.yourdomain.com)
    ├── A record → CloudFront → S3 (frontend)
    └── api.todo.yourdomain.com → ALB
                                    │
                              EKS Cluster
                          ┌───────────────────┐
                          │  todo-api pods     │
                          │  (Deployment x3)   │
                          └────────┬──────────┘
                                   │ IRSA (IAM role)
                          ┌────────▼──────────┐
                          │  RDS PostgreSQL    │
                          │  (private subnet)  │
                          └───────────────────┘
```

#### Step-by-Step AWS Setup

**Step 1 — VPC (Terraform):**
```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.0.0"

  name = "todo-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["ap-southeast-1a", "ap-southeast-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true  # cost saving for non-prod

  tags = {
    "kubernetes.io/cluster/todo-cluster" = "shared"
  }
}
```

**Step 2 — ECR + push image:**
```bash
aws ecr create-repository --repository-name todo-api --region ap-southeast-1
aws ecr get-login-password | docker login --username AWS --password-stdin <account>.dkr.ecr.ap-southeast-1.amazonaws.com
docker build -t todo-api .
docker tag todo-api:latest <account>.dkr.ecr.ap-southeast-1.amazonaws.com/todo-api:v1.0.0
docker push <account>.dkr.ecr.ap-southeast-1.amazonaws.com/todo-api:v1.0.0
```

**Step 3 — EKS cluster (Terraform):**
```hcl
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.0.0"

  cluster_name    = "todo-cluster"
  cluster_version = "1.29"
  vpc_id          = module.vpc.vpc_id
  subnet_ids      = module.vpc.private_subnets

  eks_managed_node_groups = {
    default = {
      min_size     = 2
      max_size     = 5
      desired_size = 2
      instance_types = ["t3.medium"]
    }
  }
}
```

**Step 4 — IRSA (IAM Roles for Service Accounts):**
```bash
# Let todo-api pod read from Secrets Manager — no hardcoded AWS keys
eksctl create iamserviceaccount \
  --name todo-api \
  --namespace todo \
  --cluster todo-cluster \
  --attach-policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite \
  --approve
```

**Step 5 — RDS PostgreSQL:**
```hcl
module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  identifier = "todo-db"
  engine     = "postgres"
  engine_version = "15"
  instance_class = "db.t3.micro"
  allocated_storage = 20
  multi_az   = true
  db_subnet_group_name   = aws_db_subnet_group.todo.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  skip_final_snapshot    = false
}
```

**Step 6 — S3 + CloudFront for frontend:**
```bash
# Build frontend
npm run build

# Sync to S3
aws s3 sync ./build s3://todo-frontend-bucket --delete

# Invalidate CloudFront cache after deploy
aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"
```

**Step 7 — ALB Ingress Controller:**
```bash
helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=todo-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

Then annotate the Ingress:
```yaml
annotations:
  kubernetes.io/ingress.class: alb
  alb.ingress.kubernetes.io/scheme: internet-facing
  alb.ingress.kubernetes.io/certificate-arn: arn:aws:acm:...
  alb.ingress.kubernetes.io/listen-ports: '[{"HTTPS":443}]'
```

---

#### Phase 6 — IaC with Terraform

**Folder structure (remote state on S3 + DynamoDB lock):**
```
terraform/
├── backend.tf          # S3 bucket + DynamoDB for state lock
├── main.tf
├── variables.tf
├── outputs.tf
├── modules/
│   ├── vpc/
│   ├── eks/
│   ├── rds/
│   └── s3-cloudfront/
└── environments/
    ├── dev/
    └── prod/
```

**Remote state setup:**
```hcl
terraform {
  backend "s3" {
    bucket         = "todo-tfstate"
    key            = "prod/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "todo-tfstate-lock"
    encrypt        = true
  }
}
```

**Key Terraform commands:**
```bash
terraform init          # download providers, configure backend
terraform plan          # preview changes
terraform apply         # apply changes
terraform destroy       # tear down (use carefully)
terraform import        # import existing resource into state
terraform state list    # list resources in state
terraform output        # print outputs (EKS endpoint, RDS address, etc.)
```

---

#### Phase 7 — CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Build → Test → Push → Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::${{ secrets.AWS_ACCOUNT_ID }}:role/github-actions
          aws-region: ap-southeast-1
      - name: Build, scan, push to ECR
        run: |
          docker build -t todo-api .
          trivy image --exit-code 1 --severity HIGH,CRITICAL todo-api
          docker tag todo-api $ECR_REGISTRY/todo-api:$GITHUB_SHA
          docker push $ECR_REGISTRY/todo-api:$GITHUB_SHA
      - name: Deploy to EKS
        run: |
          aws eks update-kubeconfig --name todo-cluster --region ap-southeast-1
          helm upgrade todo ./helm/todo-app \
            --set image.tag=$GITHUB_SHA \
            --atomic --timeout 5m
```

---

### AWS Cost Checklist (memorize for interviews)

1. Right-size EC2 / RDS with AWS Compute Optimizer
2. Savings Plans / RIs for steady-state EKS nodes and RDS
3. Spot instances for non-critical / batch workloads (up to 90% off)
4. Delete unattached EBS volumes, old snapshots, unused Elastic IPs
5. S3 lifecycle policies → Intelligent-Tiering → Glacier for cold data
6. VPC Endpoints for S3 / Secrets Manager to eliminate NAT Gateway data charges
7. Schedule dev EKS node groups and RDS to stop nights/weekends (~65% saving)
8. Karpenter for K8s node autoscaling (bin-packing + Spot-first)
9. Audit cross-AZ and cross-region data transfer costs
10. Enable Cost Anomaly Detection for ML-based spend alerts

### SRE Core Concepts

- **Error budgets** — allow X mins downtime/quarter; once exhausted, freeze features → fix reliability
- **Burn rate alerts** — multi-window, multi-burn-rate (Google's approach; far better than threshold alerts)
- **Runbooks** — every alert links to one; write a runbook for every Prometheus alert you create
- **Postmortems** — blameless format; read 5 public postmortems (Cloudflare, GitHub, AWS)
- **Must-read:** Google SRE Book (free at sre.google/books), chapters 1–6 + 11–18

### Certification Path

1. **AWS SAA-C03** — Stephane Maarek (Udemy $10–15) + Tutorials Dojo practice exams. KodeKloud's [AWS SAA course](https://kodekloud.com/courses/aws-saa) for browser labs in real AWS. 6–8 weeks.
2. **CKA** — Mumshad Mannambeth ([KodeKloud CKA course](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/)). THE K8s credential. $395 (often $245 with CNCF discounts). Quarterly content refresh, CNCF-endorsed.
3. **Terraform Associate** — $70.50. Quick win. [KodeKloud TA-004 prep](https://kodekloud.com/courses/hashicorp-certified-terraform-associate-004) + free HashiCorp Learn tutorials.
4. **AWS DevOps Pro** — optional next step after SAA for AWS depth; ~3 months prep. KodeKloud's [AWS DevOps Engineering](https://kodekloud.com/courses/aws-certified-devops-engineering).
5. **Optional next:** [CKS](https://kodekloud.com/courses/certified-kubernetes-security-specialist-cks) (K8s security), [PCA](https://kodekloud.com/courses/prometheus-certified-associate-pca) (Prometheus), [OTCA](https://kodekloud.com/courses/prep-course-opentelemetry-certified-associate-certification-otca) (OpenTelemetry) — pick the one that matches the job description.

**GCP awareness:** Know GKE, BigQuery, Cloud Run conceptually (Mercari, LINE, Indeed Japan use GCP heavily).

---

## <a id="part-d"></a>Part D — System Design for SRE/DevOps Interviews

SRE system design differs from SWE — interviewers also ask about reliability, observability, deployment, and cost. Sorted by difficulty below; expect L1–L2 in junior rounds, L2–L3 in mid, L3–L4 in senior.

---

### Level 1 — Foundations

> **Beginner tier.** Goal: vocabulary + back-of-envelope math + the canonical primitives. Read first; you cannot reason about anything else without these.

**Topics:**
- Back-of-envelope estimation: QPS, storage, bandwidth (e.g., "design Twitter at 500M DAU"). The single skill that interviewers test for in *every* round.
- Read vs write paths; stateless vs stateful services
- Load balancers (L4 vs L7); reverse proxies (nginx, Envoy)
- DNS basics, CDN basics, HTTPS basics
- Caching primitives: TTL, eviction policies (LRU/LFU), cache-aside vs write-through

**Resources:**
1. **"System Design Interview Vol 1"** (Alex Xu) — start here. Easy reading, mock-interview-shaped.
2. **ByteByteGo** newsletter + YouTube — visual explainers; pairs with Alex Xu's books.
3. Hello Interview *Basics* playlist (see Part J).

---

### Level 2 — Core

> **Working tier.** Goal: design a typical mid-scale system end-to-end. This is what mid-level (3–5 YOE) APAC SRE rounds probe.

**Topics:**
- **Database scaling:** read replicas, sharding strategies (range / hash / geo), partitioning trade-offs
- **Caching strategies:** Redis, Memcached, cache-aside vs read-through vs write-back; cache stampede; consistent hashing
- **Message queues:** Kafka vs RabbitMQ vs SQS — durability vs throughput vs ordering vs delivery semantics; know when to use each
- **API design:** REST, gRPC, GraphQL trade-offs; idempotency keys; pagination
- **Background processing:** workers + queues; cron vs event-driven
- **Storage tiers:** object (S3) vs block (EBS) vs file (EFS); hot/warm/cold

**Resources:**
1. **"Designing Data-Intensive Applications"** (Kleppmann) — THE book. Chapters 1–6 are L2; the rest are L3. Non-negotiable.
2. **"Understanding Distributed Systems"** (Vitillo) — good middle-ground depth between Alex Xu and DDIA.
3. **"System Design Interview Vol 2"** (Alex Xu) — harder walkthroughs.
4. Hello Interview *Deep Dives* + *Walkthroughs* (Easy + Medium) — see Part J.

---

### Level 3 — Advanced

> **Senior tier.** Goal: design highly-available, multi-region systems with explicit reliability budgets. Senior SRE rounds (Grab, Mercari Staff+) target this depth.

**Topics:**
- **High availability:** multi-AZ, multi-region (active-active vs active-passive); failover strategies; quorum
- **Consistency models:** strong, eventual, causal, read-your-writes, monotonic-reads — when to pick which
- **Consensus:** Raft and Paxos *enough to reason about* (not necessarily to implement); leader election; split-brain
- **Distributed transactions:** 2PC, Saga pattern, outbox pattern; idempotency
- **Resilience patterns:** circuit breakers, bulkheads, timeouts, retries with jitter, hedged requests, dead-letter queues
- **CDC pipelines:** Debezium → Kafka → consumers; log-based replication
- **Geo-distributed databases:** Spanner, CockroachDB, Aurora Global, DynamoDB Global Tables — trade-offs

**Resources:**
1. **DDIA chapters 7–12** — transactions, consistency, consensus, batch + stream
2. **MIT 6.824 lectures** (see Part SRE → Foundational University Course Videos)
3. Hello Interview *Walkthroughs* (Hard tier — Uber, YouTube, Ad Click Aggregator)
4. **"Database Internals"** (Petrov) — for storage-engine-level depth

---

### Level 4 — Specialist (SRE Flavor)

> **Staff/Principal tier.** Goal: design *for reliability as a first-class output*, not just functionality. SRE-flavored questions that explicitly test deployment, observability, and cost — where SRE candidates beat SWE candidates.

**SRE-flavored interview questions (practice these specifically):**

| Difficulty | Question | What it tests |
|------------|----------|---------------|
| Hard | Design a CI/CD pipeline for 200 microservices | Build orchestration, dependency graphs, rollout strategy |
| Hard | Design monitoring + alerting for a system handling 1M req/sec | SLOs, burn-rate alerts, cardinality control, alert routing |
| Hard | Design a log aggregation pipeline for 10 TB/day | Ingest fan-in, retention tiers, query latency, cost |
| Hard | Design a multi-region active-active database setup | Conflict resolution, replication lag, failover semantics |
| Hard | Design a blue-green deployment system across 3 regions | Traffic shifting, health gates, rollback automation |
| Hard | Design a feature-flag service | Real-time updates at edge, audit, per-tenant config |
| Hard | Design a secrets-management system | KMS, rotation, sealed secrets, audit, breakglass |
| Specialist | Design an AI inference platform (vLLM cluster) for 100k req/min | GPU scheduling, KV-cache, autoscaling, cost (cross-reference Part AI L3.3) |

**Resources:**
1. **"Building Secure & Reliable Systems"** (Google) — the SRE+Security book; covers system-design-for-reliability explicitly.
2. **Google SRE workbook** chapters on SLO implementation + practical alerting.
3. **High Scalability blog** — real-world architectures at scale.
4. **AWS Architecture Blog** — Well-Architected reviews of production systems.

---

## <a id="part-g"></a>Part G — APAC Job Search

### Singapore

| Company | Careers |
|---------|---------|
| Grab | https://grab.careers |
| Shopee / Sea Group | https://careers.sea.com |
| ByteDance / TikTok | https://jobs.bytedance.com |
| Stripe | https://stripe.com/jobs |
| GovTech Singapore | https://careers.tech.gov.sg |
| DBS Bank | https://www.dbs.com/careers |
| OCBC Bank | https://www.ocbc.com/group/careers |
| UOB | https://www.uobgroup.com/careers |
| Ninja Van | https://careers.ninjavan.co |
| Carousell | https://careers.carousell.com |
| Razer | https://careers.razer.com |
| Circles.Life | https://circles.life/careers |
| Lazada | https://careers.lazada.com |
| Gojek | https://www.gojek.com/en-id/careers |
| Wise | https://www.wise.jobs |
| Confluent | https://www.confluent.io/careers |
| Datadog | https://careers.datadoghq.com |
| Cloudflare | https://www.cloudflare.com/careers |
| Zendesk | https://jobs.zendesk.com |
| Twilio | https://www.twilio.com/en-us/company/jobs |
| Palantir | https://www.palantir.com/careers |
| Mastercard | https://careers.mastercard.com |
| Standard Chartered | https://www.sc.com/en/careers |
| Singtel | https://careers.singtel.com |
| ST Engineering | https://careers.stengg.com |
| Synapxe (IHiS) | https://www.synapxe.sg/careers |
| Traveloka | https://www.traveloka.com/en-sg/careers |
| Foodpanda | https://careers.foodpanda.com |
| PropertyGuru | https://www.propertyguru.com.sg/property-management-news/careers |
| Carro | https://carro.co/careers |
| Nium | https://www.nium.com/careers |

### Japan

| Company | Careers |
|---------|---------|
| Mercari / Merpay | https://careers.mercari.com |
| PayPay | https://about.paypay.ne.jp/en/career |
| Rakuten | https://global.rakuten.com/corp/careers |
| Indeed Japan | https://www.indeed.jobs |
| Woven by Toyota | https://woven.toyota/en/careers |
| LINE / LY Corp | https://careers.lycorp.co.jp/en |
| Cybozu | https://cybozu.co.jp/recruit |
| SmartNews | https://careers.smartnews.com |
| Moneyforward | https://corp.moneyforward.com/recruit |
| DeNA | https://dena.com/intl/careers |
| Sansan | https://jp.corp-sansan.com/recruit |
| Freee | https://jobs.freee.co.jp |
| Recruit Holdings | https://www.recruit.co.jp/employment |
| Cookpad | https://cookpad.jobs |
| M3 (m3.com) | https://corporate.m3.com/recruit |
| Dwango / Niconico | https://dwango.co.jp/recruit |
| CADDi | https://caddi.com/careers |
| Preferred Networks | https://preferred.jp/en/careers |
| NTT Data | https://www.nttdata.com/global/en/careers |
| Fujitsu | https://careers.fujitsu.com |
| Sony | https://www.sony.com/en/SonyInfo/Jobs |
| Toyota Connected | https://www.toyotaconnected.co.jp/recruit |
| Globis | https://job.globis.co.jp |
| SmartHR | https://smarthr.co.jp/recruit |
| Aiming | https://aiming-inc.com/ja/recruit |

### Malaysia

| Company | Careers |
|---------|---------|
| Grab (KL) | https://grab.careers |
| Shopee (KL) | https://careers.sea.com |
| ByteDance (KL) | https://jobs.bytedance.com |
| Axiata / Celcom | https://axiata.com/careers |
| CIMB | https://www.cimb.com/en/careers.html |
| Maybank | https://www.maybank.com/en/careers.page |
| Telekom Malaysia | https://www.tm.com.my/Careers |
| AirAsia / Capital A | https://careers.airasia.com |
| Fusionex | https://www.fusionex-international.com/careers |
| Maxis | https://www.maxis.com.my/maxis-for-you/careers |
| Lazada (KL) | https://careers.lazada.com |
| Agoda (KL) | https://careersatagoda.com |
| Foodpanda Malaysia | https://careers.foodpanda.com |
| GXBank | https://www.gxbank.com.my/careers |
| Touch 'n Go | https://www.touchngo.com.my/careers |
| Boost Holdings | https://www.myboost.com.my/careers |
| RHB Bank | https://careers.rhbgroup.com |
| Public Bank | https://www.publicbankgroup.com/Career |
| PETRONAS | https://www.petronas.com/career |
| Luno | https://luno.com/en/careers |
| iPay88 | https://www.ipay88.com.my/careers |
| Pos Malaysia | https://www.pos.com.my/careers |
| MyEG | https://www.myeg.com.my/career |
| Astro | https://www.astro.com.my/corporate/careers |

### Thailand

| Company | Careers |
|---------|---------|
| Agoda | https://careersatagoda.com |
| LINE MAN Wongnai | https://lmwn.com/career |
| SCB 10X | https://www.scb10x.com/careers |
| Kasikorn Bank (KBank) | https://kasikornbank.com/en/career |
| True Digital | https://www.truedigital.com/en/career |
| Ascend Money | https://www.ascendmoney.io/careers |
| Grab (Bangkok) | https://grab.careers |
| Lazada (Bangkok) | https://careers.lazada.com |
| Foodpanda Thailand | https://careers.foodpanda.com |
| Shopee Thailand | https://careers.sea.com |
| ByteDance (Bangkok) | https://jobs.bytedance.com |
| Krungsri (Bank of Ayudhya) | https://www.krungsri.com/en/careers |
| Bangkok Bank | https://www.bangkokbank.com/en/careers |
| KBTG (KBank Tech) | https://kbtg.tech/career |
| PTT Digital | https://www.pttdigital.com/en/career |
| Siam Commercial Bank (SCB) | https://careers.scb.co.th |
| AIS (Advance Info Service) | https://career.ais.th |
| Flash Express | https://www.flashexpress.co.th/career |
| Omise / Opn | https://opn.ooo/careers |
| 2C2P | https://2c2p.com/careers |
| Central Tech | https://www.centraltech.io/careers |
| Bitkub | https://www.bitkub.com/careers |

---

## <a id="part-h"></a>Part H — Interview Preparation

### Full Interview Loop (typical SRE/DevOps, 5 rounds)
1. **Recruiter screen** (30 min) — background, salary expectations, visa status
2. **Hiring manager call** (45 min) — career narrative, role fit, technical context
3. **Coding round** (60 min) — 1–2 LeetCode mediums OR debugging exercise
4. **System design** (60 min) — design a scalable/reliable system
5. **Behavioral / culture fit** (45 min) — STAR questions, values alignment

Some add: take-home (PayPay), live K8s/Terraform troubleshooting (Agoda/Shopee), bar raiser round.

### 8 STAR Stories to Write Out and Memorize
1. Production incident you handled (diagnosis → fix → prevention)
2. Disagreed with a senior engineer (how you raised it, outcome)
3. Took initiative without being asked (spotted problem, owned result)
4. Failure or mistake (honest + learning + behavior change)
5. Mentored or helped a teammate
6. Technical decision with trade-offs (shows holistic thinking)
7. Improved a process or system (quantify the impact)
8. Missed a deadline (honest framing + communication + lessons)

### Questions to Ask the Interviewer
- "How do you measure SRE success here — SLO-driven, ticket throughput, project delivery, or a mix?"
- "What does on-call look like — frequency, escalation paths, post-incident process?"
- "How does the team balance reliability investment against feature delivery pressure?"
- "What would success in the first 90 days look like?"

### Salary Negotiation
- **Research:** levels.fyi + NodeFlair (SG) + TokyoDev salary data
- **At recruiter screen:** "I'd love to understand the band for this role first" (never anchor first)
- **After offer:** thank → ask for 2–5 days → negotiate in writing → ask for total package (base + bonus + RSU + relocation + sign-on)
- **Realistic uplift:** 5–15% if you have another offer or clear market data

---

## <a id="part-i"></a>Part I — Personal Branding

### GitHub Repos to Build (pin these 6)
1. `aws-observability-stack` — Terraform + Helm for Prom/Grafana/Loki/Tempo on EKS
2. `go-microservice-template` — production-ready Go service (12-factor, OTel, CI/CD, K8s manifests)
3. `aws-cost-analyzer` — Go CLI that audits AWS account for cost optimization opportunities
4. `k8s-secure-pipeline` — CI pipeline: SAST + DAST + image scanning + Cosign signing
5. `terraform-aws-modules` — reusable secure Terraform modules
6. `sre-runbook-templates` — runbook/postmortem/ADR markdown templates

### Blog Topics (1 post every 3–4 weeks, 1,500–3,000 words)
- "How I passed AWS SAA in 6 weeks"
- "Building full observability: Prometheus + Grafana + Loki + Tempo on K8s"
- "5 AWS cost optimizations that actually moved the needle"
- "From Jenkins to GitHub Actions: a real migration walkthrough"
- "Postmortem: what I learned from [Cloudflare/GitHub public incident]"

Cross-post to dev.to, Hashnode, Medium. Share on LinkedIn. 3 months consistent posting → recruiter inbound.

---

## <a id="part-j"></a>Part J — Resources

### Must-Read Books
1. **"Designing Data-Intensive Applications"** (Kleppmann) — THE most important. All 12 chapters.
2. **"Site Reliability Engineering"** (Google) — FREE at sre.google/books. Chapters 1–6, 11–18.
3. **"The Site Reliability Workbook"** (Google) — FREE. Practical companion to SRE book.
4. **"Terraform: Up & Running"** (Brikman, 3rd ed.)
5. **"Kubernetes Up & Running"** (Burns, Hightower)
6. **"Learning Go"** (Bodner, O'Reilly)
7. **"System Design Interview Vol 1 & 2"** (Alex Xu)
8. **"The Phoenix Project"** (Gene Kim) — fiction; fast read; essential DevOps culture context

### Courses *(sorted: free starters → cloud fundamentals → K8s → IaC → observability → specialty)*

| Course | Platform | Cost |
|--------|----------|------|
| A Tour of Go | tour.golang.org | FREE |
| Terraform AWS Track | learn.hashicorp.com | FREE |
| [KodeKloud SRE Learning Path](https://kodekloud.com/learning-path/site-reliability-engineer) (full sequence) | KodeKloud | Same sub |
| [Fundamentals of SRE](https://kodekloud.com/courses/fundamentals-of-sre) + [Chaos Engineering](https://kodekloud.com/courses/chaos-engineering) | KodeKloud | Same sub |
| AWS SAA-C03 (Stephane Maarek) | Udemy | $10–15 on sale |
| SAA Practice Exams (Jon Bonso) | Tutorials Dojo | $15 |
| [Terraform Associate 004](https://kodekloud.com/courses/hashicorp-certified-terraform-associate-004) | KodeKloud | Same sub |
| [CKA — Mumshad Mannambeth](https://kodekloud.com/courses/certified-kubernetes-administrator-cka/) | KodeKloud | Sub (~$30/mo) |
| [CKAD](https://kodekloud.com/courses/certified-kubernetes-application-developer-ckad) / [CKS](https://kodekloud.com/courses/certified-kubernetes-security-specialist-cks) | KodeKloud | Same sub |
| [Prometheus (PCA)](https://kodekloud.com/courses/prometheus-certified-associate-pca) + [OpenTelemetry (OTCA)](https://kodekloud.com/courses/prep-course-opentelemetry-certified-associate-certification-otca) | KodeKloud | Same sub |
| FinOps Certified Practitioner | finops.org | $325 |

### Job Platforms

| Country | Primary | Secondary |
|---------|---------|-----------|
| Singapore | LinkedIn + referrals | NodeFlair, MyCareersFuture |
| Japan | TokyoDev, Japan Dev | LinkedIn (Wahl+Case, Robert Walters), Wantedly |
| Malaysia | JobStreet | LinkedIn, Hiredly |
| Thailand | careers.agoda.com | LinkedIn, JobsDB |

### Practice Platforms
- **NeetCode** (neetcode.io) — free curated LeetCode 150 roadmap
- **LeetCode** (leetcode.com) — Premium ($35/mo) unlocks company-specific filters
- **Pramp** (pramp.com) — FREE peer mock interviews
- **interviewing.io** ($200–400/session) — FAANG engineer mocks; best investment for 2–3 sessions
- **Hello Interview** (hellointerview.com) — system design mocks + walkthroughs
- **killer.sh** — CKA exam simulator (free attempts included with CKA registration)

### Language

**Go**
- [Go: The Complete Developer's Guide (Stephen Grider)](https://www.udemy.com/course/go-the-complete-developers-guide/?srsltid=AfmBOoqsRzAwkSqQa_Fms2yQ0tGKLd8GANL0-tUZ0kqm4V1PH1LZkVGg&couponCode=MT260601G1) — Udemy · paid · concurrency, interfaces, web servers
- [Golang Tutorial for Beginners — Full Go Course](https://www.youtube.com/watch?v=yyUHQIec83I) — YouTube · free · syntax + idioms walkthrough

**Python / FastAPI**
- [FastAPI — The Complete Course](https://www.udemy.com/course/fastapi-the-complete-course/?srsltid=AfmBOopBXaxC6W_UHp0C4diA5h1pZPGvGJHw-z5BBh1Xiia3WsOGUgtX&couponCode=MT260601G1) — Udemy · paid · async API, Pydantic, OpenAPI, auth
- [Python Tutorial for Beginners — Learn Python in 5 Hours [Full Course]](https://www.youtube.com/watch?v=t8pPdKYpowI) — YouTube · free · language fundamentals from scratch

---

### System Design Video Resources (Hello Interview — YouTube)

> All playlists are from the Hello Interview channel. Watch in the order listed below: Basics first, then Deep Dives, then Walkthroughs. LLD and Hello Interviews are supplementary.

#### Playlist 1 — Basics (Start Here)
> Core building blocks — watch before any deep dives or walkthroughs

| # | Video | Link |
|---|-------|------|
| 1 | Kafka vs RabbitMQ | https://www.youtube.com/watch?v=1HOVtQ-_fcE |
| 2 | Message Queues in System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=1ISRd0bS714 |
| 3 | Caching in System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=1NngTUYPdpI |
| 4 | Sharding in System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=L521gizea4s |
| 5 | Data Modeling in System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=TUcPS6dsWx4 |
| 6 | API Design in System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=DQ57zYedMdQ |
| 7 | Object Storage in System Design Interviews w/ Ex-Meta Staff Engineer | https://www.youtube.com/watch?v=RvaMHMxHjp4 |
| 8 | How to Prepare for System Design Interviews w/ Meta Staff Engineer | https://www.youtube.com/watch?v=Ru54dxzCyD0 |
| 9 | Consistent Hashing: Easy Explanation for System Design Interviews | https://www.youtube.com/watch?v=vccwdhfqIrI |
| 10 | Recommendation System Infra Basics | https://www.youtube.com/watch?v=GncgOIiMII8 |

#### Playlist 2 — Deep Dives
> Technology internals — watch when a walkthrough references a tech you don't fully understand

| # | Video | Link |
|---|-------|------|
| 1 | Kafka System Design Deep Dive | https://www.youtube.com/watch?v=DU8o-OTeoCc |
| 2 | Redis Deep Dive w/ Ex-Meta Senior Manager | https://www.youtube.com/watch?v=fmT5nlEkl3U |
| 3 | API Gateways in System Design Interviews | https://www.youtube.com/watch?v=7-6F3b14baA |
| 4 | Networking Essentials for System Design Interviews | https://www.youtube.com/watch?v=SHkbPm1Wrno |
| 5 | DB Indexing — B-tree, Geospatial, Inverted Index, and more | https://www.youtube.com/watch?v=BHCSL_ZifI0 |
| 6 | CAP Theorem in System Design Interviews | https://www.youtube.com/watch?v=VdrEq0cODu4 |
| 7 | Elasticsearch Deep Dive w/ Ex-Meta Senior Manager | https://www.youtube.com/watch?v=PuZvF2EyfBM |
| 8 | Consistent Hashing: Easy Explanation | https://www.youtube.com/watch?v=vccwdhfqIrI |
| 9 | DynamoDB Deep Dive w/ Ex-Meta Staff Engineer | https://www.youtube.com/watch?v=2X2SO3Y-af8 |
| 10 | Data Structures for Big Data — Bloom Filters, Count-Min Sketch, HyperLogLog | https://www.youtube.com/watch?v=IgyU0iFIoqM |
| 11 | Cassandra Deep Dive w/ Ex-Meta Staff Engineer | https://www.youtube.com/watch?v=TD3-INhm60Q |
| 12 | Distributed Transactions: 2 Phase Commit vs Saga Pattern | https://www.youtube.com/watch?v=DOFflggE_0Q |
| 13 | How do Time Series Databases Work? | https://www.youtube.com/watch?v=Qd76ZmfRs_Q |

#### Playlist 3 — System Design Walkthroughs
> Full end-to-end mock interview walkthroughs — the core practice material. Do 2 per week.

| # | Video | Difficulty | Link |
|---|-------|------------|------|
| 1 | Design Bitly (URL Shortener) | Easy | https://www.youtube.com/watch?v=iUU4O1sWtJA |
| 2 | Design Dropbox / Google Drive | Medium | https://www.youtube.com/watch?v=_UZ1ngy-kOI |
| 3 | Design WhatsApp | Medium | https://www.youtube.com/watch?v=cr6p0n0N-VA |
| 4 | Design Twitter | Medium | https://www.youtube.com/watch?v=Nfa-uUHuFHg |
| 5 | Design FB News Feed | Medium | https://www.youtube.com/watch?v=Qj4-GruzyDU |
| 6 | Design Tinder | Medium | https://www.youtube.com/watch?v=18Fg5Akhkqw |
| 7 | Design Live Comments | Medium | https://www.youtube.com/watch?v=LjLx0fCd1k8 |
| 8 | Design a Distributed Rate Limiter | Medium | https://www.youtube.com/watch?v=MIJFyUPG4Z4 |
| 9 | Design Web Crawler | Medium | https://www.youtube.com/watch?v=krsuaUp__pM |
| 10 | Design Ticketmaster | Hard | https://www.youtube.com/watch?v=fhdPyoO6aXI |
| 11 | Design Uber | Hard | https://www.youtube.com/watch?v=lsKU38RKQSo |
| 12 | Design YouTube | Hard | https://www.youtube.com/watch?v=IUrQ5_g3XKs |
| 13 | Design Ad Click Aggregator | Hard | https://www.youtube.com/watch?v=Zcv_899yqhI |
| 14 | Design LeetCode (Online Judge) | Hard | https://www.youtube.com/watch?v=1xHADtekTNg |
| 15 | Design Top-K System | Hard | https://www.youtube.com/watch?v=y-tA2NW4LNY |
| 16 | Design FB Post Search | Hard | https://www.youtube.com/watch?v=l38XL9914fs |

#### Playlist 4 — Low-Level Design (OOP)
> For rounds that test object-oriented design and concurrency

| # | Video | Link |
|---|-------|------|
| 1 | Design an Elevator | https://www.youtube.com/watch?v=fODT0ldeBiU |
| 2 | Concurrency in Low-Level Design Interviews | https://www.youtube.com/watch?v=d8rmosXttTE |
| 3 | Design Amazon Locker | https://www.youtube.com/watch?v=s6nGkoGJhXk |
| 4 | Design Connect Four | https://www.youtube.com/watch?v=9UI4ikKP3Ws |

#### Playlist 5 — Hello Interviews (Meta / Process Insights)
> Watch during breaks — mindset, behavioral, and interview meta-strategy

| # | Video | Link |
|---|-------|------|
| 1 | Behavioral Interview: Common Questions Broken Down | https://www.youtube.com/watch?v=CAda15Tawlg |
| 2 | How to Learn System Design w/ Jordan Has No Life | https://www.youtube.com/watch?v=nJsVO84LCGs |
| 3 | Behavioral Interview Discussion w/ Ex-Meta Hiring Committee Member | https://www.youtube.com/watch?v=bBvPQZmPXwQ |
| 4 | Interview with a Meta EM: AI Impact, Team Match, How to Learn | https://www.youtube.com/watch?v=3Hb5An-NaX8 |
| 5 | The Art of People Manager Interviews | https://www.youtube.com/watch?v=dYrMSHZnqw0 |

---

### System Design Video Resources (Additional Channels)

> Community playlists that complement the Hello Interview material — Piyush Garg covers core patterns concisely; Engineering Digest is a Hindi-language end-to-end intro to the fundamentals.

#### Playlist 6 — System Design (Piyush Garg)
> 14 videos · concise pattern + concept walkthroughs

| # | Video | Link |
|---|-------|------|
| 1 | System Design for Beginners | https://www.youtube.com/watch?v=lFeYU31TnQ8 |
| 2 | System Design Crash Course - Part 2 | https://www.youtube.com/watch?v=YuB3OuF3MUE |
| 3 | System Design - Event Sourcing | https://www.youtube.com/watch?v=JTmgi0vO5Ug |
| 4 | CQRS System Design Pattern | https://www.youtube.com/watch?v=vNplj9LwQSw |
| 5 | Back of Envelope Calculation - System Design Concept | https://www.youtube.com/watch?v=DwqTon7ZS_s |
| 6 | Master Rate Limiting - System Design | https://www.youtube.com/watch?v=CVItTb_jdkE |
| 7 | Consistent Hashing - System Design | https://www.youtube.com/watch?v=IC5Y1EE-aj4 |
| 8 | How Video Streaming Works on Scale - System Design | https://www.youtube.com/watch?v=-JtjQ-OA7XE |
| 9 | System Design of UPI Payments | https://www.youtube.com/watch?v=fqySz1Me2pI |
| 10 | What are Bloom Filters? \| System Design | https://www.youtube.com/watch?v=vz0QUa4CS3o |
| 11 | System Design Behind Multi-Conference Video Calls - WebRTC vs SFU vs MCU | https://www.youtube.com/watch?v=Zaz6hYVm-WE |
| 12 | Gossip Protocol System Design | https://www.youtube.com/watch?v=TUc_hPtxyf8 |
| 13 | Master Queues \| System Design Interview | https://www.youtube.com/watch?v=2tCfITBVKjA |
| 14 | System Design Patterns you should Master Right Now | https://www.youtube.com/watch?v=OdNpY3WQniQ |

#### Playlist 7 — System Design Playlist in Hindi (Engineering Digest)
> 34 videos · Hindi-language fundamentals: architecture → scaling → databases → auth → SD walkthroughs

| # | Video | Link |
|---|-------|------|
| 1 | What is system design process in software engineering? | https://www.youtube.com/watch?v=43-X22tdxiI |
| 2 | Monolithic Architecture In Hindi (Complete Explanation) | https://www.youtube.com/watch?v=z4AUhxIWKSM |
| 3 | Difference between monolithic and microservices architecture in Hindi | https://www.youtube.com/watch?v=MPxr1q8ORuA |
| 4 | What is latency in networking in Hindi \| How to reduce latency in network \| CDN vs Caching | https://www.youtube.com/watch?v=cG3LMd2hIXY |
| 5 | What is throughput in Hindi? (How to improve throughput?) | https://www.youtube.com/watch?v=IhemzDuCwgU |
| 6 | What is availability? (replication vs redundancy) | https://www.youtube.com/watch?v=Cdh9qAwFNNk |
| 7 | What is Consistency in System Design in Hindi (Strong vs Eventual Consistency) | https://www.youtube.com/watch?v=2GKay0Mwk4U |
| 8 | What is CAP theorem in Hindi? | https://www.youtube.com/watch?v=rb2R5I9S5d8 |
| 9 | What is Lamport Logical Clock? | https://www.youtube.com/watch?v=27wYlcIYAO8 |
| 10 | Difference between horizontal and vertical scaling in Hindi | https://www.youtube.com/watch?v=dHjHXis1r24 |
| 11 | Difference between Redundancy and Replication in Hindi (Master - Slave Replication) | https://www.youtube.com/watch?v=d9kA8CW8Cns |
| 12 | What is load balancer and How it works in Hindi (Load Balancing Algorithms in Hindi) | https://www.youtube.com/watch?v=bIBC_RQtS2E |
| 13 | What is Caching in Hindi (Complete Explanation) | https://www.youtube.com/watch?v=xBTGln828Ps |
| 14 | Cache Eviction Techniques in Hindi (LRU, LFU, MRU, LIFO, FIFO & RR) | https://www.youtube.com/watch?v=IaDU8_KjrpY |
| 15 | File based storage system in Hindi (File Based Database Management System in Hindi) | https://www.youtube.com/watch?v=ZtpIzSZbuh0 |
| 16 | Can RDBMS scale horizontally in Hindi? (Why is it hard to scale relational database?) | https://www.youtube.com/watch?v=VOrpRnE24KI |
| 17 | Types of NoSQL Databases in Hindi (Which one to use and where?) | https://www.youtube.com/watch?v=qxFj8X8n6CE |
| 18 | What is Polyglot Persistence in Hindi? | https://www.youtube.com/watch?v=z7wB95TXB8M |
| 19 | What is denormalization in RDBMS in Hindi | https://www.youtube.com/watch?v=o8HgXxqsYBc |
| 20 | How does indexing work in Databases in Hindi (How to optimize SQL Queries in Hindi) | https://www.youtube.com/watch?v=xXtig5uLQS4 |
| 21 | What is Synchronous communication in Hindi | https://www.youtube.com/watch?v=W7ppbYgrhwg |
| 22 | What is synchronous and asynchronous communication in Hindi | https://www.youtube.com/watch?v=MyiLxH8St0U |
| 23 | What is message based communication in Hindi? | https://www.youtube.com/watch?v=6HKwwJOFHOY |
| 24 | What is web server in Hindi | https://www.youtube.com/watch?v=1_8a8-__6ts |
| 25 | What is communication protocol in computer network in Hindi | https://www.youtube.com/watch?v=zaArcSrLPa8 |
| 26 | REST API \| SOA \| Microservices architecture \| Tier architecture | https://www.youtube.com/watch?v=SvBnrJKzH8k |
| 27 | Difference between Authentication and Authorization in Hindi | https://www.youtube.com/watch?v=B76BhEq1FN8 |
| 28 | Basic Authentication in Hindi | https://www.youtube.com/watch?v=2x1L563nTlU |
| 29 | Token Based Authentication in Hindi | https://www.youtube.com/watch?v=VPnYuwwg0rU |
| 30 | OAuth Authentication in Hindi | https://www.youtube.com/watch?v=EYQijvnyYp0 |
| 31 | Forward proxy and reverse proxy Explained in Hindi | https://www.youtube.com/watch?v=dBtpV7aN_20 |
| 32 | Reverse proxy server in Hindi | https://www.youtube.com/watch?v=Q5jPD2ECEgM |
| 33 | URL shortener system design in Hindi \| Tinyurl system design in Hindi \| Bitly system design in Hindi | https://www.youtube.com/watch?v=9csfoQK2T8g |
| 34 | Dropbox system design in Hindi \| Google drive system design in Hindi | https://www.youtube.com/watch?v=k8AObcX8azM |

---

### Extra System Design Resources (Mid-Level Interview Focus)

#### YouTube Channels *(sorted: visual primers → walkthroughs → deep technical → debate)*
| Channel | Best for | Link |
|---------|----------|------|
| **ByteByteGo** | Visual system design explainers, newsletter — easiest entry | https://www.youtube.com/@ByteByteGo |
| **Gaurav Sen** | Distributed systems fundamentals | https://www.youtube.com/@gkcs |
| **Hello Interview** | Full mock walkthroughs + deep dives (all playlists above) | https://www.youtube.com/@hello_interview |
| **Exponent** | Mock interviews, behavioral + system design combo | https://www.youtube.com/@tryExponent |
| **Hussein Nasser** | Networking, databases, backend deep dives | https://www.youtube.com/@hnasr |
| **Jordan Has No Life** | Deep whiteboard-style system design | https://www.youtube.com/@jordanhasnolife5163 |
| **System Design Fight Club** | Competitive walkthroughs with trade-off debate | https://www.youtube.com/@SDFC |

#### Written Resources
| Resource | What it gives you | Link |
|----------|------------------|------|
| **ByteByteGo Newsletter** | Weekly visual system design breakdowns | https://blog.bytebytego.com |
| **Quastor** | Real-world engineering blog deep dives | https://blog.quastor.org |
| **High Scalability** | How top companies actually built their systems | http://highscalability.com |
| **The Pragmatic Engineer** | Staff-level system design + career advice | https://newsletter.pragmaticengineer.com |
| **AWS Architecture Blog** | Real AWS production architectures | https://aws.amazon.com/blogs/architecture |
| **Cloudflare Blog** | Networking, CDN, distributed systems at scale | https://blog.cloudflare.com |
| **Martin Fowler's Blog** | Microservices, CQRS, event sourcing patterns | https://martinfowler.com |

#### Interactive Practice
| Platform | What it gives you | Cost |
|----------|------------------|------|
| **hellointerview.com** | AI-powered system design mock + feedback | Freemium |
| **interviewing.io** | Live mock with FAANG engineers | $200–400/session |
| **Pramp** | Peer-to-peer system design practice | FREE |
| **Excalidraw** | Whiteboard tool for drawing system diagrams | FREE |
| **dbdiagram.io** | Schema design tool — use in data modeling questions | FREE |

#### Recommended Study Order for Mid-Level System Design

```
Week 1–2:  Watch all Basics playlist (Playlist 1 above)
Week 3–4:  Read DDIA chapters 1–6 + watch Deep Dives playlist
Week 5–6:  Do Easy + Medium walkthroughs (Bitly, Dropbox, WhatsApp, Twitter)
Week 7–8:  Read DDIA chapters 7–12 + do Hard walkthroughs (Uber, YouTube)
Week 9–10: 2 mock interviews on hellointerview.com + gap-fill with Deep Dives
Week 11–12: Company-specific prep (Grab → ride-sharing; Shopee → e-commerce; Agoda → search)
```

---

## <a id="part-k"></a>Part K — Build-It-Up Roadmap: HLDs Per Learn Stage

> **Read this before you start the Learn track.** Eight progressively-richer high-level designs, one per sidebar stage. Each HLD adds *one capability* on top of the last — by the end you've built up the full request path of an APAC platform from a bare backend to a globally cached, observable, IaC-provisioned, mesh-egressed system. Tackle the Learn stages in this order: every stage answers "how do I actually build the box I just drew."
>
> The 9 sidebar stages (Automation moved to the end so the request-path stages flow naturally): 01 Networking · 02 Cloud & K8s · 03 Reliability · 04 CDN, API Gateway & HTTP Caching · 05 Reverse Proxy · 06 Proxy (Forward / Egress) · 07 Varnish & VCL · 08 Fastly CDN · 09 Automation.

| # | Sidebar stage | What's in it (one line) |
|---|---|---|
| 01 | Networking | TCP/UDP, TLS, HTTP/1/2/3, DNS — the wire under everything |
| 02 | Cloud & K8s | Docker, Kubernetes, AWS basics — where every box in the diagram lives |
| 03 | Reliability | Prometheus, Grafana, Loki, OTel, SLOs — observes everything |
| 04 | CDN, API Gateway & HTTP Caching | Fastly (concepts) + Kong + HAProxy + RFC 9111 |
| 05 | Reverse Proxy | NGINX + Envoy in front of backends |
| 06 | Proxy (Forward / Egress) | Squid, mitmproxy, NAT, mesh EgressGateway |
| 07 | Varnish & VCL | On-prem VCL deep dive |
| 08 | Fastly CDN | Hosted VCL + Compute@Edge — the dedicated Fastly course |
| 09 | Automation | Terraform, Ansible, Python/Bash — provisions everything |

---

### HLD 1 — Bare-bones backend (start here)

**Stages it unlocks:** 01 Networking · 02 Cloud & K8s

```
                                     ┌──────────────┐
[Client] ──HTTPS──▶ [App pod in K8s] ──SQL──▶ │ PostgreSQL  │
   │                       │                  │ (AWS RDS)   │
   │                  Docker image            └──────────────┘
   │                  scheduled by
   │                  Kubernetes Deployment
   │                  Exposed via Service / NodePort
   │
   └── DNS resolves → TCP handshake → TLS handshake → HTTP request
                                  (Stage 01)
```

The smallest thing that can serve a request. Client speaks TCP / TLS / HTTP (**Stage 01**) to a Pod scheduled by Kubernetes on a Docker image (**Stage 02**); the Pod queries PostgreSQL on RDS. No edge, no proxy, no caching. Everything else in this roadmap is layers added to *this* picture.

**Why learn 01 Networking first** — every box in every later HLD speaks over the network. If TLS handshake, HTTP/2 multiplexing, DNS resolution, and TCP back-pressure are black boxes, every "why is p99 spiking?" debugging session devolves into guesswork. This is the layer that *never* gets abstracted away.

**Why learn 02 Cloud & K8s next** — every modern SRE job is "ops on Kubernetes running in a public cloud." You can't reason about reliability without knowing what a Pod, Service, Ingress, IAM role, Security Group, or VPC actually is. The Todo app in Part B Phase 2 is the worked example you'll build here.

---

### HLD 2 — Add a reverse proxy in front of the app

**Stage it unlocks:** 05 Reverse Proxy

```
                  ┌─── TLS terminates here
                  │    Routes by Host / path
                  │    Retries failed upstreams
                  │    proxy_cache for hot GETs (5–10s microcache)
                  ▼
[Client] ──TLS──▶ [NGINX or Envoy] ──HTTP──▶ [App pod #1]
                       │           └────────▶ [App pod #2]
                       │           └────────▶ [App pod #3]
                       │                          │
                       │                          ▼
                       │                     [PostgreSQL]
                       │
                       └── Stage 05: zero-downtime reloads,
                            xDS dynamic config, gRPC routing
```

The first layer you put in front of your app. **NGINX** (HTTP-first stacks) or **Envoy** (gRPC + service-mesh data planes) terminates TLS once, fans requests across multiple app pods, retries when an upstream dies, and can microcache hot GETs to absorb traffic spikes.

**Why learn 05 Reverse Proxy** — the moment you have more than one backend pod or want to terminate TLS in one place instead of in every app, you need a reverse proxy. NGINX is the SRE baseline; Envoy is mandatory the moment you touch a service mesh (Istio / Kong Mesh / AWS App Mesh).

---

### HLD 3 — Add API gateway + L4 load balancer

**Stage it unlocks:** 04 CDN, API Gateway & HTTP Caching *(the Kong + HAProxy + caching-theory parts)*

```
                    ┌─── L4 LB: connection-level fan-out, stick tables,
                    │    zero-downtime reloads
                    │    (HAProxy or AWS ALB / NLB)
                    ▼
[Client] ──▶ [HAProxy L4 LB] ──▶ [Kong API Gateway] ──▶ [NGINX] ──▶ [App pod] ──▶ [DB]
                                       │
                                       └─── Auth (JWT / OAuth / mTLS)
                                            Rate-limiting plugin
                                            Request transforms
                                            Routes /api/v1/todos → todo-svc
                                            Routes /api/v1/users  → user-svc
                                            (Stage 04)
```

Production stacks rarely have just one microservice. **HAProxy** sits in front as a connection-level load balancer (or AWS ALB does this in cloud); **Kong** sits inside the cluster doing JWT auth, rate-limiting, and routing across many backends. NGINX/Envoy still terminates TLS and proxies into the actual app pod.

**Why learn 04 CDN, API Gateway & HTTP Caching** — at any APAC platform (Grab, Mercari, Agoda) someone owns "the edge" — and that's Kong/Apigee for auth + rate-limit, plus HTTP caching theory (`Cache-Control`, `ETag`, `Vary`, `stale-while-revalidate`, RFC 9111). Whoever owns the edge owns the SLO for everyone behind it.

---

### HLD 4 — Add a CDN at the global edge

**Stages it unlocks:** 08 Fastly CDN *(and the Fastly piece of Stage 04)*

```
                     ┌── Global edge POPs (Tokyo, Singapore, Sydney…)
                     │   VCL at the edge
                     │   Surrogate keys + instant purge
                     │   stale-while-revalidate, Compute@Edge (WASM)
                     ▼
[Client] ──▶ [Fastly POP] ──cache HIT (served in <50ms)──▶  [Client gets response]

[Client] ──▶ [Fastly POP] ──cache MISS──▶ [HAProxy] ──▶ [Kong] ──▶ [NGINX] ──▶ [App] ──▶ [DB]
                  ▲                                                                          │
                  └──────────────── response flows back, gets cached at edge ◀───────────────┘
```

Now you have **two request paths** — the **cache-HIT path** (served at the edge, never touches origin) and the **cache-MISS path** (traverses every layer below). Fastly's POPs sit close to users globally; on a HIT, user-perceived latency drops to single-digit ms regardless of where origin is.

**Why learn 08 Fastly CDN** — Stage 04 covers CDN concepts vendor-neutrally; **Stage 08** is the hands-on Fastly-specific course: VCL dialect, surrogate keys, instant purge via API, Image Optimizer, Edge Rate Limiting, Compute@Edge. This is the dedicated track for the specific tool you'll touch on a real APAC publisher / e-commerce stack.

---

### HLD 5 — Add observability everywhere

**Stage it unlocks:** 03 Reliability

```
[Client] ──▶ [Fastly] ──▶ [HAProxy] ──▶ [Kong] ──▶ [NGINX] ──▶ [App] ──▶ [DB]
                │             │            │           │          │         │
                ▼             ▼            ▼           ▼          ▼         ▼
            metrics      stats page    prom plugin  /metrics   OTel SDK  pg_exporter
            (Fastly         (HAProxy)   + access     (NGINX     (RED + USE +
             real-time                     log         status)   trace context)
             dashboard)                                          
                │             │            │           │          │         │
                └─────────────┴────────────┴───────────┴──────────┴─────────┘
                                         │
                  ┌──────────────────────┼──────────────────────┐
                  ▼                      ▼                      ▼
            [Prometheus]              [Loki]                [Tempo / Jaeger]
                  │                      │                      │
                  └──────────────────────┴──────────────────────┘
                                         │
                                         ▼
                                   ┌──────────┐
                                   │ Grafana  │   single pane of glass
                                   └──────────┘
                                         │
                          multi-burn-rate SLO alert fires
                                         │
                                         ▼
                                  [PagerDuty]   (oncall paged before
                                                 the user notices)
```

Every box in HLDs 1–4 now emits metrics (Prometheus exporters or `/metrics` endpoints), logs (Loki / Vector), and traces (OpenTelemetry → Tempo). Grafana unifies the view; multi-window multi-burn-rate alerts page oncall *before* the customer notices the SLO breach.

**Why learn 03 Reliability** — this is the actual SRE day job. Building things is half the work; knowing whether they're broken, fast enough, and within SLO is the other half. Every "SRE" job description tests this in the interview, and *every* incident is graded on how fast you went from page → root cause → fix.

---

### HLD 6 — Provision everything as code (no console clicks)

**Stage it unlocks:** 09 Automation

```
                  [git repo: terraform/ + ansible/ + helm/ + fastly-vcl/]
                                       │
                          PR  →  CI lint  →  CI plan
                                       │
                                       ▼
                        [GitHub Actions runs:
                          terraform apply / ansible-playbook
                          helmfile sync / fastly deploy]
                                       │
       ┌───────────────────────────────┼───────────────────────────────┐
       ▼                               ▼                               ▼
  [AWS infra]                    [K8s manifests]                  [Edge config]
  • VPC + subnets                • EKS node groups                • Fastly services + VCL
  • RDS PostgreSQL               • HAProxy / NGINX Helm           • Kong routes (decK)
  • ALB / NLB                    • App Deployments                • Grafana dashboards
  • Route 53 DNS                 • Prom / Loki / Tempo Helm       • Prom alert rules
  • IAM roles                    • SLO definitions                • PagerDuty escalation

                                       ▲
                                       │
                  every box in HLDs 1–5 is created by code, not the console
```

Nothing in the picture is clicked in the AWS console. Every VPC, K8s manifest, Kong route, Fastly VCL service, Grafana dashboard, and Prom alert is provisioned by Terraform / Ansible / Helm / decK / fastly-cli running in CI. Drift-free, reviewable, reproducible.

**Why learn 09 Automation** — "the SRE who clicks in the console" is a junior who can't be trusted with prod. The SRE who ships infra via PR with a `terraform plan` diff is the one who gets promoted (and the one who gets hired remote-first from Bangladesh by a Singapore or Tokyo team).

---

### HLD 7 — Add on-prem VCL caching (when you can't use a hosted CDN)

**Stage it unlocks:** 07 Varnish & VCL

```
Use case: on-prem newspaper / publisher stack (e.g. dn.no via NHST)
          can't ship every cache fill to a hosted CDN
          → run Varnish on bare metal inside your DC

[Client in EU] ──▶ [Varnish on-prem cluster] ──cache MISS──▶ [HAProxy → Kong → App]
                          │
                          ├── VCL 4.1: vcl_recv → vcl_hash → vcl_backend_response
                          ├── grace mode: serve stale while origin slow
                          ├── hit-for-pass on uncacheable POSTs
                          ├── purge via xkey (surrogate keys)
                          └── Hitch terminates TLS in front (UDS socket)

[Client in EU] ──▶ [Varnish on-prem cluster] ──cache HIT─────▶  RAM-speed response
```

The on-prem mirror of HLD 4. When you can't ship every cache fill through a hosted CDN — because of data residency, on-prem-only architecture, or budget — you run **Varnish** on bare metal. Same VCL dialect as Fastly (modulo a few extensions), so the skill transfers in both directions.

**Why learn 07 Varnish & VCL** — directly maps to the Cefalo / NHST stack (Norwegian publishers). 30 hands-on milestones rebuild the `dn.no` reference architecture: multi-backend routing via the `x-backend` header pattern, snippet auto-loading, grace + hit-for-pass, surrogate-key purging, TLS via Hitch. It's also the cleanest way to learn VCL fundamentals before you go hosted with Fastly in Stage 08.

---

### HLD 8 — Control outbound traffic (forward proxy / egress)

**Stage it unlocks:** 06 Proxy (Forward / Egress)

```
                     ┌── Forward proxy: sits in front of CLIENT
                     │   Audits / filters / caches OUTBOUND traffic
                     │   (mirror image of reverse proxy)
                     ▼
[App pod] ──HTTPS──▶ [Squid / mitmproxy] ──▶ [AWS NAT GW / VPC Endpoint] ──▶ [External API]
   │                       │                          │
   │                  ACLs, allowlist,        Stops paying NAT bytes
   │                  audit log,              for S3 / DynamoDB /
   │                  TLS interception        SQS via Gateway / Interface
   │                  (Stage 06)              endpoints (PrivateLink)
   │
   │  Mesh variant:
   └─▶ [Envoy sidecar] ──▶ [Istio EgressGateway] ──▶ [External API]
                                     │
                              centralised egress
                              policy, mTLS, audit
                              (Stage 06 + Stage 7 mesh)
```

The *other* direction. A reverse proxy hides backend servers from clients; a **forward proxy** hides clients from the internet — and lets you audit, filter, cache, or rewrite outbound calls. Common forms: Squid behind a PAC file for corporate egress, mitmproxy for debugging, AWS NAT Gateway / VPC Endpoints for cloud egress, Istio `EgressGateway` for mesh egress.

**Why learn 06 Proxy (Forward / Egress)** — most SREs need *reading-level* fluency here unless they own corporate egress or a service-mesh egress gateway. But the moment compliance asks "what external services does Pod X reach?" or finance asks "why is our NAT bill $40k/month?", this stage is the answer. Pairs with Stage 7 (Service Mesh) in the Advanced level.

---

### Reading order at a glance

```
Stage 01 → Stage 02 → Stage 05 → Stage 04 → Stage 08 → Stage 03 → Stage 09 → Stage 07 → Stage 06
   ↑          ↑          ↑          ↑          ↑          ↑          ↑          ↑          ↑
 HLD 1      HLD 1      HLD 2      HLD 3      HLD 4      HLD 5      HLD 6      HLD 7      HLD 8
foundations  K8s     reverse-    edge        CDN deep   observe    code-      on-prem   outbound
              up      proxy      gateways    dive       everything ify        VCL       control
```

> Three orthogonal tracks run alongside this main path: **Part B** (the worked Todo App project — your hands-on companion through HLDs 1–6), **Part 0A** (system-design interview prep — pairs with HLDs 3–8 once the picture is rich enough), **Part AI** (AI/LLM track — orthogonal, run when bandwidth allows).

---

## Final Notes

**What separates you from offer letters:**
1. **Depth in 2–3 areas** (AWS + K8s + observability) — not breadth in 10
2. **Visible work** — blog + GitHub + maybe a conference talk
3. **Interview prep** — system design + behavioral, not just LeetCode
4. **Active referrals** — 4× better conversion than cold applications

Don't optimize for highest salary on day one. Grab, Mercari, Agoda = fast-learning environments where 2 years accelerates your career more than 4 years at a less ambitious company. Comp follows skill.

### Weekly Checklist
- [ ] 5 LeetCode problems
- [ ] 1 system design walkthrough (Hello Interview)
- [ ] 5 hrs technical study (courses/books)
- [ ] 4 hrs hands-on project work
- [ ] 5 job applications (months 4–6)
- [ ] 3 LinkedIn connections to engineers at target companies
- [ ] 3+ GitHub commits this week
- [ ] 1 mock interview every 2 weeks
- [ ] 1 blog post per month
