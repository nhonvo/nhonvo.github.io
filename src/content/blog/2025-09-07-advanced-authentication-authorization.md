---
title: "Advanced Authentication & Authorization"
description: "Discuss advanced topics like claims transformation, custom authorization policies with requirements and handlers, and federated identity using OpenID Connect."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "Security", "Authentication", "Authorization", "Claims"]
---

### Mind Map Summary

- **Topic**: Advanced Authentication & Authorization
- **Core Concepts**:
    - **Claims Transformation**: The process of augmenting a user's identity (`ClaimsPrincipal`) with additional claims after they have been authenticated. This is useful for adding roles, permissions, or other information from a database or external service.
    - **Policy-Based Authorization**: A declarative approach where authorization policies are registered at startup and then applied to endpoints. This decouples authorization logic from the application code.
        - **Requirements**: A collection of data parameters that a policy uses to evaluate a user's identity.
        - **Handlers**: The logic that evaluates the requirements. A handler can be created for each requirement.
    - **Federated Identity**: Offloading authentication to an external identity provider (IdP) like Google, Azure AD, or IdentityServer. The application trusts the token issued by the IdP.
        - **OpenID Connect (OIDC)**: A simple identity layer on top of the OAuth 2.0 protocol. It allows clients to verify the identity of the end-user based on the authentication performed by an Authorization Server.
- **Pros**:
    - **Decoupling**: Policy-based authorization separates authorization logic from business logic, making the code cleaner and easier to maintain.
    - **Flexibility**: Claims transformation allows for dynamic and flexible user identities.
    - **Centralized Authentication**: Federated identity centralizes user management and authentication, improving security and user experience.
- **Cons**:
    - **Complexity**: These concepts can be complex to set up and debug, especially for developers new to them.
    - **External Dependencies**: Federated identity introduces a dependency on an external IdP, which could be a point of failure.

### Practice Exercise

Implement a custom authorization handler that checks for a specific condition, such as whether a user has been a member for more than a year (based on a `RegistrationDate` claim). Apply this policy to an API endpoint.

### Answer

**1. Define the Requirement:**

```csharp
using Microsoft.AspNetCore.Authorization;

public class MinimumMembershipRequirement : IAuthorizationRequirement
{
    public int MinimumYears { get; }

    public MinimumMembershipRequirement(int minimumYears)
    {
        MinimumYears = minimumYears;
    }
}
```

**2. Create the Authorization Handler:**

```csharp
using Microsoft.AspNetCore.Authorization;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

public class MinimumMembershipHandler : AuthorizationHandler<MinimumMembershipRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumMembershipRequirement requirement)
    {
        var registrationDateClaim = context.User.FindFirst(c => c.Type == "RegistrationDate");

        if (registrationDateClaim != null && DateTime.TryParse(registrationDateClaim.Value, out var registrationDate))
        {
            if (registrationDate.AddYears(requirement.MinimumYears) < DateTime.UtcNow)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

**3. Register the Policy in `Program.cs`:**

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("VeteranUser", policy =>
        policy.Requirements.Add(new MinimumMembershipRequirement(1)));
});

builder.Services.AddSingleton<IAuthorizationHandler, MinimumMembershipHandler>();
```

**4. Apply the Policy to a Controller:**

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[Authorize(Policy = "VeteranUser")]
public class SecretDataController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("This is secret data for veteran users!");
    }
}
```