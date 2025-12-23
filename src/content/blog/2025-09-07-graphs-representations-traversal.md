---
title: "Graphs: Representations & Traversal"
description: "From social networks to Google Maps. Master the fundamental ways to represent graphs and the core algorithms for searching and traversing complex connectivity."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Graphs",
    "BFS",
    "DFS",
    "Computer Science",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Graph?

A Graph is a non-linear data structure consisting of **Vertices** (nodes) and **Edges** (links between nodes). Graphs can be **Directed** (one-way) or **Undirected** (two-way), and **Weighted** (edges have values) or **Unweighted**.

---

## Graph Representations

### 1. Adjacency List

An array where each index represents a vertex and stores a list of its neighbors.

- **Space**: $O(V + E)$
- **Best for**: Sparse graphs (most real-world graphs).

### 2. Adjacency Matrix

A 2D array where `matrix[i][j] = 1` indicates an edge exists.

- **Space**: $O(V^2)$
- **Best for**: Dense graphs or checking edge existence between two nodes in $O(1)$ time.

---

## Core Traversal Algorithms

### 1. Breadth-First Search (BFS)

Explores "layer by layer" using a **Queue**.

- **Strength**: Finds the **Shortest Path** in an unweighted graph.
- **Complexity**: $O(V + E)$.

### 2. Depth-First Search (DFS)

Explores as deep as possible before backtracking using a **Stack** (often via recursion).

- **Strength**: Pathfinding, **Cycle Detection**, and Topological Sorting.
- **Complexity**: $O(V + E)$.

---

## Practice Exercise

1.  **BFS & DFS**: Standard implementations for an adjacency list.
2.  **Clone Graph**: Create a deep copy of a directed graph.
3.  **Cycle Detection**: Determine if a directed graph contains a cycle (Course Schedule problem).

---

## Answer

### 1. Traversal Implementations

```csharp
public class GraphProcessor {
    // Breadth-First Search
    public void BFS(int start, List<int>[] adj) {
        var visited = new HashSet<int>();
        var queue = new Queue<int>();

        visited.Add(start);
        queue.Enqueue(start);

        while (queue.Count > 0) {
            int curr = queue.Dequeue();
            foreach (var next in adj[curr]) {
                if (visited.Add(next)) queue.Enqueue(next);
            }
        }
    }

    // Depth-First Search
    public void DFS(int curr, List<int>[] adj, HashSet<int> visited) {
        if (!visited.Add(curr)) return;
        foreach (var next in adj[curr]) {
            DFS(next, adj, visited);
        }
    }
}
```

### 2. Cycle Detection (Kahn's Algorithm)

Using the "In-degree" concept: if we can't visit all nodes, there must be a cycle.

```csharp
public bool HasCycle(int nodes, int[][] edges) {
    int[] inDegree = new int[nodes];
    var adj = new List<int>[nodes];
    for (int i = 0; i < nodes; i++) adj[i] = new List<int>();

    foreach (var edge in edges) {
        adj[edge[1]].Add(edge[0]);
        inDegree[edge[0]]++;
    }

    var queue = new Queue<int>();
    for (int i = 0; i < nodes; i++) if (inDegree[i] == 0) queue.Enqueue(i);

    int count = 0;
    while (queue.Count > 0) {
        int curr = queue.Dequeue();
        count++;
        foreach (int next in adj[curr]) {
            if (--inDegree[next] == 0) queue.Enqueue(next);
        }
    }
    return count != nodes;
}
```

## Summary

- Use **Adjacency Lists** for 95% of software engineering scenarios.
- Use **BFS** for finding the "nearest" neighbor or shortest path.
- Use **DFS** for exploring all possible paths or checking connectivity.
- **Complexity**: Both $O(V+E)$ time, as you visit every vertex and edge at most once.
