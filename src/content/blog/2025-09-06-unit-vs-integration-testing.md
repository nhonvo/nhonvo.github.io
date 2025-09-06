---
title: "Unit Testing vs. Integration Testing"
description: "Explain the difference and the role of each in the testing pyramid."
pubDate: "Sep 06 2025"
published: true
tags: ["Testing"]
---

### Mind Map Summary

- **Goal**: Ensure software quality and correctness.
- **The Testing Pyramid**: A strategy that suggests writing more low-level tests (unit) and fewer high-level tests (E2E).
  - **1. Unit Tests (Base of the Pyramid)**
    - **What**: Test the smallest testable parts of an application in isolation (e.g., a single method, a single class).
    - **Characteristics**: 
      - **Fast**: Execute in milliseconds.
      - **Cheap**: Easy to write and maintain.
      - **Isolated**: Dependencies are replaced with mocks or stubs.
    - **Purpose**: Verify the correctness of individual units of code.
  - **2. Integration Tests (Middle of the Pyramid)**
    - **What**: Test how different units or modules interact with each other.
    - **Characteristics**: 
      - **Slower**: Involve more components, potentially real databases or external services.
      - **More Expensive**: Harder to write and maintain than unit tests.
      - **Dependencies**: Often use real dependencies or in-memory versions of them.
    - **Purpose**: Verify the correct flow and interaction between integrated components.
  - **3. End-to-End (E2E) Tests (Top of the Pyramid)**
    - **What**: Test the entire application flow from a user's perspective, simulating real user interactions.
    - **Characteristics**: 
      - **Slowest**: Can take seconds or minutes to run.
      - **Most Expensive**: Hardest to write, maintain, and debug.
      - **Dependencies**: Requires the full application stack to be running.
    - **Purpose**: Verify the entire system works as expected from a user's point of view.

### Core Concepts

#### 1. Unit Testing
Unit tests are the bedrock of a good testing strategy. They focus on testing individual units of code in isolation. A "unit" is typically the smallest testable part of an application, often a single method or a class. The key to unit testing is **isolation**. If your unit has dependencies (e.g., a service that depends on a database repository), those dependencies are replaced with **mocks** or **stubs**. This ensures that if a test fails, you know exactly which unit of code is responsible for the failure, and the test runs extremely fast because it doesn't hit a real database or external service.

#### 2. Integration Testing
Integration tests verify that different parts of your application work correctly when put together. For example, you might test if your service layer correctly interacts with your database repository, or if your API controller correctly calls your service and returns the expected result. Unlike unit tests, integration tests often use real (or near-real) dependencies. For example, you might use an in-memory database for testing data access, or a test HTTP server for testing API calls. Integration tests are slower than unit tests but provide higher confidence that your components work together as intended.

### Practice Exercise

Given a service class that has a dependency on a repository interface (e.g., `IProductRepository`), write a unit test for a method in the service. Use a mocking framework like Moq or NSubstitute to create a mock of the repository and isolate the service for testing.

### Answer

We will use **Moq** as the mocking framework for this exercise.

#### 1. The Service and Interface

```csharp
// IProductRepository.cs
public interface IProductRepository
{
    Product GetById(int id);
    void Add(Product product);
}

// Product.cs (simple POCO)
public class Product { public int Id { get; set; } public string Name { get; set; } }

// ProductService.cs (the class we want to unit test)
public class ProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public Product GetProductDetails(int productId)
    {
        // Business logic: maybe add some logging or validation
        if (productId <= 0) throw new ArgumentException("Product ID must be positive.");

        var product = _productRepository.GetById(productId);

        if (product == null)
        {
            // Maybe throw a custom exception or return null based on business rules
            return null;
        }

        // Further business logic could be applied here
        return product;
    }
}
```

#### 2. The Unit Test (`ProductServiceTests.cs`)

First, install Moq: `dotnet add package Moq`

```csharp
using Moq;
using Xunit; // Or NUnit, MSTest

public class ProductServiceTests
{
    [Fact]
    public void GetProductDetails_ShouldReturnProduct_WhenProductExists()
    {
        // Arrange
        var productId = 1;
        var expectedProduct = new Product { Id = productId, Name = "Test Product" };

        // Create a mock of the dependency (IProductRepository)
        var mockRepository = new Mock<IProductRepository>();

        // Configure the mock: When GetById is called with productId, return expectedProduct
        mockRepository.Setup(repo => repo.GetById(productId))
                      .Returns(expectedProduct);

        // Create an instance of the service (the Unit Under Test), injecting the mock
        var productService = new ProductService(mockRepository.Object);

        // Act
        var result = productService.GetProductDetails(productId);

        // Assert
        // Verify that the service returned the expected product
        Assert.NotNull(result);
        Assert.Equal(expectedProduct.Id, result.Id);
        Assert.Equal(expectedProduct.Name, result.Name);

        // Verify that the GetById method on the mock was called exactly once with the correct ID
        mockRepository.Verify(repo => repo.GetById(productId), Times.Once);
    }

    [Fact]
    public void GetProductDetails_ShouldReturnNull_WhenProductDoesNotExist()
    {
        // Arrange
        var productId = 99;
        var mockRepository = new Mock<IProductRepository>();

        // Configure the mock: When GetById is called, return null
        mockRepository.Setup(repo => repo.GetById(It.IsAny<int>()))
                      .Returns((Product)null); // Explicitly cast to Product

        var productService = new ProductService(mockRepository.Object);

        // Act
        var result = productService.GetProductDetails(productId);

        // Assert
        Assert.Null(result);
        mockRepository.Verify(repo => repo.GetById(productId), Times.Once);
    }

    [Fact]
    public void GetProductDetails_ShouldThrowArgumentException_WhenProductIdIsInvalid()
    {
        // Arrange
        var productId = 0; // Invalid ID
        var mockRepository = new Mock<IProductRepository>(); // Mock is still needed for constructor
        var productService = new ProductService(mockRepository.Object);

        // Act & Assert
        // Use Assert.Throws to verify that an exception is thrown
        Assert.Throws<ArgumentException>(
            () => productService.GetProductDetails(productId)
        );

        // Verify that the repository method was NOT called
        mockRepository.Verify(repo => repo.GetById(It.IsAny<int>()), Times.Never);
    }
}
```

#### Explanation

1.  **Isolation**: The `ProductService` is the "unit under test." Its dependency, `IProductRepository`, is replaced by a **mock object** created by Moq (`mockRepository.Object`). This means our test for `ProductService` does not actually interact with a real database. It only verifies that `ProductService` behaves correctly based on what it *expects* from its `IProductRepository`.
2.  **`mockRepository.Setup(...)`**: This line tells the mock what to do when a specific method is called on it. For example, `mockRepository.Setup(repo => repo.GetById(productId)).Returns(expectedProduct);` means "When `GetById` is called with `productId`, return `expectedProduct`."
3.  **`mockRepository.Verify(...)`**: This line is crucial for verifying interactions. It asserts that a specific method on the mock was called (or not called) a certain number of times. This helps ensure that our `ProductService` is interacting with its dependencies as expected.
4.  **Speed**: Because no real database calls are made, these tests run extremely fast, allowing for quick feedback during development.