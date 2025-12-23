---
title: "Health Checks & Resilience (Polly)"
description: "Implement health checks and resilient communication patterns using Polly in .NET applications."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "Polly",
    "Resilience",
    "Health Checks",
    "Circuit Breaker",
    "Retries",
    "Microservices",
    "Reliability",
    "Fault Tolerance",
    "Cloud Native",
  ]
---

## Mind Map Summary

- **Health Checks**
  - **What**: A dedicated endpoint in your API (e.g., `/health`) that reports the application's status.
  - **Purpose**: To allow external monitoring systems (like load balancers or orchestrators) to determine if the application is healthy.
  - **Health Statuses**
    - `Healthy`: The application and critical dependencies are working.
    - `Degraded`: Non-critical dependency failure.
    - `Unhealthy`: Critical failure; app should be taken out of service.
  - **Setup**: Configured in `Program.cs` using `builder.Services.AddHealthChecks()`.
- **Resilience (Polly)**
  - **What**: A .NET library for handling transient (temporary) failures.
  - **Core Idea**: Wrap operations (like API calls) in policies.
  - **Common Policies**
    - **Retry**: Automatically retries failed operations.
    - **Circuit Breaker**: Stops calls to a struggling service to prevent cascading failures.
    - **Timeout**: Enforces a time limit.
    - **Fallback**: Provides a default value on failure.
  - **Integration**: Integrates with `HttpClientFactory` for seamless outgoing request resilience.

## Core Concepts

### 1. Health Checks

In modern, distributed systems, automated monitoring is essential. A health check endpoint provides a simple, standardized way for other systems to ask, "Are you okay?".

- **Liveness Probes**: Checks if the process is running. If this fails, the orchestrator might restart the container.
- **Readiness Probes**: Verifies dependencies (databases, APIs, etc.). If this fails, traffic is diverted until the service is ready.

### 2. Resilience and Polly

Distributed systems will inevitably experience transient failures. Networks are unreliable, services can be temporarily overloaded, and databases can have momentary hiccups. A resilient application simplifies these issues by using library-level logic to handle them.

- **Retry**: The simplest and most common policy. Handles transient faults by waiting a moment and trying again.
- **Circuit Breaker**: Prevents a failing service from being hammered by opening the path after a certain number of failures, failing immediately until the service matures again.

## Practice Exercise

Configure health checks for your API. Add a check for a dependency, like a database connection. Then, use Polly to wrap an `HttpClient` call in your service layer with a Retry policy to handle transient network failures.

## Answer (Health Checks & Polly Implementation in C#)

### 1. `Program.cs` - Configure Health Checks and Polly

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Polly;
using Polly.Extensions.Http;
using System;
using System.Net.Http;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

// --- Polly Retry Policy Setup ---
var retryPolicy = HttpPolicyExtensions
    .HandleTransientHttpError() // Handles 5xx status codes, 408, and HttpRequestException
    .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound)
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)));

// --- HttpClientFactory with Polly ---
services.AddHttpClient("MyApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
})
.AddPolicyHandler(retryPolicy);

// --- Health Check Setup ---
services.AddHealthChecks()
    .AddSqlServer(
        connectionString: configuration.GetConnectionString("DefaultConnection"),
        healthQuery: "SELECT 1;",
        name: "sql-database-check",
        failureStatus: Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy);

services.AddControllers();
var app = builder.Build();

app.MapHealthChecks("/health");
app.MapControllers();
app.Run();
```

### 2. A Service That Uses the Resilient HttpClient

```csharp
public class MyService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MyService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetDataFromApi()
    {
        // This client automatically includes the retry policy
        var client = _httpClientFactory.CreateClient("MyApiClient");

        var response = await client.GetStringAsync("data");
        return response;
    }
}
```

### Explanation

1. **Polly Policy**: We define a `retryPolicy` using exponential backoff (2s, 4s, 8s). This is a best practice to avoid "DDoS-ing" a struggling downstream service.
2. **HttpClientFactory Integration**: Using `.AddPolicyHandler(retryPolicy)` ensures all requests via this named client are resilient.
3. **Health Check Configuration**: We add a specific check for SQL Server. If the database is down, the `/health` endpoint will return a `503 Service Unavailable`.
4. **Resilience Awareness**: The service layer code remains clean. It simply calls the client, unaware that Polly is retrying failed calls behind the scenes. This is the power of Aspect-Oriented design in .NET.
