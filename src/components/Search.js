import React, { useState, useEffect } from 'react';

const Search = () => {
    // State management for the game grid and search process
  const [grid, setGrid] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [visitedCells, setVisitedCells] = useState(new Set());
  const [foundShips, setFoundShips] = useState(new Set());
  // Game configuration constants
  const gridSize = 25; // Total number of cells in the grid
  const numShips = 3; //Number of ships to place on the grid

  // Initialize the game grid when component mounts
  useEffect(() => {
    initializeGrid();
  }, []);


   /**
   * Creates a new game grid with randomly placed ships
   * Resets all game state (search history, visited cells, found ships)
   */
  const initializeGrid = () => {
    const newGrid = Array(gridSize).fill(false);
    // Randomly place ships, ensuring no overlap
    for (let i = 0; i < numShips; i++) {
      let position;
      do {
        position = Math.floor(Math.random() * gridSize);
      } while (newGrid[position]);
      newGrid[position] = true;
    }
    setGrid(newGrid);
    setSearchHistory([]);
    setVisitedCells(new Set());
    setFoundShips(new Set());
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  /**
   * Adds a new message to the search history log
   * @param {string} message - Message to display
   * @param {string} type - Message type for styling ('info', 'success', or 'complete')
   */

  const addToHistory = (message, type = 'info') => {
    setSearchHistory(prev => [...prev, { message, type }]);
  };

   /**
   * Performs a linear search through the grid
   * Searches cells sequentially from left to right until all ships are found
   */
  const linearSearch = async () => {
    if (isSearching) return;
    setIsSearching(true);
    setSearchHistory([]);
    setVisitedCells(new Set());
    setFoundShips(new Set());

    let found = 0;
    // Search each cell until all ships are found
    for (let i = 0; i < gridSize && found < numShips; i++) {
      setVisitedCells(prev => new Set([...prev, i]));

      if (grid[i]) {
        found++;
        setFoundShips(prev => new Set([...prev, i]));
        addToHistory(`Found ship ${found} of ${numShips} at position ${i}!`, 'success');
        await sleep(500);
      }
      await sleep(100);
    }

    addToHistory('Linear search completed!', 'complete');
    setIsSearching(false);
  };

  const binarySearch = async () => {
    // Prevent multiple simultaneous searches
    if (isSearching) return;

    // Reset all search-related states
    setIsSearching(true);
    setSearchHistory([]);
    setVisitedCells(new Set());
    setFoundShips(new Set());


    // Find the index of the first ship in the grid
    // This becomes our target value for the binary search
    const target = grid.findIndex(cell => cell);

    // Initialize search boundaries
    let left = 0;
    let right = gridSize - 1;

  // Continue searching while the boundaries haven't crossed
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setVisitedCells(prev => new Set([...prev, mid]));

      if (mid === target) {
        // Ship found at middle position
        setFoundShips(prev => new Set([...prev, mid]));
        addToHistory(`Ship found at position ${mid}!`, 'success');
        break;
      } else if (mid < target) {
        // If middle position is less than target,
        // search in the right half of remaining range
        addToHistory(`Searching higher than position ${mid}...`);
        left = mid + 1;
      } else {
         // If middle position is greater than target,
        // search in the left half of remaining range
        addToHistory(`Searching lower than position ${mid}...`);
        right = mid - 1;
      }
      await sleep(500);
    }

    addToHistory('Binary search completed!', 'complete');
    setIsSearching(false);
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow max-w-4xl mx-auto">
      {/* Main title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Search Algorithm Simulation (Battleship Themed!)
      </h1>
      
      {/* Control buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={linearSearch}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-50 transition-colors duration-200 w-40"
        >
          Linear Search
        </button>
        <button
          onClick={binarySearch}
          disabled={isSearching}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded hover:bg-blue-700 dark:hover:bg-blue-400 disabled:opacity-50 transition-colors duration-200 w-40"
        >
          Binary Search
        </button>
        <button
          onClick={initializeGrid}
          disabled={isSearching}
          className="px-4 py-2 bg-red-600 dark:bg-red-500 text-white rounded hover:bg-red-700 dark:hover:bg-red-400 disabled:opacity-50 transition-colors duration-200 w-40"
        >
          Reset Game
        </button>
      </div>

      {/* Game grid display */}
      <div className="grid grid-cols-5 gap-1 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-md mx-auto">
        {grid.map((isShip, index) => (
          <div
            key={index}
            className={`aspect-square w-full rounded-sm transition-all duration-300 border-2
              ${!visitedCells.has(index) 
                ? 'bg-gray-400 dark:bg-gray-700 border-gray-300 dark:border-gray-600' 
                : foundShips.has(index)
                  ? 'bg-green-500 dark:bg-green-500 border-green-600 dark:border-green-600' 
                  : 'bg-orange-400 dark:bg-orange-500 border-orange-500 dark:border-orange-600'}`}
          />
        ))}
      </div>
      
      {/* Search history log display */}
      <div className="mt-6 space-y-2 max-w-2xl mx-auto">
        {searchHistory.map((entry, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-sm ${
              entry.type === 'success'
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800'
                : entry.type === 'complete'
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-800'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-800'
            }`}
          >
            {entry.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;