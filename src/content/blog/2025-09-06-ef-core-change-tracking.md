---
title: "EF Core (Change Tracking, Loading Strategies: Eager, Explicit, Lazy)"
description: "Deeply understand how EF Core works to avoid performance pitfalls. Explain N+1 problem."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases", "Entity Framework Core"]
---

### Mind Map Summary

- **Change Tracking**
  - **What**: The `DbContext`'s ability to track the state of entities.
  - **How**: When an entity is queried, a snapshot of its original values is stored. When `SaveChanges()` is called, EF Core compares the current values to the snapshot to generate `UPDATE` statements.
  - **Entity States**: 
    - `Detached`: Not tracked.
    - `Unchanged`: Tracked, but not modified.
    - `Modified`: A property has been changed.
    - `Added`: A new entity to be inserted.
    - `Deleted`: An entity to be deleted.
- **Data Loading Strategies**
  - **1. Eager Loading**
    - **What**: Loading related data as part of the initial query.
    - **How**: Using the `.Include()` and `.ThenInclude()` methods.
    - **Pro**: Most efficient. Fetches all required data in a single database roundtrip.
    - **Con**: Can result in complex queries if overused.
  - **2. Explicit Loading**
    - **What**: Manually loading related data for an entity that is already in memory.
    - **How**: `context.Entry(author).Collection(a => a.Books).Load();`
    - **Pro**: Gives fine-grained control over when data is loaded.
    - **Con**: Requires an additional database roundtrip.
  - **3. Lazy Loading**
    - **What**: Related data is transparently loaded from the database the first time a navigation property is accessed.
    - **How**: Requires installing `Microsoft.EntityFrameworkCore.Proxies` and making navigation properties `virtual`.
    - **Pro**: Simple to use.
    - **Con**: Can cause the **N+1 Query Problem**, leading to severe performance issues.

### Core Concepts

#### 1. Change Tracking
This is the magic behind how EF Core knows what to save to the database. Every `DbContext` instance has a `ChangeTracker`. When you retrieve entities via a query, they are automatically tracked. The change tracker keeps a snapshot of the entity's original state. If you modify a property on a tracked entity, the change tracker detects this and changes the entity's state to `Modified`. When you call `DbContext.SaveChanges()`, the context inspects the change tracker and generates the necessary `INSERT`, `UPDATE`, or `DELETE` statements for all entities that are not in the `Unchanged` state.

#### 2. Eager Loading
This is generally the preferred method for loading related data. You explicitly tell EF Core what related entities you want to retrieve in your initial query. EF Core will then generate a SQL query (typically using `JOIN`s) to fetch all the data in a single, efficient roundtrip to the database.

- **Example**: `var blogs = context.Blogs.Include(b => b.Posts).ThenInclude(p => p.Comments).ToList();`

#### 3. Explicit Loading
This approach is useful when you only need related data under certain conditions. You first load the main entity, and then later, you can explicitly issue a command to load a related collection or reference.

- **Example**: `var blog = context.Blogs.Find(1); // ... some time later ... context.Entry(blog).Collection(b => b.Posts).Load();`

#### 4. Lazy Loading and the N+1 Problem
Lazy loading seems convenient because it feels like the data is just there when you need it. However, it's a dangerous trap. If you are not careful, it can lead to the **N+1 Query Problem**.

- **The Problem**: Imagine you execute one query to get a list of 100 authors (`1` query). Then, you loop through these authors and access the `author.Books` navigation property for each one. If lazy loading is enabled, EF Core will execute a *separate* database query for *each* author to fetch their books. This results in 1 (for the authors) + 100 (one for each author's books) = **101** total queries. This is incredibly inefficient and will cripple your application's performance.

### Practice Exercise

Create two related entities, `Author` and `Book` (one-to-many). Write a query to fetch all authors and then loop through them, printing the title of each book. Enable logging to show the N+1 query problem. Refactor the initial query using `Include()` (eager loading) to solve the problem in a single database roundtrip.

### Answer

#### Code Example

**1. The Entities and DbContext**

```csharp
public class Author { public int Id { get; set; } public string Name { get; set; } public virtual ICollection<Book> Books { get; set; } = new List<Book>(); }
public class Book { public int Id { get; set; } public string Title { get; set; } public int AuthorId { get; set; } public virtual Author Author { get; set; } }

public class AppDbContext : DbContext
{
    public DbSet<Author> Authors { get; set; }
    public DbSet<Book> Books { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
        // Enable logging to see the generated SQL
        => options.UseSqlServer("...")
                  .LogTo(Console.WriteLine, LogLevel.Information);

    // Enable Lazy Loading (for the N+1 demo)
    // services.AddDbContext<AppDbContext>(options => options.UseLazyLoadingProxies()...)
}
```

**2. The N+1 Problem Demonstration (Lazy Loading)**

```csharp
// Assuming Lazy Loading is enabled
Console.WriteLine("--- DEMONSTRATING N+1 PROBLEM ---");
var authors = context.Authors.ToList(); // Query 1: Get all authors

foreach (var author in authors)
{
    // Query 2, 3, 4...: A new query is fired here for EACH author!
    Console.WriteLine($"Author: {author.Name}");
    foreach (var book in author.Books) 
    {
        Console.WriteLine($"  Book: {book.Title}");
    }
}
```

**Generated SQL Logs (Simplified):**

```sql
-- Query 1
SELECT [a].[Id], [a].[Name] FROM [Authors] AS [a]

-- Query 2
exec sp_executesql N'SELECT [b].[Id], [b].[Title], [b].[AuthorId] FROM [Books] AS [b] WHERE [b].[AuthorId] = @__p_0',N'@__p_0 int',@__p_0=1

-- Query 3
exec sp_executesql N'SELECT [b].[Id], [b].[Title], [b].[AuthorId] FROM [Books] AS [b] WHERE [b].[AuthorId] = @__p_0',N'@__p_0 int',@__p_0=2

-- ... and so on for every author.
```

**3. The Solution (Eager Loading)**

```csharp
Console.WriteLine("\n--- SOLVING WITH EAGER LOADING ---");
// Use .Include() to fetch authors and their books in a single query
var authorsWithBooks = context.Authors
    .Include(author => author.Books)
    .ToList();

foreach (var author in authorsWithBooks)
{
    // No database query happens here!
    Console.WriteLine($"Author: {author.Name}");
    foreach (var book in author.Books)
    {
        Console.WriteLine($"  Book: {book.Title}");
    }
}
```

**Generated SQL Log (Simplified):**

```sql
-- A SINGLE, EFFICIENT QUERY
SELECT [a].[Id], [a].[Name], [b].[Id], [b].[Title], [b].[AuthorId]
FROM [Authors] AS [a]
LEFT JOIN [Books] AS [b] ON [a].[Id] = [b].[AuthorId]
ORDER BY [a].[Id]
```

#### Explanation

The logs clearly show the problem and the solution. The first approach, relying on lazy loading, is a performance disaster. It makes a separate database call for every single author to get their books. The second approach, using **`Include()`**, tells Entity Framework Core to generate a single, more complex query using a `LEFT JOIN`. This query fetches all the required data from both tables in one efficient roundtrip. When the code then loops through `author.Books`, the data is already present in memory, and no further database calls are made.