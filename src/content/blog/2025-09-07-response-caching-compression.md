---
title: "Response Caching & Compression"
description: "Optimize your API's throughput and bandwidth. Master the configuration of Response Caching and Gzip/Brotli Compression in ASP.NET Core."
pubDate: "9 7 2025"
published: true
tags:
  [
    ".NET",
    "ASP.NET Core",
    "Performance Tuning",
    "Caching",
    "Compression",
    "Web Development",
    "Backend Development",
    "Architecture",
  ]
---

## Performance is a Feature

In high-traffic applications, the fastest request is the one that never hits your business logic. By correctly implementing **Response Caching** and **Response Compression**, you can reduce server load by up to 90% and cut bandwidth costs significantly.

---

## 1. Response Caching

Response Caching adds HTTP headers to your responses, telling browsers, proxies, and the ASP.NET Core middleware how long a response should be considered "fresh."

### Key Headers

- `Cache-Control`: Specifies directives for caching mechanisms in both requests and responses.
- `Vary`: Tells the cache to store different versions of the response based on a header (e.g., `Accept-Encoding` or `User-Agent`).

### Middleware vs. Browser Caching

- **Browser Caching**: The client stores the data. Good for reducing repeat visits.
- **Middleware Caching**: The server stores the rendered HTML/JSON in its own RAM and serves it to **all** users, preventing the controller logic from running repeatedly.

---

## 2. Response Compression

Modern browsers support `gzip` and `br` (Brotli) compression. By enabling this in .NET, the server shrinks the JSON/HTML payload before sending it over the wire. Brotli typically offers 15-30% better compression than Gzip.

---

## Technical Implementation

### 1. Configuration in `Program.cs`

```csharp
using Microsoft.AspNetCore.ResponseCompression;

var builder = WebApplication.CreateBuilder(args);

// Add Services
builder.Services.AddResponseCaching();
builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true; // Use with caution (see CRIME/BREACH attacks)
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
});

var app = builder.Build();

// Order is important: Compression before Caching
app.UseResponseCompression();
app.UseResponseCaching();

app.MapControllers();
app.Run();
```

### 2. Using the Attribute

```csharp
[ApiController]
[Route("api/[controller]")]
public class CatalogController : ControllerBase
{
    [HttpGet]
    // Cache for 10 minutes, varying by the 'Accept-Language' header
    [ResponseCache(Duration = 600, VaryByHeader = "Accept-Language", Location = ResponseCacheLocation.Any)]
    public IActionResult GetProducts()
    {
        // Expensive DB operation
        return Ok(_db.Products.ToList());
    }
}
```

---

## Practice Exercise

Identify why your response might not be caching even with the `[ResponseCache]` attribute present.

---

## Answer

### Troubleshooting Common Caching Issues

1.  **Authorization Header**: By default, ASP.NET Core does **not** cache responses if an `Authorization` or `Set-Cookie` header is present (to prevent leaking private data to other users).
2.  **HTTP Method**: Only `GET` and `HEAD` requests are cacheable. `POST` or `PUT` will never be cached.
3.  **Middleware Order**: If `UseResponseCaching()` is placed after `UseStaticFiles()` or other terminal middleware, it will never execute.
4.  **Request Headers**: If the client sends `Cache-Control: no-cache`, the middleware respects and bypasses the cache. You can override this using `Cache-Control` directives in your code.

## Summary

Response caching and compression are low-effort, high-impact optimizations. Use **Brotli** for most payloads, and reserve **Response Caching** for endpoints that serve the same data to many users (like product lists or config settings). Always monitor your `Vary` headers to ensure you aren't creating a "cache explosion" that exhausts server memory.
