---
title: "Minimal APIs vs. Controllers"
description: "Compare the performance and developer experience of Minimal APIs with traditional Controller-based APIs."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "ASP.NET Core",
    "Minimal APIs",
    "API Design",
    "Performance",
    ".NET 8",
    "Architecture",
    "Web Development",
  ]
---

## Mind Map Summary

- **Controllers (Traditional)**
  - **What**: Class-based, inheriting from `ControllerBase`.
  - **Organization**: Groups related actions. Excellent for complex APIs.
  - **Feature-Rich**: Strong built-in support for filters and model binding.
  - **Boilerplate**: High ceremony (class, constructor DI, attributes).
- **Minimal APIs (Modern Streamlined)**
  - **What**: Concise endpoints defined via lambda functions (e.g., `app.MapGet`).
  - **Conciseness**: Drastically reduces code for simple microservices.
  - **Performance**: Lower framework overhead than the controller pipeline.
  - **Clutter**: Can become messy in `Program.cs` if not modularized.

## Core Concepts

### 1. Controller-Based APIs

This has been the standard since ASP.NET Core's inception. Its class-based structure provides a natural way to group related logic. For example, all `Product` operations (CRUD) live in a single `ProductsController`. It uses declarative attributes (`[Authorize]`, `[HttpGet]`) to handle routing and cross-cutting concerns.

### 2. Minimal APIs

Introduced in .NET 6, Minimal APIs are designed for scenarios where speed and simplicity are paramount. By mapping routes directly to lambdas, you eliminate the need for classes and constructors. They are ideal for microservices and cloud-native triggers.

### When to Choose Which?

- **Use Controllers when**: Building a large-scale enterprise API where organizational hierarchy and standardized filter patterns are mandatory.
- **Use Minimal APIs when**: Building a lightweight microservice, a simple facade, or searching for the lowest possible latency.

## Practice Exercise

Create a simple CRUD API for a `Product` entity. Implement 'Create' and 'Read' using controllers, and 'Update' and 'Delete' using Minimal APIs in `Program.cs`.

## Answer (Hybrid API Design in C#)

### 1. `Program.cs` - Minimal API Configuration

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<ProductRepository>();

var app = builder.Build();

// --- Minimal API Endpoints (Update & Delete) ---
app.MapPut("/products/{id}", (int id, Product product, ProductRepository repo) =>
{
    product.Id = id;
    repo.Update(product);
    return Results.Ok(product);
});

app.MapDelete("/products/{id}", (int id, ProductRepository repo) =>
{
    repo.Delete(id);
    return Results.NoContent();
});

app.MapControllers();
app.Run();
```

### 2. The Controller (Create & Read)

```csharp
[ApiController]
[Route("products")]
public class ProductsController(ProductRepository repo) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(repo.GetAll());

    [HttpPost]
    public IActionResult Create(Product product)
    {
        repo.Create(product);
        return CreatedAtAction(nameof(GetAll), product);
    }
}
```

### Observations

- **Organization**: The Controller keeps the main entry logic neat and provides native support for `CreatedAtAction`, which yields perfect REST headers easily.
- **Speed**: The Minimal API endpoints in `Program.cs` avoid the entire controller instantiation and attribute parsing cost, making them slightly faster for high-frequency operations like Updates or Deletes.
- **Maintainability**: While Minimal APIs are faster to write, strictly adhering to one style per project is usually better for team consistency. However, mixing them is technically sound and supported.
