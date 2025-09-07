---
title: "Big O Notation & Complexity Analysis"
description: "This is the absolute foundation. Be able to analyze the time and space complexity of any algorithm you write or discuss. Understand O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n)."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Big O Notation", "Complexity Analysis"]
---

### Mind Map Summary

- **Topic**: Big O Notation & Complexity Analysis
- **Core Concepts**:
    - **Big O Notation**: A mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity.
    - **Time Complexity**: The amount of time that an algorithm takes to run as a function of the length of the input.
    - **Space Complexity**: The amount of memory that an algorithm needs to run as a function of the length of the input.
- **Common Complexities**:
    - **O(1)**: Constant time
    - **O(log n)**: Logarithmic time
    - **O(n)**: Linear time
    - **O(n log n)**: Log-linear time
    - **O(n^2)**: Quadratic time
    - **O(2^n)**: Exponential time

### Practice Exercise

For every DSA practice problem you solve, verbally and in code comments, analyze and state the time and space complexity of your solution. Explain the reasoning. Compare the complexity of brute-force vs. optimized solutions.

### Answer

**Problem:** Find the pair of numbers in an array that sum up to a given target.

**Brute-Force Solution:**

```csharp
// Time Complexity: O(n^2)
// Space Complexity: O(1)
public int[] TwoSum(int[] nums, int target) {
    for (int i = 0; i < nums.Length; i++) {
        for (int j = i + 1; j < nums.Length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[] { i, j };
            }
        }
    }
    return null;
}
```

**Optimized Solution:**

```csharp
// Time Complexity: O(n)
// Space Complexity: O(n)
public int[] TwoSum(int[] nums, int target) {
    var map = new Dictionary<int, int>();
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

**Reasoning:**

-   The brute-force solution has a time complexity of O(n^2) because it uses nested loops to iterate over the array.
-   The optimized solution has a time complexity of O(n) because it uses a hash map to store the numbers that have been seen so far. This allows us to find the complement of each number in constant time.
-   The optimized solution has a space complexity of O(n) because it uses a hash map to store the numbers in the array.
