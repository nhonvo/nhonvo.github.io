---
title: "Dapper vs. Entity Framework Core"
description: "Compare a micro-ORM with a full-blown ORM and when to choose one over the other."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "ORM",
    "Dapper",
    "EF Core",
    "Database",
    "Performance",
    "Entity Framework",
    "Micro-ORM",
    "Data Access",
  ]
---

## Mind Map Summary

- **Goal**: Access data from a relational database in .NET.
- **EF Core (Full-Featured ORM - Object-Relational Mapper)**
  - **Concept**: Abstracts the database into C# objects (`DbSet<T>`) and LINQ queries.
  - **Pros**:
    - **Productivity**: Extremely fast for development. No need to write SQL for CRUD operations.
    - **Features**: Change tracking, database migrations, LINQ provider, caching.
    - **Type Safety**: Queries are checked at compile time.
  - **Cons**:
    - **Performance**: The abstraction layer adds overhead, making it slower than Dapper for raw queries.
    - **Control**: You don't have direct control over the generated SQL, which may not always be optimal.
- **Dapper (Micro ORM)**
  - **Concept**: A simple object mapper that extends `IDbConnection`. It excels at one thing: mapping SQL query results to C# objects.
  - **Pros**:
    - **Performance**: Very high performance, near the speed of raw ADO.NET DataReaders.
    - **Control**: You write the SQL, giving you complete control to optimize it.
    - **Lightweight**: It's just a NuGet package with a set of extension methods.
  - **Cons**:
    - **Manual SQL**: You must write your own SQL queries for everything.
    - **No Features**: Lacks change tracking, migrations, and LINQ-to-SQL translation.
- **The Verdict: The Hybrid Approach**
  - **Best Practice**: Use both in the same project.
  - **Use EF Core for**: The majority of your work. Writing data (`INSERT`, `UPDATE`, `DELETE`) and simple, common reads. Its productivity benefits are huge.
  - **Use Dapper for**: Performance-critical scenarios. Complex, hand-optimized reporting queries, or bulk data operations where raw speed is the top priority.

## Core Concepts

### 1. EF Core: The Abstraction-Heavy Approach

EF Core is a comprehensive Object-Relational Mapper. Its primary goal is to increase developer productivity by allowing you to work with a conceptual model (your C# classes) instead of a logical one (the database schema). You write LINQ queries, and EF Core translates them into SQL. It tracks changes to your objects, so you can just modify a property and call `SaveChanges()` to persist the update. It can even manage your database schema over time with migrations. This rich feature set comes at the cost of a performance overhead compared to more direct data access methods.

### 2. Dapper: The Lightweight Speedster

Dapper, often called a "micro ORM," doesn't try to do everything. It focuses on being the fastest way to get data out of a database and into your C# objects. It provides a set of extension methods on the standard `IDbConnection` interface. You write the SQL query yourself, and Dapper handles the boilerplate of opening a connection, creating a command, executing a reader, and mapping the results to a list of objects. Because you write the SQL, you have full control to tune it for maximum performance. It has no concept of change tracking or migrations.

## Practice Exercise

Create a simple `Product` table. Write a method to fetch a product by its ID using EF Core. Write a second method to do the exact same thing using Dapper. Compare the code required for both and discuss the scenarios where Dapper's performance and control might be preferable.

## Answer (Comparing EF Core and Dapper in C#)

First, add the required NuGet packages: `Microsoft.EntityFrameworkCore.SqlServer` and `Dapper`.

### 1. The `Product` Class and EF Core `DbContext`

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    // ... OnConfiguring ...
}
```

### 2. The Repository Showing Both Approaches

```csharp
using Dapper;
using Microsoft.Data.SqlClient;
using System.Threading.Tasks;

public class ProductRepository
{
    private readonly AppDbContext _efContext;
    private readonly string _connectionString;

    public ProductRepository(AppDbContext efContext, IConfiguration config)
    {
        _efContext = efContext;
        _connectionString = config.GetConnectionString("DefaultConnection");
    }

    // --- EF Core Approach ---
    public async Task<Product> GetProductById_EFCore(int id)
    {
        // LINQ query, no SQL written.
        // FindAsync is optimized for finding a single entity by its primary key.
        return await _efContext.Products.FindAsync(id);
    }

    // --- Dapper Approach ---
    public async Task<Product> GetProductById_Dapper(int id)
    {
        // We write the SQL ourselves.
        var sql = "SELECT * FROM Products WHERE Id = @ProductId";

        // Dapper extends IDbConnection.
        using (var connection = new SqlConnection(_connectionString))
        {
            // Dapper handles mapping the result to the Product object.
            return await connection.QuerySingleOrDefaultAsync<Product>(sql, new { ProductId = id });
        }
    }
}
```

### Code Comparison

- **EF Core**: The code is extremely concise. We don't see any SQL. We query against a `DbSet` using a familiar LINQ-like method (`FindAsync`). It's simple and highly productive.
- **Dapper**: The code is more verbose. We have to manually write the SQL query and create/manage the `IDbConnection`. However, the code is still very clear. We see exactly what query is being run, and Dapper handles the mapping for us.

### When is Dapper Preferable?

While EF Core is great for the `GetProductById` scenario, Dapper's performance and control become preferable in several key situations:

1. **Complex Reporting Queries**: Imagine a query that needs to `JOIN` across 10 tables, perform complex aggregations (`GROUP BY`, `SUM`), and use database-specific functions for performance. Writing this in LINQ would be difficult, and the SQL generated by EF Core might be inefficient. With Dapper, a SQL expert can write a perfectly tuned query by hand.
2. **Bulk Operations**: When you need to read or write thousands of records as quickly as possible (e.g., in a data import/export utility), the overhead of EF Core's change tracking can be significant. Dapper's raw speed makes it a better choice for these bulk scenarios.
3. **Legacy Databases or Stored Procedures**: When working with databases that have a heavy reliance on complex, existing stored procedures, Dapper is a natural fit. Calling a stored procedure and mapping its results with Dapper is trivial.

In summary, the modern best practice is often a **hybrid approach**: use EF Core for the 80% of your application involving standard CRUD operations to maximize productivity, and drop down to Dapper for the 20% of performance-critical queries where speed and control are paramount.
