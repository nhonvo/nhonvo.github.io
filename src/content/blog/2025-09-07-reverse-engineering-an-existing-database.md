---
title: "Reverse Engineering an Existing Database"
description: "Master the 'Database-First' approach with EF Core. Learn how to scaffold entities and DbContext from a legacy database while maintaining clean code standards."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    ".NET",
    "SQL Server",
    "Database-First",
    "DevOps",
    "Backend Development",
    "Software Architecture",
  ]
---

## The Database-First Reality

While "Code-First" is popular for new projects, most enterprise applications interact with pre-existing, non-negotiable databases. This is where **EF Core Reverse Engineering** (scaffolding) becomes essential. It allows you to generate C# classes and a `DbContext` based on a current database schema.

---

## The Scaffolding Workflow

To generate your model, you use the `dotnet ef` CLI tool.

### 1. Prerequisites

You must have the following NuGet packages installed in your Startup/API project:

- `Microsoft.EntityFrameworkCore.Design`
- The specific provider (e.g., `Microsoft.EntityFrameworkCore.SqlServer` or `npgsql.entityframeworkcore.postgresql`)

### 2. The Command

```bash
dotnet ef dbcontext scaffold "Your_Connection_String" Microsoft.EntityFrameworkCore.SqlServer \
    --output-dir Models \
    --context AppDbContext \
    --namespace MyProject.Data \
    --force
```

### 3. Key Flags

- `--output-dir`: Where the entity classes go.
- `--context-dir`: Where the `DbContext` class goes.
- `--table`: Scaffold only specific tables (excellent for giant legacy DBs).
- `--use-database-names`: Keeps DB column names exactly as they are in SQL instead of trying to "C#-ify" them.

---

## The Maintenance Challenge

The biggest risk with scaffolding is **overwriting changes**. If you customize the generated classes (e.g., adding business logic) and then run the scaffold command again, your changes will be deleted.

### Best Practices for Regeneration

1.  **Partial Classes**: The scaffolded entities are generated as `partial`. You should put your custom logic (methods, non-mapped properties) in a _separate_ file with the same name.
2.  **Fluent API**: EF Core scaffolds configuration into the `OnModelCreating` method. If it becomes too large, move the configuration into separate `IEntityTypeConfiguration<T>` classes.
3.  **T4 Templates**: (Advanced) You can customize the T4 templates that EF Core uses to control exactly how the C# code is generated.

---

## Practice Exercise

Scaffold a specific list of tables from a database, ensuring that the `DbContext` is placed in a separate folder from the entities.

---

## Answer

### The Optimized Command

```bash
dotnet ef dbcontext scaffold "Server=.\SQLExpress;Database=StoreDB;Integrated Security=SSPI;" \
    Microsoft.EntityFrameworkCore.SqlServer \
    --output-dir Domain/Entities \
    --context-dir Infrastructure/Data \
    --context StoreDbContext \
    --table Products \
    --table Categories \
    --data-annotations
```

### Why This Setup Works:

1.  **Separation of Concerns**: By using `--output-dir` and `--context-dir`, we keep our **Entities** (Domain layer) separate from the **DbContext** (Infrastructure layer).
2.  **Granularity**: By specifying `--table`, we avoid bloating our project with thousands of legacy/audit tables we don't need code for.
3.  **Data Annotations**: Using `--data-annotations` causes EF to add attributes like `[Required]` and `[StringLength]` directly to the classes, which can be useful for automatic UI validation in Blazor or MVC.

## Summary

Reverse engineering is a bridge between the old and the new. By using **Partial Classes** and strategic **CLI flags**, you can maintain a clean, modern .NET architecture even when tethered to a decades-old SQL database.
