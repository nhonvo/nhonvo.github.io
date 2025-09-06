---
title: "API Versioning Strategies (URL, Header, Query String)"
description: "Discuss the pros and cons of each approach."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Mind Map Summary

- **API Versioning**
  - **Why?**: To allow an API to evolve over time without breaking existing client applications.
  - **Key Principle**: A change is considered "breaking" if it requires a client to be updated to continue functioning correctly (e.g., removing a field, changing a data type).
- **Common Versioning Strategies**
  - **1. URL Path Versioning**
    - **Example**: `GET /api/v1/products` vs. `GET /api/v2/products`
    - **Pros**: Explicit and highly visible. Easy for developers to browse and test in a browser.
    - **Cons**: Technically violates the REST principle that a URI should represent a single, unique resource.
  - **2. Query String Versioning**
    - **Example**: `GET /api/products?api-version=1.0`
    - **Pros**: Simple to implement and keeps the core URI clean.
    - **Cons**: Can be messy and easy for clients to omit, leading them to get an unexpected version.
  - **3. Header Versioning**
    - **Example**: `GET /api/products` with header `X-Api-Version: 1.0`
    - **Pros**: Keeps the URI clean. Considered by many to be the purest RESTful approach as it separates the resource (URI) from its representation (version).
    - **Cons**: Less visible to developers; cannot be tested directly in a browser URL.

### Core Concepts

#### Why Version an API?
As an API matures, you will inevitably need to make changes. Some changes are non-breaking (like adding a new, optional field to a response), but many are breaking (like renaming a field, removing a property, or changing the structure of the response). If you make a breaking change without versioning, all client applications currently using your API will break. Versioning provides a contract: you are telling your clients that they can rely on a specific version of the API (`v1`) to remain stable, while you are free to make improvements and breaking changes in a new version (`v2`).

#### 1. URL Path Versioning
This is the most common and straightforward approach. The version is embedded directly in the URL path. It's immediately obvious to anyone looking at the URL which version of the API they are interacting with.
- **Pros**: Highly explicit, easy to explore and test, simple to route requests to different controller code.
- **Cons**: It couples the resource identifier (the URI) to a specific point-in-time representation of that resource, which some argue is not purely RESTful.

#### 2. Query String Versioning
This approach specifies the version as a parameter in the query string. It's easy to implement and easy to default to the latest version if the parameter is omitted.
- **Pros**: Simple, clean URLs.
- **Cons**: Less explicit than URL path versioning. It can be easy for developers to forget to include the query parameter.

#### 3. Header Versioning
This approach uses a custom HTTP request header (e.g., `X-Api-Version`) to specify the version. This is often favored by REST purists because the URI (`/api/products`) remains a canonical identifier for the resource, and the header simply requests a different *representation* of that resource.
- **Pros**: Cleanest URLs. Separates the resource from its representation.
- **Cons**: Not visible to the end-user in the browser. Requires specific tooling (like Postman or curl) to set the header, making casual exploration more difficult.

### Practice Exercise

Using the `Asp.Versioning.Mvc` library, create a single controller with two action methods that respond to the same route. One method should be for API version 1.0, and the other for 2.0. Configure the application to support URL-segment-based versioning (e.g., `/api/v1/products`).

### Answer

First, you need to add the required NuGet package: `dotnet add package Asp.Versioning.Mvc.ApiExplorer`

#### Code Example

**1. `Program.cs` - Configure API Versioning**

```csharp
using Asp.Versioning;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// 1. Add API Versioning Services
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true; // Adds api-supported-versions header
    options.ApiVersionReader = new UrlSegmentApiVersionReader(); // Read version from URL path
});

var app = builder.Build();

app.MapControllers();
app.Run();
```

**2. The Versioned Controller**

```csharp
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;

[ApiController]
// The {v:apiVersion} template parameter is automatically populated by the library
[Route("api/v{v:apiVersion}/[controller]")] 
[ApiVersion("1.0")]
[ApiVersion("2.0")]
public class ProductsController : ControllerBase
{
    // This action handles GET requests for version 1.0
    [HttpGet]
    [MapToApiVersion("1.0")]
    public IActionResult GetV1()
    {
        var products = new[]
        {
            new { Id = 1, Name = "Laptop" }, // V1 has simple objects
            new { Id = 2, Name = "Mouse" }
        };
        return Ok(products);
    }

    // This action handles GET requests for version 2.0
    [HttpGet]
    [MapToApiVersion("2.0")]
    public IActionResult GetV2()
    {
        var products = new[]
        {
            // V2 has more detailed objects with a new 'Description' field
            new { Id = 1, Name = "Laptop", Description = "A powerful laptop" },
            new { Id = 2, Name = "Mouse", Description = "A wireless mouse" }
        };
        return Ok(products);
    }
}
```

#### Explanation

1.  **Configuration**: In `Program.cs`, we configure the API versioning service. We set a default version, report supported versions in response headers, and most importantly, we set the `ApiVersionReader` to `UrlSegmentApiVersionReader`. This tells the library to look for the version in the URL path (e.g., `/v1/`).
2.  **Controller Routing**: The `Route` attribute on the controller now includes `v{v:apiVersion}`. The versioning library uses this template to extract the version from the URL.
3.  **`[ApiVersion]` Attribute**: We decorate the controller with `[ApiVersion("1.0")]` and `[ApiVersion("2.0")]` to declare that this controller knows how to handle requests for both versions.
4.  **`[MapToApiVersion]` Attribute**: This is the key to mapping a specific request to a specific method. We apply `[MapToApiVersion("1.0")]` to the `GetV1` method and `[MapToApiVersion("2.0")]` to the `GetV2` method.

**How it Works in Practice:**
-   A `GET` request to `/api/v1/products` will be routed to the `GetV1()` method.
-   A `GET` request to `/api/v2/products` will be routed to the `GetV2()` method, which returns a different data structure.
-   A `GET` request to `/api/products` (without a version) will be routed to the default version, `v1`, because we set `AssumeDefaultVersionWhenUnspecified = true`.