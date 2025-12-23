---
title: "Implementing Global Query Filters with Hibernate @Where"
description: "Learn how to automatically enforce data boundaries like Soft Deletes and Multi-tenancy using Hibernate's global filter mechanisms."
pubDate: "9 6 2025"
published: true
tags: ["java", "hibernate", "jpa", "soft-delete", "multi-tenancy", "backend"]
---

### The Power of Automation

In large-scale applications, certain filters must be applied to every single query. Forgetting a `WHERE is_deleted = false` clause can lead to serious data leakage or bugs. **Hibernate Filters** and the `@Where` annotation allow you to automate these concerns.

### Core Concepts

#### 1. The `@Where` Annotation

A simple, static filter applied to an entity. It’s hardcoded and always active for that entity.

- **Use Case**: Simple soft deletes.

#### 2. Hibernate `@Filter`

A dynamic filter that can be enabled or disabled at runtime. It can also accept parameters.

- **Use Case**: Multi-tenant systems where the `tenant_id` changes based on the logged-in user.

---

### Practice Exercise: Soft Delete Pattern

We will implement a system where items are never physically deleted from the database but are hidden from all standard queries.

#### Step 1: Define the Entity

Use the `@Where` annotation to ensure that all SELECT queries automatically include an active-only check.

```java
@Entity
@Table(name = "products")
@Where(clause = "deleted = false") // Global filter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private boolean deleted = false;

    // Getters and Setters
}
```

#### Step 2: Bypassing the Filter

Sometimes (e.g., for an admin panel), you need to see deleted records. Since `@Where` is static, bypassing it usually requires a native query or a separate entity mapping.

However, if you use the more powerful **`@Filter`**, you can control it via the Hibernate Session:

```java
@Entity
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = "string"))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class User { ... }

// Enabling in the service layer
Session session = entityManager.unwrap(Session.class);
session.enableFilter("tenantFilter").setParameter("tenantId", "customer_A");
```

---

### Why This Works

- **SQL Injection at Source**: Hibernate intercepts the HQL/JPQL conversion and appends the filter directly to the generated SQL `WHERE` clause.
- **Consistency**: It prevents human error. Developers don't need to remember to filter out deleted items; the infrastructure does it for them.

### Performance Tip

Ensure that the columns used in global filters (like `deleted` or `tenant_id`) are indexed. Because these columns will be part of almost every query, missing an index here will cause global performance degradation.

### Summary

Global filters are a cornerstone of a "Secure by Design" architecture. By moving boundary logic from the business layer to the data layer, you ensure that your application's rules are enforced universally and consistently.
