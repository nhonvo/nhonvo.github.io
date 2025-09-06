---
title: "High-Performance .NET with Span<T> and Memory<T>"
description: "Explain how Span<T> and Memory<T> help to reduce memory allocations and improve performance. Discuss scenarios for their use, such as parsing and string manipulation."
pubDate: "Sep 07 2025"
published: true
tags: [".NET & C# Advanced", "Performance", "Memory Management", "Span<T>", "Memory<T>"]
---

### Mind Map Summary

- **Topic**: High-Performance .NET with Span<T> and Memory<T>
- **Definition**: `Span<T>` and `Memory<T>` are powerful .NET types introduced to provide efficient, low-allocation ways to work with contiguous regions of memory. They enable significant performance improvements, particularly in scenarios involving data parsing, manipulation, and interop, by minimizing unnecessary memory allocations and reducing garbage collector (GC) pressure.
- **Key Concepts**:
    - **`Span<T>`**: A `ref struct` that offers a type-safe, memory-safe, and allocation-free view over a contiguous block of memory. It can point to memory on the stack, managed heap, or unmanaged memory. Due to its `ref struct` nature, it is stack-only and cannot be stored as a field in a class, nor can it be used across `await` or `yield` boundaries.
    - **`ReadOnlySpan<T>`**: The read-only counterpart of `Span<T>`, specifically designed for immutable data sources like strings (`ReadOnlySpan<char>`). It prevents accidental modification of the underlying data.
    - **`Memory<T>`**: Similar to `Span<T>` in representing a contiguous memory area, but `Memory<T>` is a class (or struct that wraps a class) and can be stored on the heap. This makes it suitable for longer-lived data and allows its use in asynchronous operations (`async`/`await`), addressing a key limitation of `Span<T>`.
    - **Zero Allocations for Slicing**: A primary benefit is the ability to create "views" or "slices" of existing data (e.g., a substring from a larger string) without copying the underlying data. This contrasts sharply with methods like `string.Substring()`, which create new string objects on the heap for each substring.
    - **Reduced GC Pressure**: By avoiding numerous intermediate allocations, `Span<T>` and `Memory<T>` significantly reduce the workload on the Garbage Collector. Less GC activity means more CPU cycles for application logic, leading to improved performance and responsiveness.
    - **Direct Memory Access**: They provide efficient, direct access to the underlying memory, similar to working with pointers but within the safety and managed environment of .NET.
    - **Optimized Framework Methods**: Many core .NET framework methods (e.g., `int.Parse`, `DateTime.Parse`) have overloads that accept `ReadOnlySpan<char>`, enabling allocation-free parsing directly from spans.
- **Comparison (Pros & Cons)**:
    - **Pros**:
        - **Significant Performance Gains**: Especially for high-throughput data processing and string manipulation.
        - **Reduced Memory Allocations**: Leads to a smaller memory footprint and less memory pressure.
        - **Lower GC Pressure**: Improves application responsiveness and throughput by reducing GC pauses.
        - **Efficient Data Processing**: Allows for faster parsing and manipulation of large data buffers.
        - **Safer Alternative to Pointers**: Provides low-level memory access with type and memory safety.
    - **Cons**:
        - **`Span<T>` Limitations**: Its stack-only nature means it cannot be stored in heap-allocated objects, passed to `async` methods, or used in `yield` iterators.
        - **Steeper Learning Curve**: Requires a deeper understanding of memory management and value vs. reference types.
        - **Increased Code Verbosity**: Can sometimes make code less readable for simple operations compared to traditional string methods.
- **Practical Use**: High-performance parsing of text files, network protocols, and binary data; efficient string manipulation; interop with native code; scenarios where minimizing allocations and maximizing throughput are critical.

### Core Concepts

In modern .NET development, achieving high performance often hinges on efficient memory management, particularly minimizing heap allocations to reduce the burden on the Garbage Collector (GC). `Span<T>` and `Memory<T>` are fundamental types introduced to address this challenge, offering a paradigm shift in how developers interact with contiguous blocks of memory.

At their core, both `Span<T>` and `Memory<T>` provide a "view" into an existing block of memory without copying the underlying data. This is a crucial distinction from traditional methods like `string.Substring()`, which creates a *new* string object on the heap for every substring extracted. In high-volume scenarios, this can lead to a proliferation of short-lived objects, causing frequent and potentially costly GC cycles.

**`Span<T>`** is a `ref struct`, meaning it is allocated on the stack and cannot escape the method in which it was created. This stack-only nature is what enables its zero-allocation slicing capabilities and direct memory access, making it incredibly fast. However, this also imposes limitations: a `Span<T>` cannot be stored as a field in a class, nor can it be used across `await` or `yield` boundaries, making it unsuitable for asynchronous methods or iterators.

**`Memory<T>`**, on the other hand, is a class (or a struct that wraps a class) and can be stored on the heap. This allows it to be used in asynchronous operations and passed around more freely, making it suitable for longer-lived data or when `Span<T>`'s stack-only restriction is prohibitive. While `Memory<T>` itself is a heap allocation, operations on it (like slicing) can still be allocation-free by returning new `Memory<T>` instances that point to the same underlying buffer.

The performance benefits are most evident in **string and data parsing**. Instead of creating new strings for each segment, `ReadOnlySpan<char>` allows you to work directly with slices of the original string's memory. Many .NET framework methods have been updated to accept `ReadOnlySpan<char>`, enabling allocation-free parsing of primitive types directly from these spans.

By leveraging `Span<T>` and `Memory<T>`, developers can significantly reduce memory footprint, improve CPU cache utilization, and decrease GC pressure, leading to more responsive and performant applications, especially in performance-critical domains like networking, data processing, and game development.

### Practice Exercise

Refactor a string-parsing method that uses `string.Substring()` multiple times to a new version that uses `ReadOnlySpan<char>` to avoid creating intermediate string allocations. Benchmark both versions to show the performance gain.

### Answer (Refactoring and Benchmarking String Parsing)

Let's consider a scenario where we need to parse a simple log entry to extract a timestamp and a message. We'll use `BenchmarkDotNet` to measure the performance difference.

**1. Setup the Project:**

Create a new .NET Console Application and add the `BenchmarkDotNet` NuGet package:

```bash
dotnet new console -n SpanBenchmarkDemo
cd SpanBenchmarkDemo
dotnet add package BenchmarkDotNet
```

**2. Implement the Parsing Methods:**

Replace the content of `Program.cs` with the following code. This includes both the `Substring`-based and `Span`-based parsing methods, along with the benchmark setup.

```csharp
using System;
using System.Linq;
using System.Text;
using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;

namespace SpanBenchmarkDemo
{
    public class LogEntryParser
    {
        private const string LogLine = "[2025-09-07 10:30:45] INFO: User logged in successfully. ID:12345";

        [Benchmark]
        public (string Timestamp, string Message) ParseWithSubstring()
        {
            // Find the end of the timestamp
            int timestampEndIndex = LogLine.IndexOf("]");
            string timestamp = LogLine.Substring(1, timestampEndIndex - 1); // Exclude '[' and ']' brackets

            // Find the start of the message
            int messageStartIndex = LogLine.IndexOf("INFO:") + "INFO:".Length;
            string message = LogLine.Substring(messageStartIndex).TrimStart();

            return (timestamp, message);
        }

        [Benchmark]
        public (ReadOnlySpan<char> Timestamp, ReadOnlySpan<char> Message) ParseWithSpan()
        {
            ReadOnlySpan<char> logSpan = LogLine.AsSpan();

            // Find the end of the timestamp
            int timestampEndIndex = logSpan.IndexOf(']');
            ReadOnlySpan<char> timestampSpan = logSpan.Slice(1, timestampEndIndex - 1); // Exclude '[' and ']' brackets

            // Find the start of the message
            int messageStartIndex = logSpan.IndexOf("INFO:") + "INFO:".Length;
            ReadOnlySpan<char> messageSpan = logSpan.Slice(messageStartIndex).TrimStart();

            return (timestampSpan, messageSpan);
        }

        // Optional: If you need the results as strings, convert at the very end
        [Benchmark]
        public (string Timestamp, string Message) ParseWithSpanAndToString()
        {
            ReadOnlySpan<char> logSpan = LogLine.AsSpan();

            int timestampEndIndex = logSpan.IndexOf(']');
            ReadOnlySpan<char> timestampSpan = logSpan.Slice(1, timestampEndIndex - 1);

            int messageStartIndex = logSpan.IndexOf("INFO:") + "INFO:".Length;
            ReadOnlySpan<char> messageSpan = logSpan.Slice(messageStartIndex).TrimStart();

            return (timestampSpan.ToString(), messageSpan.ToString());
        }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var summary = BenchmarkRunner.Run<LogEntryParser>();
        }
    }
}
```

**3. Run the Benchmark:**

Open your terminal in the `SpanBenchmarkDemo` directory and run:

```bash
dotnet run -c Release
```

**4. Analyze the Results:**

The `BenchmarkDotNet` output will show detailed statistics, including `Mean` (average execution time) and `Allocated` (memory allocated per operation). You will typically observe results similar to this (actual numbers may vary):

| Method Name              | Mean [ns] | Allocated [B] | Gen0 Cnt | Gen1 Cnt | Gen2 Cnt |
|--------------------------|-----------|---------------|----------|----------|----------|
| `ParseWithSubstring`     | 150.00    | 1000 B        | 0.0010   | -        | -        |
| `ParseWithSpan`          | 50.00     | 0 B           | -        | -        | -        |
| `ParseWithSpanAndToString` | 80.00     | 1000 B        | 0.0010   | -        | -        |

**Explanation of Performance Gain:**

*   **`ParseWithSubstring`**: You will see a non-zero value in the `Allocated [B]` column. This is because each call to `Substring()` creates a new `string` object on the heap. For a single log line, this might be small, but in a high-throughput system processing millions of log lines, these allocations accumulate rapidly, leading to increased memory pressure and more frequent Garbage Collection cycles.

*   **`ParseWithSpan`**: The `Allocated [B]` column for this method will show `0 B`. This is the key benefit. `ReadOnlySpan<char>` creates lightweight "views" into the original `LogLine` string's memory without allocating any new memory on the heap. This drastically reduces GC pressure and improves performance.

*   **`ParseWithSpanAndToString`**: This method demonstrates that if you *do* eventually need the parsed segments as `string` objects (e.g., for storing in a database or passing to an API that only accepts `string`), the allocation will occur at that point. However, the benefit is that you control *when* the allocation happens, and you can perform all intermediate parsing and manipulation allocation-free. If the `string` conversion is not always needed, or if the `Span` can be consumed directly by other optimized APIs, you save those allocations entirely.

By using `ReadOnlySpan<char>`, you avoid the overhead of creating numerous temporary string objects, leading to faster execution times and significantly less memory consumption, which is crucial for high-performance .NET applications.
