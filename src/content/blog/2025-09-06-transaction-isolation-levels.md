---
title: "Transaction Isolation Levels"
description: "Explain the different isolation levels and the concurrency issues they prevent (dirty reads, phantom reads)."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases", "SQL"]
---

### Mind Map Summary

- **Goal**: To control how isolated a transaction is from the effects of other concurrent transactions, managing a trade-off between consistency and performance.
- **Common Concurrency Problems**
  - **Dirty Read**: Transaction A reads data that Transaction B has changed but not yet committed. If B rolls back, A has read "dirty" data that never officially existed.
  - **Non-Repeatable Read**: Transaction A reads a row. Transaction B then updates or deletes that row and commits. If A reads the same row again, it gets a different value or the row is gone.
  - **Phantom Read**: Transaction A reads a range of rows that satisfy a `WHERE` clause. Transaction B then inserts a new row that matches that `WHERE` clause and commits. If A re-runs its query, it will see a new "phantom" row.
- **SQL Standard Isolation Levels (From lowest to highest isolation)**
  - **1. Read Uncommitted**
    - **Prevents**: Nothing.
    - **Allows**: Dirty Reads, Non-Repeatable Reads, Phantom Reads.
  - **2. Read Committed** (Default for most databases like SQL Server)
    - **Prevents**: Dirty Reads.
    - **Allows**: Non-Repeatable Reads, Phantom Reads.
  - **3. Repeatable Read**
    - **Prevents**: Dirty Reads, Non-Repeatable Reads.
    - **Allows**: Phantom Reads.
  - **4. Serializable**
    - **Prevents**: Dirty Reads, Non-Repeatable Reads, Phantom Reads.
    - **How**: Places range locks, making transactions appear as if they were executed one after another in a series.
    - **Cost**: The highest level of locking, which can significantly reduce concurrency.

### Core Concepts

#### 1. Why Isolation is Needed
In any system with multiple users or processes accessing a database simultaneously, there's a risk that their operations will interfere with each other. Transaction isolation is a fundamental concept of the ACID (Atomicity, Consistency, Isolation, Durability) properties that guarantees data consistency. By choosing an isolation level, you are making a conscious trade-off: do you prioritize high performance and concurrency (at the risk of data anomalies), or do you prioritize perfect data consistency (at the cost of performance)?

#### 2. How Isolation is Implemented
Databases implement isolation using locking. When a transaction accesses data, the database may place a lock on that data, preventing other transactions from modifying (or sometimes even reading) it until the first transaction is complete. Higher isolation levels acquire more restrictive locks for longer durations.

- **Read Committed**: A transaction holds a write lock on data it is changing until it commits or rolls back. It only holds a read lock for the brief moment it is reading the data. This prevents dirty reads.
- **Repeatable Read**: A transaction holds read and write locks on all affected rows for the entire duration of the transaction. This prevents other transactions from modifying the rows you've already read.
- **Serializable**: This level goes a step further. It places a lock not just on the rows you've read, but on the *range* of data defined by your `WHERE` clause. This prevents other transactions from inserting new rows that would match your query, thus preventing phantom reads.

### Practice Exercise

Using EF Core, begin a transaction with the `Serializable` isolation level. Within the transaction, read a range of records from a table. Before committing, use a separate database connection to insert a new row into that range. Attempt to re-read the range within the transaction and explain why it blocks or fails, thus preventing a phantom read.

### Answer

#### Code Example

```csharp
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

// Assume a simple Product entity and AppDbContext are defined

public class IsolationDemo
{
    private readonly string _connectionString = "...";

    public async Task DemonstratePhantomReadPrevention()
    {
        // --- Transaction 1: The Reader ---
        await using var context1 = new AppDbContext(_connectionString);
        await using var transaction1 = await context1.Database.BeginTransactionAsync(System.Data.IsolationLevel.Serializable);

        Console.WriteLine("TX1: Reading all products with price > 50...");
        var products = await context1.Products.Where(p => p.Price > 50).ToListAsync();
        Console.WriteLine($"TX1: Found {products.Count} products.");

        // --- Transaction 2: The Writer ---
        Console.WriteLine("TX2: Attempting to insert a new product into the range...");
        var writerTask = Task.Run(async () => {
            await using var context2 = new AppDbContext(_connectionString);
            context2.Products.Add(new Product { Name = "Super Widget", Price = 150 });
            // This SaveChanges call will BLOCK because TX1 has a range lock
            await context2.SaveChangesAsync(); 
            Console.WriteLine("TX2: Insert completed."); // This line will be delayed
        });

        // Wait a moment to ensure the writer task has started and is blocked
        await Task.Delay(2000);

        // --- Back in Transaction 1 ---
        Console.WriteLine("TX1: Re-reading products with price > 50...");
        products = await context1.Products.Where(p => p.Price > 50).ToListAsync();
        Console.WriteLine($"TX1: Found {products.Count} products again. The count is consistent.");

        Console.WriteLine("TX1: Committing transaction.");
        await transaction1.CommitAsync();

        // Wait for the writer task to complete now that the lock is released
        await writerTask;
        Console.WriteLine("Demo finished.");
    }
}
```

#### Explanation

1.  **Transaction 1 Starts**: We begin a transaction in `context1` with the `Serializable` isolation level. This signals to the database that we require the highest level of isolation.
2.  **First Read**: `TX1` executes a `SELECT` query with a `WHERE p.Price > 50` clause. Because the isolation level is `Serializable`, the database doesn't just lock the rows it finds; it places a **range lock** on the index. This lock effectively says, "No other transaction is allowed to insert, update, or delete any row that would satisfy the condition `Price > 50` until I am finished."
3.  **Transaction 2 Attempts to Write**: The `writerTask` starts on a separate thread and uses a new `DbContext` (`context2`). It tries to `INSERT` a new `Product` with a price of 150, which falls within the locked range. When `context2.SaveChangesAsync()` is called, the database sees that the new row conflicts with `TX1`'s range lock. Instead of proceeding, the database **blocks** `TX2`, forcing it to wait.
4.  **Second Read**: Back in `TX1`, we re-run the exact same query. Because `TX2` is blocked, no new "phantom" row has been inserted. The query returns the exact same result set as the first read, ensuring perfect consistency within the transaction.
5.  **Commit and Unblock**: `TX1` commits. This releases all its locks, including the range lock. The database immediately unblocks `TX2`, which can now successfully complete its `INSERT` operation.

This demonstrates how the `Serializable` isolation level successfully prevents phantom reads by enforcing strict locking, albeit at the cost of blocking concurrent write operations that fall within the locked range.