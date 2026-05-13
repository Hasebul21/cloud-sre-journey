# SRE / DevOps Mastery + APAC SWE Job Search Guide

> **For:** Bangladesh-based Junior SRE — Docker, CI/CD, K8s basics, some AWS
> **Goal:** Master full software lifecycle + land visa-sponsored SRE/DevOps role in SG/JP/MY/TH
> **Time:** 15 hrs/week | **Timeline:** 6 months

---

## Table of Contents

1. [Part 0 — Interview Prep Track (Hello Interview Framework)](#part-0)
2. [Part A — Full Software Lifecycle Mastery](#part-a)
   - [A1–A2. Plan + Code](#a1a2-plan--code)
   - [A3–A4. Build + Deploy](#a3a4-build--deploy)
   - [A5–A6. Operate + Maintain](#a5a6-operate--maintain)
   - [A7. Cost Optimization](#a7-cost-optimization)
3. [Part B — AWS, Kubernetes & Observability (Hands-On)](#part-b)
   - [Phase 1 — Build & Containerize](#phase-1--build--containerize)
   - [Phase 2 — Kubernetes (Local with kind)](#phase-2--kubernetes-local-with-kind)
   - [Phase 3 — ELK Stack (Logging)](#phase-3--elk-stack-logging)
   - [Phase 4 — Observability (Metrics + Traces + Alerts)](#phase-4--observability-metrics--traces--alerts)
   - [Phase 5 — AWS Deployment](#phase-5--aws-deployment)
   - [Phase 6 — IaC with Terraform](#phase-6--iac-with-terraform)
   - [Phase 7 — CI/CD Pipeline](#phase-7--cicd-pipeline-github-actions)
4. [Part D — System Design for SRE Interviews](#part-d)
5. [Part E — Coding & Programming](#part-e)
6. [Part G — APAC Job Search](#part-g)
7. [Part H — Interview Preparation](#part-h)
8. [Part I — Personal Branding](#part-i)
9. [Part J — Resources](#part-j)

---

## <a id="part-0"></a>Part 0 — Interview Prep Track (Hello Interview Framework)

> Source: [Hello Interview YouTube](https://www.youtube.com/@hello_interview) | [hellointerview.com](https://www.hellointerview.com)
>
> All video links below are from the Hello Interview channel. Full playlists:
> - [Basics](https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2) · [Deep Dives](https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6) · [System Design Walkthroughs](https://www.youtube.com/playlist?list=PL5q3E8eRUieWtYLmRU3z94-vGRcwKr9tM) · [Low-Level Design](https://www.youtube.com/playlist?list=PL5q3E8eRUieUQCl6CAF4AlOZnmICKmAec) · [Hello Interviews](https://www.youtube.com/playlist?list=PL5q3E8eRUieUwRxPDt_JkpFI407PyXZth)

---

### 0A. System Design Interviews

> Start here: [How to Prepare for System Design Interviews](https://www.youtube.com/watch?v=Ru54dxzCyD0)

**5-Step Delivery Framework:**

| Step | What you do | Time |
|------|-------------|------|
| 1. Clarify Requirements | Functional + Non-functional (scale, latency, consistency) | 5 min |
| 2. Estimate Scale | DAU, QPS, storage, bandwidth — back-of-envelope math | 3 min |
| 3. High-Level Design | Core components, data flow, API contracts | 10 min |
| 4. Deep Dives | Bottlenecks, failure modes, specific components | 20 min |
| 5. Trade-offs | Why X over Y; behavior at 10× scale | 5 min |

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
| Recommendation System infrastructure | [Recommendation System Infra Basics](https://www.youtube.com/watch?v=GncgOIiMII8) |

**Deep Dive Videos (watch when a topic appears in a walkthrough):**

| Topic | Video |
|-------|-------|
| Kafka internals (topics, partitions, consumer groups) | [Kafka System Design Deep Dive](https://www.youtube.com/watch?v=DU8o-OTeoCc) |
| Redis (sorted sets, clustering, persistence) | [Redis Deep Dive](https://www.youtube.com/watch?v=fmT5nlEkl3U) |
| Elasticsearch (inverted index, shards, scoring) | [Elasticsearch Deep Dive](https://www.youtube.com/watch?v=PuZvF2EyfBM) |
| DynamoDB (single-table design, GSI, hot partitions) | [DynamoDB Deep Dive](https://www.youtube.com/watch?v=2X2SO3Y-af8) |
| Cassandra (wide-column, partition key, vs DynamoDB) | [Cassandra Deep Dive](https://www.youtube.com/watch?v=TD3-INhm60Q) |
| DB Indexing (B-tree, geospatial, inverted index) | [DB Indexing in System Design Interviews](https://www.youtube.com/watch?v=BHCSL_ZifI0) |
| CAP Theorem (CP vs AP, eventual consistency) | [CAP Theorem in System Design Interviews](https://www.youtube.com/watch?v=VdrEq0cODu4) |
| API Gateways (rate limiting, auth, routing) | [API Gateways in System Design Interviews](https://www.youtube.com/watch?v=7-6F3b14baA) |
| Networking (DNS, HTTP/1/2/3, TCP, load balancers) | [Networking Essentials for System Design](https://www.youtube.com/watch?v=SHkbPm1Wrno) |
| Distributed Transactions (2PC vs Saga) | [Distributed Transactions: 2PC vs Saga](https://www.youtube.com/watch?v=DOFflggE_0Q) |
| Big Data Structures (Bloom filters, HyperLogLog) | [Data Structures for Big Data](https://www.youtube.com/watch?v=IgyU0iFIoqM) |
| Time Series Databases | [How do Time Series Databases Work?](https://www.youtube.com/watch?v=Qd76ZmfRs_Q) |

**Design Patterns:**
- **Real-time Updates** — WebSockets vs SSE vs Long Polling vs Short Polling
- **Contention Management** — Redis Redlock, optimistic locking, queue-based serialization
- **Multi-step Processes** — Saga (choreography vs orchestration), idempotent retries, outbox pattern
- **Read/Write Scaling** — CQRS, read replicas, materialized views, event sourcing
- **Large Data Handling** — batch (MapReduce/Spark), stream (Kafka+Flink), columnar (Parquet/Iceberg)
- **Long-running Jobs** — async queues (SQS/Celery), polling vs webhooks, distributed scheduling

**Practice Walkthroughs (do in this order):**

| Difficulty | Problem | Video |
|------------|---------|-------|
| Easy | Design Bitly (URL Shortener) | [Watch](https://www.youtube.com/watch?v=iUU4O1sWtJA) |
| Easy | Design Dropbox / Google Drive | [Watch](https://www.youtube.com/watch?v=_UZ1ngy-kOI) |
| Medium | Design WhatsApp | [Watch](https://www.youtube.com/watch?v=cr6p0n0N-VA) |
| Medium | Design Twitter | [Watch](https://www.youtube.com/watch?v=Nfa-uUHuFHg) |
| Medium | Design FB News Feed | [Watch](https://www.youtube.com/watch?v=Qj4-GruzyDU) |
| Medium | Design Tinder | [Watch](https://www.youtube.com/watch?v=18Fg5Akhkqw) |
| Medium | Design Live Comments | [Watch](https://www.youtube.com/watch?v=LjLx0fCd1k8) |
| Medium | Design a Distributed Rate Limiter | [Watch](https://www.youtube.com/watch?v=MIJFyUPG4Z4) |
| Medium | Design Web Crawler | [Watch](https://www.youtube.com/watch?v=krsuaUp__pM) |
| Hard | Design Ticketmaster | [Watch](https://www.youtube.com/watch?v=fhdPyoO6aXI) |
| Hard | Design Uber | [Watch](https://www.youtube.com/watch?v=lsKU38RKQSo) |
| Hard | Design YouTube | [Watch](https://www.youtube.com/watch?v=IUrQ5_g3XKs) |
| Hard | Design Ad Click Aggregator | [Watch](https://www.youtube.com/watch?v=Zcv_899yqhI) |
| Hard | Design LeetCode (Online Judge) | [Watch](https://www.youtube.com/watch?v=1xHADtekTNg) |
| Hard | Design Top-K System | [Watch](https://www.youtube.com/watch?v=y-tA2NW4LNY) |
| Hard | Design FB Post Search | [Watch](https://www.youtube.com/watch?v=l38XL9914fs) |

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

### 0C. Coding / DSA

Study patterns in this order — quality > quantity, talk through approach before coding:

1. Arrays + Strings (two pointers, sliding window, prefix sums)
2. Hash Maps + Sets (frequency counting, two-sum family)
3. Trees (DFS/BFS, LCA, serialization)
4. Graphs (BFS/DFS, topological sort, union-find, Dijkstra)
5. Binary Search (search on answer, rotated arrays)
6. Heaps / Priority Queues (top-K, merge K sorted lists, median stream)
7. Dynamic Programming (1D, 2D, interval, knapsack)
8. Stack + Monotonic Stack (next greater element, histogram area)
9. Linked Lists (fast/slow pointers, cycle detection)
10. Concurrency (producer-consumer, semaphores — bonus for SRE)

**Target:** 150–200 medium problems. Start brute force, then optimize. Test edge cases.

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

#### Top 30 LeetCode SQL Problems (Priority Order)

| # | Problem | Difficulty | Key Pattern |
|---|---------|------------|-------------|
| 175 | Combine Two Tables | Easy | LEFT JOIN, NULL for missing rows |
| 176 | Second Highest Salary | Medium | LIMIT/OFFSET, IFNULL, subquery |
| 177 | Nth Highest Salary | Medium | Custom function, LIMIT with variable |
| 178 | Rank Scores | Medium | DENSE_RANK() window function |
| 180 | Consecutive Numbers | Medium | Self-join × 3 or LAG/LEAD |
| 181 | Employees Earning More Than Managers | Easy | Self JOIN |
| 182 | Duplicate Emails | Easy | GROUP BY HAVING COUNT > 1 |
| 183 | Customers Who Never Order | Easy | LEFT JOIN WHERE NULL / NOT IN |
| 184 | Department Highest Salary | Medium | Subquery MAX per group + JOIN |
| 185 | Department Top Three Salaries | Hard | DENSE_RANK() PARTITION BY dept |
| 196 | Delete Duplicate Emails | Easy | DELETE with self-join or subquery |
| 197 | Rising Temperature | Easy | Self JOIN on DATEDIFF = 1 |
| 262 | Trips and Users | Hard | Multi-join, rate calculation, date filter |
| 511 | Game Play Analysis I | Easy | MIN(event_date) GROUP BY player |
| 550 | Game Play Analysis IV | Medium | DATE_ADD, correlated subquery or window |
| 570 | Managers with ≥5 Direct Reports | Medium | GROUP BY HAVING + JOIN |
| 577 | Employee Bonus | Easy | LEFT JOIN, NULL check in WHERE |
| 584 | Find Customer Referee | Easy | NULL trap — use `IS NULL OR != 2` |
| 595 | Big Countries | Easy | WHERE with OR / UNION |
| 601 | Human Traffic of Stadium | Hard | Consecutive rows with ≥100 people |
| 626 | Exchange Seats | Medium | CASE + MOD(id,2), edge case last row |
| 1045 | Customers Who Bought All Products | Medium | GROUP BY HAVING COUNT(DISTINCT) |
| 1141 | User Activity for the Past 30 Days I | Easy | DATEDIFF / DATE range filter |
| 1179 | Reformat Department Table | Medium | Pivot: SUM(CASE WHEN month=... ) |
| 1193 | Monthly Transactions I | Medium | DATE_FORMAT group by month, CASE SUM |
| 1321 | Restaurant Growth | Hard | Sliding 7-day window AVG |
| 1341 | Movie Rating | Medium | UNION ALL of two aggregates |
| 1484 | Group Sold Products By The Date | Easy | GROUP_CONCAT with ORDER BY |
| 1667 | Fix Names in a Table | Easy | CONCAT + UPPER + LOWER + SUBSTRING |
| 1934 | Confirmation Rate | Medium | LEFT JOIN + AVG(CASE WHEN) |

**Study order:** Do Easy first (175–197) to lock in JOIN/NULL/GROUP BY mechanics. Then Medium problems in order listed. 601 and 1321 are the hardest — do them last. Aim to solve each without hints; if stuck after 20 min, read the editorial then re-solve from scratch.

**Tip:** Practice in MySQL 8.0 (matches LeetCode environment). Window functions, CTEs, and DENSE_RANK work identically in PostgreSQL — switch freely for APAC company stacks.

---

### 0F. Interview Prep Schedule

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

### Phase 1 — Build & Containerize

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

### Phase 2 — Kubernetes (Local with kind)

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

### Phase 3 — ELK Stack (Logging)

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

---

### Phase 4 — Observability (Metrics + Traces + Alerts)

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

### Phase 5 — AWS Deployment

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

### Phase 6 — IaC with Terraform

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

### Phase 7 — CI/CD Pipeline (GitHub Actions)

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

1. **AWS SAA-C03** — Stephane Maarek (Udemy $10–15) + Tutorials Dojo practice exams. 6–8 weeks.
2. **CKA** — Mumshad Mannambeth (KodeKloud). THE K8s credential. $395 (often $245 with CNCF discounts).
3. **Terraform Associate** — $70.50. Quick win. HashiCorp Learn (free prep).
4. **AWS DevOps Pro** — optional next step after SAA for AWS depth; ~3 months prep.

**GCP awareness:** Know GKE, BigQuery, Cloud Run conceptually (Mercari, LINE, Indeed Japan use GCP heavily).

---

## <a id="part-d"></a>Part D — System Design for SRE/DevOps Interviews

SRE system design differs from SWE — interviewers also ask about reliability, observability, deployment, and cost.

### Core Resources
1. **"Designing Data-Intensive Applications"** (Kleppmann) — THE book. Non-negotiable. All 12 chapters.
2. **"System Design Interview Vol 1 & 2"** (Alex Xu) — interview-focused companion.
3. **ByteByteGo** newsletter + platform (Alex Xu's content).
4. **"Understanding Distributed Systems"** (Vitillo) — good middle-ground depth.

### SRE-Specific Topics
- Multi-region, multi-AZ HA; database scaling: CDC, sharding, read replicas
- Caching strategies; message queues (Kafka vs RabbitMQ vs SQS — know when to use each)
- Circuit breakers, bulkheads, idempotency in distributed systems
- Consistency models: strong, eventual, causal, read-your-writes

### SRE Flavor Questions (practice these specifically)
- Design a CI/CD pipeline for 200 microservices
- Design monitoring/alerting for a system handling 1M req/sec
- Design a log aggregation pipeline for 10TB/day
- Design a multi-region active-active database setup
- Design a blue-green deployment system across 3 regions
- Design a feature flag service or secrets management system

---

## <a id="part-e"></a>Part E — Coding & Programming

### Language Choice
**Go** (primary) — K8s, Docker, Terraform, Prometheus, Helm all written in Go. SRE lingua franca at Grab, Mercari, PayPay, ByteDance.
**Python** (secondary) — scripting, automation, AWS Lambda. Keep it as your shell tool.

**Go learning path (~40 hrs):**
1. A Tour of Go (tour.golang.org) — 5 hrs
2. "Learning Go" (Jon Bodner, O'Reilly) — best intermediate book
3. Go by Example (gobyexample.com) — pattern reference
4. Build a small CLI tool (e.g., kubectl plugin or log parser)
5. 30 LeetCode problems in Go to build fluency

### LeetCode Strategy
- **NeetCode 150** (neetcode.io) — the optimal curated list for time-constrained prep
- Focus: Arrays, Strings, Hash Maps, Two Pointers, Sliding Window, Binary Search, Trees (BFS/DFS), Heaps, Graphs
- Skip: DP-hard, advanced graph theory (unless extra time)
- **1 hr/day × 5 days × 12 weeks ≈ 150 problems** — enough for SRE coding bars (EASY + MEDIUM only)

### Other Skills
- **Bash:** parse logs with `awk`/`sed`/`grep`/`jq`/`yq`; write `Makefile` for project tasks. "The Linux Command Line" (free at linuxcommand.org).
- **SQL:** JOINs, GROUP BY, window functions (`ROW_NUMBER`, `LAG`, `LEAD`), EXPLAIN plans. LeetCode Top 50 SQL.

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

### Courses

| Course | Platform | Cost |
|--------|----------|------|
| AWS SAA-C03 (Stephane Maarek) | Udemy | $10–15 on sale |
| SAA Practice Exams (Jon Bonso) | Tutorials Dojo | $15 |
| CKA (Mumshad Mannambeth) | KodeKloud | $30/month |
| Terraform AWS Track | learn.hashicorp.com | FREE |
| A Tour of Go | tour.golang.org | FREE |
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

### Extra System Design Resources (Mid-Level Interview Focus)

#### YouTube Channels
| Channel | Best for | Link |
|---------|----------|------|
| **Hello Interview** | Full mock walkthroughs + deep dives (all playlists above) | https://www.youtube.com/@hello_interview |
| **ByteByteGo** | Visual system design explainers, newsletter | https://www.youtube.com/@ByteByteGo |
| **Exponent** | Mock interviews, behavioral + system design combo | https://www.youtube.com/@tryExponent |
| **Jordan Has No Life** | Deep whiteboard-style system design | https://www.youtube.com/@jordanhasnolife5163 |
| **Gaurav Sen** | Distributed systems fundamentals | https://www.youtube.com/@gkcs |
| **Hussein Nasser** | Networking, databases, backend deep dives | https://www.youtube.com/@hnasr |
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
