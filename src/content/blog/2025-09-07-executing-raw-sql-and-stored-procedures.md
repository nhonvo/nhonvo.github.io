---
title: "Executing Raw SQL and Stored Procedures"
description: "Explain when it's appropriate to drop down to raw SQL or stored procedures with EF Core. Discuss the security implications (SQL injection) and how to prevent them."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "EF Core", "SQL", "Stored Procedures", "Security"]
---

### Mind Map Summary

- **Topic**: Executing Raw SQL and Stored Procedures
- **When to Use**:
    - **Performance**: When a query is too complex for LINQ to generate efficient SQL.
    - **Legacy Databases**: When working with a database that has existing stored procedures.
    - **Bulk Operations**: For performing bulk updates or deletes.
- **Security Implications**:
    - **SQL Injection**: The biggest risk when using raw SQL. Always use parameterized queries to prevent SQL injection attacks.
- **EF Core Methods**:
    - **`FromSqlRaw`**: Executes a raw SQL query and maps the results to entities.
    - **`ExecuteSqlRaw`**: Executes a raw SQL command (e.g., INSERT, UPDATE, DELETE) and returns the number of rows affected.

### Practice Exercise

Write code that safely executes a stored procedure using `FromSqlRaw` to return a list of entities. Ensure that you are passing parameters correctly to prevent SQL injection.

### Answer

**1. Stored Procedure:**

```sql
CREATE PROCEDURE GetProductsByCategory
    @CategoryId INT
AS
BEGIN
    SELECT * FROM Products WHERE CategoryId = @CategoryId
END
```

**2. C# Code to Execute the Stored Procedure:**

```csharp
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Data.SqlClient;

public class ProductRepository
{
    private readonly MyDbContext _context;

    public ProductRepository(MyDbContext context)
    {
        _context = context;
    }

    public List<Product> GetProductsByCategory(int categoryId)
    {
        var categoryIdParam = new SqlParameter("@CategoryId", categoryId);

        return _context.Products
            .FromSqlRaw("EXEC GetProductsByCategory @CategoryId", categoryIdParam)
            .ToList();
    }
}
```

**Explanation:**

-   We use `FromSqlRaw` to execute the stored procedure.
-   We use a `SqlParameter` to pass the `categoryId` to the stored procedure. This is the key to preventing SQL injection.
-   EF Core will automatically parameterize the query, so you don't have to worry about SQL injection vulnerabilities.
