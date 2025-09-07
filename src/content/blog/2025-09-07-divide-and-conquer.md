---
title: "Divide and Conquer"
description: "Understand how this paradigm breaks problems into smaller subproblems, solves them recursively, and combines the results. Recognize Merge Sort and Quick Sort as classic examples."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Divide and Conquer"]
---

### Mind Map Summary

- **Topic**: Divide and Conquer
- **Core Concept**: A problem-solving paradigm that involves breaking a problem into smaller subproblems, solving the subproblems recursively, and then combining the solutions to the subproblems to solve the original problem.
- **Steps**:
    1.  **Divide**: Break the problem into smaller subproblems.
    2.  **Conquer**: Solve the subproblems recursively.
    3.  **Combine**: Combine the solutions to the subproblems to solve the original problem.
- **Examples**: Merge Sort, Quick Sort, Binary Search.

### Practice Exercise

Find the maximum and minimum elements in an array using the divide and conquer approach. Implement Karatsuba's algorithm for fast multiplication of large numbers.

### Answer

**1. Find Maximum and Minimum Elements:**

```csharp
public (int, int) FindMinMax(int[] arr, int low, int high) {
    if (low == high) {
        return (arr[low], arr[low]);
    }
    if (high == low + 1) {
        return (Math.Min(arr[low], arr[high]), Math.Max(arr[low], arr[high]));
    }
    int mid = low + (high - low) / 2;
    var (min1, max1) = FindMinMax(arr, low, mid);
    var (min2, max2) = FindMinMax(arr, mid + 1, high);
    return (Math.Min(min1, min2), Math.Max(max1, max2));
}
```

**2. Karatsuba's Algorithm:**

```csharp
public long Karatsuba(long x, long y) {
    if (x < 10 || y < 10) {
        return x * y;
    }
    int n = Math.Max(x.ToString().Length, y.ToString().Length);
    int n2 = n / 2;
    long a = x / (long)Math.Pow(10, n2);
    long b = x % (long)Math.Pow(10, n2);
    long c = y / (long)Math.Pow(10, n2);
    long d = y % (long)Math.Pow(10, n2);
    long ac = Karatsuba(a, c);
    long bd = Karatsuba(b, d);
    long ad_plus_bc = Karatsuba(a + b, c + d) - ac - bd;
    return ac * (long)Math.Pow(10, 2 * n2) + (ad_plus_bc * (long)Math.Pow(10, n2)) + bd;
}
```
