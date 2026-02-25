# 🧠 AlgoViz — Algorithm Visualizer

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-00f5c4?style=for-the-badge&logo=netlify)](https://algo9-visualizer.netlify.app)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)

> An interactive, real-time algorithm visualizer built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## ✨ Features

- 📊 **Sorting Algorithms** — Step-by-step visual playback with bar charts
  - Selection Sort
  - Merge Sort
  - Quick Sort (with pivot highlighting)

- 🕸️ **Graph Algorithms** — Canvas-based animated graph traversal
  - Breadth-First Search (BFS)
  - Depth-First Search (DFS)
  - Dijkstra's Shortest Path

- ⚙️ **Controls**
  - Adjustable animation speed (1–10)
  - Configurable array / graph size
  - Live step counter, comparison count & elapsed time

- 🎨 **Design**
  - Dark mode with animated grid background
  - Color-coded node & bar states
  - Big-O complexity card per algorithm

---

## 🚀 Getting Started

No install needed. Just open the file in a browser:

```bash
git clone https://github.com/YOUR_USERNAME/algoviz.git
cd algoviz
open index.html     # macOS
# or
start index.html    # Windows
```

Or simply drag and drop `index.html` into any modern browser.

---

## 🗂️ Project Structure

```
algoviz/
├── index.html          # Main app (self-contained)
├── README.md
├── LICENSE
└── .github/
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md
    │   └── feature_request.md
    └── workflows/
        └── deploy.yml
```

---

## 📸 Preview

| Sorting Visualizer | Graph Traversal |
|---|---|
| Bars animate step-by-step with color coding | Canvas nodes light up as they are visited |

> **Colors:**  
> 🟦 Default &nbsp; 🟩 Active / Visiting &nbsp; 🟨 Pivot / Source &nbsp; 🟪 Sorted / Visited &nbsp; 🔴 Pivot (Quick Sort)

---

## 🧩 Algorithms

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
| Dijkstra | O(V²) | O(V) | Shortest path (weighted) |

---

## 🛠️ Built With

- **HTML5 Canvas** — graph rendering
- **CSS Custom Properties** — theming & dark mode
- **Vanilla JS** — all animation logic, zero dependencies
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

## 🙋‍♂️ Author

Made with ❤️ by **[Your Name](https://github.com/YOUR_USERNAME)**

---

⭐ If you found this useful, consider giving it a star!
