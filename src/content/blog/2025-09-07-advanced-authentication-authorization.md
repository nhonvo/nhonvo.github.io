---
title: "Advanced Authentication & Authorization"
description: "Go beyond simple RBAC. Master complex identity scenarios like claims transformation, custom authorization policies with requirements and handlers, and federated identity."
pubDate: "9 7 2025"
published: true
tags:
  [
    "ASP.NET Core",
    "Security",
    ".NET",
    "Authentication",
    "Authorization",
    "OIDC",
    "JWT",
    "Backend Development",
    "Architecture",
  ]
---

## Beyond Basic Roles

In complex enterprise applications, simple Role-Based Access Control (RBAC) often becomes unmanageable ("Role Explosion"). Modern security in .NET favors **Policy-Based Authorization** and **Claims Transformation**.

---

## 1. Claims Transformation

Authentication provides the **Who**, but authorization often needs the **What Else**. Claims transformation occurs after a user is authenticated but before they hit your business logic. It allows you to augment the `ClaimsPrincipal` with data from external sources (e.g., a database or a legacy LDAP system).

```csharp
public class MyClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        // Add custom application-specific claims without modifying the Identity Provider
        var identity = (ClaimsIdentity)principal.Identity;
        identity.AddClaim(new Claim("SubscriptionLevel", "Premium"));
        return Task.FromResult(principal);
    }
}
```

---

## 2. Policy-Based Authorization (ABAC)

Instead of hardcoding `[Authorize(Roles = "Manager")]`, you define **Policies**. A policy is a collection of **Requirements** and **Handlers**. This approach follows Attribute-Based Access Control (ABAC).

### Key Components

- **Requirement**: A data class that defines the parameters (e.g., `MinimumAgeRequirement`).
- **Handler**: The logic that evaluates if the requirement is met based on the user's claims.

---

## 3. Federated Identity & OIDC

By using **OpenID Connect (OIDC)**, you offload the risk of storing passwords to trusted Identity Providers (IdPs) like Azure AD, Auth0, or Google. Your application simply receives a signed JWT (JSON Web Token) that proves the user's identity.

---

## Practice Exercise

Implement a custom authorization handler that checks if a user has "Veteran" status based on a `RegistrationDate` claim (must be > 1 year).

---

## Answer

### 1. The Requirement

```csharp
public class VeteranRequirement : IAuthorizationRequirement { }
```

### 2. The Handler

```csharp
public class VeteranHandler : AuthorizationHandler<VeteranRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, VeteranRequirement requirement)
    {
        var regDateClaim = context.User.FindFirst(c => c.Type == "RegistrationDate")?.Value;

        if (DateTime.TryParse(regDateClaim, out var regDate))
        {
            if (regDate.AddYears(1) <= DateTime.UtcNow)
            {
                context.Succeed(requirement);
            }
        }
        return Task.CompletedTask;
    }
}
```

### 3. Registration in `Program.cs`

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsVeteran", policy => policy.Requirements.Add(new VeteranRequirement()));
});

builder.Services.AddSingleton<IAuthorizationHandler, VeteranHandler>();
```

### 4. Usage in Controller

```csharp
[Authorize(Policy = "IsVeteran")]
public IActionResult GetExclusiveOffer() => Ok("Special code for veterans: VET-2025");
```

## Why This Architecture Works

1.  **Decoupling**: The Controller doesn't care _how_ someone becomes a veteran; it just knows it needs that policy satisfied.
2.  **Scalability**: If the business rule changes to "2 years," you only change one line in the `VeteranHandler`, not every controller in the app.
3.  **Security**: Claims are cryptographically signed in the JWT, meaning they cannot be tampered with by the client.

## Summary

Advanced identity management is about **externalizing rules**. By moving your security logic into **Policies** and **Claims Managers**, you keep your business code clean, maintainable, and highly resilient to changing compliance requirements.
