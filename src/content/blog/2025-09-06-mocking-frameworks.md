---
title: "Mocking Frameworks (Moq, NSubstitute)"
description: "Demonstrate how to use a mocking library to isolate dependencies in unit tests."
pubDate: "Sep 06 2025"
published: true
tags: ["Testing", "Unit Testing", "Mocking"]
---

### Mind Map Summary

- **Topic**: Mocking Frameworks (Moq, NSubstitute)
- **Definition**: Tools that allow you to create mock objects (test doubles) to simulate the behavior of real dependencies in unit tests, isolating the "unit under test."
- **Key Concepts**:
    - **Isolation**: Testing a single component without its real dependencies.
    - **Mocks**: Objects that record calls made to them and allow verification of interactions.
    - **Stubs**: Objects that provide predefined answers to method calls during tests.
    - **Fakes**: Simplified working implementations of a dependency (e.g., in-memory database).
    - **Spies**: Partial mocks that allow calling real methods while also tracking interactions.
- **Benefits (Pros)**:
    - **True Unit Testing**: Ensures tests focus solely on the logic of the component being tested, not its dependencies.
    - **Faster Test Execution**: Mocks are in-memory, avoiding slow I/O operations (database, network).
    - **Easier to Test Complex Logic**: Simplifies testing scenarios involving external services, databases, or complex objects.
    - **Facilitates Test-Driven Development (TDD)**: Allows writing tests for components before their dependencies are fully implemented.
    - **Reproducible Tests**: Eliminates external factors that could make tests flaky.
- **Challenges (Cons)**:
    - **Over-Mocking**: Can lead to brittle tests that break easily when refactoring, even if the underlying logic is correct.
    - **Can Hide Integration Issues**: Tests might pass, but real components might not integrate correctly.
    - **Learning Curve**: Advanced mocking scenarios can be complex to set up and understand.
    - **Maintenance Overhead**: Mocks need to be updated if the interfaces of dependencies change.
- **Common Frameworks**: Moq (most popular for C#), NSubstitute, FakeItEasy.
- **Practical Use**:
    - Setting up specific return values for method calls.
    - Throwing exceptions when certain conditions are met.
    - Verifying that methods on dependencies were called (or not called) a specific number of times with specific arguments.

### Core Concepts

Mocking frameworks are essential tools in modern unit testing, particularly in languages like C# where dependency injection is prevalent. They enable developers to create "test doubles" – objects that mimic the behavior of real dependencies. This isolation is crucial for unit tests, as it ensures that a test failure points directly to a bug in the "unit under test" rather than in one of its dependencies.

**Moq** and **NSubstitute** are two of the most popular mocking frameworks for .NET. They provide intuitive APIs for:

1.  **Setting up Behavior**: Defining what a mocked method or property should return when called.
2.  **Verifying Interactions**: Asserting that a method on a mock was called with specific arguments, or a certain number of times.

### Practice Exercise

Given a service class that has a dependency on a repository interface (`IProductRepository`), demonstrate how to use Moq to:
1.  Set up a mock `IProductRepository` to return a specific product when its `GetById` method is called with a certain ID.
2.  In a separate test, configure the mock to throw an exception when `GetById` is called.
3.  Verify the behavior in both tests.

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
        if (productId <= 0) throw new ArgumentException("Product ID must be positive.");

        var product = _productRepository.GetById(productId);

        if (product == null)
        {
            return null;
        }
        return product;
    }
}
```

#### 2. The Unit Test (`ProductServiceTests.cs`)

First, ensure you have Moq and a testing framework (like XUnit) installed:
`dotnet add package Moq`
`dotnet add package Xunit`
`dotnet add package Xunit.runner.visualstudio`

```csharp
using Moq;
using Xunit;
using System;

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
    public void GetProductDetails_ShouldThrowException_WhenRepositoryThrows()
    {
        // Arrange
        var productId = 1;
        var mockRepository = new Mock<IProductRepository>();

        // Configure the mock: When GetById is called, throw an exception
        mockRepository.Setup(repo => repo.GetById(productId))
                      .Throws(new InvalidOperationException("Database connection failed."));

        var productService = new ProductService(mockRepository.Object);

        // Act & Assert
        // Verify that an InvalidOperationException is thrown when GetProductDetails is called
        var exception = Assert.Throws<InvalidOperationException>(
            () => productService.GetProductDetails(productId)
        );

        Assert.Equal("Database connection failed.", exception.Message);

        // Verify that the GetById method on the mock was called exactly once
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

1.  **`Mock<IProductRepository>()`**: Creates a mock object that implements `IProductRepository`. This mock will stand in for the real repository during the test.
2.  **`mockRepository.Setup(repo => repo.GetById(productId)).Returns(expectedProduct);`**: This line defines the behavior of the mock. When the `GetById` method is called on the mock with the specified `productId`, it will return `expectedProduct`.
3.  **`mockRepository.Setup(repo => repo.GetById(productId)).Throws(new InvalidOperationException(...));`**: This demonstrates how to configure the mock to throw an exception when a specific method is called.
4.  **`mockRepository.Verify(repo => repo.GetById(productId), Times.Once);`**: This is a crucial assertion. It verifies that the `GetById` method on the mock was called exactly once with the `productId` argument. This ensures that our `ProductService` correctly interacted with its dependency.
5.  **`It.IsAny<int>()`**: Used when you don't care about the specific argument value passed to a mocked method.
6.  **`Times.Never`**: Used to verify that a method was *not* called.

This approach ensures that your unit tests are fast, reliable, and truly isolate the code you are testing.