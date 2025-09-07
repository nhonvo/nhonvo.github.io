---
title: "EF Core Global Query Filters"
description: "Explain how to use global query filters to implement soft-delete functionality or multi-tenancy in an application."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "EF Core", "Querying", "Soft Delete", "Multi-Tenancy"]
---

### Mind Map Summary

- **Topic**: EF Core Global Query Filters
- **Definition**: Predicates that are applied to all queries for a given entity type. They are defined in the `OnModelCreating` method of the `DbContext`.
- **Use Cases**:
    - **Soft Delete**: Automatically filter out entities that have been marked as deleted.
    - **Multi-Tenancy**: Automatically filter entities based on a tenant ID.
- **Benefits**:
    - **Reduces Boilerplate**: Eliminates the need to add the same WHERE clause to every query.
    - **Improves Consistency**: Ensures that the filter is applied consistently across the application.
    - **Prevents Accidental Data Exposure**: Helps prevent accidental exposure of soft-deleted or multi-tenant data.
- **Disabling Filters**: Global query filters can be disabled for a specific query using the `IgnoreQueryFilters()` operator.

### Practice Exercise

Define a global query filter on an entity (e.g., `Product`) that automatically filters out any records where an `IsDeleted` property is true. Write a query to fetch all products and show that the deleted ones are not returned by default. Then, show how to disable the filter for a specific query.

### Answer

**1. Entity with `IsDeleted` Property:**

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
}
```

**2. DbContext with Global Query Filter:**

```csharp
using Microsoft.EntityFrameworkCore;

public class MyDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .HasQueryFilter(p => !p.IsDeleted);
    }
}
```

**3. Querying with the Global Filter:**

```csharp
// This query will only return products where IsDeleted is false.
var products = context.Products.ToList();
```

**4. Disabling the Global Filter:**

```csharp
// This query will return all products, including those where IsDeleted is true.
var allProducts = context.Products.IgnoreQueryFilters().ToList();
```
