---
title: "Greedy Algorithms"
description: "Learn the 'greedy' heuristic: choosing the local optimum to reach the global target. Understand why it works for Dijkstra's but fails for general Coin Change."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Greedy Algorithms",
    "Optimization",
    "Computer Science",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Greedy Algorithm?

A Greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the **locally optimal choice** at each stage with the hope of finding a global optimum.

It is generally faster and more intuitive than Dynamic Programming, but it only works if the problem satisfies two properties:

1.  **Greedy Choice Property**: A global optimum can be reached by selecting the local optimum at each step.
2.  **Optimal Substructure**: An optimal solution to the problem contains optimal solutions to its subproblems.

---

## The Greedy vs. DP Trade-off

Greedy algorithms are often $O(N)$ or $O(N \log N)$, making them extremely efficient. However, because they never "revisit" a decision, they can fail for problems where the "obvious" choice leads to a dead end.

### Example: Coin Change

- **Scenario**: Return change for $6$ using coins $\{1, 3, 4\}$.
- **Greedy approach**:
  - Take the largest coin ($4$). Remaining: $2$.
  - Take two $1$s.
  - **Total: 3 coins.**
- **Optimal (DP) approach**:
  - Take two $3$s.
  - **Total: 2 coins.**

---

## Practice Exercise

1.  **Activity Selection**: Given start and finish times of activities, find the maximum number you can perform.
2.  **Fractional Knapsack**: Solve the knapsack problem where you can take pieces of items.
3.  **Jump Game**: Determine if you can reach the last index of an array.

---

## Answer

### 1. Activity Selection ($O(N \log N)$ Time)

The greedy strategy is to always pick the activity that **finishes earliest**, as this leaves the most time for subsequent activities.

```csharp
public int MaxActivities(int[] start, int[] end) {
    var activities = start.Zip(end, (s, e) => (s, e)).OrderBy(x => x.e).ToList();
    int count = 1;
    int lastEnd = activities[0].e;

    for (int i = 1; i < activities.Count; i++) {
        if (activities[i].s >= lastEnd) {
            count++;
            lastEnd = activities[i].e;
        }
    }
    return count;
}
```

### 2. Fractional Knapsack ($O(N \log N)$ Time)

Maximize value by picking items with the highest **Value-to-Weight Ratio**.

```csharp
public double KnapsackValue(int[] val, int[] wt, int cap) {
    var items = val.Zip(wt, (v, w) => new { val = v, wt = w, ratio = (double)v/w })
                   .OrderByDescending(x => x.ratio).ToList();
    double totalValue = 0;
    foreach (var item in items) {
        if (cap >= item.wt) {
            cap -= item.wt;
            totalValue += item.val;
        } else {
            totalValue += item.ratio * cap;
            break;
        }
    }
    return totalValue;
}
```

### 3. Jump Game ($O(N)$ Time)

Maintain the "farthest reachable" index.

```csharp
public bool CanJump(int[] nums) {
    int farthest = 0;
    for (int i = 0; i < nums.Length; i++) {
        if (i > farthest) return false;
        farthest = Math.Max(farthest, i + nums[i]);
    }
    return true;
}
```

## Summary

Greedy algorithms are the "quick and dirty" path to optimization. They are perfect for problems like **Huffman Coding**, **Dijkstra's**, and **Minimum Spanning Trees**. However, always verify their accuracy—if a problem requires looking ahead to ensure global correctness, you likely need **Dynamic Programming**.
