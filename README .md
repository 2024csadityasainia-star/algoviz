# 🧠 AlgoViz — Algorithm Visualizer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-00f5c4?style=for-the-badge&logo=netlify)](https://algo9-visualizer.netlify.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

> An interactive, real-time algorithm visualizer built with vanilla HTML, CSS, and JavaScript — modular files, no frameworks, no dependencies.

---

## ✨ Features

- 📊 **Sorting Algorithms** — animated bar chart, driven by a pre-computed queue of "frames" for each algorithm
  - Selection Sort
  - Merge Sort
  - Quick Sort (with pivot highlighting)
  - Custom array input (comma-separated values, up to 80 elements) alongside randomized array generation
  - Live **Input / Output** array panel showing the array before and after sorting

- 🕸️ **Graph Algorithms** — animated traversal on an HTML5 Canvas, 7 nodes (`A`–`G`) laid out in a circle with randomized, guaranteed-connected weighted edges
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra's Shortest Path (draws the final shortest-path tree in a distinct color once complete)
  - Selectable source node

- ⚙️ **Controls**
  - Adjustable animation speed (1–10, non-linear mapping to playback delay)
  - Configurable array size (5–80) or graph regeneration
  - Live step counter, comparison/swap counts & elapsed time (updated every 50ms while running)

- 🎨 **Design**
  - Dark-mode UI with JetBrains Mono + Syne typography
  - Color-coded bar/node states (default, active, comparing, sorted, pivot / unvisited, visiting, visited, source, path)
  - Big-O complexity card that updates per selected algorithm

---

## 🚀 Getting Started

No install or build step needed — it's static HTML/CSS/JS.

```bash
git clone https://github.com/2024csadityasainia-star/algoviz.git
cd algoviz
open index.html     # macOS
# or
start index.html    # Windows
```

Or just drag and drop `index.html` into any modern browser.

> ⚠️ Because the app is now split across separate `<script>`/`<link>` files, opening `index.html` directly via `file://` works in most browsers, but if you hit any loading issues, serve the folder locally instead (e.g. `npx serve .` or the VS Code "Live Server" extension) and open it over `http://localhost`.

---

## 🗂️ Project Structure

```
algoviz/
├── index.html            # Markup + wiring for all UI elements
├── css/
│   └── styles.css        # All visual styling (theme, layout, bars, canvas legend, etc.)
├── js/
│   ├── state.js           # Shared global state, complexity table, algorithm titles — loads first
│   ├── sorting.js         # Selection/Merge/Quick sort implementations + bar playback loop
│   ├── graph.js            # Graph generation, BFS/DFS/Dijkstra, canvas drawing + playback loop
│   ├── ui.js               # Tab/algorithm switching, array rendering, stats, run/reset control
│   └── main.js             # Button wiring + app bootstrap — loads last
├── README.md
├── CONTRIBUTING.md
├── LICENSE
├── setup_git.sh           # Helper script for initializing/pushing the repo
└── .gitignore
```

**Script load order matters** — `index.html` loads them in this sequence:

```html
<script src="js/state.js"></script>
<script src="js/sorting.js"></script>
<script src="js/graph.js"></script>
<script src="js/ui.js"></script>
<script src="js/main.js"></script>
```

`state.js` must load first (it declares the shared variables every other file reads/writes), and `main.js` must load last (it wires up buttons and calls `init()`, which depends on everything above being defined). There's no module bundler — all files share the global scope.

---

## 🧩 How It Works

Each algorithm doesn't animate live — it first **runs to completion against a copy of the data**, pushing a "frame" object (array/graph state snapshot + highlight info + a human-readable message) onto a queue (`animationQueue` for sorting, `graphAnimQueue` for graphs) at every meaningful step. A separate playback loop (`playSort()` / `playGraph()`) then pops one frame off the queue every `speedMs` (or `speedMs * 2` for graphs), re-renders it, and re-queues itself via `setTimeout` until the queue is empty. This keeps the algorithm logic and the animation timing completely decoupled.

### Sorting

| Algorithm | Best | Average | Worst | Space |
|-----------|------|---------|-------|-------|
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

### Graph

| Algorithm | Time | Space | Use Case |
|-----------|------|-------|----------|
| BFS | O(V + E) | O(V) | Shortest path (unweighted) |
| DFS | O(V + E) | O(V) | Cycle detection, topological sort |
| Dijkstra | O(E log V)* | O(V) | Shortest path (weighted) |

\* The complexity card advertises `O(E log V)`, but the current `dijkstraAlgo()` implementation scans all nodes linearly to find the minimum each iteration (no priority queue), so it actually runs in `O(V²)`.

---

## 🛠️ Built With

- **HTML5 Canvas** — graph rendering
- **CSS Custom Properties** — theming (dark mode, color tokens for bar/node states)
- **Vanilla JS** — all algorithm logic, animation queues, and DOM updates; zero dependencies, zero build step
- **Google Fonts** — JetBrains Mono + Syne

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
See [CONTRIBUTING.md](./CONTRIBUTING.md) to get started.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

⭐ If you found this useful, consider giving it a star!
