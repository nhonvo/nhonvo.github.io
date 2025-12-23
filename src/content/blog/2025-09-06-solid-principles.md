---
title: "SOLID Principles in .NET"
description: "Deep dive into the SOLID principles and how they help in writing maintainable and testable C# code."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "SOLID",
    "Design Patterns",
    "Clean Code",
    "Maintainability",
    "Unit Testing",
  ]
---

### Mind Map Summary

- **S.O.L.I.D.** - Five foundational principles of object-oriented design for creating understandable, maintainable, and flexible software.
  - **S - Single Responsibility Principle (SRP)**
    - **Core Idea**: A class should have only one reason to change.
    - **Goal**: High cohesion. Keep related logic together and separate unrelated logic.
  - **O - Open/Closed Principle (OCP)**
    - **Core Idea**: Software entities (classes, modules) should be open for extension, but closed for modification.
    - **Goal**: Add new functionality without changing existing, tested code. Typically achieved with interfaces and polymorphism.
  - **L - Liskov Substitution Principle (LSP)**
    - **Core Idea**: Subtypes must be substitutable for their base types without breaking the program.
    - **Goal**: Ensure inheritance hierarchies are logically correct. A subclass should not behave in a surprising way.
  - **I - Interface Segregation Principle (ISP)**
    - **Core Idea**: Clients should not be forced to depend on interfaces they do not use.
    - **Goal**: Prefer many small, specific interfaces over one large, general-purpose interface.
  - **D - Dependency Inversion Principle (DIP)**
    - **Core Idea**: High-level modules should not depend on low-level modules. Both should depend on abstractions (e.g., interfaces).
    - **Goal**: Decoupling. Enables dependency injection and makes code more modular and testable.

### Core Concepts

#### S - Single Responsibility Principle (SRP)

A class should be responsible for one, and only one, piece of functionality. If a class is responsible for both fetching data from a database AND formatting it for a UI, it violates SRP. Why? Because a change to the database logic could break the formatting logic, and a change to the formatting could break the database logic. These are two separate concerns (reasons to change) and should be in separate classes.

#### O - Open/Closed Principle (OCP)

Your code should be extensible without requiring modification. Imagine you have a `CalculateBonus` method that has a `switch` statement based on employee type. To add a new employee type, you have to modify this existing method, which is risky. The OCP way is to have a base `Employee` class with a virtual `CalculateBonus` method, and each employee subtype (`Manager`, `Developer`) overrides it. To add a new `Intern` type, you just add a new class; the original calculation logic remains untouched (closed for modification) while the system is open to extension.

#### L - Liskov Substitution Principle (LSP)

This is a core principle that makes polymorphism reliable. It states that if you have a function that accepts a base class `Vehicle`, it should be able to accept any subclass of `Vehicle` (like `Car` or `Truck`) without knowing the difference and without anything breaking. If you have a `Bird` class with a `Fly()` method, and you create a `Penguin` subclass that throws a `NotSupportedException` from `Fly()`, you have violated LSP, because a `Penguin` is not a valid substitute for a `Bird` in a context that expects it to fly.

#### I - Interface Segregation Principle (ISP)

This principle is about keeping interfaces lean and focused. Don't create a single, large `IWorker` interface with methods for `Work()`, `Eat()`, and `Sleep()`. A `RobotWorker` might be able to `Work()`, but it doesn't `Eat()` or `Sleep()`. Forcing the `RobotWorker` class to implement these irrelevant methods is a violation of ISP. The solution is to segregate the interface into smaller, more specific ones: `IWorkable`, `IEatable`, `ISleepable`.

#### D - Dependency Inversion Principle (DIP)

This is the heart of decoupled, modern application architecture. It states that classes should depend on abstractions (interfaces), not on concrete implementations. A high-level `ReportGenerator` class should not `new up` a concrete `DatabaseRepository` class. This creates a tight coupling. Instead, the `ReportGenerator` should depend on an `IRepository` interface. The concrete `DatabaseRepository` can then be "injected" at runtime. This inverts the dependency; the high-level module no longer depends on the low-level one. This makes the system easy to test (you can inject a mock repository) and maintain.

### Practice Exercise

Given a C# class that violates at least two SOLID principles (e.g., a `Report` class that both queries the database and formats the output), refactor it into multiple classes that adhere to the Single Responsibility Principle and the Dependency Inversion Principle.

### Answer

#### The "Bad" Code (Violates SRP and DIP)

```csharp
// This class has TWO responsibilities: data access and report formatting.
// It also depends directly on a concrete low-level class (SqlRepository).
public class BadReportGenerator
{
    public string GenerateReport(int reportId)
    {
        // 1. Data Access Logic (Responsibility 1)
        var repository = new SqlRepository(); // <-- DIP Violation!
        var data = repository.GetReportData(reportId);

        // 2. Formatting Logic (Responsibility 2)
        var reportContent = "---"
        reportContent += "REPORT ---"
        reportContent += $"Data: {data}"
        reportContent += "---"
        reportContent += "END ---"

        return reportContent;
    }
}

// A concrete low-level data access class
public class SqlRepository
{
    public string GetReportData(int id) => $"Data for report {id} from SQL";
}
```

#### The "Good" Refactored Code (Adheres to SRP and DIP)

**1. Define Abstractions (Interfaces)**

```csharp
// Abstraction for data access
public interface IReportRepository
{
    string GetReportData(int reportId);
}

// Abstraction for formatting
public interface IReportFormatter
{
    string Format(string data);
}
```

**2. Create Concrete Implementations (Separated Responsibilities)**

```csharp
// Implementation for data access (SRP)
public class ReportSqlRepository : IReportRepository
{
    public string GetReportData(int reportId) => $"Data for report {reportId} from SQL";
}

// Implementation for formatting (SRP)
public class PlainTextReportFormatter : IReportFormatter
{
    public string Format(string data)
    {
        var reportContent = "---"
        reportContent += "REPORT ---"
        reportContent += $"Data: {data}"
        reportContent += "---"
        reportContent += "END ---"
        return reportContent;
    }
}
```

**3. The High-Level Class Now Depends on Abstractions**

```csharp
// This class now has only ONE responsibility: coordinating the generation.
// It depends only on INTERFACES, not concrete classes (DIP).
public class GoodReportGenerator
{
    private readonly IReportRepository _repository;
    private readonly IReportFormatter _formatter;

    // Dependencies are "injected" via the constructor
    public GoodReportGenerator(IReportRepository repository, IReportFormatter formatter)
    {
        _repository = repository;
        _formatter = formatter;
    }

    public string GenerateReport(int reportId)
    {
        var data = _repository.GetReportData(reportId);
        var formattedReport = _formatter.Format(data);
        return formattedReport;
    }
}
```

#### Explanation of the Refactoring

1.  **Single Responsibility Principle (SRP)**: We split the original `BadReportGenerator` into three distinct classes, each with a single responsibility:

    - `ReportSqlRepository`: Its only job is to get data from SQL.
    - `PlainTextReportFormatter`: Its only job is to format data as plain text.
    - `GoodReportGenerator`: Its only job is to orchestrate the process by calling the repository and then the formatter.

2.  **Dependency Inversion Principle (DIP)**: The high-level `GoodReportGenerator` no longer knows anything about `SqlRepository`. It only knows about the `IReportRepository` and `IReportFormatter` interfaces. This is a dependency inversion. We can now easily swap out the implementations. For example, we could create a `JsonReportFormatter` or a `MongoDbReportRepository` and "inject" them into the `GoodReportGenerator` without changing a single line of its code, fully adhering to the Open/Closed principle as well.
