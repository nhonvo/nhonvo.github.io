---
title: "Bit Manipulation"
description: "Master low-level bitwise operations (AND, OR, XOR, NOT, Shifts) for high-performance computing, memory optimization, and competitive programming."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Bit Manipulation",
    "Performance Optimization",
    "C#",
    "Computer Science",
    "Low-Level Programming",
    "Complexity Analysis",
  ]
---

## Why Bit Manipulation?

Bit manipulation is the act of algorithmically manipulating bits or other pieces of data shorter than a word. It is incredibly efficient because bitwise operations are directly supported by the CPU and typically execute in a single clock cycle.

### Core Bitwise Operators

- **AND (`&`)**: `1 & 1 = 1`, otherwise `0`. Used to clear bits or check if a specific bit is set.
- **OR (`|`)**: `0 | 0 = 0`, otherwise `1`. Used to set specific bits.
- **XOR (`^`)**: `1 ^ 1 = 0`, `0 ^ 0 = 0`, `1 ^ 0 = 1`. Used for toggling bits and finding missing numbers (since $x \oplus x = 0$).
- **NOT (`~`)**: Flips all bits (`0` to `1` and vice versa).
- **Left Shift (`<<`)**: Multiplies a number by $2^n$.
- **Right Shift (`>>`)**: Divides a number by $2^n$.

---

## Essential Bit Hacks

| Operation         | Concept                        | Code                          |
| :---------------- | :----------------------------- | :---------------------------- |
| **Check if Odd**  | Is the last bit set?           | `(n & 1) != 0`                |
| **Power of Two**  | Does it have only one bit set? | `n > 0 && (n & (n - 1)) == 0` |
| **Get i-th Bit**  | Shift and check.               | `(n >> i) & 1`                |
| **Swap Numbers**  | In-place swap without temp.    | `a^=b; b^=a; a^=b;`           |
| **Clear Low Bit** | Turn off the rightmost '1'.    | `n = n & (n - 1)`             |

---

## Practice Exercise

1.  **Single Number**: In an array where every element appears twice except for one, find that one element.
2.  **Hamming Weight**: Count the number of set bits (1s) in a 32-bit integer.
3.  **Reverse Bits**: Reverse bits of a given 32-bit unsigned integer.

---

## Answer

### 1. Single Number ($O(n)$ Time, $O(1)$ Space)

```csharp
public int SingleNumber(int[] nums) {
    int result = 0;
    // XORing a number with itself results in 0.
    // Order doesn't matter, so only the single number remains.
    foreach (int num in nums) {
        result ^= num;
    }
    return result;
}
```

### 2. Hamming Weight (Brian Kernighan’s Algorithm)

Instead of checking every bit, we only loop as many times as there are '1's.

```csharp
public int HammingWeight(uint n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1); // Clears the least significant bit
        count++;
    }
    return count;
}
```

### 3. Power of Two

```csharp
public bool IsPowerOfTwo(int n) {
    // Powers of two (2, 4, 8, 16...) only have one bit set.
    return n > 0 && (n & (n - 1)) == 0;
}
```

## Summary

Bit manipulation is a hallmark of high-performance programming. While modern compilers optimize many arithmetic operations into bitwise ones, understanding these concepts allows you to:

1.  **Reduce Memory**: Store 32 booleans in a single `int` bitmask.
2.  **Optimize Search**: XOR patterns can solve specific "missing element" or "unique element" problems in linear time where hash tables would require extra memory.
3.  **Direct Hardware Control**: Essential for driver development, graphics programming, and low-level system design.
