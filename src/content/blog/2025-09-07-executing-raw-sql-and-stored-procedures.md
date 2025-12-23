---
title: "Executing Raw SQL and Stored Procedures"
description: "Know when to bypass LINQ for high-performance SQL. Learn how to safely execute Raw SQL and Stored Procedures in EF Core while preventing SQL injection."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "SQL Server",
    "PostgreSQL",
    "Stored Procedures",
    "Security",
    "Performance Tuning",
    "Backend Development",
  ]
---

## When to Bypass LINQ?

While Entity Framework Core's LINQ provider is powerful, there are specific scenarios where dropping down to Raw SQL or Stored Procedures is the correct architectural choice:

1.  **Complex Performance Tuning**: When LINQ generates inefficient SQL (e.g., massive joins or complex subqueries) that requires a specific index hint or specialized SQL syntax.
2.  **Existing DB Assets**: When integrating with a legacy database that already contains optimized Stored Procedures.
3.  **Bulk Operations**: Performing a single SQL statement that updates thousands of rows (`UPDATE Products SET Price = Price * 1.1`) is significantly faster than loading all entities into memory and saving them.
4.  **Database-Specific Features**: Using syntax that EF Core doesn't support yet (e.g., recursive Common Table Expressions or Full-Text search features).

---

## Technical Implementation & Security

The #1 rule of Raw SQL is: **NEVER use string interpolation/concatenation**. This is the most common source of SQL Injection vulnerabilities.

### 1. Querying for Entities (`FromSqlRaw` / `FromSqlInterpolated`)

```csharp
// Safe: Using Parameterized SQL
var categoryId = 5;
var products = await _context.Products
    .FromSqlRaw("SELECT * FROM Products WHERE CategoryId = {0}", categoryId)
    .ToListAsync();

// Even Safer: Using String Interpolation (EF Core handles the parameters)
var productsAlt = await _context.Products
    .FromSqlInterpolated($"SELECT * FROM Products WHERE CategoryId = {categoryId}")
    .ToListAsync();
```

### 2. Executing Commands (`ExecuteSqlRaw`)

Used for `UPDATE`, `DELETE`, or stored procedures that don't return data.

```csharp
var rowsAffected = await _context.Database.ExecuteSqlRawAsync(
    "UPDATE Products SET Stock = 0 WHERE IsDiscontinued = {0}", true);
```

---

## Practice Exercise

Implement a safe call to a stored procedure that takes multiple parameters to return a filtered list of entities.

---

## Answer

### 1. The Stored Procedure (SQL Server)

```sql
CREATE PROCEDURE GetActiveProductsByPrice
    @MinPrice DECIMAL(18,2),
    @MaxPrice DECIMAL(18,2)
AS
BEGIN
    SELECT * FROM Products
    WHERE Price BETWEEN @MinPrice AND @MaxPrice
    AND IsActive = 1
END
```

### 2. The Repository Implementation

```csharp
using Microsoft.Data.SqlClient; // Required for SqlParameter

public async Task<List<Product>> FindActiveProducts(decimal min, decimal max)
{
    // Define explicit parameters to ensure type safety and security
    var minParam = new SqlParameter("@MinPrice", min);
    var maxParam = new SqlParameter("@MaxPrice", max);

    // EXEC [ProcedureName] [Parameters]
    return await _context.Products
        .FromSqlRaw("EXEC GetActiveProductsByPrice @MinPrice, @MaxPrice", minParam, maxParam)
        .ToListAsync();
}
```

### Why This Architecture Works

1.  **Security**: Using `SqlParameter` or the `{0}` placeholder ensures that the database driver treats the input strictly as data, not as executable code. This makes SQL Injection impossible.
2.  **Performance**: Stored Procedures are pre-compiled in SQL Server, which can offer a slight performance edge for extremely complex execution plans.
3.  **Clean Code**: You can still use LINQ methods _after_ the `FromSqlRaw` call (e.g., `.OrderBy(p => p.Name).Take(10)`), and EF Core will attempt to compose the final SQL accordingly.

## Summary

Dropping to Raw SQL is not a "failure" to use EF Core—it's a sign of a pragmatic developer. By understanding how to use **parameterized queries**, you can harness the full power of your database engine without compromising the security of your application.
