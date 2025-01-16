// Core configuration for animations and array generation
const ANIMATION_DURATION = 300;
const ARRAY_SIZE = 12;
const MAX_VALUE = 50;

// Creates a delay for animation timing
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generates an array of random integers between 1 and MAX_VALUE
export const generateRandomArray = (size = ARRAY_SIZE) => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * MAX_VALUE) + 1
  );
};

// Partitions array around pivot for quicksort implementation
export const partition = async (array, low, high, updateArray) => {
  const pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      await sleep(ANIMATION_DURATION);
      updateArray([...array]);
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  await sleep(ANIMATION_DURATION);
  updateArray([...array]);

  return i + 1;
};

// Recursive quicksort implementation with animation support
export const quickSort = async (array, low, high, updateArray) => {
  if (low < high) {
    const pi = await partition(array, low, high, updateArray);
    await Promise.all([
      quickSort(array, low, pi - 1, updateArray),
      quickSort(array, pi + 1, high, updateArray)
    ]);
  }
  return array;
};

// Linear search with visualization callbacks
export const linearSearch = async (array, target, onVisit, onFound) => {
  for (let i = 0; i < array.length; i++) {
    await sleep(ANIMATION_DURATION);
    onVisit(i);
    if (array[i] === target) {
      onFound(i);
      return i;
    }
  }
  return -1;
};

// Binary search with visualization callbacks
export const binarySearch = async (array, target, onVisit, onFound) => {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    await sleep(ANIMATION_DURATION);
    onVisit(mid);

    if (array[mid] === target) {
      onFound(mid);
      return mid;
    }

    if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};

// Sets up initial state for Dijkstra's algorithm
export const initializeDijkstra = (graph, startNode) => {
  const distances = {};
  const previous = {};
  const unvisited = new Set();

  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(parseInt(node));
  });

  distances[startNode] = 0;

  return { distances, previous, unvisited };
};


// Finds the next unvisited node with minimum distance
export const getNextNode = (distances, unvisited) => {
  let minDistance = Infinity;
  let nextNode = null;

  unvisited.forEach(node => {
    if (distances[node] < minDistance) {
      minDistance = distances[node];
      nextNode = node;
    }
  });

  return nextNode;
};

// Performs one iteration of Dijkstra's algorithm
export const dijkstraStep = (
  graph,
  currentNode,
  distances,
  previous,
  unvisited,
  visited
) => {
  const newVisited = new Set(visited);
  const newUnvisited = new Set(unvisited);
  const newDistances = { ...distances };
  const newPrevious = { ...previous };

  newVisited.add(currentNode);
  newUnvisited.delete(currentNode);

  Object.entries(graph[currentNode]).forEach(([neighbor, weight]) => {
    if (!newVisited.has(parseInt(neighbor))) {
      const newDistance = newDistances[currentNode] + weight;
      if (newDistance < newDistances[neighbor]) {
        newDistances[neighbor] = newDistance;
        newPrevious[neighbor] = currentNode;
      }
    }
  });

  const nextNode = getNextNode(newDistances, newUnvisited);

  return {
    distances: newDistances,
    previous: newPrevious,
    unvisited: newUnvisited,
    visited: newVisited,
    nextNode
  };
};