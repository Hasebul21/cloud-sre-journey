#!/usr/bin/env python3
"""
Build a self-contained site/bundle.html from:
  - styles.css      paper notebook aesthetic
  - data.js         curated trackable items
  - components.jsx  shared React components + hooks
  - views.jsx       per-route view components
  - app.jsx         sidebar nav + router (mounts the React tree)

Two ways to run the site:

  1. Multi-file dev — open `index.html` via a local server:
       python3 -m http.server -d site 8000
     then visit http://localhost:8000/
     (Required because <script src="..jsx"> needs HTTP fetches.)

  2. Self-contained — run this script to inline everything:
       python3 site/build.py
     then double-click `site/bundle.html`. No server required.

Re-run after editing any source.
"""

import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parent

STYLES = HERE / "styles.css"
DATA = HERE / "data.js"
COMPONENTS = HERE / "components.jsx"
VIEWS = HERE / "views.jsx"
APP = HERE / "app.jsx"
OUT = HERE / "bundle.html"

TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SRE Notebook — APAC Study Tracker</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Source+Serif+Pro:wght@400;600;700&display=swap" rel="stylesheet">
<style>
__STYLES__
</style>
</head>
<body>
<div id="root"></div>

<script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

<script>
__DATA__
</script>

<script type="text/babel">
__COMPONENTS__
</script>

<script type="text/babel">
__VIEWS__
</script>

<script type="text/babel">
__APP__
</script>
</body>
</html>
"""


def main():
    for p in (STYLES, DATA, COMPONENTS, VIEWS, APP):
        if not p.exists():
            print(f"missing: {p}", file=sys.stderr)
            sys.exit(1)

    out = (
        TEMPLATE
        .replace("__STYLES__",     STYLES.read_text(encoding="utf-8"))
        .replace("__DATA__",       DATA.read_text(encoding="utf-8"))
        .replace("__COMPONENTS__", COMPONENTS.read_text(encoding="utf-8"))
        .replace("__VIEWS__",      VIEWS.read_text(encoding="utf-8"))
        .replace("__APP__",        APP.read_text(encoding="utf-8"))
    )
    OUT.write_text(out, encoding="utf-8")
    print(f"built {OUT.relative_to(ROOT)} ({OUT.stat().st_size/1024:.1f} KB)")
    print("Open it with:  open site/bundle.html")


if __name__ == "__main__":
    main()
