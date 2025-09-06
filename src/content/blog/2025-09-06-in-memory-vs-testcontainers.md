---
title: "In-Memory vs. Testcontainers"
description: "Compare and contrast the use of EF Core's in-memory provider with using a real database in a Docker container (via Testcontainers) for integration testing. Discuss the trade-offs in terms of speed, fidelity, and complexity."
pubDate: "Sep 06 2025"
published: true
tags: ["Testing"]
---

### Practice Exercise

Write two sets of integration tests for a repository. One set should use the EF Core in-memory database. The second set should use Testcontainers to spin up a real PostgreSQL or SQL Server container for the tests. Discuss any tests that pass with one setup but fail with the other.
