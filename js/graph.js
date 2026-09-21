// graph.js — graph setup, BFS/DFS/Dijkstra, canvas drawing, playback

// =====================================================
// GRAPH SETUP
// =====================================================
const NODE_LABELS = ['A','B','C','D','E','F','G'];

function generateNewGraph() {
  resetVisualization();
  const canvas = document.getElementById('graph-canvas');
  const W = canvas.offsetWidth || 700;
  const H = canvas.offsetHeight || 360;
  const cx = W / 2, cy = H / 2;
  const r = Math.min(W, H) * 0.35;

  graphNodes = NODE_LABELS.map((label, i) => {
    const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return {
      id: i,
      label,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  });

  // Generate connected graph
  graphEdges = [];
  const adj = Array.from({length: 7}, () => []);

  // Ensure connectivity first (spanning tree)
  const shuffled = [...Array(7).keys()].sort(() => Math.random() - 0.5);
  for (let i = 1; i < shuffled.length; i++) {
    const u = shuffled[i - 1], v = shuffled[i];
    const w = Math.floor(Math.random() * 9) + 1;
    graphEdges.push({u, v, w});
    adj[u].push(v); adj[v].push(u);
  }

  // Add random extra edges
  const extraEdges = Math.floor(Math.random() * 4) + 3;
  for (let e = 0; e < extraEdges; e++) {
    const u = Math.floor(Math.random() * 7);
    const v = Math.floor(Math.random() * 7);
    if (u !== v && !adj[u].includes(v)) {
      const w = Math.floor(Math.random() * 9) + 1;
      graphEdges.push({u, v, w});
      adj[u].push(v); adj[v].push(u);
    }
  }

  nodeStates = {};
  graphNodes.forEach((_, i) => nodeStates[i] = 'unvisited');
  drawGraph();
}

function buildAdj(weighted = false) {
  const adj = Array.from({length: graphNodes.length}, () => []);
  graphEdges.forEach(e => {
    if (weighted) {
      adj[e.u].push({node: e.v, weight: e.w});
      adj[e.v].push({node: e.u, weight: e.w});
    } else {
      adj[e.u].push(e.v);
      adj[e.v].push(e.u);
    }
  });
  return adj;
}

// =====================================================
// GRAPH ALGORITHMS  (fully fixed — cumulative state tracking)
// =====================================================
function bfs(start) {
  const adj = buildAdj();
  const visited = new Array(graphNodes.length).fill(false);
  const queue = [start];
  visited[start] = true;

  // We track ALL node states in one object and clone it each frame
  const ns = {};
  graphNodes.forEach((_, i) => { ns[i] = 'unvisited'; });
  ns[start] = 'source';

  const edgeStates = {};

  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {},
    msg: `BFS starting from node ${NODE_LABELS[start]}. Queue: [${NODE_LABELS[start]}]`
  });

  while (queue.length > 0) {
    const u = queue.shift();
    comparisons++;

    ns[u] = u === start ? 'source' : 'visiting';
    graphAnimQueue.push({
      nodeOverride: {...ns},
      edges: {...edgeStates},
      msg: `Visiting node ${NODE_LABELS[u]}. Queue: [${queue.map(n => NODE_LABELS[n]).join(', ')}]`
    });

    for (const v of adj[u]) {
      comparisons++;
      if (!visited[v]) {
        visited[v] = true;
        queue.push(v);
        edgeStates[`${Math.min(u,v)}-${Math.max(u,v)}`] = 'active';
        ns[v] = 'visiting';
        graphAnimQueue.push({
          nodeOverride: {...ns},
          edges: {...edgeStates},
          msg: `Discovered node ${NODE_LABELS[v]} from ${NODE_LABELS[u]}. Queue: [${queue.map(n => NODE_LABELS[n]).join(', ')}]`
        });
      }
    }

    ns[u] = u === start ? 'source' : 'visited';
    graphAnimQueue.push({
      nodeOverride: {...ns},
      edges: {...edgeStates},
      msg: `Finished node ${NODE_LABELS[u]}, marked as visited.`
    });
  }

  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {...edgeStates},
    msg: `✓ BFS complete! All ${graphNodes.filter((_, i) => ns[i] !== 'unvisited').length} reachable nodes visited.`
  });
}

function dfsAlgo(start) {
  const adj = buildAdj();
  const visited = new Array(graphNodes.length).fill(false);
  const edgeStates = {};

  // Cumulative node state object
  const ns = {};
  graphNodes.forEach((_, i) => { ns[i] = 'unvisited'; });
  ns[start] = 'source';

  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {},
    msg: `DFS starting from node ${NODE_LABELS[start]}`
  });

  function dfsHelper(u) {
    visited[u] = true;
    comparisons++;
    ns[u] = u === start ? 'source' : 'visiting';

    graphAnimQueue.push({
      nodeOverride: {...ns},
      edges: {...edgeStates},
      msg: `DFS visiting node ${NODE_LABELS[u]}`
    });

    for (const v of adj[u]) {
      if (!visited[v]) {
        edgeStates[`${Math.min(u,v)}-${Math.max(u,v)}`] = 'active';
        graphAnimQueue.push({
          nodeOverride: {...ns},
          edges: {...edgeStates},
          msg: `Exploring edge ${NODE_LABELS[u]} → ${NODE_LABELS[v]}`
        });
        dfsHelper(v);
      }
    }

    ns[u] = u === start ? 'source' : 'visited';
    graphAnimQueue.push({
      nodeOverride: {...ns},
      edges: {...edgeStates},
      msg: `Backtracking from ${NODE_LABELS[u]}`
    });
  }

  dfsHelper(start);
  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {...edgeStates},
    msg: `✓ DFS complete! All reachable nodes explored.`
  });
}

function dijkstraAlgo(start) {
  const adj = buildAdj(true);
  const n = graphNodes.length;
  const dist = new Array(n).fill(Infinity);
  const prev = new Array(n).fill(-1);
  const visited = new Array(n).fill(false);
  dist[start] = 0;

  const edgeStates = {};
  const ns = {};
  graphNodes.forEach((_, i) => { ns[i] = 'unvisited'; });
  ns[start] = 'source';

  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {},
    msg: `Dijkstra from ${NODE_LABELS[start]}. dist[${NODE_LABELS[start]}]=0, all others=∞`
  });

  for (let iter = 0; iter < n; iter++) {
    // Find unvisited node with smallest distance
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!visited[i] && dist[i] < Infinity) {
        if (u === -1 || dist[i] < dist[u]) u = i;
      }
    }
    if (u === -1) break;

    visited[u] = true;
    comparisons++;
    ns[u] = u === start ? 'source' : 'visiting';

    graphAnimQueue.push({
      nodeOverride: {...ns},
      edges: {...edgeStates},
      msg: `Processing ${NODE_LABELS[u]} (shortest dist = ${dist[u]})`
    });

    for (const {node: v, weight: w} of adj[u]) {
      comparisons++;
      if (!visited[v] && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        prev[v] = u;
        edgeStates[`${Math.min(u,v)}-${Math.max(u,v)}`] = 'active';
        ns[v] = 'visiting';
        graphAnimQueue.push({
          nodeOverride: {...ns},
          edges: {...edgeStates},
          msg: `Relaxed edge to ${NODE_LABELS[v]}: new dist = ${dist[v]} (via ${NODE_LABELS[u]} + ${w})`
        });
      }
    }

    ns[u] = u === start ? 'source' : 'visited';
  }

  // Highlight final shortest path tree
  for (let v = 0; v < n; v++) {
    if (prev[v] !== -1) {
      const u = prev[v];
      edgeStates[`${Math.min(u,v)}-${Math.max(u,v)}`] = 'path';
      if (ns[v] !== 'source') ns[v] = 'path';
    }
  }

  const distStr = graphNodes.map((_, i) => `${NODE_LABELS[i]}:${dist[i] === Infinity ? '∞' : dist[i]}`).join(' ');
  graphAnimQueue.push({
    nodeOverride: {...ns},
    edges: {...edgeStates},
    msg: `✓ Dijkstra complete! Distances — ${distStr}`
  });
}

// =====================================================
// GRAPH DRAWING
// =====================================================
function drawGraph(nodeOverride, edgeStates) {
  const canvas = document.getElementById('graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 700;
  const H = canvas.offsetHeight || 360;
  canvas.width = W;
  canvas.height = H;

  ctx.clearRect(0, 0, W, H);

  const nodeColors = {
    unvisited: '#1e2940',
    visiting:  '#00f5c4',
    visited:   '#7c3aed',
    source:    '#f59e0b',
    path:      '#10b981',
  };

  const edgeColors = {
    default: '#2a2a3a',
    active:  '#00f5c4',
    path:    '#10b981',
  };

  // Draw edges
  graphEdges.forEach(({ u, v, w }) => {
    const key = `${Math.min(u,v)}-${Math.max(u,v)}`;
    const state = (edgeStates && edgeStates[key]) || 'default';
    const n1 = graphNodes[u], n2 = graphNodes[v];
    const color = edgeColors[state] || edgeColors.default;

    ctx.beginPath();
    ctx.moveTo(n1.x, n1.y);
    ctx.lineTo(n2.x, n2.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = state === 'path' ? 3 : state === 'active' ? 2.5 : 1.5;
    ctx.shadowColor = state !== 'default' ? color : 'transparent';
    ctx.shadowBlur = state !== 'default' ? 8 : 0;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Weight label background
    const mx = (n1.x + n2.x) / 2, my = (n1.y + n2.y) / 2;
    ctx.beginPath();
    ctx.arc(mx, my, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a0f';
    ctx.fill();
    ctx.strokeStyle = state !== 'default' ? color : '#2a2a3a';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = state === 'default' ? '#64748b' : color;
    ctx.font = 'bold 11px JetBrains Mono, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(w, mx, my);
  });

  // Draw nodes
  graphNodes.forEach((node, i) => {
    const state = (nodeOverride && nodeOverride[i] !== undefined)
      ? nodeOverride[i]
      : (nodeStates[i] || 'unvisited');
    const color = nodeColors[state] || nodeColors.unvisited;

    // Glow
    if (state !== 'unvisited') {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 26, 0, Math.PI * 2);
      ctx.fillStyle = color + '33';
      ctx.fill();
    }

    // Fill
    ctx.beginPath();
    ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.shadowColor = state !== 'unvisited' ? color : 'transparent';
    ctx.shadowBlur = state !== 'unvisited' ? 14 : 0;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Border
    ctx.beginPath();
    ctx.arc(node.x, node.y, 22, 0, Math.PI * 2);
    ctx.strokeStyle = state === 'unvisited' ? '#334155' : color;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.fillStyle = (state === 'visiting' || state === 'source') ? '#0a0a0f' : '#e2e8f0';
    ctx.font = 'bold 14px Syne, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node.label, node.x, node.y);
  });
}

// =====================================================
// GRAPH PLAYBACK
// =====================================================
function playGraph() {
  if (graphAnimQueue.length === 0) {
    setStatus('done');
    stopTimer();
    setStep('✓ Algorithm complete!');
    isRunning = false;
    document.getElementById('play-btn').disabled = false;
    return;
  }

  const frame = graphAnimQueue.shift();
  steps++;
  updateStats();
  setStep(frame.msg || '');
  drawGraph(frame.nodeOverride, frame.edges);

  animTimeout = setTimeout(playGraph, speedMs * 2);
}
