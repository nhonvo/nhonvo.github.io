---
title: "High-Performance .NET with Span<T> and Memory<T>"
description: "Eliminate heap allocations. Master Span<T> and Memory<T> to build ultra-fast .NET applications with zero-copy data processing."
pubDate: "9 7 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Performance Tuning",
    "Memory Management",
    "Span<T>",
    "Memory<T>",
    "Advanced .NET",
  ]
---

## The Allocation Nightmare

In traditional C#, operations like `string.Substring()` or `array.Clone()` create **new copies** of data on the Managed Heap. In high-throughput systems (like web servers or data parsers), these millions of tiny allocations lead to frequent **Garbage Collection (GC) pauses**, killing performance.

`Span<T>` and `Memory<T>` solve this by providing a "View" into existing memory without copying it.

---

## 1. Span<T>: The Stack-Only Powerhouse

`Span<T>` is a `ref struct`. It is a pointer-like view over a contiguous block of memory (stack, heap, or unmanaged).

### Rules of Span<T>

- **Stack-Only**: It cannot be stored on the heap (e.g., as a field in a class).
- **No Async**: It cannot be used in `async` methods because those methods might be suspended and moved to the heap.
- **Speed**: Access is as fast as a raw array but with full type safety.

```csharp
ReadOnlySpan<char> source = "Hello, World".AsSpan();
ReadOnlySpan<char> slice = source.Slice(0, 5); // No allocation! Result is "Hello"
```

---

## 2. Memory<T>: The Heap-Safe Companion

`Memory<T>` is a struct that can live on the heap. It is the safe alternative to `Span<T>` when you need to store the "view" or use it in `async` workflows.

### When to use Memory<T>

- Storing a slice of data as a field in a class.
- Passing a slice of data to an `async Task` method.
- You can always get a `Span<T>` from a `Memory<T>` using the `.Span` property.

---

## Technical Comparison

| Feature              | `Span<T>`                 | `Memory<T>`            |
| :------------------- | :------------------------ | :--------------------- |
| **Location**         | Stack-only (`ref struct`) | Stack or Heap (Struct) |
| **Async Support**    | ❌ No                     | ✅ Yes                 |
| **Generics Support** | ✅ Yes                    | ✅ Yes (but fewer)     |
| **Performance**      | 🚀 Maximum                | ⚡ High                |

---

## Practice Exercise

Write a performance-optimized method to parse a protocol string formatted as `[KEY:VALUE]`. Use `ReadOnlySpan<char>` to avoid any allocations during parsing.

---

## Answer

### Optimized Parser logic

```csharp
public static void ParseProtocol(string input)
{
    // Convert string to a 'view' without copying
    ReadOnlySpan<char> span = input.AsSpan();

    // Find the colon separator
    int colonIndex = span.IndexOf(':');
    if (colonIndex == -1) return;

    // Slice the key and value (still zero allocations)
    ReadOnlySpan<char> key = span.Slice(1, colonIndex - 1);
    ReadOnlySpan<char> value = span.Slice(colonIndex + 1, span.Length - colonIndex - 2);

    // Business logic: only allocate strings IF needed for external APIs
    if (key.Equals("STATUS", StringComparison.Ordinal))
    {
        ProcessStatus(value);
    }
}
```

### Why This Architecture Works

1.  **Zero-Copy**: We extracted a `key` and a `value` from a string without calling `.Substring()`. If we did this for 1 million strings, we would save **2 million heap allocations**.
2.  **Pointer-like Speed**: Under the hood, `Span` is essentially a pointer and a length. It bypasses the overhead of standard object management.
3.  **Safety**: Unlike C++ pointers, `Span` checks boundaries. You cannot read past the length of the slice, preventing buffer overflows.

## Summary

`Span<T>` is the single most important performance feature added to modern .NET.

- Use **Span** for high-speed local processing.
- Use **Memory** for async methods and storage.
- Always prefer `AsSpan()` over `.Substring()` when parsing text or binary data.
