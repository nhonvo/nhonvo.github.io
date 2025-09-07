---
title: "IAsyncEnumerable & Streaming APIs"
description: "Explain how IAsyncEnumerable allows for efficient, non-blocking iteration over asynchronous data streams. Contrast this with returning a Task<IEnumerable<T>>."
pubDate: "Sep 07 2025"
published: true
tags: [".NET & C# Advanced", "Asynchronous Programming", "Streaming", "IAsyncEnumerable"]
---

### Mind Map Summary

- **Topic**: IAsyncEnumerable & Streaming APIs
- **Core Concepts**:
    - **`IAsyncEnumerable<T>`**: An interface that represents an asynchronous sequence of values. It allows you to iterate over a sequence of values that are generated asynchronously.
    - **`yield return`**: A C# feature that allows you to create an iterator that returns one value at a time.
    - **Streaming**: The process of sending and receiving data in a continuous flow, rather than all at once.
- **`IAsyncEnumerable<T>` vs. `Task<IEnumerable<T>>`**:
    - **`Task<IEnumerable<T>>`**: Returns a single task that completes when all the data is available. The entire collection is buffered in memory before it is returned.
    - **`IAsyncEnumerable<T>`**: Returns an asynchronous stream of data. The data is processed as it becomes available, without having to buffer the entire collection in memory.
- **Benefits of `IAsyncEnumerable<T>`**:
    - **Reduced Memory Usage**: Avoids buffering large amounts of data in memory.
    - **Improved Responsiveness**: The client can start processing the data as soon as the first chunk is available.
    - **More Scalable**: Can handle large datasets that would not fit in memory.

### Practice Exercise

Create an ASP.NET Core API endpoint that returns an `IAsyncEnumerable<string>`. The method should simulate fetching data in chunks (e.g., with `Task.Delay`) and `yield return` each chunk. Show how a client can consume this streaming response.

### Answer

**1. API Controller:**

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class DataController : ControllerBase
{
    [HttpGet]
    public async IAsyncEnumerable<string> Get()
    {
        for (int i = 0; i < 10; i++)
        {
            await Task.Delay(1000); // Simulate fetching data in chunks
            yield return $"Data chunk {i}";
        }
    }
}
```

**2. Client Console Application:**

```csharp
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        var client = new HttpClient();
        var response = await client.GetAsync("http://localhost:5000/data", HttpCompletionOption.ResponseHeadersRead);

        await foreach (var chunk in response.Content.ReadFromJsonAsAsyncEnumerable<string>())
        {
            System.Console.WriteLine(chunk);
        }
    }
}
```

**Explanation:**

-   The API controller returns an `IAsyncEnumerable<string>` and uses `yield return` to stream the data to the client.
-   The client uses `HttpCompletionOption.ResponseHeadersRead` to start processing the response as soon as the headers are available.
-   The client then uses `ReadFromJsonAsAsyncEnumerable` to consume the streaming response.
