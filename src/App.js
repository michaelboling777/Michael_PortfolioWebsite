import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Search from './components/Search';
import Navigation from './components/Navigation'; 
import QuickSort from './components/QuickSort';
import DijkstraVisualizer from './components/DijkstraVisualizer';
import './App.css';
import { initGA, logPageView } from './utils/analytics';
import SchoolProjects  from './pages/SchoolProjects';






// Renders a formatted description of an algorithm with title and paragraphs
const AlgorithmDescription = ({ algorithms, single = false }) => {
  if (single) {
    // For QuickSort and Dijkstra sections that only have one description
    return (
      <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
            {algorithms.title} Description
          </h3>
        </div>
        <div className="prose dark:prose-invert max-w-none space-y-4">
          {algorithms.description.split('\n').map((paragraph, index) => (
            <p 
              key={index}
              className="text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide"
            >
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // For the search section with dual descriptions
  return (
    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left side - Binary Search */}
        <div className="border-r border-gray-200 dark:border-gray-700 pr-4">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {algorithms.binary.title} Description
            </h3>
          </div>
          <div className="prose dark:prose-invert max-w-none space-y-4">
            {algorithms.binary.description.split('\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* Right side - Linear Search */}
        <div className="pl-4">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              {algorithms.linear.title} Description
            </h3>
          </div>
          <div className="prose dark:prose-invert max-w-none space-y-4">
            {algorithms.linear.description.split('\n').map((paragraph, index) => (
              <p 
                key={index}
                className="text-gray-700 dark:text-gray-300 leading-relaxed tracking-wide"
              >
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// Custom hook to manage dark mode state with localStorage persistence
const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : true;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return [darkMode, setDarkMode];
};




// Configuration object containing detailed information about each algorithm
const algorithmsContent = {
  search: {
    binary: {
      title: "Binary Search",
      description: `Binary search is an efficient algorithm for finding an element in a sorted array.

      Implementation Details:
      • Initialize left pointer to A[0] and right pointer to A[size()-1]
      • Calculate midpoint as floor((left + right) / 2)
      • Compare target value with A[mid]:
        - If target > A[mid]: Update left to mid + 1
        - If target < A[mid]: Update right to mid - 1
        - If target = A[mid]: Element found at position mid
      
      Time Complexity: O(log n)
      Space Complexity: O(1)`
    },
    linear: {
      title: "Linear Search",
      description: `Linear search is a simple searching algorithm that checks each element in sequence.

      Implementation Details:
      • Start from the leftmost element
      • Compare each element with the target value
      • If element matches, return its index
      • If element not found, return -1
      • Process continues until match found or end of array reached
      
      Time Complexity: O(n)
      Space Complexity: O(1)`
    }
  },
  quickSort: {
    title: "QuickSort",
    description: `QuickSort is a highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy.
  
    Implementation Details:
    • Select first element as pivot
    • Partition array using two pointers:
      - Move elements ≤ pivot to left side
      - Move elements > pivot to right side
    • Process left subarray first, then right
    • Elements are marked sorted when in final position or in subarrays of size ≤ 1
      
  
    Time Complexity: O(n log n) average case
    Space Complexity: O(log n) due to recursion`
  },
  dijkstra: {
    title: "Dijkstra's Algorithm",
    description: `Dijkstra's algorithm finds the shortest path between nodes in a weighted graph.

    Implementation Details:
    • Initialize distances to all vertices as infinite except the source
    • Maintain a set of unvisited vertices
    • For each step:
      - Select vertex with minimum distance
      - Update distances to all adjacent vertices
      - Mark vertex as visited
    
    Time Complexity: O((V + E) log V) with priority queue
    Space Complexity: O(V)
    
    Best used for: Finding shortest paths in networks, GPS systems, and network routing protocols.`
  }
};




// Main component for the algorithms page that displays various algorithm visualizations
const AlgorithmsApp = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} isLandingPage={false} />

      <main className="container mx-auto pt-20 md:pt-24 px-4 pb-8">
        <div className="flex flex-col gap-8">
          {/* Search section */}
          <div className="w-full min-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <Search />
            <AlgorithmDescription algorithms={algorithmsContent.search} />
          </div>
          
          {/* QuickSort section */}
          <div className="w-full min-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
            <QuickSort />
            <AlgorithmDescription algorithms={algorithmsContent.quickSort} single={true} />
          </div>

          {/* Dijkstra section */}
          <div className="w-full min-h-[600px] md:min-h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 overflow-x-auto">
            <div className="min-w-[320px] h-full">
              <DijkstraVisualizer />
            </div>
            <AlgorithmDescription algorithms={algorithmsContent.dijkstra} single={true} />
          </div>
        </div>
      </main>
    </div>
  );
};


// Root component that handles routing and analytics initialization
function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useDarkMode();


  useEffect(() => {
    initGA();
  }, []);

  useEffect(() => {
    logPageView();
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} isLandingPage={false} />
      
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/algorithms" element={<AlgorithmsApp />} />
      <Route path="/school-projects" element={<SchoolProjects />} />
    </Routes>
    </>
  );
}

export default App;