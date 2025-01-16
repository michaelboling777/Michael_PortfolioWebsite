import React, { useState, useEffect } from 'react';



const QuickSort = () => {
    // State for managing the array and visualization
  const [array, setArray] = useState([]); // Current array being sorted
  const [isRunning, setIsRunning] = useState(false); //Controls if sort is in progress
  const [pivotIndex, setPivotIndex] = useState(null); //Tracks current pivot element
  const [sortedIndices, setSortedIndices] = useState(new Set()); //Tracks completed elements
  const [leftIndex, setLeftIndex] = useState(null); //Left pointer position
  const [rightIndex, setRightIndex] = useState(null); //Right pointer position
  const [isMobile, setIsMobile] = useState(false); //Tracks viewport size
  
    // Handle responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


   /**
   * Generates a new random array based on viewport size
   * Mobile gets 8 elements, desktop gets 12
   */
  const generateRandomArray = () => {
    const length = isMobile ? 8 : 12;
    const newArray = Array.from({ length }, () => 
      Math.floor(Math.random() * 50) + 1
    );
    setArray(newArray);
    setSortedIndices(new Set());
    setPivotIndex(null);
    setLeftIndex(null);
    setRightIndex(null);
  };

  // Generate initial array when mobile state changes
  useEffect(() => {
    generateRandomArray();
  }, [isMobile]);

    // Utility function for adding delays in visualization
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const partition = async (arr, start, end, updateSortedIndices) => {
    const pivot = arr[start];
    setPivotIndex(start);
    await sleep(500);
    
    let left = start + 1;
    let right = end;

    // Main partitioning loop
    while (left <= right) {
      setLeftIndex(left);
      setRightIndex(right);
      await sleep(300);

    // Move left pointer until we find an element greater than pivot
      while (left <= right && arr[left] <= pivot) {
        left++;
        setLeftIndex(left);
        await sleep(300);
      }

    // Move right pointer until we find an element less than pivot
      while (left <= right && arr[right] > pivot) {
        right--;
        setRightIndex(right);
        await sleep(300);
      }

    // Swap elements if pointers haven't crossed
      if (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        setArray([...arr]);
        await sleep(500);
      }
    }

  // Place pivot in its final position
    [arr[start], arr[right]] = [arr[right], arr[start]];
    setArray([...arr]);
    setPivotIndex(null);
    updateSortedIndices(right);
    await sleep(500);

    setLeftIndex(null);
    setRightIndex(null);

    return right;
  };

  const quickSortHelper = async (arr, low, high, updateSortedIndices) => {
    // Base case: single element or empty subarray
    if (high - low <= 0) {
      if (low >= 0 && low < arr.length) { // Ensure index is valid
        updateSortedIndices(low);
        await sleep(300); // Add slight delay to make it visible
      }
      return;
    }
    
    // Get pivot position after partitioning
    const pivotPos = await partition(arr, low, high, updateSortedIndices);
    
    // Recursively sort left partition
    if (low < pivotPos) {
      await quickSortHelper(arr, low, pivotPos - 1, updateSortedIndices);
    }
    
    // then recursively sort right partition
    if (pivotPos + 1 <= high) {
      await sleep(500); // Add delay between processing sides
      await quickSortHelper(arr, pivotPos + 1, high, updateSortedIndices);
    }
  };

  const startSorting = async () => {
    setIsRunning(true);
    // Store  indices in a variable that persists throughout the sorting so doesnt get lsot
    let currentSortedIndices = new Set();
    setSortedIndices(currentSortedIndices);
    setPivotIndex(null);
    setLeftIndex(null);
    setRightIndex(null);
    
    const updateSortedIndices = (newIndex) => {
      currentSortedIndices = new Set([...currentSortedIndices, newIndex]);
      setSortedIndices(currentSortedIndices);
    };
    
    try {
      const arrCopy = [...array];
      await quickSortHelper(arrCopy, 0, arrCopy.length - 1, updateSortedIndices);
    } catch (error) {
      console.error('Sorting error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getElementColor = (index) => {
    if (index === pivotIndex) return 'bg-green-500';
    if (index === leftIndex || index === rightIndex) return 'bg-yellow-400';
    if (sortedIndices.has(index)) return 'bg-purple-500';
    return 'bg-slate-400';
  };

  const ArrayElement = ({ value, idx }) => {
    if (isMobile) {
      return (
        <div className={`${getElementColor(idx)} rounded-md mb-2 p-2 flex justify-between items-center text-gray-900`}>
          <span className="font-medium">Index {idx}:</span>
          <span className="font-medium">{value}</span>
        </div>
      );
    }
    
    return (
      <div className={`w-16 h-16 ${getElementColor(idx)} rounded-md flex items-center justify-center transition-all duration-300`}>
        <span className="text-lg font-medium text-gray-900">{value}</span>
      </div>
    );
  };

  // Main component render
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      {/* Array visualization container */}
      <div className={`${isMobile ? 'flex flex-col px-4' : 'flex flex-wrap items-center justify-center gap-2'} mb-6`}>
        {array.map((value, idx) => (
          <ArrayElement key={idx} value={value} idx={idx} />
        ))}
      </div>

      {/* Control buttons */}
      <div className={`flex ${isMobile ? 'flex-col gap-2 px-4' : 'justify-center gap-4'}`}>
        <button
          onClick={startSorting}
          className={`${isMobile ? 'w-full' : 'px-6'} py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
          disabled={isRunning}
        >
          Start QuickSort
        </button>
        <button
          onClick={generateRandomArray}
          className={`${isMobile ? 'w-full' : 'px-6'} py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
          disabled={isRunning}
        >
          Generate New Array
        </button>
      </div>

      {/* Legend */}
      <div className={`mt-4 ${isMobile ? 'flex flex-col gap-2 px-4' : 'flex justify-center gap-6'}`}>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Current Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">Pointers</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="text-gray-700 dark:text-gray-300">In Final Position</span>
        </div>
      </div>
    </div>
  );
};

export default QuickSort;