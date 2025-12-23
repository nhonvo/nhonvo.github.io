---
title: "Heaps (Min-Heap, Max-Heap)"
description: "Master the fundamental data structure for Priority Queues. Learn how Heaps use arrays to represent complete binary trees and solve K-th element problems."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Heaps",
    "Priority Queue",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Heap?

A Heap is a specialized tree-based data structure that satisfies the **Heap Property**:

- **Min-Heap**: Each node is $\ge$ its parent. The smallest element is at the root.
- **Max-Heap**: Each node is $\le$ its parent. The largest element is at the root.

Heaps are **Complete Binary Trees**: every level is filled except possibly the last, which is filled from left to right.

### Array-Based Representation

Because it's a complete tree, we don't need pointers. We can map the nodes to an array:

- **Parent Index**: `(i - 1) / 2`
- **Left Child**: `2 * i + 1`
- **Right Child**: `2 * i + 2`

---

## Complexity Matrix

| Operation           | Complexity  | Description                                    |
| :------------------ | :---------- | :--------------------------------------------- |
| **Insert**          | $O(\log N)$ | Add to the end and "bubble up."                |
| **Extract Min/Max** | $O(\log N)$ | Swap root with last element and "bubble down." |
| **Peek**            | $O(1)$      | Access the root element at `array[0]`.         |
| **Build Heap**      | $O(N)$      | Convert an arbitrary array into a heap.        |

---

## Practice Exercise

1.  **K-th Largest Element**: Find the k-th largest element in an unsorted array using a heap in $O(N \log K)$ time.
2.  **Median from Stream**: Maintain the median of a stream of numbers as they arrive.

---

## Answer

### 1. K-th Largest Element (Min-Heap Approach)

By keeping a **Min-Heap** of size $K$, the root will always be the $K$-th largest element we've seen so far.

```csharp
public int FindKthLargest(int[] nums, int k) {
    // In .NET 6+, we have a built-in PriorityQueue
    var minHeap = new PriorityQueue<int, int>();

    foreach (int num in nums) {
        minHeap.Enqueue(num, num);
        if (minHeap.Count > k) {
            minHeap.Dequeue();
        }
    }

    return minHeap.Peek();
}
```

### 2. Median from Data Stream

Use two heaps:

- **Max-Heap** (left): Stores the smaller half of numbers.
- **Min-Heap** (right): Stores the larger half of numbers.

```csharp
public class MedianFinder {
    private PriorityQueue<int, int> large = new(); // Min-Heap
    private PriorityQueue<int, int> small = new(Comparer<int>.Create((a, b) => b - a)); // Max-Heap

    public void AddNum(int num) {
        small.Enqueue(num, num);
        int fromSmall = small.Dequeue();
        large.Enqueue(fromSmall, fromSmall);

        if (large.Count > small.Count) {
            int fromLarge = large.Dequeue();
            small.Enqueue(fromLarge, fromLarge);
        }
    }

    public double FindMedian() {
        if (small.Count > large.Count) return small.Peek();
        return (small.Peek() + large.Peek()) / 2.0;
    }
}
```

## Summary

Heaps are the engine behind **Priority Queues**. They are the optimal choice whenever you need to frequently access/remove the minimum or maximum element in a dynamic collection. While they aren't meant for general searching, their $O(\log N)$ update time makes them essential for algorithms like **Dijkstra's** and **Heapsort**.
