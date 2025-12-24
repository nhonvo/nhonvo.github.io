---
title: "Dependency Injection (Scopes: Singleton, Scoped, Transient)"
description: "Explain the differences and when to use each scope in an ASP.NET Core application."
pubDate: "9 6 2025"
published: true
tags: [".NET", "C#", "Dependency Injection", "Singleton", "Scoped", "Transient", "ASP.NET Core", "IoC"]
---

### Mind Map Summary

- **Dependency Injection (DI)**
  - **Definition**: A design pattern where a class receives its dependencies from an external source (the DI container) rather than creating them itself.
  - **Principle**: Implements Inversion of Control (IoC).
  - **Benefits**: Promotes loose coupling, enhances testability and maintainability.
- **Service Lifetimes in ASP.NET Core**
  - **`Singleton`**
    - **Lifetime**: One single instance for the entire application's life.
    - **Created**: The first time it's requested.
    - **Use Case**: Shared, stateless services; caching; logging configuration.
    - **Caution**: Must be thread-safe.
  - **`Scoped`**
    - **Lifetime**: One instance per client request (the scope).
    - **Created**: The first time it's requested within a given HTTP request.
    - **Use Case**: The default choice. Good for services that need to maintain state within a request, like an EF Core `DbContext` or a Unit of Work.
  - **`Transient`**
    - **Lifetime**: A new instance is created every single time it is requested.
    - **Created**: Every time it's injected into a constructor or resolved from the container.
    - **Use Case**: Lightweight, stateless services where no shared state is needed.

### Core Concepts

#### 1. Dependency Injection (DI)
- **Definition**: At its core, DI is a technique where the responsibility of object creation and binding is passed from the object itself to an external entity, known as the DI Container or IoC Container. Instead of a class creating its own dependencies (e.g., `var service = new MyService();`), it declares them as constructor parameters, and the container provides them.
- **Inversion of Control (IoC)**: This is the principle behind DI. The normal "flow of control" is inverted. Instead of your class controlling when and how to create its dependencies, that control is inverted and given to the container.

#### 2. Service Lifetimes
In ASP.NET Core, when you register a service with the built-in DI container, you must specify its lifetime. The lifetime dictates when an instance of the service is created and how long it lives.

- **`Singleton`**: The DI container will create and share a single instance of the service throughout the entire application's lifetime. Every class that requests this dependency will receive the exact same object. This is memory efficient but requires you to manage state carefully to avoid concurrency issues (it must be thread-safe).

- **`Scoped`**: A new instance of the service is created once per client request (the scope). For the duration of a single HTTP request, every class that requests this dependency (even in different layers of your application) will receive the same instance. This is the perfect lifetime for services that need to share data or context within a single transaction or operation, like `DbContext`.

- **`Transient`**: A new instance is created every time the service is requested from the container. If a controller depends on a service, and that service depends on another service, and both are registered as transient, each will get its own new instance. This is best for lightweight, stateless services where you always want a fresh start.

### Practice Exercise

In an ASP.NET Core API, create a simple service interface (e.g., `IOperationLogger`) and an implementation that has a unique ID (e.g., a `Guid`) set in its constructor. Register this service three times with different interfaces: once as Singleton, once as Scoped, and once as Transient. Inject all three into a controller and a service that the controller uses, then log their unique IDs on a single request to demonstrate the lifetime differences.

### Answer

#### Code Example

**1. The Service Interface and Implementation**

```csharp
// IOperationLogger.cs
public interface IOperationLogger
{
    Guid OperationId { get; }
}

// Create separate interfaces for each lifetime to register them distinctly
public interface ITransientOperationLogger : IOperationLogger { }
public interface IScopedOperationLogger : IOperationLogger { }
public interface ISingletonOperationLogger : IOperationLogger { }

// OperationLogger.cs
public class OperationLogger : ITransientOperationLogger, IScopedOperationLogger, ISingletonOperationLogger
{
    public Guid OperationId { get; private set; }

    public OperationLogger()
    {
        OperationId = Guid.NewGuid();
    }
}
````

**2. A Service that Depends on the Loggers**

```csharp
// MyLoggingService.cs
public class MyLoggingService
{
    private readonly ITransientOperationLogger _transientLogger;
    private readonly IScopedOperationLogger _scopedLogger;
    private readonly ISingletonOperationGLogger _singletonLogger;

    public MyLoggingService(
        ITransientOperationLogger transientLogger,
        IScopedOperationLogger scopedLogger,
        ISingletonOperationLogger singletonLogger)
    {
        _transientLogger = transientLogger;
        _scopedLogger = scopedLogger;
        _singletonLogger = singletonLogger;
    }

    public void LogIds(string scope)
    {
        Console.WriteLine($"--- {scope} ---");
        Console.WriteLine($"Transient:  {_transientLogger.OperationId}");
        Console.WriteLine($"Scoped:     {_scopedLogger.OperationId}");
        Console.WriteLine($"Singleton:  {_singletonLogger.OperationId}");
    }
}
```

**3. Registering the Services (`Program.cs`)**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Register the services with their respective lifetimes
builder.Services.AddTransient<ITransientOperationLogger, OperationLogger>();
builder.Services.AddScoped<IScopedOperationLogger, OperationLogger>();
builder.Services.AddSingleton<ISingletonOperationLogger, OperationLogger>();

// Register the service that also uses the loggers
builder.Services.AddScoped<MyLoggingService>();

builder.Services.AddControllers();
var app = builder.Build();
app.MapControllers();
app.Run();
```

**4. The Controller**

```csharp
[ApiController]
[Route("[controller]")]
public class LifetimeDemoController : ControllerBase
{
    private readonly ITransientOperationLogger _transientLogger;
    private readonly IScopedOperationLogger _scopedLogger;
    private readonly ISingletonOperationLogger _singletonLogger;
    private readonly MyLoggingService _loggingService;

    public LifetimeDemoController(
        ITransientOperationLogger transientLogger,
        IScopedOperationLogger scopedLogger,
        ISingletonOperationLogger singletonLogger,
        MyLoggingService loggingService)
    {
        _transientLogger = transientLogger;
        _scopedLogger = scopedLogger;
        _singletonLogger = singletonLogger;
        _loggingService = loggingService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        Console.WriteLine("--- Controller ---");
        Console.WriteLine($"Transient:  {_transientLogger.OperationId}");
        Console.WriteLine($"Scoped:     {_scopedLogger.OperationId}");
        Console.WriteLine($"Singleton:  {_singletonLogger.OperationId}");

        _loggingService.LogIds("Logging Service");

        return Ok();
    }
}
```

#### Explanation of Results

When you run this API and make a GET request to `/lifetimedemo`, you will see output like this in the console:

```
--- Controller ---
Transient:  0d1a1e9a-0b1a-4b1a-8b1a-0b1a1e9a0b1a
Scoped:     1b1a1e9a-1b1a-4b1a-8b1a-1b1a1e9a1b1a
Singleton:  2c1a1e9a-2c1a-4b1a-8b1a-2c1a1e9a2c1a
--- Logging Service ---
Transient:  3d1a1e9a-3d1a-4b1a-8b1a-3d1a1e9a3d1a
Scoped:     1b1a1e9a-1b1a-4b1a-8b1a-1b1a1e9a1b1a
Singleton:  2c1a1e9a-2c1a-4b1a-8b1a-2c1a1e9a2c1a
```

- **Transient**: The `OperationId` is **different** in the Controller and the `MyLoggingService`. A new `OperationLogger` was created for each injection.
- **Scoped**: The `OperationId` is the **same** in both places. Within the same HTTP request, the same instance is shared.
- **Singleton**: The `OperationId` is the **same** in both places. If you make another HTTP request, the Scoped ID will change, but the Singleton ID will remain the same for the life of the application.
