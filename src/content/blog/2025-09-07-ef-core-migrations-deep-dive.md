---
title: "EF Core Migrations Deep Dive"
description: "Go beyond 'dotnet ef database update'. Master idempotent scripts, migration bundles, and zero-downtime deployment strategies for production databases."
pubDate: "9 7 2025"
published: true
tags:
  [
    "EF Core",
    "SQL Server",
    "PostgreSQL",
    "CI/CD",
    "DevOps",
    "Database Security",
    "Migrations",
    "Backend Development",
    "Architecture",
  ]
---

## Why Migrations Matter

Migrations are the version control system for your database schema. They allow you to evolve your data model alongside your code, ensuring that every environment (from local dev to production) remains in a consistent state. However, in enterprise settings, simply running `Database.Migrate()` at startup is often restricted or insufficient.

## Advanced Deployment Patterns

### 1. Idempotent SQL Scripts

In CI/CD pipelines, your deployment tool (like Azure Pipelines or GitHub Actions) needs to run scripts safely. An **Idempotent** script checks the `__EFMigrationsHistory` table for each block of SQL. If the migration was already applied, it skips it; if not, it executes.

```bash
# Generate a script from scratch up to the latest version
dotnet ef migrations script --idempotent --output deploy.sql
```

### 2. Migration Bundles

A modern approach in EF Core 6+ is the **Migration Bundle**. It is a single, self-contained executable that contains everything needed to migrate a database. This is ideal for containerized environments.

```bash
# Create the bundle
dotnet ef migrations bundle --self-contained -r linux-x64
```

### 3. Seed Data

Handling initial or reference data is often done through the `HasData` method in `OnModelCreating`. This ensures the data is part of the migration itself.

---

## Practice Exercise

Identify the command to generate a script that migrates from a specific version to the latest, and explain how to handle a "Data-Loss" scenario where a column is being dropped.

---

## Answer

### 1. Versioned Script Generation

If your production DB is currently at migration `v2`, and you want to deploy `v3` and `v4`:

```bash
dotnet ef migrations script v2 --idempotent
```

### 2. Safeguarding Against Data Loss

When dropping a column or table, EF Core will warn you: _"An operation was scaffolded that may result in the loss of data."_

To handle this safely in a production environment:

1.  **Manual Modification (`Up` method)**: Before dropping the column, you should migrate the data to a new location if needed.
2.  **Custom SQL**: Use the `migrationBuilder.Sql()` method inside the migration file.

```csharp
protected override void Up(MigrationBuilder migrationBuilder)
{
    // Step 1: Copy data to a backup or new table before the drop
    migrationBuilder.Sql("INSERT INTO ArchivedEmails (Email) SELECT Email FROM Users");

    // Step 2: Now safe to drop
    migrationBuilder.DropColumn(name: "Email", table: "Users");
}
```

### 3. The Production Rollback

If a migration fails in production:

- **Don't Panicking**: Do not delete the migration files from your project.
- **Scripted Rollback**: Generate a script to take the DB back to the previous known-good state.
- **Code Rollback**: Revert the application code to the previous version to match the database schema.

```bash
# Generate script to revert the database to 'MigrationV1'
dotnet ef migrations script MigrationFailed MigrationV1
```

## Summary

Successful database evolution requires treating SQL scripts as first-class citizens. By using **Idempotent scripts** and **Migration Bundles**, you move away from risky "auto-migration" startup logic toward a controlled, auditable, and repeatable deployment process.
