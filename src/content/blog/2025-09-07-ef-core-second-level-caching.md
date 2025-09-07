---
title: "EF Core Second-Level Caching"
description: "Explain the concept of a second-level cache and how it can improve performance by caching query results outside of a single DbContext instance. Name a popular library for implementing it."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "EF Core", "Caching", "Performance"]
---

### Mind Map Summary

- **Topic**: EF Core Second-Level Caching
- **Definition**: A query cache that stores the results of queries in a cache that is shared across multiple `DbContext` instances. This can significantly improve performance by reducing the number of database queries.
- **How it Works**:
    - When a query is executed, the cache is first checked for the results.
    - If the results are in the cache, they are returned from the cache.
    - If the results are not in the cache, the query is executed against the database, and the results are stored in the cache for future use.
- **Popular Library**: `EFCoreSecondLevelCacheInterceptor`
- **Benefits**:
    - **Improved Performance**: Reduces the number of database queries, which can significantly improve performance.
    - **Reduced Database Load**: Reduces the load on the database server.
- **Considerations**:
    - **Cache Invalidation**: The cache must be invalidated when the underlying data changes.
    - **Stale Data**: There is a risk of serving stale data if the cache is not invalidated correctly.

### Practice Exercise

Integrate a second-level caching provider (like `EFCoreSecondLevelCacheInterceptor`) into an ASP.NET Core application. Enable caching for a specific query and demonstrate that on the second execution of the query, the data is served from the cache instead of hitting the database.

### Answer

**1. Install the NuGet Package:**

```bash
dotnet add package EFCoreSecondLevelCacheInterceptor
```

**2. Configure the Second-Level Cache in `Program.cs`:**

```csharp
builder.Services.AddDbContext<MyDbContext>((serviceProvider, options) =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
           .AddInterceptors(serviceProvider.GetRequiredService<SecondLevelCacheInterceptor>()));

builder.Services.AddEFSecondLevelCache(options =>
    options.UseMemoryCacheProvider()
           .DisableLogging(true)
);
```

**3. Enable Caching for a Query:**

```csharp
// This query will be cached for 60 seconds.
var products = context.Products.Cacheable(CacheExpirationMode.Absolute, TimeSpan.FromSeconds(60)).ToList();
```

**4. Demonstrate Caching:**

-   Run the application and execute the query. The first time the query is executed, it will hit the database.
-   Execute the query again within 60 seconds. This time, the query will be served from the cache, and you will not see a database query in the logs.
