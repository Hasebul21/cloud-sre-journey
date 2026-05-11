# SRE / DevOps Mastery + APAC SWE Job Search Guide

> **For:** Bangladesh-based Junior SRE — Docker, CI/CD, K8s basics, some AWS
> **Goal:** Master full software lifecycle + land visa-sponsored SRE/DevOps role in SG/JP/MY/TH
> **Time:** 15 hrs/week | **Timeline:** 6 months

---

## Table of Contents

1. [TL;DR — The Big Picture](#tldr)
2. [Part 0 — Interview Prep Track (Hello Interview Framework)](#part-0)
3. [Part A — Full Software Lifecycle Mastery](#part-a)
4. [Part B — Cloud Deep Dive (AWS)](#part-b)
5. [Part C — IaC, Observability, Cost Optimization](#part-c)
6. [Part D — System Design for SRE Interviews](#part-d)
7. [Part E — Coding & Programming](#part-e)
8. [Part F — 6-Month Plan](#part-f)
9. [Part G — APAC Job Search](#part-g)
10. [Part H — Interview Preparation](#part-h)
11. [Part I — Personal Branding](#part-i)
12. [Part J — Resources](#part-j)

---

## <a id="tldr"></a>TL;DR — The Big Picture

**Your foundation:** Junior SRE + Docker + CI/CD + K8s + some AWS = solid start, but not yet mid-level marketable.

**What to add:**
1. **Deep AWS** — SAA cert + hands-on with 15 core services
2. **IaC** — Terraform fluency (CKA + Terraform Associate certs)
3. **Observability** — Prometheus, Grafana, Loki, OpenTelemetry
4. **Production K8s** — Helm, RBAC, autoscaling, networking, security
5. **Cost optimization** — FinOps, Karpenter, right-sizing
6. **System design** — capacity planning, SLOs, reliability patterns
7. **One strong language** — Go (SRE lingua franca) + Python for scripting
8. **Public portfolio** — blog + GitHub repos
9. **Interview prep** — LeetCode (medium), STAR stories, system design mocks

**Realistic outcome:** Interview-ready for mid-level SRE/DevOps in 5–6 months; offers in months 6–8.

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

### 0B. Coding / DSA

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

## <a id="part-f"></a>Part F — 6-Month Plan

**Weekly budget:** 5h technical study + 4h hands-on + 3h LeetCode/design + 2h job hunt + 1h reading

| Month | Primary Focus | Key Deliverables |
|-------|---------------|------------------|
| **1** | AWS SAA course (50%) + Go basics | LinkedIn optimized; 14 LeetCode; 1 blog post; billing alerts set up |
| **2** | AWS SAA exam + Terraform + EKS | SAA passed; EKS cluster via Terraform; 42 LeetCode; 2 blog posts |
| **3** | CKA course + full observability stack | Prom+Grafana+Loki+Tempo running; 70 LeetCode; 3 blog posts |
| **4** | CKA + Terraform Associate + start applying | 3 certs; 20 applications; 100 LeetCode; 4 blog posts |
| **5** | Interview loops | 8–15 interview rounds; 1 mock/week; 5 LeetCode/week maintenance |
| **6** | Offers + negotiation | Convert to offer; negotiate package; visa paperwork; transition plan |

---

## <a id="part-g"></a>Part G — APAC Job Search

### Singapore (Highest Priority)

| Company | Stack | Notes |
|---------|-------|-------|
| **Grab** | Go, AWS, K8s, Kafka | SG HQ; strong SRE org; most active hirer |
| **Shopee / Sea Group** | Go, Java, AWS, GCP | High-volume hiring; heavy K8s |
| **ByteDance / TikTok SG** | Go, C++, K8s | Massive infra; competitive comp |
| **Stripe APAC** | Ruby, Go, AWS | Premium comp; very high bar |
| **GovTech Singapore** | Cloud-native, AWS | Hires foreigners for specialist roles |
| **DBS / OCBC / UOB** | Java, K8s, AWS/Azure | Banks investing heavily in cloud-native |
| **Ninja Van, Carousell, Razer** | Mixed | Mid-tier; visa-friendly |

**Visa (Employment Pass):** Min SGD 5,600/month. Software engineering on Shortage Occupation List (+20 COMPASS pts). Employer applies on your behalf; 3-week processing.
**Salary (3 YOE):** SGD 8,500–13,000/month base. Total comp SGD 90K–180K/year at Grab/Shopee/ByteDance.
**Channels:** Referrals (4× conversion) → LinkedIn → NodeFlair (nodeflair.com) → MyCareersFuture

### Japan

| Company | English-first? | Stack |
|---------|----------------|-------|
| **Mercari / Merpay** | YES | Go, GCP, K8s |
| **PayPay** | YES | Kotlin, AWS, K8s |
| **Rakuten** | YES (Englishnization since 2010) | Java, Go |
| **Indeed Japan** | YES | AWS |
| **Woven by Toyota** | YES | C++, Python, ROS |
| **LINE / LY Corp** | English subteams | Java, Go, K8s |

**Visa (Highly Skilled Professional — recommended):** 70 pts required. 3-year PR track (1-year if 80+ pts). Spouse can work. Better than standard Engineer visa.
**Salary:** Mercari ¥7M–12M; PayPay ¥6M–10M; Indeed Japan ¥7M–11M/year total comp.
**Channels:** TokyoDev (tokyodev.com) → Japan Dev (japan-dev.com) → LinkedIn (Wahl+Case, Robert Walters)
**Japanese:** Not required at Mercari/PayPay/Indeed/Woven; JLPT N5 (~100 hrs) improves daily life dramatically.

### Malaysia & Thailand

**Malaysia (KL):** Grab/Shopee/ByteDance KL offices. EP Cat II: RM10,000+/month. Salary RM10K–18K/month (~USD 25K–47K). Channels: JobStreet + direct + LinkedIn. EP thresholds rising Jun 2026 — apply early.

**Thailand (Bangkok):** Agoda is the primary target (Scala, Kotlin, AWS; sponsors family visas). Salary THB 1.7M–2.5M/year. Non-B + Work Permit. Apply at careers.agoda.com. LINE MAN Wongnai and SCB 10X also hire.

### Referral Playbook
1. LinkedIn search: `"Bangladesh" AND "Grab"` (or Shopee, Mercari, etc.)
2. Connect with shared background (NSU, BUET, IUT, Cefalo alumni)
3. First message: genuine curiosity about their experience, zero referral mention
4. After 2–3 real exchanges: "If you think my profile fits [role], I'd be grateful for a referral"
5. Referred candidates are 4× more likely to receive offers; make up ~40% of hires at APAC tech firms

### CV Format
- 1 page (mid-level), 2 pages MAX. PDF. ATS-friendly — no graphics/columns/photos.
- Order: Header → Summary (2 lines) → Skills → Experience → Projects → Education → Certs
- Header: name + phone (country code) + email + LinkedIn + GitHub + blog + "Open to relocation, visa sponsorship required"
- Bullet formula: **"Reduced X from Y to Z by [action] using [tech], enabling [impact]"**

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
