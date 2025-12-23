---
title: "HttpClientFactory for Resilient HTTP Requests"
description: "Master high-performance service-to-service communication. Learn how HttpClientFactory solves socket exhaustion and integrates with Polly for enterprise-grade resilience."
pubDate: "9 7 2025"
published: true
tags:
  [
    ".NET",
    "HttpClient",
    "Microservices",
    "Polly",
    "Resilience",
    "ASP.NET Core",
    "Backend Development",
    "Architecture",
  ]
---

## The Problem with `new HttpClient()`

In early .NET development, developers often instantiated `HttpClient` inside a `using` block. This leads to two critical problems:

1.  **Socket Exhaustion**: Even after disposal, the underlying socket remains in a `TIME_WAIT` state for minutes. High-traffic apps can quickly run out of ports, causing `SocketException`.
2.  **DNS Updates**: If you use a `static` client to solve socket exhaustion, it won't respect DNS changes (e.g., during a deployment) because the connection is held open indefinitely to the original IP.

`IHttpClientFactory` solves both by managing the lifetime of the underlying **HttpClientHandler**. It pools handlers to prevent socket leaks while rotating them to ensure DNS changes are respected.

---

## Pattern: Typed Clients

Typed Clients are the gold standard for microservice communication. They encapsulate all API-specific logic (base URL, headers, JSON serialization) into a single, injectable service.

```csharp
public class PaymentService
{
    private readonly HttpClient _http;

    public PaymentService(HttpClient http)
    {
        _http = http; // This client is pre-configured via DI
    }

    public async Task ProcessPayment(PaymentRequest req)
    {
        var response = await _http.PostAsJsonAsync("/payments", req);
        response.EnsureSuccessStatusCode();
    }
}
```

---

## Resilience with Polly

**Polly** is a .NET resilience library. When paired with `HttpClientFactory`, you can define policies like **Retry** and **Circuit Breaker** declaratively in `Program.cs`.

### 1. Wait and Retry (Exponential Backoff)

Instead of retrying instantly, we wait longer between each attempt ($2^1, 2^2, 2^3$ seconds). This prevents "hammering" a struggling downstream service.

### 2. Circuit Breaker

If a service fails repeatedly, the circuit "trips" and stops all requests immediately. This saves your resources and gives the downstream service time to recover.

---

## Practice Exercise

Configure a Typed Client for `ExternalApiService` that retries $3$ times with exponential backoff for transient errors ($5$xx and $408$ status codes).

---

## Answer

### 1. Registration in `Program.cs`

```csharp
using Polly;
using Polly.Extensions.Http;

builder.Services.AddHttpClient<ExternalApiService>(client =>
{
    client.BaseAddress = new Uri("https://api.external.com/");
    client.Timeout = TimeSpan.FromSeconds(5);
})
.AddPolicyHandler(GetRetryPolicy());

static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
{
    return HttpPolicyExtensions
        .HandleTransientHttpError() // Handles 5xx, 408, and network failures
        .WaitAndRetryAsync(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));
}
```

### Why This Architecture Works

1.  **Fault Tolerance**: Your application won't crash just because a third-party API had a 1-second blip in connectivity.
2.  **Clean Code**: The logic for "how many times to retry" is kept in the configuration layer (`Program.cs`), leaving your business services focused on business logic.
3.  **Performance**: Handler pooling ensures that your application utilizes system resources efficiently, allowing it to handle thousands of concurrent requests without leaking sockets.

## Summary

`IHttpClientFactory` is more than a convenience; it's a prerequisite for building reliable, production-ready distributed systems in .NET. By combining it with **Polly**, you transform a fragile HTTP call into a resilient communication channel.
