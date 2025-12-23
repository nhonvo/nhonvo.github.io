---
title: "EF Core Shadow Properties & Backing Fields"
description: "Master advanced data modeling in EF Core. Learn how to store database-only data with Shadow Properties and encapsulate your domain logic using Backing Fields."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "Data Modeling",
    "Shadow Properties",
    "Encapsulation",
    "Domain Driven Design",
    "Backend Development",
    "Software Architecture",
  ]
---

## Modeling Beyond Properties

Entity Framework Core allows you to map your C# classes to a database in ways that preserve the integrity of your Domain Model. Two powerful tools for this are **Shadow Properties** and **Backing Fields**.

---

## 1. Shadow Properties

Shadow Properties are properties that exist in the EF Core Model but **not** in your C# entity class. They are mapped to columns in the database but are managed entirely by EF Core.

### Why Use Them?

- **Auditing**: Storing `LastModified` or `ModifiedBy` without cluttering your business objects.
- **Foreign Keys**: Mapping relationships where you don't want the FK property (like `CategoryId`) to be visible in your code, only the navigation property (`Category`).
- **Metadata**: Any data that the database needs, but your application logic shouldn't care about.

---

## 2. Backing Fields

Backing Fields allow EF Core to read or write directly to a private field in your class, rather than using the public getter and setter.

### Why Use Them?

- **Encapsulation**: You can have a public read-only property (`public decimal Price => _price;`) but let EF Core populate the private `_price` field from the database.
- **Validation logic**: Prevent the application from setting invalid values through the public setter, while still allowing the database to load existing data.
- **DDD (Domain-Driven Design)**: Keeps your entities focused on behavior, protecting the internal state from external tampering.

---

## Practice Exercise

1.  Configure a `LastUpdated` shadow property.
2.  Use a private backing field for a `StockQuantity` property to ensure it never becomes negative through the public API.

---

## Answer

### 1. Implementing the Shadow Property

In `OnModelCreating`:

```csharp
modelBuilder.Entity<Product>()
    .Property<DateTime>("LastUpdated");
```

Automatically updating it in the `DbContext`:

```csharp
public override int SaveChanges()
{
    var entries = ChangeTracker.Entries()
        .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

    foreach (var entry in entries)
    {
        // Update the shadow property
        entry.Property("LastUpdated").CurrentValue = DateTime.UtcNow;
    }
    return base.SaveChanges();
}
```

### 2. Implementing the Backing Field

C# Entity:

```csharp
public class Product
{
    private int _stockQuantity; // The backing field

    public int Id { get; set; }

    // Public property with logic
    public int StockQuantity => _stockQuantity;

    public void AddStock(int amount)
    {
        if (amount < 0) throw new ArgumentException("Cannot add negative stock");
        _stockQuantity += amount;
    }
}
```

In `OnModelCreating`:

```csharp
modelBuilder.Entity<Product>()
    .Property(p => p.StockQuantity)
    .HasField("_stockQuantity") // Tell EF to use the field
    .UsePropertyAccessMode(PropertyAccessMode.Field); // Always use field for DB ops
```

## Why This Architecture Works

1.  **Cleaner Domain**: Your `Product` class doesn't have a `LastUpdated` property, so developers won't accidentally try to "manually" update it in the business logic.
2.  **Safety**: By using a backing field, you guarantee that the `StockQuantity` can only be changed via the `AddStock` method, enforcing your business rules every time.
3.  **Traceability**: Shadow properties provide an excellent way to track system metadata (like which user created a record) while keeping the entity classes purely focused on the business domain.

## Summary

Shadow properties and backing fields are essential for building **robust, domain-driven** applications. They allow you to bridge the gap between a clean, encapsulated C# model and a practical, metadata-heavy database schema.
