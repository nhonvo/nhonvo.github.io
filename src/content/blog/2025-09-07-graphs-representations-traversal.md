---
title: "Graphs - Representations & Traversal"
description: "Understand adjacency list vs. adjacency matrix representations and their trade-offs. Be proficient in Breadth-First Search (BFS) for shortest path in unweighted graphs and Depth-First Search (DFS) for traversal and cycle detection."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Graphs", "Graph Traversal", "BFS", "DFS"]
---

### Mind Map Summary

- **Topic**: Graphs - Representations & Traversal
- **Representations**:
    - **Adjacency List**: An array of lists, where each list stores the neighbors of a vertex.
    - **Adjacency Matrix**: A 2D array where each element `(i, j)` is 1 if there is an edge from vertex `i` to vertex `j`, and 0 otherwise.
- **Trade-offs**:
    - **Adjacency List**: Space-efficient for sparse graphs, but slow to check for the existence of an edge.
    - **Adjacency Matrix**: Fast to check for the existence of an edge, but space-inefficient for sparse graphs.
- **Traversal**:
    - **Breadth-First Search (BFS)**: A traversal algorithm that explores the graph level by level. It is used to find the shortest path in an unweighted graph.
    - **Depth-First Search (DFS)**: A traversal algorithm that explores the graph as far as possible along each branch before backtracking. It is used for traversal and cycle detection.

### Practice Exercise

Implement BFS and DFS for a given graph. Clone a graph. Find the number of connected components in an undirected graph. Detect a cycle in a directed graph.

### Answer

**1. BFS and DFS:**

```csharp
// BFS
public void BFS(int s, int V, List<int>[] adj) {
    bool[] visited = new bool[V];
    Queue<int> queue = new Queue<int>();
    visited[s] = true;
    queue.Enqueue(s);
    while (queue.Count > 0) {
        s = queue.Dequeue();
        Console.Write(s + " ");
        foreach (int i in adj[s]) {
            if (!visited[i]) {
                visited[i] = true;
                queue.Enqueue(i);
            }
        }
    }
}

// DFS
public void DFSUtil(int v, bool[] visited, List<int>[] adj) {
    visited[v] = true;
    Console.Write(v + " ");
    foreach (int i in adj[v]) {
        if (!visited[i]) {
            DFSUtil(i, visited, adj);
        }
    }
}

public void DFS(int v, int V, List<int>[] adj) {
    bool[] visited = new bool[V];
    DFSUtil(v, visited, adj);
}
```

**2. Clone a Graph:**

```csharp
public Node CloneGraph(Node node) {
    if (node == null) return null;
    var map = new Dictionary<Node, Node>();
    var queue = new Queue<Node>();
    queue.Enqueue(node);
    map[node] = new Node(node.val, new List<Node>());
    while (queue.Count > 0) {
        var curr = queue.Dequeue();
        foreach (var neighbor in curr.neighbors) {
            if (!map.ContainsKey(neighbor)) {
                map[neighbor] = new Node(neighbor.val, new List<Node>());
                queue.Enqueue(neighbor);
            }
            map[curr].neighbors.Add(map[neighbor]);
        }
    }
    return map[node];
}
```

**3. Number of Connected Components:**

```csharp
public int CountComponents(int n, int[][] edges) {
    int count = 0;
    bool[] visited = new bool[n];
    List<int>[] adj = new List<int>[n];
    for (int i = 0; i < n; i++) adj[i] = new List<int>();
    foreach (var edge in edges) {
        adj[edge[0]].Add(edge[1]);
        adj[edge[1]].Add(edge[0]);
    }
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            count++;
            DFS(i, visited, adj);
        }
    }
    return count;
}
```

**4. Detect a Cycle in a Directed Graph:**

```csharp
public bool CanFinish(int numCourses, int[][] prerequisites) {
    List<int>[] adj = new List<int>[numCourses];
    for (int i = 0; i < numCourses; i++) adj[i] = new List<int>();
    int[] degree = new int[numCourses];
    foreach (var p in prerequisites) {
        adj[p[1]].Add(p[0]);
        degree[p[0]]++;
    }
    Queue<int> queue = new Queue<int>();
    for (int i = 0; i < numCourses; i++) {
        if (degree[i] == 0) queue.Enqueue(i);
    }
    int count = 0;
    while (queue.Count > 0) {
        int curr = queue.Dequeue();
        count++;
        foreach (int next in adj[curr]) {
            degree[next]--;
            if (degree[next] == 0) queue.Enqueue(next);
        }
    }
    return count == numCourses;
}
```
