---
title: "Unsafe Code and Pointers"
description: "Understand the risks and specific use cases for unsafe code in C#. Learn about pointer arithmetic, memory pinning, and stack allocation."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Unsafe Code",
    "Pointers",
    "Memory Management",
    "Performance Optimization",
    "Interoperability",
    "Software Engineering",
  ]
---

## Mind Map Summary

- **Topic**: Unsafe Code and Pointers
- **Definition**: Code explicitly marked with the `unsafe` keyword that allows bypassing CLR type safety and memory safety checks to use pointers.
- **Key Concepts**:
  - **`unsafe` Context**: A block where pointer operations are permitted.
  - **Pointers (`*`)**: Variables storing memory addresses.
  - **`fixed` Statement**: Pins a managed object in memory so the Garbage Collector (GC) won't move it while a pointer is active.
  - **`stackalloc`**: Allocates memory on the stack (fast, no GC) rather than the heap.
  - **Interoperability (P/Invoke)**: Often required when calling C-style functions in native DLLs.
- **Benefits**:
  - Significant performance gains in low-level graphics or data parsing.
  - Direct hardware/OS interaction.
- **Risks**:
  - High risk of memory corruption and buffer overflows.
  - Bypasses built-in .NET security boundaries.
  - Harder to debug and maintain.

## Core Concepts

Unsafe code in C# is a powerful tool designed for performance-critical scenarios. It breaks the "managed" model where the runtime handles object lifetimes and bounds checking.

While it offers C++ like power, modern C# often provides safer alternatives. Features like `Span<T>` and `Memory<T>` provide nearly identical performance for array processing without needing raw pointers or the `unsafe` keyword.

## Practice Exercise

Write a C# function using an `unsafe` context to zero out an integer array using pointer arithmetic. Explain why this approach avoids overhead.

## Answer

### 1. Project Configuration

To use `unsafe` code, you must enable it in your `.csproj` file:

```xml
<PropertyGroup>
  <AllowUnsafeBlocks>true</AllowUnsafeBlocks>
</PropertyGroup>
```

### 2. Implementation: The Unsafe Zero

```csharp
using System;

public class UnsafeDemo
{
    // Function to zero out an array using pointers
    public static unsafe void ZeroArrayUnsafe(int[] array)
    {
        // 'fixed' prevents the GC from moving the array while we have a pointer to it
        fixed (int* ptr = array)
        {
            int* current = ptr;
            for (int i = 0; i < array.Length; i++)
            {
                *current = 0; // Set value at address to 0
                current++;    // Move pointer to the next integer (4 bytes)
            }
        }
    }

    public static void Main()
    {
        int[] data = { 10, 20, 30, 40, 50 };
        Console.WriteLine("Before: " + string.Join(", ", data));

        ZeroArrayUnsafe(data);

        Console.WriteLine("After:  " + string.Join(", ", data));
    }
}
```

### Why This Is Potentially Faster

1.  **Elimination of Bounds Checking**: In managed code, every `array[i]` access checks if `i < array.Length`. Inside an `unsafe` block, these checks are skipped.
2.  **No Type Checking**: The runtime assumes the pointer type is correct, avoiding overhead.
3.  **Direct Register Logic**: Pointer arithmetic maps very closely to CPU instructions (like `MOV` and `INC`), allowing the JIT to produce extremely tight machine code.

### Important: The Modern Standard (`Span<T>`)

Before using raw pointers, consider using `Span<T>`. It provides high performance and direct memory access while maintaining safety:

```csharp
// The safe, modern, and equally fast way
public void ZeroArraySafe(int[] array)
{
    new Span<int>(array).Clear();
}
```

**Recommendation**: Only use raw pointers for low-level interoperability with native C/C++ libraries or when `Span<T>` is strictly unavailable.
