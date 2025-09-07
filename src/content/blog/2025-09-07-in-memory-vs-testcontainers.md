---
title: "In-Memory vs. Testcontainers"
description: "Compare and contrast the use of EF Core's in-memory provider with using a real database in a Docker container (via Testcontainers) for integration testing. Discuss the trade-offs in terms of speed, fidelity, and complexity."
pubDate: "Sep 07 2025"
published: true
tags: ["Testing", "EF Core", "Integration Testing", "In-Memory Database", "Testcontainers"]
---

### Mind Map Summary

- **Topic**: In-Memory vs. Testcontainers
- **Core Concepts**:
    - **In-Memory Provider**: An EF Core database provider that stores data in memory. It is not a relational database and does not support all the features of a real database.
    - **Testcontainers**: A library that allows you to run a real database in a Docker container for integration testing.
- **Trade-offs**:
    - **Speed**:
        - **In-Memory**: Faster, as it does not require a separate database server.
        - **Testcontainers**: Slower, as it needs to start a Docker container.
    - **Fidelity**:
        - **In-Memory**: Low fidelity. It does not behave like a real relational database.
        - **Testcontainers**: High fidelity. You are testing against the same database that you use in production.
    - **Complexity**:
        - **In-Memory**: Simple to set up and use.
        - **Testcontainers**: More complex to set up, as it requires Docker.

### Practice Exercise

Write two sets of integration tests for a repository. One set should use the EF Core in-memory database. The second set should use Testcontainers to spin up a real PostgreSQL or SQL Server container for the tests. Discuss any tests that pass with one setup but fail with the other.

### Answer

**1. In-Memory Tests:**

```csharp
using Microsoft.EntityFrameworkCore;
using Xunit;

public class ProductRepositoryInMemoryTests
{
    [Fact]
    public void Add_Product_Should_Save_To_Database()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseInMemoryDatabase(databaseName: "TestDb")
            .Options;

        using (var context = new MyDbContext(options))
        {
            var repository = new ProductRepository(context);
            repository.Add(new Product { Name = "Test Product" });
        }

        using (var context = new MyDbContext(options))
        {
            Assert.Equal(1, context.Products.Count());
            Assert.Equal("Test Product", context.Products.Single().Name);
        }
    }
}
```

**2. Testcontainers Tests:**

```csharp
using Microsoft.EntityFrameworkCore;
using Testcontainers.PostgreSql;
using Xunit;

public class ProductRepositoryTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _dbContainer = new PostgreSqlBuilder().Build();

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
    }

    public async Task DisposeAsync()
    {
        await _dbContainer.StopAsync();
    }

    [Fact]
    public void Add_Product_Should_Save_To_Database()
    {
        var options = new DbContextOptionsBuilder<MyDbContext>()
            .UseNpgsql(_dbContainer.GetConnectionString())
            .Options;

        using (var context = new MyDbContext(options))
        {
            context.Database.EnsureCreated();
            var repository = new ProductRepository(context);
            repository.Add(new Product { Name = "Test Product" });
        }

        using (var context = new MyDbContext(options))
        {
            Assert.Equal(1, context.Products.Count());
            Assert.Equal("Test Product", context.Products.Single().Name);
        }
    }
}
```

**Discussion:**

-   A test that uses a database-specific feature, such as a raw SQL query with provider-specific syntax, would pass with Testcontainers but fail with the in-memory provider.
-   A test that relies on case-sensitive comparisons might pass with the in-memory provider but fail with a case-insensitive database like SQL Server.
-   In general, Testcontainers provides a much higher level of confidence that your code will work correctly in production, as you are testing against the same database that you use in production.
