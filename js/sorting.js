// sorting.js — sorting algorithms + their playback

// =====================================================
// SORTING ALGORITHMS
// =====================================================
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      animationQueue.push({
        type: 'compare', arr: [...arr],
        highlights: [{idx: minIdx, cls: 'active'}, {idx: j, cls: 'comparing'}],
        msg: `Comparing index ${j} (${arr[j]}) with current min at ${minIdx} (${arr[minIdx]})`
      });
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      swaps++;
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      animationQueue.push({
        type: 'swap', arr: [...arr],
        highlights: [{idx: i, cls: 'active'}, {idx: minIdx, cls: 'comparing'}],
        msg: `Swapping ${arr[minIdx]} → position ${i}`
      });
    }
    animationQueue.push({
      type: 'sorted', arr: [...arr],
      sortedUpTo: i,
      msg: `Position ${i} is now sorted with value ${arr[i]}`
    });
  }
  animationQueue.push({
    type: 'done', arr: [...arr],
    msg: `✓ Array sorted! ${comparisons} comparisons, ${swaps} swaps`
  });
}

function mergeSort(arr, l, r) {
  if (l >= r) return;
  const mid = Math.floor((l + r) / 2);
  mergeSort(arr, l, mid);
  mergeSort(arr, mid + 1, r);
  merge(arr, l, mid, r);
}

function merge(arr, l, mid, r) {
  const left = arr.slice(l, mid + 1);
  const right = arr.slice(mid + 1, r + 1);
  let i = 0, j = 0, k = l;

  while (i < left.length && j < right.length) {
    comparisons++;
    animationQueue.push({
      type: 'compare', arr: [...arr],
      highlights: [{idx: l + i, cls: 'comparing'}, {idx: mid + 1 + j, cls: 'active'}],
      msg: `Merging: comparing ${left[i]} and ${right[j]}`
    });
    if (left[i] <= right[j]) { arr[k++] = left[i++]; }
    else { arr[k++] = right[j++]; swaps++; }
    animationQueue.push({
      type: 'place', arr: [...arr],
      highlights: [{idx: k - 1, cls: 'active'}],
      msg: `Placed ${arr[k-1]} at position ${k-1}`
    });
  }
  while (i < left.length) { arr[k++] = left[i++]; }
  while (j < right.length) { arr[k++] = right[j++]; }

  animationQueue.push({
    type: 'merge_done', arr: [...arr],
    highlights: Array.from({length: r - l + 1}, (_, idx) => ({idx: l + idx, cls: 'sorted'})),
    msg: `Merged segment [${l}..${r}]`
  });
}

function quickSort(arr, low, high) {
  if (low >= high) return;
  const pivot = arr[high];
  animationQueue.push({
    type: 'pivot', arr: [...arr],
    highlights: [{idx: high, cls: 'pivot'}],
    msg: `Pivot selected: ${pivot} at index ${high}`
  });
  let i = low - 1;
  for (let j = low; j < high; j++) {
    comparisons++;
    animationQueue.push({
      type: 'compare', arr: [...arr],
      highlights: [{idx: high, cls: 'pivot'}, {idx: j, cls: 'comparing'}],
      msg: `Comparing ${arr[j]} with pivot ${pivot}`
    });
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      swaps++;
      animationQueue.push({
        type: 'swap', arr: [...arr],
        highlights: [{idx: high, cls: 'pivot'}, {idx: i, cls: 'active'}, {idx: j, cls: 'comparing'}],
        msg: `Swapped ${arr[j]} and ${arr[i]}`
      });
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  const pi = i + 1;
  animationQueue.push({
    type: 'place', arr: [...arr],
    highlights: [{idx: pi, cls: 'sorted'}],
    msg: `Pivot ${arr[pi]} placed at final position ${pi}`
  });
  quickSort(arr, low, pi - 1);
  quickSort(arr, pi + 1, high);
}

// =====================================================
// SORT PLAYBACK
// =====================================================
function playSort() {
  if (animationQueue.length === 0) {
    setStatus('done');
    stopTimer();
    setStep('✓ Sorting complete!');
    const sortedArr = [...array].sort((a, b) => a - b); // final sorted state
    renderBars(sortedArr, sortedArr.map((_, i) => ({idx: i, cls: 'sorted'})));
    showOutputArray(sortedArr);
    isRunning = false;
    document.getElementById('play-btn').disabled = false;
    return;
  }

  const frame = animationQueue.shift();
  steps++;
  updateStats();
  setStep(frame.msg || '');

  if (frame.type === 'done') {
    const finalArr = frame.arr;
    renderBars(finalArr, finalArr.map((_, i) => ({idx: i, cls: 'sorted'})));
    showOutputArray(finalArr);
    setStatus('done');
    stopTimer();
    isRunning = false;
    document.getElementById('play-btn').disabled = false;
    return;
  }

  const highlights = frame.highlights || [];
  if (frame.type === 'sorted') {
    const sortedHighlights = Array.from({length: frame.sortedUpTo + 1}, (_, i) => ({idx: i, cls: 'sorted'}));
    renderBars(frame.arr, sortedHighlights);
  } else if (frame.type === 'merge_done') {
    renderBars(frame.arr, frame.highlights);
  } else {
    renderBars(frame.arr, highlights);
  }

  animTimeout = setTimeout(playSort, speedMs);
}
