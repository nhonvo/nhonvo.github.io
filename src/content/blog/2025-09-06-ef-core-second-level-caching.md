---
title: "EF Core Second-Level Caching"
description: "Explain the concept of a second-level cache and how it can improve performance by caching query results outside of a single DbContext instance. Name a popular library for implementing it."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases"]
---

### Practice Exercise

Integrate a second-level caching provider (like EFCoreSecondLevelCacheInterceptor) into an ASP.NET Core application. Enable caching for a specific query and demonstrate that on the second execution of the query, the data is served from the cache instead of hitting the database.
