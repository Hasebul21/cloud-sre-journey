# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal study repository, **not a software project**. There is no code to build, lint, or test. The repository is a single evolving Markdown study guide that the user iterates on directly:

- `SRE-DevOps-Mastery-and-APAC-Job-Search-Guide.md` — the source of truth (~1,600 lines). All work happens here.
- `README.md` — placeholder only (one line).
- `swe.pdf` — a reference PDF; do not edit.

**Audience:** the user — a Bangladesh-based junior SRE preparing for visa-sponsored SRE/DevOps roles in Singapore, Japan, Malaysia, and Thailand. Plan = 15 hrs/week over 6 months. Keep edits aligned with that constraint (don't pile on content that doesn't fit a junior-to-mid SRE's 6-month runway).

## Guide structure

The guide is organized in named parts; understand which part a change belongs to before editing:

- **Part 0** — Interview prep track built around the Hello Interview framework. Subsections 0A System Design, 0B Behavioral, 0D Low-Level Design, 0E SQL, 0F DSA (150 problems), 0G Schedule. Almost all video links here point to the Hello Interview YouTube channel; preserve those links and the playlist references at the top of Part 0.
- **Part A** — Full software lifecycle (Plan/Code → Build/Deploy → Operate/Maintain → Cost). Short, opinionated bullets, not a textbook.
- **Part B** — Hands-on phases (1–7) all built around **one worked example: a Todo List App (Go + PostgreSQL)** that is progressively containerized, deployed to kind, instrumented with ELK + Prometheus/Grafana/OTel, then shipped to AWS with Terraform and GitHub Actions. Keep this single-project thread consistent across phases — don't introduce a different example app.
- **Parts D, E, G, H, I, J** — System design for SRE, coding, APAC job search (per-country sections for SG/JP/MY/TH), interview prep, personal branding, resources. (Parts C and F were intentionally removed; don't reintroduce them.)

The Table of Contents at the top uses `<a id="part-X">` anchors. When adding or renaming sections, update both the TOC entry and the anchor.

## Editing conventions

- **Prefer `Edit` over `Write`.** The file is large; whole-file rewrites lose hand-tuned phrasing and have caused churn in prior commits ("condense", "restructure", "expand" patterns in `git log`).
- **Density over prose.** The guide deliberately uses tables, bulleted lists, and short imperative phrases. Avoid expanding bullets into paragraphs unless the user asks.
- **Tables are the default format** for: video lists, comparison matrices, country/company breakdowns, schedule weeks. Match the existing column patterns when extending them.
- **Code blocks are illustrative**, not runnable — Dockerfiles, K8s manifests, SQL snippets, Terraform fragments are reference material. Keep them minimal and idiomatic; don't add error handling or production hardening unless the surrounding section is about that.
- **Links:** YouTube video links throughout Part 0 are curated from the Hello Interview channel — don't replace them with arbitrary alternatives. If a video link needs verification, use the existing `WebFetch(domain:www.youtube.com)` permission.

## Workflow

The user commits with concise messages describing the editorial change (e.g. "Expand DSA section with 150 problems, move after SQL, fix playlist"). When asked to commit:

- Stage only `SRE-DevOps-Mastery-and-APAC-Job-Search-Guide.md` (and `CLAUDE.md` / `README.md` if those changed) — never `.DS_Store` or `swe.pdf`.
- Write the message in the same imperative style: what changed editorially, not "updated guide."

Push only when explicitly asked.
