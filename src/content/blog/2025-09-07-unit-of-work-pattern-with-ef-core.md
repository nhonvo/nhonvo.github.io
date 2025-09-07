---
title: "Unit of Work Pattern with EF Core"
description: "Explain how the Unit of Work pattern can be used to group multiple repository operations into a single transaction. Discuss how DbContext inherently implements this pattern."
pubDate: "Sep 07 2025"
published: true
tags: ["Software Design & Architecture", "EF Core", "Unit of Work", "Repository Pattern"]
---

### Mind Map Summary

- **Topic**: Unit of Work Pattern with EF Core
- **Definition**: A design pattern that maintains a list of business transactions and coordinates the writing out of all changes and the resolution of concurrency problems. In EF Core, the `DbContext` class is a concrete implementation of the Unit of Work pattern.
- **How it Works**:
    - The `DbContext` tracks all changes made to entities during a business transaction.
    - When `SaveChanges` is called, the `DbContext` wraps all the changes in a single database transaction.
    - If any of the changes fail, the entire transaction is rolled back.
- **Benefits**:
    - **Ensures Data Consistency**: Guarantees that all changes are either committed or rolled back as a single unit.
    - **Reduces Database Round-Trips**: Batches multiple database operations into a single round-trip.
    - **Simplifies Code**: Simplifies the code by providing a single point of entry for saving changes.

### Practice Exercise

Create a `UnitOfWork` class that encapsulates a `DbContext` and provides access to multiple repositories (e.g., `IProductRepository`, `IOrderRepository`). Implement a `CompleteAsync` method that calls `SaveChangesAsync` on the context. Use this unit of work in a service layer to perform a multi-step business operation.

### Answer

**1. Define the Repositories and Unit of Work:**

```csharp
public interface IProductRepository { /* ... */ }
public interface IOrderRepository { /* ... */ }

public interface IUnitOfWork : IDisposable
{
    IProductRepository Products { get; }
    IOrderRepository Orders { get; }
    Task<int> CompleteAsync();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly MyDbContext _context;

    public UnitOfWork(MyDbContext context)
    {
        _context = context;
        Products = new ProductRepository(_context);
        Orders = new OrderRepository(_context);
    }

    public IProductRepository Products { get; private set; }
    public IOrderRepository Orders { get; private set; }

    public async Task<int> CompleteAsync()
    {
        return await _context.SaveChangesAsync();
    }

    public void Dispose()
    {
        _context.Dispose();
    }
}
```

**2. Use the Unit of Work in a Service:**

```csharp
public class OrderService
{
    private readonly IUnitOfWork _unitOfWork;

    public OrderService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task CreateOrderAsync(Order order)
    {
        _unitOfWork.Orders.Add(order);
        // ... other business logic ...
        await _unitOfWork.CompleteAsync();
    }
}
```
