---
title: "CORS Policies and Security"
description: "Explain how Cross-Origin Resource Sharing (CORS) works. Discuss how to configure named policies, middleware, and attributes for both permissive and restrictive scenarios."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "Security", "CORS"]
---

### Mind Map Summary

- **Topic**: CORS Policies and Security
- **Definition**: A mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
- **How it Works**:
    - The browser sends a preflight `OPTIONS` request to the server to determine if the actual request is safe to send.
    - The server responds with a set of `Access-Control-*` headers that indicate which origins, methods, and headers are allowed.
    - If the preflight request is successful, the browser sends the actual request.
- **Configuration in ASP.NET Core**:
    - **Named Policies**: Define one or more CORS policies in `Program.cs`.
    - **Middleware**: Apply a CORS policy to all endpoints using the `UseCors()` middleware.
    - **Attributes**: Apply a CORS policy to a specific controller or action using the `[EnableCors]` attribute.

### Practice Exercise

In an ASP.NET Core API, configure a restrictive default CORS policy. Then, create a specific named policy that allows requests only from `https://example.com` with specific headers and methods. Apply this named policy to a single controller or endpoint.

### Answer

**1. Configure CORS Policies in `Program.cs`:**

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("https://my-app.com")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });

    options.AddPolicy("ExamplePolicy", builder =>
    {
        builder.WithOrigins("https://example.com")
               .WithHeaders("X-My-Header")
               .WithMethods("GET", "POST");
    });
});

// ...

app.UseCors();
```

**2. Apply the Named Policy to a Controller:**

```csharp
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[EnableCors("ExamplePolicy")]
public class MyController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("This endpoint has a specific CORS policy.");
    }
}
```

**Explanation:**

-   The default CORS policy is restrictive and only allows requests from `https://my-app.com`.
-   The `ExamplePolicy` is a named policy that only allows requests from `https://example.com` with the `X-My-Header` header and the `GET` and `POST` methods.
-   The `[EnableCors]` attribute is used to apply the `ExamplePolicy` to the `MyController` controller.
