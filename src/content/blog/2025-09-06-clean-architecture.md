---
title: "Clean Architecture in .NET"
description: "Explain the principles of Clean Architecture and how to implement it using the Onion or Hexagonal pattern."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Architecture",
    "Clean Architecture",
    "SOLID",
    "Design Patterns",
    "Domain Driven Design",
    "Onion Architecture",
    "Hexagonal Architecture",
    "Maintainability",
  ]
---

## Mind Map Summary

- **Topic**: Clean Architecture
- **Definition**: A software architectural pattern proposed by Robert C. Martin (Uncle Bob) that emphasizes the separation of concerns by organizing code into concentric layers, with dependencies always pointing inwards. The core idea is to keep business rules independent of frameworks, databases, UI, and other external concerns. It's a generalization of several similar architectures like Hexagonal Architecture (Ports and Adapters), Onion Architecture, and Screaming Architecture.
- **Key Concepts**:
  - **The Dependency Rule**: The most crucial rule. Dependencies can only point inwards. Inner circles contain business rules, and outer circles contain implementation details. Code in an outer circle can depend on code in an inner circle, but not the other way around. This ensures that changes in external details (like the database or UI framework) do not affect the core business logic.
  - **Concentric Layers (Circles)**:
    - **1. Entities (Innermost Circle)**:
      - **What**: Encapsulate Enterprise-wide business rules. These are the most general and high-level rules. They are plain objects (POCOs/POJOs) that contain critical business data and behavior.
      - **Independence**: Independent of any application, database, or UI.
    - **2. Use Cases (Application Business Rules)**:
      - **What**: Contain application-specific business rules. They orchestrate the flow of data to and from the Entities, and direct the Entities to achieve the Use Case's goal. They define the application's behavior.
      - **Independence**: Independent of UI, database, or external services.
    - **3. Interface Adapters**:
      - **What**: Convert data from the format most convenient for the Use Cases and Entities into the format most convenient for some external agency (e.g., UI, database, web services). This layer includes controllers, presenters, gateways, and data access implementations.
      - **Independence**: Independent of frameworks, but adapts to them.
    - **4. Frameworks & Drivers (Outermost Circle)**:
      - **What**: The outermost layer, composed of frameworks and tools like the Web framework (ASP.NET Core, Spring MVC), database (SQL Server, MongoDB), UI (React, Angular), and other external devices. This layer contains the "details."
      - **Independence**: None, it depends on everything else.
  - **Separation of Concerns**: Each layer has a distinct and well-defined responsibility, leading to a highly modular and organized codebase.
  - **Testability**: The core business logic (Entities and Use Cases) is isolated from external dependencies, making it highly testable with simple unit tests.
  - **Framework Independence**: Business rules are not tied to specific web frameworks, allowing them to be swapped out easily.
  - **Database Independence**: Business rules are not tied to specific databases, enabling database changes without affecting core logic.
  - **UI Independence**: Business rules are not tied to specific user interfaces.
- **Benefits (Pros)**:
  - **High Testability**: The core business logic is pure, isolated, and easily testable, leading to more robust applications.
  - **Maintainability**: Changes in external details (e.g., switching databases, updating UI framework) have minimal impact on the core business rules.
  - **Flexibility & Adaptability**: Easy to swap out external dependencies (UI, database, web frameworks) or add new ones.
  - **Scalability**: Clear separation of concerns can aid in scaling different parts of the application independently.
  - **Long-term Viability**: The architecture is resilient to technological changes, ensuring the core business value remains intact over time.
  - **Clear Structure**: Provides a well-defined structure that is easy for new team members to understand.
- **Challenges (Cons)**:
  - **Increased Initial Complexity/Boilerplate**: More upfront design, more projects/files, and more interfaces are required, which can feel like over-engineering for simple applications.
  - **Steep Learning Curve**: Requires a good understanding of architectural principles, SOLID, and dependency inversion.
  - **Navigation Overhead**: Can sometimes be harder to navigate a project with many small files and projects.
  - **Over-Engineering Risk**: Applying Clean Architecture to a trivial application can introduce unnecessary complexity.
  - **Performance Overhead (Minor)**: The layers introduce some indirection, which can have a negligible performance impact in most cases.
- **Practical Use**:
  - Large, complex, and long-lived enterprise applications where maintainability, testability, and flexibility are paramount.
  - Applications with evolving business rules and frequent changes in external technologies.
  - Projects where multiple teams work on different parts of the system.

## Core Concepts

The **Dependency Rule** is the heart of Clean Architecture. It dictates that source code dependencies can only point inwards. This is achieved primarily through the **Dependency Inversion Principle (DIP)**, where high-level modules (like Use Cases) define interfaces (abstractions) that low-level modules (like database implementations) must implement. The outer layers implement these interfaces, and the dependency injection container wires them up at runtime. This inversion of control ensures that the core business logic remains untainted by external concerns.

## Practice Exercise

Refactor a traditional N-tier application (UI -> Business Logic -> Data Access) into a Clean Architecture structure, with clearly defined layers for Domain, Application, Infrastructure, and Presentation.

## Answer (Refactoring N-Tier to Clean Architecture - Conceptual)

Let's consider a simple "Product Management" application.

### Traditional N-Tier Structure (Conceptual)

```text
+---------------------+
| Presentation Layer  | (e.g., ASP.NET MVC/Web Forms, React App)
| - ProductController |
+----------|----------+
           |
           v
+---------------------+
| Business Logic Layer| (e.g., ProductService)
| - GetProduct(id)    |
| - AddProduct(dto)   |
+----------|----------+
           |
           v
+---------------------+
| Data Access Layer   | (e.g., ProductRepository)
| - GetById(id)       |
| - Save(product)     |
+---------------------+
```

**Problem**: The Business Logic Layer directly depends on the Data Access Layer. If you change the ORM or database, the Business Logic Layer might need changes. The Presentation Layer depends on the Business Logic Layer.

### Clean Architecture Structure (Conceptual Project/Folder Structure)

We'll typically organize this into separate projects (or folders in a smaller solution) to enforce the dependency rule.

```text
Solution
├── src
│   ├── Core (or Domain)
│   │   ├── Entities
│   │   │   └── Product.cs (Plain C# object, business rules)
│   │   ├── Interfaces (or Abstractions)
│   │   │   └── IProductRepository.cs (Interface for data access)
│   │   │   └── IProductService.cs (Interface for application services)
│   │   └── Exceptions (Custom domain exceptions)
│   │
│   ├── Application (or UseCases)
│   │   ├── UseCases
│   │   │   └── GetProductByIdQuery.cs (Input/Output DTOs for use case)
│   │   │   └── GetProductByIdQueryHandler.cs (Implements IProductService, orchestrates entities)
│   │   ├── Commands
│   │   │   └── AddProductCommand.cs
│   │   │   └── AddProductCommandHandler.cs
│   │   ├── DTOs (Data Transfer Objects for input/output of use cases)
│   │   └── Validators (e.g., using FluentValidation)
│   │
│   ├── Infrastructure (or Persistence/External)
│   │   ├── Persistence
│   │   │   └── ProductRepository.cs (Implements IProductRepository, uses EF Core/Dapper)
│   │   ├── ExternalServices (e.g., EmailService, PaymentGateway)
│   │   └── DependencyInjection (Extension methods for configuring DI)
│   │
│   └── Presentation (or WebApi/UI)
│       ├── Controllers
│       │   └── ProductsController.cs (Uses IProductService/Use Case Handlers)
│       ├── Startup.cs (Configures DI, wires up layers)
│       ├── Program.cs
│       └── appsettings.json
│
└── tests
    ├── Core.Tests
    ├── Application.Tests
    └── Integration.Tests
```

### Refactoring Steps & Explanation

1. **Identify Core Business Rules (Entities)**:

   - Move `Product.cs` (and any other core business objects) into the `Core/Entities` project. These should be plain C# objects with no dependencies on external frameworks or databases. They might contain validation logic or business methods.

2. **Define Application Business Rules (Use Cases)**:

   - Create `Application` project.
   - Define interfaces for your application services (e.g., `IProductService` or specific query/command handlers like `IRequestHandler<GetProductByIdQuery, ProductDto>`). Place these interfaces in `Core/Interfaces` or `Application/Interfaces`.
   - Implement the application services/handlers in the `Application` project. These classes will depend on the `Core` project (Entities and Interfaces) but _not_ on `Infrastructure` or `Presentation`.

3. **Abstract External Dependencies (Interfaces in Core)**:

   - For any external dependency (like data access), define an interface in the `Core/Interfaces` project (e.g., `IProductRepository`). This interface represents a "port" that the `Application` layer needs.

4. **Implement External Dependencies (Infrastructure)**:

   - Create `Infrastructure` project.
   - Implement the interfaces defined in `Core/Interfaces` (e.g., `ProductRepository` implementing `IProductRepository`). This is where you'll use Entity Framework Core, Dapper, or any other data access technology. This project depends on `Core` but _not_ on `Application` or `Presentation`.

5. **Wire Up the Application (Presentation)**:
   - Create `Presentation` project (e.g., ASP.NET Core Web API).
   - This project depends on `Application` and `Infrastructure`.
   - In `Startup.cs` (or `Program.cs`), use a Dependency Injection container to register the concrete implementations from `Infrastructure` (e.g., `ProductRepository`) against their interfaces defined in `Core` (e.g., `IProductRepository`).
   - Controllers in the `Presentation` layer will depend on the interfaces from the `Application` layer (e.g., `IProductService` or `IRequestHandler`).

**Dependency Flow (Enforced by Project References):**

- `Presentation` -> `Application`
- `Presentation` -> `Infrastructure`
- `Application` -> `Core`
- `Infrastructure` -> `Core`
- `Core` (no outgoing dependencies)

### Benefits of this Refactoring

- **Testability**: `Core` and `Application` projects contain pure business logic, easily unit tested without needing a database or web server.
- **Maintainability**: If you decide to switch from SQL Server to MongoDB, only the `Infrastructure/Persistence` project needs to change. The `Application` and `Core` layers remain untouched.
- **Flexibility**: You could easily add a new UI (e.g., a Desktop app) by creating a new `Presentation` project that reuses the `Application` and `Core` logic.
- **Separation of Concerns**: Each project has a clear, single responsibility.

This refactoring transforms a tightly coupled N-tier application into a more flexible, testable, and maintainable system aligned with Clean Architecture principles.
