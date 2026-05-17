# Deploy the SRE Notebook to Vercel

The site is a pure static dashboard (React + Babel-standalone via CDN, no build step required). All progress is stored in your browser's `localStorage`, so there's no backend, no env vars, and no database to provision.

Two paths below: **CLI** for a one-shot deploy, or **GitHub integration** for auto-deploys on every push.

---

## Project layout (what Vercel will serve)

```
site/
├── index.html          ← entry (multi-file dev build, loads .jsx/.js/.css as separate files)
├── styles.css
├── data.js
├── components.jsx
├── views.jsx
├── app.jsx
├── bundle.html         ← optional self-contained build (produced by build.py)
└── build.py            ← regenerates bundle.html
```

Vercel just needs to serve `site/` as a static directory. **No `vercel build` step is required.**

---

## Option A — Vercel CLI (fastest)

```bash
# one-time install
npm i -g vercel

# from the repo root
cd site
vercel              # first run: log in, link/create project
vercel --prod       # promote to a production URL
```

When prompted:

| Question                                | Answer                |
|-----------------------------------------|-----------------------|
| Set up and deploy?                      | **Y**                 |
| Which scope?                            | your account          |
| Link to existing project?               | N (first time)        |
| Project name?                           | `sre-notebook` (or any) |
| In which directory is your code?        | `./` (you're already in `site/`) |
| Want to modify settings?                | **N**                 |

Vercel auto-detects "Other" framework and serves the directory as static.

---

## Option B — GitHub integration (auto-deploy on push)

1. Push the repo to GitHub (`git push origin main`).
2. Go to <https://vercel.com/new> and **Import** the `Hasebul21/cloud-sre-journey` repo.
3. On the **Configure Project** screen, set:

   | Setting             | Value         |
   |---------------------|---------------|
   | Framework Preset    | **Other**     |
   | Root Directory      | `site` ← **required, see warning below** |
   | Build Command       | *(leave empty)* |
   | Output Directory    | *(leave empty — defaults to root)* |
   | Install Command     | *(leave empty)* |

   > ⚠️ **Root Directory must be `site`.** If you leave it blank, Vercel builds from the repo root (which has no `index.html`) and every URL returns `404 NOT_FOUND` even though the deployment shows "Ready". To fix after the fact: **Project → Settings → Build & Deployment → Root Directory → `site` → Save**, then redeploy (push a commit or use **Deployments → ⋯ → Redeploy**).

4. Click **Deploy**. First build takes ~10 seconds. Every subsequent `git push` to `main` redeploys automatically.

---

## Optional — Build the self-contained bundle before deploy

If you'd rather ship a single HTML file (smaller surface, no CDN race conditions during first paint), regenerate `bundle.html` before pushing:

```bash
python3 site/build.py
```

Then in Vercel's project settings, change the rewrite so `/` serves `bundle.html`:

Create `site/vercel.json`:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/bundle.html" }
  ]
}
```

---

## After deploy

- Vercel gives you a `*.vercel.app` URL immediately. To add a custom domain, go to **Project → Settings → Domains**.
- New Hobby team projects ship with **Vercel Authentication** enabled, which makes the public URL 401 (or 404 on the canonical alias) for anyone not logged into your Vercel account. To make the site public: **Project → Settings → Deployment Protection → Vercel Authentication → Disabled → Save**. No redeploy needed.
- All checkboxes / streaks / notes live in `localStorage`, scoped per browser. Open the same URL on your phone and it starts fresh — that's intentional, not a bug.
- To "back up" progress, use the **export** link at the bottom of the sidebar (copies JSON to clipboard).

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Every path returns `404 NOT_FOUND`, deployment is "Ready" | Root Directory unset → built from repo root, no `index.html` | Settings → Build & Deployment → Root Directory → `site` → Save → redeploy |
| Canonical URL is 404, but `*-<hash>-<scope>.vercel.app` is 401 | Vercel Authentication on (default for new Hobby team projects) | Settings → Deployment Protection → Disabled |
| `vercel --prod` from repo root creates a new project instead of redeploying `sre-notebook` | Repo root isn't linked; only `site/.vercel/` is | `cd site && vercel --prod` (CLI deploys must run from the linked dir) |

---

## Re-running locally

```bash
# Multi-file dev (hot reload on save with browser refresh)
python3 -m http.server -d site 8765
# then open http://localhost:8765/

# Self-contained (no server, opens via file://)
python3 site/build.py
open site/bundle.html
```
