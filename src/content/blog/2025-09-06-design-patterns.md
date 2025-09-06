---
title: "Design Patterns (Repository, Unit of Work, Factory, Singleton, Strategy, Decorator)"
description: "Describe the problem each pattern solves and how to implement it."
pubDate: "Sep 06 2025"
published: true
tags: ["Software Design & Architecture"]
---

### Mind Map Summary

- **Design Patterns**: Reusable solutions to commonly occurring problems within a given context in software design.
  - **Creational Patterns** (Concerned with object creation)
    - **Factory Method**: Defines an interface for creating an object, but lets subclasses decide which class to instantiate. Promotes loose coupling.
    - **Singleton**: Ensures a class has only one instance and provides a global point of access to it. Use with caution.
  - **Structural Patterns** (Concerned with object composition)
    - **Repository**: Mediates between the domain and data mapping layers. Provides a collection-like interface for accessing domain objects, abstracting away the data store.
    - **Decorator**: Attaches additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing for extending functionality.
  - **Behavioral Patterns** (Concerned with object interaction and communication)
    - **Strategy**: Defines a family of algorithms, encapsulates each one, and makes them interchangeable. Lets the algorithm vary independently from the clients that use it.
    - **Unit of Work**: Maintains a list of objects affected by a business transaction and coordinates the writing of changes and the resolution of concurrency problems. In EF Core, the `DbContext` acts as a Unit of Work.

### Core Concepts

#### Creational Patterns
- **Factory Method**: Use when a class cannot anticipate the class of objects it must create. The Factory Method lets a class defer instantiation to subclasses. For example, a `Document` base class might have a factory method `CreatePage()`, which `ReportDocument` and `ResumeDocument` subclasses override to create `ReportPage` and `ResumePage` objects, respectively.
- **Singleton**: Use when exactly one instance of a class must exist (e.g., a logging service, a configuration manager). It involves a private constructor and a static property to get the single instance. While simple, it can be an anti-pattern in modern DI-centric applications, as it creates a global state. Registering a service with a "Singleton" lifetime in a DI container achieves the same goal in a more testable way.

#### Structural Patterns
- **Repository**: This pattern is central to modern application architecture. It isolates the business logic from the details of the data access mechanism. Your service layer code calls methods like `_userRepository.GetById(1)` or `_productRepository.Add(product)` without knowing or caring if the underlying data store is SQL Server, PostgreSQL, or an in-memory list for testing.
- **Decorator**: This pattern allows you to add new functionality to an object without altering its class. You create a decorator class that "wraps" the original object. The decorator has the same interface as the object it wraps, so it can be used in its place. When a method is called on the decorator, it can add its own behavior before or after delegating the call to the wrapped object. For example, you could have a `CachingRepositoryDecorator` that wraps a `SqlRepository` to add caching logic.

#### Behavioral Patterns
- **Strategy**: This pattern is used when you have multiple algorithms for a specific task and the client needs to select one at runtime. You define an interface for the algorithm (the "strategy") and create concrete classes for each implementation. The client class holds a reference to a strategy object and can be configured with any of the concrete strategies. This avoids complex `if/else` or `switch` statements.
- **Unit of Work**: This pattern manages the state of a business transaction. When you perform a series of operations (e.g., add a new `Order`, update the `Product` inventory, and create a `Shipment`), you want them all to either succeed or fail as a single atomic unit. The Unit of Work tracks all these changes in memory. When you call `Commit()`, it writes all the changes to the database within a single transaction. In Entity Framework Core, the `DbContext` class is a built-in implementation of the Unit of Work pattern. `SaveChanges()` is the `Commit()` method.

### Practice Exercise

Implement the **Strategy** pattern. Create an `IExportService` interface with a method `Export(data)`. Create two concrete implementations: `CsvExportService` and `JsonExportService`. Create a context class that can be configured with one of these strategies at runtime to perform the export.

### Answer

#### Code Example

**1. Define the Strategy Interface**

```csharp
// The Strategy interface declares the operation common to all supported versions.
public interface IExportService
{
    void Export(object data);
}
```

**2. Create Concrete Strategy Implementations**

```csharp
// Implements the algorithm using the CSV format.
public class CsvExportService : IExportService
{
    public void Export(object data)
    {
        Console.WriteLine("Exporting data to a CSV file...");
        // In a real app, add logic to serialize to CSV.
    }
}

// Implements the algorithm using the JSON format.
public class JsonExportService : IExportService
{
    public void Export(object data)
    {
        Console.WriteLine("Exporting data to a JSON file...");
        // In a real app, add logic to serialize to JSON.
    }
}
```

**3. Create the Context Class**

The Context maintains a reference to a Strategy object and delegates the work to it.

```csharp
public class ReportExporterContext
{
    private IExportService _exportService;

    // The context can be initialized with a default strategy.
    public ReportExporterContext(IExportService exportService)
    {
        _exportService = exportService;
    }

    // It also allows the strategy to be changed at runtime.
    public void SetStrategy(IExportService exportService)
    {
        _exportService = exportService;
    }

    public void ExportReport(object reportData)
    {
        // The context delegates the actual work to the strategy object.
        _exportService.Export(reportData);
    }
}
```

**4. Client Code (Demonstrating the Usage)**

```csharp
public class Client
{
    public void RunExport()
    {
        var someData = new { Id = 1, Name = "Sample Report" };

        // The client chooses the CSV strategy first.
        var exporter = new ReportExporterContext(new CsvExportService());
        Console.WriteLine("Client: Exporting report using CSV strategy.");
        exporter.ExportReport(someData);

        Console.WriteLine();

        // The client can easily change the strategy at runtime.
        Console.WriteLine("Client: Changing strategy to JSON.");
        exporter.SetStrategy(new JsonExportService());
        exporter.ExportReport(someData);
    }
}
```

#### Explanation

This implementation perfectly demonstrates the Strategy pattern:

1.  **Family of Algorithms**: We have a family of export algorithms (`CsvExportService`, `JsonExportService`).
2.  **Encapsulation**: Each algorithm is encapsulated in its own class.
3.  **Interchangeable**: The `ReportExporterContext` can work with any class that implements the `IExportService` interface. The client code can select the desired export format at runtime and pass it to the context, or even change it on the fly.

This approach is highly flexible and adheres to the Open/Closed Principle. If we need to add a new export format (e.g., XML), we simply create a new `XmlExportService` class. We don't have to modify the `ReportExporterContext` or any of the existing strategy classes.