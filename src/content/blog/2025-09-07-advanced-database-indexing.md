---
title: "Advanced Database Indexing"
description: "Discuss advanced indexing strategies beyond single-column indexes, such as covering indexes, filtered indexes, and columnstore indexes. Explain what index fragmentation is and how to address it."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Access & Databases", "SQL", "Performance", "Indexing", "Database Optimization"]
---

### Mind Map Summary

- **Topic**: Advanced Database Indexing
- **Core Concepts**:
    - **Covering Index**: An index that includes all the columns required to satisfy a query, eliminating the need to access the table data itself. This is also known as a "fat" index.
    - **Filtered Index**: An index that is created on a subset of rows in a table, defined by a WHERE clause. This is useful for queries that select a small, well-defined subset of rows.
    - **Columnstore Index**: An index that stores data column by column, rather than row by row. This is highly effective for data warehousing and analytics queries.
    - **Index Fragmentation**: Occurs when the logical ordering of pages in an index does not match the physical ordering on disk. This can degrade query performance because it requires more I/O operations to read the index.
        - **Internal Fragmentation**: Unused space within index pages.
        - **External Fragmentation**: The order of pages on disk is not sequential.
- **Pros**:
    - **Improved Query Performance**: Advanced indexing strategies can dramatically improve the performance of specific queries.
    - **Reduced I/O**: Covering indexes reduce I/O by avoiding table access. Filtered indexes are smaller and faster to scan.
    - **Efficient Analytics**: Columnstore indexes are highly optimized for analytical queries.
- **Cons**:
    - **Increased Storage**: Indexes consume storage space.
    - **Slower Writes**: Indexes can slow down write operations (INSERT, UPDATE, DELETE) because the indexes must also be updated.
    - **Maintenance Overhead**: Indexes, especially with fragmentation, require maintenance.

### Practice Exercise

Given a slow SQL query with multiple WHERE clauses and JOINs, analyze its execution plan. Design a covering index that satisfies the query, eliminating the need for key lookups, and explain how it improves performance.

### Answer

**Query:**

```sql
SELECT o.OrderDate, c.CustomerName, ol.Quantity, p.ProductName
FROM Orders o
JOIN Customers c ON o.CustomerID = c.CustomerID
JOIN OrderLines ol ON o.OrderID = ol.OrderID
JOIN Products p ON ol.ProductID = p.ProductID
WHERE o.OrderDate > '2025-01-01' AND c.Country = 'USA';
```

**Execution Plan Analysis:**

Without appropriate indexes, the execution plan would likely show:

-   **Clustered Index Scans** or **Table Scans** on the `Orders` and `Customers` tables, which are inefficient.
-   **Key Lookups** to retrieve columns that are not in the non-clustered indexes used for the JOINs.

**Covering Index Design:**

To optimize this query, we can create a covering index on the `Orders` table:

```sql
CREATE INDEX IX_Orders_OrderDate_CustomerID_Covering
ON Orders (OrderDate, CustomerID)
INCLUDE (OrderDate, CustomerID); -- Include all columns needed for the query
```

And another on the `Customers` table:

```sql
CREATE INDEX IX_Customers_Country_CustomerName_Covering
ON Customers (Country)
INCLUDE (CustomerName);
```

**Explanation of Performance Improvement:**

-   The `IX_Orders_OrderDate_CustomerID_Covering` index covers all the columns from the `Orders` table that are needed for the query (`OrderDate`, `CustomerID`). This allows the database to satisfy the query by only reading the index, without having to perform a key lookup to the `Orders` table itself.
-   Similarly, the `IX_Customers_Country_CustomerName_Covering` index covers the `Country` and `CustomerName` columns from the `Customers` table.
-   These covering indexes reduce the number of I/O operations required to execute the query, leading to a significant performance improvement.
