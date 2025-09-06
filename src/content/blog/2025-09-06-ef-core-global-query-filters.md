---
title: "EF Core Global Query Filters"
description: "Explain how to use global query filters to implement soft-delete functionality or multi-tenancy in an application."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases"]
---

### Practice Exercise

Define a global query filter on an entity (e.g., Product) that automatically filters out any records where an IsDeleted property is true. Write a query to fetch all products and show that the deleted ones are not returned by default. Then, show how to disable the filter for a specific query.
