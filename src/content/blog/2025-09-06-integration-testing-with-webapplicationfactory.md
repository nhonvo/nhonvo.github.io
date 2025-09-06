---
title: "Integration Testing with WebApplicationFactory"
description: "Explain how to write in-memory integration tests for your ASP.NET Core APIs."
pubDate: "Sep 06 2025"
published: true
tags: ["Testing", "Integration Testing", "ASP.NET Core"]
---

### Mind Map Summary

- **Topic**: Integration Testing with WebApplicationFactory
- **Definition**: A testing utility in ASP.NET Core that allows you to create an in-memory test server for your application, enabling full-stack integration tests without needing to host the application on a real web server.
- **Key Concepts**:
    - **`WebApplicationFactory<TEntryPoint>`**: A class that bootstraps your ASP.NET Core application in memory for testing. `TEntryPoint` is typically your `Startup` class or `Program` class (for Minimal APIs).
    - **In-memory Test Server**: The application runs within the test process, allowing direct interaction with its components.
    - **`HttpClient`**: Used to make HTTP requests to the in-memory test server.
    - **Dependency Overrides**: Ability to replace services in the test host's dependency injection container with test-specific implementations or mocks.
- **Benefits (Pros)**:
    - **High Fidelity**: Tests a significant portion of the application's stack (middleware, routing, controllers, services, database interactions).
    - **Increased Confidence**: Provides higher confidence that components work correctly together.
    - **Real Dependencies**: Can use real databases (or in-memory versions) and external services (or fakes/mocks).
    - **Faster than E2E**: Avoids network latency and browser automation overhead of full end-to-end tests.
    - **Simplified Setup**: Manages the application's lifecycle within the test environment.
- **Challenges (Cons)**:
    - **Slower Execution**: Still significantly slower than unit tests due to bootstrapping the application and potentially interacting with real dependencies.
    - **More Complex Setup**: Requires more setup than unit tests, especially when dealing with database seeding or external service fakes.
    - **Debugging**: Can be harder to pinpoint the exact source of a failure compared to isolated unit tests.
    - **Resource Intensive**: Consumes more memory and CPU than unit tests.
- **Practical Use**:
    - Testing API endpoints and their full request/response cycle.
    - Verifying middleware behavior.
    - Ensuring correct routing and controller action execution.
    - Testing database interactions through the application's service layer.
    - Validating authorization and authentication flows.

### Core Concepts

Integration testing with `WebApplicationFactory` is a powerful way to test your ASP.NET Core application's behavior as a whole, or significant parts of it. Instead of mocking every dependency, `WebApplicationFactory` allows you to spin up your entire application (or a configured subset) in memory. You can then use a standard `HttpClient` to send requests to this in-memory application and assert on the responses.

This approach provides a higher level of confidence than unit tests because it verifies the interactions between multiple components, including your routing, middleware pipeline, controllers, and service layers. You can even configure it to use a real database or an in-memory database for testing data access.

### Practice Exercise

Using `WebApplicationFactory`, write an integration test for an API endpoint. The test should:
1.  Create an in-memory test server for an ASP.NET Core application.
2.  Make an HTTP GET request to an endpoint (e.g., `/api/products`).
3.  Assert that the response has a `200 OK` status code and the correct content (e.g., a JSON array of products).

### Answer

Let's assume we have a simple ASP.NET Core Web API project with a `ProductsController` and a `Product` model.

#### 1. Project Setup (Example)

**`Product.cs`**
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

**`ProductsController.cs`**
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new List<Product>
    {
        new Product { Id = 1, Name = "Laptop", Price = 1200.00m },
        new Product { Id = 2, Name = "Mouse", Price = 25.00m }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get()
    {
        return Ok(_products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> Get(int id)
    {
        var product = _products.FirstOrDefault(p => p.Id == id);
        if (product == null)
        {
            return NotFound();
        }
        return Ok(product);
    }
}
```

**`Startup.cs`** (or `Program.cs` for Minimal APIs)
```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
```

#### 2. Integration Test Project Setup

Create a new xUnit test project (e.g., `MyApi.IntegrationTests`) and add references to:
- Your main ASP.NET Core project (`MyApi`).
- `Microsoft.AspNetCore.Mvc.Testing` (for `WebApplicationFactory`).
- `Microsoft.NET.Test.Sdk`.
- `xunit` and `xunit.runner.visualstudio`.
- `Newtonsoft.Json` or `System.Text.Json` for deserialization.

**`CustomWebApplicationFactory.cs`**
This class inherits from `WebApplicationFactory` and can be used to customize the test host. For example, you might override services to use an in-memory database.

```csharp
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

// TEntryPoint is your Startup class or Program class for Minimal APIs
public class CustomWebApplicationFactory : WebApplicationFactory<Startup>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((context, conf) =>
        {
            // Optional: Add test-specific configuration
            conf.AddJsonFile(Path.Combine(Directory.GetCurrentDirectory(), "appsettings.Test.json"), optional: true);
        });

        builder.ConfigureServices(services =>
        {
            // Optional: Override services for testing purposes
            // Example: Replace a real database context with an in-memory one
            // var descriptor = services.SingleOrDefault(
            //     d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
            // if (descriptor != null)
            // {
            //     services.Remove(descriptor);
            // }
            // services.AddDbContext<ApplicationDbContext>(options =>
            // {
            //     options.UseInMemoryDatabase("InMemoryDbForTesting");
            // });

            // Build the service provider.
            var sp = services.BuildServiceProvider();

            // Create a scope to obtain a reference to the database context (if applicable)
            // using (var scope = sp.CreateScope())
            // {
            //     var scopedServices = scope.ServiceProvider;
            //     var db = scopedServices.GetRequiredService<ApplicationDbContext>();
            //     db.Database.EnsureCreated(); // Ensure the in-memory database is created
            //     // Seed the database with test data if needed
            // }
        });
    }
}
```

#### 3. The Integration Test (`ProductsApiTests.cs`)

```csharp
using Xunit;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json; // Or System.Text.Json

public class ProductsApiTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ProductsApiTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProducts_ReturnsOkStatusCodeAndCorrectContent()
    {
        // Act
        var response = await _client.GetAsync("/api/products");

        // Assert
        response.EnsureSuccessStatusCode(); // Status Code 200-299
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        var products = JsonConvert.DeserializeObject<List<Product>>(content);

        Assert.NotNull(products);
        Assert.Equal(2, products.Count); // Assuming 2 products in our static list
        Assert.Contains(products, p => p.Name == "Laptop");
        Assert.Contains(products, p => p.Name == "Mouse");
    }

    [Fact]
    public async Task GetProductById_ReturnsProduct_WhenProductExists()
    {
        // Arrange
        var productId = 1;

        // Act
        var response = await _client.GetAsync($"/api/products/{productId}");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        var product = JsonConvert.DeserializeObject<Product>(content);

        Assert.NotNull(product);
        Assert.Equal(productId, product.Id);
        Assert.Equal("Laptop", product.Name);
    }

    [Fact]
    public async Task GetProductById_ReturnsNotFound_WhenProductDoesNotExist()
    {
        // Arrange
        var productId = 99; // Non-existent ID

        // Act
        var response = await _client.GetAsync($"/api/products/{productId}");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
```

#### Explanation

1.  **`IClassFixture<CustomWebApplicationFactory>`**: This interface ensures that a single instance of `CustomWebApplicationFactory` is created for all tests in the `ProductsApiTests` class, and its `HttpClient` is reused.
2.  **`CustomWebApplicationFactory`**: This factory class is responsible for bootstrapping your ASP.NET Core application. You can override its `ConfigureWebHost` method to customize the application's configuration or replace services in the DI container (e.g., using an in-memory database for tests).
3.  **`factory.CreateClient()`**: This method creates an `HttpClient` instance that can make requests directly to your in-memory test server.
4.  **`_client.GetAsync("/api/products")`**: This sends an HTTP GET request to the specified endpoint of your in-memory application.
5.  **`response.EnsureSuccessStatusCode()`**: This helper method asserts that the HTTP response status code is in the 200-299 range.
6.  **`Assert.Equal(HttpStatusCode.OK, response.StatusCode)`**: Explicitly asserts the expected HTTP status code.
7.  **`await response.Content.ReadAsStringAsync()`**: Reads the response body as a string.
8.  **`JsonConvert.DeserializeObject<List<Product>>(content)`**: Deserializes the JSON response into a list of `Product` objects for further assertions.

This setup allows you to write robust integration tests that closely resemble how your application will behave in a production environment, but with the speed and control of an in-memory test host.
