---
title: "Heaps (Min-Heap, Max-Heap)"
description: "Understand the properties of a heap and how they are typically implemented using an array. Know their use cases for priority queues and finding the K-th smallest/largest element."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Heaps", "Priority Queues"]
---

### Mind Map Summary

- **Topic**: Heaps (Min-Heap, Max-Heap)
- **Properties**:
    - **Heap**: A complete binary tree where each node is smaller (Min-Heap) or larger (Max-Heap) than its children.
    - **Implementation**: Typically implemented using an array.
- **Use Cases**:
    - **Priority Queues**: Heaps are the ideal data structure for implementing priority queues.
    - **Finding K-th Smallest/Largest Element**: Heaps can be used to efficiently find the k-th smallest or largest element in an array.

### Practice Exercise

Implement a Min-Heap from scratch with `insert` and `extractMin` operations. Use a Min-Heap to find the 'K' largest elements in an array. Find the median from a data stream.

### Answer

**1. Implement a Min-Heap:**

```csharp
public class MinHeap {
    private List<int> heap = new List<int>();

    public void Insert(int val) {
        heap.Add(val);
        int i = heap.Count - 1;
        while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
            Swap(i, (i - 1) / 2);
            i = (i - 1) / 2;
        }
    }

    public int ExtractMin() {
        if (heap.Count == 0) throw new InvalidOperationException();
        int min = heap[0];
        heap[0] = heap[heap.Count - 1];
        heap.RemoveAt(heap.Count - 1);
        Heapify(0);
        return min;
    }

    private void Heapify(int i) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        int smallest = i;
        if (left < heap.Count && heap[left] < heap[smallest]) smallest = left;
        if (right < heap.Count && heap[right] < heap[smallest]) smallest = right;
        if (smallest != i) {
            Swap(i, smallest);
            Heapify(smallest);
        }
    }

    private void Swap(int i, int j) {
        int temp = heap[i];
        heap[i] = heap[j];
        heap[j] = temp;
    }
}
```

**2. Find the K Largest Elements in an Array:**

```csharp
public int FindKthLargest(int[] nums, int k) {
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

**3. Find Median from Data Stream:**

```csharp
public class MedianFinder {
    private PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
    private PriorityQueue<int, int> maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));

    public void AddNum(int num) {
        maxHeap.Enqueue(num, num);
        minHeap.Enqueue(maxHeap.Peek(), maxHeap.Peek());
        maxHeap.Dequeue();
        if (minHeap.Count > maxHeap.Count) {
            maxHeap.Enqueue(minHeap.Peek(), minHeap.Peek());
            minHeap.Dequeue();
        }
    }

    public double FindMedian() {
        if (maxHeap.Count > minHeap.Count) {
            return maxHeap.Peek();
        } else {
            return (maxHeap.Peek() + minHeap.Peek()) / 2.0;
        }
    }
}
```
