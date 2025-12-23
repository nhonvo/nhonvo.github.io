---
title: "Transaction Isolation Levels in Java: Protecting Data Integrity"
description: "Master the nuances of Read Uncommitted, Read Committed, Repeatable Read, and Serializable. Learn how to prevent Dirty Reads and Phantoms in Spring Boot."
pubDate: "9 6 2025"
published: true
tags:
  [
    "Java",
    "Spring Boot",
    "Database",
    "Transactions",
    "ACID",
    "Concurrency",
    "Backend Development",
    "Software Architecture",
  ]
---

## The "I" in ACID

Isolation ensures that concurrent transactions don't interfere with each other, preventing data corruption. However, higher isolation levels come at a significant performance cost due to locking mechanisms. This guide helps you choose the right level for your Java services using Spring's `@Transactional`.

## Core Concepts (The Anomalies)

### 1. Dirty Read

Transaction A reads data from Transaction B that has not been committed yet. If B rolls back, A is left with "junk" data that never technically existed.

### 2. Non-repeatable Read

Transaction A reads a row twice during its lifetime, but Transaction B modifies that row and commits in between those reads. Transaction A sees two different values for the same row.

### 3. Phantom Read

Transaction A queries a range of rows twice (e.g., `WHERE age > 20`), but Transaction B inserts a new row into that range and commits in between. Transaction A sees a "phantom" row in the second result.

## Practice Exercise: Simulating a Dirty Read

We will use **Spring's `@Transactional`** to demonstrate how changing isolation levels affects behavior.

### Step 1: The Vulnerable Service

```java
@Service
public class AccountService {
    @Autowired
    private AccountRepository repo;

    @Transactional(isolation = Isolation.READ_UNCOMMITTED) // Dangerous!
    public BigDecimal getBalanceDirty(Long id) {
        return repo.findById(id)
                   .map(Account::getBalance)
                   .orElse(BigDecimal.ZERO);
    }

    @Transactional
    public void updateBalance(Long id, BigDecimal amount) {
        Account acc = repo.findById(id).orElseThrow();
        acc.setBalance(acc.getBalance().add(amount));

        // Block to simulate a long-running transaction
        try { Thread.sleep(5000); } catch (Exception e) {}

        // Imagine an error occurs here causing a rollback
        if (true) throw new RuntimeException("Simulation crash");
    }
}
```

### Step 2: The Collision Detail

1.  **Thread 1** calls `updateBalance(1, 100)`. It updates the row in the DB but hasn't committed (it's sleeping).
2.  **Thread 2** calls `getBalanceDirty(1)`. Because it's `READ_UNCOMMITTED`, it sees the "new" balance.
3.  **Thread 1** wakes up, hits the exception, and rolls back.
4.  **Thread 2** continues processing logic based on money that was never actually committed to the database.

### Step 3: The Fix

Change the isolation level to **`READ_COMMITTED`** (the default for most databases like PostgreSQL and SQL Server). Thread 2 will now either wait for the lock to release or see the _old_ (original) balance until Thread 1 successfully commits.

## Why This Works

Isolation levels are implemented by the database engine using **Locks** (S-Locks, X-Locks) or **MVCC** (Multi-Version Concurrency Control).

- **Read Committed**: Only reads data that has been physically marked as "committed" in the transaction log.
- **Repeatable Read**: Uses snapshots or locks to ensure that once a row is read, it cannot be changed by another transaction until the current one finishes.
- **Serializable**: The highest level. It prevents all anomalies, including phantoms, by treating the range of data as locked.

## Performance Tip: Avoid Over-Isolation

Avoid `Isolation.SERIALIZABLE` in high-traffic applications. It leads to massive lock contention, frequent deadlocks, and reduced throughput. Most Java enterprise applications perform perfectly well with the default `READ_COMMITTED`.

## Summary

Transaction isolation is a "slider" between **Performance** and **Consistency**. By understanding which anomalies your specific business logic can tolerate, you can tune your `@Transactional` boundaries to be both bulletproof and high-performing.
