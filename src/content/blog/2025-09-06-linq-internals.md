---
title: "LINQ Internals (IQueryable vs. IEnumerable, Deferred Execution)"
description: "Explain how this impacts database queries with Entity Framework."
pubDate: "Sep 06 2025"
published: true
tags: [".NET & C# Advanced"]
---

### Mind Map Summary

- **LINQ (Language-Integrated Query)**
  - **Core Principle: Deferred Execution**
    - **Definition**: The query is built but not executed until the collection is enumerated (e.g., with `ToList()`, `foreach`, `First()`).
    - **Benefit**: Allows for building dynamic queries and can prevent fetching unnecessary data.
  - **Key Interfaces for Querying**
    - **`IEnumerable<T>` (In-Memory Querying)**
      - **Represents**: A sequence of objects in your application's memory.
      - **Execution**: Uses LINQ to Objects. If used on a database query, it will fetch **all the data** from the table first, then filter it in your application's memory.
      - **Use Case**: Querying local collections like `List<T>` or `T[]`.
    - **`IQueryable<T>` (Remote Querying)**
      - **Represents**: A query to be executed by a remote data source (like a SQL database).
      - **Execution**: Translates the C# LINQ query into an **Expression Tree**. The remote provider (e.g., Entity Framework) converts this tree into a native query (e.g., SQL).
      - **Benefit**: The filtering (`WHERE`), ordering (`ORDER BY`), etc., happens efficiently on the database server.
      - **Use Case**: Querying databases with Entity Framework Core.

### Core Concepts

#### 1. Deferred Execution
- **Definition**: This is the cornerstone of LINQ's power and efficiency. When you write a LINQ query, you are not running the query; you are only building a query plan. The query is only executed (i.e., the data is fetched and processed) when you materialize the results. 
- **Triggering Execution**: Execution is triggered by methods that need to access the elements, such as:
  - `ToList()`, `ToArray()`, `ToDictionary()`
  - `First()`, `FirstOrDefault()`, `Single()`, `Count()`
  - Iterating with a `foreach` loop.

#### 2. `IEnumerable<T>`
- **What it is**: The base interface for all non-generic and generic collections in .NET that can be enumerated. It represents a sequence of items that you can iterate over. 
- **How it Works with LINQ**: When you use LINQ methods on an `IEnumerable<T>`, you are using **LINQ to Objects**. The methods expect C# code (`Func<T, bool>`) to execute. If you have a database query and you switch to `IEnumerable` (e.g., by calling `.AsEnumerable()`), you are telling the provider, "Fetch all the data from the database now, and I will handle the rest of the filtering/sorting/projecting in my application's memory."
- **Performance Pitfall**: Using `IEnumerable` too early in a database query can cause massive performance issues by transferring entire tables over the network.

#### 3. `IQueryable<T>`
- **What it is**: An interface that inherits from `IEnumerable<T>` but is fundamentally different. It represents a query that will be executed by an external provider.
- **How it Works with LINQ**: When you use LINQ methods on an `IQueryable<T>`, you are building up an **Expression Tree**. This is a data structure that represents your C# code as data. The query provider (like EF Core) can inspect this tree and translate it into the appropriate query language (e.g., SQL). The methods expect expressions (`Expression<Func<T, bool>>`) that can be translated.
- **Benefit**: This allows the filtering, sorting, and projecting to be done efficiently on the database server, meaning only the data you actually need is sent back to your application.

### Practice Exercise

Using EF Core and an in-memory database, write a query against a `DbSet<Product>`. First, use `.AsEnumerable()` before a `.Where()` clause and inspect the generated query. Then, write the same logic but use `.AsQueryable()` (or just chain the `.Where()` directly) and explain the difference in the executed SQL.

### Answer

#### Code Example

```csharp
using Microsoft.EntityFrameworkCore;
using System.Linq;

// 1. Define the Model and DbContext
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlServer("Server=(localdb)\mssqllocaldb;Database=LinqDemo;Trusted_Connection=True;"); // Replace with your connection string
}

public class Program
{
    public static void Main()
    {
        using var context = new AppDbContext();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        context.Products.AddRange(
            new Product { Name = "Laptop", Price = 1200 },
            new Product { Name = "Mouse", Price = 25 },
            new Product { Name = "Keyboard", Price = 80 }
        );
        context.SaveChanges();

        // --- Scenario 1: Using AsEnumerable() ---
        Console.WriteLine("--- Using AsEnumerable() ---");
        var expensiveProducts_Enumerable = context.Products
            .AsEnumerable() // Switches to client-side execution
            .Where(p => p.Price > 100)
            .ToList();

        // --- Scenario 2: Using IQueryable ---
        Console.WriteLine("\n--- Using IQueryable ---");
        var expensiveProducts_Queryable = context.Products
            .Where(p => p.Price > 100) // Stays as IQueryable
            .ToList();
    }
}
```

#### Explanation of the Difference

To see the generated SQL, you would need to enable logging in EF Core. If we did, this is what we would see:

1.  **Scenario 1 (`AsEnumerable`) - Client-Side Evaluation**
    -   **Generated SQL**: `SELECT [p].[Id], [p].[Name], [p].[Price] FROM [Products] AS [p]`
    -   **Explanation**: The call to `.AsEnumerable()` forces EF Core to stop building the expression tree and immediately execute the query built so far. It fetches **every single product** from the database. The subsequent `.Where(p => p.Price > 100)` is then executed in your application's memory on the full list of products. This is highly inefficient as it transfers potentially millions of rows only to discard most of them.

2.  **Scenario 2 (`IQueryable`) - Server-Side Evaluation**
    -   **Generated SQL**: `SELECT [p].[Id], [p].[Name], [p].[Price] FROM [Products] AS [p] WHERE [p].[Price] > 100.0`
    -   **Explanation**: Because we never left the `IQueryable` context, the `.Where()` method was translated into the expression tree. When `.ToList()` was called, EF Core translated the *entire tree* into an optimized SQL query. The `WHERE` clause is part of the SQL, so the database does the filtering, and only the data you actually need is sent back to your application. This is vastly more efficient.