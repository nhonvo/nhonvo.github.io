---
title: "EF Core Second-Level Caching"
description: "Reduce database load and supercharge performance. Learn how to implement a shared query cache that lives beyond the scope of a single DbContext."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "Caching",
    "Redis",
    "Performance Tuning",
    "Database Optimization",
    "Backend Development",
    "Software Architecture",
  ]
---

## First-Level vs. Second-Level Caching

To understand second-level caching, we must first understand how EF Core works by default.

- **First-Level Cache (Default)**: Lives within a single `DbContext` instance. It tracks entities by their ID. Once the `DbContext` is disposed (usually at the end of an HTTP request), the cache is cleared.
- **Second-Level Cache**: Lives **outside** the `DbContext`. It is shared across all instances of the context and often survives application restarts if using a distributed provider like Redis. It caches the _results_ of complex LINQ queries.

---

## Why Use It?

1.  **Read-Heavy Workloads**: Ideal for data that changes infrequently (e.g., product catalogs, settings, or country lists).
2.  **Expensive Queries**: Caches the JSON/Object results of complex joins that would otherwise take hundreds of milliseconds to execute.
3.  **Scalability**: Reduces the total number of connections and processing power required from your SQL database.

---

## Technical Implementation

While EF Core doesn't have a built-in second-level cache, the community standard is the `EFCoreSecondLevelCacheInterceptor`.

### 1. Installation

```bash
dotnet add package EFCoreSecondLevelCacheInterceptor
```

### 2. Registration in `Program.cs`

```csharp
builder.Services.AddEFSecondLevelCache(options =>
    // Use MemoryCache for single-instance, or Redis for distributed
    options.UseMemoryCacheProvider()
           .DisableLogging(false)
           .UseCacheKeyPrefix("App_")
);

builder.Services.AddDbContext<AppDbContext>((serviceProvider, options) =>
{
    options.UseSqlServer(connectionString)
           .AddInterceptors(serviceProvider.GetRequiredService<SecondLevelCacheInterceptor>());
});
```

### 3. Usage in Code

You must explicitly mark queries as "Cacheable."

```csharp
using EFCoreSecondLevelCacheInterceptor;

public async Task<List<Product>> GetFeaturedProducts()
{
    return await _context.Products
        .Where(p => p.IsFeatured)
        // This leverages the second-level cache for 10 minutes
        .Cacheable(CacheExpirationMode.Absolute, TimeSpan.FromMinutes(10))
        .ToListAsync();
}
```

---

## Cache Invalidation: The Challenge

The biggest risk with second-level caching is **stale data**.

- **Automatic Invalidation**: `EFCoreSecondLevelCacheInterceptor` is smart enough to invalidate the cache for an entity type when it detects a `SaveChanges` call that modifies that table.
- **Manual Invalidation**: You can explicitly clear the cache for specific tags if you perform bulk updates via raw SQL or external processes.

---

## Practice Exercise

Configure a caching strategy for a `Category` list that updates rarely but is accessed on every page load.

---

## Answer

### The Implementation Strategy

For categories, we want a long-lived cache that only resets when an admin makes a change.

```csharp
// Fetching the data
var categories = await _context.Categories
    .AsNoTracking() // Performance boost: don't track what you won't change
    .Cacheable(CacheExpirationMode.Sliding, TimeSpan.FromHours(1))
    .ToListAsync();
```

### Why this works:

1.  **Sliding Expiration**: As long as someone visits the site at least once an hour, the categories stay in memory.
2.  **Global Efficiency**: Even if 1,000 users hit the site simultaneously, the database only executes the query **once** per hour.
3.  **Integrity**: If an admin calls `_context.Categories.Add(newCategory); await _context.SaveChangesAsync();`, the interceptor automatically detects the change to the `Categories` table and invalidates the cached list, ensuring the next visitor sees the new data.

## Summary

Second-level caching is one of the most effective ways to scale a .NET application. By moving frequently accessed, semi-static data into **MemoryCache** or **Redis**, you free up your database to focus on the high-value write operations and complex transactions.
