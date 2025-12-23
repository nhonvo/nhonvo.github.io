---
title: "Unit of Work Pattern with EF Core"
description: "Coordinate complex business transactions across multiple repositories. Master the design pattern that ensures all-or-nothing database consistency in .NET."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Design Patterns",
    "EF Core",
    ".NET",
    "Architecture",
    "SQL Server",
    "Unit of Work",
    "Repository Pattern",
    "Backend Development",
  ]
---

## What is the Unit of Work (UoW) Pattern?

The Unit of Work pattern maintains a list of business transactions and coordinates the writing out of all changes and the resolution of concurrency problems. In simpler terms, it ensures that when you update multiple repositories, they all succeed or fail as a single atomic operation.

---

## EF Core: The Built-in UoW

It’s important to note that **`DbContext` is already a Unit of Work**. It tracks changes and wraps them in a transaction when you call `SaveChanges()`.

So, why implement a custom `IUnitOfWork`?

1.  **Abstraction**: To prevent your Service Layer from being directly coupled to EF Core.
2.  **Coordination**: To provide a single point of entry to multiple repositories (e.g., `_uow.Orders` and `_uow.Products`).
3.  **Testability**: Allows you to mock the entire persistence layer in one go.

---

## Implementation Design

### 1. The Interface

```csharp
public interface IUnitOfWork : IDisposable
{
    IProductRepository Products { get; }
    IOrderRepository Orders { get; }
    Task<int> CompleteAsync(); // Effectively SaveChangesAsync
}
```

### 2. The Implementation

```csharp
public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
        // Repositories share the same context instance
        Products = new ProductRepository(_context);
        Orders = new OrderRepository(_context);
    }

    public IProductRepository Products { get; }
    public IOrderRepository Orders { get; }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose() => _context.Dispose();
}
```

---

## Practice Exercise

Implement a service method that uses a Unit of Work to update product stock and create an order simultaneously. Discuss what happens if the order creation fails.

---

## Answer

### The Service Layer Implementation

```csharp
public class CheckoutService
{
    private readonly IUnitOfWork _uow;

    public CheckoutService(IUnitOfWork uow) => _uow = uow;

    public async Task ProcessOrder(int productId, int quantity)
    {
        var product = await _uow.Products.GetByIdAsync(productId);

        // Step 1: Update Domain Model
        product.ReduceStock(quantity);

        // Step 2: Create Record
        _uow.Orders.Add(new Order { ProductId = productId, Qty = quantity });

        // Step 3: Atomic Commit
        await _uow.CompleteAsync();
    }
}
```

### Why This Architecture Works

1.  **Atomicity**: If `_uow.Orders.Add` fails (e.g., due to a database constraint), the `ReduceStock` change will never be committed to the database. The `DbContext` ensures an "all or nothing" result.
2.  **Consistency**: Because both repositories share the same `DbContext` instance, they participate in the same change tracker.
3.  **Clean Code**: The `CheckoutService` doesn't need to know how to save data or handle database connections; it only cares about the business orchestration.

## Summary

The Unit of Work pattern is the glue that holds repositories together. While EF Core's `DbContext` provides the heavy lifting, a custom `IUnitOfWork` wrapper is often necessary for larger, testable, and loosely coupled enterprise applications.
