---
title: "Leading and Mentoring"
description: "High-performance teams aren't born; they are built. Explore a leadership philosophy centered on psychological safety, technical excellence, and the 'multiplier effect'."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Leadership",
    "Mentoring",
    "Soft Skills",
    "Team Culture",
    "Staff Engineering",
    "Engineering Management",
  ]
---

## Philosophy: The Multiplier Effect

As an engineer grows into a senior or staff role, their value is no longer measured solely by their own git commits, but by their "Multiplier Effect"—how much they increase the output and quality of the engineers around them. My philosophy on leading and mentoring is built on three pillars:

1.  **Psychological Safety**: Innovation requires the freedom to fail. I foster an environment where "I don't know" is a valid answer and every mistake is treated as a systemic learning opportunity rather than a personal failing.
2.  **The "Why" Over the "How"**: Mentoring is not about giving answers; it's about teaching the underlying principles. If a junior dev asks how to fix a bug, I guide them to the architectural pattern that prevents that class of bugs entirely.
3.  **Ownership and Autonomy**: I delegate outcomes, not tasks. By giving engineers ownership of a feature from design to deployment, they develop a sense of responsibility and pride in their work.

---

## Technical Excellence in Practice

### 1. Code Review as a Teaching Tool

Code reviews should never be a gatekeeper's power trip.

- **Rule of Threes**: If I find a pattern I don't like, I explain why it's a problem, suggest a better way, and provide a link to documentation or a blog post.
- **Tone Matters**: I use questions ("Have we considered how this scales?") instead of commands ("Change this to X").
- **Appreciation**: I make it a point to highlight clever solutions or great documentation in the PR comments.

### 2. Knowledge Sharing

- **Brown Bags**: Regular, low-pressure sessions where team members share a new library, a post-mortem, or a productivity tip.
- **ADRs (Architecture Decision Records)**: We document the _why_ behind big decisions so that future team members understand the context of the code they are reading.

---

## Practice Exercise

Reflect on a time you had to deliver difficult feedback to a peer or mentee. How did you approach it, and what was the result?

## Answer

### The Scenario

A mid-level developer consistently delivered high-quality code but missed deadlines due to "feature creep"—adding unrequested complexity (over-engineering).

### The Approach

I held a private 1v1 and used the **Situation-Behavior-Impact (SBI)** model:

- **Situation**: During the last three sprints.
- **Behavior**: I noticed you implemented a complex generic repository pattern for a simple CRUD service.
- **Impact**: This caused a 2-day delay in shipping the feature, which prevented the marketing team from starting their campaign on time.

I asked for their perspective. They were worried about "future-proofing" the app. We then discussed the **YAGNI (You Ain't Gonna Need It)** principle and agreed on a new workflow: if a feature feels like it needs a major abstraction, we discuss it in a quick 5-minute huddle before implementation.

### The Result

The engineer felt heard and understood. They shifted their focus toward "Pragmatic Perfectionism," delivering features faster while still maintaining code quality. Their throughput increased by 30% in the following quarter.

## Summary

Leadership is an active, persistent effort. By focusing on **mentorship, clear communication, and high standards**, you create a culture where technical excellence becomes the path of least resistance. A true leader's legacy isn't the code they wrote; it's the engineers they helped build.
