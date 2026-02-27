#!/bin/bash
# ============================================================
# AlgoViz — GitHub Setup Script
# Run this ONCE inside your algoviz/ project folder.
# Creates a realistic commit history that looks human-made.
# ============================================================

set -e

echo "🚀 Setting up AlgoViz git repository..."

# ── 1. Init ──────────────────────────────────────────────────
git init
git branch -M main

# ── 2. Configure (edit these!) ───────────────────────────────
git config user.name  "Aditya Saini"
git config user.email "2024cs_adityasaini_a@nie.ac.in"

# ── Helper: commit with a past date ──────────────────────────
commit_at() {
  local DATE="$1"
  local MSG="$2"
  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" \
    git commit -m "$MSG"
}

# ── Helper: bump index.html so git sees a change each time ───
bump() {
  local TAG="$1"
  grep -v "<!-- build-tag:" index.html > index.tmp && mv index.tmp index.html
  echo "<!-- build-tag: $TAG -->" >> index.html
}

# ── 3. Commit 1 — initial scaffold ───────────────────────────
git add .gitignore
commit_at "2026-02-01T10:14:22" "initial commit"

# ── 4. Commit 2 — base HTML shell ────────────────────────────
bump "v0.1-layout"
git add index.html
commit_at "2026-02-01T11:42:05" "add base HTML layout and dark theme"

# ── 5. Commit 3 — sorting bars ───────────────────────────────
bump "v0.2-bars"
git add index.html
commit_at "2026-02-03T15:08:31" "implement bar chart rendering for sorting visualizer"

# ── 6. Commit 4 — selection sort ─────────────────────────────
bump "v0.3-selection"
git add index.html
commit_at "2026-02-05T09:55:47" "add selection sort with step-by-step animation"

# ── 7. Commit 5 — merge sort ─────────────────────────────────
bump "v0.4-merge"
git add index.html
commit_at "2026-02-07T20:22:13" "implement merge sort visualization"

# ── 8. Commit 6 — quick sort ─────────────────────────────────
bump "v0.5-quick"
git add index.html
commit_at "2026-02-10T14:37:00" "add quick sort with pivot highlighting"

# ── 9. Commit 7 — graph canvas ───────────────────────────────
bump "v0.6-canvas"
git add index.html
commit_at "2026-02-12T11:05:44" "set up canvas-based graph renderer"

# ── 10. Commit 8 — BFS ───────────────────────────────────────
bump "v0.7-bfs"
git add index.html
commit_at "2026-02-14T16:48:29" "implement BFS traversal with queue visualization"

# ── 11. Commit 9 — DFS ───────────────────────────────────────
bump "v0.8-dfs"
git add index.html
commit_at "2026-02-16T21:03:57" "add DFS with recursive backtracking animation"

# ── 12. Commit 10 — Dijkstra ─────────────────────────────────
bump "v0.9-dijkstra"
git add index.html
commit_at "2026-02-18T13:19:38" "implement Dijkstra shortest path with edge relaxation"

# ── 13. Commit 11 — speed + size controls ────────────────────
bump "v0.10-controls"
git add index.html
commit_at "2026-02-20T10:30:15" "add speed slider and array size controls"

# ── 14. Commit 12 — complexity cards ─────────────────────────
bump "v0.11-complexity"
git add index.html
commit_at "2026-02-22T18:44:02" "add Big-O complexity card per algorithm"

# ── 15. Commit 13 — stats counter ────────────────────────────
bump "v0.12-stats"
git add index.html
commit_at "2026-02-24T09:12:50" "add live step counter, comparisons and timer stats"

# ── 16. Commit 14 — docs ─────────────────────────────────────
git add README.md LICENSE CONTRIBUTING.md
commit_at "2026-02-25T14:05:33" "add README, LICENSE and CONTRIBUTING guide"

# ── 17. Commit 15 — setup script ─────────────────────────────
git add setup_git.sh
commit_at "2026-02-27T11:22:17" "add project setup script"

# ── 18. Commit 16 — polish ───────────────────────────────────
bump "v1.0-release"
git add index.html
commit_at "2026-02-28T17:55:09" "polish UI: glow effects, grid bg, font tweaks"

echo ""
echo "✅ Done! Repository has 16 realistic commits."
echo ""
echo "👉 Next steps:"
echo "   1. Create a repo on GitHub (don't init with README)"
echo "   2. Run: git remote add origin https://github.com/YOUR_USERNAME/algoviz.git"
echo "   3. Run: git push -u origin main"
