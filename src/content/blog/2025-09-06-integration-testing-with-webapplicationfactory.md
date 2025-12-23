---
title: "Integration Testing with WebApplicationFactory"
description: "Learn how to perform efficient integration testing in ASP.NET Core using the WebApplicationFactory."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Testing",
    "Integration Testing",
    "WebApplicationFactory",
    "xUnit",
    "API Testing",
    "Software Quality",
    "TDD",
  ]
---

## Mind Map Summary

- **WebApplicationFactory**
  - **Definition**: A testing utility in ASP.NET Core that creates an in-memory test server for your application, enabling full-stack tests without real hosting.
  - **Key Concepts**
    - **`WebApplicationFactory<TEntryPoint>`**: The bootstrap class for the in-memory host.
    - **In-memory Test Server**: The app runs within the test process, allowing component interaction.
    - **`HttpClient`**: Standard client used to "talk" to the in-memory server.
    - **Dependency Overrides**: Recompiling the DI container for tests (e.g., swapping a real DB for SQLite in-memory).
- **Benefits and Challenges**
  - **Pros**: High fidelity (tests middleware, routing, DB), increased confidence, and significantly faster than full E2E/browser tests.
  - **Cons**: Slower than unit tests, more complex state management (seeding data), and more resource-intensive.

## Core Concepts

Integration testing with `WebApplicationFactory` is the "gold standard" for testing web APIs. Instead of mocking every service, you spin up the entire application in memory. You send a real HTTP request and receive a real response, verifying that the entire pipe—from middleware to data access—is working as intended.

This approach verifies the interactions between multiple components, ensuring that a change in a service doesn't break a controller's contract or that an authorization policy is correctly applied to a route.

## Practice Exercise

Using `WebApplicationFactory`, write an integration test for an API endpoint. The test should:

1. Create an in-memory test server for an ASP.NET Core application.
2. Make an HTTP GET request to `/api/products`.
3. Assert that the response has a `200 OK` status code and contains products.

## Answer (Integration Test Implementation in C#)

### 1. The Controller to Test

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> _products = new()
    {
        new Product { Id = 1, Name = "Laptop", Price = 1200 },
        new Product { Id = 2, Name = "Mouse", Price = 25 }
    };

    [HttpGet]
    public IActionResult Get() => Ok(_products);
}
```

### 2. Custom WebApplicationFactory

This factory allows you to customize the test environment (e.g., using a test database).

```csharp
public class CustomWebApplicationFactory : WebApplicationFactory<Program>
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            // Optional: Replace production DB with In-Memory DB for faster tests
            // services.AddDbContext<AppDbContext>(o => o.UseInMemoryDatabase("TestDb"));
        });
    }
}
```

### 3. The Integration Test (xUnit)

```csharp
public class ProductsApiTests : IClassFixture<CustomWebApplicationFactory>
{
    private readonly HttpClient _client;

    public ProductsApiTests(CustomWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetProducts_ReturnsOkAndData()
    {
        // Act
        var response = await _client.GetAsync("/api/products");

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var content = await response.Content.ReadAsStringAsync();
        var products = JsonConvert.DeserializeObject<List<Product>>(content);

        Assert.NotNull(products);
        Assert.Equal(2, products.Count);
        Assert.Contains(products, p => p.Name == "Laptop");
    }
}
```

### Key Takeaways

1. **`IClassFixture`**: This xUnit interface ensures the test host is shared across all tests in the class, making the test suite much faster.
2. **`factory.CreateClient()`**: This isn't just a regular `HttpClient`; it's pre-configured to handle the URI routing for the in-memory server and can even handle cookies/auth automatically.
3. **`Newtonsoft.Json`**: Used here to deserialize the response. In modern .NET, you might prefer `System.Text.Json` for even better performance.
4. **End-to-End feel, Unit Test speed**: This style of testing is far more reliable than pure unit testing for web APIs, as it catches configuration issues that mocks would hide.
