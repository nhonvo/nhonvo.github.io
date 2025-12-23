---
title: "API Security (OWASP Top 10)"
description: "Discuss how to prevent common vulnerabilities (e.g., SQL Injection, XSS, CSRF) within the ASP.NET Core framework."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "ASP.NET Core",
    "Security",
    "OWASP",
    "SQL Injection",
    "XSS",
    "Authorization",
    "Authentication",
    "Cybersecurity",
    "Best Practices",
  ]
---

## Mind Map Summary

- **API Security**: Protecting the integrity, confidentiality, and availability of your API and its data.
- **OWASP Top 10 (Key API Vulnerabilities)**
  - **A01: Broken Access Control**
    - **Problem**: Users can access data or perform actions outside of their intended permissions.
    - **Fix**: Enforce strong Authentication and Authorization (e.g., Policy-Based AuthZ). Never trust the client to enforce security.
  - **A02: Cryptographic Failures**
    - **Problem**: Sensitive data is exposed.
    - **Fix**: Use TLS/HTTPS for all traffic. Hash and salt passwords (`BCrypt`). Don't roll your own crypto.
  - **A03: Injection**
    - **Problem**: Untrusted user input is executed as a command.
    - **Most Common**: **SQL Injection**.
    - **Fix**: **Never** use string concatenation to build queries. Always use parameterized queries (e.g., with Dapper or EF Core).
  - **A04: Insecure Design**
    - **Problem**: Lack of security considerations from the start.
    - **Fix**: Threat modeling during the design phase.
  - **A05: Security Misconfiguration**
    - **Problem**: Default credentials, verbose error messages in production, unnecessary features enabled.
    - **Fix**: Harden configurations. Use custom error pages. Follow the principle of least privilege.
  - **A08: Software and Data Integrity Failures**
    - **Problem**: Insecure deserialization. Relying on dependencies with known vulnerabilities.
    - **Fix**: Use tools like Dependabot or Snyk to scan for vulnerable packages. Avoid deserializing untrusted data.

## Core Concepts

### 1. A01: Broken Access Control

This is the most common and critical web application security risk. It occurs when an application fails to properly enforce restrictions on what authenticated users are allowed to do. An attacker can exploit these flaws to access other users' data, change their data, or perform business functions they are not authorized for.

- **Prevention in ASP.NET Core**: Implement robust authorization. Don't rely on simple checks. Use policy-based authorization to enforce fine-grained rules. For example, when fetching a resource like an order (`/api/orders/123`), your code must verify that the currently logged-in user is the actual owner of order 123.

### 2. A03: Injection

Injection flaws, especially SQL Injection (SQLi), are classic and devastating vulnerabilities. They occur when untrusted data is sent to an interpreter as part of a command or query. The attacker's hostile data can trick the interpreter into executing unintended commands or accessing data without proper authorization.

- **Prevention**: The golden rule is to **separate code from data**. Never build queries using string concatenation with user input. Always use APIs that support parameterized queries. ORMs like Entity Framework Core do this by default. For raw SQL, libraries like Dapper make it easy to use parameters correctly.

### 3. A05: Security Misconfiguration

This is a broad category that includes insecure default configurations, overly verbose error messages that leak information, and not hardening your application for a production environment.

- **Prevention**:
  - **Environment-specific settings**: Use `appsettings.Development.json` for development and `appsettings.Production.json` for production. Ensure detailed error pages are only enabled in development (`if (app.Environment.IsDevelopment()) { app.UseDeveloperExceptionPage(); }`).
  - **Disable unnecessary headers**: Remove headers like `Server` and `X-Powered-By` that reveal information about your tech stack.
  - **Use secrets management**: Never store secrets (API keys, connection strings) in `appsettings.json`. Use User Secrets, Environment Variables, or a vault service like Azure Key Vault.

## Practice Exercise

Create an API endpoint that takes a raw string and uses it to build a SQL query with string concatenation. Explain why this is vulnerable to SQL Injection. Refactor the code to use parameterized queries (e.g., with Dapper or EF Core's `FromSqlRaw`) to prevent the vulnerability.

## Answer (SQL Injection Prevention in C#)

### Code Example

Let's assume we have a `Products` table and are using Dapper for data access.

#### 1. The VULNERABLE Endpoint

```csharp
[ApiController]
[Route("products")]
public class ProductsController : ControllerBase
{
    private readonly IDbConnection _dbConnection;

    public ProductsController(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    // VULNERABLE to SQL Injection
    [HttpGet("search/vulnerable/{name}")]
    public async Task<IActionResult> SearchProductsVulnerable(string name)
    {
        // NEVER DO THIS! Building a query with string concatenation.
        var sql = $"SELECT * FROM Products WHERE Name = '{name}'";
        var products = await _dbConnection.QueryAsync<Product>(sql);
        return Ok(products);
    }
}
```

**Why it is Vulnerable:**

An attacker does not need to provide a valid product name. They can provide a malicious string that alters the SQL query itself. For example, if an attacker calls the endpoint with this `name` value:

`' OR 1=1 --`

The resulting SQL query executed on the database would be:

`SELECT * FROM Products WHERE Name = '' OR 1=1 --'`

- The `'` closes the string literal for `Name`.
- `OR 1=1` creates a condition that is always true.
- `--` is a SQL comment, which nullifies the rest of the original query, including the closing quote.

This query will ignore the `Name` filter and return **every single product** in the table, leading to a massive data leak. More destructive commands could be used to `DROP TABLE` or modify data.

#### 2. The SECURE Endpoint

```csharp
[ApiController]
[Route("products")]
public class ProductsController : ControllerBase
{
    // ... constructor ...

    // SECURE against SQL Injection
    [HttpGet("search/secure/{name}")]
    public async Task<IActionResult> SearchProductsSecure(string name)
    {
        // This is the correct way. Use parameterized queries.
        var sql = "SELECT * FROM Products WHERE Name = @ProductName";
        var products = await _dbConnection.QueryAsync<Product>(
            sql,
            new { ProductName = name } // Pass user input as a parameter
        );
        return Ok(products);
    }
}
```

**Why it is Secure:**

1. **Code vs. Data**: When using parameterized queries, the database driver and the database itself are able to distinguish between the SQL command (the code) and the parameter value (the data).
2. **No Interpretation**: The value of the `@ProductName` parameter is never interpreted as part of the SQL command. Even if an attacker sends the malicious string `' OR 1=1 --`, the database will simply look for a product whose name is the literal string `' OR 1=1 --'`. It will not find one, and the query will return no results.
3. **Protection**: The malicious input is treated as a simple string value, not as executable code, completely neutralizing the injection attack.
