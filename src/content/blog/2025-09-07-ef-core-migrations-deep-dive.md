---
title: "EF Core Migrations Deep Dive"
description: "Discuss advanced migration scenarios, such as generating idempotent SQL scripts for deployment, and strategies for rolling back a failed migration in a production environment."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "EF Core", "Migrations", "Database Deployment"]
---

### Mind Map Summary

- **Topic**: EF Core Migrations Deep Dive
- **Core Concepts**:
    - **Idempotent Scripts**: SQL scripts that can be run multiple times without causing errors. This is important for CI/CD pipelines, where the same script may be run multiple times.
    - **Rollbacks**: Strategies for rolling back a failed migration in a production environment. This can be done by applying the `Down` migration or by restoring a database backup.
    - **Customizing Migrations**: Modifying the generated migration code to handle complex scenarios, such as data seeding or custom SQL operations.
- **Advanced Scenarios**:
    - **Deploying to Production**: Generating SQL scripts for deployment, using `dotnet ef migrations script`.
    - **Handling Multiple Providers**: Creating migrations for multiple database providers (e.g., SQL Server and PostgreSQL).
    - **Zero-Downtime Deployments**: Strategies for deploying database changes without taking the application offline.

### Practice Exercise

Generate a SQL script from your EF Core migrations. Then, modify the script to make it idempotent (i.e., safe to run multiple times). Explain the changes you made and why they are important for CI/CD.

### Answer

**1. Generate the SQL Script:**

```bash
dotnet ef migrations script --idempotent
```

**2. Idempotent SQL Script:**

```sql
IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20250907000000_CreateProductsTable')
BEGIN
    CREATE TABLE [Products] (
        [Id] int NOT NULL IDENTITY,
        [Name] nvarchar(max) NOT NULL,
        CONSTRAINT [PK_Products] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS (SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20250907000000_CreateProductsTable')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20250907000000_CreateProductsTable', N'6.0.0');
END;
GO
```

**Explanation:**

-   The `--idempotent` flag generates a script that includes `IF NOT EXISTS` checks.
-   The script first checks if the migration has already been applied by querying the `__EFMigrationsHistory` table.
-   If the migration has not been applied, the script creates the table and then inserts a record into the `__EFMigrationsHistory` table to mark the migration as applied.
-   This makes the script safe to run multiple times. If the migration has already been applied, the script will do nothing.
-   This is important for CI/CD pipelines because it allows you to run the same script on multiple environments without having to worry about errors.
