---
title: "CORS Policies and Security"
description: "Master Cross-Origin Resource Sharing. Learn how to configure robust CORS policies in ASP.NET Core to protect your API from unauthorized access."
pubDate: "9 7 2025"
published: true
tags:
  [
    "ASP.NET Core",
    ".NET",
    "Security",
    "CORS",
    "Web Security",
    "Web APIs",
    "Backend Development",
    "Architecture",
  ]
---

## What is CORS?

Cross-Origin Resource Sharing (CORS) is a security mechanism implemented by browsers to prevent a malicious website from making requests to your API using a user's authenticated session (a form of CSRF).

By default, browsers follow the **Same-Origin Policy**, which means a script on `domain-a.com` cannot call an API on `domain-b.com`. CORS provides a way for `domain-b.com` to explicitly say: "I trust requests coming from `domain-a.com`."

### Core Terminology

- **Origin**: The combination of Scheme (HTTPS), Host (example.com), and Port (443).
- **Preflight (OPTIONS)**: A preliminary request sent by the browser to check if the server allows the actual request (required for `PUT`, `DELETE`, or custom headers).

---

## Configuration in ASP.NET Core

In .NET, CORS is configured in the Dependency Injection container and applied via middleware.

### 1. Define Policies in `Program.cs`

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    // Strict Policy for the main Frontend
    options.AddPolicy("FrontendApp", policy =>
    {
        policy.WithOrigins("https://www.myapp.com")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });

    // Read-only Policy for Partners
    options.AddPolicy("PartnerSafe", policy =>
    {
        policy.WithOrigins("https://partner.io")
              .WithMethods("GET")
              .WithHeaders("X-API-KEY");
    });
});
```

### 2. Apply Middleware

```csharp
var app = builder.Build();

app.UseRouting();

// Must be between UseRouting and UseAuthorization
app.UseCors("FrontendApp");

app.UseAuthorization();
```

---

## Security Best Practices

1.  **Never Use `AllowAnyOrigin()`**: This effectively disables CORS protection. Always be explicit.
2.  **Avoid `AllowAnyMethod()` for Public APIs**: If a partner only needs read access, only allow `GET`.
3.  **Credential Safety**: Use `.AllowCredentials()` only when necessary (for cookies/Windows Auth). Note that you cannot use wildcards (`*`) with credentials enabled.
4.  **Middleware Order**: If `app.UseCors()` is placed after `app.MapControllers()`, it will never be executed for those routes.

---

## Practice Exercise

Configure a policy that allows a mobile web app (`https://m.myapp.com`) to access your API using only `GET` and `POST`, and caches the preflight result for 10 minutes.

---

## Answer

### The Implementation

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("MobileApp", policy =>
    {
        policy.WithOrigins("https://m.myapp.com")
              .WithMethods("GET", "POST")
              .WithHeaders("Content-Type", "Authorization")
              .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});
```

### Why This Works

1.  **Minimum Privilege**: By restricting to `GET` and `POST`, we prevent the mobile app from accidentally or maliciously triggering `DELETE` or `PATCH` operations.
2.  **Performance**: `SetPreflightMaxAge` tells the browser to "remember" this permission for 10 minutes, avoiding the extra `OPTIONS` network call for every subsequent request.
3.  **Header Guard**: We only allow the `Authorization` and `Content-Type` headers, reducing the attack surface for custom header exploits.

## Summary

CORS is not a "bug" to be fixed with a wildcard—it is a **critical security layer**. By defining granular policies and understanding the preflight process, you can build APIs that are both accessible to your frontend and resilient against cross-site attacks.
