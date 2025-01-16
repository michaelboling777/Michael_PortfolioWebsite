import React from 'react';
import { Github } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useDarkMode } from '../hooks/useDarkMode'; 


// Main component for displaying school projects portfolio
const SchoolProjects = () => {

    // Dark mode state management
  const [darkMode, setDarkMode] = useDarkMode();


    // GitHub repository links for all projects
  const projectLinks = {
    graphAlgorithms: 'https://github.com/michaelboling777/GraphProject',
    sortingAlgorithms: 'https://github.com/michaelboling777/Merge-Insertion-Sort-Hybrid-Implementation/tree/develop',
    producerConsumer: 'https://github.com/michaelboling777/Producer-Consumer',
    bankersAlgorithm: 'https://github.com/michaelboling777/BankersAlg',
    monteCarloPi: 'https://github.com/michaelboling777/Threads',
    parserTokenizer: 'https://github.com/michaelboling777/Parser-and-Tokenizer',


    
  };

     // Reusable GitHub link button component
    const GitHubLink = ({ href, text }) => (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
      >
        <Github size={20} />
        <span>{text}</span>
      </a>
    );

  return (
    <div className="min-h-screen bg-slate-700">
      {/* Navigation */}
      <Navigation 
      darkMode={darkMode} 
      setDarkMode={setDarkMode}
      isLandingPage={false}
    />

      {/* Main content container */}
      <div className="pt-20 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <div>
            {/* Advanced Data Structures Projects Section */}
            <h1 className="text-3xl font-bold text-white mb-6">CSC 325: Advanced Data Structures and Algorithms</h1>
            
            {/* Graph Algorithms Project */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Graph Algorithms Project</h2>
              <GitHubLink href={projectLinks.graphAlgorithms} text="View on GitHub" />

              {/* Project Overview */}
              <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                <p className="mb-4">
                  This project implements a comprehensive graph library with multiple container-based implementations 
                  and classic graph algorithms. It focuses on comparing performance characteristics of different data 
                  structures for graph representation and implements fundamental graph operations and traversal algorithms.
                </p>
              </div>

              {/* Implementations */}
              <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Implementation Details</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Vector-Based Implementation</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Optimized for sequential access</li>
                        <li>O(1) amortized insertion time</li>
                        <li>Efficient for dense graphs</li>
                        <li>Lower memory overhead</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Set-Based Implementation</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Optimized for sparse graphs</li>
                        <li>O(log N) lookup time</li>
                        <li>Better for frequent searches</li>
                        <li>Automatic duplicate prevention</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Algorithms */}
              <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                <h2 className="text-2xl font-semibold text-white mb-4">Graph Algorithms</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl text-blue-300 mb-2">Depth-First Search Implementation</h3>
                    <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`template<typename Graph, typename ParentMap>
void depth_first_search(const Graph& g, ParentMap& p) {
    typedef typename Graph::vertex_descriptor vertex_descriptor;
    std::stack<vertex_descriptor> stk;
    std::set<edge_descriptor> edges_unexplored;
    std::unordered_set<vertex_descriptor> vertices_unexplored;
    
    // Initialize data structures
    p.clear();
    for(auto vi = g.vertices_cbegin(); vi != g.vertices_cend(); ++vi) {
        vertex_descriptor vd = (*vi)->descriptor();
        vertices_unexplored.emplace(vd);
        p[vd] = -1;
    }
    // ... continued implementation
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="bg-slate-800 rounded-lg p-6 text-gray-300">
                <h2 className="text-2xl font-semibold text-white mb-4">Performance Analysis</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Vector Implementation</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Optimal for dense graphs</li>
                      <li>Better cache locality</li>
                      <li>Faster sequential traversal</li>
                      <li>O(1) amortized insertions</li>
                    </ul>
                  </div>
                  <div className="bg-slate-900 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Set Implementation</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Efficient for sparse graphs</li>
                      <li>O(log N) operations</li>
                      <li>Better memory usage for sparse data</li>
                      <li>Faster element lookup</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Sorting Algorithms Project */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Sorting Algorithms Project</h2>
              <GitHubLink href={projectLinks.sortingAlgorithms} text="View on GitHub" />
              <div className="bg-slate-800 rounded-lg p-6 text-gray-300">
                <div className="space-y-4">
                  <p className="mb-4">
                    This project implements an optimized version of merge sort that combines the efficiency of merge sort for large datasets 
                    with insertion sort for smaller subsequences. The implementation is template-based to work with any data type and uses 
                    iterator-based containers for maximum flexibility.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Template-based implementation supporting any data type</li>
                        <li>Hybrid approach combining merge sort and insertion sort</li>
                        <li>Parameterized subsequence size (k) for optimization</li>
                        <li>Iterator-based design for container flexibility</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold text-white mb-2">Algorithm Strategy</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Uses insertion sort for sequences ≤ k elements</li>
                        <li>Divides larger sequences into ⌈n/k⌉ subsequences</li>
                        <li>Recursively merges sorted subsequences</li>
                        <li>Optimizes performance based on input size</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl text-blue-300 mb-2">Implementation Highlights</h3>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`template<typename RandomAccessIterator, typename Comparator>
void merge_sort(RandomAccessIterator first, RandomAccessIterator last, 
                Comparator comp, long int k = 1) {
    if (std::distance(first, last) <= k) {
        insertion_sort(first, last, comp);
    } else {
        RandomAccessIterator mid = first + (last - first) / 2;
        merge_sort(first, mid, comp, k);
        merge_sort(mid, last, comp, k);
        merge(first, mid, last, comp);
    }
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-xl text-blue-300 mb-2">Performance Analysis</h3>
                    <p>The implementation was tested with different input cases and k values to analyze performance:</p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>Random data showed balanced performance across different k values</li>
                      <li>Pre-sorted data benefited from larger k values</li>
                      <li>Reverse-sorted data showed optimal performance with smaller k values</li>
                      <li>k=1 (traditional merge sort) provided consistent but not always optimal performance</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* CSC 360: Operating Systems */}
            <div className="mt-16">
              <h1 className="text-3xl font-bold text-white mb-6">CSC 360: Operating Systems</h1>

              {/* Producer-Consumer Project */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Producer/Consumer Implementation</h2>
                <GitHubLink href={projectLinks.producerConsumer} text="View on GitHub" />
                {/* Project Overview */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="mb-4">
                    This project implements the classic producer-consumer problem using POSIX threads, mutexes, and semaphores. 
                    The implementation features a circular buffer for data storage, thread synchronization mechanisms, and prime 
                    number detection for consumed values. The project demonstrates deep understanding of concurrent programming 
                    concepts and thread safety.
                  </p>
                </div>

                {/* Implementation Highlights */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Buffer Management</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Circular buffer implementation with fixed size (5)</li>
                        <li>Thread-safe insert and remove operations</li>
                        <li>Head and tail pointers for queue management</li>
                        <li>Buffer snapshot visualization capability</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Synchronization</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Mutex for critical section protection</li>
                        <li>Two semaphores for buffer full/empty states</li>
                        <li>Thread-safe counter management</li>
                        <li>Proper thread joining and cleanup</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Implementation Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl text-blue-300 mb-2">Thread Management</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Dynamic thread creation based on command-line arguments</li>
                        <li>Random sleep intervals for realistic simulation</li>
                        <li>Thread-specific item counting and statistics</li>
                        <li>Prime number detection for consumed values</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="text-xl text-blue-300 mb-2">Buffer Operations</h3>
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`// Insert Operation Pseudocode
sem_wait(&sem_empty);      // Wait if buffer is full
pthread_mutex_lock(&mutex); // Enter critical section
insert_item(item);         // Insert into circular buffer
pthread_mutex_unlock(&mutex);
sem_post(&sem_full);       // Signal item available

// Remove Operation Pseudocode
sem_wait(&sem_full);       // Wait if buffer is empty
pthread_mutex_lock(&mutex); // Enter critical section
remove_item(&item);        // Remove from circular buffer
pthread_mutex_unlock(&mutex);
sem_post(&sem_empty);      // Signal space available`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Program Features */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300">
                  <h2 className="text-2xl font-semibold text-white mb-4">Additional Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Monitoring</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Real-time buffer state visualization</li>
                        <li>Thread-specific production/consumption statistics</li>
                        <li>Buffer full/empty event counting</li>
                        <li>Comprehensive end-of-run statistics</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Command Line Options</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Configurable simulation duration</li>
                        <li>Adjustable thread sleep intervals</li>
                        <li>Variable producer/consumer thread counts</li>
                        <li>Optional buffer state visualization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Banker's Algorithm Project */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Banker's Algorithm Implementation</h2>
                <GitHubLink href={projectLinks.bankersAlgorithm} text="View on GitHub" />
                {/* Project Overview */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="mb-4">
                    This project implements the Banker's Algorithm, a deadlock avoidance algorithm used in operating systems. 
                    The implementation handles multiple processes and resource types, determines system safety states, and 
                    manages resource allocation requests while preventing deadlock situations.
                  </p>
                </div>

                {/* Key Features */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Key Features</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Resource Management</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Dynamic handling of multiple resource types</li>
                        <li>Allocation matrix tracking</li>
                        <li>Maximum resource need calculation</li>
                        <li>Available resource monitoring</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Safety Algorithm</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Safe state detection</li>
                        <li>Deadlock avoidance checks</li>
                        <li>Resource request validation</li>
                        <li>Dynamic safety sequence generation</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Implementation Details */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Implementation Details</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl text-blue-300 mb-2">Core Algorithm Structure</h3>
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`// Matrix Management
vector<vector<int>> allocate(n, vector<int>(m));  // Current allocation
vector<vector<int>> max(n, vector<int>(m));       // Maximum need
vector<vector<int>> need(n, vector<int>(m));      // Remaining need
vector<vector<int>> avail(1, vector<int>(m));     // Available resources

// Safety Check Implementation
while (test_safe < n) {
    bool notify = false;
    for (int i = 0; i < n; i++) {
        if (done_arr[i] == false) {
            // Check if current process needs can be met
            for (need_itr = 0; need_itr < m; need_itr++) {
                if (check[need_itr] < need[i][need_itr]) break;
            }
            // Process can be completed safely
            if (need_itr == m) {
                // Update available resources
                for (int r = 0; r < m; r++) {
                    check[r] = check[r] + allocate[i][r];
                }
                done_arr[i] = true;
                notify = true;
                safe[test_safe++] = i;
            }
        }
    }
    // Check if we're stuck in an unsafe state
    if (notify == false) {
        cout << "Error, system NOT in safe state!\\n";
        break;
    }
}`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Technical Highlights */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300">
                  <h2 className="text-2xl font-semibold text-white mb-4">Technical Highlights</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Design Features</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Vector-based matrix implementations</li>
                        <li>Dynamic resource tracking</li>
                        <li>Efficient state management</li>
                        <li>Clear output formatting</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Algorithm Benefits</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Prevents deadlock scenarios</li>
                        <li>Optimizes resource allocation</li>
                        <li>Handles multiple resource types</li>
                        <li>Real-time safety checking</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Threading Projects */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Concurrent Programming Projects</h2>
                <GitHubLink href={projectLinks.monteCarloPi} text="View on GitHub" />
                {/* Monte Carlo Pi Project */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Multi-threaded Monte Carlo Pi Calculation</h2>
                  <p className="mb-4">
                    This project implements a parallel Monte Carlo method to approximate π using multiple threads. 
                    The implementation demonstrates thread synchronization, workload distribution, and performance 
                    optimization through parallel computation.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Key Features</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Dynamic thread creation based on user input</li>
                        <li>Parallel random point generation</li>
                        <li>Thread-safe result accumulation</li>
                        <li>Performance timing measurement</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Implementation Highlights</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>POSIX threads (pthread) implementation</li>
                        <li>Shared memory for result collection</li>
                        <li>Thread-specific random number generation</li>
                        <li>Geometric probability calculation</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl text-blue-300 mb-2">Algorithm Overview</h3>
                    <p className="mb-4">
                      The program uses the Monte Carlo method by generating random points in a 1x1 square and determining 
                      if they fall within a quarter circle of radius 0.5. The ratio of hits to total points, multiplied 
                      by 4, approximates π. The workload is distributed across multiple threads for parallel execution.
                    </p>
                  </div>
                </div>

                {/* Fibonacci Thread Project */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Multi-threaded Fibonacci Generator</h2>
                  <p className="mb-4">
                    This project implements a parent-child thread model to generate Fibonacci numbers. It demonstrates 
                    basic thread creation, synchronization, and shared memory access between threads.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Implementation Features</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Parent-child thread architecture</li>
                        <li>Global array for result sharing</li>
                        <li>Command-line argument processing</li>
                        <li>Thread synchronization using join</li>
                      </ul>
                    </div>
                    <div className="bg-slate-900 p-4 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">Program Flow</h3>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Child thread computes sequence</li>
                        <li>Parent thread waits for completion</li>
                        <li>Results shared via global array</li>
                        <li>Parent thread handles output</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CSC 333: Languages and Machines */}
            <div className="mt-16">
              <h1 className="text-3xl font-bold text-white mb-6">CSC 333: Languages and Machines</h1>
              
              {/* Compiler Project */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-6">Compiler Implementation Project</h2>
                <GitHubLink href={projectLinks.parserTokenizer} text="View on GitHub" />

                {/* Project Overview */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Project Overview</h2>
                  <p className="mb-4">
                    This project implements two fundamental components of a compiler: a lexical analyzer and an LL(1) parser. 
                    These components work together to process source code, first breaking it into tokens and then analyzing 
                    its syntactic structure according to a formal grammar.
                  </p>
                </div>

                {/* Part 1: Lexical Analyzer */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Part 1: Lexical Analyzer</h2>
                  <div className="space-y-4">
                    <div className="mb-4">
                      <h3 className="text-xl text-blue-300 mb-2">Token Recognition</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Basic Tokens</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Integers (e.g., 0, 1000, 233)</li>
                            <li>Identifiers (must start with letters)</li>
                            <li>Keywords (if, while, function, etc.)</li>
                            <li>Comments (# style to newline)</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Operators</h4>
                          <ul className="list-disc list-inside space-y-1">
                            <li>Arithmetic (+, -, *, /, ^, %)</li>
                            <li>Relational (&lt;, &gt;, !=, ==, &lt;=, &gt;=)</li>
                            <li>Logical (AND, OR, NOT)</li>
                            <li>Other (&#123;&#125;, (), ;, ,)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl text-blue-300 mb-2">Implementation Example</h3>
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`// Sample input
if (x < 10) {
    result = x + 20;
}

// Generated tokens
Token: Keyword(if)
Token: LBrac(()
Token: Identifier(x)
Token: LThan(<)
Token: Integer(10)
Token: RBrac())
Token: LPar({)
Token: Identifier(result)
Token: Assignment(=)
Token: Identifier(x)
Token: Addition(+)
Token: Integer(20)
Token: Semicolon(;)
Token: RPar(})`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Part 2: LL(1) Parser */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300 mb-6">
                  <h2 className="text-2xl font-semibold text-white mb-4">Part 2: LL(1) Parser</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl text-blue-300 mb-2">Grammar Rules</h3>
                      <p className="mb-2">The parser implements context-free grammar rules for:</p>
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`// Expression Grammar
Expr → A B
A → D E
B → C A B | ε
C → + | -
D → (Expr) | id | number
E → F D E | ε
F → * | / | % | ^

// Control Structures
IfStatement → if (CondExpr) Which_State Optional_Else
WhileStatement → while (CondExpr) Which_State
BlockStatements → { Total_Statement }`}
                      </pre>
                    </div>

                    <div>
                      <h3 className="text-xl text-blue-300 mb-2">Parsing Process</h3>
                      <pre className="bg-slate-900 p-4 rounded-lg overflow-x-auto text-sm">
{`PRODUCTION RULE Entire_Program → Generate_rec
PRODUCTION RULE Generate_rec → FuncDef Generate_rec
PRODUCTION RULE FuncDef → function id ( Arg_list ) BlockStatements
--> function
--> main
--> (
... parsing trace continues`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Integration and Workflow */}
                <div className="bg-slate-800 rounded-lg p-6 text-gray-300">
                  <h2 className="text-2xl font-semibold text-white mb-4">Integration and Workflow</h2>
                  <div className="space-y-4">
                    <p className="mb-4">
                      The workflow consists of two main phases:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Phase 1: Lexical Analysis</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Reads source code from input.txt</li>
                          <li>Tokenizes the input</li>
                          <li>Outputs tokens to parser_input.txt</li>
                          <li>Generates lexical_output.txt for debugging</li>
                        </ul>
                      </div>
                      <div className="bg-slate-900 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Phase 2: Parsing</h3>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Reads tokens from parser_input.txt</li>
                          <li>Applies grammar rules</li>
                          <li>Validates syntax structure</li>
                          <li>Outputs parsing trace to parser_output.txt</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolProjects;