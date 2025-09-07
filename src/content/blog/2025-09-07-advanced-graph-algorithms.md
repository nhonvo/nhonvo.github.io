---
title: "Advanced Graph Algorithms"
description: "Understand Dijkstra's algorithm for shortest path in a weighted graph and topological sort for ordering tasks with dependencies. Be aware of algorithms like A* and Prim's/Kruskal's for Minimum Spanning Trees."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Graphs", "Dijkstra", "Topological Sort", "Minimum Spanning Tree"]
---

### Mind Map Summary

- **Topic**: Advanced Graph Algorithms
- **Core Concepts**:
    - **Dijkstra's Algorithm**: An algorithm for finding the shortest path between two nodes in a weighted graph.
    - **Topological Sort**: An algorithm for ordering the vertices in a directed acyclic graph (DAG) such that for every directed edge from vertex `u` to vertex `v`, `u` comes before `v` in the ordering.
    - **Minimum Spanning Tree (MST)**: A subset of the edges of a connected, edge-weighted undirected graph that connects all the vertices together, without any cycles and with the minimum possible total edge weight.
        - **Prim's Algorithm**: A greedy algorithm that finds an MST for a weighted undirected graph.
        - **Kruskal's Algorithm**: A greedy algorithm that finds an MST for a weighted undirected graph.
    - **A* Search Algorithm**: An informed search algorithm that is used to find the shortest path between two nodes in a graph.

### Practice Exercise

Implement Dijkstra's algorithm to find the shortest path between two nodes in a weighted graph. Given a list of courses and their prerequisites, find a valid order to take the courses (Topological Sort).

### Answer

**1. Dijkstra's Algorithm:**

```csharp
public int NetworkDelayTime(int[][] times, int n, int k) {
    var adj = new Dictionary<int, List<(int, int)>>();
    foreach (var time in times) {
        if (!adj.ContainsKey(time[0])) {
            adj[time[0]] = new List<(int, int)>();
        }
        adj[time[0]].Add((time[1], time[2]));
    }
    var dist = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dist[i] = int.MaxValue;
    }
    dist[k] = 0;
    var pq = new PriorityQueue<(int, int), int>();
    pq.Enqueue((k, 0), 0);
    while (pq.Count > 0) {
        var (u, d) = pq.Dequeue();
        if (d > dist[u]) continue;
        if (adj.ContainsKey(u)) {
            foreach (var (v, w) in adj[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.Enqueue((v, dist[v]), dist[v]);
                }
            }
        }
    }
    int maxDist = 0;
    for (int i = 1; i <= n; i++) {
        if (dist[i] == int.MaxValue) return -1;
        maxDist = Math.Max(maxDist, dist[i]);
    }
    return maxDist;
}
```

**2. Topological Sort:**

```csharp
public int[] FindOrder(int numCourses, int[][] prerequisites) {
    var adj = new List<int>[numCourses];
    for (int i = 0; i < numCourses; i++) adj[i] = new List<int>();
    var degree = new int[numCourses];
    foreach (var p in prerequisites) {
        adj[p[1]].Add(p[0]);
        degree[p[0]]++;
    }
    var queue = new Queue<int>();
    for (int i = 0; i < numCourses; i++) {
        if (degree[i] == 0) queue.Enqueue(i);
    }
    var res = new List<int>();
    while (queue.Count > 0) {
        int curr = queue.Dequeue();
        res.Add(curr);
        foreach (int next in adj[curr]) {
            degree[next]--;
            if (degree[next] == 0) queue.Enqueue(next);
        }
    }
    return res.Count == numCourses ? res.ToArray() : new int[0];
}
```
