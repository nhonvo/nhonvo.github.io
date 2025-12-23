---
title: "Native SQL and Stored Procedures in JPA/Hibernate"
description: "How to drop down to raw SQL and execute stored procedures when JPA abstraction is not enough for performance or functionality."
pubDate: "9 6 2025"
published: true
tags:
  [
    "Java",
    "JPA",
    "Hibernate",
    "SQL",
    "Stored Procedures",
    "Performance",
    "Security",
    "Spring Data JPA",
  ]
---

## When Abstraction Fails

JPA (JPQL/Criteria API) covers 90% of use cases. However, for the remaining 10%—complex reports, bulk operations, or database-specific features—you need to use **Native SQL** or call **Stored Procedures**. This guide explains how to properly "break the abstraction" in a Java enterprise environment.

## Core Concepts

### 1. Native Queries

Standard SQL queries executed via the `EntityManager`. Unlike JPQL, these are not parsed into an Abstract Syntax Tree by Hibernate; they are passed directly to the database driver.

- **Pros**: Access to DB-specific features (Window functions, CTEs).
- **Cons**: Loss of database portability.

### 2. Stored Procedures

Pre-compiled SQL code stored in the database. JPA provides `@NamedStoredProcedureQuery` to call these in a semi-typesafe way, handling both input and output parameters.

## Practice Exercise: Executing a Stored Procedure

We will implement a call to a stored procedure that calculates a user's loyalty discount.

### Step 1: The Database Procedure (PostgreSQL)

```sql
CREATE OR REPLACE PROCEDURE calculate_discount(
    IN user_id INT,
    OUT discount_percent NUMERIC
)
LANGUAGE plpgsql
AS $$
BEGIN
    SELECT 10.0 INTO discount_percent; -- Simplified logic
END;
$$;
```

### Step 2: Mapping in Java

Define the procedure call within your `@Entity`.

```java
@Entity
@NamedStoredProcedureQuery(
    name = "User.calculateDiscount",
    procedureName = "calculate_discount",
    parameters = {
        @StoredProcedureParameter(mode = ParameterMode.IN, name = "user_id", type = Integer.class),
        @StoredProcedureParameter(mode = ParameterMode.OUT, name = "discount_percent", type = Double.class)
    }
)
public class User {
    // ... fields ...
}
```

### Step 3: Execution via EntityManager

```java
StoredProcedureQuery query = entityManager.createNamedStoredProcedureQuery("User.calculateDiscount");
query.setParameter("user_id", 123);
query.execute();

Double result = (Double) query.getOutputParameterValue("discount_percent");
```

## Why Use Native Queries?

- **Bulk Operations**: Standard JPA `delete` can be slow as it might execute one query per row to manage the lifecycle. Native `DELETE FROM ...` is near-instant.
- **Advanced SQL**: Window functions (`RANK()`, `LEAD()`), JSONB operators (in PostgreSQL), and Spatial functions often require raw SQL.
- **DTO Mapping**: You can map native query results directly to non-entity DTOs using `@SqlResultSetMapping` or Spring Data Projections.

## Security Warning: SQL Injection

Never concatenate strings in native queries. Always use positional or named parameters to prevent SQL injection attacks.

```java
// SUCCESS: Parameterized
Query q = em.createNativeQuery("SELECT * FROM users WHERE email = :email");
q.setParameter("email", emailInput);

// FAILURE: Vulnerable to Injection
Query q = em.createNativeQuery("SELECT * FROM users WHERE email = '" + emailInput + "'");
```

## Summary

Knowing when to "break the abstraction" is a hallmark of a senior developer. Use JPA for most business logic and raw SQL for performance-critical or complex database operations, ensuring your Java application remains maintainable, secure, and fast.
