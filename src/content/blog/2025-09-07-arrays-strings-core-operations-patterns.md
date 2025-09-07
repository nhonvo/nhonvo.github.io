---
title: "Arrays & Strings - Core Operations and Patterns"
description: "Focus on time/space complexity. Master patterns like Two Pointers, Sliding Window, and Prefix Sums for solving a wide range of problems efficiently."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Arrays", "Strings", "Two Pointers", "Sliding Window", "Prefix Sums"]
---

### Mind Map Summary

- **Topic**: Arrays & Strings - Core Operations and Patterns
- **Core Concepts**:
    - **Two Pointers**: A pattern where two pointers are used to iterate over an array or string in a single pass.
    - **Sliding Window**: A pattern where a window of a fixed or variable size is used to iterate over a portion of an array or string.
    - **Prefix Sums**: A pre-computation technique where the sum of all elements up to a given index is stored in an array. This allows for constant-time retrieval of the sum of any subarray.
- **Time and Space Complexity**: Always analyze the time and space complexity of your solutions.

### Practice Exercise

Implement the Two Sum problem. Given a sorted array, square each element and return the sorted result. Find the maximum sum of any contiguous subarray of size 'k' (Sliding Window).

### Answer

**1. Two Sum:**

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

**2. Sorted Squares:**

```csharp
// Time Complexity: O(n)
// Space Complexity: O(n)
public int[] SortedSquares(int[] nums) {
    int n = nums.Length;
    int[] result = new int[n];
    int left = 0;
    int right = n - 1;
    for (int i = n - 1; i >= 0; i--) {
        int square;
        if (Math.Abs(nums[left]) < Math.Abs(nums[right])) {
            square = nums[right];
            right--;
        } else {
            square = nums[left];
            left++;
        }
        result[i] = square * square;
    }
    return result;
}
```

**3. Maximum Sum Subarray of Size K:**

```csharp
// Time Complexity: O(n)
// Space Complexity: O(1)
public int FindMaxSumSubarray(int[] nums, int k) {
    int maxSum = 0;
    int windowSum = 0;
    int windowStart = 0;
    for (int windowEnd = 0; windowEnd < nums.Length; windowEnd++) {
        windowSum += nums[windowEnd];
        if (windowEnd >= k - 1) {
            maxSum = Math.Max(maxSum, windowSum);
            windowSum -= nums[windowStart];
            windowStart++;
        }
    }
    return maxSum;
}
```
