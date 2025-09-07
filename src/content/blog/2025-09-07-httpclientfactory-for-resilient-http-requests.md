---
title: "HttpClientFactory for Resilient HTTP Requests"
description: "Explain the problems with new HttpClient() (socket exhaustion) and how HttpClientFactory solves them. Discuss how to use it to configure named or typed clients and integrate it with Polly for resilience patterns (Retry, Circuit Breaker)."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "HttpClientFactory", "Polly", "Resilience"]
---

### Mind Map Summary

- **Topic**: HttpClientFactory for Resilient HTTP Requests
- **Problems with `new HttpClient()`**:
    - **Socket Exhaustion**: Creating a new `HttpClient` for each request can exhaust the number of available sockets.
    - **DNS Changes**: `HttpClient` does not respect DNS changes, which can cause problems in dynamic environments.
- **`HttpClientFactory`**:
    - **Manages `HttpClient` instances**: Manages the lifetime of `HttpClient` instances to avoid the problems with `new HttpClient()`.
    - **Named and Typed Clients**: Allows you to configure named and typed clients with specific settings, such as base address and default headers.
    - **Integration with Polly**: Integrates with Polly to add resilience patterns, such as retry and circuit breaker.
- **Polly**: A .NET resilience and transient-fault-handling library that allows developers to express policies such as Retry, Circuit Breaker, Timeout, Bulkhead Isolation, and Fallback in a fluent and thread-safe manner.

### Practice Exercise

Use `HttpClientFactory` to create a typed client for an external API. Use the Polly extension to add a transient error handling policy that retries failed requests (HTTP 5xx or network errors) up to three times with an exponential backoff.

### Answer

**1. Typed Client:**

```csharp
public class MyApiClient
{
    private readonly HttpClient _httpClient;

    public MyApiClient(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> GetDataAsync()
    {
        var response = await _httpClient.GetAsync("/data");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadAsStringAsync();
    }
}
```

**2. Configure `HttpClientFactory` and Polly in `Program.cs`:**

```csharp
using Polly;
using Polly.Extensions.Http;

builder.Services.AddHttpClient<MyApiClient>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
})
.AddPolicyHandler(GetRetryPolicy());

static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
{
    return HttpPolicyExtensions
        .HandleTransientHttpError()
        .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
        .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));
}
```

**Explanation:**

-   We create a typed client `MyApiClient` that takes an `HttpClient` in its constructor.
-   We use `AddHttpClient<MyApiClient>()` to register the typed client with the `HttpClientFactory`.
-   We use `AddPolicyHandler()` to add a Polly policy to the client.
-   The policy handles transient HTTP errors (5xx and 408) and retries the request up to three times with an exponential backoff.
