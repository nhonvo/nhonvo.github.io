---
title: "API Documentation with OpenAPI/Swagger"
description: "Explain the importance of API documentation. Discuss how to use libraries like Swashbuckle to automatically generate an OpenAPI specification and interactive Swagger UI from your C# controllers."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "API Design", "Documentation", "OpenAPI", "Swagger"]
---

### Mind Map Summary

- **Topic**: API Documentation with OpenAPI/Swagger
- **Core Concepts**:
    - **OpenAPI (formerly Swagger)**: A specification for building APIs that allows developers to understand and consume the API without having to read the source code.
    - **Swagger UI**: An interactive UI that allows developers to explore and test an API.
    - **Swashbuckle**: A library that automatically generates an OpenAPI specification and Swagger UI from your C# controllers.
- **Benefits of API Documentation**:
    - **Improved Developer Experience**: Makes it easier for developers to understand and use your API.
    - **Reduced Support Costs**: Reduces the number of questions and support requests from developers.
    - **Increased Adoption**: Makes it more likely that developers will use your API.

### Practice Exercise

Add Swashbuckle to an existing API project. Customize the generated Swagger UI by adding XML comments to your controller actions and models to provide detailed descriptions, examples, and annotations (`[ProducesResponseType]`).

### Answer

**1. Install the NuGet Package:**

```bash
dotnet add package Swashbuckle.AspNetCore
```

**2. Configure Swashbuckle in `Program.cs`:**

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Set the comments path for the Swagger JSON and UI.
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

// ...

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});
```

**3. Enable XML Comments in the `.csproj` file:**

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

**4. Add XML Comments to a Controller:**

```csharp
using Microsoft.AspNetCore.Mvc;

/// <summary>
/// A controller for managing products.
/// </summary>
[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    /// <summary>
    /// Gets a product by ID.
    /// </summary>
    /// <param name="id">The ID of the product to get.</param>
    /// <returns>The product with the specified ID.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Product), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> Get(int id)
    {
        // ...
    }
}
```
