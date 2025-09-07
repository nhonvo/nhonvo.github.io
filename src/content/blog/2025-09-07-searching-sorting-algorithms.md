---
title: "Searching & Sorting Algorithms"
description: "Know the implementation and complexity of Bubble Sort, Insertion Sort, Merge Sort, Quick Sort, and Radix Sort. Deeply understand the trade-offs, especially for Quick Sort (pivot choice, in-place operation) and Merge Sort (space complexity). Master Binary Search."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Searching", "Sorting", "Binary Search", "Merge Sort", "Quick Sort"]
---

### Mind Map Summary

- **Topic**: Searching & Sorting Algorithms
- **Sorting Algorithms**:
    - **Bubble Sort**: O(n^2) time, O(1) space
    - **Insertion Sort**: O(n^2) time, O(1) space
    - **Merge Sort**: O(n log n) time, O(n) space
    - **Quick Sort**: O(n log n) average time, O(n^2) worst-case time, O(log n) space
    - **Radix Sort**: O(nk) time, O(n+k) space
- **Searching Algorithms**:
    - **Linear Search**: O(n) time, O(1) space
    - **Binary Search**: O(log n) time, O(1) space

### Practice Exercise

Implement Merge Sort and Quick Sort from scratch. Implement binary search on a sorted array. Given a rotated sorted array, find a target element.

### Answer

**1. Merge Sort:**

```csharp
public void MergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        MergeSort(arr, l, m);
        MergeSort(arr, m + 1, r);
        Merge(arr, l, m, r);
    }
}

private void Merge(int[] arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int[] L = new int[n1];
    int[] R = new int[n2];
    int i, j, k;
    for (i = 0; i < n1; ++i) L[i] = arr[l + i];
    for (j = 0; j < n2; ++j) R[j] = arr[m + 1 + j];
    i = 0; j = 0; k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
```

**2. Quick Sort:**

```csharp
public void QuickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = Partition(arr, low, high);
        QuickSort(arr, low, pi - 1);
        QuickSort(arr, pi + 1, high);
    }
}

private int Partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp1 = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp1;
    return i + 1;
}
```

**3. Binary Search:**

```csharp
public int BinarySearch(int[] arr, int l, int r, int x) {
    if (r >= l) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == x) return mid;
        if (arr[mid] > x) return BinarySearch(arr, l, mid - 1, x);
        return BinarySearch(arr, mid + 1, r, x);
    }
    return -1;
}
```

**4. Search in Rotated Sorted Array:**

```csharp
public int Search(int[] nums, int target) {
    int left = 0, right = nums.Length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}
```
