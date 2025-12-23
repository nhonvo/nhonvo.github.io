---
title: "Hash Tables (Dictionary/HashMap)"
description: "The workhorse of modern software. Master the mechanics of hashing, collision resolution (chaining vs. open addressing), and why it offers near O(1) performance."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Hash Table",
    "Dictionary",
    "HashMap",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Hash Table?

A Hash Table (known as `Dictionary` in C# or `HashMap` in Java) is a data structure that provides near-constant time **$O(1)$** performance for search, insert, and delete operations. It maps **Keys** to **Values** using a **Hash Function**.

---

## Core Components

1.  **Hash Function**: Takes a key and converts it into a numeric index. A good function distributes keys uniformly to avoid collisions.
2.  **Buckets**: An underlying array where values are stored.
3.  **Collision**: Occurs when two different keys result in the same array index.

---

## Collision Resolution Strategies

### 1. Separate Chaining

Each bucket stores a **Linked List**. If two keys collide, the new entry is simply appended to the list at that index.

- **Pros**: The table never "fills up."
- **Cons**: Performance degrades to $O(N)$ if a bucket grows too long.

### 2. Open Addressing

If an index is taken, search for the next available slot in the array.

- **Linear Probing**: Check index $i+1$, then $i+2$...
- **Pros**: Better cache locality; no extra pointers.
- **Cons**: Suffers from "clustering" where groups of occupied slots grow together, slowing down searches.

---

## Performance Matrix

| Operation     | Average Case | Worst Case |
| :------------ | :----------- | :--------- |
| **Search**    | $O(1)$       | $O(N)$     |
| **Insertion** | $O(1)$       | $O(N)$     |
| **Deletion**  | $O(1)$       | $O(N)$     |

_Note: The worst case $O(N)$ only occurs during extreme collision scenarios or when the table must resize (re-hash)._

---

## Practice Exercise

1.  **First Unique Character**: Find the index of the first character in a string that does not repeat.
2.  **Two Sum**: Find two numbers in an array that add up to a target sum.

---

## Answer

### 1. First Unique Character ($O(N)$ Time)

```csharp
public int FirstUniqChar(string s) {
    var counts = new Dictionary<char, int>();
    foreach (char c in s) {
        counts[c] = counts.GetValueOrDefault(c) + 1;
    }

    for (int i = 0; i < s.Length; i++) {
        if (counts[s[i]] == 1) return i;
    }
    return -1;
}
```

### 2. Two Sum ($O(N)$ Time)

```csharp
public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>(); // Value -> Index
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (map.ContainsKey(complement)) {
            return new int[] { map[complement], i };
        }
        map[nums[i]] = i;
    }
    return null;
}
```

## Summary

Hash Tables are the single most important data structure for optimizing code. They trade a small amount of memory for **massive speed gains**, turning linear search problems into constant-time lookups. When using them, always remember that keys must be **Immutable** (or at least their hash code must never change) to ensure the data is retrievable.
