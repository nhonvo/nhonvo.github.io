---
title: "Middleware Pipeline"
description: "Explain how the request pipeline is built and the importance of middleware ordering."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Mind Map Summary

- **ASP.NET Core Middleware**
  - **Definition**: A series of software components assembled into a pipeline to handle HTTP requests and responses.
  - **Core Concept: The Pipeline**
    - **Structure**: A chain of delegates. Each middleware component is a link in the chain.
    - **Flow**: Request -> Middleware 1 -> Middleware 2 -> ... -> Endpoint
    - **Response Flow**: The response flows back through the pipeline in the reverse order.
  - **Each Middleware Component Can**:
    1.  **Process the Request**: Examine and modify the `HttpContext`.
    2.  **Pass Control**: Call the `next` delegate to pass the request to the next middleware in the pipeline.
    3.  **Short-Circuit**: Handle the request completely and generate a response without calling `next`.
  - **Key Principle: Order Matters**
    - The order of registration in `Program.cs` defines the order of execution.
    - Critical for security, performance, and functionality (e.g., Authentication must run before Authorization).

### Core Concepts

#### 1. What is Middleware?
- Middleware is a piece of code in an application pipeline that handles requests and responses. Think of it as a series of gates through which an HTTP request must pass before it reaches its final destination (the endpoint), and through which the response must pass on its way back out to the client.
- Each middleware has access to the `HttpContext` object, which contains everything about the current request and the evolving response.

#### 2. The Request Pipeline
- The pipeline is configured in the `Program.cs` file (or the `Configure` method in older `Startup.cs` files). You use methods like `app.Use...` to add middleware components to the pipeline.
- The pipeline is built as a chain of `RequestDelegate` delegates. When a request arrives, the first middleware is called. It performs its logic and then invokes the `next` delegate in the chain. This continues until a middleware component decides to handle the request and generate a response (short-circuiting) or until the request reaches the end of the pipeline (typically the endpoint routing middleware).
- Once the response is generated, it travels back up the pipeline in the reverse order, allowing each middleware to perform post-processing actions (like adding response headers or logging).

#### 3. The Importance of Ordering
- The order in which you register middleware is critical. A request passes through them in the registered order, and the response passes through in the reverse order.
- **Example**: 
  - `app.UseAuthentication()` must come before `app.UseAuthorization()`. You have to know *who* the user is (Authentication) before you can decide *what* they are allowed to do (Authorization).
  - `app.UseExceptionHandler()` should be registered very early in the pipeline so it can catch exceptions thrown by any middleware that runs after it.
  - `app.UseStaticFiles()` should often be placed early to serve files like images or CSS quickly without going through unnecessary authentication or logging steps.

### Practice Exercise

Create a custom middleware component that logs the request path and adds a custom response header. Register it in the pipeline. Then, register a second piece of middleware that short-circuits the pipeline (doesn't call `next`). Demonstrate how changing the order of these two middleware components affects the application's behavior.

### Answer

#### Code Example

**1. The Custom Middleware Classes**

```csharp
// LoggingMiddleware.cs
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<LoggingMiddleware> _logger;

    public LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation($"Request Path: {context.Request.Path}");

        // Add a custom header to the response
        context.Response.OnStarting(() => {
            context.Response.Headers.Add("X-Logging-Middleware", "Handled");
            return Task.CompletedTask;
        });

        // Call the next middleware in the pipeline
        await _next(context);
    }
}

// ShortCircuitingMiddleware.cs
public class ShortCircuitingMiddleware
{
    private readonly RequestDelegate _next;

    public ShortCircuitingMiddleware(RequestDelegate next)
    {
        _next = next; // Note: _next is not used in this middleware
    }

    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.StatusCode = 200;
        await context.Response.WriteAsync("Request was short-circuited!");
        // We DO NOT call await _next(context);
    }
}
```

**2. `Program.cs` Configuration**

We will show two different registration orders.

**Scenario A: Logging Middleware First**

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Order 1: Logging -> ShortCircuiting
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<ShortCircuitingMiddleware>();

app.Run(async (context) => {
    // This will never be reached
    await context.Response.WriteAsync("Hello from terminal middleware!");
});

app.Run();
```

**Scenario B: Short-Circuiting Middleware First**

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Order 2: ShortCircuiting -> Logging
app.UseMiddleware<ShortCircuitingMiddleware>();
app.UseMiddleware<LoggingMiddleware>(); // This will never be reached

app.Run(async (context) => {
    // This will also never be reached
    await context.Response.WriteAsync("Hello from terminal middleware!");
});

app.Run();
```

#### Explanation of Behavior

- **In Scenario A (Logging -> ShortCircuiting)**:
  1.  A request comes in and hits the `LoggingMiddleware` first.
  2.  A log message `Request Path: /` is written to the console.
  3.  A response header `X-Logging-Middleware` is registered to be added.
  4.  `LoggingMiddleware` calls `await _next(context)`, passing control to the `ShortCircuitingMiddleware`.
  5.  `ShortCircuitingMiddleware` takes over. It sets the response body to "Request was short-circuited!" and does **not** call `next`.
  6.  The pipeline execution stops and the response flows back.
  7.  **Result**: You see the log message, the browser shows "Request was short-circuited!", and the response has the `X-Logging-Middleware` header.

- **In Scenario B (ShortCircuiting -> Logging)**:
  1.  A request comes in and hits the `ShortCircuitingMiddleware` first.
  2.  It immediately sets the response body to "Request was short-circuited!" and returns.
  3.  Because it never calls `next`, the `LoggingMiddleware` is **never executed**.
  4.  **Result**: The browser shows "Request was short-circuited!", but there is **no log message** in the console and **no custom header** in the response. The request never made it past the first piece of middleware.

This clearly demonstrates that middleware order is fundamental to controlling the flow and behavior of an ASP.NET Core application.