// GATE CS 2027 Complete Schedule & Subject Data
const OFFICIAL_HOLIDAYS_2026 = {
  "2026-09-06": "Eid Milad-un-Nabi",
  "2026-09-14": "Vinayaka Chavithi",
  "2026-09-27": "Eid Milad-un-Nabi (Mouloud)",
  "2026-10-02": "Mahatma Gandhi Jayanti",
  "2026-10-09": "Bathukamma",
  "2026-10-10": "Dussehra / Vijaya Dasami",
  "2026-10-19": "Dussehra Vacation Start",
  "2026-10-20": "Vijaya Dasami",
  "2026-10-21": "Following Day of Vijaya Dasami",
  "2026-10-29": "Diwali",
  "2026-11-13": "Kartika Purnima",
  "2026-11-24": "Guru Nanak Jayanthi",
  "2026-12-25": "Christmas",
  "2027-01-01": "New Year's Day",
  "2027-01-14": "Bhogi / Sankranti",
  "2027-01-15": "Sankranti / Pongal",
  "2027-01-26": "Republic Day"
};

const SUBJECT_METADATA = {
  "Digital Logic": {
    youtube: "Neso Academy (Basics) / Gate Smashers (Revision)",
    textbook: "Digital Design — M. Morris Mano & Michael D. Ciletti",
    color: "#4f46e5"
  },
  "Computer Organization & Architecture": {
    youtube: "Vishwadeep Gothi (Unacademy) / Knowledge Gate",
    textbook: "Computer Organization and Embedded Systems — Carl Hamacher",
    color: "#0891b2"
  },
  "Programming & Data Structures": {
    youtube: "Abdul Bari (Algorithms & Trees) / Amit Khurana (C Pointers)",
    textbook: "Data Structures Through C in Depth — S.K. Srivastava",
    color: "#059669"
  },
  "Operating Systems": {
    youtube: "Gate Smashers (Varun Singla) / Vishwadeep Gothi",
    textbook: "Operating System Concepts — Silberschatz, Galvin & Gagne",
    color: "#d97706"
  },
  "Databases": {
    youtube: "Knowledge Gate (Sanchit Jain) / Vishwadeep Gothi",
    textbook: "Database System Concepts — Silberschatz, Korth & Sudarshan",
    color: "#7c3aed"
  },
  "Computer Networks": {
    youtube: "Ankit Dolya / Gate Smashers / Ravindrababu Ravula",
    textbook: "Computer Networks — Andrew S. Tanenbaum",
    color: "#2563eb"
  },
  "Algorithms": {
    youtube: "Abdul Bari (Greedy, DP, Graphs) / GO Classes",
    textbook: "Introduction to Algorithms — Cormen, Leiserson, Rivest, Stein (CLRS)",
    color: "#dc2626"
  },
  "General Aptitude": {
    youtube: "Christy's Classes / Saurabh Thakur / Gate Smashers",
    textbook: "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
    color: "#db2777"
  },
  "Discrete Mathematics": {
    youtube: "Amit Khurana / GO Classes (Deepak Poonia) / Neso Academy",
    textbook: "Discrete Mathematics and Its Applications — Kenneth H. Rosen",
    color: "#9333ea"
  },
  "Engineering Mathematics": {
    youtube: "Gajendra Purohit / Gate Wallah",
    textbook: "Higher Engineering Mathematics — B.S. Grewal",
    color: "#ea580c"
  },
  "Theory of Computation": {
    youtube: "Amit Khurana / Malleshwam Devasane (Deva Sir) / Gate Smashers",
    textbook: "An Introduction to Formal Languages and Automata — Peter Linz",
    color: "#0284c7"
  },
  "Compiler Design": {
    youtube: "Malleshwam Devasane / Knowledge Gate / Gate Smashers",
    textbook: "Compilers: Principles, Techniques, and Tools — Aho, Lam, Sethi, Ullman",
    color: "#16a34a"
  }
};

// Blackout ranges for exams
const BLACKOUT_RANGES = [
  {
    start: "2026-10-12",
    end: "2026-11-20",
    reason: "Sem 1 Mid-2, Practicals & End Semester Exams Blackout (No GATE Prep)"
  },
  {
    start: "2027-01-15",
    end: "2027-01-27",
    reason: "Sem 2 Mid-1 Exams Blackout (No GATE Prep)"
  }
];

// Raw daily schedule array
const DAILY_SCHEDULE_RAW = [
  // --- WEEK 1: Digital Logic ---
  { date: "2026-09-07", subject: "Digital Logic", title: "Boolean Algebra & Minimization", subtopics: ["Boolean Algebra Theorems & Identities", "Algebraic Minimization Techniques", "Logic Gates (AND, OR, NOT, NAND, NOR, XOR, XNOR)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-08", subject: "Digital Logic", title: "K-Maps & Tabular Method", subtopics: ["2, 3, 4 Variable K-Maps", "SOP & POS forms, Don't Care conditions", "Quine-McCluskey (Tabular) Minimization Method"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-09", subject: "Digital Logic", title: "Combinational Circuits", subtopics: ["Adders & Subtractors (Half/Full, Carry Lookahead)", "Multiplexers & Demultiplexers", "Decoders, Encoders & Priority Encoders"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-10", subject: "Digital Logic", title: "Sequential Circuits - Flip Flops", subtopics: ["Latches vs Flip-Flops", "SR, JK, D, T Flip-Flops & Truth Tables", "Excitation Tables & Conversion between Flip-Flops"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-11", subject: "Digital Logic", title: "Counters & Shift Registers", subtopics: ["Synchronous & Asynchronous (Ripple) Counters", "Mod-N Counters, Ring & Johnson Counters", "Shift Registers & State Diagrams"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-12", subject: "Digital Logic", title: "Computer Arithmetic & DL PYQs", subtopics: ["Number Representations: Unsigned, 1's & 2's Complement", "Fixed & Floating Point Arithmetic (IEEE 754 format)", "Solve 20+ Previous Year GATE Questions on Digital Logic"], hours: "5h (Extended Study - 2nd Saturday)", isSunday: false },
  { date: "2026-09-13", subject: "Engineering Mathematics", title: "Linear Algebra - Matrices & Systems", subtopics: ["Matrices, Matrix Operations & Properties", "Determinants & Inverse of a Matrix", "System of Linear Equations (Ax = B, Rank & Consistency)"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 2: Computer Organization & Architecture ---
  { date: "2026-09-14", subject: "Computer Organization & Architecture", title: "Machine Instructions & Addressing", subtopics: ["Instruction Formats & Opcode Types", "Addressing Modes: Immediate, Direct, Indirect, Register, Indexed, Relative", "Assembly Code Execution & Instruction Cycles"], hours: "4h (Holiday extended study - Vinayaka Chavithi)", isSunday: false },
  { date: "2026-09-15", subject: "Computer Organization & Architecture", title: "ALU & Data-path Design", subtopics: ["ALU Architecture & Operation Control", "Bus Structures (Single, Dual, Triple bus)", "Data-path Data Flow & Register Transfer"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-16", subject: "Computer Organization & Architecture", title: "Control Unit Design", subtopics: ["Hardwired Control Unit Architecture", "Microprogrammed Control Unit: Microinstructions, Horizontal vs Vertical", "Control Memory & Microprogram Sequencing"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-17", subject: "Computer Organization & Architecture", title: "Instruction Pipelining & Hazards", subtopics: ["Pipelining Execution & Throughput / Speedup formulas", "Structural, Data & Control Hazards", "Branch Prediction & Hazard Mitigation Techniques"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-18", subject: "Computer Organization & Architecture", title: "Memory Hierarchy & Cache Mapping", subtopics: ["Memory Hierarchy Levels & Access Times", "Direct Mapping, Associative Mapping & Set-Associative Mapping", "Cache Read/Write Policies (Write-through vs Write-back)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-19", subject: "Computer Organization & Architecture", title: "Secondary Memory & I/O Interface", subtopics: ["Main Memory (RAM, ROM) & Disk Storage Math", "I/O Access Modes: Programmed I/O, Interrupt-Driven I/O", "Direct Memory Access (DMA) & Controller Architecture"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-20", subject: "Engineering Mathematics", title: "Linear Algebra - Eigenvalues & LU", subtopics: ["Eigenvalues & Eigenvectors Properties", "Cayley-Hamilton Theorem & Applications", "LU Decomposition Method for Systems of Equations"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 3: Programming & Data Structures (Part 1) ---
  { date: "2026-09-21", subject: "Programming & Data Structures", title: "C Pointers, Arrays & Strings", subtopics: ["Pointer Arithmetic, Double Pointers & Void Pointers", "1D and 2D Arrays in Memory", "String manipulation & C Memory Layout"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-22", subject: "Programming & Data Structures", title: "Recursion & Function Pointers", subtopics: ["Call Stack & Recursion Tree Analysis", "Tail Recursion vs Non-tail Recursion", "Storage Classes, Scope & Function Pointers"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-23", subject: "Programming & Data Structures", title: "Stacks & Queues", subtopics: ["Stack Implementation via Array & Linked List", "Infix to Postfix/Prefix conversion & Evaluation", "Queue, Circular Queue & Priority Queue Implementation"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-24", subject: "Programming & Data Structures", title: "Linked Lists", subtopics: ["Singly Linked List: Insertion, Deletion, Reversal", "Doubly Linked List & Circular Linked List", "Floyd's Cycle Detection Algorithm & Intersection"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-25", subject: "Programming & Data Structures", title: "Trees & Binary Tree Traversals", subtopics: ["Tree Terminology (Height, Depth, Degree)", "Inorder, Preorder, Postorder & Level-Order Traversals", "Reconstructing Trees from Traversals"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-26", subject: "Programming & Data Structures", title: "Binary Search Trees (BST)", subtopics: ["BST Properties & Search/Insert Operations", "BST Deletion (Case analysis)", "AVL Trees & Rotations Intro"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-27", subject: "Engineering Mathematics", title: "Calculus - Limits & Continuity", subtopics: ["Limits of Functions & Indeterminate forms (L'Hopital's Rule)", "Continuity & Differentiability tests", "PDS & C Programming GATE PYQ Practice"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 4: Programming & Data Structures (Part 2) ---
  { date: "2026-09-28", subject: "Programming & Data Structures", title: "Binary Heaps & Heap Operations", subtopics: ["Min-Heap & Max-Heap Array Representations", "Heapify Algorithm & Build Heap Time Complexity", "Heap Insert, Delete-Max & Heap Sort"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-29", subject: "Programming & Data Structures", title: "Graphs - Representation & Traversals", subtopics: ["Adjacency Matrix vs Adjacency List Representations", "Breadth-First Search (BFS) Algorithm & Applications", "Depth-First Search (DFS) Algorithm & Topological Sort"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-09-30", subject: "Programming & Data Structures", title: "Hashing & Hash Tables", subtopics: ["Hash Functions (Division, Multiplication, Mid-Square)", "Open Hashing (Chaining)", "Closed Hashing (Linear Probing, Quadratic Probing, Double Hashing)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-01", subject: "Programming & Data Structures", title: "Advanced Data Structures Practice", subtopics: ["Tree Height / Node Counting Formulae", "Graph Traversal Time/Space Complexities", "Mixed Code Tracing Questions"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-02", subject: "Programming & Data Structures", title: "PDS Comprehensive GATE PYQ Marathon", subtopics: ["Solving 30+ GATE PYQs on Recursion, Trees & Arrays", "Pointers & Structural memory GATE trick questions", "Error Analysis & Self Correction"], hours: "4h (Holiday extended study - Gandhi Jayanti)", isSunday: false },
  { date: "2026-10-03", subject: "Programming & Data Structures", title: "Weak Areas Revision & PDS Review", subtopics: ["Reviewing incorrect PYQ solutions", "C syntax & pointer edge cases review", "Quick formula sheet creation for Data Structures"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-04", subject: "Engineering Mathematics", title: "Calculus - Maxima, Minima & Integration", subtopics: ["Maxima & Minima of Single Variable Functions", "Mean Value Theorems (Rolle's, Lagrange's, Cauchy's)", "Definite & Indefinite Integration Techniques"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 5: Operating Systems ---
  { date: "2026-10-05", subject: "Operating Systems", title: "Processes & System Calls", subtopics: ["Process Control Block (PCB) & Process States", "fork(), exec(), wait() System Call Tracing", "User Mode vs Kernel Mode & Dual-mode Operation"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-06", subject: "Operating Systems", title: "Threads & Process Synchronization", subtopics: ["User-level vs Kernel-level Threads", "Critical Section Problem & Race Conditions", "Peterson's Solution, Semaphores & Mutex Locks"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-07", subject: "Operating Systems", title: "Classical Sync Problems & Deadlocks", subtopics: ["Producer-Consumer, Readers-Writers & Dining Philosophers", "Deadlock 4 Necessary Conditions & Resource Allocation Graphs", "Banker's Algorithm for Deadlock Avoidance"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-08", subject: "Operating Systems", title: "CPU & I/O Scheduling", subtopics: ["FCFS, SJF, SRTF Scheduling Algorithms", "Round Robin Scheduling & Quantum optimization", "Priority Scheduling & Multilevel Queue Scheduling"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-10-09", subject: "Operating Systems", title: "Memory Management & Paging", subtopics: ["Contiguous Memory Allocation (First Fit, Best Fit, Worst Fit)", "Paging Mechanism, Page Tables & Page Address Translation", "Translation Lookaside Buffer (TLB) & Effective Access Time"], hours: "4h (Holiday extended study - Bathukamma)", isSunday: false },
  { date: "2026-10-10", subject: "Operating Systems", title: "Virtual Memory & Page Replacement", subtopics: ["Demand Paging & Page Fault Handling", "FIFO, Optimal & LRU Page Replacement Algorithms", "Belady's Anomaly, Thrashing & Working Set Model"], hours: "5h (Holiday extended study - Dussehra)", isSunday: false },
  { date: "2026-10-11", subject: "Operating Systems", title: "File Systems & Probability Intro", subtopics: ["File Allocation Methods (Contiguous, Linked, Indexed)", "Disk Scheduling Algorithms (FCFS, SSTF, SCAN, C-SCAN)", "Probability: Random Variables & Basic Distributions"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- BLACKOUT 1: OCT 12 - NOV 20 (College Mid-2, Practicals & End Sem Exams) ---

  // --- WEEK 6: Database Management Systems ---
  { date: "2026-11-21", subject: "Databases", title: "ER Model & Database Architecture", subtopics: ["3-Schema Architecture & Data Independence", "Entities, Attributes, Relationships & Constraints", "Strong vs Weak Entity Sets & ER-to-Relational Mapping"], hours: "4h (Saturday Post-Exam kick-off)", isSunday: false },
  { date: "2026-11-22", subject: "Databases", title: "Relational Model & Relational Algebra", subtopics: ["Relational Model Concepts & Keys (Super, Candidate, Primary, Foreign)", "Relational Algebra: Select, Project, Rename, Union, Set Difference", "Cartesian Product, Joins (Inner, Outer, Theta) & Division Operator"], hours: "5h (Sunday Intensive)", isSunday: true },
  { date: "2026-11-23", subject: "Databases", title: "Tuple Relational Calculus & SQL Basics", subtopics: ["Tuple Relational Calculus (TRC) Queries", "SQL DDL, DML commands & Basic SELECT queries", "SQL Joins, Group By, Having & Aggregate Functions"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-11-24", subject: "Databases", title: "Normal Forms & Functional Dependencies", subtopics: ["Functional Dependencies & Closure of Attributes", "Finding Candidate Keys & Canonical Cover", "1NF, 2NF, 3NF & BCNF Decomposition & Preservation"], hours: "4h (Holiday extended study - Guru Nanak Jayanthi)", isSunday: false },
  { date: "2026-11-25", subject: "Databases", title: "Indexing & B / B+ Trees", subtopics: ["Primary, Secondary & Clustered Indexes", "B-Tree Architecture & Insertion/Deletion Math", "B+ Tree Indexing & Node Capacity Calculation"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-11-26", subject: "Databases", title: "Transactions & Concurrency Control", subtopics: ["Transaction States & ACID Properties", "Schedules: Serializability, Conflict & View Serializability", "Recoverable, Cascaded & Cascade-less Schedules"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-11-27", subject: "Databases", title: "Lock-Based Protocols & DBMS PYQs", subtopics: ["Shared / Exclusive Locks & Two-Phase Locking (2PL)", "Strict 2PL, Rigorous 2PL & Timestamp Ordering", "Solve 20+ GATE PYQs on DBMS"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-11-28", subject: "Databases", title: "DBMS Overall Revision & Practice", subtopics: ["Reviewing BCNF vs 3NF lossy/lossless properties", "SQL Subquery trick questions practice", "Creating DBMS summary notes"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-11-29", subject: "Discrete Mathematics", title: "Propositional & First-Order Logic", subtopics: ["Propositional Logic, Connectives & Truth Tables", "Tautology, Contradiction & Logical Equivalences", "First-Order Logic: Quantifiers (Universal & Existential) & Validity"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 7: Computer Networks (Part 1) ---
  { date: "2026-11-30", subject: "Computer Networks", title: "Network Models & Physical Layer", subtopics: ["OSI Reference Model vs TCP/IP Protocol Stack", "Packet Switching vs Circuit Switching vs Virtual Circuit", "Bandwidth-Delay Product, Transmission & Propagation Delay Math"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-01", subject: "Computer Networks", title: "Data Link Layer & Error Control", subtopics: ["Framing Methods (Character/Bit Stuffing)", "Error Detection: Parity, Checksum & Cyclic Redundancy Check (CRC)", "Flow Control: Stop-and-Wait, Go-Back-N & Selective Repeat ARQ"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-02", subject: "Computer Networks", title: "Medium Access Control & Ethernet", subtopics: ["Multiple Access Protocols: ALOHA (Pure & Slotted)", "CSMA, CSMA/CD (Ethernet) & Collision Detection Math", "Ethernet Frame Format & Switches / Bridging"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-03", subject: "Computer Networks", title: "Network Layer - IPv4 & Addressing", subtopics: ["IPv4 Header Format & Field Analysis", "Classful IP Addressing vs CIDR Notation", "Subnetting, Supernetting & Variable Length Subnet Masking (VLSM)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-04", subject: "Computer Networks", title: "IP Support Protocols & NAT", subtopics: ["IP Packet Fragmentation & Reassembly Calculations", "ARP (Address Resolution Protocol) & RARP", "DHCP, ICMP Protocol & Network Address Translation (NAT)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-05", subject: "Computer Networks", title: "Routing Protocols", subtopics: ["Shortest Path Routing & Flooding Algorithm", "Distance Vector Routing & Count-to-Infinity Problem", "Link State Routing Protocol (OSPF Basics)"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-06", subject: "Discrete Mathematics", title: "Sets, Relations & Functions", subtopics: ["Set Operations, Venn Diagrams & Power Sets", "Relations: Reflexive, Symmetric, Transitive, Equivalence", "Functions: One-to-one, Onto, Bijective & Composition"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 8: Computer Networks (Part 2) + Algorithms Start ---
  { date: "2026-12-07", subject: "Computer Networks", title: "Transport Layer - TCP & UDP", subtopics: ["Transport Layer Duties & Port Numbers", "UDP Header & Stateless Operation", "TCP 3-Way Handshake & Connection State Diagram"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-08", subject: "Computer Networks", title: "TCP Flow & Congestion Control", subtopics: ["TCP Sliding Window & Flow Control", "TCP Congestion Control: Slow Start, Congestion Avoidance", "Fast Retransmit & Fast Recovery Mechanisms"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-09", subject: "Computer Networks", title: "Application Layer Protocols", subtopics: ["Domain Name System (DNS) Resolution", "HTTP & HTTPS Architecture", "SMTP, POP3, IMAP & FTP Protocols"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-10", subject: "Computer Networks", title: "Computer Networks GATE PYQ Sprint", subtopics: ["Solving 25+ IP addressing & Subnetting PYQs", "TCP Congestion Window size calculation questions", "Error detection & CRC numerical solving"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-11", subject: "Algorithms", title: "Asymptotic Analysis & Recurrences", subtopics: ["Big-O, Big-Omega, Big-Theta Definitions", "Master Theorem for Divide & Conquer Recurrences", "Recursion Tree Method & Substitution Method"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-12", subject: "Algorithms", title: "Sorting Algorithms Complexity Analysis", subtopics: ["Insertion Sort, Bubble Sort, Selection Sort", "Merge Sort, Quick Sort (Worst vs Average case)", "Heap Sort & Counting Sort / Radix Sort Bounds"], hours: "5h (Extended Study - 2nd Saturday)", isSunday: false },
  { date: "2026-12-13", subject: "Discrete Mathematics", title: "Partial Orders, Lattices & Groups", subtopics: ["Partial Orders, Posets & Hasse Diagrams", "Lattices: Bounded, Distributive & Complemented Lattices", "Groups, Subgroups, Lagrange's Theorem & Monoids"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 9: Algorithms ---
  { date: "2026-12-14", subject: "Algorithms", title: "Greedy Algorithms Paradigm", subtopics: ["Greedy Choice Property & Optimal Substructure", "Activity Selection Problem", "Huffman Coding & Fractional Knapsack"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-15", subject: "Algorithms", title: "Dynamic Programming (Part 1)", subtopics: ["Overlapping Subproblems & Memoization vs Tabulation", "Longest Common Subsequence (LCS)", "0/1 Knapsack Problem DP Formulation"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-16", subject: "Algorithms", title: "Dynamic Programming (Part 2)", subtopics: ["Matrix Chain Multiplication", "Coin Change & Longest Increasing Subsequence (LIS)", "Optimal Binary Search Trees"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-17", subject: "Algorithms", title: "Graph Algorithms - MST", subtopics: ["Minimum Spanning Tree (MST) Properties", "Kruskal's Algorithm & Disjoint Set Union (DSU)", "Prim's Algorithm Complexity & Implementation"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-18", subject: "Algorithms", title: "Shortest Path Graph Algorithms", subtopics: ["Single-Source Shortest Path: Dijkstra's Algorithm", "Bellman-Ford Algorithm (Negative edge detection)", "All-Pairs Shortest Path: Floyd-Warshall Algorithm"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-19", subject: "Algorithms", title: "NP-Completeness & Algorithm PYQs", subtopics: ["P, NP, NP-Hard & NP-Complete Definitions", "Reducibility & Standard NP-Complete Problems", "Solve 20+ GATE Algorithms PYQs"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-20", subject: "Discrete Mathematics", title: "Graph Theory - Connectivity & Coloring", subtopics: ["Graph Definitions: Paths, Cycles, Degrees, Handshaking Lemma", "Connected Components, Eulerian & Hamiltonian Graphs", "Planar Graphs, Euler's Formula & Graph Coloring"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 10: General Aptitude ---
  { date: "2026-12-21", subject: "General Aptitude", title: "Verbal Aptitude - Grammar & Usage", subtopics: ["Tenses & Subject-Verb Agreement", "Articles, Prepositions & Conjunctions", "Error Spotting & Sentence Correction"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-22", subject: "General Aptitude", title: "Verbal Aptitude - Vocabulary & Reading", subtopics: ["Vocabulary, Idioms & Phrases", "Reading Comprehension Strategy", "Narrative Sequencing & Critical Reasoning"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-23", subject: "General Aptitude", title: "Quantitative Aptitude - Data Interpretation", subtopics: ["Bar Graphs, Line Graphs & Pie Charts Analysis", "Table Charts & 2D/3D Data Tables", "Ratios, Percentages & Growth Calculations"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-24", subject: "General Aptitude", title: "Quantitative Aptitude - Numbers & Series", subtopics: ["Ratio & Proportion, Percentages", "Powers, Exponents & Logarithms", "Number Series & Arithmetic/Geometric Progressions"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-25", subject: "General Aptitude", title: "Combinatorics, Geometry & Mensuration", subtopics: ["Permutations & Combinations Formulas", "Probability Basics & Coin/Dice/Card problems", "2D & 3D Geometry & Mensuration Math"], hours: "4h (Holiday extended study - Christmas)", isSunday: false },
  { date: "2026-12-26", subject: "General Aptitude", title: "Analytical Reasoning & Logic", subtopics: ["Deduction & Induction Reasoning", "Analogy & Symbol Operations", "Numerical Relations & Puzzles"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-27", subject: "Engineering Mathematics", title: "Probability & Statistics - Bayes Theorem", subtopics: ["Uniform, Normal, Exponential Distributions", "Poisson & Binomial Distributions", "Mean, Median, Mode, Std Dev, Bayes Theorem"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 11: Aptitude (cont.) + Discrete Math ---
  { date: "2026-12-28", subject: "General Aptitude", title: "Spatial Aptitude & Shapes", subtopics: ["Transformation of Shapes: Translation, Mirroring, Rotation", "Assembling & Grouping 2D/3D Shapes", "Paper Folding, Cutting & Pattern Recognition"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-29", subject: "General Aptitude", title: "General Aptitude Full PYQ Practice", subtopics: ["Solving 30+ GATE Aptitude Questions (10 & 15 mark sections)", "Speed & Accuracy Optimization", "Verbal trick questions practice"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-30", subject: "Discrete Mathematics", title: "Combinatorics & Recurrence Relations", subtopics: ["Counting Principles, Pigeonhole Principle", "Solving Recurrence Relations (Homogeneous/Non-homogeneous)", "Generating Functions & Applications"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2026-12-31", subject: "Discrete Mathematics", title: "Discrete Math Full Subject Review", subtopics: ["Formula sheet creation for Logic, Sets & Graph Theory", "Solving tricky GATE Discrete Math PYQs", "Reviewing weak areas in Combinatorics"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-01", subject: "Algorithms", title: "New Year Full Subject PYQ Practice", subtopics: ["Solving 25+ GATE Algorithms PYQs", "DP formulation practice", "Time complexity sorting problems"], hours: "4h (Holiday extended study - New Year)", isSunday: false },
  { date: "2027-01-02", subject: "Digital Logic", title: "Core CS Revision - Digital Logic & COA", subtopics: ["K-map & Pipeline hazard rapid review", "Cache memory mapping numerical solving", "Self-test formula check"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-03", subject: "Engineering Mathematics", title: "Full Timed Mock Paper 1 (3 Hours)", subtopics: ["Taking full 3-Hour GATE Mock Test (65 Questions)", "Detailed Score & Error Analysis", "Identifying weak subjects for January focus"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 12: Theory of Computation ---
  { date: "2027-01-04", subject: "Theory of Computation", title: "Finite Automata & Regular Expressions", subtopics: ["Deterministic Finite Automata (DFA) Design", "Nondeterministic Finite Automata (NFA) & Equivalence", "Regular Expressions & NFA-RE Conversion"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-05", subject: "Theory of Computation", title: "NFA to DFA & DFA Minimization", subtopics: ["Subset Construction Algorithm (NFA to DFA)", "DFA Minimization (Equivalence Partitioning)", "Mealy & Moore Machines Basics"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-06", subject: "Theory of Computation", title: "Regular Languages & Pumping Lemma", subtopics: ["Closure Properties of Regular Languages", "Pumping Lemma for Regular Languages", "Decidability Properties of Regular Languages"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-07", subject: "Theory of Computation", title: "Context-Free Grammars (CFG)", subtopics: ["CFG Definitions, Derivations & Parse Trees", "Ambiguity in Grammars & Elimination", "Chomsky Normal Form (CNF) & GNF"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-08", subject: "Theory of Computation", title: "Pushdown Automata (PDA)", subtopics: ["Deterministic vs Nondeterministic PDA", "CFG to PDA & PDA to CFG Conversion", "Closure Properties of Context-Free Languages"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-09", subject: "Theory of Computation", title: "TOC Pumping Lemma & Grammar PYQs", subtopics: ["Pumping Lemma for Context-Free Languages", "Chomsky Hierarchy of Languages", "Solve 20+ GATE TOC PYQs"], hours: "5h (Extended Study - 2nd Saturday)", isSunday: false },
  { date: "2027-01-10", subject: "Theory of Computation", title: "Turing Machines & Undecidability", subtopics: ["Turing Machine Architecture & Language Acceptors", "Halting Problem & Reduction Techniques", "Rice's Theorem & Undecidable Problems Summary"], hours: "5h (Sunday Intensive)", isSunday: true },

  // --- WEEK 13: Compiler Design ---
  { date: "2027-01-11", subject: "Compiler Design", title: "Lexical Analysis & Tokens", subtopics: ["Role of Lexical Analyzer & Token / Pattern / Lexeme", "Input Buffering & Lexical Error Handling", "LEX Tool & Regular Expressions in Compiler"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-12", subject: "Compiler Design", title: "Parsing Techniques (Top-Down & Bottom-Up)", subtopics: ["LL(1) Parsing Table Construction & FIRST/FOLLOW Sets", "Operator Precedence Parsing", "LR(0), SLR(1), LALR(1), CLR(1) Parsing & Conflict Resolution"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-13", subject: "Compiler Design", title: "Syntax-Directed Translation & Environments", subtopics: ["S-Attributed vs L-Attributed Definitions", "Intermediate Code Generation (3-Address Code, DAG)", "Runtime Environments & Activation Records"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-14", subject: "Compiler Design", title: "Code Optimization & Data Flow Analysis", subtopics: ["Local Optimization, Basic Blocks & Control Flow Graphs", "Constant Propagation, Common Subexpression Elimination", "Liveness Analysis & Compiler Design GATE PYQs"], hours: "4h (Holiday extended study - Sankranti)", isSunday: false },

  // --- BLACKOUT 2: JAN 15 - JAN 27 (College Sem 2 Mid-1 Exams) ---

  // --- PHASE 3: FINAL REVISION & MOCK SPRINT (JAN 28 - FEB 5) ---
  { date: "2027-01-28", subject: "Digital Logic", title: "Final Revision Sprint - Digital Logic & COA", subtopics: ["Formula Sheet & Trap Points Review for DL & COA", "High-yield PYQ Retest", "Pipeline hazard & Cache mapping formula verification"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-29", subject: "Programming & Data Structures", title: "Final Revision Sprint - PDS & Algorithms", subtopics: ["C pointer trick questions rapid solve", "Tree traversal & Graph algorithm time complexities", "Dynamic Programming standard patterns review"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-30", subject: "Operating Systems", title: "Final Revision Sprint - OS & Databases", subtopics: ["Page table & Semaphore formula review", "Normal Forms & Transaction serializability test", "B+ Tree capacity calculations practice"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-01-31", subject: "Computer Networks", title: "Final Revision Sprint - Networks, TOC & Compiler", subtopics: ["IP Subnetting & TCP congestion window review", "Undecidability table & Grammar parsing tables review", "Full 3-Hour Final Mock Test #2"], hours: "5h (Sunday Intensive)", isSunday: true },
  { date: "2027-02-01", subject: "Engineering Mathematics", title: "Final Math Revision - All 4 Math Subjects", subtopics: ["Linear Algebra: Rank, Eigenvalues, LU", "Calculus: Maxima/Minima, Limits", "Probability: Bayes theorem, Distributions", "Discrete Math: Logic, Hasse diagrams, Recurrence"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-02-02", subject: "General Aptitude", title: "Final Aptitude & Numerical Shortcuts", subtopics: ["Spatial reasoning shape rotation practice", "Quantitative formulas & ratio shortcuts", "Verbal accuracy check"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-02-03", subject: "Algorithms", title: "Targeted Weak Area Formula Review", subtopics: ["Reviewing all past bookmark errors", "Formula sheet final read-through", "Confidence building problem solving"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-02-04", subject: "General Aptitude", title: "Light Formula Scanning & Admit Card Check", subtopics: ["Quick 1-hour scan of short notes", "Organizing Admit Card, ID card, stationary", "Calming mind"], hours: "2h (8:30-10:30 PM)", isSunday: false },
  { date: "2027-02-05", subject: "General Aptitude", title: "Pre-Exam Rest & Final Mindset", subtopics: ["Zero heavy study", "Light walk & early dinner", "Sleep early for peak performance! 🎯"], hours: "1h (Relax & Rest)", isSunday: false }
];
