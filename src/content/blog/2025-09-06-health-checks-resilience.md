---
title: "Health Checks and Resilience (Polly)"
description: "Discuss patterns like Retry, Circuit Breaker, and how to implement health check endpoints."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Mind Map Summary

- **Health Checks**
  - **What**: A dedicated endpoint in your API (e.g., `/health`) that reports the application's status.
  - **Purpose**: To allow external monitoring systems (like load balancers or container orchestrators) to automatically determine if the application instance is healthy and able to handle requests.
  - **Health Statuses**:
    - `Healthy`: The application and its critical dependencies are working.
    - `Degraded`: A non-critical dependency is failing, but the app can still function.
    - `Unhealthy`: A critical dependency is failing. The app should be taken out of service or restarted.
  - **Setup**: Configured in `Program.cs` using `builder.Services.AddHealthChecks()`.
- **Resilience (Polly)**
  - **What**: A .NET library for handling transient (temporary) failures and making applications more robust.
  - **Core Idea**: Wrap your operations (like API calls) in policies that define how to handle specific exceptions or HTTP responses.
  - **Common Resilience Policies**:
    - **Retry**: Automatically retries a failed operation. Essential for handling temporary network glitches.
    - **Circuit Breaker**: After a certain number of failures, the "circuit opens," and further calls fail immediately for a set period. This prevents an application from hammering a struggling downstream service.
    - **Timeout**: Enforces a time limit on an operation.
    - **Fallback**: Provides a default value or action if an operation fails.
  - **Integration**: Polly integrates seamlessly with `HttpClientFactory` to apply policies to outgoing HTTP requests.

### Core Concepts

#### 1. Health Checks
In modern, distributed systems, automated monitoring is essential. A health check endpoint provides a simple, standardized way for other systems to ask, "Are you okay?". 
- **Liveness Probes**: A simple check to see if the application process is running and responsive. If this fails, the orchestrator (like Kubernetes) might restart the container.
- **Readiness Probes**: A more thorough check that includes verifying dependencies (databases, downstream APIs, etc.). If this fails, the orchestrator will not restart the instance, but it will stop sending it new traffic until it becomes ready again.
ASP.NET Core provides a rich framework for this. You can add checks for databases, message queues, or any custom dependency, and it will aggregate the results into a single health report.

#### 2. Resilience and Polly
Distributed systems will inevitably experience transient failures. Networks are unreliable, services can be temporarily overloaded, and databases can have momentary hiccups. A resilient application is one that can anticipate and gracefully handle these failures.

Polly is the de-facto library for resilience in .NET. It allows you to declaratively express resilience strategies.
- **Retry**: The simplest and most common policy. If an HTTP call fails with a `503 Service Unavailable`, you can configure Polly to wait a second and try again, perhaps up to three times. This handles most transient faults.
- **Circuit Breaker**: This is a critical pattern for preventing cascading failures. If a downstream service is failing, repeatedly retrying will only make the problem worse. The Circuit Breaker acts as a proxy. After a few failures, it "opens" the circuit and immediately fails any new requests without even trying to call the downstream service. After a configured delay, it enters a "Half-Open" state, allowing a single test request through. If it succeeds, the circuit closes and normal operation resumes. If it fails, the circuit remains open.

### Practice Exercise

Configure health checks for your API. Add a check for a dependency, like a database connection. Then, use Polly to wrap an `HttpClient` call in your service layer with a Retry policy to handle transient network failures.

### Answer

First, you need to add the required NuGet packages:
`dotnet add package Microsoft.Extensions.Http.Polly`
`dotnet add package AspNetCore.HealthChecks.SqlServer` (or the appropriate package for your database)

#### Code Example

**1. `Program.cs` - Configure Health Checks and Polly**

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
    .OrResult(msg => msg.StatusCode == System.Net.HttpStatusCode.NotFound) // Also retry on 404
    .WaitAndRetryAsync(3, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))); // Exponential backoff

// --- HttpClientFactory with Polly ---
services.AddHttpClient("MyApiClient", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
})
.AddPolicyHandler(retryPolicy);


// --- Health Check Setup ---
services.AddHealthChecks()
    // Add a health check for a SQL Server database
    .AddSqlServer(
        connectionString: configuration.GetConnectionString("DefaultConnection"),
        healthQuery: "SELECT 1;",
        name: "sql-database-check",
        failureStatus: Microsoft.Extensions.Diagnostics.HealthChecks.HealthStatus.Unhealthy);

services.AddControllers();
var app = builder.Build();

// Map the health check endpoint
app.MapHealthChecks("/health");

app.MapControllers();
app.Run();
```

**2. A Service That Uses the Resilient HttpClient**

```csharp
// MyService.cs
public class MyService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public MyService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<string> GetDataFromApi()
    {
        var client = _httpClientFactory.CreateClient("MyApiClient");
        
        // This call is now wrapped in the Polly retry policy
        var response = await client.GetStringAsync("data");
        return response;
    }
}
```

#### Explanation

1.  **Polly Policy**: We define a `retryPolicy` using `HttpPolicyExtensions.HandleTransientHttpError()`, which is a pre-configured helper that handles typical transient HTTP errors. We also add a condition to retry on `404 Not Found`. The policy is configured to retry 3 times with an exponential backoff delay (e.g., wait 2s, then 4s, then 8s), which is a best practice to avoid overwhelming a struggling service.
2.  **HttpClientFactory Integration**: We register a named `HttpClient` called `"MyApiClient"`. Crucially, we use `.AddPolicyHandler(retryPolicy)` to attach our Polly policy to every request made by this client. This is the seamless integration point between `HttpClientFactory` and Polly.
3.  **Health Check Configuration**: 
    -   We call `services.AddHealthChecks()` to initialize the system.
    -   We then add a specific check for our SQL Server database using `AddSqlServer`. We provide the connection string and a simple query (`SELECT 1`) to execute. If the query succeeds, the dependency is considered `Healthy`. If it fails, it will be reported as `Unhealthy`.
4.  **Mapping the Endpoint**: `app.MapHealthChecks("/health")` exposes the health check endpoint. When you navigate to `/health`, the framework will execute all registered checks and return a consolidated status report (e.g., a `200 OK` with the text "Healthy" or a `503 Service Unavailable` with the text "Unhealthy").
5.  **Service Consumption**: In `MyService`, we simply request an `HttpClient` from the `IHttpClientFactory` using the name `"MyApiClient"`. The factory provides us with a pre-configured client that automatically has the retry policy applied. Our service code remains clean and unaware of the resilience logic, which has been neatly handled in the startup configuration.