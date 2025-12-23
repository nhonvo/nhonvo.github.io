---
title: "Advanced Graph Algorithms"
description: "Master Dijkstra's shortest path, Topological sorting for task dependencies, and Minimum Spanning Trees (Prim & Kruskal) for network optimization."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Graphs",
    "Dijkstra",
    "Topological Sort",
    "MST",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## Solving Complex Connectivity

While BFS and DFS are sufficient for simple traversal, many real-world problems (like finding the fastest GPS route or managing package dependencies) require more advanced graph algorithms.

---

## 1. Dijkstra's Algorithm (Shortest Path)

Dijkstra finds the shortest path from a source node to all other nodes in a **weighted graph**.

- **Constraint**: It does not work with negative edge weights.
- **Data Structure**: Uses a **Priority Queue** (Min-Heap) to always visit the "cheapest" next node.
- **Complexity**: $O((V+E) \log V)$.

---

## 2. Topological Sort (Dependency Resolution)

Topological Sort provides a linear ordering of vertices such that for every directed edge $u \rightarrow v$, node $u$ comes before node $v$.

- **Constraint**: Only works on **Directed Acyclic Graphs (DAGs)**.
- **Implementation**: **Kahn's Algorithm** (BFS-based) or DFS with a stack.
- **Use Case**: Build systems (e.g., MSBuild, Webpack), course prerequisites, and task scheduling.

---

## 3. Minimum Spanning Tree (MST)

An MST is a subset of edges that connects all vertices in an undirected graph with the **minimum total weight** and no cycles.

1.  **Prim's Algorithm**: Starts from a node and greedily expands to the nearest neighbor.
2.  **Kruskal's Algorithm**: Sorts all edges and adds the smallest one if it doesn't create a cycle (uses **Union-Find**).

---

## Practice Exercise

1.  **Dijkstra**: Calculate the minimum "Network Delay Time" for a signal to reach all nodes.
2.  **Topological Sort**: Given courses and prerequisites, return a valid order to complete them.

---

## Answer

### 1. Network Delay Time (Dijkstra)

```csharp
public int NetworkDelayTime(int[][] times, int n, int k) {
    var adj = new Dictionary<int, List<(int node, int weight)>>();
    foreach (var t in times) {
        if (!adj.ContainsKey(t[0])) adj[t[0]] = new List<(int, int)>();
        adj[t[0]].Add((t[1], t[2]));
    }

    var minTime = new Dictionary<int, int>();
    var pq = new PriorityQueue<int, int>();
    pq.Enqueue(k, 0);

    while (pq.Count > 0) {
        pq.TryDequeue(out int node, out int time);
        if (minTime.ContainsKey(node)) continue;
        minTime[node] = time;

        if (adj.ContainsKey(node)) {
            foreach (var neighbor in adj[node]) {
                if (!minTime.ContainsKey(neighbor.node)) {
                    pq.Enqueue(neighbor.node, time + neighbor.weight);
                }
            }
        }
    }

    return minTime.Count == n ? minTime.Values.Max() : -1;
}
```

### 2. Course Schedule (Topological Sort / Kahn's)

```csharp
public int[] FindOrder(int numCourses, int[][] prerequisites) {
    var inDegree = new int[numCourses];
    var adj = new List<int>[numCourses];
    for (int i = 0; i < numCourses; i++) adj[i] = new List<int>();

    foreach (var p in prerequisites) {
        adj[p[1]].Add(p[0]); // Destination, Source
        inDegree[p[0]]++;
    }

    var queue = new Queue<int>();
    for (int i = 0; i < numCourses; i++) {
        if (inDegree[i] == 0) queue.Enqueue(i);
    }

    var result = new List<int>();
    while (queue.Count > 0) {
        int curr = queue.Dequeue();
        result.Add(curr);
        foreach (int next in adj[curr]) {
            if (--inDegree[next] == 0) queue.Enqueue(next);
        }
    }

    return result.Count == numCourses ? result.ToArray() : Array.Empty<int>();
}
```

## Summary

Advanced graph algorithms turn interconnected data into actionable solutions.

- Use **Dijkstra** for routing and shortest path with weights.
- Use **Topological Sort** for ordering dependencies.
- Use **Prim/Kruskal** to find the most efficient way to link every node in a network.
- Always check for **Acyclicity** before applying Topological Sort.
