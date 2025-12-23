---
title: "EF Core Interceptors"
description: "Tap into the internal lifecycle of Entity Framework Core. Learn how to use interceptors for low-level SQL modification, auditing, and performance monitoring."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "Diagnostics",
    "Auditing",
    "SQL Server",
    "Architecture",
    "Design Patterns",
    "C#",
  ]
---

## What are EF Core Interceptors?

EF Core Interceptors permit the suppression, modification, or monitoring of EF Core operations. They provide a low-level "hook" into the database lifecycle, allowing you to run custom logic before or after a database operation happens.

Unlike `SaveChanges` overrides, interceptors act at the database driver level, making them ideal for tasks involving raw SQL or connection management.

---

## Types of Interceptors

1.  **`DbCommandInterceptor`**: Intercepts the generation and execution of SQL commands (Queries, Inserts, Updates).
2.  **`SaveChangesInterceptor`**: Intercepts the logic that transforms tracked entities into database changes.
3.  **`DbConnectionInterceptor`**: Intercepts opening, closing, and state changes of the underlying database connection.
4.  **`DbTransactionInterceptor`**: Intercepts the start, commit, and rollback of transactions.

---

## Technical Implementation

### 1. Creating a SQL Interceptor

A common use case is adding a "Custom Tag" or SQL comment to every query for DBA tracking.

```csharp
public class QueryTagInterceptor : DbCommandInterceptor
{
    public override InterceptionResult<DbDataReader> ReaderExecuting(
        DbCommand command,
        CommandEventData eventData,
        InterceptionResult<DbDataReader> result)
    {
        // Inject a comment into the SQL
        command.CommandText = $"/* Executed from WebAPI-v2 */\n" + command.CommandText;
        return result;
    }
}
```

### 2. Registration

Interceptors must be registered in the `OnConfiguring` method of your `DbContext`.

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder options)
{
    options.AddInterceptors(new QueryTagInterceptor());
}
```

---

## Practice Exercise

Implement a `SaveChangesInterceptor` that automatically sets the `CreatedAt` and `UpdatedAt` properties for any entity implementing an `IAuditable` interface.

---

## Answer

### 1. The Auditable Logic

```csharp
public class AuditInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(
        DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateTimestamps(eventData.Context);
        return result;
    }

    private void UpdateTimestamps(DbContext context)
    {
        var entries = context.ChangeTracker.Entries<IAuditable>();
        foreach (var entry in entries)
        {
            var now = DateTime.UtcNow;
            if (entry.State == EntityState.Added) entry.Entity.CreatedAt = now;
            entry.Entity.UpdatedAt = now;
        }
    }
}
```

### Why This Architecture Works

1.  **Separation of Concerns**: Your individual services don't need to know about "Audit Logs." The infrastructure handles it globally.
2.  **Granularity**: Unlike Middleware, which only sees the HTTP request, Interceptors have direct access to the `DbCommand` and `DbConnection` objects. This allows for advanced tasks like **Database Read/Write splitting** or adding **SQL Query Hints**.
3.  **Consistency**: No matter where an entity is modified (API, Background Worker, or CLI tool), the interceptor will always ensure the timestamps are updated.

## Summary

EF Core Interceptors are the "power user" feature for database interactions. While they shouldn't be used for complex business logic, they are the gold standard for **cross-cutting infrastructure concerns** like logging, performance profiling, and automated auditing.
