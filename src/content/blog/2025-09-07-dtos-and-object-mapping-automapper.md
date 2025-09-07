---
title: "DTOs and Object Mapping (AutoMapper)"
description: "Explain the purpose of Data Transfer Objects (DTOs) and why they are important for decoupling your internal domain models from your external API contracts. Discuss the pros and cons of using an object mapping library like AutoMapper."
pubDate: "Sep 07 2025"
published: true
tags: ["Software Design & Architecture", "API Design", "DTOs", "AutoMapper"]
---

### Mind Map Summary

- **Topic**: DTOs and Object Mapping
- **Core Concepts**:
    - **Data Transfer Object (DTO)**: An object that is used to transfer data between different layers of an application, such as between the service layer and the presentation layer.
    - **Object Mapping**: The process of converting an object from one type to another.
    - **AutoMapper**: A popular object mapping library for .NET.
- **Benefits of DTOs**:
    - **Decoupling**: Decouple your internal domain models from your external API contracts.
    - **Security**: Prevent over-posting and under-posting attacks.
    - **Performance**: Reduce the amount of data that is sent over the wire.
- **Pros and Cons of AutoMapper**:
    - **Pros**: Reduces boilerplate code, easy to use, convention-based.
    - **Cons**: Can be slow if not configured correctly, can hide complexity.

### Practice Exercise

Create an EF Core entity `Product` and a corresponding `ProductDto`. Configure AutoMapper to map between the two. In a controller, use the mapping to transform the entity to a DTO before returning it to the client, and to map an incoming DTO to an entity for saving to the database.

### Answer

**1. Entity and DTO:**

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

**2. AutoMapper Profile:**

```csharp
using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDto>();
        CreateMap<ProductDto, Product>();
    }
}
```

**3. Controller:**

```csharp
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly MyDbContext _context;
    private readonly IMapper _mapper;

    public ProductsController(MyDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var product = await _context.Products.FindAsync(id);
        var productDto = _mapper.Map<ProductDto>(product);
        return Ok(productDto);
    }

    [HttpPost]
    public async Task<IActionResult> Post(ProductDto productDto)
    {
        var product = _mapper.Map<Product>(productDto);
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
    }
}
```
