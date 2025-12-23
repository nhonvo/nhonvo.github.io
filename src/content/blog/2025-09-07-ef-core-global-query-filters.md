---
title: "EF Core Global Query Filters"
description: "Implement cross-cutting logic like Soft Deletion and Multi-tenancy at the data layer. Learn how to centralize security and visibility rules in EF Core."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "Data Modeling",
    "Soft Delete",
    "SQL Server",
    "Backend Development",
    "Architecture",
    "Database Design",
  ]
---

## What are Global Query Filters?

Global Query Filters are LINQ query predicates (a boolean expression usually used in the `Where` operator) that are applied to Entity Types in the metadata model (usually in `OnModelCreating`).

These filters are **automatically applied** by EF Core to any LINQ query involving those entity types. This ensures that specific rules—like security or visibility—are enforced application-wide without developers needing to remember to add `.Where()` to every single query.

---

## Common Use Cases

1.  **Soft Delete**: Instead of deleting rows, you set an `IsDeleted` flag. The filter ensures the UI never shows "deleted" items.
2.  **Multi-Tenancy**: Every row has a `TenantId`. The filter ensures users only see data belonging to their own organization.
3.  **Active Status**: Filtering out "Draft" or "Inactive" records for public-facing queries.

---

## Technical Implementation

### 1. Defining the Filter

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    // Automatically hide products marked as deleted
    modelBuilder.Entity<Product>()
        .HasQueryFilter(p => !p.IsDeleted);

    // Multi-tenancy (using a field from the context class)
    modelBuilder.Entity<Order>()
        .HasQueryFilter(o => o.TenantId == _currentTenantId);
}
```

### 2. Bypassing Filters

There are times when you **do** want to see the filtered data (e.g., an Admin "Trash Bin" or a cross-tenant report).

```csharp
var allData = await _context.Products
    .IgnoreQueryFilters()
    .ToListAsync();
```

---

## Practice Exercise

Implement a soft-delete mechanism for a `Customer` entity. Show how the filter affects a standard `Count()` query and how to bypass it.

---

## Answer

### 1. The Entity Design

```csharp
public class Customer {
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }
}
```

### 2. Standard Count vs. Ignored Count

```csharp
// Scenario: Database has 100 customers, 10 are marked 'IsDeleted = true'

// Result: 90 (Filter is active)
var activeCount = await _context.Customers.CountAsync();

// Result: 100 (Filter is bypassed)
var totalCount = await _context.Customers
    .IgnoreQueryFilters()
    .CountAsync();
```

### Why This Architecture Works

1.  **Maintenance**: You don't have to audit every single Service/Controller to ensure they are filtering by `IsDeleted`. It happens "below the surface" in the Infrastructure layer.
2.  **Referential Integrity**: If you include navigation properties (e.g., `_context.Orders.Include(o => o.Customer)`), the global filter for `Customer` will still apply, preventing "Ghost" data from appearing in related objects.
3.  **Performance**: Since the filter is injected into the SQL before execution, it is as efficient as a manual `WHERE` clause.
    - **Note**: Ensure that the columns used in filters (like `IsDeleted` or `TenantId`) are **indexed** in the database.

## Summary

Global Query Filters are a powerful safety net for your application's data. By centralizing visibility rules at the entity level, you build a **robust, secure-by-default system** that is significantly easier to develop and maintain as the team grows.
