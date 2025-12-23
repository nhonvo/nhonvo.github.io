---
title: "IAsyncEnumerable & Streaming APIs"
description: "Process massive datasets without exhausting memory. Master asynchronous streaming in .NET using IAsyncEnumerable and C# yield return."
pubDate: "9 7 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Asynchronous Programming",
    "Performance Tuning",
    "Streaming",
    "API Design",
    "Backend Development",
    "Architecture",
  ]
---

## What is IAsyncEnumerable?

Introduced in C# 8, `IAsyncEnumerable<T>` allows for the asynchronous iteration over a sequence of data.

Traditionally, to return multiple items asynchronously, you had to wait for **all** items to be ready, buffer them into a `List<T>`, and then return that list. This is memory-intensive and creates a "wait for everything" user experience.

With `IAsyncEnumerable`, you can "yield" items to the caller as soon as they are available, significantly reducing the **Time to First Byte (TTFB)**.

---

## Task vs. IAsyncEnumerable

- **`Task<List<T>>`**: Server fetches $10,000$ records, stores them in RAM, then sends the block. The client waits until the last record is ready.
- **`IAsyncEnumerable<T>`**: Server fetches record $1$ and sends it. While the client processes $1$, the server fetches $2$. RAM usage remains constant regardless of the dataset size.

---

## Technical Implementation

### 1. The Producer (`yield return`)

Use the `yield return` keyword inside an `async` method to push items to the stream one by one.

```csharp
public async IAsyncEnumerable<string> GetLargeDatasetAsync()
{
    foreach (var id in _ids)
    {
        var data = await _service.FetchAsync(id);
        yield return data.Value; // Sent to consumer immediately
    }
}
```

### 2. The Consumer (`await foreach`)

To consume an async stream, use the `await foreach` loop pattern.

```csharp
await foreach (var item in service.GetLargeDatasetAsync())
{
    Console.WriteLine($"Processed: {item}");
}
```

---

## Practical Application: Streaming Web APIs

In ASP.NET Core, returning an `IAsyncEnumerable` from a controller action results in the framework automatically streaming the results as a JSON array.

### Practice Exercise

Implement a streaming endpoint that serves financial logs and a client that reads them with low memory usage.

---

## Answer

### 1. The Streaming Controller

```csharp
[HttpGet("logs")]
public async IAsyncEnumerable<LogEntry> StreamLogs()
{
    var logs = _db.Logs.AsAsyncEnumerable();
    await foreach (var log in logs)
    {
        yield return log;
    }
}
```

### 2. The Efficient Client

```csharp
using var response = await _http.GetAsync("api/logs", HttpCompletionOption.ResponseHeadersRead);
var stream = await response.Content.ReadFromJsonAsAsyncEnumerable<LogEntry>();

await foreach (var log in stream)
{
    Process(log); // Memory stays low even for 1 million logs
}
```

### Why This Architecture Works

1.  **Low Memory Footprint**: Crucial for microservices in constrained environments (Kubernetes/Docker). You don't need a $100$MB buffer to send $100$MB of data.
2.  **Responsiveness**: The UI starts updating as soon as the first packet arrives, rather than waiting for the entire request to complete.
3.  **Non-Blocking**: It leverages same non-blocking I/O as standard async/await, keeping the server's thread pool available for other requests.

## Summary

`IAsyncEnumerable` is the standard for modern .NET data processing. By adopting a **streaming-first** mindset, you ensure your applications are resilient to large data spikes and provide the best possible performance for your end-users.
