---
title: "In-Memory vs. Testcontainers"
description: "Stop writing brittle tests. Compare the speed of EF Core's In-Memory provider with the production-grade reliability of Docker-based Testcontainers."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Testing",
    "EF Core",
    "Docker",
    "Integration Testing",
    "PostgreSQL",
    "Software Quality",
    "DevOps",
    "Backend Development",
  ]
---

## The Testing Dilemma

When writing integration tests for a data access layer, developers face a critical choice: use a "fake" database in RAM for speed, or a "real" database for accuracy.

---

## 1. EF Core In-Memory Provider

EF Core's `.UseInMemoryDatabase()` is a simplified internal storage engine.

| Pros                        | Cons                                     |
| :-------------------------- | :--------------------------------------- |
| Blazing fast execution.     | **Not a relational database**.           |
| Zero external dependencies. | No Foreign Key or Unique Constraints.    |
| Trivial setup.              | Doesn't support Raw SQL or Stored Procs. |

---

## 2. Testcontainers (Docker-Based)

**Testcontainers** is a library that allows you to spin up real Docker containers (SQL Server, Postgres, Redis) on-the-fly for your test session.

| Pros                                                             | Cons                                         |
| :--------------------------------------------------------------- | :------------------------------------------- |
| **High Fidelity**: You test against the exact production engine. | Slower startup (requires Docker pull/start). |
| Supports Triggers, JSON columns, and Collation.                  | Higher setup complexity.                     |
| Validates your Transact-SQL / PL/pgSQL logic.                    | Requires Docker on CI/CD agents.             |

---

## Technical Implementation

### 1. Integration Test with Testcontainers (PostgreSQL)

```csharp
public class UserTests : IAsyncLifetime
{
    private readonly PostgreSqlContainer _container = new PostgreSqlBuilder()
        .WithImage("postgres:15-alpine")
        .Build();

    public async Task InitializeAsync() => await _container.StartAsync();
    public async Task DisposeAsync() => await _container.StopAsync();

    [Fact]
    public async Task CreateUser_EnforcesUniqueEmail()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(_container.GetConnectionString()).Options;

        using var db = new AppDbContext(options);
        await db.Database.EnsureCreatedAsync();

        db.Users.Add(new User { Email = "test@test.com" });
        await db.SaveChangesAsync();

        // This WILL throw an exception on Testcontainers (correct),
        // but would SILENTLY PASS in an In-Memory test.
        db.Users.Add(new User { Email = "test@test.com" });
        await Assert.ThrowsAsync<DbUpdateException>(() => db.SaveChangesAsync());
    }
}
```

---

## Why Fidelity Matters: The "False Positive" Trap

Consider a query using `EF.Functions.Like` or a specific Postgres JSON operator:

1.  **In-Memory**: Will throw a "Method not implemented" exception.
2.  **Testcontainers**: Will execute the query exactly as it would in production.

If you use In-Memory database for complex queries, you aren't testing your data layer—you're testing a simplified C# mock that doesn't share the behavior of your production database.

## Summary

Use **In-Memory** only for trivial unit tests where you need a temporary dummy collection. For any meaningful integration tests—especially those involving **Constraints, Transactions, or Raw SQL**—**Testcontainers** is the industry standard. It ensures that when your tests pass, they pass for the right reasons.
