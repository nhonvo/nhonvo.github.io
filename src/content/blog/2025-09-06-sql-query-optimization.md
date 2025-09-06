---
title: "SQL Query Optimization (Execution Plans, Indexing)"
description: "Be able to analyze a query's execution plan and suggest improvements using indexes."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases", "SQL"]
---

### Mind Map Summary

- **Goal**: Make database queries run faster and use fewer resources.
- **Execution Plan**
  - **What**: The step-by-step recipe the database creates to execute your query.
  - **How to View**: Use "Display Actual Execution Plan" in SSMS or `EXPLAIN` in other databases.
  - **Key Operations to Analyze**:
    - **Table Scan / Clustered Index Scan**: **(Bad on large tables)** Reads the *entire* table. A major performance bottleneck.
    - **Index Seek**: **(Good)** Efficiently finds specific rows using an index, like looking up a word in a dictionary.
    - **Key Lookup**: **(Warning sign)** The index was used, but it didn't contain all the columns the query needed, so the database had to do an extra lookup into the main table. Can be fixed with a "covering index".
- **Indexing**
  - **What**: A data structure that improves the speed of data retrieval operations.
  - **Analogy**: The index at the back of a book. It lets you find information quickly without reading the whole book.
  - **Core Types**:
    - **Clustered Index**: Defines the physical sort order of the data in the table. A table can only have one.
    - **Non-Clustered Index**: A separate structure that contains a sorted list of keys and pointers to the actual data rows. A table can have many.
  - **The Trade-Off**: Indexes make `SELECT` queries much faster but can slow down data modification (`INSERT`, `UPDATE`, `DELETE`) because the indexes must also be updated.

### Core Concepts

#### 1. Execution Plans
When you submit a SQL query, the database doesn't just run it blindly. The Query Optimizer, a highly complex component of the database engine, analyzes the query, looks at the available statistics and indexes, and generates what it believes is the most efficient execution plan. This plan is a sequence of operations (like joins, sorts, seeks, and scans) that will be performed to get the result.

By learning to read an execution plan, you can diagnose performance problems. The number one thing to look for on large tables is a **Table Scan** (or **Clustered Index Scan**). This means the database was forced to read every single row because it couldn't find a more efficient way (an index) to locate the data you asked for. Your goal is to eliminate these scans on frequently queried, large tables.

#### 2. Indexing
An index is the single most important tool for improving query performance. It's a special lookup table that the database search engine can use to speed up data retrieval. 

- **How it Works**: When you add an index on a column (e.g., `EmailAddress`), the database creates a sorted list of all the email addresses. When you run a query like `WHERE EmailAddress = 'test@example.com'`, the database can perform a very fast binary search on the sorted index to find the exact location of the data, rather than reading the entire table row by row.

- **When to Add Indexes**: 
  - On columns that are frequently used in `WHERE` clauses.
  - On foreign key columns that are used in `JOIN` operations.
  - On columns that are used in `ORDER BY` clauses.

- **Covering Indexes**: A query is "covered" by an index if the index contains all the columns requested in the query's `SELECT`, `JOIN`, and `WHERE` clauses. This is the most optimal scenario, as the database can get everything it needs from the index itself and never has to touch the main table data, eliminating costly Key Lookups.

### Practice Exercise

Given a table with millions of rows and a slow `SELECT` query with a `WHERE` clause on a non-indexed column, use SQL Server Management Studio (or your DB client) to display the query's actual execution plan. Identify the costly 'Table Scan' operation. Add a non-clustered index to the column, re-run the query, and show how the execution plan changes to a more efficient 'Index Seek'.

### Answer

#### Step-by-Step Guide (using SQL Server T-SQL)

**1. Setup: Create a large table**

```sql
-- Create a table to hold our test data
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY, -- This will be the clustered index
    Username NVARCHAR(100),
    Email NVARCHAR(100),
    RegistrationDate DATETIME
);

-- Insert 1 million rows of sample data (this may take a minute)
INSERT INTO Users (Username, Email, RegistrationDate)
SELECT 
    'User' + CAST(ROW_NUMBER() OVER (ORDER BY a.object_id) AS VARCHAR(10)),
    'user' + CAST(ROW_NUMBER() OVER (ORDER BY a.object_id) AS VARCHAR(10)) + '@example.com',
    DATEADD(day, -ROW_NUMBER() OVER (ORDER BY a.object_id), GETDATE())
FROM sys.all_objects a CROSS JOIN sys.all_objects b;
```

**2. The Slow Query (Before Indexing)**

-   In SQL Server Management Studio (SSMS), click the "Display Actual Execution Plan" button in the toolbar (or press `Ctrl+M`).
-   Run the following query:

```sql
-- Find a specific user by their email
SELECT Id, Username, RegistrationDate 
FROM Users 
WHERE Email = 'user12345@example.com';
```

-   **Analyze the Execution Plan**: Go to the "Execution plan" tab in the results pane. You will see an icon for a **Clustered Index Scan**. If you hover over it, you will see that the "Actual Number of Rows" read is 1,000,000, and the estimated cost is very high. This is our bottleneck. The database had to read the entire table to find the one row we wanted.

**3. Add the Index**

Now, let's create a non-clustered index on the `Email` column, as that is what we are searching on.

```sql
CREATE NONCLUSTERED INDEX IX_Users_Email ON Users(Email);
```

**4. The Fast Query (After Indexing)**

-   Keep the execution plan enabled and run the exact same `SELECT` query again:

```sql
-- Find a specific user by their email
SELECT Id, Username, RegistrationDate 
FROM Users 
WHERE Email = 'user12345@example.com';
```

-   **Analyze the New Execution Plan**: Look at the execution plan now. The expensive "Clustered Index Scan" has been replaced by a much more efficient **Index Seek**. If you hover over the Index Seek operator, you will see that the "Actual Number of Rows" read is just 1. The database used our new index to go directly to the data it needed without scanning the whole table.

*(Note: You might also see a "Key Lookup" operator because we selected columns (`Username`, `RegistrationDate`) that were not part of the index. To optimize this even further, we could create a "covering index" by including those columns in the index definition, but the primary goal of eliminating the table scan has been achieved.)*