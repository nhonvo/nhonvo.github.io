---
title: "Database Concurrency Control (Optimistic vs. Pessimistic Locking)"
description: "Explain how to handle concurrent data access and prevent data corruption."
pubDate: "9 6 2025"
published: true
tags:
  [
    "Database",
    "Concurrency",
    "Locking",
    "Optimistic Concurrency",
    "Pessimistic Locking",
    "SQL Server",
    "PostgreSQL",
  ]
---

## Mind Map Summary

- **Goal**: Prevent data corruption when multiple users try to modify the same data simultaneously (the "lost update" problem).
- **Pessimistic Concurrency (Locking)**
  - **Assumption**: Conflicts are likely to happen.
  - **Strategy**: **Lock** the data record as soon as a user reads it for editing. No other user can modify (or sometimes even read) it until the first user releases the lock.
  - **Analogy**: Checking out a book from a library. No one else can check it out until you return it.
  - **Pros**: Simple logic; guarantees no conflicts.
  - **Cons**: **Terrible for scalability**. Not suitable for disconnected web applications, as locks could be held for a long time, blocking other users.
- **Optimistic Concurrency (Versioning)**
  - **Assumption**: Conflicts are rare.
  - **Strategy**: **Do not lock** the data. Allow anyone to read the data at any time. When a user tries to save their changes, the system checks if the data has been modified by someone else since it was originally read.
  - **Implementation**: Typically done with a **concurrency token** (a version number or a timestamp/rowversion column).
  - **Analogy**: Editing a wiki page. The system warns you if someone else saved changes while you were editing.
  - **Pros**: Highly concurrent and scalable. The standard approach for web applications.
  - **Cons**: Requires application code to handle the occasional concurrency conflict when it occurs.

## Core Concepts

### The "Lost Update" Problem

Imagine the following scenario:

1.  **User A** reads a product record. The product name is "Gadget".
2.  **User B** reads the same product record. The name is "Gadget".
3.  **User A** changes the name to "Super Gadget" and saves it. The database now holds "Super Gadget".
4.  **User B** changes the name to "Amazing Gadget" and saves it. The database now holds "Amazing Gadget".

User A's update has been **lost** and overwritten without warning. Concurrency control mechanisms are designed to prevent this.

### 1. Pessimistic Concurrency

This model solves the problem by preventing step 2 from happening while User A is active. When User A reads the record with the intent to update, the database places an exclusive lock on it. If User B tries to read the same record, their request will be blocked until User A commits their transaction and releases the lock. This is simple but scales poorly, as it reduces the number of users who can work concurrently.

### 2. Optimistic Concurrency

This is the preferred model for most modern applications. It assumes that conflicts are infrequent and that it's better to allow work to happen in parallel and only handle the rare conflict.

- **How it Works with EF Core**: You designate a property on your entity as a concurrency token. The `[Timestamp]` attribute is perfect for this, as it maps to a `rowversion` column in SQL Server, which is automatically updated by the database on every `UPDATE`.
  1.  When EF Core reads an entity, it records the value of the concurrency token (e.g., `0x00000000000007D1`).
  2.  When you call `SaveChanges()` to update the entity, EF Core generates an `UPDATE` statement with a `WHERE` clause that checks for the original concurrency token.
  ```sql
  UPDATE [Products] SET [Name] = @p0
  WHERE [Id] = @p1 AND [RowVersion] = @p2;
  ```
  3.  **Success Scenario**: If the `RowVersion` in the database still matches `@p2`, the update succeeds. The database reports that 1 row was affected.
  4.  **Conflict Scenario**: If another user has updated the record in the meantime, the `RowVersion` in the database will have changed. The `WHERE` clause will not find a matching row, and the `UPDATE` statement will report that **0 rows** were affected. EF Core sees this and throws a `DbUpdateConcurrencyException`.

## Practice Exercise

In an EF Core entity, add a `[Timestamp]` property. In your code, fetch an entity, change a property, but before calling `SaveChanges()`, update the same record directly in the database. Now, when you call `SaveChanges()`, it should throw a `DbUpdateConcurrencyException`. Catch this exception and explain how you would handle it (e.g., notify the user, reload data).

## Answer

### Code Example

**1. The Entity with a Concurrency Token**

```csharp
using System.ComponentModel.DataAnnotations;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Timestamp] // This attribute marks the property as a concurrency token
    public byte[] RowVersion { get; set; }
}
```

**2. Simulating and Handling the Conflict**

```csharp
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

public class ConcurrencyDemo
{
    public async Task DemonstrateConflictHandling()
    {
        var dbContext = new AppDbContext();

        // 1. User A fetches the product
        var product = await dbContext.Products.FirstAsync();
        Console.WriteLine($"User A reads product: {product.Name}");

        // 2. User B directly updates the database behind our back
        await dbContext.Database.ExecuteSqlRawAsync(
            "UPDATE Products SET Name = 'Name Updated by User B' WHERE Id = {0}", product.Id);
        Console.WriteLine("User B updates the name in the database.");

        // 3. User A tries to update the product
        Console.WriteLine("User A is now trying to save their change...");
        product.Name = "Name Updated by User A";

        try
        {
            await dbContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException ex)
        {
            Console.WriteLine("\n--- CONCURRENCY CONFLICT DETECTED! ---");

            // A concurrency conflict occurred. We need to resolve it.
            var entry = ex.Entries.Single();
            var databaseValues = await entry.GetDatabaseValuesAsync();

            if (databaseValues == null)
            {
                Console.WriteLine("The entity was deleted by another user.");
            }
            else
            {
                var databaseEntity = (Product)databaseValues.ToObject();
                Console.WriteLine($"The name in the database is now: '{databaseEntity.Name}'");
                Console.WriteLine("You can now show this to the user and ask them to reload the data or force an overwrite.");

                // Example resolution: Reload the entity to get the latest values from the database
                await entry.ReloadAsync();
                // The product object is now updated with the values from User B.
                Console.WriteLine($"After reloading, the product name is: '{product.Name}'");
            }
        }
    }
}
```

### Explanation

1.  **Setup**: The `[Timestamp]` attribute on the `RowVersion` property tells EF Core to use this as a concurrency token. EF Core will now automatically include this column in the `WHERE` clause of any `UPDATE` or `DELETE` statement.
2.  **The Conflict**: We simulate a conflict by fetching a product with EF Core (User A) and then using a raw SQL command to change it (User B). At this point, the `RowVersion` value held in memory by User A's `product` object is stale; the database has a newer version.
3.  **The Exception**: When User A calls `SaveChangesAsync()`, EF Core generates an `UPDATE` statement that includes `WHERE [RowVersion] = <User A's old value>`. The database finds no row that matches this condition because User B's update changed the `RowVersion`. The update affects 0 rows, and EF Core throws a `DbUpdateConcurrencyException`.
4.  **Handling the Exception**: This is the crucial part. Inside the `catch` block, you have several options:
    - **Get Database Values**: `entry.GetDatabaseValuesAsync()` fetches the current values from the database. You can display these to the user.
    - **Get Current Values**: `entry.CurrentValues` holds the values User A was trying to save.
    - **Get Original Values**: `entry.OriginalValues` holds the values that were originally read.
    - **Decide a Strategy**: You can now implement a business rule. Common strategies include:
      - **"Database Wins"**: Discard the user's changes and reload the entity with the latest data (`entry.ReloadAsync()`).
      - **"Client Wins"**: Force an overwrite by re-fetching the data and re-applying the user's changes.
      - **Merge**: Present both sets of values to the user and let them decide how to merge the changes.
