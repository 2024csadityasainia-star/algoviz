// ui.js — UI switching, array rendering, stats, run/reset control

// =====================================================
// UI SWITCHES
// =====================================================
function switchType(type) {
  currentType = type;
  document.getElementById('tab-sort').classList.toggle('active', type === 'sort');
  document.getElementById('tab-graph').classList.toggle('active', type === 'graph');
  document.getElementById('algo-list-sort').style.display = type === 'sort' ? 'flex' : 'none';
  document.getElementById('algo-list-graph').style.display = type === 'graph' ? 'flex' : 'none';
  document.getElementById('sort-controls').style.display = type === 'sort' ? 'block' : 'none';
  document.getElementById('graph-controls').style.display = type === 'graph' ? 'block' : 'none';
  document.getElementById('sort-viz').style.display = type === 'sort' ? 'flex' : 'none';
  document.getElementById('graph-canvas').style.display = type === 'graph' ? 'block' : 'none';
  document.getElementById('sort-legend').style.display = type === 'sort' ? 'flex' : 'none';
  document.getElementById('graph-legend').style.display = type === 'graph' ? 'flex' : 'none';
  document.getElementById('gen-btn').textContent = type === 'sort' ? '⚡ RANDOMIZE' : '↻ NEW GRAPH';
  document.getElementById('gen-btn').onclick = type === 'sort' ? generateNewArray : generateNewGraph;

  // Show/hide array IO panel
  if (type === 'sort') {
    document.getElementById('array-output-panel').classList.add('visible');
    showInputArray(array);
    clearOutputArray();
  } else {
    document.getElementById('array-output-panel').classList.remove('visible');
  }

  if (type === 'graph') {
    const firstGraphBtn = document.querySelector('#algo-list-graph .algo-btn');
    selectAlgo('bfs', firstGraphBtn);
  } else {
    const firstSortBtn = document.querySelector('#algo-list-sort .algo-btn');
    selectAlgo('selection', firstSortBtn);
  }

  resetVisualization();
}

function selectAlgo(algo, btn) {
  currentAlgo = algo;
  const listId = currentType === 'sort' ? 'algo-list-sort' : 'algo-list-graph';
  document.querySelectorAll(`#${listId} .algo-btn`).forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  else {
    document.querySelectorAll(`#${listId} .algo-btn`).forEach(b => {
      if (b.textContent.toLowerCase().includes(algo.substring(0,3))) b.classList.add('active');
    });
  }
  updateComplexity(algo);
  document.getElementById('algo-title').innerHTML = algoTitles[algo] || algo;
  resetVisualization();
}

// Handle algo button clicks properly
document.querySelectorAll('.algo-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const text = this.textContent.trim().toLowerCase();
    let algo = 'selection';
    if (text.includes('selection')) algo = 'selection';
    else if (text.includes('merge')) algo = 'merge';
    else if (text.includes('quick')) algo = 'quick';
    else if (text.includes('bfs')) algo = 'bfs';
    else if (text.includes('dfs')) algo = 'dfs';
    else if (text.includes('dijkstra')) algo = 'dijkstra';
    selectAlgo(algo, this);
  });
});

function updateComplexity(algo) {
  const c = complexities[algo] || complexities.selection;
  document.getElementById('c-best').textContent = c.best;
  document.getElementById('c-avg').textContent = c.avg;
  document.getElementById('c-worst').textContent = c.worst;
  document.getElementById('c-space').textContent = c.space;
}

function updateSize(val) {
  document.getElementById('size-val').textContent = val;
  if (!isRunning) generateNewArray();
}

function updateSpeed(val) {
  document.getElementById('speed-val').textContent = val;
  speedMs = Math.max(10, 600 / (val * val * 0.15 + val));
}

// =====================================================
// ARRAY GENERATION & RENDERING
// =====================================================
function generateNewArray() {
  resetVisualization();
  const size = parseInt(document.getElementById('size-slider').value);
  array = Array.from({length: size}, () => Math.floor(Math.random() * 95) + 5);
  renderBars(array, []);
  showInputArray(array);
  clearOutputArray();
}

function applyCustomArray() {
  const input = document.getElementById('custom-array').value;
  const parsed = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0);
  if (parsed.length < 2) { setStep('Invalid input. Enter comma-separated positive numbers.'); return; }
  resetVisualization();
  array = parsed.slice(0, 80);
  document.getElementById('size-slider').value = array.length;
  document.getElementById('size-val').textContent = array.length;
  renderBars(array, []);
  showInputArray(array);
  clearOutputArray();
}

function renderBars(arr, highlights) {
  // highlights: [{idx, cls}]
  const viz = document.getElementById('sort-viz');
  viz.innerHTML = '';
  const maxVal = Math.max(...arr);
  const hMap = {};
  if (highlights) highlights.forEach(h => hMap[h.idx] = h.cls);

  arr.forEach((val, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar ' + (hMap[i] || 'default');
    bar.style.height = `${(val / maxVal) * 280}px`;
    bar.title = val;
    viz.appendChild(bar);
  });
}

function showInputArray(arr) {
  const panel = document.getElementById('array-output-panel');
  panel.classList.add('visible');
  const container = document.getElementById('input-array-display');
  container.innerHTML = '';
  // Show max 60 values to avoid overflow
  const display = arr.slice(0, 60);
  display.forEach(val => {
    const chip = document.createElement('span');
    chip.className = 'array-chip';
    chip.textContent = val;
    container.appendChild(chip);
  });
  if (arr.length > 60) {
    const more = document.createElement('span');
    more.className = 'array-chip';
    more.style.color = 'var(--muted)';
    more.textContent = `+${arr.length - 60} more`;
    container.appendChild(more);
  }
}

function showOutputArray(arr) {
  const container = document.getElementById('output-array-display');
  container.innerHTML = '';
  const display = arr.slice(0, 60);
  display.forEach((val, i) => {
    const chip = document.createElement('span');
    chip.className = 'array-chip output-chip';
    chip.style.animationDelay = `${Math.min(i * 8, 300)}ms`;
    chip.textContent = val;
    container.appendChild(chip);
  });
  if (arr.length > 60) {
    const more = document.createElement('span');
    more.className = 'array-chip output-chip';
    more.textContent = `+${arr.length - 60} more`;
    container.appendChild(more);
  }
}

function clearOutputArray() {
  const container = document.getElementById('output-array-display');
  container.innerHTML = '<span style="font-family:\'JetBrains Mono\',monospace;font-size:11px;color:var(--muted)">Run the algorithm to see the sorted result…</span>';
}

// =====================================================
// STATS
// =====================================================
function resetStats() {
  comparisons = 0; swaps = 0; steps = 0;
  updateStats();
  clearInterval(timerInterval);
  document.getElementById('stat-time').textContent = '0';
}

function updateStats() {
  document.getElementById('stat-comparisons').textContent = comparisons;
  document.getElementById('stat-swaps').textContent = swaps;
  document.getElementById('stat-steps').textContent = steps;
}

function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    document.getElementById('stat-time').textContent = Date.now() - startTime;
  }, 50);
}

function stopTimer() { clearInterval(timerInterval); }

function setStatus(s) {
  const badge = document.getElementById('status-badge');
  const text = document.getElementById('status-text');
  badge.className = 'status-badge ' + s;
  text.textContent = s.toUpperCase();
}

function setStep(msg) {
  document.getElementById('step-text').textContent = msg;
}

// =====================================================
// MAIN CONTROL
// =====================================================
function startVisualization() {
  if (isRunning) return;
  isRunning = true;
  setStatus('running');
  resetStats();
  startTimer();
  document.getElementById('play-btn').disabled = true;

  if (currentType === 'sort') {
    const arr = [...array];
    animationQueue = [];
    if (currentAlgo === 'selection') selectionSort(arr);
    else if (currentAlgo === 'merge') mergeSort(arr, 0, arr.length - 1);
    else if (currentAlgo === 'quick') quickSort(arr, 0, arr.length - 1);
    playSort();
  } else {
    graphAnimQueue = [];
    nodeStates = {};
    graphNodes.forEach((_, i) => nodeStates[i] = 'unvisited');
    sourceNode = parseInt(document.getElementById('source-select').value);
    if (currentAlgo === 'bfs') bfs(sourceNode);
    else if (currentAlgo === 'dfs') dfsAlgo(sourceNode);
    else if (currentAlgo === 'dijkstra') dijkstraAlgo(sourceNode);
    playGraph();
  }
}

function resetVisualization() {
  isRunning = false;
  clearTimeout(animTimeout);
  stopTimer();
  setStatus('idle');
  resetStats();
  setStep('Select an algorithm and press RUN to begin visualization');
  document.getElementById('play-btn').disabled = false;

  if (currentType === 'sort') {
    renderBars(array, []);
    clearOutputArray();
  } else {
    document.getElementById('array-output-panel').classList.remove('visible');
    nodeStates = {};
    graphNodes.forEach((_, i) => nodeStates[i] = 'unvisited');
    drawGraph();
  }
}
