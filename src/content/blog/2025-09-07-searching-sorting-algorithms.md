---
title: "Searching & Sorting Algorithms"
description: "From Binary Search to Quick Sort. Master the complexity, trade-offs, and C# implementations of the most fundamental algorithms in Computer Science."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Searching",
    "Sorting",
    "Complexity Analysis",
    "C#",
    "LeetCode",
    "Binary Search",
  ]
---

## Why Sorting Matters

Sorting is often the first step in optimizing complex problems. Many $O(n^2)$ problems can be reduced to $O(n \log n)$ by simply sorting the input first.

---

## Technical Comparison of Sorting Algorithms

| Algorithm          | Average Time  | Space       | Stable? | Key Feature                                                      |
| :----------------- | :------------ | :---------- | :------ | :--------------------------------------------------------------- |
| **Bubble Sort**    | $O(n^2)$      | $O(1)$      | Yes     | Simplest to implement, strictly for educational use.             |
| **Insertion Sort** | $O(n^2)$      | $O(1)$      | Yes     | Fast for small datasets or nearly-sorted data.                   |
| **Merge Sort**     | $O(n \log n)$ | $O(n)$      | Yes     | Consistent performance, but requires extra memory.               |
| **Quick Sort**     | $O(n \log n)$ | $O(\log n)$ | No      | Memory-efficient and usually the fastest in practice.            |
| **Radix Sort**     | $O(nk)$       | $O(n+k)$    | Yes     | Non-comparative sorting for integers with specific digit ranges. |

---

## Searching: The Power of Divide and Conquer

### Binary Search ($O(\log n)$ Time)

If an array is sorted, Binary Search is the definitive algorithm. By cutting the search area in half with each comparison, it can find an element in a list of 1 million items in just **20 steps**.

---

## Practice Exercise

1.  **Merge Sort**: Implementation with the `Merge` helper.
2.  **Quick Sort**: Implementation using the `Partition` logic.
3.  **Search in Rotated Sorted Array**: Find a target in an array that has been rotated (e.g., `[4, 5, 6, 7, 0, 1, 2]`).

---

## Answer

### 1. Merge Sort ($O(n \log n)$ Time, $O(n)$ Space)

```csharp
public void MergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        MergeSort(arr, left, mid);
        MergeSort(arr, mid + 1, right);
        Merge(arr, left, mid, right);
    }
}

private void Merge(int[] arr, int left, int mid, int right) {
    int[] temp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    Array.Copy(temp, 0, arr, left, temp.Length);
}
```

### 2. Quick Sort ($O(n \log n)$ Avg Time, $O(1)$ Extra Space)

```csharp
public void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = Partition(arr, low, high);
        QuickSort(arr, low, pivotIndex - 1);
        QuickSort(arr, pivotIndex + 1, high);
    }
}

private int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            (arr[i], arr[j]) = (arr[j], arr[i]); // Swap
        }
    }
    (arr[i + 1], arr[high]) = (arr[high], arr[i + 1]);
    return i + 1;
}
```

### 3. Search in Rotated Array ($O(\log n)$ Time)

```csharp
public int Search(int[] nums, int target) {
    int low = 0, high = nums.Length - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;

        if (nums[low] <= nums[mid]) { // Left half is sorted
            if (target >= nums[low] && target < nums[mid]) high = mid - 1;
            else low = mid + 1;
        } else { // Right half is sorted
            if (target > nums[mid] && target <= nums[high]) low = mid + 1;
            else high = mid - 1;
        }
    }
    return -1;
}
```

## Summary

- When space is a concern, use **Quick Sort**.
- When stability is required, use **Merge Sort**.
- If your data is nearly sorted, **Insertion Sort** is actually very efficient.
- And remember: **Binary Search** is your go-to for $O(\log n)$ efficiency, provided you have a sorted input.
