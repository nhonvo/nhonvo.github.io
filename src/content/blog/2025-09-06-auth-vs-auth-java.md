---
title: "Authentication vs. Authorization in Java Applications"
description: "Demystifying Identity (Who are you?) vs. Permissions (What can you do?). Learn to implement both using Spring Security and JWT."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-security",
    "authentication",
    "authorization",
    "jwt",
    "oauth2",
    "iam",
  ]
---

### The Two Pillars of Access Control

The terms "AuthN" and "AuthO" are often used interchangeably, but they represent two distinct phases of the security lifecycle. Understanding their difference is vital for designing secure systems.

### Core Concepts

#### 1. Authentication (Who are you?)

The process of verifying the identity of a user or system.

- **Examples**: Password login, Biometrics, OTP, OAuth2 Social login.
- **Output**: A "Principal" or "Identity".

#### 2. Authorization (What can you do?)

The process of verifying that the authenticated user has permission to perform a specific action on a specific resource.

- **Examples**: Being an 'Admin', having permission to 'Edit Order #123'.
- **Output**: Access granted or `403 Forbidden`.

---

### Practice Exercise: Implementing JWT-based Auth

We will set up a system where a user authenticates with a password to receive a JWT, which is then used for subsequent authorization.

#### Step 1: The Authentication Flow

The user sends credentials, and we generate a token.

```java
public String login(String username, String password) {
    Authentication auth = authManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password)
    );
    // If successful, create JWT containing Roles
    return jwtUtils.generateToken(auth);
}
```

#### Step 2: The Authorization Flow

Protecting a specific piece of data.

```java
@GetMapping("/reports/{id}")
@PreAuthorize("hasPermission(#id, 'REPORT', 'READ')") // Custom evaluator
public Report getReport(@PathVariable Long id) {
    return reportService.findById(id);
}
```

---

### Why This Works

- **Stateless Identity**: The JWT (JSON Web Token) contains the user's ID and Roles in its payload. Because the token is digitally signed by the server, we can trust the "Identity" without hitting the database on every request.
- **Spring Security Context**: Once a token is validated, Spring populates the `SecurityContextHolder`. Every method in your app can then easily check the user's authorization level using simple annotations.

### Access Control Models

- **RBAC (Role-Based Access Control)**: Simplest. "If you are an ADMIN, you can do X."
- **ABAC (Attribute-Based Access Control)**: Most flexible. "If you are the OWNER of this file AND it's a weekday, you can EDIT it."

### Summary

Authentication establishes the connection; Authorization regulates the movement. By cleanly separating these concerns in your code, you create a security architecture that is both robust and easy to audit.
