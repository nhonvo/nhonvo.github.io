---
title: "Hardening Java APIs: Addressing the OWASP Top 10"
description: "A practical guide to securing Spring Boot applications against SQL Injection, XSS, CSRF, and broken access control."
pubDate: "9 6 2025"
published: true
tags:
  ["java", "spring-security", "owasp", "security", "cybersecurity", "backend"]
---

### Security by Design

Application security is not a separate phase; it's a core feature. As a Java developer, you are the first line of defense against the **OWASP Top 10** vulnerabilities.

### Core Vulnerabilities

#### 1. Injection (SQL, LDAP, command)

Occurs when untrusted data is sent to an interpreter as part of a command.

- **Fix**: Always use parameterized queries (JPA/Hibernate).

#### 2. Broken Access Control

Users can access data outside of their intended permissions.

- **Fix**: Use Method-level security (`@PreAuthorize`).

#### 3. Sensitive Data Exposure

Storing or transmitting data without encryption.

- **Fix**: Use TLS for all communication and Bcrypt for passwords.

---

### Practice Exercise: Preventing SQL Injection and Enforcing Access Control

#### Step 1: Preventing Injection

Never use string concatenation for SQL.

```java
// VULNERABLE
String sql = "SELECT * FROM users WHERE email = '" + input + "'";

// SECURE (JPA)
@Query("SELECT u FROM User u WHERE u.email = :email")
User findByEmail(@Param("email") String email);
```

#### Step 2: Enforcing Role-Based Access Control (RBAC)

Configure Spring Security to restrict endpoints based on user roles and authority.

```java
@RestController
@RequestMapping("/admin")
public class AdminController {

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')") // Enforce access control
    public List<User> getAllUsers() {
        return userService.findAll();
    }
}
```

---

### Why This Works

- **Parameterized Queries**: The DB driver treats the input strictly as data, not as executable code, neutering any SQL keywords the user tries to inject.
- **Spring Security Filters**: Spring intercepts every request before it reaches your controller, checking the authentication token and matching the user's authorities against the `@PreAuthorize` expression.

### Security Tip: CSRF and JWT

If you are building a **Stateful** app (using sessions/cookies), you must enable **CSRF protection**. If you are building a **Stateless** REST API using JWTs, CSRF is generally not required, but you must ensure your tokens are stored securely (e.g., `HttpOnly` cookies instead of LocalStorage).

### Summary

Security is a layered process. By combining framework features (Spring Security) with secure coding practices (parameterized queries), you can defeat the vast majority of common web attacks.
