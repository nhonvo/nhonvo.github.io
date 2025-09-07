---
title: "Bit Manipulation"
description: "Understand basic bitwise operators (AND, OR, XOR, NOT, shifts). Know their use cases for efficient problem-solving, such as finding a missing number, checking for powers of two, or managing sets of flags."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Bit Manipulation"]
---

### Mind Map Summary

- **Topic**: Bit Manipulation
- **Bitwise Operators**:
    - **AND (`&`)**: Returns 1 if both bits are 1, otherwise 0.
    - **OR (`|`)**: Returns 1 if at least one bit is 1, otherwise 0.
    - **XOR (`^`)**: Returns 1 if the bits are different, otherwise 0.
    - **NOT (`~`)**: Inverts the bits.
    - **Left Shift (`<<`)**: Shifts the bits to the left, filling the empty spaces with 0s.
    - **Right Shift (`>>`)**: Shifts the bits to the right. The sign bit is used to fill the empty spaces (arithmetic shift).
- **Use Cases**:
    - **Finding a Missing Number**: Use XOR to find the missing number in an array.
    - **Checking for Powers of Two**: A number is a power of two if `n & (n - 1) == 0`.
    - **Managing Sets of Flags**: Use a single integer to represent a set of boolean flags.

### Practice Exercise

Given an array where every element appears twice except for one, find the single element using XOR. Check if a number is a power of two using bitwise operators. Count the number of set bits (1s) in an integer.

### Answer

**1. Single Number:**

```csharp
public int SingleNumber(int[] nums) {
    int res = 0;
    foreach (int num in nums) {
        res ^= num;
    }
    return res;
}
```

**2. Power of Two:**

```csharp
public bool IsPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}
```

**3. Number of 1 Bits (Hamming Weight):**

```csharp
public int HammingWeight(uint n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}
```
