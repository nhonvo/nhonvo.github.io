---
title: "Authentication vs. Authorization"
description: "Explain common schemes like JWT, OAuth 2.0, OpenID Connect, and Cookie-based authentication."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core", "Security"]
---

### Mind Map Summary

- **Authentication (AuthN) - "Who are you?"**
  - **Definition**: The process of verifying a user's identity.
  - **Analogy**: Showing your driver's license to prove your name and age.
  - **Output**: A verified identity, typically represented by a `ClaimsPrincipal` object containing claims (e.g., user ID, name).
  - **Common Schemes**:
    - **Cookie Authentication**: The server sends a cookie to the client after login. The client sends the cookie with each subsequent request.
    - **Token-Based (JWT)**: The server issues a signed JSON Web Token (JWT) to the client. The client sends this token in the `Authorization` header.
- **Authorization (AuthZ) - "What are you allowed to do?"**
  - **Definition**: The process of determining if an authenticated user has permission to access a specific resource or perform an action.
  - **Prerequisite**: Authentication must happen first.
  - **Analogy**: Your driver's license (AuthN) proves you can drive, but you need a specific license class (AuthZ) to drive a commercial truck.
  - **Mechanisms in ASP.NET Core**:
    - **Simple (`[Authorize]`)**: Checks if the user is authenticated.
    - **Role-Based (`[Authorize(Roles = "Admin")]`)**: Checks if the user has a specific role claim.
    - **Policy-Based (`[Authorize(Policy = "IsAdult")]`)**: The most flexible approach. Uses custom requirements and handlers to perform complex validation (e.g., checking age, subscription level, etc.).

### Core Concepts

#### 1. Authentication (AuthN)
Authentication is the foundation of security. Its only job is to validate credentials (like a username/password, a token, or a certificate) and produce a trusted identity. In ASP.NET Core, this identity is encapsulated in a `ClaimsPrincipal` object, which is a container for `Claims`. A claim is a simple key-value pair representing a piece of information about the user, such as their name, email, user ID, or roles.

- **Cookie-based**: Traditional choice for server-rendered web apps. After a user logs in, the server creates an encrypted cookie containing the user's identity and sends it to the browser. The browser automatically includes this cookie on all future requests to the same domain.
- **JWT (JSON Web Token)**: The modern standard for APIs and Single-Page Applications (SPAs). The server issues a token which is a self-contained, digitally signed JSON object. The client stores this token and sends it in the `Authorization: Bearer <token>` header of each request. The server can validate the token's signature without needing to look up session information, making it stateless and scalable.

#### 2. Authorization (AuthZ)
Authorization happens after authentication and uses the established identity to make access control decisions. 

- **Simple Authorization**: Using the `[Authorize]` attribute without any parameters simply checks if the `User.Identity.IsAuthenticated` property is `true`. It allows any logged-in user.
- **Role-Based Authorization**: A simple and common model. You can decorate controllers or actions with `[Authorize(Roles = "Admin,Manager")]`. This checks if the authenticated user's `ClaimsPrincipal` has a role claim that matches one of the specified roles.
- **Policy-Based Authorization**: The most powerful and extensible model. It decouples authorization logic from the controller. A policy consists of one or more **requirements**. Each requirement has a corresponding **handler**. This allows you to implement complex business rules for authorization, such as checking a user's age from a `date_of_birth` claim, verifying a subscription level, or even checking the time of day.

### Practice Exercise

Create two API endpoints. Secure one with `[Authorize]`. Secure the second with a custom policy-based authorization requirement (e.g., `[Authorize(Policy = "IsAdmin")]`). Implement the policy and handler to check for a specific claim in the user's identity.

### Answer

#### Code Example

**1. `Program.cs` - Setup Authentication and Authorization**

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

var builder = WebApplication.CreateBuilder(args);

// 1. Add Authentication Services (using JWT Bearer as an example)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => { /* Configure JWT validation here */ });

// 2. Add Authorization Services and Define the Policy
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("IsAdmin", policy => 
        policy.RequireClaim("role", "admin"));
});

// A more complex policy with a custom requirement and handler
// builder.Services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();
// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy("IsAdult", policy => 
//         policy.Requirements.Add(new MinimumAgeRequirement(18)));
// });

builder.Services.AddControllers();
var app = builder.Build();

app.UseAuthentication(); // Authentication middleware must come first!
app.UseAuthorization();

app.MapControllers();
app.Run();
```

**2. The Controller with Secured Endpoints**

```csharp
[ApiController]
[Route("[controller]")]
public class SecretsController : ControllerBase
{
    // This endpoint requires the user to be authenticated, but nothing more.
    [HttpGet("general")]
    [Authorize]
    public IActionResult GetGeneralSecret()
    {
        return Ok("This is a general secret for any logged-in user.");
    }

    // This endpoint requires the user to be authenticated AND satisfy the "IsAdmin" policy.
    [HttpGet("admin")]
    [Authorize(Policy = "IsAdmin")]
    public IActionResult GetAdminSecret()
    {
        return Ok("This is a top secret for administrators only.");
    }

    // Example of how you might generate a token for testing
    [HttpGet("token/{role}")]
    [AllowAnonymous] // Anyone can get a token
    public IActionResult GetToken(string role)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, "test-user"),
            new Claim("role", role) // The important claim for our policy
        };

        // In a real app, you would use a signing key and generate a proper JWT.
        // This is a simplified example.
        var identity = new ClaimsIdentity(claims, "jwt");
        HttpContext.User = new ClaimsPrincipal(identity);
        return Ok($"Token generated for role: {role}. Use this identity in subsequent requests.");
    }
}
```

#### Explanation

1.  **Authentication Setup**: We add the JWT Bearer authentication handler. In a real application, you would configure it with the authority, audience, and signing keys to validate tokens properly.
2.  **Authorization Policy**: In `AddAuthorization`, we define a policy named `"IsAdmin"`. The line `policy.RequireClaim("role", "admin")` creates a simple requirement that the user's `ClaimsPrincipal` must contain a claim where the `Type` is `"role"` and the `Value` is `"admin"`.
3.  **Middleware Order**: It is critical that `app.UseAuthentication()` comes before `app.UseAuthorization()`. The system must first establish the user's identity before it can check their permissions.
4.  **Controller Endpoints**:
    -   `GET /secrets/general`: The `[Authorize]` attribute ensures that only authenticated users can access this. A request with a valid token (for any role) will succeed. A request without a token will receive a `401 Unauthorized`.
    -   `GET /secrets/admin`: The `[Authorize(Policy = "IsAdmin")]` attribute is more strict. The authorization service will check the authenticated user's claims against the `"IsAdmin"` policy. 
        -   A request with a token containing the `"role": "admin"` claim will succeed.
        -   A request with a token for a different role (e.g., `"user"`) will be authenticated but not authorized, resulting in a `403 Forbidden`.