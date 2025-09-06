---
title: "High-Performance .NET with Span<T> and Memory<T>"
description: "Explain how Span<T> and Memory<T> help to reduce memory allocations and improve performance. Discuss scenarios for their use, such as parsing and string manipulation."
pubDate: "Sep 06 2025"
published: true
tags: [".NET & C# Advanced"]
---

### Practice Exercise

Refactor a string-parsing method that uses string.Substring() multiple times to a new version that uses ReadOnlySpan<char> to avoid creating intermediate string allocations. Benchmark both versions to show the performance gain.
