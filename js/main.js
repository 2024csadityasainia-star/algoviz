// main.js — button wiring and startup (load last)

// =====================================================
// INIT
// =====================================================
function init() {
  generateNewArray();   // also calls showInputArray internally
  generateNewGraph();
}

// =====================================================
// BOOTSTRAP — wire up all buttons
// =====================================================
document.querySelectorAll('#algo-list-sort .algo-btn').forEach((btn, i) => {
  const algos = ['selection', 'merge', 'quick'];
  btn.onclick = function() {
    document.querySelectorAll('#algo-list-sort .algo-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentAlgo = algos[i];
    updateComplexity(algos[i]);
    document.getElementById('algo-title').innerHTML = algoTitles[algos[i]];
    resetVisualization();
  };
});

document.querySelectorAll('#algo-list-graph .algo-btn').forEach((btn, i) => {
  const algos = ['bfs', 'dfs', 'dijkstra'];
  btn.onclick = function() {
    document.querySelectorAll('#algo-list-graph .algo-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentAlgo = algos[i];
    updateComplexity(algos[i]);
    document.getElementById('algo-title').innerHTML = algoTitles[algos[i]];
    resetVisualization();
  };
});

updateSpeed(5);
init();
