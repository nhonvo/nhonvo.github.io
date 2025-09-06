---
title: "Minimal APIs vs. Controllers"
description: "Explain the differences and when you might choose one over the other."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Mind Map Summary

- **Goal**: Build HTTP APIs in ASP.NET Core.
- **Controllers (The Traditional Approach)**
  - **What**: Class-based, inheriting from `ControllerBase`.
  - **Structure**: Methods within the class map to HTTP endpoints. Attributes (`[HttpGet]`, `[HttpPost]`) are used extensively.
  - **Pros**:
    - **Organization**: Excellent for large, complex APIs. Groups related actions together.
    - **Feature-Rich**: Built-in, attribute-based support for features like Filters, Model Binding, and API Explorer conventions.
    - **Familiarity**: The standard for developers coming from an ASP.NET MVC background.
  - **Cons**:
    - **Boilerplate**: Requires more code (class definitions, attributes) for simple endpoints.
- **Minimal APIs (The Streamlined Approach)**
  - **What**: A concise way to build APIs with minimal code, often directly in `Program.cs`.
  - **Structure**: Uses lambda functions and `app.Map...()` extension methods (e.g., `app.MapGet()`, `app.MapPost()`).
  - **Pros**:
    - **Concise**: Drastically reduces the code needed for simple APIs.
    - **Performance**: Can be faster due to less framework overhead.
    - **Low Ceremony**: Ideal for microservices, simple HTTP triggers, or learning API development.
  - **Cons**:
    - **Organization**: Can become cluttered for large APIs if not structured carefully (e.g., by using route groups or extension methods).
    - **Different Syntax**: Advanced features like filters and dependency injection use a slightly different, non-attribute-based syntax.

### Core Concepts

#### 1. Controller-Based APIs
This has been the standard approach for years. You create a controller class, and its public methods, decorated with HTTP verb attributes, become the API endpoints. The framework handles routing requests to the correct controller and action method based on these attributes and the route templates you define.

- **Strengths**: Its class-based structure provides a natural way to group related endpoints. For example, all actions related to `Product` (Get, Create, Update, Delete) live together in a `ProductsController`. This makes large APIs easier to navigate and maintain. It also has rich, declarative support for cross-cutting concerns via filter attributes (`[Authorize]`, `[LogExecutionTime]`).

#### 2. Minimal APIs
Introduced in .NET 6, Minimal APIs provide a direct and streamlined way to define endpoints. You map an HTTP verb and route directly to a handler, which is often a lambda expression. This eliminates much of the boilerplate associated with controllers.

- **Strengths**: The primary advantage is simplicity and performance. For a microservice that only needs to expose one or two simple endpoints, creating a full controller class is overkill. Minimal APIs allow you to define these endpoints in just a few lines of code. The reduced framework pipeline also results in better performance.

#### When to Choose Which?
- **Use Controllers when**: 
  - You are building a large, complex API with many related endpoints.
  - Your team is already familiar with the MVC/controller pattern.
  - You need to take advantage of the extensive attribute-based filter ecosystem.
- **Use Minimal APIs when**:
  - You are building a small microservice.
  - You need the absolute best performance possible.
  - You are creating a simple API for a specific task or learning purposes.

**It's not an either/or choice!** You can happily mix both styles in the same application, using the best tool for the job.

### Practice Exercise

Create a simple CRUD API for a `Product` entity. Implement the 'Create' and 'Read' endpoints using traditional controllers. Then, implement the 'Update' and 'Delete' endpoints using Minimal APIs in `Program.cs`. Discuss the pros and cons you observed.

### Answer

#### Code Example

**1. The `Product` Model and a Simple In-Memory Store**

```csharp
// Product.cs
public class Product { public int Id { get; set; } public string Name { get; set; } }

// ProductRepository.cs (simulating a database)
public class ProductRepository
{
    private readonly Dictionary<int, Product> _products = new();
    public void Create(Product product) => _products[product.Id] = product;
    public Product Get(int id) => _products.GetValueOrDefault(id);
    public List<Product> GetAll() => _products.Values.ToList();
    public void Update(Product product) => _products[product.Id] = product;
    public void Delete(int id) => _products.Remove(id);
}
```

**2. `Program.cs` - Configure Services and Minimal API Endpoints**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services for controllers
builder.Services.AddControllers();

// Register our in-memory repository as a singleton
builder.Services.AddSingleton<ProductRepository>();

var app = builder.Build();

// --- Minimal API Endpoints --- 
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

// Map controller routes
app.MapControllers();

app.Run();
```

**3. The Controller for Create and Read**

```csharp
// ProductsController.cs
[ApiController]
[Route("products")]
public class ProductsController : ControllerBase
{
    private readonly ProductRepository _repo;

    public ProductsController(ProductRepository repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok(_repo.GetAll());
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var product = _repo.Get(id);
        return product is not null ? Ok(product) : NotFound();
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
        _repo.Create(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
    }
}
```

#### Discussion of Pros and Cons Observed

-   **Controller Pros**: The `ProductsController` feels very organized. All the actions are grouped, and it's clear they all operate on the `Product` resource. Using `CreatedAtAction` in the `Create` method is a standard, clean way to return a `201 Created` response with the correct `Location` header, which is slightly more verbose to do in Minimal APIs.

-   **Controller Cons**: We had to create an entire class file just for these endpoints. The dependency injection via the constructor is standard but adds a few lines of code.

-   **Minimal API Pros**: The `MapPut` and `MapDelete` endpoints are incredibly concise and easy to read. They are defined right in `Program.cs`. Dependency injection is handled automatically by adding `ProductRepository repo` as a parameter to the lambda, which feels very lightweight and magical.

-   **Minimal API Cons**: If we had ten more endpoints for `Product`, defining them all as lambdas in `Program.cs` would quickly become messy and hard to manage. While we can organize them into other files with extension methods, it requires a conscious effort to maintain structure, whereas the controller provides that structure by default.

This hybrid approach works perfectly and demonstrates how you can choose the right tool for the right job within the same project.