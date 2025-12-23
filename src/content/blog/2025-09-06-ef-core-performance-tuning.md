---
title: "EF Core Performance Tuning (AsNoTracking, Compiled Queries, Query Splitting)"
description: "Provide specific examples of how to optimize EF Core queries for maximum performance."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "EF Core",
    "Performance",
    "ORM",
    "Query Optimization",
    "Caching",
    "AsNoTracking",
    "Compiled Queries",
    "SQL Server",
  ]
---

## Mind Map Summary

- **Goal**: Optimize the performance of EF Core database queries.
- **Key Techniques**
  - **1. No-Tracking Queries (`.AsNoTracking()`)**
    - **What**: Tells EF Core to not keep track of the state of the queried entities.
    - **When**: For any **read-only** scenario where you do not intend to save changes to the fetched data.
    - **Benefit**: **Significant performance gain**. It avoids the overhead of creating snapshots and managing entity states in the change tracker.
  - **2. Query Splitting (`.AsSplitQuery()`)**
    - **What**: Breaks a single LINQ query with multiple `Include`s for collections into several separate SQL queries.
    - **Problem It Solves**: The "Cartesian Explosion". A single query with multiple `JOIN`s on collections can result in a huge amount of duplicated data being transferred.
    - **Benefit**: Can be much more efficient than a single, massive query when including multiple one-to-many relationships.
  - **3. Compiled Queries**
    - **What**: Allows you to pre-compile a LINQ query into a reusable delegate.
    - **When**: For queries that are executed very frequently in your application.
    - **Benefit**: Skips the query compilation step on subsequent executions, providing a small but noticeable performance boost in high-throughput scenarios.

## Core Concepts

### 1. `AsNoTracking()`

By default, when you execute a query, EF Core's change tracker takes a "snapshot" of each entity it loads so it can detect any changes you make later when you call `SaveChanges()`. This process has overhead. If you are querying data solely for display purposes (e.g., in a report, a list view, or a dashboard) and have no intention of modifying it, you can gain a significant performance boost by telling EF Core to skip this process entirely. Using `.AsNoTracking()` does exactly that. It executes the query and materializes the entities without attaching them to the `DbContext`, reducing both the time and memory required for the query.

### 2. Query Splitting

Consider a query where you fetch `Blogs`, and for each blog, you `.Include()` its `Posts`, and you also `.Include()` its `Contributors`. This would result in a single SQL query with `JOIN`s. If a blog has 10 posts and 5 contributors, the database would return 10 \* 5 = 50 rows for that single blog, with the blog and contributor data being duplicated for each post. This is the "Cartesian Explosion" and it can lead to enormous amounts of redundant data being transferred over the network.

By adding `.AsSplitQuery()` to your LINQ query, you instruct EF Core to be smarter. It will generate three separate SQL queries: one for the `Blogs`, one for the `Posts`, and one for the `Contributors`. EF Core then stitches the data together in memory. While this means more database roundtrips, the total amount of data transferred is much smaller, which is often a major performance win.

### 3. Compiled Queries

Every time a LINQ query is executed for the first time, EF Core must perform a series of steps: it parses the query, translates it into an expression tree, and then compiles that tree into a SQL statement that the database can understand. This compilation step has a small cost. For a query that is executed thousands of times per second, this small cost can add up.

Compiled queries allow you to perform this compilation step once and then reuse the compiled query delegate. You define the query using `EF.CompileQuery` or `EF.CompileAsyncQuery`, and then you can invoke the resulting delegate multiple times, passing in different parameters without paying the compilation cost each time.

## Practice Exercise

Write a read-only query that fetches a large amount of data. Measure its performance. Then, add `.AsNoTracking()` to the query, measure it again, and explain why the performance improves and when it is appropriate to use this method.

## Answer (EF Core Performance Comparison in C#)

### Code Example

```csharp
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

// Assume a DbContext with a large 'Products' table
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    // ... configuration ...
}

public class PerformanceDemo
{
    public void RunQueryComparison()
    {
        using var context = new AppDbContext();
        var stopwatch = new Stopwatch();

        // --- Scenario 1: Default Tracking Query ---
        stopwatch.Start();
        var trackedProducts = context.Products.ToList();
        stopwatch.Stop();
        Console.WriteLine($"Default Tracking Query took: {stopwatch.ElapsedMilliseconds} ms");

        // --- Scenario 2: No-Tracking Query ---
        stopwatch.Restart();
        var noTrackingProducts = context.Products.AsNoTracking().ToList();
        stopwatch.Stop();
        Console.WriteLine($"AsNoTracking() Query took: {stopwatch.ElapsedMilliseconds} ms");
    }
}
```

### Explanation of Performance Improvement

When you run this code against a database with thousands of products, you will see that the `AsNoTracking()` query is noticeably faster.

1. **Default Tracking Query**: For every single `Product` entity loaded from the database, the EF Core change tracker performs several actions:

   - It creates an internal `EntityEntry` to hold tracking information.
   - It creates a "snapshot" of the entity's original property values.
   - It stores this snapshot and the entity instance in memory, attached to the `DbContext`.
     This process of creating and managing tracking information for thousands of objects consumes both CPU time and memory.

2. **`AsNoTracking()` Query**: This query tells EF Core: "I only want the data. I promise I will not be updating these entities." EF Core is then able to take a much simpler, faster path:
   - It executes the SQL query.
   - It creates the `Product` objects from the results.
   - It returns the list of objects to you directly, without creating any snapshots or attaching them to the `DbContext`.
     By skipping the entire change tracking mechanism, the query completes faster and uses less memory.

### When is it appropriate to use `AsNoTracking()`?

You should use `.AsNoTracking()` for **any query where you are reading data for display or processing purposes and you will not be calling `SaveChanges()` to update that data in the same `DbContext` instance.** This applies to the vast majority of queries in many applications, such as fetching data for reports, dashboards, API GET endpoints, and list views. It is a simple and highly effective performance optimization.
