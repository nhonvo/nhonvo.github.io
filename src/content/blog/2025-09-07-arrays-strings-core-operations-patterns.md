---
title: "Arrays & Strings: Core Operations and Patterns"
description: "Master essential algorithmic patterns like Two Pointers, Sliding Window, and Prefix Sums to solve complex array and string problems with optimal complexity."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Arrays",
    "Strings",
    "Two Pointers",
    "Sliding Window",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## Why Patterns Matter

In algorithmic interviews and high-performance computing, the difference between an $O(n^2)$ and an $O(n)$ solution is often the application of a specific pattern. Arrays and Strings are the most common data structures, and mastering their core patterns is essential for any developer.

## Core Algorithmic Patterns

### 1. Two Pointers

- **Mechanism**: Use two indices (often `left` and `right`) to scan the array. One might move from the start and the other from the end, or both might move at different speeds.
- **Use Case**: Searching in sorted arrays, reversing strings, or finding pairs.

### 2. Sliding Window

- **Mechanism**: Maintain a sub-segment ("window") that moves over the dataset. The window can be fixed-size or variable.
- **Use Case**: Finding the longest substring with K distinct characters, or the maximum sum subarray of size K.

### 3. Prefix Sums

- **Mechanism**: Pre-compute an array where `prefix[i]` stores the sum of all elements from `0` to `i`.
- **Use Case**: Calculating the sum of any subarray in $O(1)$ time after $O(n)$ setup.

---

## Practice Exercise

1.  **Two Sum**: Find indices of two numbers that add up to a target.
2.  **Sorted Squares**: Given a sorted array (with negatives), return an array of their squares in sorted order.
3.  **Maximum Sum Subarray**: Find the max sum of any subarray of size `K`.

---

## Answer

### 1. Two Sum ($O(n)$ Time, $O(n)$ Space)

```csharp
public int[] TwoSum(int[] nums, int target) {
    var seen = new Dictionary<int, int>();
    for (int i = 0; i < nums.Length; i++) {
        int complement = target - nums[i];
        if (seen.ContainsKey(complement)) {
            return new int[] { seen[complement], i };
        }
        seen[nums[i]] = i;
    }
    return Array.Empty<int>();
}
```

### 2. Sorted Squares ($O(n)$ Two-Pointer approach)

```csharp
public int[] SortedSquares(int[] nums) {
    int n = nums.Length;
    int[] result = new int[n];
    int left = 0, right = n - 1;

    // Fill from largest to smallest
    for (int i = n - 1; i >= 0; i--) {
        if (Math.Abs(nums[left]) > Math.Abs(nums[right])) {
            result[i] = nums[left] * nums[left];
            left++;
        } else {
            result[i] = nums[right] * nums[right];
            right--;
        }
    }
    return result;
}
```

### 3. Max Sum Subarray of Size K ($O(n)$ Sliding Window)

```csharp
public int MaxSubarraySum(int[] nums, int k) {
    int maxSum = 0, currentWindowSum = 0;

    for (int i = 0; i < nums.Length; i++) {
        currentWindowSum += nums[i];

        // Once we hit window size, start sliding
        if (i >= k - 1) {
            maxSum = Math.Max(maxSum, currentWindowSum);
            currentWindowSum -= nums[i - (k - 1)]; // Remove the element exiting the window
        }
    }
    return maxSum;
}
```

## Summary

- **Two Pointers** reduce $O(n^2)$ nested loops to $O(n)$ linear scans.
- **Sliding Window** efficiently tracks ranges in dynamic datasets.
- **Prefix Sums** trade space for speed in range-query scenarios.

Always look for these patterns before settling for a "brute-force" nested loop solution.
