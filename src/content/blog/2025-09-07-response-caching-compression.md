---
title: "Response Caching & Compression"
description: "Explain the difference between in-memory, distributed, and response caching. Discuss how to apply response caching profiles and how to configure response compression."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "Performance", "Caching", "Compression"]
---

### Mind Map Summary

- **Topic**: Response Caching & Compression
- **Core Concepts**:
    - **Response Caching**: The process of storing a copy of a response in a cache so that it can be served more quickly in the future.
    - **Response Compression**: The process of compressing the body of a response to reduce its size.
- **Types of Caching**:
    - **In-Memory Cache**: A cache that is stored in the memory of the web server.
    - **Distributed Cache**: A cache that is shared across multiple web servers.
- **Benefits**:
    - **Improved Performance**: Reduces the time it takes to serve a response.
    - **Reduced Bandwidth Usage**: Reduces the amount of data that is sent over the wire.
    - **Reduced Server Load**: Reduces the load on the web server.

### Practice Exercise

Add response compression to an ASP.NET Core API. Then, implement response caching on a `GET` endpoint that serves data that changes infrequently. Use attributes to set a cache profile and demonstrate that subsequent requests receive a cached response.

### Answer

**1. Configure Response Caching and Compression in `Program.cs`:**

```csharp
builder.Services.AddResponseCaching();
builder.Services.AddResponseCompression();

// ...

app.UseResponseCaching();
app.UseResponseCompression();
```

**2. Apply Response Caching to a Controller Action:**

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class DataController : ControllerBase
{
    [HttpGet]
    [ResponseCache(Duration = 60)]
    public IActionResult Get()
    {
        return Ok(DateTime.Now.ToString());
    }
}
```

**3. Demonstrate Caching and Compression:**

-   Run the application and make a `GET` request to the `/data` endpoint. The first request will be served from the controller, and the response will be compressed.
-   Make another `GET` request to the `/data` endpoint within 60 seconds. This time, the response will be served from the cache, and you will see the same timestamp as the first request.
