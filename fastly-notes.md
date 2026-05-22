# Fastly Learning Notes — Beginner → Intermediate

Sourced from the `dngroup-fastly` Terraform repo (Fastly VCL service for DN Media Group). Every concept used in that repo is covered here, in the order you'd actually learn them, with a hands-on lab after each session.

The end goal: by the time you finish session 18, you can read `main.tf` + `vcl/snippet/*.vcl` end-to-end and modify any of it without guessing.

---

## Prerequisites & one-time setup

- Free Fastly developer account: <https://www.fastly.com/signup/>
- Fastly CLI: `brew install fastly/tap/fastly` — `fastly profile create` with an API token (scope: `global`)
- Terraform 1.5.5 (matches the repo's CI): `tfenv install 1.5.5 && tfenv use 1.5.5`
- An origin you control to point Fastly at. Easiest: a small nginx behind a public hostname (Cloudflare Tunnel, ngrok, or a tiny EC2). Free Fastly tier requires real DNS for production-style demos; for VCL practice the Fastly Fiddle (<https://fiddle.fastly.dev>) works without an account.
- Read these once before starting: <https://www.fastly.com/documentation/reference/vcl/> and <https://developer.fastly.com/learning/vcl/>

> ⚠️ Where the dngroup-fastly repo says "shield = stockholm-bma", that's a Fastly POP code. Replace with the POP nearest your origin in your own labs (<https://www.fastly.com/documentation/reference/tools/datacenters/>).

---

## Session 1 — Fastly mental model

**Read first** (15 min)
- What Fastly *is*: a CDN/edge platform built on a fork of Varnish + their own runtime. Every "service" is a versioned bundle of VCL + config; you edit a draft version, then activate it (atomic). Old versions stay around — instant rollback by re-activating an earlier version.
- Two service types: `vcl` (this repo — Varnish-style VCL) and `compute` (Rust/Go/JS via WASM). We're only doing VCL.
- POPs ≠ origins. Fastly has ~80 global POPs. Each POP has thousands of edge nodes. Cache lives per-POP; misses can go to a shield POP (next session) before hitting origin.

**Key terms**
| term | what it is |
|---|---|
| Service | A VCL config + domains + backends, versioned |
| Backend | An origin Fastly proxies to |
| Domain | A hostname mapped to this service (CNAME or A record points here) |
| POP | Point-of-Presence; one Fastly datacenter |
| Shield | Designated POP that absorbs misses from edge POPs (single funnel to origin) |
| Snippet | A piece of VCL injected at a named lifecycle step |
| Dictionary | Edge-side key/value store, edit at runtime without re-deploying |

### Hands-on 1
1. Sign up for the free Fastly dev tier.
2. Create a service via the web UI (Configure → Create service → VCL).
3. Add a domain `<your-name>.global.ssl.fastly.net` (Fastly subdomain — no DNS needed).
4. Add a backend: `https://httpbin.org` port 443, override_host = `httpbin.org`.
5. Activate the version.
6. `curl -i https://<your-name>.global.ssl.fastly.net/get` — you should see a JSON response from httpbin via Fastly. Note the `X-Served-By` and `X-Cache` headers.

---

## Session 2 — The VCL lifecycle

**Read** (20 min)
- The VCL state machine: every request walks through subroutines in order. Your custom code is injected via `sub vcl_xxx { ... }`.
- Fastly-specific quirk: each sub *must* contain a `#FASTLY xxx` macro marker — that's where Fastly inserts its default behavior. If you delete the macro, you lose features like Image Optimizer hooks, NGWAF, etc.

**The subs (memorize this diagram)**
```
client request
   │
   ▼
vcl_recv  ──► return(lookup)──► vcl_hash ──► cache check
   │                                            │
   │                                       hit ─┴─ miss
   │                                       │       │
return(pass)                          vcl_hit  vcl_miss
   │                                       │       │
   ▼                                       │   return(fetch)──► backend ──► vcl_fetch
vcl_pass                                   │                                    │
   │                                       │                                    ▼
   └────────────────────────────────► vcl_deliver ◄──────────────────── return(deliver)
                                            │
                                            ▼
                                       client receives
                                            │
                                            ▼
                                         vcl_log

errors anywhere ──► vcl_error ──► vcl_deliver
```

**Look at the repo**: `vcl/custom_vcl/default.vcl` — every sub has the `#FASTLY xxx` macro and stays small. Heavy logic lives in *snippets* (next session).

**Cacheable methods only**
```vcl
if (req.method != "HEAD" && req.method != "GET" && req.method != "FASTLYPURGE") {
  return(pass);
}
```
`FASTLYPURGE` is the special purge method — never block it.

### Hands-on 2
1. In Fastly Fiddle (<https://fiddle.fastly.dev>), paste the contents of `vcl/custom_vcl/default.vcl` into the VCL pane.
2. Click "Run" — watch the request flow in the timeline. Identify which sub each step lands in.
3. Modify `vcl_deliver` to add `set resp.http.X-Hello = "world";` — re-run, confirm header appears.
4. Remove the `#FASTLY recv` line; re-run; observe that the default boilerplate is now missing (Fastly Fiddle won't show it explicitly, but in a real service this would break Image Optimizer wiring).

---

## Session 3 — Caching fundamentals & TTL

**Concepts**
- **TTL**: `set beresp.ttl = 3600s;` — server-controlled cache lifetime at the edge.
- **Cache-Control / Surrogate-Control**: client-controlled (`max-age`) and CDN-controlled (`s-maxage`, `Surrogate-Control: max-age=...`). Fastly reads `Surrogate-Control` *first*, falls back to `s-maxage`, then `max-age`.
- **stale-while-revalidate** + **stale-if-error** — serve stale content while async-revalidating, or when origin is down.
- **Set-Cookie** in response → uncacheable by default. Look at `default.vcl`:
  ```vcl
  if (beresp.http.Set-Cookie) { return(pass); }
  ```
- **`Cache-Control: private | no-store`** → also uncacheable.
- **Default TTL** the repo sets when origin omits cache headers: `3600s` for normal, `2592000s` (30d) for Image Optimizer responses.

**Read** the cache states section in the user guide: <https://www.fastly.com/documentation/guides/full-site-delivery/caching/>

### Hands-on 3
1. In your Session 1 service, hit the same URL 3 times. Note `X-Cache: HIT, HIT` on calls 2 and 3.
2. Add `?cachebust=$(date +%s)` — confirm MISS each time.
3. Send a request with `Authorization: Bearer xxx` — backend may add `Cache-Control: private` → confirm Fastly serves `X-Cache: MISS` even on repeat.
4. In Fastly Fiddle, set `set beresp.ttl = 10s;` and watch the X-Cache flip from HIT back to MISS after 10 seconds.
5. Bonus: add `Surrogate-Control: max-age=300` from backend and `Cache-Control: max-age=10` — verify Fastly caches for 300s while browser would cache only 10s.

---

## Session 4 — Backends, conditions & the `x-backend` pattern

**The canonical Fastly multi-backend pattern (this is what `dngroup-fastly` does)**

Rather than `set req.backend = F_xxx` directly in VCL, the repo:
1. Sets `req.http.x-backend = "F_kong_api_gateway_origin"` in VCL based on URL path / host.
2. Declares a Terraform `condition` that matches the header.
3. Each backend has `request_condition = "kong_api_gateway_selection"`.

This pattern is *Terraform-friendly* — backend declaration stays declarative; routing logic lives in VCL.

**Read `vcl/snippet/P100_api.vcl`** — three URL-prefix rewrites + host match → set `x-backend`. Then in `main.tf`:
```hcl
condition {
  name      = "kong_api_gateway_selection"
  statement = "req.http.x-backend == \"F_kong_api_gateway_origin\""
  type      = "REQUEST"
}

backend {
  name              = "kong_api_gateway_origin"
  address           = var.KONG_API_GATEWAY_BACKEND_HOSTNAME
  port              = 443
  use_ssl           = true
  ssl_cert_hostname = var.KONG_API_GATEWAY_BACKEND_HOSTNAME
  ssl_sni_hostname  = var.KONG_API_GATEWAY_BACKEND_HOSTNAME
  override_host     = var.KONG_API_GATEWAY_BACKEND_HOSTNAME
  shield            = "stockholm-bma"
  request_condition = "kong_api_gateway_selection"
}
```

**Why `override_host` + `ssl_sni_hostname` + `ssl_cert_hostname` all the same?**
- `override_host`: rewrites the `Host:` header sent to origin so origin sees its own hostname, not the Fastly-facing one.
- `ssl_sni_hostname`: which hostname Fastly sends in the TLS Client Hello SNI extension.
- `ssl_cert_hostname`: which hostname Fastly *validates against* in origin's TLS cert.

When all three are the origin's real hostname, you get a clean TLS handshake regardless of what the client requested. This is essential when one Fastly service serves many domains but all originate from the same backend host.

**Direct backend selection (the older style — still in this repo)**

`P100_media.vcl`:
```vcl
sub vcl_recv {
  if (req.http.host ~ "media(-test|-stage)?\.dngroup\.com$") {
    set req.backend = F_images_origin;
  }
}
```
This bypasses the condition/header pattern and is fine when one host always goes to one backend. The repo mixes both styles.

### Hands-on 4
1. Add a second backend in your service (e.g. `https://example.com`).
2. Add VCL: `if (req.url ~ "^/v2") { set req.http.x-backend = "F_example_origin"; }`.
3. Add a condition matching that header; bind it to the backend's `request_condition`.
4. `curl https://yoursvc/api/foo` → backend 1; `curl https://yoursvc/v2/foo` → backend 2. Verify via Fastly real-time logs (Stats → Real-time logs in UI).

---

## Session 5 — VCL Snippets: static, dynamic, priorities

**Why snippets?**
The "main" VCL file (`vcl/custom_vcl/default.vcl`) stays small — boilerplate only. Every feature (CORS, API routing, image opto, NGWAF) lives in its own *snippet*. Fastly merges them into the final VCL at deploy time, ordered by `priority` (ascending).

**Snippet types** = the lifecycle subs:
`init | recv | hash | hit | miss | pass | fetch | error | deliver | log`

A snippet of type `recv` is concatenated into the `vcl_recv` sub. A snippet of type `init` lives at module scope (outside any sub) — used for `penaltybox`, `ratecounter`, etc.

**Naming convention used here**: `P<priority>_<name>.vcl`
- `P100_api.vcl` — priority 100, applies in the lifecycle step encoded by the type attribute (the repo passes `type = "init"` to all of these from a single dynamic block — see snippet auto-loading in Session 15).
- Lower priority = runs first.

> ⚠️ The repo uses `type = "init"` for the P100_*.vcl files in the `dynamic "snippet"` block. Their internal `sub vcl_recv { ... }` blocks then get inlined into the actual `vcl_recv` sub when Fastly compiles the service. This is allowed because `type = init` in Fastly snippets actually places the code at the top-level scope, and `sub vcl_xxx { ... }` blocks at top level extend the main subs (this is how default.vcl works too). It's confusing but standard Fastly-VCL practice.

**Static vs dynamic snippets**
- Static: in your repo, in Terraform.
- Dynamic: edited at runtime via API/UI without a Terraform deploy. NGWAF uses these (`ngwaf_config_init`, `ngwaf_config_miss`, etc. — Fastly's NGWAF integration writes to them).

### Hands-on 5
1. In a new Terraform project (we'll set this up properly in Session 14), create three snippets at priorities 100, 110, 120 — each in `vcl_deliver`, each setting a different debug header.
2. `terraform apply`; curl the service; look at `resp.http.X-Snippet-Order` (build it from the three priorities).
3. Verify the order matches `priority` ascending.

---

## Session 6 — Shielding and edge-vs-shield code paths

**Concept**: when an edge POP misses, by default it fetches from origin. With shielding, it instead fetches from the designated shield POP (which itself caches). This collapses thousands of edge POPs → one funnel to origin. Massive origin offload.

```hcl
backend {
  ...
  shield = "stockholm-bma"  // Stockholm POP designated as shield for this backend
}
```

**Edge vs shield detection**
```vcl
if (fastly.ff.visits_this_service == 0 && req.restarts == 0) {
  // This is the EDGE — the first time this service sees the request
  // (fastly.ff.visits_this_service > 0 means we're at shield or beyond)
}
```

Used in `P101_add_custom_headers.vcl` and `ngwaf/add_ngwaf_log_headers.vcl`:
```vcl
sub vcl_recv {
  if (req.restarts == 0 && fastly.ff.visits_this_service == 0) {
    set req.http.X-Sigsci-Response-Headers = "true";
  }
}
```

**Why this matters**: certain operations should run *once* at the edge — URL rewriting, header injection, client enrichment. If you rewrite at edge then *again* at shield, you double-rewrite. The `fastly.ff.visits_this_service == 0` guard says "only at the first POP."

Look at `P100_image.vcl` — the comment `# Only perform URL rewriting and backend selection at edge, not at shield` is the same idea applied to URL rewriting. (That snippet relies on host matching instead of the `ff` counter, but the principle is identical.)

### Hands-on 6
1. Add `shield = "<your-nearest-pop>"` to one of your backends. Look up POP codes: <https://www.fastly.com/documentation/reference/tools/datacenters/>.
2. Add this snippet (type `recv`):
   ```vcl
   set req.http.X-Path = "edge=" + (fastly.ff.visits_this_service == 0 ? "yes" : "no");
   ```
   (Fastly VCL doesn't have a real ternary — use an if/else assignment instead.)
3. Echo the header back via `vcl_deliver`. Curl from different geographic locations or use Fastly Fiddle's "From" option to simulate different client POPs.
4. Observe: edge POPs see `edge=yes` on first miss; shield sees `edge=no`.

---

## Session 7 — Image Optimizer

**Enablement** (already in `main.tf`):
```hcl
product_enablement {
  image_optimizer = true
}

image_optimizer_default_settings {
  allow_video   = false
  jpeg_quality  = 85
  jpeg_type     = "auto"
  resize_filter = "lanczos3"
  upscale       = true
  webp          = true
  webp_quality  = 85
}
```

**How Image Optimizer is triggered (VCL side)**: set `req.http.x-fastly-imageopto-api = "fastly";` in `vcl_recv`. Fastly's runtime intercepts the response, transforms the image, returns it.

`P100_image.vcl` has the canonical pattern:
```vcl
if (req.http.host ~ "^image(-test|-stage)?\.dngroup\.com$") {
  set req.http.Fastly-IO = "1";

  if (req.http.x-backend == "F_aptoma_smooth_storage_backend") {
    // qp=* means: pass query params through to the IO runtime
    // (so client can do ?width=200&format=webp)
    set req.http.x-fastly-imageopto-api = "fastly; qp=*";
  } else {
    set req.http.x-fastly-imageopto-api = "fastly";
  }
  ...
}
```

**The `qp=*` syntax** = "allow the client to pass IO query params on the URL." Without it you can only use IO via headers / pre-set transforms.

**Image-opto + cache**: IO responses get a 30-day default TTL in `default.vcl`:
```vcl
if (req.http.X-Fastly-Imageopto-Api) {
  set beresp.ttl = 2592000s;
  set beresp.http.Cache-Control = "max-age=2592000, public";
}
```

Also note `default.vcl` strips `Set-Cookie` and `Vary` for IO responses so they cache cleanly:
```vcl
if (req.http.X-Fastly-Imageopto-Api) {
  unset beresp.http.Set-Cookie;
  unset beresp.http.Vary;
}
```

### Hands-on 7
1. Point a backend at an S3 bucket containing JPEGs.
2. Add a recv snippet: `set req.http.x-fastly-imageopto-api = "fastly; qp=*";` for that backend.
3. `curl -o orig.jpg https://yoursvc/cat.jpg` then `curl -o webp.webp "https://yoursvc/cat.jpg?format=webp&width=400"` — second file should be smaller, WebP-encoded, 400px wide.
4. Verify the WebP version is cached (`X-Cache: HIT` on repeat).

---

## Session 8 — Healthchecks

```hcl
healthcheck {
  name              = "rechargenews_healthcheck"
  host              = var.STATIC_RECHARGENEWS_BACKEND_HOSTNAME
  path              = "/beta/status"
  check_interval    = 10000   // ms — every 10s
  expected_response = 200
  initial           = 3       // start as "healthy" with 3/3 passes assumed
  threshold         = 3       // need 3 successes in `window` to stay healthy
  timeout           = 5000    // ms per probe
  window            = 5       // last 5 probes considered
}
```

When a backend is unhealthy, Fastly skips it. With only one backend per condition (as in this repo), unhealthy = errors back to client unless you handle it (see `stale_if_error = true` in `main.tf` — Fastly will serve a stale cached response if available).

### Hands-on 8
1. Add a healthcheck to one of your backends pointing at a real status endpoint.
2. Stop the origin (or block the path). Wait 30s — Fastly UI → backend list → red status.
3. With `stale_if_error = true` and a prior cached response, the cached version still serves. Without a prior cache: 503 to client.

---

## Session 9 — Restarts, errors, synthetic responses

**`error <code> "reason"`** — abort current sub, jump to `vcl_error` with `obj.status = code` and `obj.response = "reason"`.

**Force-TLS pattern from `default.vcl`**:
```vcl
sub vcl_recv {
  if (!req.http.Fastly-SSL) {        // Fastly sets this header iff HTTPS
    error 750 "redirect";
  }
  ...
}

sub vcl_error {
  if (obj.status == 750) {
    set obj.status = 301;
    set obj.http.Location = "https://" + req.http.host + req.url;
  }
  return(deliver);
}
```
- `error 750 "redirect"` — codes 600–999 are user-defined, won't collide with HTTP.
- `vcl_error` is the only sub where you can build a fully synthetic response without a backend.

**Restarts** — `restart;` re-runs the request from `vcl_recv`. `req.restarts` is the counter. Cap at 3 by default; check this counter so you don't loop forever.

The repo uses `req.restarts` defensively in `default.vcl`:
```vcl
if (req.restarts > 0) {
  set beresp.http.Fastly-Restarts = req.restarts;
}
```

### Hands-on 9
1. Take the force-TLS snippet from `default.vcl`, paste it into your service. Curl with `http://` — should redirect 301 to `https://`.
2. Add a synthetic maintenance page: `error 800 "maintenance";` in `vcl_recv` for path `/maintenance`. In `vcl_error`, set `obj.status = 503; synthetic "<h1>Be right back</h1>";`. Curl that path and confirm the HTML body comes from Fastly, not your origin.

---

## Session 10 — CORS & HSTS

**CORS** (from `P100_cors.vcl`):
```vcl
sub vcl_deliver {
  if (! (req.http.host ~ "^api(-test)?\.dngroup\.com$") ) {
    set resp.http.Access-Control-Allow-Origin      = "*";
    set resp.http.Access-Control-Allow-Methods     = "GET, POST, OPTIONS, PUT, DELETE";
    set resp.http.Access-Control-Allow-Headers     = "Content-Type, Authorization, X-Requested-With";
    set resp.http.Access-Control-Allow-Credentials = "true";
  }
}
```
- Exclude the API gateway because *it* handles its own CORS (otherwise you'd double-set headers and confuse browsers).
- `*` Origin + `Credentials: true` is actually invalid per CORS spec — browsers will reject. Production usually sets `Allow-Origin` dynamically to the request's `Origin` header. This is a real-world quirk worth flagging when you read code like this.

**HSTS** (from `default.vcl`):
```vcl
sub vcl_deliver {
  set resp.http.Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload";
}
```
- `max-age=31536000` = 1 year. `preload` opts you into the browser preload list (one-way street — once preloaded, undoing takes months).

### Hands-on 10
1. Add CORS snippet to your service for one host but not another.
2. Open browser devtools → Network. Request from two hosts. Verify ACAO header presence/absence.
3. Add HSTS. Verify with `curl -I https://yoursvc/ | grep -i strict`.

---

## Session 11 — Logging & debugging

**`log` statement** (used throughout the repo):
```vcl
log "vcl_recv: " req.url + " " req.method + " " req.http.host;
```
Sends a line to all configured logging endpoints (S3, Datadog, BigQuery, Honeycomb, Splunk, etc. — configured via UI or `fastly_service_vcl.logging_*`).

**Real-time log streaming**: Fastly UI → Stats → Real-time. Tail it during development.

**Debug headers** — the canonical pattern from `vcl/snippet/ngwaf/debug_headers.vcl`:
```vcl
set beresp.http.log-timing:fetch    = time.elapsed.usec;
set beresp.http.log-timing:misspass = req.http.log-timing:misspass;
set beresp.http.log-timing:do_stream = beresp.do_stream;

set beresp.http.log-origin:method  = bereq.method;
set beresp.http.log-origin:url     = bereq.url;
set beresp.http.log-origin:host    = bereq.http.host;
set beresp.http.log-origin:ip      = beresp.backend.ip;
set beresp.http.log-origin:port    = beresp.backend.port;
set beresp.http.log-origin:name    = beresp.backend.name;
set beresp.http.log-origin:status  = beresp.status;
set beresp.http.log-origin:reason  = beresp.response;

if (req.backend.is_origin) {
  set beresp.http.log-origin:shield = server.datacenter;
}
```
- Header names with `:` are valid in VCL and survive to the wire.
- Each line documents one thing about the request — easy to scrape from real-time logs or a `curl -i`.
- `req.backend.is_origin` is true when we're talking directly to origin (no shield in front). `server.datacenter` is the POP code where this code is currently running.

### Hands-on 11
1. Add `debug_headers.vcl` to your service as a `fetch` snippet.
2. `curl -i https://yoursvc/some-path` — observe all the `log-*` headers. Reading them top to bottom tells you the request's whole life.
3. Set up a log endpoint (Datadog or even just stdout via Honeycomb dev key) — observe the same data streaming live.

---

## Session 12 — Edge Rate Limiting (ERL)

**The repo's pattern** (commented out but functional) is in `vcl/snippet/ngwaf/erl_enrichment.vcl`:
```vcl
penaltybox rl_default_pb {}
ratecounter rl_default_rc {}

sub rate_limit_process {
  if (fastly.ff.visits_this_service == 0 && req.restarts == 0) {
    declare local var.rl_client_id STRING;
    set var.rl_client_id = client.ip;
    unset bereq.http.erl-60s;

    if (std.strlen(var.rl_client_id) > 0) {
      if (ratelimit.check_rate(
            var.rl_client_id,    // identifier
            rl_default_rc,       // counter
            1,                   // delta — add 1 per request
            60,                  // window in seconds
            100,                 // limit — 100 req per 60s per IP
            rl_default_pb,       // penalty box
            2m                   // penalty duration once exceeded
          )) {
        set bereq.http.erl-60s = "99999";   // marked over-limit
      } else {
        set bereq.http.erl-60s = ratecounter.rl_default_rc.bucket.60s;
      }
    }
  }
}

sub vcl_miss { call rate_limit_process; }
sub vcl_pass { call rate_limit_process; }
```

**Pieces**
- `penaltybox` = a named set of identifiers that are currently throttled.
- `ratecounter` = a counter you can increment + query.
- `ratelimit.check_rate(...)` does *both*: increments the counter, returns `true` if the identifier should be throttled (and adds them to the penalty box for the duration).
- `bucket.60s` (or `.10s`, `.1s`) gives you the count in that window.

**Decide separately what to *do* with an over-limit request** — add VCL after `check_rate` to `error 429 "Too Many Requests"` or pass through with a debug header.

### Hands-on 12
1. Add an init snippet declaring `penaltybox` + `ratecounter`.
2. Add a recv snippet that calls `ratelimit.check_rate` keyed on `client.ip`, limit 5/10s.
3. Add `if (req.http.erl-over) { error 429 "rate limited"; }`.
4. Run `for i in {1..20}; do curl -s -o /dev/null -w "%{http_code}\n" https://yoursvc/test; done` — see first 5 succeed, then 429s.

---

## Session 13 — Next-Gen WAF (Signal Sciences) integration

The repo wires Fastly to Signal Sciences NGWAF — Fastly fronts the network, NGWAF inspects requests for SQLi, XSS, traversal, etc.

**Terraform side**
```hcl
provider "sigsci" {
  corp           = var.NGWAF_CORP
  email          = var.NGWAF_EMAIL
  auth_token     = var.NGWAF_TOKEN
  fastly_api_key = var.FASTLY_API_KEY
}

resource "sigsci_site" "ngwaf_site" {
  short_name             = var.NGWAF_SITE_SHORT_NAME
  display_name           = var.SERVICE_NAME
  block_duration_seconds = 3600
  agent_level            = "block"        // "block" = enforce, "log" = monitor only
  client_ip_rules        = ["X-Client-IP"]
}

resource "sigsci_edge_deployment" "ngwaf_edge_site_service" {
  site_short_name = sigsci_site.ngwaf_site.short_name
}

resource "sigsci_edge_deployment_service" "ngwaf_edge_service_link" {
  site_short_name  = sigsci_site.ngwaf_site.short_name
  fastly_sid       = fastly_service_vcl.frontend-vcl-service.id
  activate_version = true
  percent_enabled  = 100
  depends_on       = [ ...all the dynamic snippet content resources... ]
}
```

- `sigsci_site` — declares a WAF site in Signal Sciences.
- `sigsci_edge_deployment` — deploys NGWAF as an edge module.
- `sigsci_edge_deployment_service` — *links* it to a specific Fastly service. `percent_enabled = 100` = inspect 100% of traffic. Use lower values for canary.

**Dynamic snippets — managed by NGWAF**
```hcl
dynamicsnippet { name = "ngwaf_config_init"     type = "init"    priority = 0    }
dynamicsnippet { name = "ngwaf_config_miss"     type = "miss"    priority = 9000 }
dynamicsnippet { name = "ngwaf_config_pass"     type = "pass"    priority = 9000 }
dynamicsnippet { name = "ngwaf_config_deliver"  type = "deliver" priority = 9000 }
```
These are slots Fastly *creates and then NGWAF writes into at runtime*. We never edit their content from VCL — we let Signal Sciences manage them. Hence:
```hcl
resource "fastly_service_dynamic_snippet_content" "ngwaf_config_init" {
  ...
  content        = "### Fastly managed ngwaf_config_init"
  manage_snippets = false   // <- key: don't let Terraform clobber NGWAF's writes
}
```

**CDN enrichment** (`vcl/snippet/ngwaf/cdn_enrichment.vcl`):
```vcl
if (fastly.ff.visits_this_service == 0 && req.restarts == 0) {
  set req.http.Fastly-Client-IP = client.ip;
  set req.http.Client-JA3       = tls.client.ja3_md5;     // TLS fingerprint
  set req.http.asn              = client.as.number;       // ISP ASN
  set req.http.proxy-type       = client.geo.proxy_type;  // datacenter? VPN? mobile?
  set req.http.proxy-desc       = client.geo.proxy_description;
}
```
Fastly enriches every request with client metadata; NGWAF reads these to make smarter block/allow decisions.

**Edge security dictionary**
```hcl
dictionary { name = "Edge_Security" }
```
A runtime-editable key/value table you can read from VCL: `table.lookup(Edge_Security, "block_ip", "0")`. Used to push hot-fix block lists without re-deploying.

### Hands-on 13
1. Sign up for Signal Sciences (now Fastly NGWAF) trial: <https://www.fastly.com/products/web-application-api-protection>
2. In their dashboard, create a corp + site.
3. Add the `sigsci` provider to your Terraform project, build the `sigsci_site` + edge deployment + service link, `terraform apply`.
4. From the repo, run an attack curl:
   ```bash
   curl -i "https://yoursvc/?foo=%3Cscript%3E"   # XSS
   curl -i "https://yoursvc/?i=../../../etc/passwd"   # traversal
   ```
5. Open the NGWAF dashboard → Events. See both flagged. If `agent_level = block`, second curl should return 406 or 403.

---

## Session 14 — Terraform: providers, state, workspaces

**Required providers** (`providers.tf`):
```hcl
terraform {
  required_providers {
    fastly = { source = "fastly/fastly"          version = ">= 5.15.0" }
    sigsci = { source = "signalsciences/sigsci"  version = ">= 3.3.0"  }
    http   = { source = "hashicorp/http"                              }
  }
}
```
Pin major versions in production; the repo uses `>= x.y.z` which is permissive. For a junior SRE doing this for the first time: pin to `~> 5.15` (allow patch updates, not minor).

**Remote state** (`backend.tf`):
```hcl
terraform {
  backend "s3" {
    bucket  = "dngroup-terraform-state-fastly-eek2shu1"
    region  = "eu-north-1"
    encrypt = true
    key     = "fastly.main.tfstate"
  }
}
```
- `encrypt = true` — server-side encryption on the state file. Always do this; state can contain secrets in plain text.
- Note **no `dynamodb_table`** for state locking. The repo trusts the CI workflow's serial execution + workspace isolation. In a busier shop with multiple devs, you want DynamoDB lock.

**Workspaces**
The README explains the three-workspace flow:
```bash
export AWS_PROFILE=nhst-test
terraform workspace select test
terraform init -reconfigure
terraform plan -var-file=test.tfvars
terraform apply -var-file=test.tfvars
```
- One backend bucket, three state files: `env:/test/fastly.main.tfstate`, `env:/stage/...`, `env:/prod/...`.
- Each env has its own tfvars file → entirely different inputs (backend hostnames, domain names, NGWAF site).

**Per-env tfvars look like this** (from `prod.tfvars`):
```hcl
SERVICE_NAME                         = "DnGroup Frontend Service - Production"
STATIC_SERVICE_DOMAIN_NAME           = "stc.dngroup.com"
KONG_API_GATEWAY_BACKEND_HOSTNAME    = "gateway.apps.prod.dngroup.cloud"
NGWAF_CORP                           = "dnmedia"
NGWAF_SITE_SHORT_NAME                = "dngroup_prod"
```

### Hands-on 14
1. Create an S3 bucket + (optionally) DynamoDB table in your AWS dev account.
2. Mirror `backend.tf` + `providers.tf` into a new project.
3. Create three workspaces; create matching `test.tfvars`, `stage.tfvars`, `prod.tfvars`.
4. `terraform workspace select test && terraform apply -var-file=test.tfvars` — observe S3 state at `env:/test/...`.
5. Try to `apply` against test while another `apply` is running (different shell): without DynamoDB locking, both will go through and possibly corrupt state. Add a `dynamodb_table` to `backend.tf` and confirm the second `apply` now waits.

---

## Session 15 — Terraform patterns: dynamic snippets, fileset, regex parsing

**The big trick** from `main.tf`:
```hcl
dynamic "snippet" {
  for_each = fileset("${path.module}/vcl/snippet/", "*.vcl")
  content {
    name     = regex("^P[0-9]+_(.*)", snippet.value)[0]
    content  = file("${path.module}/vcl/snippet/${snippet.value}")
    type     = "init"
    priority = tonumber(regex("^P([0-9]+)_", snippet.value)[0])
  }
}
```

**What it does**: drop any new file matching `P<priority>_<name>.vcl` into `vcl/snippet/` and it's automatically wired into the service on next apply. No Terraform edit needed.

**How it works**
- `fileset(dir, pattern)` → set of matching filenames.
- `dynamic "snippet"` → generates one `snippet` block per element.
- `regex(pattern, str)` → returns the captured group(s) as a list.
  - `regex("^P([0-9]+)_", "P100_api.vcl")` returns `["100"]`.
  - `regex("^P[0-9]+_(.*)", "P100_api.vcl")` returns `["api.vcl"]`.

**Cross-product API calls** (`main.tf`):
```hcl
provider "http" {}

data "http" "linked_fastly_services" {
  url = "https://dashboard.signalsciences.net/api/v0/corps/${var.NGWAF_CORP}/sites/${sigsci_site.ngwaf_site.short_name}/edgeDeployment"
  request_headers = {
    x-api-user   = var.NGWAF_EMAIL
    x-api-token  = var.NGWAF_TOKEN
    Content-Type = "application/json"
  }
  depends_on = [sigsci_edge_deployment_service.ngwaf_edge_service_link]
}

output "services_linked_to_ngwaf_output" {
  value = [for item in jsondecode(data.http.linked_fastly_services.response_body)["ServicesAttached"] : item.id]
}
```
Calls the Signal Sciences API directly from Terraform, parses JSON, projects field. Useful when one provider doesn't expose a data source you need.

### Hands-on 15
1. Build a project structure: `vcl/snippet/P100_one.vcl`, `P110_two.vcl`, `P120_three.vcl`. Each sets a different `resp.http.X-N` in `vcl_deliver`.
2. Add the `dynamic "snippet"` block from above.
3. `terraform apply`. Curl. See all three headers, in priority order.
4. Add a fourth file `P115_four.vcl` — no Terraform edits — re-apply. Observe new snippet automatically attached.

---

## Session 16 — CI/CD: GitHub Actions

Three workflows in `.github/workflows/`:

**`deploy-production.yml`** — runs on push to `master`:
- Sets up Terraform 1.5.5 (`hashicorp/setup-terraform@v3`).
- `terraform workspace select prod || terraform workspace new prod` — idempotent.
- `terraform init -reconfigure` — required after workspace switch.
- `terraform apply -var-file=prod.tfvars -auto-approve` — non-interactive.

**`deploy-stage.yml`** — same shape but triggers on push to `stage` branch.

**`terraform-verify.yml`** — runs on PRs to master, doesn't apply:
- `terraform fmt -check`
- `terraform validate`
- `terraform plan -var-file=prod.tfvars`

**Secrets management**
```yaml
env:
  AWS_ACCESS_KEY_ID:     ${{ secrets.AWS_ACCESS_KEY_ID_PROD }}
  AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY_PROD }}
  FASTLY_API_KEY:        ${{ secrets.FASTLY_API_KEY }}
```
- Long-lived AWS access keys per env. Modern pattern: OIDC federation from GitHub → AWS via IAM Role assumption (no long-lived keys). Worth mentioning if you ever upgrade the workflow.

**`workflow_dispatch` with input**
```yaml
on:
  push:
    branches: [master]
  workflow_dispatch:
    inputs:
      branch:
        description: 'Branch to deploy'
        required: true
        default: 'master'
```
Lets you deploy *any* branch on demand via the GitHub UI — useful for hotfix branches that didn't merge to master yet.

### Hands-on 16
1. Add the three workflow files to your own Terraform project. Adjust branch names if needed.
2. Open a PR — confirm `terraform-verify` runs `fmt`, `validate`, `plan` and posts plan output.
3. Merge to master — confirm `deploy-production` runs.
4. Bonus: rewrite `deploy-production.yml` to use OIDC instead of long-lived AWS keys (`aws-actions/configure-aws-credentials` with `role-to-assume`).

---

## Session 17 — Glue work: S3 header scrub, cookie handling, image-opto hygiene

These are the small, easy-to-miss VCL snippets that make a real service production-ready.

**S3 backend header cleanup** — when Fastly proxies to an S3 bucket, Amazon returns a pile of headers like `x-amz-request-id`, `x-amz-id-2`, `Authorization`. Strip them in `vcl_miss` and `vcl_pass` so they're not sent back to client.

From `P100_global_image.vcl`:
```vcl
sub vcl_miss {
  unset bereq.http.Authorization;
  unset bereq.http.X-Amz-Date;
  unset bereq.http.X-Amz-Security-Token;
  unset bereq.http.X-Amz-Content-Sha256;
  unset bereq.http.x-amz-server-side-encryption;
  unset bereq.http.x-amz-version-id;
  unset bereq.http.x-amz-request-id;
  unset bereq.http.x-amz-id-2;
  unset bereq.http.x-amz-replication-status;
}
sub vcl_pass {
  /* same unsets */
}
```
> ⚠️ Notice `bereq` (backend request) not `req` (client request). `bereq.http.X = ...` mutates the request *going to origin*. `unset bereq.http.Authorization` strips the client's Authorization header before sending to S3 — useful when you don't want S3 to interpret it.

**Cookie → uncacheable**
From `default.vcl`:
```vcl
sub vcl_fetch {
  if (beresp.http.Set-Cookie) {
    return(pass);
  }
}
```
Already covered, worth repeating: any response with `Set-Cookie` becomes hit-for-pass. Otherwise different users would see each other's cookies.

**Image Optimizer hygiene**
From `default.vcl`:
```vcl
if (req.http.X-Fastly-Imageopto-Api) {
  unset beresp.http.Set-Cookie;
  unset beresp.http.Vary;
}
```
For IO responses, scrub `Set-Cookie` (so they cache) and `Vary` (so we don't fragment by Accept-Encoding for each image).

**Don't cache origin errors** (from `P101_dont_cache_error.vcl`):
```vcl
sub vcl_fetch {
  if (beresp.status >= 200 && beresp.status < 300) {
    set beresp.cacheable = true;
  } else {
    set beresp.ttl = 0s;
    set beresp.cacheable = false;
  }
}
```
- `beresp.cacheable = true/false` is the canonical "should this go in cache" flag.
- For 5xx, you can pair this with `stale_if_error = true` to still serve a stale cached response.

### Hands-on 17
1. Add an S3 bucket as backend; observe raw `x-amz-*` headers in client response.
2. Apply the unsets — verify they disappear.
3. Backend with `Set-Cookie: x=1` in response: curl twice, confirm both MISS.
4. Apply image-opto hygiene: see `Set-Cookie` and `Vary` strip on IO responses.

---

## Session 18 — Putting it all together: rebuild the dngroup-fastly architecture

By now you've touched every concept in the repo. Final lab: rebuild the same architecture against *your* backends.

**Domains the repo serves**
| domain | purpose |
|---|---|
| `stc.dngroup.com` | Static service (CPP rechargenews/intrafish/upstream + config) |
| `image.dngroup.com` | Image domain → S3 + Aptoma Smooth Storage + IO |
| `images-global.nhst.tech` | Global image domain |
| `media.dngroup.com` | Media service → images origin |
| `api.dngroup.com` | Kong API gateway proxy |

**The repo's flow for any request**
1. **vcl_recv** (default.vcl): force TLS, pass non-GET/HEAD methods.
2. **P100_api.vcl** / **P100_image.vcl** / **P100_media.vcl** / **P100_proxy_cpp_static_content.vcl** / **P100_global_image.vcl**: examine host + URL → set `req.http.x-backend` and/or `req.backend` directly. Rewrite URL paths (`/recharge/foo` → `/api/foo`).
3. **P100_dngroup_logo.vcl**: rewrite `/fastly/logo` → static asset.
4. **NGWAF cdn_enrichment.vcl** + **add_ngwaf_log_headers.vcl**: enrich client metadata, enable NGWAF log headers.
5. **NGWAF dynamic snippets** (init/miss/pass/deliver): WAF inspection.
6. **vcl_fetch** (default.vcl + P100_image.vcl): set TTLs, pass on Set-Cookie/private, strip Vary on IO.
7. **P101_dont_cache_error.vcl**: anything non-2xx → cacheable=false.
8. **vcl_deliver** (default.vcl + P100_cors.vcl + P100_api.vcl): HSTS, CORS, strip x-backend header.

### Hands-on 18 (capstone)
Pick 3 backends you own (or 3 free public APIs: `httpbin.org`, `jsonplaceholder.typicode.com`, `dummyimage.com`). Build a Fastly service that:

1. Routes `/api/*` to backend A.
2. Routes `/img/*` through Image Optimizer to backend B (`dummyimage.com` returns real images).
3. Routes everything else to backend C.
4. Uses the `x-backend` + condition pattern for routing.
5. Has snippets organized as `P100_xxx.vcl` files, auto-loaded via `dynamic "snippet"`.
6. Has the force-TLS pattern from `default.vcl`.
7. Adds CORS (with the api-host exclusion pattern) and HSTS in `vcl_deliver`.
8. Has the debug-headers snippet enabled.
9. Has rate limiting (10 req / 10s / IP).
10. Is deployed via GitHub Actions on push to master, using S3-backed Terraform state with workspaces (one workspace for `dev`, one for `prod`).

You can do this end-to-end in a weekend. When it works, you've internalized the whole stack the dngroup-fastly repo implements.

---

## Reference — quick lookup

### VCL variables you'll use constantly
| variable | scope | meaning |
|---|---|---|
| `req.url`, `req.url.path`, `req.url.qs` | client request | full URL, path-only, query-string-only |
| `req.http.X-Foo` | client request | header (mutable in `vcl_recv`) |
| `req.method`, `req.restarts`, `req.backend` | client request | |
| `client.ip`, `client.as.number`, `client.geo.*` | client | TCP source IP, ASN, geolocation |
| `tls.client.ja3_md5` | client | TLS fingerprint |
| `bereq.url`, `bereq.http.*` | backend request | going *to* origin |
| `beresp.status`, `beresp.ttl`, `beresp.http.*` | backend response | coming *from* origin |
| `beresp.cacheable`, `beresp.uncacheable` | backend response | |
| `beresp.backend.ip`, `beresp.backend.port`, `beresp.backend.name` | backend response | which origin actually served this |
| `obj.status`, `obj.http.Location` | cached object | used in vcl_error for synthetic responses |
| `resp.status`, `resp.http.*` | client response | final response to client (mutable in vcl_deliver) |
| `fastly.ff.visits_this_service` | system | 0 at edge POP, >0 at shield/origin POP |
| `server.datacenter` | system | which POP is executing this code |
| `time.elapsed.usec` | system | μs since start of request |

### VCL built-ins worth knowing
- `regsub(input, pattern, replacement)` — single substitution.
- `regsuball(input, pattern, replacement)` — global substitution.
- `subfield(input, key, separator)` — pull `?foo=bar&baz=qux` → `bar` with `subfield(..., "foo", "&")`.
- `digest.base64_decode(s)` — used in the repo to decode Aptoma `?io=...` blobs.
- `std.strlen(s)` — string length.
- `std.tolower(s)`, `std.toupper(s)`.
- `ratelimit.check_rate(...)`, `ratecounter.NAME.bucket.10s|60s|1s`.

### Fastly docs that pay off
- VCL reference: <https://www.fastly.com/documentation/reference/vcl/>
- VCL variables: <https://www.fastly.com/documentation/reference/vcl/variables/>
- VCL functions: <https://www.fastly.com/documentation/reference/vcl/functions/>
- Image Optimizer: <https://www.fastly.com/documentation/reference/io/>
- Edge Rate Limiting: <https://www.fastly.com/documentation/guides/full-site-delivery/rate-limiting/>
- Shielding: <https://www.fastly.com/documentation/guides/full-site-delivery/shielding/>
- Fastly Fiddle (test VCL without a service): <https://fiddle.fastly.dev>
- Fastly Terraform provider: <https://registry.terraform.io/providers/fastly/fastly/latest/docs>
- Signal Sciences Terraform provider: <https://registry.terraform.io/providers/signalsciences/sigsci/latest/docs>

### Common gotchas
- **`#FASTLY xxx` macros must stay.** Deleting them silently disables features.
- **`req.url` vs `req.url.path`** — `req.url` includes the query string. Match path-only with `req.url.path`.
- **Snippet `type = "init"` with `sub vcl_xxx { ... }`** — that's how the repo's P100_*.vcl files work. The snippet content is placed at top-level scope; the inner `sub` block extends the lifecycle sub. Confusing but standard.
- **Anchored host regex** — always anchor: `req.http.host ~ "^image(-test|-stage)?\.dngroup\.com$"`. Without `^...$` you'll match `evil-image.dngroup.com.attacker.com`.
- **`override_host` + `ssl_sni_hostname` + `ssl_cert_hostname`** should all match for clean TLS to origin.
- **`fastly.ff.visits_this_service == 0`** = "at edge". Use it to gate operations that should run only once.
- **Set-Cookie → automatic pass** unless you unset it. IO responses do this.
- **`manage_snippets = false`** on dynamic snippets you want Fastly products (like NGWAF) to manage.
- **Workspaces ≠ environments** at the platform level — they're per-state-file isolation. Your tfvars + provider configs are what actually make `test` different from `prod`.
- **State file locking** — the repo doesn't use DynamoDB. In a team setting, add it.

### Cheat sheet: the request lifecycle in one table
| step | sub | typical work |
|---|---|---|
| 1 | `vcl_recv` | URL rewriting, backend selection, force-TLS, method filtering, set `x-backend`, IO enablement, client enrichment |
| 2 | `vcl_hash` | (rare) custom cache key composition |
| 3 | `vcl_hit` | (rare) modify behavior on cache hit |
| 4 | `vcl_miss` | strip backend-only request headers (`Authorization`, S3 `x-amz-*`) |
| 5 | `vcl_pass` | same as miss for uncacheable paths |
| 6 | `vcl_fetch` | set TTL, mark uncacheable, image-opto hygiene, error-status handling |
| 7 | `vcl_error` | synthetic responses (redirects, maintenance pages) |
| 8 | `vcl_deliver` | response headers (HSTS, CORS, debug), strip internal headers |
| 9 | `vcl_log` | structured logging |

---

*This file lives at `/Users/cefalo/cloud-sre-journey/fastly-notes.md`. Source repo it documents: `/Users/cefalo/dngroup-fastly/`.*
