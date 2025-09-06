---
title: "EF Core Shadow Properties & Backing Fields"
description: "Explain what shadow properties are and why you might use them (e.g., for foreign keys or auditing data that you don't want on your entity model). Discuss how backing fields can allow for read-only properties."
pubDate: "Sep 06 2025"
published: true
tags: ["Data Access & Databases"]
---

### Practice Exercise

Configure a LastUpdated shadow property on an entity. Use an interceptor or override SaveChanges to automatically set the value of this shadow property whenever the entity is updated. Then, query the database to confirm the value was saved, even though it's not on the C# class.
