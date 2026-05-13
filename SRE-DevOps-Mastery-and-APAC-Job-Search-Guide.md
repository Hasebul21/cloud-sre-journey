# SRE / DevOps Mastery + APAC SWE Job Search Guide

> **For:** Bangladesh-based Junior SRE — Docker, CI/CD, K8s basics, some AWS
> **Goal:** Master full software lifecycle + land visa-sponsored SRE/DevOps role in SG/JP/MY/TH
> **Time:** 15 hrs/week | **Timeline:** 6 months

---

## Table of Contents

1. [Part 0 — Interview Prep Track (Hello Interview Framework)](#part-0)
2. [Part A — Full Software Lifecycle Mastery](#part-a)
3. [Part B — Cloud Deep Dive (AWS)](#part-b)
4. [Part C — IaC, Observability, Cost Optimization](#part-c)
5. [Part D — System Design for SRE Interviews](#part-d)
6. [Part E — Coding & Programming](#part-e)
7. [Part G — APAC Job Search](#part-g)
8. [Part H — Interview Preparation](#part-h)
9. [Part I — Personal Branding](#part-i)
10. [Part J — Resources](#part-j)

---

## <a id="part-0"></a>Part 0 — Interview Prep Track (Hello Interview Framework)

> Source: [Hello Interview YouTube](https://www.youtube.com/@hello_interview) + [hellointerview.com](https://www.hellointerview.com)

### 0A. System Design Interviews

**5-Step Delivery Framework:**

| Step | What you do | Time |
|------|-------------|------|
| 1. Clarify Requirements | Functional + Non-functional (scale, latency, consistency) | 5 min |
| 2. Estimate Scale | DAU, QPS, storage, bandwidth — back-of-envelope math | 3 min |
| 3. High-Level Design | Core components, data flow, API contracts | 10 min |
| 4. Deep Dives | Bottlenecks, failure modes, specific components | 20 min |
| 5. Trade-offs | Why X over Y; behavior at 10× scale | 5 min |

**Core Concepts to Master:**
- **Networking** — DNS, HTTP/1.1/2/3, TCP vs UDP, CDN (push/pull), L4 vs L7 load balancers, reverse proxy
- **API Design** — REST vs GraphQL vs gRPC, idempotency, cursor pagination, rate limiting
- **Caching** — Redis, cache-aside/write-through/write-back, TTL, LRU/LFU eviction, cache stampede
- **Sharding** — hash vs range partitioning, consistent hashing, virtual nodes, hot key problem
- **CAP Theorem** — CP vs AP, eventual vs strong consistency, quorum reads/writes
- **Database Indexing** — B-tree vs LSM-tree, composite indexes, covering indexes, query explain
- **Numbers to Know** — latency hierarchy (L1 cache → RAM → SSD → network), storage scales

**Key Technologies:**

| Tech | What to understand |
|------|--------------------|
| **Redis** | Sorted sets, pub/sub, clustering, RDB vs AOF persistence |
| **Kafka** | Topics/partitions, consumer groups, offset commits, exactly-once delivery |
| **Elasticsearch** | Inverted index, analyzers, shards/replicas, relevance scoring |
| **Cassandra** | Wide-column, partition+clustering key, when to prefer over DynamoDB |
| **DynamoDB** | Single-table design, GSI/LSI, DynamoDB Streams, hot partitions |
| **PostgreSQL** | MVCC, logical replication, partitioning with pg_partman |
| **Kafka + Flink** | Stream processing, event time vs processing time, watermarks |

**Design Patterns:**
- **Real-time Updates** — WebSockets vs SSE vs Long Polling vs Short Polling
- **Contention Management** — Redis Redlock, optimistic locking, queue-based serialization
- **Multi-step Processes** — Saga (choreography vs orchestration), idempotent retries, outbox pattern
- **Read/Write Scaling** — CQRS, read replicas, materialized views, event sourcing
- **Large Data Handling** — batch (MapReduce/Spark), stream (Kafka+Flink), columnar (Parquet/Iceberg)
- **Long-running Jobs** — async queues (SQS/Celery), polling vs webhooks, distributed scheduling

**Practice Problems:**

| Difficulty | Problems |
|------------|----------|
| **Easy** | Bitly, Dropbox, Local Delivery Service, News Aggregator |
| **Medium** | Ticketmaster, FB News Feed, WhatsApp, Tinder, Yelp, Rate Limiter, Online Auction, FB Live Comments, Price Tracker, LeetCode clone |
| **Hard** | Instagram, YouTube, Uber, Google Docs, Distributed Cache, Web Crawler, Ad Click Aggregator, Payment System, Metrics Monitoring, Job Scheduler, Robinhood |

### 0B. SQL Interviews

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

### 0C. Behavioral Interviews

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

### 0D. Low-Level Design (OOP)
- **SOLID Principles** — Single Responsibility, Open/Closed, Liskov, Interface Segregation, Dependency Inversion
- **Key Patterns** — Factory, Singleton, Observer, Strategy, Decorator, Builder
- **Practice problems** — Parking Lot, Elevator, Chess, Library System, Food Delivery App, Notification System

### 0E. Interview Prep Schedule

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

## <a id="part-b"></a>Part B — Cloud Deep Dive (AWS)

### B1. 15 AWS Services to Know Deeply

| Service | Why it matters |
|---------|----------------|
| **EC2** | AMIs, instance families, placement groups, networking |
| **VPC** | Subnets, route tables, NAT, security groups, NACLs, peering |
| **IAM** | Roles, policies, trust relationships, STS, OIDC/IRSA for K8s |
| **S3** | Storage classes, lifecycle, versioning, replication, encryption |
| **RDS / Aurora** | Multi-AZ, read replicas, backups, parameter groups |
| **EKS** | Managed K8s, IRSA, node groups, Fargate, cluster upgrades |
| **ECS / Fargate** | Lighter container option; preferred at some APAC companies |
| **ELB (ALB/NLB)** | Target groups, listeners, WAF integration |
| **Route 53** | Routing policies (latency/weighted/failover), health checks |
| **CloudWatch** | Metrics, Logs Insights, alarms, dashboards |
| **CloudFormation / CDK** | Native IaC (you'll mostly use Terraform, but know these) |
| **Lambda** | Layers, cold starts, event sources, provisioned concurrency |
| **SQS / SNS / EventBridge** | Messaging, fan-out, event-driven architecture |
| **Secrets Manager / SSM** | Secrets + config management |
| **CloudTrail / Config / GuardDuty** | Audit, compliance, security posture |

### B2. Certification Path (recommended order)

1. **AWS SAA-C03** — Stephane Maarek (Udemy $10–15) + Tutorials Dojo practice exams. 6–8 weeks.
2. **CKA** — Mumshad Mannambeth (KodeKloud). THE K8s credential. $395 (often $245 with CNCF discounts).
3. **Terraform Associate** — $70.50. Quick win. HashiCorp Learn (free prep).
4. **AWS DevOps Pro** — optional next step after SAA for AWS depth; ~3 months prep.

**GCP awareness:** Know GKE, BigQuery, Cloud Run conceptually (Mercari, LINE, Indeed Japan use GCP heavily).

---

## <a id="part-c"></a>Part C — IaC, Observability, Cost Optimization

### Terraform
- **Learn:** HashiCorp Learn (free) → "Terraform Up & Running" (Brikman, 3rd ed.)
- **Build:** VPC+EC2+RDS from scratch, EKS cluster, reusable `secure-s3-bucket` module
- **Advanced:** workspaces, remote state (S3+DynamoDB), `terraform import`, Terragrunt for DRY configs

### Observability Stack (your #1 differentiator)

| Pillar | Tools | Question answered |
|--------|-------|-------------------|
| **Metrics** | Prometheus + Grafana | Is the system healthy? |
| **Logs** | Loki / ELK / CloudWatch Logs | What happened? |
| **Traces** | Jaeger / Tempo + OpenTelemetry | Where did it slow down? |

**PromQL:** recording rules, alerting rules, multi-window burn rate alerts.
**OTel:** instrument a sample app with OTel SDK; export to Jaeger/Tempo. Understand spans, context propagation, sampling.

**Portfolio project:** 3-service demo with OTel instrumentation, deployed on K8s (kind locally), full Prom+Grafana+Loki+Tempo. Blog it. This single project impresses every SRE interviewer.

### SRE Core Concepts
- **Error budgets** — allow X mins downtime/quarter; once exhausted, freeze features → fix reliability
- **Burn rate alerts** — multi-window, multi-burn-rate (Google's approach; far better than threshold alerts)
- **Runbooks** — every alert links to one; practice writing a real runbook for a real alert
- **Postmortems** — blameless format; read 5 public postmortems (Cloudflare, GitHub, AWS)
- **Must-read:** Google SRE Book (free at sre.google/books), chapters 1–6 + 11–18

### AWS Cost Checklist (memorize for interviews)
1. Right-size EC2 with Compute Optimizer
2. Savings Plans / RIs for steady-state workloads
3. Spot instances for fault-tolerant/batch (up to 90% off)
4. Delete unattached EBS, old snapshots, unused Elastic IPs
5. S3 lifecycle policies → Glacier for cold data
6. VPC Endpoints to eliminate NAT Gateway data charges
7. Schedule dev environments off nights/weekends (~65% saving)
8. Karpenter for K8s node autoscaling
9. Audit cross-AZ and cross-region data transfer costs
10. Enable Cost Anomaly Detection (ML-based unusual spend alerts)

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
