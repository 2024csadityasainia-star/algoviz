// state.js — shared state and lookup tables (load first)

// =====================================================
// STATE
// =====================================================
let currentAlgo = 'selection';
let currentType = 'sort';
let array = [];
let animationQueue = [];
let isRunning = false;
let animTimeout = null;
let comparisons = 0, swaps = 0, steps = 0;
let startTime = 0;
let timerInterval = null;
let speedMs = 100;

// Graph state
let graphNodes = [];
let graphEdges = [];
let graphAnimQueue = [];
let nodeStates = {};
let sourceNode = 0;

const complexities = {
  selection: { best: 'O(n²)',     avg: 'O(n²)',       worst: 'O(n²)',     space: 'O(1)' },
  merge:     { best: 'O(n log n)',avg: 'O(n log n)',   worst: 'O(n log n)',space: 'O(n)' },
  quick:     { best: 'O(n log n)',avg: 'O(n log n)',   worst: 'O(n²)',     space: 'O(log n)' },
  bfs:       { best: 'O(V+E)',    avg: 'O(V+E)',       worst: 'O(V+E)',    space: 'O(V)' },
  dfs:       { best: 'O(V+E)',    avg: 'O(V+E)',       worst: 'O(V+E)',    space: 'O(V)' },
  dijkstra:  { best: 'O(E log V)',avg: 'O(E log V)',   worst: 'O(E log V)',space: 'O(V)' },
};

const algoTitles = {
  selection: 'Selection <span>Sort</span>',
  merge: 'Merge <span>Sort</span>',
  quick: 'Quick <span>Sort</span>',
  bfs: 'Breadth-First <span>Search</span>',
  dfs: 'Depth-First <span>Search</span>',
  dijkstra: "Dijkstra's <span>Shortest Path</span>",
};
