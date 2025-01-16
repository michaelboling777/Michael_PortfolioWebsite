import React, { useState, useEffect } from 'react';

const DijkstraVisualizer = () => {
  // Adjacency list representation of the weighted graph
  const graph = {
    0: {1: 4, 4: 8},
    1: {0: 4, 2: 8},
    2: {1: 8, 3: 7, 8: 2},
    3: {2: 7, 6: 14, 7: 9},
    4: {0: 8, 5: 1},
    5: {4: 1, 6: 2, 8: 6},
    6: {3: 14, 5: 2, 7: 10},
    7: {3: 9, 6: 10},
    8: {2: 2, 5: 6}
  };

  // Core algorithm states
  const [currentNode, setCurrentNode] = useState(null);
  const [distances, setDistances] = useState({});
  const [previous, setPrevious] = useState({});
  const [unvisited, setUnvisited] = useState(new Set());
  const [visited, setVisited] = useState(new Set());
  const [startNode, setStartNode] = useState(0);
  const [history, setHistory] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [containerDimensions, setContainerDimensions] = useState({ width: 500, height: 400 });

  // Calculate node positions based on container size
  const getNodePositions = (containerWidth, containerHeight) => {
    const baseScale = Math.min(containerWidth / 500, containerHeight / 400);
    const offsetX = containerWidth * 0.1;
    const offsetY = containerHeight * 0.1;

    return {
      0: {x: offsetX + 40 * baseScale, y: containerHeight/2},
      1: {x: offsetX + 140 * baseScale, y: offsetY + 50 * baseScale},
      2: {x: offsetX + 240 * baseScale, y: offsetY + 50 * baseScale},
      3: {x: offsetX + 340 * baseScale, y: offsetY + 50 * baseScale},
      4: {x: offsetX + 140 * baseScale, y: containerHeight - offsetY - 50 * baseScale},
      5: {x: offsetX + 240 * baseScale, y: containerHeight - offsetY - 50 * baseScale},
      6: {x: offsetX + 340 * baseScale, y: containerHeight - offsetY - 50 * baseScale},
      7: {x: offsetX + 420 * baseScale, y: containerHeight/2},
      8: {x: offsetX + 240 * baseScale, y: containerHeight/2}
    };
  };

  const [nodePositions, setNodePositions] = useState(getNodePositions(500, 400));

  // Reset algorithm state to initial values
  const initializeDijkstra = () => {
    const newDistances = {};
    const newPrevious = {};
    const newUnvisited = new Set();
    
    Object.keys(graph).forEach(node => {
      newDistances[node] = Infinity;
      newPrevious[node] = null;
      newUnvisited.add(parseInt(node));
    });
    
    newDistances[startNode] = 0;
    
    setDistances(newDistances);
    setPrevious(newPrevious);
    setUnvisited(newUnvisited);
    setVisited(new Set());
    setCurrentNode(startNode);
    setHistory([]);
    setCurrentStep(-1);
  };

  // Find unvisited node with minimum distance
  const getNextNode = () => {
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

    // Execute one step of Dijkstra's algorithm
  const step = () => {
    if (unvisited.size === 0) return;

    const newVisited = new Set(visited);
    newVisited.add(currentNode);
    
    const newUnvisited = new Set(unvisited);
    newUnvisited.delete(currentNode);

    const newDistances = {...distances};
    const newPrevious = {...previous};

    Object.entries(graph[currentNode]).forEach(([neighbor, weight]) => {
      if (!newVisited.has(parseInt(neighbor))) {
        const newDistance = newDistances[currentNode] + weight;
        if (newDistance < newDistances[neighbor]) {
          newDistances[neighbor] = newDistance;
          newPrevious[neighbor] = currentNode;
        }
      }
    });

    const nextNode = getNextNode();
    
    setVisited(newVisited);
    setUnvisited(newUnvisited);
    setDistances(newDistances);
    setPrevious(newPrevious);
    setCurrentNode(nextNode);

    const newState = {
      currentNode: nextNode,
      distances: {...newDistances},
      previous: {...newPrevious},
      unvisited: new Set(newUnvisited),
      visited: new Set(newVisited)
    };
    setHistory(prev => [...prev.slice(0, currentStep + 1), newState]);
    setCurrentStep(prev => prev + 1);
  };

    // Revert to previous algorithm state
  const stepBack = () => {
    if (currentStep > 0) {
      const prevState = history[currentStep - 1];
      setCurrentNode(prevState.currentNode);
      setDistances(prevState.distances);
      setPrevious(prevState.previous);
      setUnvisited(prevState.unvisited);
      setVisited(prevState.visited);
      setCurrentStep(prev => prev - 1);
    }
  };

  // Initialize on start node change
  useEffect(() => {
    initializeDijkstra();
  }, [startNode]);

    // Handle container resizing
  useEffect(() => {
    const updateDimensions = () => {
      const container = document.getElementById('graph-container');
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        setContainerDimensions({ width, height });
        setNodePositions(getNodePositions(width, height));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Dijkstra's Algorithm Visualization
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <button
          onClick={stepBack}
          disabled={currentStep <= 0}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={step}
          disabled={unvisited.size === 0}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Forward
        </button>
        <button
          onClick={initializeDijkstra}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
        >
          Reset
        </button>
        <select
          value={startNode}
          onChange={(e) => setStartNode(parseInt(e.target.value))}
          className="px-4 py-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          {Object.keys(graph).map(node => (
            <option key={node} value={node}>Node {node}</option>
          ))}
        </select>
      </div>

      <div 
        id="graph-container"
        className="relative w-full aspect-[4/3] border-2 rounded mb-4 overflow-hidden bg-gray-50 dark:bg-gray-900 dark:border-gray-500 shadow-lg"
      >
        {/* Render graph edges */}
        {Object.entries(graph).map(([from, edges]) =>
          Object.entries(edges).map(([to, weight]) => {
            const fromPos = nodePositions[from];
            const toPos = nodePositions[to];
            const length = Math.sqrt(
              Math.pow(toPos.x - fromPos.x, 2) + 
              Math.pow(toPos.y - fromPos.y, 2)
            );
            const angle = Math.atan2(
              toPos.y - fromPos.y,
              toPos.x - fromPos.x
            ) * 180 / Math.PI;

            return (
              <React.Fragment key={`${from}-${to}`}>
                <div
                  className="absolute h-1 bg-gray-400 dark:bg-blue-400 origin-left"
                  style={{
                    width: `${length}px`,
                    left: `${fromPos.x}px`,
                    top: `${fromPos.y}px`,
                    transform: `rotate(${angle}deg)`
                  }}
                />
                <div
                  className="absolute bg-white dark:bg-gray-700 px-2 py-1 rounded text-xs font-medium text-gray-900 dark:text-gray-100 shadow-md border dark:border-gray-600"
                  style={{
                    left: `${fromPos.x + (toPos.x - fromPos.x)/2}px`,
                    top: `${fromPos.y + (toPos.y - fromPos.y)/2}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {weight}
                </div>
              </React.Fragment>
            );
          })
        )}

         {/* Render graph nodes */}
        {Object.entries(nodePositions).map(([node, pos]) => (
          <div
            key={node}
            className={`absolute w-12 h-12 rounded-full flex flex-col items-center justify-center transition-all transform -translate-x-1/2 -translate-y-1/2
              ${visited.has(parseInt(node)) 
                ? 'bg-purple-500 text-white border-purple-400 shadow-lg' 
                : 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white border-gray-900 dark:border-gray-400 shadow-md'}
              ${currentNode === parseInt(node) 
                ? 'border-4 border-orange-500 scale-110 shadow-lg' 
                : 'border-2'}`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`
            }}
          >
            <div className="text-sm font-bold">{node}</div>
            <div className="text-xs">
              {distances[node] === Infinity ? '∞' : distances[node]}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-2 dark:border-gray-500 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-left font-semibold text-gray-900 dark:text-gray-100">Node</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-left">Distance</th>
              <th className="border p-2 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 text-left">Previous</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(distances).sort((a, b) => a - b).map(node => (
              <tr key={node} className="dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="border p-2 dark:border-gray-600">{node}</td>
                <td className="border p-2 dark:border-gray-600">
                  {distances[node] === Infinity ? '∞' : distances[node]}
                </td>
                <td className="border p-2 dark:border-gray-600">
                  {previous[node] === null ? '-' : previous[node]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DijkstraVisualizer;