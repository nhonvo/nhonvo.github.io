---
title: "Advanced Model Validation (FluentValidation)"
description: "Discuss the limitations of Data Annotations for validation. Explain how to use a library like FluentValidation to create complex, decoupled, and easily testable validation rules."
pubDate: "Sep 07 2025"
published: true
tags: ["ASP.NET Core", "Validation", "FluentValidation"]
---

### Mind Map Summary

- **Topic**: Advanced Model Validation (FluentValidation)
- **Limitations of Data Annotations**:
    - **Limited Functionality**: Not possible to create complex validation rules, such as conditional validation or rules that depend on other services.
    - **Coupling**: Validation rules are coupled to the model.
    - **Testability**: Difficult to unit test validation rules.
- **FluentValidation**:
    - **Fluent Interface**: Provides a fluent interface for building validation rules.
    - **Decoupling**: Decouples validation rules from the model.
    - **Testability**: Easy to unit test validation rules.
    - **Integration with ASP.NET Core**: Integrates with the ASP.NET Core pipeline to automatically validate models and populate the `ModelState`.

### Practice Exercise

Create a complex model and use FluentValidation to create rules that are not possible with data annotations (e.g., conditional validation, or a rule that depends on another service). Integrate it into the ASP.NET Core pipeline to have validation errors automatically populate the `ModelState`.

### Answer

**1. Model and Validator:**

```csharp
public class Customer
{
    public string Name { get; set; }
    public string Email { get; set; }
    public bool IsPreferred { get; set; }
    public string DiscountCode { get; set; }
}

public class CustomerValidator : AbstractValidator<Customer>
{
    public CustomerValidator()
    {
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.Email).EmailAddress();
        RuleFor(x => x.DiscountCode).NotEmpty().When(x => x.IsPreferred);
    }
}
```

**2. Configure FluentValidation in `Program.cs`:**

```csharp
using FluentValidation.AspNetCore;

builder.Services.AddControllers()
    .AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<CustomerValidator>());
```

**3. Controller:**

```csharp
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class CustomersController : ControllerBase
{
    [HttpPost]
    public IActionResult Post(Customer customer)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // ...

        return Ok();
    }
}
```

**Explanation:**

-   The `CustomerValidator` defines a conditional validation rule that requires the `DiscountCode` to be not empty only if the `IsPreferred` property is true.
-   FluentValidation is integrated into the ASP.NET Core pipeline by calling `AddFluentValidation()` in `Program.cs`.
-   When a `POST` request is made to the `CustomersController`, the `Customer` model is automatically validated. If the validation fails, the `ModelState` is populated with the validation errors, and the controller returns a `400 Bad Request` response.
