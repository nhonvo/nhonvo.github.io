---
title: "Mocking Frameworks (Moq & NSubstitute)"
description: "Compare common mocking frameworks in .NET and how to use them for isolation in unit tests."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Testing",
    "Unit Testing",
    "Mocking",
    "Moq",
    "NSubstitute",
    "Isolation",
    "TDD",
    "Software Testing",
  ]
---

## Mind Map Summary

- **Mocking Frameworks**
  - **Definition**: Tools to create "test doubles" that simulate real dependency behavior, isolating the code being tested.
  - **Key Terminology**
    - **Mocks**: Objects that record calls and allow interaction verification.
    - **Stubs**: Objects providing predefined answers to calls.
    - **Fakes**: Working but simplified implementations (e.g., in-memory DB).
- **Benefits and Challenges**
  - **Pros**: True isolation, lightning-fast execution (no I/O), easy testing of edge cases (errors), and reproducible results.
  - **Cons**: Over-mocking leads to brittle tests, can hide integration bugs, and requires maintenance as interfaces change.

## Core Concepts

Mocking frameworks are essential in modern .NET development. They enable developers to create objects that mimic real-world dependencies like databases or external APIs. This isolation ensures that if a test fails, it's because of the logic in the current class, not because a remote server is down.

**Moq** and **NSubstitute** are the industry leaders. They allow you to:

1. **Setup Behavior**: "When I call `GetById(5)`, return this specific object."
2. **Verify Interactions**: "Did the service actually call `Save()` when it was done?"

## Practice Exercise

Given a service class with an `IProductRepository` dependency, use Moq to:

1. Return a specific product when `GetById` is called.
2. Throw an exception when the ID is invalid.
3. Verify the interactions.

## Answer (Mocking implementation in C#)

### 1. The Code Under Test

```csharp
public interface IProductRepository {
    Product GetById(int id);
}

public class ProductService(IProductRepository repo) {
    public Product GetDetails(int id) {
        if (id <= 0) throw new ArgumentException("Invalid ID");
        return repo.GetById(id) ?? throw new Exception("Not found");
    }
}
```

### 2. The Unit Test (Moq & xUnit)

```csharp
public class ProductServiceTests {
    [Fact]
    public void GetDetails_ValidId_ReturnsProduct() {
        // Arrange
        var mockRepo = new Mock<IProductRepository>();
        var expected = new Product { Id = 1, Name = "Laptop" };

        mockRepo.Setup(r => r.GetById(1)).Returns(expected);
        var service = new ProductService(mockRepo.Object);

        // Act
        var result = service.GetDetails(1);

        // Assert
        Assert.Equal("Laptop", result.Name);
        mockRepo.Verify(r => r.GetById(1), Times.Once);
    }

    [Fact]
    public void GetDetails_InvalidId_ThrowsArgumentException() {
        // Arrange
        var mockRepo = new Mock<IProductRepository>();
        var service = new ProductService(mockRepo.Object);

        // Act & Assert
        Assert.Throws<ArgumentException>(() => service.GetDetails(0));

        // Ensure the repo was NOT called
        mockRepo.Verify(r => r.GetById(It.IsAny<int>()), Times.Never);
    }
}
```

### Key Takeaways

1. **`mockRepo.Object`**: This is how you retrieve the actual implementation of the interface that Moq generated for you.
2. **`Verify`**: Don't just check the return value. Use `Verify` to ensure your service is using its dependencies as intended (e.g., not calling the database unnecessarily).
3. **`It.IsAny<int>()`**: A powerful "matcher" that allows you to setup or verify behavior regardless of the specific input value.
4. **Mocking vs. Faking**: Use Mocks for verifying interactions; use Fakes (like an in-memory database) when you need to test rich, data-driven logic that spans multiple methods.
