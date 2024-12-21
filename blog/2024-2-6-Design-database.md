---
title: Design database
description: SQL Essentials Part 5
slug: /design-database-5/
image: https://i.imgur.com/mErPwqL.png
authors:
  - truongnhon
tags: [sql]

---
<!--truncate-->

## Data normalization

Which data de-normalized:

- Inconsistent data types
- Repeating columns
- Repeating values

### First Normal Form — 1NF

- Make all values in a column consistently of the **same data type**
- Make sure each cell contains only a **single value**
- Make sure there are **no repeating** columns for the same data (e.g. category 1, 2, 3…)
- Enable the rows of data to be **uniquely identified** through a column or **combination of columns**

Eg:

- First Normal Form: Same data type in a column, before:

| item_no | item_name     | variantl     | qtyl   | variant2    | qty2 | variant3 | qty3 |
| ------- | ------------- | ------------ | ------ | ----------- | ---- | -------- | ---- |
| 12      | Happy t-shirt | Yellow (YLW) | eleven | Black (BLK) | 5    | White    | 8    |
| 15      | Dress Shirt   | White (WHT)  | 18     | Light Blue  | 12   |          |      |
| 88      | Sunglasses    | Polarized    | 5      |             |      |          |      |
| 12 more | Happy t-shirt | Pink         | 15     |             |      |          |      |

- First Normal Form: Same data type in a column, after

| item_no      | item_name     | variantl           | qtyl   | variant2            | qty2 | variant3       | qty3 |
| ------------ | ------------- | ------------------ | ------ | ------------------- | ---- | -------------- | ---- |
| 12           | Happy t-shirt | Yellow (YLW)       | eleven | Black (BLK)         | 5    | White**(WHT)** | 8    |
| 15           | Dress Shirt   | White (WHT)        | 18     | Light Blue**(LIB)** | 12   |                |      |
| 88           | Sunglasses    | Polarized**(POL)** | 5      |                     |      |                |      |
| 12~~__more~~ | Happy t-shirt | Pink**(PNK)**      | 15     |                     |      |                |      |

### Second Normal Form - 2NF

1. Bring table to First Normal Form
2. Remove all partial dependencies

**Partial dependency**: a column that isn't part of the primary key, and that depends only on part of the primary key. For example, if the primary key (PK) is `(student_no, course_id)`, then a column called `student_name` would be a partial dependency on the PK because it only depends on the `student_no`.

<!-- ![img](/img/Design-database/2nf-before-after.png) -->

In the example, I noted `item_name` and `variant_name` as partial dependencies, relying on `item_no` and `variant_code`, respectively. As such, I split these two partial dependencies into their own tables, avoiding quite a bit of data duplication.

From there, the newly named `item_id` and `variant_id` (replacing `item_no` and `variant_code`) are the composite primary key for different `item_variant` quantities.

### Third Normal Form

1. Bring the table to Second Normal Form
2. Eliminate transitive dependencies

**Transitive dependency**: when a column that isn't part of the primary key depends on the primary key, but through another non-key column. For example, a table of movie reviews would have a surrogate id column as its PK, and a `movie_id` column to refer to the movfacie which is being reviewed. If the table also contains a `movie_name` column, then that `movie_name` is transitively dependent on the PK, because it depends on it *through* `movie_id`.

<!-- ![img](/img/Design-database/3nf-before-after.png) -->

To eliminate transitive dependencies, we'll use a strategy similar to that of eliminating partial dependencies: remove the concerned columns, and, if a table linking those columns to the one they depend on doesn't exist, create it. Keeping with the movie reviews example above, this would mean creating a table for movies, with an `id` and a `movie_name`, and only keeping the `movie_id` column in the reviews table.

### Summary

- De-normalized data contains repetitions that can cause anomalies
- Rules exist to normalize data
- First Normal Form:
  - Single-valued columns
  - No repeating columns
  - Consistent data across a column
  - Uniquely identify a row
- Second Normal Form: No partial dependencies
- Third Normal Form: No transitive dependencies
- Sometimes, it's OK to violate normal forms; use your best judgement

| **Key Term**             | **Definition**                                                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First Normal Form (1NF)  | Shaping data to eliminate inconsistencies, and allowing unique identification of each row                                                                                                                                                                                    |
| Second Normal Form (2NF) | Extends 1NF by removing partial dependencies                                                                                                                                                                                                                                 |
| Third Normal Form (3NF)  | Extends 2NF by removing transitive dependencies                                                                                                                                                                                                                              |
| One-One Relationship     | When one entity "has one" of another entity, and that second entity "belongs to" only the first. For example, entity "user" and "home address" have a one-one relationship                                                                                                   |
| One-Many Relationship    | When one entity "has many" of another entity, and that second entity "belongs to" only the first. For example, entity "user" and "email address" have a one-many relationship, because a user can have many email addresses, but each email address belongs to only one user |
| Many-Many Relationship   | When two entities are related in such a way where many links can exist on both sides. For example, entities "books" and "categories" have a many-many relationship, because a book can have multiple categories, and a category can belong to multiple books                 |
| Candidate Key            | A set of one or more columns that can uniquely identify a row in a database table                                                                                                                                                                                            |
| Primary Key              | The key from the set of candidate keys that we actually choose in order to uniquely identify a row in that table                                                                                                                                                             |
| Composite Key            | A key that is composed of more than one column                                                                                                                                                                                                                               |
| Partial Dependency       | When a non-key column depends on only part of the primary key                                                                                                                                                                                                                |
| Transitive Dependency    | When a non-key column depends on the primary key through another non-key column                                                                                                                                                                                              |

## DDL

- Creating tables with `CREATE TABLE`
- Using Postgres data types to represent real-life data:
  - Numbers: INTEGER, SERIAL, REAL, DOUBLE PRECISION, DECIMAL
  - Characters: CHARACTER(n), CHARACTER VARYING/VARCHAR, TEXT
  - Dates/Times: TIMESTAMP WITH/WITHOUT TIME ZONE, DATE, TIME
- There are many data types that we haven't touched, like Geometry, Arrays, ...
- How to change table structure using `ALTER TABLE` to:
  - Add/remove columns
  - Change the data type of a column
- Others DDL commands:
  - `DROP` to remove a table from the database
  - `TRUNCATE` to remove all data in a table
  - `COMMENT` to add a text comment to a table or column

### Numeric Data Types: Integers

Postgres offers three varieties of integers that vary only by the range of numbers they can represent:

- `SMALLINT`: -32,768 to +32,767
- `INTEGER`: -2,147,483,648 to +2,147,483,647
- `BIGINT`: -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807

These are mirrored by three "serial" types, which are only integers, but where the values can be automatically managed by Postgres. These are respectively `SMALLSERIAL`, `SERIAL`, and `BIGSERIAL`.

When using a `SERIAL` type, if we don't give it a value when inserting data, Postgres will automatically generate the next integer in sequence, until the sequence is exhausted based on the range of serial we chose (small, regular, or big).

### Text Data Types

Postgres offers two kinds of text data types: fixed-length, and variable length.

Variable-length data types are `VARCHAR(n)` — where the limit part, `(n)`, is optional — and `TEXT`, which offers no limit. Internally, they are stored in exactly the same way, so `VARCHAR` without limit is the same as `TEXT`. The `VARCHAR` type can also be written as `CHARACTER VARYING`, and it's exactly the same.

The fixed-length type is written `CHAR(n)` or `CHARACTER(n)`. When the `(n)` limit part is not used, it stores *only one character*. `CHAR` is used less often than its variable length counterparts, because it's less agile: even in cases where you might think that a column will always accept entries of the same length, future business requirements might change, and by then you could have millions of records in a table with a `CHAR` column, making it lengthy to change the limit. If you store a value less than the limit, `CHAR` will pad the remaining characters with spaces to make it the same length.

### Date/Time Data Types

When you write out a date, e.g. "2018-05-06", you might think of it as a simple string. As such, you might be compelled to use the `VARCHAR` type in order to store dates and times, and in the vast majority of cases, you'd be making a big oversight!

Postgres' date and time types are rich, and allow not only to store these values, but also, as we'll see in the next lesson, to manipulate them using a wide array of date/time functions.

When storing dates and times, it's always important to be mindful of the timezones: both that of your users as well as that of the database server which is storing the data. Postgres handles time zones very elegantly, and allows you to store these values relative to a timezone, or absolutely. Both have their usages.

## DML

- Delved deeper into designing proper, normalized relational schemas
- Created and modified table structures
- Added, modified and deleted data from tables with `INSERT`, `UPDATE` and `DELETE`
- Learned to use ACID Transactions

## Constraints

In this lesson, we've looked at database constraints as a way to make data more consistent and in line with business requirements. We've seen:

- Unique constraints, which prevent duplicate values for a given column or columns, except for `NULL` which is allowed to appear many times.
- Not null constraints, which prevent a column from containing the value `NULL`.
- Primary key constraints, which, in addition to being a combination of Unique and Not Null constraints, are special: there can only be one per table, it's the official column or set of columns to uniquely identify a row in that table, and it's the default column(s) that will be used when setting up a foreign key constraint referencing that table.
- Foreign key constraints, which restrict values in a column to only those values present in another column. They maintain what we called "referential integrity".
- Check constraints, which can be used to implement custom checks against data that gets added or modified in our tables.

## Index

using the syntax `CREATE INDEX ON table_name (column_name)`
