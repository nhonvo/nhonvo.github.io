---
title: "ASP.NET Core Middleware Pipeline"
description: "Understand the middleware pipeline and how to creation custom middleware for logging, authentication, and more."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "ASP.NET Core",
    "Middleware",
    "Request Pipeline",
    "Logging",
    "Security",
    "Web API",
    "Authentication",
    "Authorization",
  ]
---

## Mind Map Summary

- **ASP.NET Core Middleware**
  - **Definition**: A series of software components assembled into a pipeline to handle HTTP requests and responses.
  - **The Pipeline Flow**
    - **Request**: Travels down from Middleware 1 -> Middleware 2 -> Final Endpoint.
    - **Response**: Once generated, it travels back up in reverse: Final Endpoint -> Middleware 2 -> Middleware 1.
  - **Middleware Capabilities**
    1. **Process Request**: Read/Modify `HttpContext`.
    2. **Pass Control**: Call the `next` delegate to continue the chain.
    3. **Short-Circuit**: Exit early and return a response without calling `next`.
- **Order of Execution**
  - Registration order in `Program.cs` is strictly followed.
  - Authentication must precede Authorization.
  - Exception handling should usually be at the very top to catch downstream errors.

## Core Concepts

### 1. What is Middleware?

Middleware is the heart of an ASP.NET Core application's request processing. Every bit of functionality, from serving static files to routing and security, is implemented as a middleware component. It's essentially a series of "decorators" around your business logic.

### 2. The Chain of Responsibility

The pipeline is built as a chain of `RequestDelegate` objects. When a request arrives, the first middleware is called. It does some work and then (usually) calls the next link. When the last middleware finishes (or someone short-circuits), the logic resumes after the `next()` call in each middleware, moving back up to the first one.

### 3. The Importance of Ordering

Ordering isn't just a suggestion; it's a requirement for security and stability.

- `app.UseExceptionHandler()`: Put this first to catch errors in everyone else.
- `app.UseStaticFiles()`: Put this early so image requests don't waste time on authentication logic.
- `app.UseAuthentication()` before `app.UseAuthorization()`: You must know **who** is calling before you decide **what** they can do.

## Practice Exercise

Create a custom middleware that logs the request and a second one that short-circuits. Demonstrate how flipping their order changes the application result.

## Answer (Custom Middleware & Pipeline Analysis in C#)

### 1. The Custom Middleware Components

```csharp
// 1. A simple logging middleware
public class LoggingMiddleware(RequestDelegate next, ILogger<LoggingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        logger.LogInformation($"Processing request: {context.Request.Path}");
        await next(context); // Pass to the next middleware
    }
}

// 2. A middleware that short-circuits
public class EarlyExitMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        context.Response.StatusCode = 200;
        await context.Response.WriteAsync("Stopped early!");
        // We DO NOT call next(context)
    }
}
```

### 2. Analyzing the Order in `Program.cs`

#### Scenario A: Log then Exit

```csharp
app.UseMiddleware<LoggingMiddleware>();
app.UseMiddleware<EarlyExitMiddleware>();

// Result:
// 1. Console logs the path.
// 2. Browser shows "Stopped early!".
```

#### Scenario B: Exit then Log

```csharp
app.UseMiddleware<EarlyExitMiddleware>();
app.UseMiddleware<LoggingMiddleware>();

// Result:
// 1. Browser shows "Stopped early!".
// 2. Console LOGS NOTHING.
// The logging middleware was never even reached because the first one short-circuited.
```

### Key Takeaway

Middleware execution is a linear journey. If any component fails to call `next()`, the pipeline effectively ends there. This is why tools like **CORS** or **Authentication** must be placed precisely; if they are too late, they might be bypassed; if they are too early, they might block valid but unauthenticated public static files.
