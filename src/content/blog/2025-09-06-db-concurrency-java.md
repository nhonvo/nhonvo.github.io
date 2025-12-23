---
title: "Database Concurrency Control: Preventing Lost Updates in Java"
description: "A deep dive into Optimistic vs. Pessimistic locking strategies in Java using Spring Data JPA and Hibernate to preserve data integrity."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "jpa",
    "hibernate",
    "database",
    "concurrency",
    "transactions",
  ]
---

### The "Lost Update" Problem

In a multi-user environment, data integrity is threatened when two users read the same record, modify it, and then attempt to save it. If not handled, User 2's update might silently overwrite User 1's changes. This is the classic **Lost Update** scenario.

### Core Concepts

#### 1. Optimistic Locking

Assumes conflicts are rare. Instead of locking the record, we use a version field. If the version has changed since we read it, the update fails.

- **Pros**: High concurrency, no deadlock risk.
- **Cons**: Requires retry logic on the application side.

#### 2. Pessimistic Locking

Assumes conflicts are likely. The record is locked at the database level when read (`SELECT ... FOR UPDATE`), preventing others from reading or modifying it until the transaction completes.

- **Pros**: Guarantees success for the holding transaction.
- **Cons**: Low concurrency, high risk of deadlocks.

---

### Practice Exercise: Implementing Optimistic Locking

We will use **Spring Data JPA** and the `@Version` annotation to handle concurrent updates.

#### Step 1: The Entity

Add a `@Version` field. Hibernate will automatically increment this on every update.

```java
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Integer stock;

    @Version
    private Long version; // The magic happens here

    // Getters and Setters
}
```

#### Step 2: The Concurrent Scenario (Test Case)

We will simulate two threads trying to update the same product.

```java
@Service
public class ProductService {
    @Autowired private ProductRepository repository;

    @Transactional
    public void updateStock(Long id, int newStock) {
        Product product = repository.findById(id).orElseThrow();
        // Simulate processing delay
        try { Thread.sleep(100); } catch (InterruptedException e) {}
        product.setStock(newStock);
        repository.save(product);
    }
}
```

**The Test:**

```java
@Test
public void testOptimisticLocking() throws InterruptedException {
    Long productId = 1L; // Assume product exists with version 0

    Thread user1 = new Thread(() -> {
        try { productService.updateStock(productId, 50); } catch (Exception e) { e.printStackTrace(); }
    });

    Thread user2 = new Thread(() -> {
        try { productService.updateStock(productId, 20); } catch (Exception e) { e.printStackTrace(); }
    });

    user1.start();
    user2.start();
    user1.join();
    user2.join();
}
```

#### Step 3: Handling the Exception

When `user2` tries to save, Hibernate will detect that the `version` in its memory (0) is different from the `version` in the database (1, set by `user1`). It will throw an **`ObjectOptimisticLockingFailureException`**.

### Why This Works

Hibernate generates an SQL update similar to this:

```sql
UPDATE product
SET stock = 20, version = 1
WHERE id = 1 AND version = 0;
```

If `version` in the DB is already 1, the `WHERE` clause matches 0 rows. Hibernate checks the "affected rows" count; if it's 0, it knows a conflict occurred and throws the exception.

### Architectural Choice: When to use what?

- **Use Optimistic Locking** for most web applications where users edit different records or where performance is critical.
- **Use Pessimistic Locking** (`LockModeType.PESSIMISTIC_WRITE`) for sensitive banking/inventory operations where you absolutely cannot afford an "Optimistic Failure" and must force users to wait in line.

### Summary

Choosing the right locking strategy is balance between **scalability** and **consistency**. By leveraging JPA's `@Version`, you gain a powerful, low-overhead mechanism to maintain data integrity in the face of widespread concurrency.
