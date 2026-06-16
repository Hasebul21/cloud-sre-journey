// All trackable items, organized by section.
// Each item has a stable `id` used as localStorage key suffix.

window.SRE_DATA = {
  // ────────────────────────────────────────────────────────────────
  // PART 0 — Interview Prep
  // ────────────────────────────────────────────────────────────────
  sdPlaylists: [
    { id: "sdpl-hi-all", type: "channel", name: "Hello Interview · all playlists", url: "https://www.youtube.com/@hello_interview/playlists" },

    {
      key: "sdpl-hi-basics",
      name: "Hello Interview · Basics",
      url: "https://www.youtube.com/playlist?list=PL5q3E8eRUieVFeK1oLahJ8KONkAxDpqk2",
      videos: [
        { id: "sdpl-hi-basics-v1",  type: "video", name: "Kafka vs RabbitMQ",                                                       url: "https://www.youtube.com/watch?v=1HOVtQ-_fcE" },
        { id: "sdpl-hi-basics-v2",  type: "video", name: "Message Queues in System Design Interviews w/ Meta Staff Engineer",       url: "https://www.youtube.com/watch?v=1ISRd0bS714" },
        { id: "sdpl-hi-basics-v3",  type: "video", name: "Caching in System Design Interviews w/ Meta Staff Engineer",              url: "https://www.youtube.com/watch?v=1NngTUYPdpI" },
        { id: "sdpl-hi-basics-v4",  type: "video", name: "Sharding in System Design Interviews w/ Meta Staff Engineer",             url: "https://www.youtube.com/watch?v=L521gizea4s" },
        { id: "sdpl-hi-basics-v5",  type: "video", name: "Data Modeling in System Design Interviews w/ Meta Staff Engineer",        url: "https://www.youtube.com/watch?v=TUcPS6dsWx4" },
        { id: "sdpl-hi-basics-v6",  type: "video", name: "API Design in System Design Interviews w/ Meta Staff Engineer",           url: "https://www.youtube.com/watch?v=DQ57zYedMdQ" },
        { id: "sdpl-hi-basics-v7",  type: "video", name: "Object Storage in System Design Interviews w/ Ex-Meta Staff Engineer",    url: "https://www.youtube.com/watch?v=RvaMHMxHjp4" },
        { id: "sdpl-hi-basics-v8",  type: "video", name: "How to Prepare for System Design Interviews w/ Meta Staff Engineer",      url: "https://www.youtube.com/watch?v=Ru54dxzCyD0" },
        { id: "sdpl-hi-basics-v9",  type: "video", name: "Consistent Hashing: Easy Explanation for System Design Interviews",       url: "https://www.youtube.com/watch?v=vccwdhfqIrI" },
        { id: "sdpl-hi-basics-v10", type: "video", name: "Recommendation System Infra Basics",                                      url: "https://www.youtube.com/watch?v=GncgOIiMII8" },
      ],
    },

    {
      key: "sdpl-hi-deep",
      name: "Hello Interview · Deep Dives",
      url: "https://www.youtube.com/playlist?list=PL5q3E8eRUieUHnsz0rh0W6AzwdVJBwEK6",
      videos: [
        { id: "sdpl-hi-deep-v1",  type: "video", name: "Kafka System Design Deep Dive",                                        url: "https://www.youtube.com/watch?v=DU8o-OTeoCc" },
        { id: "sdpl-hi-deep-v2",  type: "video", name: "Redis Deep Dive w/ Ex-Meta Senior Manager",                            url: "https://www.youtube.com/watch?v=fmT5nlEkl3U" },
        { id: "sdpl-hi-deep-v3",  type: "video", name: "API Gateways in System Design Interviews",                             url: "https://www.youtube.com/watch?v=7-6F3b14baA" },
        { id: "sdpl-hi-deep-v4",  type: "video", name: "Networking Essentials for System Design Interviews",                   url: "https://www.youtube.com/watch?v=SHkbPm1Wrno" },
        { id: "sdpl-hi-deep-v5",  type: "video", name: "DB Indexing — B-tree, Geospatial, Inverted Index, and more",           url: "https://www.youtube.com/watch?v=BHCSL_ZifI0" },
        { id: "sdpl-hi-deep-v6",  type: "video", name: "CAP Theorem in System Design Interviews",                              url: "https://www.youtube.com/watch?v=VdrEq0cODu4" },
        { id: "sdpl-hi-deep-v7",  type: "video", name: "Elasticsearch Deep Dive w/ Ex-Meta Senior Manager",                    url: "https://www.youtube.com/watch?v=PuZvF2EyfBM" },
        { id: "sdpl-hi-deep-v8",  type: "video", name: "Consistent Hashing: Easy Explanation",                                 url: "https://www.youtube.com/watch?v=vccwdhfqIrI" },
        { id: "sdpl-hi-deep-v9",  type: "video", name: "DynamoDB Deep Dive w/ Ex-Meta Staff Engineer",                         url: "https://www.youtube.com/watch?v=2X2SO3Y-af8" },
        { id: "sdpl-hi-deep-v10", type: "video", name: "Data Structures for Big Data — Bloom Filters, Count-Min, HyperLogLog", url: "https://www.youtube.com/watch?v=IgyU0iFIoqM" },
        { id: "sdpl-hi-deep-v11", type: "video", name: "Cassandra Deep Dive w/ Ex-Meta Staff Engineer",                        url: "https://www.youtube.com/watch?v=TD3-INhm60Q" },
        { id: "sdpl-hi-deep-v12", type: "video", name: "Distributed Transactions: 2 Phase Commit vs Saga Pattern",             url: "https://www.youtube.com/watch?v=DOFflggE_0Q" },
        { id: "sdpl-hi-deep-v13", type: "video", name: "How do Time Series Databases Work?",                                   url: "https://www.youtube.com/watch?v=Qd76ZmfRs_Q" },
      ],
    },

    {
      key: "sdpl-hi-walk",
      name: "Hello Interview · System Design Walkthroughs",
      url: "https://www.youtube.com/playlist?list=PL5q3E8eRUieWtYLmRU3z94-vGRcwKr9tM",
      videos: [
        { id: "sdpl-hi-walk-v1",  type: "video", name: "Design Bitly (URL Shortener)",     level: "Easy",   url: "https://www.youtube.com/watch?v=iUU4O1sWtJA" },
        { id: "sdpl-hi-walk-v2",  type: "video", name: "Design Dropbox / Google Drive",    level: "Medium", url: "https://www.youtube.com/watch?v=_UZ1ngy-kOI" },
        { id: "sdpl-hi-walk-v3",  type: "video", name: "Design WhatsApp",                  level: "Medium", url: "https://www.youtube.com/watch?v=cr6p0n0N-VA" },
        { id: "sdpl-hi-walk-v4",  type: "video", name: "Design Twitter",                   level: "Medium", url: "https://www.youtube.com/watch?v=Nfa-uUHuFHg" },
        { id: "sdpl-hi-walk-v5",  type: "video", name: "Design FB News Feed",              level: "Medium", url: "https://www.youtube.com/watch?v=Qj4-GruzyDU" },
        { id: "sdpl-hi-walk-v6",  type: "video", name: "Design Tinder",                    level: "Medium", url: "https://www.youtube.com/watch?v=18Fg5Akhkqw" },
        { id: "sdpl-hi-walk-v7",  type: "video", name: "Design Live Comments",             level: "Medium", url: "https://www.youtube.com/watch?v=LjLx0fCd1k8" },
        { id: "sdpl-hi-walk-v8",  type: "video", name: "Design a Distributed Rate Limiter", level: "Medium", url: "https://www.youtube.com/watch?v=MIJFyUPG4Z4" },
        { id: "sdpl-hi-walk-v9",  type: "video", name: "Design Web Crawler",               level: "Medium", url: "https://www.youtube.com/watch?v=krsuaUp__pM" },
        { id: "sdpl-hi-walk-v10", type: "video", name: "Design Ticketmaster",              level: "Hard",   url: "https://www.youtube.com/watch?v=fhdPyoO6aXI" },
        { id: "sdpl-hi-walk-v11", type: "video", name: "Design Uber",                      level: "Hard",   url: "https://www.youtube.com/watch?v=lsKU38RKQSo" },
        { id: "sdpl-hi-walk-v12", type: "video", name: "Design YouTube",                   level: "Hard",   url: "https://www.youtube.com/watch?v=IUrQ5_g3XKs" },
        { id: "sdpl-hi-walk-v13", type: "video", name: "Design Ad Click Aggregator",       level: "Hard",   url: "https://www.youtube.com/watch?v=Zcv_899yqhI" },
        { id: "sdpl-hi-walk-v14", type: "video", name: "Design LeetCode (Online Judge)",   level: "Hard",   url: "https://www.youtube.com/watch?v=1xHADtekTNg" },
        { id: "sdpl-hi-walk-v15", type: "video", name: "Design Top-K System",              level: "Hard",   url: "https://www.youtube.com/watch?v=y-tA2NW4LNY" },
        { id: "sdpl-hi-walk-v16", type: "video", name: "Design FB Post Search",            level: "Hard",   url: "https://www.youtube.com/watch?v=l38XL9914fs" },
      ],
    },

    {
      key: "sdpl-hi-lld",
      name: "Hello Interview · Low-Level Design",
      url: "https://www.youtube.com/playlist?list=PL5q3E8eRUieUQCl6CAF4AlOZnmICKmAec",
      videos: [
        { id: "sdpl-hi-lld-v1", type: "video", name: "Design an Elevator",                       url: "https://www.youtube.com/watch?v=fODT0ldeBiU" },
        { id: "sdpl-hi-lld-v2", type: "video", name: "Concurrency in Low-Level Design Interviews", url: "https://www.youtube.com/watch?v=d8rmosXttTE" },
        { id: "sdpl-hi-lld-v3", type: "video", name: "Design Amazon Locker",                     url: "https://www.youtube.com/watch?v=s6nGkoGJhXk" },
        { id: "sdpl-hi-lld-v4", type: "video", name: "Design Connect Four",                      url: "https://www.youtube.com/watch?v=9UI4ikKP3Ws" },
      ],
    },

    {
      key: "sdpl-hi-meta",
      name: "Hello Interview · Behavioral & process",
      url: "https://www.youtube.com/playlist?list=PL5q3E8eRUieUwRxPDt_JkpFI407PyXZth",
      videos: [
        { id: "sdpl-hi-meta-v1", type: "video", name: "Behavioral Interview: Common Questions Broken Down",                  url: "https://www.youtube.com/watch?v=CAda15Tawlg" },
        { id: "sdpl-hi-meta-v2", type: "video", name: "How to Learn System Design w/ Jordan Has No Life",                    url: "https://www.youtube.com/watch?v=nJsVO84LCGs" },
        { id: "sdpl-hi-meta-v3", type: "video", name: "Behavioral Interview Discussion w/ Ex-Meta Hiring Committee Member",  url: "https://www.youtube.com/watch?v=bBvPQZmPXwQ" },
        { id: "sdpl-hi-meta-v4", type: "video", name: "Interview with a Meta EM: AI Impact, Team Match, How to Learn",       url: "https://www.youtube.com/watch?v=3Hb5An-NaX8" },
        { id: "sdpl-hi-meta-v5", type: "video", name: "The Art of People Manager Interviews",                                url: "https://www.youtube.com/watch?v=dYrMSHZnqw0" },
      ],
    },

    {
      key: "sdpl-piyush",
      name: "Piyush Garg · System Design",
      url: "https://www.youtube.com/watch?v=lFeYU31TnQ8&list=PLinedj3B30sBlBWRox2V2tg9QJ2zr4M3o",
      videos: [
        { id: "sdpl-piyush-v1",  type: "video", name: "System Design for Beginners",                                                  url: "https://www.youtube.com/watch?v=lFeYU31TnQ8" },
        { id: "sdpl-piyush-v2",  type: "video", name: "System Design Crash Course - Part 2",                                          url: "https://www.youtube.com/watch?v=YuB3OuF3MUE" },
        { id: "sdpl-piyush-v3",  type: "video", name: "System Design - Event Sourcing",                                               url: "https://www.youtube.com/watch?v=JTmgi0vO5Ug" },
        { id: "sdpl-piyush-v4",  type: "video", name: "CQRS System Design Pattern",                                                   url: "https://www.youtube.com/watch?v=vNplj9LwQSw" },
        { id: "sdpl-piyush-v5",  type: "video", name: "Back of Envelope Calculation - System Design Concept",                         url: "https://www.youtube.com/watch?v=DwqTon7ZS_s" },
        { id: "sdpl-piyush-v6",  type: "video", name: "Master Rate Limiting - System Design",                                         url: "https://www.youtube.com/watch?v=CVItTb_jdkE" },
        { id: "sdpl-piyush-v7",  type: "video", name: "Consistent Hashing - System Design",                                           url: "https://www.youtube.com/watch?v=IC5Y1EE-aj4" },
        { id: "sdpl-piyush-v8",  type: "video", name: "How Video Streaming Works on Scale - System Design",                           url: "https://www.youtube.com/watch?v=-JtjQ-OA7XE" },
        { id: "sdpl-piyush-v9",  type: "video", name: "System Design of UPI Payments",                                                url: "https://www.youtube.com/watch?v=fqySz1Me2pI" },
        { id: "sdpl-piyush-v10", type: "video", name: "What are Bloom Filters? | System Design",                                      url: "https://www.youtube.com/watch?v=vz0QUa4CS3o" },
        { id: "sdpl-piyush-v11", type: "video", name: "System Design Behind Multi-Conference Video Calls — WebRTC vs SFU vs MCU",     url: "https://www.youtube.com/watch?v=Zaz6hYVm-WE" },
        { id: "sdpl-piyush-v12", type: "video", name: "Gossip Protocol System Design",                                                url: "https://www.youtube.com/watch?v=TUc_hPtxyf8" },
        { id: "sdpl-piyush-v13", type: "video", name: "Master Queues | System Design Interview",                                      url: "https://www.youtube.com/watch?v=2tCfITBVKjA" },
        { id: "sdpl-piyush-v14", type: "video", name: "System Design Patterns you should Master Right Now",                           url: "https://www.youtube.com/watch?v=OdNpY3WQniQ" },
      ],
    },

    {
      key: "sdpl-engdig",
      name: "Engineering Digest · System Design in Hindi",
      url: "https://www.youtube.com/watch?v=43-X22tdxiI&list=PLA3GkZPtsafZdyC5iucNM_uhqGJ5yFNUM",
      videos: [
        { id: "sdpl-engdig-v1",  type: "video", name: "What is system design process in software engineering?",                            url: "https://www.youtube.com/watch?v=43-X22tdxiI" },
        { id: "sdpl-engdig-v2",  type: "video", name: "Monolithic Architecture In Hindi (Complete Explanation)",                            url: "https://www.youtube.com/watch?v=z4AUhxIWKSM" },
        { id: "sdpl-engdig-v3",  type: "video", name: "Difference between monolithic and microservices architecture in Hindi",              url: "https://www.youtube.com/watch?v=MPxr1q8ORuA" },
        { id: "sdpl-engdig-v4",  type: "video", name: "What is latency in networking | How to reduce latency | CDN vs Caching",             url: "https://www.youtube.com/watch?v=cG3LMd2hIXY" },
        { id: "sdpl-engdig-v5",  type: "video", name: "What is throughput in Hindi? (How to improve throughput?)",                          url: "https://www.youtube.com/watch?v=IhemzDuCwgU" },
        { id: "sdpl-engdig-v6",  type: "video", name: "What is availability? (replication vs redundancy)",                                  url: "https://www.youtube.com/watch?v=Cdh9qAwFNNk" },
        { id: "sdpl-engdig-v7",  type: "video", name: "What is Consistency in System Design (Strong vs Eventual Consistency)",              url: "https://www.youtube.com/watch?v=2GKay0Mwk4U" },
        { id: "sdpl-engdig-v8",  type: "video", name: "What is CAP theorem in Hindi?",                                                      url: "https://www.youtube.com/watch?v=rb2R5I9S5d8" },
        { id: "sdpl-engdig-v9",  type: "video", name: "What is Lamport Logical Clock?",                                                     url: "https://www.youtube.com/watch?v=27wYlcIYAO8" },
        { id: "sdpl-engdig-v10", type: "video", name: "Difference between horizontal and vertical scaling in Hindi",                        url: "https://www.youtube.com/watch?v=dHjHXis1r24" },
        { id: "sdpl-engdig-v11", type: "video", name: "Difference between Redundancy and Replication (Master-Slave Replication)",           url: "https://www.youtube.com/watch?v=d9kA8CW8Cns" },
        { id: "sdpl-engdig-v12", type: "video", name: "What is load balancer and How it works (Load Balancing Algorithms)",                 url: "https://www.youtube.com/watch?v=bIBC_RQtS2E" },
        { id: "sdpl-engdig-v13", type: "video", name: "What is Caching in Hindi (Complete Explanation)",                                    url: "https://www.youtube.com/watch?v=xBTGln828Ps" },
        { id: "sdpl-engdig-v14", type: "video", name: "Cache Eviction Techniques in Hindi (LRU, LFU, MRU, LIFO, FIFO & RR)",                url: "https://www.youtube.com/watch?v=IaDU8_KjrpY" },
        { id: "sdpl-engdig-v15", type: "video", name: "File based storage system in Hindi (File Based DBMS)",                               url: "https://www.youtube.com/watch?v=ZtpIzSZbuh0" },
        { id: "sdpl-engdig-v16", type: "video", name: "Can RDBMS scale horizontally? (Why is it hard to scale relational database?)",       url: "https://www.youtube.com/watch?v=VOrpRnE24KI" },
        { id: "sdpl-engdig-v17", type: "video", name: "Types of NoSQL Databases (Which one to use and where?)",                             url: "https://www.youtube.com/watch?v=qxFj8X8n6CE" },
        { id: "sdpl-engdig-v18", type: "video", name: "What is Polyglot Persistence in Hindi?",                                             url: "https://www.youtube.com/watch?v=z7wB95TXB8M" },
        { id: "sdpl-engdig-v19", type: "video", name: "What is denormalization in RDBMS in Hindi",                                          url: "https://www.youtube.com/watch?v=o8HgXxqsYBc" },
        { id: "sdpl-engdig-v20", type: "video", name: "How does indexing work in Databases (How to optimize SQL Queries)",                  url: "https://www.youtube.com/watch?v=xXtig5uLQS4" },
        { id: "sdpl-engdig-v21", type: "video", name: "What is Synchronous communication in Hindi",                                         url: "https://www.youtube.com/watch?v=W7ppbYgrhwg" },
        { id: "sdpl-engdig-v22", type: "video", name: "What is synchronous and asynchronous communication in Hindi",                        url: "https://www.youtube.com/watch?v=MyiLxH8St0U" },
        { id: "sdpl-engdig-v23", type: "video", name: "What is message based communication in Hindi?",                                      url: "https://www.youtube.com/watch?v=6HKwwJOFHOY" },
        { id: "sdpl-engdig-v24", type: "video", name: "What is web server in Hindi",                                                        url: "https://www.youtube.com/watch?v=1_8a8-__6ts" },
        { id: "sdpl-engdig-v25", type: "video", name: "What is communication protocol in computer network",                                 url: "https://www.youtube.com/watch?v=zaArcSrLPa8" },
        { id: "sdpl-engdig-v26", type: "video", name: "REST API | SOA | Microservices architecture | Tier architecture",                    url: "https://www.youtube.com/watch?v=SvBnrJKzH8k" },
        { id: "sdpl-engdig-v27", type: "video", name: "Difference between Authentication and Authorization in Hindi",                       url: "https://www.youtube.com/watch?v=B76BhEq1FN8" },
        { id: "sdpl-engdig-v28", type: "video", name: "Basic Authentication in Hindi",                                                      url: "https://www.youtube.com/watch?v=2x1L563nTlU" },
        { id: "sdpl-engdig-v29", type: "video", name: "Token Based Authentication in Hindi",                                                url: "https://www.youtube.com/watch?v=VPnYuwwg0rU" },
        { id: "sdpl-engdig-v30", type: "video", name: "OAuth Authentication in Hindi",                                                      url: "https://www.youtube.com/watch?v=EYQijvnyYp0" },
        { id: "sdpl-engdig-v31", type: "video", name: "Forward proxy and reverse proxy Explained in Hindi",                                 url: "https://www.youtube.com/watch?v=dBtpV7aN_20" },
        { id: "sdpl-engdig-v32", type: "video", name: "Reverse proxy server in Hindi",                                                      url: "https://www.youtube.com/watch?v=Q5jPD2ECEgM" },
        { id: "sdpl-engdig-v33", type: "video", name: "URL shortener system design in Hindi (Tinyurl / Bitly system design)",               url: "https://www.youtube.com/watch?v=9csfoQK2T8g" },
        { id: "sdpl-engdig-v34", type: "video", name: "Dropbox / Google Drive system design in Hindi",                                      url: "https://www.youtube.com/watch?v=k8AObcX8azM" },
      ],
    },

    {
      key: "sdpl-mit6824",
      name: "MIT 6.824 · Distributed Systems (Spring 2020, Robert Morris)",
      url: "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB",
      videos: [
        { id: "sdpl-mit6824-v1",  type: "video", name: "Lecture 1: Introduction",                              url: "https://www.youtube.com/watch?v=cQP8WApzIQQ" },
        { id: "sdpl-mit6824-v2",  type: "video", name: "Lecture 2: RPC and Threads",                           url: "https://www.youtube.com/watch?v=gA4YXUJX7t8" },
        { id: "sdpl-mit6824-v3",  type: "video", name: "Lecture 3: GFS",                                       url: "https://www.youtube.com/watch?v=EpIgvowZr00" },
        { id: "sdpl-mit6824-v4",  type: "video", name: "Lecture 4: Primary-Backup Replication",                url: "https://www.youtube.com/watch?v=M_teob23ZzY" },
        { id: "sdpl-mit6824-v5",  type: "video", name: "Lecture 5: Go, Threads, and Raft",                     url: "https://www.youtube.com/watch?v=UzzcUS2OHqo" },
        { id: "sdpl-mit6824-v6",  type: "video", name: "Lecture 6: Fault Tolerance: Raft (1)",                 url: "https://www.youtube.com/watch?v=64Zp3tzNbpE" },
        { id: "sdpl-mit6824-v7",  type: "video", name: "Lecture 7: Fault Tolerance: Raft (2)",                 url: "https://www.youtube.com/watch?v=4r8Mz3MMivY" },
        { id: "sdpl-mit6824-v8",  type: "video", name: "Lecture 8: Zookeeper",                                 url: "https://www.youtube.com/watch?v=pbmyrNjzdDk" },
        { id: "sdpl-mit6824-v9",  type: "video", name: "Lecture 9: More Replication, CRAQ",                    url: "https://www.youtube.com/watch?v=IXHzbCuADt0" },
        { id: "sdpl-mit6824-v10", type: "video", name: "Lecture 10: Cloud Replicated DB, Aurora",              url: "https://www.youtube.com/watch?v=jJSh54J1s5o" },
        { id: "sdpl-mit6824-v11", type: "video", name: "Lecture 11: Cache Consistency: Frangipani",            url: "https://www.youtube.com/watch?v=-pKNCjUhPjQ" },
        { id: "sdpl-mit6824-v12", type: "video", name: "Lecture 12: Distributed Transactions",                 url: "https://www.youtube.com/watch?v=aDp99WDIM_4" },
        { id: "sdpl-mit6824-v13", type: "video", name: "Lecture 13: Spanner",                                  url: "https://www.youtube.com/watch?v=4eW5SWBi7vs" },
        { id: "sdpl-mit6824-v14", type: "video", name: "Lecture 14: Optimistic Concurrency Control",           url: "https://www.youtube.com/watch?v=Cw6Nj2evjSs" },
        { id: "sdpl-mit6824-v15", type: "video", name: "Lecture 15: Big Data: Spark",                          url: "https://www.youtube.com/watch?v=mzIoSW-cInA" },
        { id: "sdpl-mit6824-v16", type: "video", name: "Lecture 16: Cache Consistency: Memcached at Facebook", url: "https://www.youtube.com/watch?v=Myp8z0ybdzM" },
        { id: "sdpl-mit6824-v17", type: "video", name: "Lecture 17: COPS, Causal Consistency",                 url: "https://www.youtube.com/watch?v=fR_NB714EAI" },
        { id: "sdpl-mit6824-v18", type: "video", name: "Lecture 18: Fork Consistency, Certificate Transparency", url: "https://www.youtube.com/watch?v=UKdLJ7-0iFM" },
        { id: "sdpl-mit6824-v19", type: "video", name: "Lecture 19: Bitcoin",                                  url: "https://www.youtube.com/watch?v=K_euhRou98Y" },
        { id: "sdpl-mit6824-v20", type: "video", name: "Lecture 20: Blockstack",                               url: "https://www.youtube.com/watch?v=XvXK_vZ0BNw" },
      ],
    },
  ],
  sysDesignConcepts: [
    { id: "sd-prep",            type: "video", name: "How to Prepare for System Design Interviews",         url: "https://www.youtube.com/watch?v=Ru54dxzCyD0" },
    { id: "sd-caching",         type: "video", name: "Caching in System Design Interviews",                 url: "https://www.youtube.com/watch?v=1NngTUYPdpI" },
    { id: "sd-mq",              type: "video", name: "Message Queues in System Design Interviews",          url: "https://www.youtube.com/watch?v=1ISRd0bS714" },
    { id: "sd-kafka-rmq",       type: "video", name: "Kafka vs RabbitMQ deep comparison",                   url: "https://www.youtube.com/watch?v=1HOVtQ-_fcE" },
    { id: "sd-sharding",        type: "video", name: "Sharding in System Design Interviews",                url: "https://www.youtube.com/watch?v=L521gizea4s" },
    { id: "sd-consistent-hash", type: "video", name: "Consistent Hashing: Easy Explanation",                url: "https://www.youtube.com/watch?v=vccwdhfqIrI" },
    { id: "sd-api",             type: "video", name: "API Design in System Design Interviews",              url: "https://www.youtube.com/watch?v=DQ57zYedMdQ" },
    { id: "sd-data-model",      type: "video", name: "Data Modeling in System Design Interviews",           url: "https://www.youtube.com/watch?v=TUcPS6dsWx4" },
    { id: "sd-object-store",    type: "video", name: "Object Storage in System Design Interviews",          url: "https://www.youtube.com/watch?v=RvaMHMxHjp4" },
    { id: "sd-networking",      type: "video", name: "Networking Essentials for System Design",             url: "https://www.youtube.com/watch?v=SHkbPm1Wrno" },
    { id: "sd-reco",            type: "video", name: "Recommendation System Infra Basics",                  url: "https://www.youtube.com/watch?v=GncgOIiMII8" },
  ],
  sysDesignDeepDives: [
    { id: "dd-kafka",    type: "video", name: "Kafka System Design Deep Dive",                       url: "https://www.youtube.com/watch?v=DU8o-OTeoCc" },
    { id: "dd-redis",    type: "video", name: "Redis Deep Dive (sorted sets, clustering, persistence)", url: "https://www.youtube.com/watch?v=fmT5nlEkl3U" },
    { id: "dd-es",       type: "video", name: "Elasticsearch Deep Dive",                             url: "https://www.youtube.com/watch?v=PuZvF2EyfBM" },
    { id: "dd-dynamo",   type: "video", name: "DynamoDB Deep Dive (single-table, GSI, hot partitions)", url: "https://www.youtube.com/watch?v=2X2SO3Y-af8" },
    { id: "dd-cassandra",type: "video", name: "Cassandra Deep Dive (wide-column, partition key)",    url: "https://www.youtube.com/watch?v=TD3-INhm60Q" },
    { id: "dd-indexing", type: "video", name: "DB Indexing — B-tree, Geospatial, Inverted Index",    url: "https://www.youtube.com/watch?v=BHCSL_ZifI0" },
    { id: "dd-cap",      type: "video", name: "CAP Theorem in System Design Interviews",             url: "https://www.youtube.com/watch?v=VdrEq0cODu4" },
    { id: "dd-apigw",    type: "video", name: "API Gateways in System Design Interviews",            url: "https://www.youtube.com/watch?v=7-6F3b14baA" },
    { id: "dd-net",      type: "video", name: "Networking Essentials for System Design",             url: "https://www.youtube.com/watch?v=SHkbPm1Wrno" },
    { id: "dd-tx",       type: "video", name: "Distributed Transactions — 2PC vs Saga",              url: "https://www.youtube.com/watch?v=DOFflggE_0Q" },
    { id: "dd-bigdata",  type: "video", name: "Data Structures for Big Data (Bloom, HyperLogLog)",   url: "https://www.youtube.com/watch?v=IgyU0iFIoqM" },
    { id: "dd-tsdb",     type: "video", name: "How do Time Series Databases Work?",                  url: "https://www.youtube.com/watch?v=Qd76ZmfRs_Q" },
  ],
  sysDesignWalkthroughs: [
    { id: "w-bitly",        type: "video", name: "Design Bitly (URL Shortener)",     level: "Easy",   url: "https://www.youtube.com/watch?v=iUU4O1sWtJA" },
    { id: "w-dropbox",      type: "video", name: "Design Dropbox / Google Drive",    level: "Easy",   url: "https://www.youtube.com/watch?v=_UZ1ngy-kOI" },
    { id: "w-whatsapp",     type: "video", name: "Design WhatsApp",                  level: "Medium", url: "https://www.youtube.com/watch?v=cr6p0n0N-VA" },
    { id: "w-twitter",      type: "video", name: "Design Twitter",                   level: "Medium", url: "https://www.youtube.com/watch?v=Nfa-uUHuFHg" },
    { id: "w-newsfeed",     type: "video", name: "Design FB News Feed",              level: "Medium", url: "https://www.youtube.com/watch?v=Qj4-GruzyDU" },
    { id: "w-tinder",       type: "video", name: "Design Tinder",                    level: "Medium", url: "https://www.youtube.com/watch?v=18Fg5Akhkqw" },
    { id: "w-comments",     type: "video", name: "Design Live Comments",             level: "Medium", url: "https://www.youtube.com/watch?v=LjLx0fCd1k8" },
    { id: "w-ratelimiter",  type: "video", name: "Design Distributed Rate Limiter",  level: "Medium", url: "https://www.youtube.com/watch?v=MIJFyUPG4Z4" },
    { id: "w-crawler",      type: "video", name: "Design Web Crawler",               level: "Medium", url: "https://www.youtube.com/watch?v=krsuaUp__pM" },
    { id: "w-ticketmaster", type: "video", name: "Design Ticketmaster",              level: "Hard",   url: "https://www.youtube.com/watch?v=fhdPyoO6aXI" },
    { id: "w-uber",         type: "video", name: "Design Uber",                      level: "Hard",   url: "https://www.youtube.com/watch?v=lsKU38RKQSo" },
    { id: "w-youtube",      type: "video", name: "Design YouTube",                   level: "Hard",   url: "https://www.youtube.com/watch?v=IUrQ5_g3XKs" },
    { id: "w-adclick",      type: "video", name: "Design Ad Click Aggregator",       level: "Hard",   url: "https://www.youtube.com/watch?v=Zcv_899yqhI" },
    { id: "w-leetcode",     type: "video", name: "Design LeetCode (Online Judge)",   level: "Hard",   url: "https://www.youtube.com/watch?v=1xHADtekTNg" },
    { id: "w-topk",         type: "video", name: "Design Top-K System",              level: "Hard",   url: "https://www.youtube.com/watch?v=y-tA2NW4LNY" },
    { id: "w-postsearch",   type: "video", name: "Design FB Post Search",            level: "Hard",   url: "https://www.youtube.com/watch?v=l38XL9914fs" },
  ],
  sdChannels: [
    { id: "sdch-hi",      type: "channel", name: "Hello Interview · full walkthroughs + deep dives", url: "https://www.youtube.com/@hello_interview" },
    { id: "sdch-bbg",     type: "channel", name: "ByteByteGo · visual explainers",                   url: "https://www.youtube.com/@ByteByteGo" },
    { id: "sdch-exp",     type: "channel", name: "Exponent · mock interviews + behavioral",          url: "https://www.youtube.com/@tryExponent" },
    { id: "sdch-jordan",  type: "channel", name: "Jordan Has No Life · whiteboard deep dives",       url: "https://www.youtube.com/@jordanhasnolife5163" },
    { id: "sdch-gaurav",  type: "channel", name: "Gaurav Sen · distributed systems fundamentals",    url: "https://www.youtube.com/@gkcs" },
    { id: "sdch-hussein", type: "channel", name: "Hussein Nasser · networking, DBs, backend",        url: "https://www.youtube.com/@hnasr" },
    { id: "sdch-sdfc",    type: "channel", name: "System Design Fight Club · trade-off debates",     url: "https://www.youtube.com/@SDFC" },
  ],
  sdReading: [
    { id: "sdrd-awesome", type: "github", name: "awesome-system-design-resources (Ashish PS)",       url: "https://github.com/ashishps1/awesome-system-design-resources" },
    { id: "sdrd-bbg",     type: "blog",   name: "ByteByteGo Newsletter — weekly visual breakdowns", url: "https://blog.bytebytego.com" },
    { id: "sdrd-quastor", type: "blog",   name: "Quastor — engineering blog deep dives",            url: "https://blog.quastor.org" },
    { id: "sdrd-hs",      type: "blog",   name: "High Scalability — how top companies built it",    url: "http://highscalability.com" },
    { id: "sdrd-pe",      type: "blog",   name: "The Pragmatic Engineer",                           url: "https://newsletter.pragmaticengineer.com" },
    { id: "sdrd-aws",     type: "blog",   name: "AWS Architecture Blog",                            url: "https://aws.amazon.com/blogs/architecture" },
    { id: "sdrd-cf",      type: "blog",   name: "Cloudflare Blog",                                  url: "https://blog.cloudflare.com" },
    { id: "sdrd-mf",      type: "blog",   name: "Martin Fowler · microservices, CQRS, event sourcing", url: "https://martinfowler.com" },
    { id: "sdrd-hi-site", type: "course", name: "hellointerview.com · AI-powered SD mocks",         url: "https://www.hellointerview.com" },
    { id: "sdrd-mit6033", type: "course", name: "MIT 6.033 Computer System Engineering (OCW, 2018 — readings only)", url: "https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/" },
  ],

  // ───────────────────────────────────────────────────────────────
  // Part K — Build-It-Up HLD Roadmap (sidebar: "00 · Roadmap (HLDs)")
  // Eight progressively-richer high-level designs. Each adds ONE
  // capability to the previous and unlocks one Learn stage.
  // ───────────────────────────────────────────────────────────────
  hldRoadmap: {
    stageMap: [
      { num: "02", name: "Networking",                       desc: "TCP/UDP, TLS, HTTP/1/2/3, DNS — the wire under everything" },
      { num: "03", name: "Cloud & K8s",                      desc: "Docker, Kubernetes, AWS basics — where every box in the diagram lives" },
      { num: "04", name: "Reliability",                      desc: "Prometheus, Grafana, Loki, OTel, SLOs — observes everything" },
      { num: "05", name: "API Gateway, LB & HTTP Caching",    desc: "Kong + HAProxy + RFC 9111" },
      { num: "06", name: "Reverse Proxy",                    desc: "NGINX + Caddy in front of backends" },
      { num: "07", name: "Automation",                       desc: "Terraform, Ansible, Python/Bash — provisions everything" },
    ],
    hlds: [
      {
        id: "hld-1",
        title: "HLD 1 — Bare-bones backend (start here)",
        unlocks: "Stages 02 Networking · 03 Cloud & K8s",
        diagram:
`                                          ┌──────────────┐
[Client] ──HTTPS──▶ [App pod in K8s] ──SQL──▶│ PostgreSQL  │
   │                       │                  │ (AWS RDS)   │
   │                  Docker image            └──────────────┘
   │                  scheduled by
   │                  Kubernetes Deployment
   │                  Exposed via Service / NodePort
   │
   └── DNS resolves → TCP handshake → TLS handshake → HTTP request
                                  (Stage 02)`,
        body: "The smallest thing that can serve a request. Client speaks TCP / TLS / HTTP (Stage 02) to a Pod scheduled by Kubernetes on a Docker image (Stage 03); the Pod queries PostgreSQL on RDS. No edge, no proxy, no caching. Everything else in this roadmap is layers added to this picture.",
        why: [
          { stage: "02 Networking", text: "Every box in every later HLD speaks over the network. If TLS handshake, HTTP/2 multiplexing, DNS, and TCP back-pressure are black boxes, every 'why is p99 spiking?' debugging session devolves into guesswork. This is the layer that never gets abstracted away." },
          { stage: "03 Cloud & K8s", text: "Every modern SRE job is 'ops on Kubernetes running in a public cloud.' You can't reason about reliability without knowing what a Pod, Service, Ingress, IAM role, Security Group, or VPC actually is. The Todo app in Part B Phase 2 is the worked example you'll build here." },
        ],
      },
      {
        id: "hld-2",
        title: "HLD 2 — Add a reverse proxy in front of the app",
        unlocks: "Stage 06 Reverse Proxy",
        diagram:
`                  ┌─── TLS terminates here
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
                       └── Stage 06: zero-downtime reloads,
                            xDS dynamic config, gRPC routing`,
        body: "The first layer you put in front of your app. NGINX (HTTP-first stacks) or Envoy (gRPC + service-mesh data planes) terminates TLS once, fans requests across multiple app pods, retries when an upstream dies, and can microcache hot GETs to absorb traffic spikes.",
        why: [
          { stage: "06 Reverse Proxy", text: "The moment you have more than one backend pod or want to terminate TLS in one place instead of in every app, you need a reverse proxy. NGINX is the SRE baseline; Envoy is mandatory the moment you touch a service mesh (Istio / Kong Mesh / AWS App Mesh)." },
        ],
      },
      {
        id: "hld-3",
        title: "HLD 3 — Add API gateway + L4 load balancer",
        unlocks: "Stage 05 CDN, API Gateway & HTTP Caching (Kong + HAProxy + caching-theory parts)",
        diagram:
`                    ┌─── L4 LB: connection-level fan-out, stick tables,
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
                                            (Stage 05)`,
        body: "Production stacks rarely have just one microservice. HAProxy sits in front as a connection-level load balancer (or AWS ALB does this in cloud); Kong sits inside the cluster doing JWT auth, rate-limiting, and routing across many backends. NGINX/Envoy still terminates TLS and proxies into the actual app pod.",
        why: [
          { stage: "05 CDN, API Gateway & HTTP Caching", text: "At any APAC platform (Grab, Mercari, Agoda) someone owns 'the edge' — Kong/Apigee for auth + rate-limit, plus HTTP caching theory (Cache-Control, ETag, Vary, stale-while-revalidate, RFC 9111). Whoever owns the edge owns the SLO for everyone behind it." },
        ],
      },
      {
        id: "hld-4",
        title: "HLD 4 — Add a CDN at the global edge",
        unlocks: "Stage 09 Fastly CDN (and the Fastly piece of Stage 05)",
        diagram:
`                     ┌── Global edge POPs (Tokyo, Singapore, Sydney…)
                     │   VCL at the edge
                     │   Surrogate keys + instant purge
                     │   stale-while-revalidate, Compute@Edge (WASM)
                     ▼
[Client] ──▶ [Fastly POP] ──cache HIT (served in <50ms)──▶  [Client gets response]

[Client] ──▶ [Fastly POP] ──cache MISS──▶ [HAProxy] ──▶ [Kong] ──▶ [NGINX] ──▶ [App] ──▶ [DB]
                  ▲                                                                          │
                  └──────────────── response flows back, gets cached at edge ◀───────────────┘`,
        body: "Now you have two request paths — the cache-HIT path (served at the edge, never touches origin) and the cache-MISS path (traverses every layer below). Fastly's POPs sit close to users globally; on a HIT, user-perceived latency drops to single-digit ms regardless of where origin is.",
        why: [
          { stage: "09 Fastly CDN", text: "Stage 05 covers CDN concepts vendor-neutrally; Stage 09 is the hands-on Fastly-specific course: VCL dialect, surrogate keys, instant purge via API, Image Optimizer, Edge Rate Limiting, Compute@Edge. This is the dedicated track for the specific tool you'll touch on a real APAC publisher / e-commerce stack." },
        ],
      },
      {
        id: "hld-5",
        title: "HLD 5 — Add observability everywhere",
        unlocks: "Stage 04 Reliability",
        diagram:
`[Client] ──▶ [Fastly] ──▶ [HAProxy] ──▶ [Kong] ──▶ [NGINX] ──▶ [App] ──▶ [DB]
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
                                                 the user notices)`,
        body: "Every box in HLDs 1–4 now emits metrics (Prometheus exporters or /metrics endpoints), logs (Loki / Vector), and traces (OpenTelemetry → Tempo). Grafana unifies the view; multi-window multi-burn-rate alerts page oncall before the customer notices the SLO breach.",
        why: [
          { stage: "04 Reliability", text: "This is the actual SRE day job. Building things is half the work; knowing whether they're broken, fast enough, and within SLO is the other half. Every 'SRE' job description tests this in the interview, and every incident is graded on how fast you went from page → root cause → fix." },
        ],
      },
      {
        id: "hld-6",
        title: "HLD 6 — Provision everything as code (no console clicks)",
        unlocks: "Stage 07 Automation",
        diagram:
`                  [git repo: terraform/ + ansible/ + helm/ + fastly-vcl/]
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
                  every box in HLDs 1–5 is created by code, not the console`,
        body: "Nothing in the picture is clicked in the AWS console. Every VPC, K8s manifest, Kong route, Fastly VCL service, Grafana dashboard, and Prom alert is provisioned by Terraform / Ansible / Helm / decK / fastly-cli running in CI. Drift-free, reviewable, reproducible.",
        why: [
          { stage: "07 Automation", text: "'The SRE who clicks in the console' is a junior who can't be trusted with prod. The SRE who ships infra via PR with a terraform plan diff is the one who gets promoted (and the one who gets hired remote-first from Bangladesh by a Singapore or Tokyo team)." },
        ],
      },
    ],
    readingOrder: {
      diagram:
`Stage 02 → Stage 03 → Stage 06 → Stage 05 → Stage 04 → Stage 07
   ↑          ↑          ↑          ↑          ↑          ↑
 HLD 1      HLD 1      HLD 2      HLD 3      HLD 5      HLD 6
foundations  K8s     reverse-    edge      observe     code-
              up      proxy      gateways   everything   ify`,
      note: "Three orthogonal tracks run alongside this main path: Part B (the worked Todo App project — your hands-on companion through HLDs 1–6), Part 0A (system-design interview prep — pairs with HLDs 3–7 once the picture is rich enough), Part AI (AI/LLM track — orthogonal, run when bandwidth allows).",
    },
  },

  starStories: [
    { id: "star-incident", name: "Production incident — diagnose → fix → prevent" },
    { id: "star-disagree", name: "Disagreed with a senior engineer" },
    { id: "star-initiative", name: "Took initiative without being asked" },
    { id: "star-failure", name: "Failure or mistake (honest + learning)" },
    { id: "star-mentor", name: "Mentored or helped a teammate" },
    { id: "star-tradeoff", name: "Technical decision with trade-offs" },
    { id: "star-improve", name: "Improved a process or system" },
    { id: "star-deadline", name: "Missed a deadline (honest framing)" },
  ],
  lldVideos: [
    { id: "lld-elev",   type: "video", name: "Design an Elevator",                  url: "https://www.youtube.com/watch?v=fODT0ldeBiU" },
    { id: "lld-concur", type: "video", name: "Concurrency in LLD Interviews",       url: "https://www.youtube.com/watch?v=d8rmosXttTE" },
    { id: "lld-locker", type: "video", name: "Design Amazon Locker",                url: "https://www.youtube.com/watch?v=s6nGkoGJhXk" },
    { id: "lld-c4",     type: "video", name: "Design Connect Four",                 url: "https://www.youtube.com/watch?v=9UI4ikKP3Ws" },
  ],
  lldPractice: [
    { id: "lld-parking", name: "Parking Lot" },
    { id: "lld-chess", name: "Chess" },
    { id: "lld-library", name: "Library System" },
    { id: "lld-food", name: "Food Delivery App" },
    { id: "lld-notif", name: "Notification System" },
  ],
  sqlConcepts: [
    { id: "sql-joins", name: "JOIN types (INNER / LEFT / SELF / CROSS)" },
    { id: "sql-agg", name: "Aggregation + GROUP BY / HAVING" },
    { id: "sql-window", name: "Window Functions (ROW_NUMBER, RANK, LAG, LEAD)" },
    { id: "sql-cte", name: "CTEs vs Subqueries" },
    { id: "sql-null", name: "NULL handling (COALESCE, IFNULL, NULLIF)" },
    { id: "sql-string", name: "String functions" },
    { id: "sql-date", name: "Date & time functions" },
    { id: "sql-case", name: "CASE expressions + pivot pattern" },
    { id: "sql-union", name: "UNION vs UNION ALL" },
    { id: "sql-distinct", name: "DISTINCT vs GROUP BY" },
    { id: "sql-index", name: "Index usage + EXPLAIN" },
    { id: "sql-tx", name: "Transactions & isolation levels" },
  ],
  sqlProblems: [
    [175,"Combine Two Tables","Easy"],[176,"Second Highest Salary","Medium"],
    [177,"Nth Highest Salary","Medium"],[178,"Rank Scores","Medium"],
    [180,"Consecutive Numbers","Medium"],[181,"Employees Earning > Manager","Easy"],
    [182,"Duplicate Emails","Easy"],[183,"Customers Who Never Order","Easy"],
    [184,"Department Highest Salary","Medium"],[185,"Department Top 3 Salaries","Hard"],
    [196,"Delete Duplicate Emails","Easy"],[197,"Rising Temperature","Easy"],
    [262,"Trips and Users","Hard"],[511,"Game Play Analysis I","Easy"],
    [550,"Game Play Analysis IV","Medium"],[570,"Managers with ≥5 Reports","Medium"],
    [577,"Employee Bonus","Easy"],[584,"Find Customer Referee","Easy"],
    [595,"Big Countries","Easy"],[601,"Human Traffic of Stadium","Hard"],
    [626,"Exchange Seats","Medium"],[1045,"Customers Bought All Products","Medium"],
    [1141,"User Activity Past 30 Days","Easy"],[1179,"Reformat Department Table","Medium"],
    [1193,"Monthly Transactions I","Medium"],[1321,"Restaurant Growth","Hard"],
    [1341,"Movie Rating","Medium"],[1484,"Group Sold Products By Date","Easy"],
    [1667,"Fix Names in a Table","Easy"],[1934,"Confirmation Rate","Medium"],
  ].map(([n,t,d]) => ({ id: `sql-${n}`, num: n, name: t, level: d })),

  // 150 DSA problems organized by topic
  dsaTopics: [
    { topic: "Arrays & Strings", items: [
      [1,"Two Sum","Easy"],[2,"Best Time to Buy & Sell Stock","Easy"],
      [3,"Contains Duplicate","Easy"],[4,"Valid Anagram","Easy"],
      [5,"Valid Palindrome","Easy"],[6,"Product of Array Except Self","Medium"],
      [7,"Maximum Subarray","Medium"],[8,"Maximum Product Subarray","Medium"],
      [9,"3Sum","Medium"],[10,"Container With Most Water","Medium"],
      [11,"Longest Substring W/o Repeating","Medium"],[12,"Longest Repeating Char Replacement","Medium"],
      [13,"Group Anagrams","Medium"],[14,"Subarray Sum Equals K","Medium"],
      [15,"Rotate Array","Medium"],[16,"Find Min in Rotated Sorted","Medium"],
      [17,"Search in Rotated Sorted","Medium"],[18,"Trapping Rain Water","Hard"],
      [19,"Minimum Window Substring","Hard"],[20,"Sliding Window Maximum","Hard"],
    ]},
    { topic: "Binary Search", items: [
      [21,"Binary Search","Easy"],[22,"First Bad Version","Easy"],
      [23,"Search a 2D Matrix","Medium"],[24,"Find Peak Element","Medium"],
      [25,"Koko Eating Bananas","Medium"],[26,"Time Based Key-Value Store","Medium"],
      [27,"Ship Packages Within D Days","Medium"],[28,"Find the Duplicate Number","Medium"],
      [29,"Split Array Largest Sum","Hard"],[30,"Median of Two Sorted Arrays","Hard"],
    ]},
    { topic: "Hash Maps & Sets", items: [
      [31,"Top K Frequent Elements","Medium"],[32,"Longest Consecutive Sequence","Medium"],
      [33,"Valid Sudoku","Medium"],[34,"LRU Cache","Medium"],
      [35,"Insert Delete GetRandom O(1)","Medium"],[36,"Two Sum II — Sorted","Medium"],
      [37,"Isomorphic Strings","Easy"],[38,"Word Pattern","Easy"],
      [39,"Design HashMap","Easy"],[40,"First Missing Positive","Hard"],
    ]},
    { topic: "Trees", items: [
      [41,"Invert Binary Tree","Easy"],[42,"Max Depth of Binary Tree","Easy"],
      [43,"Diameter of Binary Tree","Easy"],[44,"Balanced Binary Tree","Easy"],
      [45,"Same Tree","Easy"],[46,"Subtree of Another Tree","Easy"],
      [47,"Path Sum","Easy"],[48,"Level Order Traversal","Medium"],
      [49,"Right Side View","Medium"],[50,"Validate BST","Medium"],
      [51,"Kth Smallest in BST","Medium"],[52,"LCA of BST","Medium"],
      [53,"LCA of Binary Tree","Medium"],[54,"Construct from Preorder + Inorder","Medium"],
      [55,"Count Good Nodes","Medium"],[56,"Implement Trie","Medium"],
      [57,"Add and Search Words","Medium"],[58,"Word Search II","Hard"],
      [59,"Binary Tree Max Path Sum","Hard"],[60,"Serialize/Deserialize Binary Tree","Hard"],
    ]},
    { topic: "Graphs", items: [
      [61,"Number of Islands","Medium"],[62,"Max Area of Island","Medium"],
      [63,"Clone Graph","Medium"],[64,"Number of Provinces","Medium"],
      [65,"Rotting Oranges","Medium"],[66,"01 Matrix","Medium"],
      [67,"Surrounded Regions","Medium"],[68,"Pacific Atlantic Water Flow","Medium"],
      [69,"Course Schedule","Medium"],[70,"Course Schedule II","Medium"],
      [71,"Redundant Connection","Medium"],[72,"Accounts Merge","Medium"],
      [73,"Is Graph Bipartite?","Medium"],[74,"All Paths Source→Target","Medium"],
      [75,"Keys and Rooms","Medium"],[76,"Find Path Exists in Graph","Easy"],
      [77,"Network Delay Time","Medium"],[78,"Cheapest Flights K Stops","Medium"],
      [79,"Minimum Height Trees","Medium"],[80,"Word Ladder","Hard"],
    ]},
    { topic: "Heaps / Priority Queues", items: [
      [81,"Last Stone Weight","Easy"],[82,"Kth Largest Element","Medium"],
      [83,"K Closest Points to Origin","Medium"],[84,"Top K Frequent Words","Medium"],
      [85,"Task Scheduler","Medium"],[86,"Reorganize String","Medium"],
      [87,"Design Twitter","Medium"],[88,"IPO","Hard"],
      [89,"Find Median from Data Stream","Hard"],[90,"Merge K Sorted Lists","Hard"],
    ]},
    { topic: "Stack & Monotonic Stack", items: [
      [91,"Valid Parentheses","Easy"],[92,"Next Greater Element I","Easy"],
      [93,"Min Stack","Medium"],[94,"Evaluate RPN","Medium"],
      [95,"Generate Parentheses","Medium"],[96,"Daily Temperatures","Medium"],
      [97,"Online Stock Span","Medium"],[98,"Car Fleet","Medium"],
      [99,"Remove K Digits","Medium"],[100,"Largest Rectangle in Histogram","Hard"],
    ]},
    { topic: "Linked Lists", items: [
      [101,"Reverse Linked List","Easy"],[102,"Merge Two Sorted Lists","Easy"],
      [103,"Linked List Cycle","Easy"],[104,"Palindrome Linked List","Easy"],
      [105,"Intersection of Two Linked Lists","Easy"],[106,"Remove Nth From End","Medium"],
      [107,"Reorder List","Medium"],[108,"Add Two Numbers","Medium"],
      [109,"Copy List with Random Pointer","Medium"],[110,"Reverse Linked List II","Medium"],
    ]},
    { topic: "Dynamic Programming", items: [
      [111,"Climbing Stairs","Easy"],[112,"House Robber","Medium"],
      [113,"House Robber II","Medium"],[114,"Longest Palindromic Substring","Medium"],
      [115,"Palindromic Substrings","Medium"],[116,"Decode Ways","Medium"],
      [117,"Coin Change","Medium"],[118,"Coin Change II","Medium"],
      [119,"Word Break","Medium"],[120,"Longest Increasing Subseq","Medium"],
      [121,"Longest Common Subseq","Medium"],[122,"Unique Paths","Medium"],
      [123,"Jump Game","Medium"],[124,"Jump Game II","Medium"],
      [125,"Target Sum","Medium"],[126,"Partition Equal Subset Sum","Medium"],
      [127,"Buy & Sell Stock w/ Cooldown","Medium"],[128,"Interleaving String","Medium"],
      [129,"Edit Distance","Medium"],[130,"Regular Expression Matching","Hard"],
    ]},
    { topic: "Backtracking", items: [
      [131,"Subsets","Medium"],[132,"Subsets II","Medium"],
      [133,"Permutations","Medium"],[134,"Combination Sum","Medium"],
      [135,"Combination Sum II","Medium"],[136,"Letter Combos of Phone","Medium"],
      [137,"Word Search","Medium"],[138,"Palindrome Partitioning","Medium"],
      [139,"Restore IP Addresses","Medium"],[140,"N-Queens","Hard"],
    ]},
    { topic: "Intervals", items: [
      [141,"Merge Intervals","Medium"],[142,"Insert Interval","Medium"],
      [143,"Non-overlapping Intervals","Medium"],[144,"Min Arrows to Burst Balloons","Medium"],
      [145,"Interval List Intersections","Medium"],
    ]},
    { topic: "Math & Bit Manipulation", items: [
      [146,"Number of 1 Bits","Easy"],[147,"Counting Bits","Easy"],
      [148,"Reverse Bits","Easy"],[149,"Missing Number","Easy"],
      [150,"Sum of Two Integers","Medium"],
    ]},
  ].map(t => ({ ...t, items: t.items.map(([n,name,d]) => ({ id:`dsa-${n}`, num:n, name, level:d })) })),

  // 24-week schedule
  schedule: [
    { weeks: "1–2", focus: "Delivery framework + Easy problems (Bitly, Dropbox)", id: "wk-1-2" },
    { weeks: "3–4", focus: "Core concepts (caching, sharding, CAP) + DSA arrays/strings/hashmaps", id: "wk-3-4" },
    { weeks: "5–8", focus: "Medium system design (2/week) + DSA trees/graphs/binary search", id: "wk-5-8" },
    { weeks: "9–12", focus: "Hard system design + Behavioral story bank (write 8 stories)", id: "wk-9-12" },
    { weeks: "13–16", focus: "Mock interviews + LLD basics", id: "wk-13-16" },
    { weeks: "17–20", focus: "Company-specific prep (Grab, Shopee, ByteDance) + full mock loops", id: "wk-17-20" },
    { weeks: "21–24", focus: "Live interviews + 1 LeetCode/day maintenance", id: "wk-21-24" },
  ],

  // ────────────────────────────────────────────────────────────────
  // PART B — Hands-on Phases (Todo app)
  // ────────────────────────────────────────────────────────────────
  phases: [
    { id: "p1", title: "Phase 1 — Build & Containerize",
      goal: "Run the app locally with Docker Compose.",
      tasks: [
        { id: "p1-go", name: "Write Go API: CRUD + /health + /metrics" },
        { id: "p1-dockerfile", name: "Multi-stage Dockerfile (distroless final)" },
        { id: "p1-compose", name: "docker-compose.yml: api + postgres + pgadmin" },
        { id: "p1-air", name: "docker-compose.override.yml for Air hot-reload" },
        { id: "p1-trivy", name: "Scan image with Trivy" },
      ]},
    { id: "p2", title: "Phase 2 — Kubernetes (local kind)",
      goal: "Deploy the Todo app on a local kind cluster.",
      tasks: [
        { id: "p2-kind", name: "Create kind cluster" },
        { id: "p2-ns", name: "namespace.yaml" },
        { id: "p2-cm", name: "configmap.yaml (DB host/port/name)" },
        { id: "p2-secret", name: "secret.yaml (base64 DB password)" },
        { id: "p2-deploy", name: "deployment.yaml + resources + probes" },
        { id: "p2-svc", name: "service.yaml (ClusterIP)" },
        { id: "p2-ing", name: "ingress.yaml (NGINX)" },
        { id: "p2-hpa", name: "hpa.yaml (CPU 60%)" },
        { id: "p2-pg", name: "postgres StatefulSet + PVC + service" },
        { id: "p2-helm", name: "Convert to Helm chart helm/todo-app/" },
        { id: "p2-rbac", name: "ServiceAccount + least-privilege Role" },
        { id: "p2-rollout", name: "Practice rollout history / undo" },
      ]},
    { id: "p3", title: "Phase 3 — ELK Stack (Logging)",
      goal: "Ship and search all logs via ELK.",
      tasks: [
        { id: "p3-deploy", name: "Helm-install Elasticsearch/Kibana/Logstash/Filebeat" },
        { id: "p3-zap", name: "Structured JSON logs in Go (zap)" },
        { id: "p3-pipeline", name: "Logstash pipeline (json + date + mutate)" },
        { id: "p3-index", name: "Kibana index pattern filebeat-*" },
        { id: "p3-dash", name: "Dashboard: req rate, error rate, slow endpoints" },
        { id: "p3-alert", name: "Watcher alert: >10 errors/min" },
        { id: "p3-ilm", name: "Configure index lifecycle (ILM)" },
      ]},
    { id: "p4", title: "Phase 4 — Observability (metrics + traces + alerts)",
      goal: "Full three-pillar observability on Todo app.",
      tasks: [
        { id: "p4-prom", name: "Instrument Go API with Prometheus histograms" },
        { id: "p4-kp", name: "Install kube-prometheus-stack" },
        { id: "p4-promql", name: "Write PromQL: rate / error% / p99 / throttling" },
        { id: "p4-graf", name: "Grafana: Golden Signals dashboard" },
        { id: "p4-graf2", name: "Grafana: Pods CPU/mem vs requests/limits" },
        { id: "p4-graf3", name: "Grafana: Postgres query + pool" },
        { id: "p4-alert", name: "Alert rule: HighErrorRate >5% for 2m" },
        { id: "p4-otel", name: "OTel tracing in Go API" },
        { id: "p4-jaeger", name: "Deploy Jaeger + inspect spans" },
        { id: "p4-slo", name: "Define SLO + error budget + burn rate" },
        { id: "p4-runbook", name: "Write runbook for HighErrorRate" },
      ]},
    { id: "p5", title: "Phase 5 — AWS Deployment",
      goal: "Ship the production Todo app on AWS.",
      tasks: [
        { id: "p5-vpc", name: "VPC: 2 public + 2 private subnets, NAT" },
        { id: "p5-ecr", name: "ECR repo + push image" },
        { id: "p5-eks", name: "EKS cluster + managed node group" },
        { id: "p5-irsa", name: "IRSA for todo-api pod" },
        { id: "p5-rds", name: "RDS PostgreSQL Multi-AZ" },
        { id: "p5-s3cf", name: "S3 + CloudFront for frontend" },
        { id: "p5-alb", name: "AWS Load Balancer Controller + Ingress" },
        { id: "p5-acm", name: "ACM cert + Route 53 alias" },
        { id: "p5-sm", name: "Secrets Manager + External Secrets Operator" },
        { id: "p5-cw", name: "CloudWatch Container Insights" },
        { id: "p5-ct", name: "CloudTrail + GuardDuty enabled" },
      ]},
    { id: "p6", title: "Phase 6 — IaC with Terraform",
      goal: "Everything in code, remote state, modules.",
      tasks: [
        { id: "p6-backend", name: "S3 + DynamoDB backend with lock" },
        { id: "p6-mods", name: "Modules: vpc / eks / rds / s3-cloudfront" },
        { id: "p6-env", name: "environments/dev + environments/prod" },
        { id: "p6-cmds", name: "Practice plan/apply/import/state list" },
      ]},
    { id: "p7", title: "Phase 7 — CI/CD (GitHub Actions)",
      goal: "Build → test → scan → push → deploy.",
      tasks: [
        { id: "p7-oidc", name: "OIDC AWS credentials (no long-lived keys)" },
        { id: "p7-build", name: "Build + Trivy scan in CI" },
        { id: "p7-push", name: "Push to ECR with SHA tag" },
        { id: "p7-helm", name: "helm upgrade --atomic deploy to EKS" },
      ]},
  ],

  // ────────────────────────────────────────────────────────────────
  // PART E — Coding & Programming
  // ────────────────────────────────────────────────────────────────
  goPath: [
    { id: "go-tour", name: "A Tour of Go (tour.golang.org) — 5 hrs" },
    { id: "go-bodner", name: "“Learning Go” (Jon Bodner)" },
    { id: "go-byex", name: "Go by Example — pattern reference" },
    { id: "go-cli", name: "Build small CLI (kubectl plugin or log parser)" },
    { id: "go-30", name: "30 LeetCode problems in Go" },
  ],
  otherSkills: [
    { id: "sk-bash", name: "Bash: awk / sed / grep / jq / yq + Makefile" },
    { id: "sk-linux", name: "“The Linux Command Line” (free)" },
    { id: "sk-sql50", name: "LeetCode Top 50 SQL" },
  ],

  // ────────────────────────────────────────────────────────────────
  // PART G — APAC Job Search (companies)
  // ────────────────────────────────────────────────────────────────
  jobsByCountry: {
    Singapore: [
      ["Grab","https://grab.careers"],["Shopee / Sea Group","https://careers.sea.com"],
      ["ByteDance / TikTok","https://jobs.bytedance.com"],["Stripe","https://stripe.com/jobs"],
      ["GovTech Singapore","https://careers.tech.gov.sg"],["DBS Bank","https://www.dbs.com/careers"],
      ["OCBC Bank","https://www.ocbc.com/group/careers"],["UOB","https://www.uobgroup.com/careers"],
      ["Ninja Van","https://careers.ninjavan.co"],["Carousell","https://careers.carousell.com"],
      ["Razer","https://careers.razer.com"],["Circles.Life","https://circles.life/careers"],
      ["Lazada","https://careers.lazada.com"],["Gojek","https://www.gojek.com/en-id/careers"],
      ["Wise","https://www.wise.jobs"],["Confluent","https://www.confluent.io/careers"],
      ["Datadog","https://careers.datadoghq.com"],["Cloudflare","https://www.cloudflare.com/careers"],
      ["Zendesk","https://jobs.zendesk.com"],["Twilio","https://www.twilio.com/en-us/company/jobs"],
      ["Palantir","https://www.palantir.com/careers"],["Mastercard","https://careers.mastercard.com"],
      ["Standard Chartered","https://www.sc.com/en/careers"],["Singtel","https://careers.singtel.com"],
      ["ST Engineering","https://careers.stengg.com"],["Synapxe (IHiS)","https://www.synapxe.sg/careers"],
      ["Traveloka","https://www.traveloka.com/en-sg/careers"],["Foodpanda","https://careers.foodpanda.com"],
      ["PropertyGuru","https://www.propertyguru.com.sg/property-management-news/careers"],
      ["Carro","https://carro.co/careers"],["Nium","https://www.nium.com/careers"],
    ],
    Japan: [
      ["Mercari / Merpay","https://careers.mercari.com"],["PayPay","https://about.paypay.ne.jp/en/career"],
      ["Rakuten","https://global.rakuten.com/corp/careers"],["Indeed Japan","https://www.indeed.jobs"],
      ["Woven by Toyota","https://woven.toyota/en/careers"],["LINE / LY Corp","https://careers.lycorp.co.jp/en"],
      ["Cybozu","https://cybozu.co.jp/recruit"],["SmartNews","https://careers.smartnews.com"],
      ["Moneyforward","https://corp.moneyforward.com/recruit"],["DeNA","https://dena.com/intl/careers"],
      ["Sansan","https://jp.corp-sansan.com/recruit"],["Freee","https://jobs.freee.co.jp"],
      ["Recruit Holdings","https://www.recruit.co.jp/employment"],["Cookpad","https://cookpad.jobs"],
      ["M3","https://corporate.m3.com/recruit"],["Dwango / Niconico","https://dwango.co.jp/recruit"],
      ["CADDi","https://caddi.com/careers"],["Preferred Networks","https://preferred.jp/en/careers"],
      ["NTT Data","https://www.nttdata.com/global/en/careers"],["Fujitsu","https://careers.fujitsu.com"],
      ["Sony","https://www.sony.com/en/SonyInfo/Jobs"],["Toyota Connected","https://www.toyotaconnected.co.jp/recruit"],
      ["Globis","https://job.globis.co.jp"],["SmartHR","https://smarthr.co.jp/recruit"],
      ["Aiming","https://aiming-inc.com/ja/recruit"],
    ],
    Malaysia: [
      ["Grab (KL)","https://grab.careers"],["Shopee (KL)","https://careers.sea.com"],
      ["ByteDance (KL)","https://jobs.bytedance.com"],["Axiata / Celcom","https://axiata.com/careers"],
      ["CIMB","https://www.cimb.com/en/careers.html"],["Maybank","https://www.maybank.com/en/careers.page"],
      ["Telekom Malaysia","https://www.tm.com.my/Careers"],["AirAsia / Capital A","https://careers.airasia.com"],
      ["Fusionex","https://www.fusionex-international.com/careers"],["Maxis","https://www.maxis.com.my/maxis-for-you/careers"],
      ["Lazada (KL)","https://careers.lazada.com"],["Agoda (KL)","https://careersatagoda.com"],
      ["Foodpanda Malaysia","https://careers.foodpanda.com"],["GXBank","https://www.gxbank.com.my/careers"],
      ["Touch 'n Go","https://www.touchngo.com.my/careers"],["Boost Holdings","https://www.myboost.com.my/careers"],
      ["RHB Bank","https://careers.rhbgroup.com"],["Public Bank","https://www.publicbankgroup.com/Career"],
      ["PETRONAS","https://www.petronas.com/career"],["Luno","https://luno.com/en/careers"],
      ["iPay88","https://www.ipay88.com.my/careers"],["Pos Malaysia","https://www.pos.com.my/careers"],
      ["MyEG","https://www.myeg.com.my/career"],["Astro","https://www.astro.com.my/corporate/careers"],
    ],
    Thailand: [
      ["Agoda","https://careersatagoda.com"],["LINE MAN Wongnai","https://lmwn.com/career"],
      ["SCB 10X","https://www.scb10x.com/careers"],["Kasikorn Bank","https://kasikornbank.com/en/career"],
      ["True Digital","https://www.truedigital.com/en/career"],["Ascend Money","https://www.ascendmoney.io/careers"],
      ["Grab (Bangkok)","https://grab.careers"],["Lazada (Bangkok)","https://careers.lazada.com"],
      ["Foodpanda Thailand","https://careers.foodpanda.com"],["Shopee Thailand","https://careers.sea.com"],
      ["ByteDance (Bangkok)","https://jobs.bytedance.com"],["Krungsri","https://www.krungsri.com/en/careers"],
      ["Bangkok Bank","https://www.bangkokbank.com/en/careers"],["KBTG (KBank Tech)","https://kbtg.tech/career"],
      ["PTT Digital","https://www.pttdigital.com/en/career"],["SCB","https://careers.scb.co.th"],
      ["AIS","https://career.ais.th"],["Flash Express","https://www.flashexpress.co.th/career"],
      ["Omise / Opn","https://opn.ooo/careers"],["2C2P","https://2c2p.com/careers"],
      ["Central Tech","https://www.centraltech.io/careers"],["Bitkub","https://www.bitkub.com/careers"],
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // PART H — Interview Prep
  // ────────────────────────────────────────────────────────────────
  loopRounds: [
    { id: "lp-recruiter", name: "Recruiter screen (30 min)" },
    { id: "lp-hm", name: "Hiring manager call (45 min)" },
    { id: "lp-coding", name: "Coding round (60 min) — 1–2 LC mediums" },
    { id: "lp-sd", name: "System design (60 min)" },
    { id: "lp-behavior", name: "Behavioral / culture fit (45 min)" },
  ],
  questionsToAsk: [
    { id: "q-slo", name: "How is SRE success measured here?" },
    { id: "q-oncall", name: "What does on-call look like?" },
    { id: "q-balance", name: "How is reliability vs feature pressure balanced?" },
    { id: "q-90days", name: "What does success in first 90 days look like?" },
  ],

  // ────────────────────────────────────────────────────────────────
  // PART I — Personal Branding
  // ────────────────────────────────────────────────────────────────
  repos: [
    { id: "r-obs", name: "aws-observability-stack", desc: "Terraform + Helm for Prom/Grafana/Loki/Tempo on EKS" },
    { id: "r-go", name: "go-microservice-template", desc: "12-factor Go service + OTel + CI/CD + K8s" },
    { id: "r-cost", name: "aws-cost-analyzer", desc: "Go CLI auditing AWS for cost wins" },
    { id: "r-sec", name: "k8s-secure-pipeline", desc: "CI: SAST + DAST + image scan + Cosign" },
    { id: "r-tf", name: "terraform-aws-modules", desc: "Reusable secure Terraform modules" },
    { id: "r-rb", name: "sre-runbook-templates", desc: "Runbook / postmortem / ADR templates" },
  ],
  blogIdeas: [
    { id: "b-saa", name: "How I passed AWS SAA in 6 weeks" },
    { id: "b-obs", name: "Building full observability: Prom + Grafana + Loki + Tempo on K8s" },
    { id: "b-cost", name: "5 AWS cost optimizations that actually moved the needle" },
    { id: "b-gha", name: "Jenkins → GitHub Actions: a real migration walkthrough" },
    { id: "b-pm", name: "Postmortem: what I learned from a public incident" },
  ],
  certs: [
    { id: "c-saa", name: "AWS SAA-C03 (Stephane Maarek + TD)", weeks: "6–8" },
    { id: "c-cka", name: "CKA (KodeKloud)", weeks: "—" },
    { id: "c-tf", name: "Terraform Associate", weeks: "—" },
    { id: "c-devops", name: "AWS DevOps Pro (optional)", weeks: "~12" },
    { id: "c-finops", name: "FinOps Certified Practitioner", weeks: "~6 hrs" },
  ],

  // ────────────────────────────────────────────────────────────────
  // PART J — Resources
  // ────────────────────────────────────────────────────────────────
  books: [
    { id: "bk-ddia", type: "book", name: "Designing Data-Intensive Applications — Kleppmann",          url: "https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/" },
    { id: "bk-sre",  type: "book", name: "Site Reliability Engineering — Google (free, ch 1–6, 11–18)", url: "https://sre.google/sre-book/table-of-contents/" },
    { id: "bk-srew", type: "book", name: "The Site Reliability Workbook — Google (free)",              url: "https://sre.google/workbook/table-of-contents/" },
    { id: "bk-tf",   type: "book", name: "Terraform: Up & Running — Brikman (3rd ed)",                 url: "https://www.terraformupandrunning.com/" },
    { id: "bk-go",   type: "book", name: "Learning Go — Jon Bodner",                                   url: "https://www.oreilly.com/library/view/learning-go-2nd/9781098139285/" },
    { id: "bk-xu",   type: "book", name: "System Design Interview Vol 1 & 2 — Alex Xu",                url: "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF" },
    { id: "bk-phx",  type: "book", name: "The Phoenix Project — Gene Kim",                             url: "https://itrevolution.com/product/the-phoenix-project/" },
  ],
  courses: [
    { id: "co-saa",    type: "course", name: "AWS SAA-C03 (Stephane Maarek)",         plat: "Udemy",             cost: "$10–15", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
    { id: "co-td",     type: "course", name: "SAA Practice Exams (Jon Bonso)",        plat: "Tutorials Dojo",    cost: "$15",    url: "https://portal.tutorialsdojo.com/" },
    { id: "co-cka",    type: "course", name: "CKA (Mumshad)",                         plat: "KodeKloud",         cost: "$30/mo", url: "https://kodekloud.com/courses/certified-kubernetes-administrator-cka/" },
    { id: "co-tf",     type: "course", name: "Terraform AWS Track",                   plat: "HashiCorp Learn",   cost: "FREE",   url: "https://developer.hashicorp.com/terraform/tutorials/aws-get-started" },
    { id: "co-go",     type: "course", name: "A Tour of Go",                          plat: "go.dev",            cost: "FREE",   url: "https://go.dev/tour/" },
    { id: "co-finops", type: "course", name: "FinOps Certified Practitioner",         plat: "FinOps Foundation", cost: "$325",   url: "https://www.finops.org/training/certifications/fcp/" },
  ],
  language: [
    { id: "lang-go-grider", lang: "Go",              type: "course", name: "Go: The Complete Developer's Guide (Stephen Grider) — concurrency, interfaces, web servers", plat: "Udemy · paid",   url: "https://www.udemy.com/course/go-the-complete-developers-guide/?srsltid=AfmBOoqsRzAwkSqQa_Fms2yQ0tGKLd8GANL0-tUZ0kqm4V1PH1LZkVGg&couponCode=MT260601G1" },
    { id: "lang-go-yt1",    lang: "Go",              type: "video",  name: "Golang Tutorial for Beginners — Full Go Course (syntax + idioms walkthrough)",                plat: "YouTube · free", url: "https://www.youtube.com/watch?v=yyUHQIec83I" },
    { id: "lang-fastapi",   lang: "Python / FastAPI", type: "course", name: "FastAPI — The Complete Course (async API, Pydantic, OpenAPI, auth)",                         plat: "Udemy · paid",   url: "https://www.udemy.com/course/fastapi-the-complete-course/?srsltid=AfmBOopBXaxC6W_UHp0C4diA5h1pZPGvGJHw-z5BBh1Xiia3WsOGUgtX&couponCode=MT260601G1" },
    { id: "lang-py-yt1",    lang: "Python / FastAPI", type: "video",  name: "Python Tutorial for Beginners — Learn Python in 5 Hours [Full Course]",                      plat: "YouTube · free", url: "https://www.youtube.com/watch?v=t8pPdKYpowI" },
  ],

  // ────────────────────────────────────────────────────────────────
  // SRE LEARNING — Become an SRE (curated path with resources)
  // Inserted between Part 0 (Interview Prep) and Mastery in the sidebar.
  // ────────────────────────────────────────────────────────────────
  aiDatacampCourses: [
    { id: "dc-ai-1", type: "course", level: "Basic", hours: 1.5, name: "Introduction to AI Agents", url: "https://www.datacamp.com/courses/introduction-to-ai-agents" },
    { id: "dc-ai-2", type: "course", level: "Basic", hours: 2, name: "Introduction to AI for Work", url: "https://www.datacamp.com/courses/introduction-to-ai-for-work" },
    { id: "dc-ai-3", type: "course", level: "Basic", hours: 1, name: "Understanding Prompt Engineering", url: "https://www.datacamp.com/courses/understanding-prompt-engineering" },
    { id: "dc-ai-4", type: "course", level: "Basic", hours: 1, name: "AI Ethics", url: "https://www.datacamp.com/courses/ai-ethics" },
    { id: "dc-ai-5", type: "course", level: "Basic", hours: 3, name: "Working with the OpenAI API", url: "https://www.datacamp.com/courses/working-with-the-openai-api" },
    { id: "dc-ai-6", type: "course", level: "Basic", hours: 2, name: "Understanding Artificial Intelligence", url: "https://www.datacamp.com/courses/understanding-artificial-intelligence" },
    { id: "dc-ai-7", type: "course", level: "Basic", hours: 1, name: "Understanding ChatGPT", url: "https://www.datacamp.com/courses/understanding-chatgpt" },
    { id: "dc-ai-8", type: "course", level: "Basic", hours: 2, name: "Generative AI Concepts", url: "https://www.datacamp.com/courses/generative-ai-concepts" },
    { id: "dc-ai-9", type: "course", level: "Basic", hours: 2, name: "Large Language Models (LLMs) Concepts", url: "https://www.datacamp.com/courses/large-language-models-llms-concepts" },
    { id: "dc-ai-10", type: "course", level: "Basic", hours: 1, name: "Introduction to Microsoft Copilot", url: "https://www.datacamp.com/courses/introduction-to-microsoft-copilot" },
    { id: "dc-ai-11", type: "course", level: "Basic", hours: 3, name: "Claude Code 101", url: "https://www.datacamp.com/courses/claude-code-101" },
    { id: "dc-ai-12", type: "course", level: "Basic", hours: 1, name: "Generative AI for Business", url: "https://www.datacamp.com/courses/generative-ai-for-business" },
    { id: "dc-ai-13", type: "course", level: "Basic", hours: 2, name: "Working with Microsoft Copilot", url: "https://www.datacamp.com/courses/working-with-microsoft-copilot" },
    { id: "dc-ai-14", type: "course", level: "Basic", hours: 1, name: "Introduction to ChatGPT", url: "https://www.datacamp.com/courses/introduction-to-chatgpt" },
    { id: "dc-ai-15", type: "course", level: "Basic", hours: 4, name: "Prompt Engineering with the OpenAI API", url: "https://www.datacamp.com/courses/prompt-engineering-with-the-openai-api" },
    { id: "dc-ai-16", type: "course", level: "Basic", hours: 2, name: "Working with Hugging Face", url: "https://www.datacamp.com/courses/working-with-hugging-face" },
    { id: "dc-ai-17", type: "course", level: "Basic", hours: 1.5, name: "Building Scalable Agentic Systems", url: "https://www.datacamp.com/courses/building-scalable-agentic-systems" },
    { id: "dc-ai-18", type: "course", level: "Basic", hours: 3, name: "Introduction to Workflow Automation with n8n", url: "https://www.datacamp.com/courses/introduction-to-workflow-automation-with-n8n" },
    { id: "dc-ai-19", type: "course", level: "Basic", hours: 2, name: "Implementing AI Solutions in Business", url: "https://www.datacamp.com/courses/implementing-ai-solutions-in-business" },
    { id: "dc-ai-20", type: "course", level: "Basic", hours: 1, name: "Intermediate ChatGPT", url: "https://www.datacamp.com/courses/intermediate-chatgpt" },
    { id: "dc-ai-21", type: "course", level: "Basic", hours: 2, name: "Practical AI with Google Gemini and NotebookLM", url: "https://www.datacamp.com/courses/practical-ai-with-google-gemini-and-notebooklm" },
    { id: "dc-ai-22", type: "course", level: "Basic", hours: 3, name: "Artificial Intelligence (AI) Strategy", url: "https://www.datacamp.com/courses/artificial-intelligence-ai-strategy" },
    { id: "dc-ai-23", type: "course", level: "Basic", hours: 1, name: "Large Language Models for Business", url: "https://www.datacamp.com/courses/large-language-models-for-business" },
    { id: "dc-ai-24", type: "course", level: "Basic", hours: 1, name: "LLMOps Concepts", url: "https://www.datacamp.com/courses/llmops-concepts" },
    { id: "dc-ai-25", type: "course", level: "Basic", hours: 1, name: "Cleaning Data with Generative AI", url: "https://www.datacamp.com/courses/cleaning-data-with-generative-ai" },
    { id: "dc-ai-26", type: "course", level: "Basic", hours: 2, name: "Responsible AI Practices", url: "https://www.datacamp.com/courses/responsible-ai-practices" },
    { id: "dc-ai-27", type: "course", level: "Basic", hours: 3, name: "AI for Finance", url: "https://www.datacamp.com/courses/ai-for-finance" },
    { id: "dc-ai-28", type: "course", level: "Basic", hours: 3, name: "Microsoft Copilot in Excel", url: "https://www.datacamp.com/courses/microsoft-copilot-in-excel" },
    { id: "dc-ai-29", type: "course", level: "Basic", hours: 2, name: "Vibe Coding with Replit", url: "https://www.datacamp.com/courses/vibe-coding-with-replit" },
    { id: "dc-ai-30", type: "course", level: "Basic", hours: 1, name: "Understanding the EU AI Act", url: "https://www.datacamp.com/courses/understanding-the-eu-ai-act" },
    { id: "dc-ai-31", type: "course", level: "Basic", hours: 1, name: "Monetizing Artificial Intelligence", url: "https://www.datacamp.com/courses/monetizing-artificial-intelligence" },
    { id: "dc-ai-32", type: "course", level: "Basic", hours: 2, name: "AI Security and Risk Management", url: "https://www.datacamp.com/courses/ai-security-and-risk-management" },
    { id: "dc-ai-33", type: "course", level: "Basic", hours: 1, name: "Introduction to GPTs", url: "https://www.datacamp.com/courses/introduction-to-gpts" },
    { id: "dc-ai-34", type: "course", level: "Basic", hours: 1, name: "Explainable Artificial Intelligence (XAI) Concepts", url: "https://www.datacamp.com/courses/explainable-artificial-intelligence-xai-concepts" },
    { id: "dc-ai-35", type: "course", level: "Basic", hours: 2, name: "Artificial Intelligence Governance", url: "https://www.datacamp.com/courses/artificial-intelligence-governance" },
    { id: "dc-ai-36", type: "course", level: "Basic", hours: 0.5, name: "Introduction to Google Workspace with Gemini", url: "https://www.datacamp.com/courses/introduction-to-google-workspace-with-gemini" },
    { id: "dc-ai-37", type: "course", level: "Basic", hours: 2, name: "Microsoft Copilot in PowerPoint", url: "https://www.datacamp.com/courses/microsoft-copilot-in-powerpoint" },
    { id: "dc-ai-38", type: "course", level: "Basic", hours: 3, name: "Microsoft Copilot in Word", url: "https://www.datacamp.com/courses/microsoft-copilot-in-word" },
    { id: "dc-ai-39", type: "course", level: "Basic", hours: 3, name: "AI for Marketing", url: "https://www.datacamp.com/courses/ai-for-marketing" },
    { id: "dc-ai-40", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Gmail", url: "https://www.datacamp.com/courses/gemini-in-gmail" },
    { id: "dc-ai-41", type: "course", level: "Basic", hours: 3, name: "AI for Human Resources", url: "https://www.datacamp.com/courses/ai-for-human-resources" },
    { id: "dc-ai-42", type: "course", level: "Basic", hours: 1, name: "Generate a Study Guide", url: "https://www.datacamp.com/courses/generate-a-study-guide" },
    { id: "dc-ai-43", type: "course", level: "Basic", hours: 3, name: "AI for Consulting", url: "https://www.datacamp.com/courses/ai-for-consulting" },
    { id: "dc-ai-44", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Google Slides", url: "https://www.datacamp.com/courses/gemini-in-google-slides" },
    { id: "dc-ai-45", type: "course", level: "Basic", hours: 1, name: "Building a Go-To-Market Strategy", url: "https://www.datacamp.com/courses/building-a-go-to-market-strategy" },
    { id: "dc-ai-46", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Google Docs", url: "https://www.datacamp.com/courses/gemini-in-google-docs" },
    { id: "dc-ai-47", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Google Meet", url: "https://www.datacamp.com/courses/gemini-in-google-meet" },
    { id: "dc-ai-48", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Google Sheets", url: "https://www.datacamp.com/courses/gemini-in-google-sheets" },
    { id: "dc-ai-49", type: "course", level: "Basic", hours: 0.5, name: "Gemini in Google Drive", url: "https://www.datacamp.com/courses/gemini-in-google-drive" },
    { id: "dc-ai-50", type: "course", level: "Basic", hours: 1.67, name: "AI for Sales", url: "https://www.datacamp.com/courses/ai-for-sales" },
    { id: "dc-ai-51", type: "course", level: "Basic", hours: 1, name: "AI-Assisted Travel Planning", url: "https://www.datacamp.com/courses/ai-assisted-travel-planning" },
    { id: "dc-ai-52", type: "course", level: "Basic", hours: 3, name: "Building Marketing Workflows with n8n", url: "https://www.datacamp.com/courses/building-marketing-workflows-with-n8n" },
    { id: "dc-ai-53", type: "course", level: "Basic", hours: 1, name: "Recommending Skincare Products", url: "https://www.datacamp.com/courses/recommending-skincare-products" },
    { id: "dc-ai-54", type: "course", level: "Basic", hours: 1, name: "AI-Assisted Product Launch", url: "https://www.datacamp.com/courses/ai-assisted-product-launch" },
    { id: "dc-ai-55", type: "course", level: "Basic", hours: 1, name: "AI-Assisted Restaurant Planning", url: "https://www.datacamp.com/courses/ai-assisted-restaurant-planning" },
    { id: "dc-ai-56", type: "course", level: "Basic", hours: 3, name: "Working with DeepSeek in Python", url: "https://www.datacamp.com/courses/working-with-deepseek-in-python" },
    { id: "dc-ai-57", type: "course", level: "Intermediate", hours: 4, name: "Introduction to Deep Learning with PyTorch", url: "https://www.datacamp.com/courses/introduction-to-deep-learning-with-pytorch" },
    { id: "dc-ai-58", type: "course", level: "Intermediate", hours: 3, name: "Developing LLM Applications with LangChain", url: "https://www.datacamp.com/courses/developing-llm-applications-with-langchain" },
    { id: "dc-ai-59", type: "course", level: "Intermediate", hours: 3, name: "Developing AI Systems with the OpenAI API", url: "https://www.datacamp.com/courses/developing-ai-systems-with-the-openai-api" },
    { id: "dc-ai-60", type: "course", level: "Intermediate", hours: 4, name: "Intermediate Deep Learning with PyTorch", url: "https://www.datacamp.com/courses/intermediate-deep-learning-with-pytorch" },
    { id: "dc-ai-61", type: "course", level: "Intermediate", hours: 3, name: "Introduction to LLMs in Python", url: "https://www.datacamp.com/courses/introduction-to-llms-in-python" },
    { id: "dc-ai-62", type: "course", level: "Intermediate", hours: 3, name: "Introduction to Embeddings with the OpenAI API", url: "https://www.datacamp.com/courses/introduction-to-embeddings-with-the-openai-api" },
    { id: "dc-ai-63", type: "course", level: "Intermediate", hours: 1.5, name: "Software Development with GitHub Copilot", url: "https://www.datacamp.com/courses/software-development-with-github-copilot" },
    { id: "dc-ai-64", type: "course", level: "Intermediate", hours: 3, name: "Retrieval Augmented Generation (RAG) with LangChain", url: "https://www.datacamp.com/courses/retrieval-augmented-generation-rag-with-langchain" },
    { id: "dc-ai-65", type: "course", level: "Intermediate", hours: 1.5, name: "AI-Assisted Coding for Developers", url: "https://www.datacamp.com/courses/ai-assisted-coding-for-developers" },
    { id: "dc-ai-66", type: "course", level: "Intermediate", hours: 4, name: "Natural Language Processing (NLP) in Python", url: "https://www.datacamp.com/courses/natural-language-processing-nlp-in-python" },
    { id: "dc-ai-67", type: "course", level: "Intermediate", hours: 3, name: "Introduction to Model Context Protocol (MCP)", url: "https://www.datacamp.com/courses/introduction-to-model-context-protocol-mcp" },
    { id: "dc-ai-68", type: "course", level: "Intermediate", hours: 3, name: "Designing Agentic Systems with LangChain", url: "https://www.datacamp.com/courses/designing-agentic-systems-with-langchain" },
    { id: "dc-ai-69", type: "course", level: "Intermediate", hours: 3, name: "Vector Databases for Embeddings with Pinecone", url: "https://www.datacamp.com/courses/vector-databases-for-embeddings-with-pinecone" },
    { id: "dc-ai-70", type: "course", level: "Intermediate", hours: 4, name: "Introduction to Deep Learning in Python", url: "https://www.datacamp.com/courses/introduction-to-deep-learning-in-python" },
    { id: "dc-ai-71", type: "course", level: "Intermediate", hours: 2, name: "Working with Llama 3", url: "https://www.datacamp.com/courses/working-with-llama-3" },
    { id: "dc-ai-72", type: "course", level: "Intermediate", hours: 1, name: "Building AI Agents with Google ADK", url: "https://www.datacamp.com/courses/building-ai-agents-with-google-adk" },
    { id: "dc-ai-73", type: "course", level: "Intermediate", hours: 1.5, name: "Software Development with Cursor", url: "https://www.datacamp.com/courses/software-development-with-cursor" },
    { id: "dc-ai-74", type: "course", level: "Intermediate", hours: 1, name: "Responsible AI Data Management", url: "https://www.datacamp.com/courses/responsible-ai-data-management" },
    { id: "dc-ai-75", type: "course", level: "Intermediate", hours: 4, name: "Explainable AI in Python", url: "https://www.datacamp.com/courses/explainable-ai-in-python" },
    { id: "dc-ai-76", type: "course", level: "Intermediate", hours: 4, name: "Introduction to Deep Learning with Keras", url: "https://www.datacamp.com/courses/introduction-to-deep-learning-with-keras" },
    { id: "dc-ai-77", type: "course", level: "Intermediate", hours: 1.5, name: "Software Development with Windsurf", url: "https://www.datacamp.com/courses/software-development-with-windsurf" },
    { id: "dc-ai-78", type: "course", level: "Intermediate", hours: 2, name: "Introduction to Generative AI in Snowflake", url: "https://www.datacamp.com/courses/introduction-to-generative-ai-in-snowflake" },
    { id: "dc-ai-79", type: "course", level: "Intermediate", hours: 2, name: "Multi-Modal Systems with the OpenAI API", url: "https://www.datacamp.com/courses/multi-modal-systems-with-the-openai-api" },
    { id: "dc-ai-80", type: "course", level: "Intermediate", hours: 2, name: "Fine-Tuning with Llama 3", url: "https://www.datacamp.com/courses/fine-tuning-with-llama-3" },
    { id: "dc-ai-81", type: "course", level: "Intermediate", hours: 1, name: "Building AI Agents with CrewAI", url: "https://www.datacamp.com/courses/building-ai-agents-with-crewai" },
    { id: "dc-ai-82", type: "course", level: "Intermediate", hours: 4, name: "Advanced Deep Learning with Keras", url: "https://www.datacamp.com/courses/advanced-deep-learning-with-keras" },
    { id: "dc-ai-83", type: "course", level: "Intermediate", hours: 3, name: "Introduction to Amazon Bedrock", url: "https://www.datacamp.com/courses/introduction-to-amazon-bedrock" },
    { id: "dc-ai-84", type: "course", level: "Intermediate", hours: 4, name: "Intermediate Workflow Automation with n8n", url: "https://www.datacamp.com/courses/intermediate-workflow-automation-with-n8n" },
    { id: "dc-ai-85", type: "course", level: "Intermediate", hours: 4, name: "Multi-Modal Models with Hugging Face", url: "https://www.datacamp.com/courses/multi-modal-models-with-hugging-face" },
    { id: "dc-ai-86", type: "course", level: "Intermediate", hours: 3, name: "Scalable AI Models with PyTorch Lightning", url: "https://www.datacamp.com/courses/scalable-ai-models-with-pytorch-lightning" },
    { id: "dc-ai-87", type: "course", level: "Intermediate", hours: 3, name: "Working with the OpenAI Responses API", url: "https://www.datacamp.com/courses/working-with-the-openai-responses-api" },
    { id: "dc-ai-88", type: "course", level: "Intermediate", hours: 1.5, name: "Building AI Agents with Haystack", url: "https://www.datacamp.com/courses/building-ai-agents-with-haystack" },
    { id: "dc-ai-89", type: "course", level: "Intermediate", hours: 2, name: "End-to-End RAG with Weaviate", url: "https://www.datacamp.com/courses/end-to-end-rag-with-weaviate" },
    { id: "dc-ai-90", type: "course", level: "Intermediate", hours: 2.5, name: "Introduction to Agent Skills", url: "https://www.datacamp.com/courses/introduction-to-agent-skills" },
    { id: "dc-ai-91", type: "course", level: "Intermediate", hours: 2, name: "Text-to-Query Agents with MongoDB and LangGraph", url: "https://www.datacamp.com/courses/text-to-query-agents-with-mongodb-and-langgraph" },
    { id: "dc-ai-92", type: "course", level: "Intermediate", hours: 2, name: "Introduction to Subagents", url: "https://www.datacamp.com/courses/introduction-to-subagents" },
    { id: "dc-ai-93", type: "course", level: "Intermediate", hours: 2, name: "Retrieval-Augmented Generation with LangChain", url: "https://www.datacamp.com/courses/retrieval-augmented-generation-with-langchain" },
    { id: "dc-ai-94", type: "course", level: "Intermediate", hours: 2, name: "LLM Application Evaluation with LangSmith", url: "https://www.datacamp.com/courses/llm-application-evaluation-with-langsmith" },
    { id: "dc-ai-95", type: "course", level: "Intermediate", hours: 3, name: "LLM Application Fundamentals with LangChain", url: "https://www.datacamp.com/courses/llm-application-fundamentals-with-langchain" },
    { id: "dc-ai-96", type: "course", level: "Intermediate", hours: 3, name: "LLM Tool Use with LangChain", url: "https://www.datacamp.com/courses/llm-tool-use-with-langchain" },
    { id: "dc-ai-97", type: "course", level: "Intermediate", hours: 2, name: "Prompt Engineering with LangChain", url: "https://www.datacamp.com/courses/prompt-engineering-with-langchain" },
    { id: "dc-ai-98", type: "course", level: "Intermediate", hours: 3, name: "Agentic Systems with LangGraph", url: "https://www.datacamp.com/courses/agentic-systems-with-langgraph" },
    { id: "dc-ai-99", type: "course", level: "Advanced", hours: 4, name: "Deep Learning for Images with PyTorch", url: "https://www.datacamp.com/courses/deep-learning-for-images-with-pytorch" },
    { id: "dc-ai-100", type: "course", level: "Advanced", hours: 2.75, name: "Multi-Agent Systems with LangGraph", url: "https://www.datacamp.com/courses/multi-agent-systems-with-langgraph" },
    { id: "dc-ai-101", type: "course", level: "Advanced", hours: 2, name: "Transformer Models with PyTorch", url: "https://www.datacamp.com/courses/transformer-models-with-pytorch" },
    { id: "dc-ai-102", type: "course", level: "Advanced", hours: 4, name: "Deep Learning for Text with PyTorch", url: "https://www.datacamp.com/courses/deep-learning-for-text-with-pytorch" },
    { id: "dc-ai-103", type: "course", level: "Advanced", hours: 4, name: "Reinforcement Learning with Gymnasium in Python", url: "https://www.datacamp.com/courses/reinforcement-learning-with-gymnasium-in-python" },
    { id: "dc-ai-104", type: "course", level: "Advanced", hours: 4, name: "Image Modeling with Keras", url: "https://www.datacamp.com/courses/image-modeling-with-keras" },
    { id: "dc-ai-105", type: "course", level: "Advanced", hours: 4, name: "Deploying AI into Production with FastAPI", url: "https://www.datacamp.com/courses/deploying-ai-into-production-with-fastapi" },
    { id: "dc-ai-106", type: "course", level: "Advanced", hours: 4, name: "Deep Reinforcement Learning in Python", url: "https://www.datacamp.com/courses/deep-reinforcement-learning-in-python" },
    { id: "dc-ai-107", type: "course", level: "Advanced", hours: 3, name: "AI Agents with Hugging Face smolagents", url: "https://www.datacamp.com/courses/ai-agents-with-hugging-face-smolagents" },
    { id: "dc-ai-108", type: "course", level: "Advanced", hours: 3, name: "Graph RAG with LangChain and Neo4j", url: "https://www.datacamp.com/courses/graph-rag-with-langchain-and-neo4j" },
    { id: "dc-ai-109", type: "course", level: "Advanced", hours: 4, name: "Reinforcement Learning from Human Feedback (RLHF)", url: "https://www.datacamp.com/courses/reinforcement-learning-from-human-feedback-rlhf" },
    { id: "dc-ai-110", type: "course", level: "Advanced", hours: 4, name: "Recurrent Neural Networks (RNNs) for Language Modeling with Keras", url: "https://www.datacamp.com/courses/recurrent-neural-networks-rnn-for-language-modeling-with-keras" },
    { id: "dc-ai-111", type: "course", level: "Advanced", hours: 1.5, name: "Advanced AI-Assisted Coding for Developers", url: "https://www.datacamp.com/courses/advanced-ai-assisted-coding-for-developers" },
    { id: "dc-ai-112", type: "course", level: "Advanced", hours: 3, name: "Databricks with the Python SDK", url: "https://www.datacamp.com/courses/databricks-with-the-python-sdk" },
    { id: "dc-ai-113", type: "course", level: "Advanced", hours: 2, name: "Building Agentic Workflows with LlamaIndex", url: "https://www.datacamp.com/courses/building-agentic-workflows-with-llamaindex" },
    { id: "dc-ai-114", type: "course", level: "Advanced", hours: 4, name: "Efficient AI Model Training with PyTorch", url: "https://www.datacamp.com/courses/efficient-ai-model-training-with-pytorch" },
    { id: "dc-ai-115", type: "course", level: "Advanced", hours: 4, name: "Machine Translation with Keras", url: "https://www.datacamp.com/courses/machine-translation-with-keras" },
  ],

  sreRoadmap: {
    networking: {
      title: "SRE 2 · Networking",
      resources: [
        // ── Application protocols (DNS / HTTP / TLS / SSH / FTP) ──
        { id: "net-r-10", type: "blog", sub: "Application protocols (DNS / HTTP / TLS / SSH / FTP)", name: "Julia Evans — networking zines (DNS, HTTP, TCP, How HTTPS works) — Start here", url: "https://wizardzines.com" },
        { id: "net-r-11", type: "blog", sub: "Application protocols (DNS / HTTP / TLS / SSH / FTP)", name: "Cloudflare Learning — DNS, HTTP, TLS, SSH one-pagers", url: "https://www.cloudflare.com/learning/" },
        { id: "net-r-12", type: "channel", sub: "Application protocols (DNS / HTTP / TLS / SSH / FTP)", name: "Hussein Nasser — TCP/HTTP/TLS/SSH protocol deep-dives (YouTube)", url: "https://www.youtube.com/@hnasr" },
        // ── Email protocols (SMTP / IMAP / POP3S / SPF / DKIM / DMARC) ──
        { id: "net-r-20", type: "blog", sub: "Email protocols (SMTP / IMAP / POP3S / SPF / DKIM / DMARC)", name: "Cloudflare Learning — Email security (SPF, DKIM, DMARC) — Start here", url: "https://www.cloudflare.com/learning/email-security/what-is-dmarc/" },
        { id: "net-r-21", type: "blog", sub: "Email protocols (SMTP / IMAP / POP3S / SPF / DKIM / DMARC)", name: "Google Workspace — SPF, DKIM, DMARC setup overview", url: "https://support.google.com/a/answer/10583557" },
        { id: "net-r-22", type: "blog", sub: "Email protocols (SMTP / IMAP / POP3S / SPF / DKIM / DMARC)", name: "MX Toolbox — SuperTool (free record checker) + delivery blog", url: "https://mxtoolbox.com/SuperTool.aspx" },
        // ── Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB) ──
        { id: "net-r-30", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "Cloudflare Learning — Forward proxy vs reverse proxy — Start here", url: "https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/" },
        { id: "net-r-31", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "Cloudflare Learning — What is load balancing? (L4 vs L7, algorithms, health checks)", url: "https://www.cloudflare.com/learning/performance/what-is-load-balancing/" },
        { id: "net-r-32", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "Cloudflare Learning — What is a firewall? (L3/L4/L7, WAF basics)", url: "https://www.cloudflare.com/learning/security/what-is-a-firewall/" },
        { id: "net-r-33", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "Cloudflare Learning — What is caching? (browser → CDN → server cache layers)", url: "https://www.cloudflare.com/learning/cdn/what-is-caching/" },
        { id: "net-r-34", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "DigitalOcean — UFW Essentials (practical host firewall rules)", url: "https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands" },
        { id: "net-r-35", type: "blog", sub: "Network plumbing primer (Forward/Reverse Proxy, Cache, Firewall, LB)", name: "AWS — ELB Types (ALB vs NLB vs CLB)", url: "https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html" },
      ],
      milestones: [
        { id: "net-m-1", name: "Use tcpdump or Wireshark to inspect a HTTP request" },
        { id: "net-m-2", name: "Trace a DNS lookup end-to-end with dig +trace" },
        { id: "net-m-3", name: "Use ss / lsof to find what's listening on a port" },
        { id: "net-m-4", name: "Register a cheap domain; set SPF + DKIM + DMARC; verify via the receiver's Authentication-Results header" },
        { id: "net-m-5", name: "Sketch the 5 plumbing boxes (forward proxy, reverse proxy, cache, firewall, LB) from memory and explain what each hides/protects" },
      ],
    },

    cloud: {
      title: "SRE 3 · Cloud, Containers & K8s",
      resources: [
        // ── Linux & shell ──
        { id: "scl-r-22", type: "course", sub: "Linux & shell", name: "MIT Missing Semester (shell, vim, git, ssh)", url: "https://missing.csail.mit.edu/" },
        { id: "scl-r-21", type: "video", sub: "Linux & shell", name: "Bash Scripting Tutorial — TechWorld with Nana", url: "https://www.youtube.com/watch?v=tK9Oc6AEnR4" },
        { id: "scl-r-24", type: "book", sub: "Linux & shell", name: "The Linux Command Line — William Shotts (free PDF)", url: "https://linuxcommand.org/tlcl.php" },
        // ── Docker ──
        { id: "scl-r-2", type: "video", sub: "Docker", name: "Docker Crash Course — TechWorld with Nana", url: "https://www.youtube.com/watch?v=3c-iBn73dDE" },
        { id: "scl-r-10", type: "course", sub: "Docker", name: "Docker Mastery — Bret Fisher (Udemy)", url: "https://www.udemy.com/course/docker-mastery/" },
        { id: "scl-r-5", type: "video", sub: "Docker", name: "Bret Fisher — Docker Live Shows (channel)", url: "https://www.youtube.com/c/BretFisherDockerandDevOps" },
        // ── Kubernetes & Helm ──
        { id: "scl-r-3", type: "video", sub: "Kubernetes & Helm", name: "Kubernetes Full Course — TechWorld with Nana (4h)", url: "https://www.youtube.com/watch?v=X48VuDVv0do" },
        { id: "scl-r-4", type: "video", sub: "Kubernetes & Helm", name: "Helm Crash Course — KodeKloud", url: "https://www.youtube.com/watch?v=jUYNS90nq8U" },
        { id: "scl-r-9", type: "course", sub: "Kubernetes & Helm", name: "KodeKloud — Certified Kubernetes Administrator (CKA)", url: "https://kodekloud.com/courses/certified-kubernetes-administrator-cka/" },
        // ── AWS & cloud-native ──
        { id: "scl-r-1", type: "video", sub: "AWS & cloud-native", name: "AWS Certified Cloud Practitioner — freeCodeCamp", url: "https://www.youtube.com/watch?v=NhDYbskXRgc" },
        { id: "scl-r-11", type: "course", sub: "AWS & cloud-native", name: "AWS Skill Builder (free official)", url: "https://skillbuilder.aws/" },
        { id: "scl-r-7", type: "course", sub: "AWS & cloud-native", name: "AWS SAA-C03 — Stephane Maarek (Udemy)", url: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/" },
        // ── Storage & virtualization ──
        { id: "scl-r-46", type: "blog", sub: "Storage & virtualization", name: "Red Hat — Block vs File vs Object storage", url: "https://www.redhat.com/en/topics/data-storage/file-block-object-storage" },
        { id: "scl-r-47", type: "video", sub: "Storage & virtualization", name: "How Linux Virtualization Works: KVM, QEMU & Libvirt (YouTube)", url: "https://www.youtube.com/watch?v=Cz3Pi11Tr84" },
        { id: "scl-r-49", type: "blog", sub: "Storage & virtualization", name: "Ceph docs — Architecture (RADOS / CRUSH / RBD / RGW)", url: "https://docs.ceph.com/en/latest/architecture/" },
      ],
      milestones: [
        { id: "scl-m-1", name: "Pass AWS Cloud Practitioner (or finish 50% of SAA course)" },
        { id: "scl-m-2", name: "Containerize a service with a multi-stage distroless Dockerfile" },
        { id: "scl-m-3", name: "Push an image to ECR / Docker Hub; pull on another host" },
        { id: "scl-m-4", name: "Stand up a kind cluster — deploy 2-tier app with Service + Ingress" },
        { id: "scl-m-5", name: "Add liveness + readiness probes to a Pod; watch them fail and recover" },
        { id: "scl-m-6", name: "Write a Helm chart for a real service" },
        { id: "scl-m-7", name: "Set up HPA + ClusterAutoscaler (or Karpenter on EKS)" },
        { id: "scl-m-8", name: "Deploy to EKS: VPC + node group + IAM Roles for Service Accounts (IRSA)" },
        { id: "scl-m-9", name: "Debug a failing Pod with k9s or Lens (events + describe + logs)" },
        { id: "scl-m-10", name: "Run Ubuntu in a VM (UTM / Multipass / WSL)" },
        { id: "scl-m-11", name: "Write 5 one-liners combining awk + sed + jq + grep" },
        { id: "scl-m-12", name: "Configure SSH keys and harden sshd_config" },
        { id: "scl-m-13", name: "Write + enable a systemd service unit" },
        { id: "scl-m-14", name: "Set up a cron job that emits a daily disk-usage report" },
        { id: "scl-m-15", name: "Run PostgreSQL with a streaming read replica; kill the primary and observe failover" },
        { id: "scl-m-16", name: "Apply an expand/contract schema migration with Flyway — zero downtime" },
        { id: "scl-m-17", name: "Self-host MinIO; create a bucket, set a lifecycle rule, generate a presigned URL" },
      ],
    },

    automation: {
      title: "SRE 10 · Automation — IaC + CI/CD + GitOps",
      resources: [
        // ── IaC — Terraform & Ansible ──
        { id: "sau-r-1", type: "video", sub: "IaC — Terraform & Ansible", name: "Terraform Full Course — TechWorld with Nana", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo" },
        { id: "sau-r-6", type: "course", sub: "IaC — Terraform & Ansible", name: "HashiCorp Learn — Terraform (free)", url: "https://developer.hashicorp.com/terraform/tutorials" },
        { id: "sau-r-2", type: "video", sub: "IaC — Terraform & Ansible", name: "Ansible Full Course — TechWorld with Nana", url: "https://www.youtube.com/watch?v=goclfp6a2IQ" },
        // ── CI/CD & GitOps ──
        { id: "sau-r-4", type: "video", sub: "CI/CD & GitOps", name: "GitHub Actions Full Course — TechWorld with Nana", url: "https://www.youtube.com/watch?v=R8_veQiYBjI" },
        { id: "sau-r-5", type: "video", sub: "CI/CD & GitOps", name: "ArgoCD GitOps — KodeKloud", url: "https://www.youtube.com/watch?v=MeU5_k9ssrs" },
        { id: "sau-r-14", type: "blog", sub: "CI/CD & GitOps", name: "Google DORA — DevOps research papers", url: "https://dora.dev/" },
        // ── Artifact registry (JFrog Artifactory) ──
        { id: "sau-r-20", type: "course", sub: "Artifact registry (JFrog Artifactory)", name: "JFrog Academy (free courses — Artifactory Fundamentals, Pipelines, Xray) — Start here", url: "https://academy.jfrog.com" },
        { id: "sau-r-21", type: "blog", sub: "Artifact registry (JFrog Artifactory)", name: "JFrog Artifactory — official docs (repo types, replication, HA, REST API)", url: "https://jfrog.com/help/r/jfrog-artifactory-documentation" },
        { id: "sau-r-22", type: "channel", sub: "Artifact registry (JFrog Artifactory)", name: "JFrog — YouTube channel (swampUP recordings + tutorials)", url: "https://www.youtube.com/@jfrog" },
      ],
      milestones: [
        { id: "sau-m-1", name: "Write a Terraform module with vars + outputs + remote state (S3 + DynamoDB lock)" },
        { id: "sau-m-2", name: "Run plan / apply / destroy on a real cloud account (your own playground)" },
        { id: "sau-m-3", name: "Import an existing cloud resource into Terraform state" },
        { id: "sau-m-4", name: "Write an Ansible playbook to harden a VM (close to CIS baseline)" },
        { id: "sau-m-5", name: "Build a GitHub Actions workflow: build → test → scan → push → deploy" },
        { id: "sau-m-6", name: "Use OIDC for AWS credentials in GitHub Actions (no long-lived keys)" },
        { id: "sau-m-7", name: "Set up ArgoCD on a kind cluster, auto-sync from a Git repo" },
        { id: "sau-m-8", name: "Practice a canary or blue-green rollout via Argo Rollouts" },
        { id: "sau-m-9", name: "Spin up JFrog Artifactory Community Edition; push one Docker image + one npm package through a dev → prod promotion" },
      ],
    },

    language: {
      title: "SRE 1 · Language",
      resources: [
        // ── Go ──
        { id: "lang-r-2", type: "video", sub: "Go", name: "Golang Tutorial for Beginners — Full Go Course (YouTube · free) · syntax + idioms walkthrough", url: "https://www.youtube.com/watch?v=yyUHQIec83I" },
        { id: "lang-r-1", type: "course", sub: "Go", name: "Go: The Complete Developer's Guide — Stephen Grider (Udemy) · concurrency, interfaces, web servers", url: "https://www.udemy.com/course/go-the-complete-developers-guide/?srsltid=AfmBOoqsRzAwkSqQa_Fms2yQ0tGKLd8GANL0-tUZ0kqm4V1PH1LZkVGg&couponCode=MT260601G1" },
        // ── Python / FastAPI ──
        { id: "lang-r-5", type: "video", sub: "Python / FastAPI", name: "Python Tutorial for Beginners — Learn Python in 5 Hours [Full Course] (YouTube · free)", url: "https://www.youtube.com/watch?v=t8pPdKYpowI" },
        { id: "lang-r-4", type: "course", sub: "Python / FastAPI", name: "FastAPI — The Complete Course (Udemy) · async API, Pydantic, OpenAPI, auth", url: "https://www.udemy.com/course/fastapi-the-complete-course/?srsltid=AfmBOopBXaxC6W_UHp0C4diA5h1pZPGvGJHw-z5BBh1Xiia3WsOGUgtX&couponCode=MT260601G1" },
      ],
      milestones: [
        { id: "lang-m-1", name: "Go: write a small HTTP service with net/http + chi or gorilla — handlers, middleware, JSON" },
        { id: "lang-m-2", name: "Go: write table-driven tests; use context.Context for cancellation/timeouts" },
        { id: "lang-m-3", name: "FastAPI: build a CRUD API with Pydantic models, dependency injection, and async endpoints" },
        { id: "lang-m-4", name: "FastAPI: add OpenAPI docs, run with uvicorn, deploy in a container" },
      ],
    },

    // ────────── Part AI — 4 level sub-keys, rendered together as one page ──────────
    "ai-l1": {
      title: "AI · Level 1 — Foundations",
      resources: [
        // ── Mental models (watch first) ──
        { id: "ai1-r-3", type: "video", sub: "Mental models (watch first)", name: "3Blue1Brown — But what is a GPT? Visual intro to Transformers", url: "https://www.youtube.com/watch?v=wjZofJX0v4M" },
        { id: "ai1-r-1", type: "video", sub: "Mental models (watch first)", name: "Andrej Karpathy — Intro to Large Language Models (1 hr)", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
        { id: "ai1-r-4", type: "video", sub: "Mental models (watch first)", name: "Andrej Karpathy — State of GPT (Microsoft Build)", url: "https://www.youtube.com/watch?v=bZQun8Y4L2A" },
        // ── Hands-on courses ──
        { id: "ai1-r-5", type: "course", sub: "Hands-on courses", name: "DeepLearning.AI — ChatGPT Prompt Engineering for Developers (free)", url: "https://learn.deeplearning.ai/courses/chatgpt-prompt-eng" },
        { id: "ai1-r-6", type: "course", sub: "Hands-on courses", name: "Hugging Face NLP Course (free)", url: "https://huggingface.co/learn/nlp-course" },
        { id: "ai1-r-2", type: "video", sub: "Hands-on courses", name: "Andrej Karpathy — Let's build GPT from scratch", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY" },
        // ── Books & roadmap ──
        { id: "ai1-r-7", type: "course", sub: "Books & roadmap", name: "roadmap.sh — AI Engineer roadmap", url: "https://roadmap.sh/ai-engineer" },
        { id: "ai1-r-8", type: "book", sub: "Books & roadmap", name: "AI Engineering — Chip Huyen (2025)", url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/" },
        { id: "ai1-r-9", type: "book", sub: "Books & roadmap", name: "Designing Machine Learning Systems — Chip Huyen", url: "https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/" },
      ],
      milestones: [
        { id: "ai1-m-1", name: "Read roadmap.sh/ai-engineer end-to-end; note unfamiliar terms in sre-ai/concepts.md" },
        { id: "ai1-m-2", name: "Watch Karpathy 'Intro to LLMs' (1 hr) and summarize tokens / context / inference in your own words" },
        { id: "ai1-m-3", name: "Watch 3Blue1Brown 'What is a GPT?' — be able to sketch the transformer block on a whiteboard" },
        { id: "ai1-m-4", name: "Read Chip Huyen 'AI Engineering' ch 1–3 (the prompt → RAG → fine-tune ladder)" },
        { id: "ai1-m-5", name: "Write a 1-page 'when to RAG vs fine-tune' decision tree from your own reading" },
      ],
    },
    "ai-l2": {
      title: "AI · Level 2 — Core Engineering",
      resources: [
        // ── Frameworks & tooling ──
        { id: "ai2-r-3", type: "course", sub: "Frameworks & tooling", name: "LangChain + LangGraph docs", url: "https://www.langchain.com/langgraph" },
        { id: "ai2-r-1", type: "video", sub: "Frameworks & tooling", name: "Krishna Naik — Agentic AI Tutorials playlist", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPFd7JdvB-rnTb_5V26NYNO" },
        { id: "ai2-r-2", type: "video", sub: "Frameworks & tooling", name: "Krishna Naik — Model Context Protocol (MCP) playlist", url: "https://www.youtube.com/playlist?list=PLZoTAELRMXVPC8r1xF68Gksi241DAtMsK" },
        // ── Local LLM & data ──
        { id: "ai2-r-5", type: "course", sub: "Local LLM & data", name: "Ollama — local LLM runtime", url: "https://ollama.com" },
        { id: "ai2-r-6", type: "course", sub: "Local LLM & data", name: "pgvector + Postgres tutorial", url: "https://github.com/pgvector/pgvector" },
        { id: "ai2-r-4", type: "course", sub: "Local LLM & data", name: "DSPy (Stanford) — programmatic prompt optimization", url: "https://dspy.ai" },
        // ── Books & blogs ──
        { id: "ai2-r-7", type: "book", sub: "Books & blogs", name: "Hands-On Large Language Models — Alammar & Grootendorst", url: "https://www.oreilly.com/library/view/hands-on-large-language/9781098150952/" },
        { id: "ai2-r-8", type: "blog", sub: "Books & blogs", name: "Simon Willison's blog — daily LLM practitioner notes", url: "https://simonwillison.net" },
        { id: "ai2-r-9", type: "blog", sub: "Books & blogs", name: "Anthropic Engineering blog", url: "https://www.anthropic.com/engineering" },
        // ── Eval-driven practice ──
        { id: "ai2-r-10", type: "blog", sub: "Eval-driven practice", name: "Hamel Husain — eval-driven LLM development", url: "https://hamel.dev" },
        { id: "ai2-r-11", type: "blog", sub: "Eval-driven practice", name: "Hugging Face blog", url: "https://huggingface.co/blog" },
      ],
      milestones: [
        { id: "ai2-m-1", name: "sre-ai/hello-rag — call Anthropic + Ollama from Python; embed docs with sentence-transformers" },
        { id: "ai2-m-2", name: "sre-ai/runbook-rag — index your Part B repo's docs/ in pgvector and answer questions" },
        { id: "ai2-m-3", name: "Add Langfuse traces to runbook-rag (every prompt + retrieval + response captured)" },
        { id: "ai2-m-4", name: "Deploy runbook-rag to your kind cluster via Helm" },
        { id: "ai2-m-5", name: "Pick one agent framework (LangChain/Agno/CrewAI/DSPy) and ship one toy agent" },
        { id: "ai2-m-6", name: "Read Hamel Husain's eval-driven LLM dev posts; write a 1-paragraph reflection" },
      ],
    },
    "ai-l3": {
      title: "AI · Level 3 — Advanced / Production",
      resources: [
        // ── Agents & MCP ──
        { id: "ai3-r-6", type: "blog", sub: "Agents & MCP", name: "Anthropic — Building Effective Agents (2024)", url: "https://www.anthropic.com/research/building-effective-agents" },
        { id: "ai3-r-7", type: "blog", sub: "Agents & MCP", name: "Lilian Weng — LLM agents / RLHF / hallucination posts", url: "https://lilianweng.github.io" },
        { id: "ai3-r-1", type: "course", sub: "Agents & MCP", name: "Anthropic — Model Context Protocol spec", url: "https://modelcontextprotocol.io" },
        // ── Serving, fine-tuning & observability ──
        { id: "ai3-r-2", type: "course", sub: "Serving, fine-tuning & observability", name: "vLLM — high-throughput LLM serving docs", url: "https://docs.vllm.ai" },
        { id: "ai3-r-10", type: "blog", sub: "Serving, fine-tuning & observability", name: "Phil Schmid — production fine-tuning + serving", url: "https://www.philschmid.de" },
        { id: "ai3-r-5", type: "course", sub: "Serving, fine-tuning & observability", name: "Langfuse — LLM observability + traces", url: "https://langfuse.com" },
        // ── Evaluation & red-teaming ──
        { id: "ai3-r-3", type: "course", sub: "Evaluation & red-teaming", name: "Ragas — RAG evaluation framework", url: "https://docs.ragas.io" },
        { id: "ai3-r-4", type: "course", sub: "Evaluation & red-teaming", name: "Promptfoo — adversarial / red-team prompt testing", url: "https://www.promptfoo.dev" },
        // ── AI for SRE / ops ──
        { id: "ai3-r-8", type: "blog", sub: "AI for SRE / ops", name: "Heinrich Hartmann — 'LLM as on-call copilot, not autopilot'", url: "https://heinrichhartmann.com" },
        { id: "ai3-r-9", type: "blog", sub: "AI for SRE / ops", name: "Honeycomb — AI assistance for observability", url: "https://www.honeycomb.io/blog" },
        // ── Core LLM papers ──
        { id: "ai3-r-11", type: "blog", sub: "Core LLM papers", name: "Lewis et al. 2020 — Retrieval-Augmented Generation (RAG paper)", url: "https://arxiv.org/abs/2005.11401" },
        { id: "ai3-r-12", type: "blog", sub: "Core LLM papers", name: "Yao et al. 2022 — ReAct: Reasoning + Acting", url: "https://arxiv.org/abs/2210.03629" },
        // ── ML-systems papers ──
        { id: "ai3-r-13", type: "blog", sub: "ML-systems papers", name: "Sculley et al. 2015 — Hidden Tech Debt in ML Systems", url: "https://papers.nips.cc/paper/5656-hidden-technical-debt-in-machine-learning-systems" },
        { id: "ai3-r-14", type: "blog", sub: "ML-systems papers", name: "Amershi et al. 2019 — Software Engineering for ML (Microsoft)", url: "https://www.microsoft.com/en-us/research/publication/software-engineering-for-machine-learning-a-case-study/" },
      ],
      milestones: [
        { id: "ai3-m-1", name: "sre-ai/oncall-copilot — incident-triage agent with MCP + read-only Prom/Loki tools" },
        { id: "ai3-m-2", name: "Run vLLM locally; benchmark Llama 3.1 8B (4-bit) vs hosted Claude on cost / latency / quality" },
        { id: "ai3-m-3", name: "Write a Ragas + Promptfoo eval pipeline that runs in GitHub Actions on every PR" },
        { id: "ai3-m-4", name: "Define an SLO for oncall-copilot latency + correctness; document it" },
        { id: "ai3-m-5", name: "Threat-model prompt-injection vectors for oncall-copilot; ship one mitigation" },
        { id: "ai3-m-6", name: "Wire output-schema validation (Pydantic/Outlines) for every tool call" },
        { id: "ai3-m-7", name: "Deploy oncall-copilot to your kind cluster with Helm; pin the repo on GitHub" },
      ],
    },
    "ai-l4": {
      title: "AI · Level 4 — Specialist & Cross-cutting",
      resources: [
        // ── Podcasts & talks ──
        { id: "ai4-r-1", type: "blog", sub: "Podcasts & talks", name: "Latent Space (swyx + Alessio) — top AI engineer interviews", url: "https://www.latent.space" },
        { id: "ai4-r-2", type: "video", sub: "Podcasts & talks", name: "AI Engineer Pod / Summit talks (YouTube)", url: "https://www.youtube.com/@aiDotEngineer" },
        // ── Newsletters ──
        { id: "ai4-r-3", type: "blog", sub: "Newsletters", name: "The Batch (DeepLearning.AI) — weekly newsletter", url: "https://www.deeplearning.ai/the-batch" },
        { id: "ai4-r-5", type: "blog", sub: "Newsletters", name: "Last Week in AI — research + industry roundup", url: "https://lastweekin.ai" },
        { id: "ai4-r-6", type: "blog", sub: "Newsletters", name: "Import AI (Jack Clark) — research + policy briefing", url: "https://importai.substack.com" },
        // ── Deep-dive blogs ──
        { id: "ai4-r-7", type: "blog", sub: "Deep-dive blogs", name: "Chip Huyen blog — SE4AI / MLOps perspective", url: "https://huyenchip.com" },
        { id: "ai4-r-4", type: "blog", sub: "Deep-dive blogs", name: "Sebastian Ruder — NLP newsletter", url: "https://newsletter.ruder.io" },
        { id: "ai4-r-8", type: "blog", sub: "Deep-dive blogs", name: "Google SRE blog — AI-assisted on-call", url: "https://sre.google/resources/blog" },
      ],
      milestones: [
        { id: "ai4-m-1", name: "Write a public blog post: 'vLLM vs hosted Claude for SRE workloads' with benchmark numbers" },
        { id: "ai4-m-2", name: "Pin sre-ai/oncall-copilot on GitHub with a 60-second demo GIF + README" },
        { id: "ai4-m-3", name: "Identify 3 APAC AI-infra teams to target (Grab / Mercari / Agoda / ByteDance / PayPay)" },
        { id: "ai4-m-4", name: "Be able to explain RAG-vs-fine-tune trade-off in 60 seconds in an interview" },
        { id: "ai4-m-5", name: "Write antipattern doc — 'mistakes we made shipping an LLM feature' — share publicly" },
        { id: "ai4-m-6", name: "Subscribe to 2 of the 8 newsletters above; scan weekly, summarise monthly" },
      ],
    },

    edge: {
      title: "SRE 5 · API Gateway, Load Balancer & HTTP Caching (Kong / HAProxy)",
      resources: [
        // ── HTTP caching theory ──
        { id: "sed-r-27", type: "blog", sub: "HTTP caching theory", name: "MDN — HTTP Caching reference — Start here", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching" },
        { id: "sed-r-25", type: "blog", sub: "HTTP caching theory", name: "Mark Nottingham — Caching Tutorial (canonical, by HTTP RFC author)", url: "https://www.mnot.net/cache_docs/" },
        { id: "sed-r-24", type: "book", sub: "HTTP caching theory", name: "High Performance Browser Networking — Ilya Grigorik (free, ch 8–11)", url: "https://hpbn.co" },
        // ── Load Balancer (HAProxy) ──
        { id: "sed-r-31", type: "course", sub: "Load Balancer (HAProxy)", name: "KodeKloud — HAProxy for Beginners — Start here", url: "https://kodekloud.com/courses/haproxy-for-beginners/" },
        { id: "sed-r-32", type: "video", sub: "Load Balancer (HAProxy)", name: "Hussein Nasser — HAProxy Crash Course (TLS 1.3, HTTPS, HTTP/2)", url: "https://www.youtube.com/watch?v=qYnA2DFEELw&list=PLQnljOFTspQUhgfvpgfxc-uFlWElKIBr-" },
        { id: "sed-r-34", type: "blog", sub: "Load Balancer (HAProxy)", name: "HAProxy official docs (configuration manual)", url: "https://docs.haproxy.org/" },
        // ── API Gateway (Kong) ──
        { id: "sed-r-1", type: "course", sub: "API Gateway (Kong)", name: "Kong Docs — Get Started with Kong Gateway — Start here", url: "https://docs.konghq.com/gateway/latest/get-started/" },
        { id: "sed-r-3", type: "course", sub: "API Gateway (Kong)", name: "Hussein Nasser — Kong API Gateway (Udemy)", url: "https://www.udemy.com/course/kong-api-gateway/" },
        { id: "sed-r-6", type: "blog", sub: "API Gateway (Kong)", name: "Kong Ingress Controller docs (K8s CRDs)", url: "https://docs.konghq.com/kubernetes-ingress-controller/latest/" },
      ],
      milestones: [
        { id: "sed-m-1",  name: "Kong DB-less via docker-compose: declare 2 upstreams in kong.yml; route /api/todos + /api/users" },
        { id: "sed-m-2",  name: "Add rate-limit + JWT plugins to Todo API through Kong; load-test to trip the limiter" },
        { id: "sed-m-3",  name: "Install Kong Ingress Controller on kind; swap one Ingress for KIC; compare behaviour" },
        { id: "sed-m-7",  name: "Implement stale-while-revalidate semantics in front of the Todo API; verify behavior when origin returns 5xx" },
        { id: "sed-m-8",  name: "Runbook: 'p99 spiked behind Kong — triage in 10 min' (gateway logs → upstreams → plugins → cache hit ratio)" },
        { id: "sed-m-9",  name: "1-page tradeoff doc: NGINX vs Envoy vs Kong as L7 — when each wins, be opinionated" },
      ],
    },

    revproxy: {
      title: "SRE 6 · Reverse Proxy (NGINX / Envoy / Caddy)",
      resources: [
        // ── NGINX ──
        { id: "rprx-r-1", type: "course", sub: "NGINX", name: "KodeKloud — Nginx for Beginners — Start here", url: "https://learn.kodekloud.com/user/courses/nginx-for-beginners" },
        { id: "rprx-r-3", type: "video", sub: "NGINX", name: "freeCodeCamp — NGINX Tutorial for Beginners (full ~3hr course)", url: "https://www.youtube.com/watch?v=7VAI73roXaY" },
        { id: "rprx-r-5", type: "course", sub: "NGINX", name: "Hussein Nasser — NGINX Fundamentals (Udemy)", url: "https://www.udemy.com/course/nginx-fundamentals/" },
        // ── Caddy ──
        { id: "rprx-r-30", type: "course", sub: "Caddy", name: "Caddy — Getting Started + tutorials (install, Caddyfile, automatic HTTPS) — Start here", url: "https://caddyserver.com/docs/getting-started" },
        { id: "rprx-r-31", type: "blog", sub: "Caddy", name: "Caddy — Quick-starts (reverse-proxy, file server, PHP, Wordpress) — copy-paste recipes", url: "https://caddyserver.com/docs/quick-starts/reverse-proxy" },
        { id: "rprx-r-32", type: "blog", sub: "Caddy", name: "Caddy docs — Caddyfile concepts + JSON config reference", url: "https://caddyserver.com/docs/caddyfile/concepts" },
      ],
      milestones: [
        { id: "rprx-m-1", name: "NGINX reverse proxy in front of Todo API: TLS (mkcert), upstream + keepalive, proxy_next_upstream retries" },
        { id: "rprx-m-2", name: "Turn on proxy_cache (5s microcache) for GET /todos; graph HIT/MISS ratio in Prometheus" },
        { id: "rprx-m-3", name: "Reproduce a zero-downtime config reload under load (SIGHUP); confirm no dropped requests via load-tester" },
        { id: "rprx-m-4", name: "Stand up Caddy with a 10-line Caddyfile: reverse-proxy the Todo API and verify automatic Let's Encrypt + HTTP/3 on a real domain" },
      ],
    },

    reliability: {
      title: "SRE 4 · Reliability — SLOs, Resilience, Chaos & Observability",
      resources: [
        // ── SRE principles — SLOs, error budgets & toil ──
        { id: "srl-r-40", type: "video", sub: "SRE principles — SLOs, error budgets & toil", name: "SLO vs SLI vs SLA vs Error Budget — explained", url: "https://www.youtube.com/watch?v=Akri1BlGp10" },
        { id: "srl-r-42", type: "blog", sub: "SRE principles — SLOs, error budgets & toil", name: "Google SRE Workbook — Implementing SLOs", url: "https://sre.google/workbook/implementing-slos/" },
        { id: "srl-r-44", type: "blog", sub: "SRE principles — SLOs, error budgets & toil", name: "Google SRE Book — Eliminating Toil (ch 5; aim for < 50%)", url: "https://sre.google/sre-book/eliminating-toil/" },
        // ── Observability — metrics, logs, traces ──
        { id: "srl-r-1", type: "video", sub: "Observability — metrics, logs, traces", name: "Prometheus + Grafana Course — TechWorld with Nana", url: "https://www.youtube.com/watch?v=h4Sl21AKiDg" },
        { id: "srl-r-2", type: "video", sub: "Observability — metrics, logs, traces", name: "OpenTelemetry in 100 Seconds — Fireship", url: "https://www.youtube.com/watch?v=LfNngXkPe5o" },
        { id: "srl-r-11", type: "book", sub: "Observability — metrics, logs, traces", name: "Observability Engineering — Majors / Fong-Jones / Miranda", url: "https://www.honeycomb.io/wp-content/uploads/2022/05/Observability_Engineering-Honeycomb.pdf" },
        // ── Logs (Loki / Elastic Stack) ──
        { id: "srl-r-60", type: "blog", sub: "Logs (Loki / Elastic Stack)", name: "Grafana Loki — Fundamentals tutorial (architecture + LogQL) — Start here", url: "https://grafana.com/docs/loki/latest/get-started/" },
        { id: "srl-r-61", type: "video", sub: "Logs (Loki / Elastic Stack)", name: "Grafana — Loki: Like Prometheus, but for logs (KubeCon talk)", url: "https://www.youtube.com/watch?v=h_GGd7HfKQ8" },
        { id: "srl-r-62", type: "blog", sub: "Logs (Loki / Elastic Stack)", name: "Grafana Loki — Best practices for labels & LogQL (avoid high-cardinality trap)", url: "https://grafana.com/docs/loki/latest/get-started/labels/" },
        { id: "srl-r-63", type: "blog", sub: "Logs (Loki / Elastic Stack)", name: "Elastic — Getting Started with the Elastic Stack", url: "https://www.elastic.co/guide/en/starting-with-the-elasticsearch-platform-and-its-solutions/current/index.html" },
        { id: "srl-r-64", type: "blog", sub: "Logs (Loki / Elastic Stack)", name: "Elastic — Observability docs (logs / metrics / APM / uptime)", url: "https://www.elastic.co/guide/en/observability/current/observability-introduction.html" },
        { id: "srl-r-65", type: "video", sub: "Logs (Loki / Elastic Stack)", name: "Elasticsearch Deep Dive (inverted index, shards, scoring)", url: "https://www.youtube.com/watch?v=PuZvF2EyfBM" },
        // ── Metrics & dashboards (Prometheus / Grafana) ──
        { id: "srl-r-70", type: "blog", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "Prometheus — Getting Started (install, scrape config, PromQL) — Start here", url: "https://prometheus.io/docs/prometheus/latest/getting_started/" },
        { id: "srl-r-71", type: "course", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "PromLabs — PromQL Cheat Sheet + free PromQL course (Julius Volz)", url: "https://promlabs.com/promql-cheat-sheet/" },
        { id: "srl-r-72", type: "book", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "Prometheus: Up & Running (2nd ed) — Brian Brazil", url: "https://www.oreilly.com/library/view/prometheus-up/9781098131135/" },
        { id: "srl-r-73", type: "course", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "Grafana Tutorials (free official hands-on) — Start here for Grafana", url: "https://grafana.com/tutorials/" },
        { id: "srl-r-74", type: "course", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "Grafana University (free structured courses)", url: "https://university.grafana.com" },
        { id: "srl-r-75", type: "blog", sub: "Metrics & dashboards (Prometheus / Grafana)", name: "Grafana — Dashboard Best Practices (apply RED/USE, avoid 40-panel dashboards)", url: "https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/best-practices/" },
        // ── Resilience patterns ──
        { id: "srl-r-45", type: "book", sub: "Resilience patterns", name: "Release It! (2nd ed) — Michael Nygard (circuit breaker / bulkhead origin)", url: "https://pragprog.com/titles/mnee2/release-it-second-edition/" },
        { id: "srl-r-46", type: "blog", sub: "Resilience patterns", name: "AWS Builders' Library — Timeouts, retries & backoff with jitter", url: "https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" },
        { id: "srl-r-48", type: "blog", sub: "Resilience patterns", name: "Microsoft — Cloud Design / Reliability Patterns (catalog)", url: "https://learn.microsoft.com/en-us/azure/architecture/patterns/" },
        // ── Capacity planning & chaos engineering ──
        { id: "srl-r-50", type: "blog", sub: "Capacity planning & chaos engineering", name: "Google SRE Book — Handling Overload (ch 21)", url: "https://sre.google/sre-book/handling-overload/" },
        { id: "srl-r-51", type: "blog", sub: "Capacity planning & chaos engineering", name: "Principles of Chaos Engineering", url: "https://principlesofchaos.org/" },
        { id: "srl-r-53", type: "book", sub: "Capacity planning & chaos engineering", name: "Chaos Engineering — Rosenthal & Jones (O'Reilly)", url: "https://www.oreilly.com/library/view/chaos-engineering/9781492043850/" },
        // ── Performance & debugging ──
        { id: "srl-r-19", type: "video", sub: "Performance & debugging", name: "USE Method — Brendan Gregg (talk)", url: "https://www.youtube.com/watch?v=fXLeYBaa9-c" },
        { id: "srl-r-20", type: "book", sub: "Performance & debugging", name: "Systems Performance — Brendan Gregg (2nd ed)", url: "https://www.brendangregg.com/systems-performance-2nd-edition-book.html" },
        { id: "srl-r-24", type: "blog", sub: "Performance & debugging", name: "Linux Performance Analysis in 60,000ms (Netflix triage checklist)", url: "https://www.brendangregg.com/blog/2015-12-03/linux-perf-60s-video.html" },
        // ── Incident response & postmortems ──
        { id: "srl-r-25", type: "blog", sub: "Incident response & postmortems", name: "Google — Incident Management Guide (PDF)", url: "https://sre.google/static/pdf/IncidentManagementGuide.pdf" },
        { id: "srl-r-27", type: "blog", sub: "Incident response & postmortems", name: "SRE Book — Postmortem Culture (blameless canon)", url: "https://sre.google/sre-book/postmortem-culture/" },
        { id: "srl-r-28", type: "blog", sub: "Incident response & postmortems", name: "Google SRE — Example Postmortem (copyable template)", url: "https://sre.google/sre-book/example-postmortem/" },
      ],
      milestones: [
        { id: "srl-m-1",  name: "Instrument a Go/Python service with the Prometheus client library" },
        { id: "srl-m-2",  name: "Build a Grafana dashboard for the 4 golden signals (latency/traffic/errors/saturation)" },
        { id: "srl-m-3",  name: "Write a Prometheus alert rule + Alertmanager route to Slack/Discord" },
        { id: "srl-m-4",  name: "Define an SLO + error budget for a service — document it" },
        { id: "srl-m-5",  name: "Add OpenTelemetry tracing — see a span graph in Jaeger or Grafana Tempo" },
        { id: "srl-m-6",  name: "Centralize logs (Loki / ELK / CloudWatch) with a structured JSON format" },
        { id: "srl-m-7",  name: "Run a chaos experiment — kill a Pod or inject latency, measure recovery" },
        { id: "srl-m-8",  name: "Write a runbook for one alert — test it with a colleague" },
        { id: "srl-m-9",  name: "Write a blameless postmortem template + practice on a real incident" },
        { id: "srl-m-10", name: "Read SRE book ch 3–5 (Embracing Risk · SLOs · Eliminating Toil)" },
        { id: "srl-m-11", name: "Read SRE book ch 13–15 (Emergency Response · Managing Incidents · Postmortems)" },
        { id: "srl-m-12", name: "Use strace to debug a hung process" },
        { id: "srl-m-13", name: "Read top, htop, iostat, vmstat fluently (USE method)" },
        { id: "srl-m-14", name: "Load-test a service, inject one bottleneck, find it from metrics alone via the USE method (< 5 min)" },
        { id: "srl-m-15", name: "Rewrite a public postmortem (GitHub/Cloudflare/AWS) blamelessly using the Google example template" },
        { id: "srl-m-16", name: "Write an SLI/SLO spec for one service + an error-budget policy naming who halts releases when it's spent" },
        { id: "srl-m-17", name: "Audit one week of work; tag each task toil vs engineering; automate the biggest toil item" },
        { id: "srl-m-18", name: "Add timeout + retry-with-jitter + a circuit breaker to a service call; prove fail-fast under fault injection" },
        { id: "srl-m-19", name: "Run a game day: inject a dependency failure, demonstrate graceful degradation / load shedding, write the postmortem" },
        { id: "srl-m-20", name: "Back-of-envelope capacity plan for the Todo app at 10x traffic (QPS, CPU, memory, storage, headroom)" },
      ],
    },

  },

  // ────────────────────────────────────────────────────────────────
  // Weekly habits
  // ────────────────────────────────────────────────────────────────
  habits: [
    { id: "h-lc", name: "5 LeetCode problems", target: 5 },
    { id: "h-sd", name: "1 system design walkthrough", target: 1 },
    { id: "h-study", name: "5 hrs technical study", target: 5 },
    { id: "h-build", name: "4 hrs hands-on project work", target: 4 },
    { id: "h-apply", name: "5 job applications (mo 4–6)", target: 5 },
    { id: "h-network", name: "3 LinkedIn connections to target eng", target: 3 },
    { id: "h-git", name: "3+ GitHub commits", target: 3 },
    { id: "h-mock", name: "1 mock interview (every 2 wks)", target: 1 },
    { id: "h-blog", name: "1 blog post / month", target: 1 },
  ],
};
