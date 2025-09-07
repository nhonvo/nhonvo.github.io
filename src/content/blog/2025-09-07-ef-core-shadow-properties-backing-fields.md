---
title: "EF Core Shadow Properties & Backing Fields"
description: "Explain what shadow properties are and why you might use them (e.g., for foreign keys or auditing data that you don't want on your entity model). Discuss how backing fields can allow for read-only properties."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "EF Core", "Data Modeling", "Shadow Properties", "Backing Fields"]
---

### Mind Map Summary

- **Topic**: EF Core Shadow Properties & Backing Fields
- **Core Concepts**:
    - **Shadow Properties**: Properties that are not defined in your .NET entity class but are part of the EF Core model for that entity. They are mapped to columns in the database.
    - **Backing Fields**: Fields that are used to store the data for a property, rather than the property's getter and setter. This allows for more control over how the property is accessed.
- **Use Cases**:
    - **Shadow Properties**:
        - **Foreign Keys**: EF Core can create shadow properties for foreign keys by convention.
        - **Auditing**: Store auditing data like `LastUpdated` or `CreatedBy` without exposing it on the entity class.
    - **Backing Fields**:
        - **Read-Only Properties**: Create properties that can be written to by EF Core but are read-only in the application code.
        - **Validation**: Add validation logic to the property's setter.

### Practice Exercise

Configure a `LastUpdated` shadow property on an entity. Use an interceptor or override `SaveChanges` to automatically set the value of this shadow property whenever the entity is updated. Then, query the database to confirm the value was saved, even though it's not on the C# class.

### Answer

**1. Configure the Shadow Property:**

```csharp
using Microsoft.EntityFrameworkCore;

public class MyDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property<DateTime>("LastUpdated");
    }

    public override int SaveChanges()
    {
        var entries = ChangeTracker
            .Entries()
            .Where(e => e.State == EntityState.Modified);

        foreach (var entry in entries)
        {
            entry.Property("LastUpdated").CurrentValue = DateTime.UtcNow;
        }

        return base.SaveChanges();
    }
}
```

**2. Update an Entity:**

```csharp
var product = context.Products.First();
product.Name = "New Name";
context.SaveChanges();
```

**3. Query the Shadow Property:**

```csharp
var lastUpdated = context.Entry(product).Property("LastUpdated").CurrentValue;
Console.WriteLine($"Last Updated: {lastUpdated}");
```

**Explanation:**

-   We configure the `LastUpdated` shadow property in the `OnModelCreating` method.
-   We override the `SaveChanges` method to automatically set the value of the `LastUpdated` property whenever an entity is modified.
-   We can then query the value of the shadow property using the `Entry` and `Property` methods of the `DbContext`.
