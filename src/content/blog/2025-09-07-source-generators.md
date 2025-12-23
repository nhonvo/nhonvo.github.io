---
title: "Source Generators in C#"
description: "Master compile-time metaprogramming. Learn how Source Generators reduce boilerplate and eliminate reflection overhead in modern .NET applications."
pubDate: "9 7 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Source Generators",
    "Roslyn",
    "Performance Tuning",
    "Metaprogramming",
    "Backend Development",
    "Architecture",
  ]
---

## What are Source Generators?

Introduced in C# 9, **Source Generators** are a powerful compiler feature that allows developers to inspect user code and generate new C# source files on-the-fly during compilation.

Unlike standard code analyzers that only report warnings, Source Generators actually **add code** to your project. This happens entirely at compile-time, meaning there is zero runtime overhead.

---

## Why Use Source Generators?

1.  **Boilerplate Reduction**: Automate the implementation of `INotifyPropertyChanged`, `ToString()`, or DTO mappers.
2.  **Performance Tuning**: Replace slow runtime reflection (e.g., JSON serialization or DI container lookups) with high-speed, compiled C# logic.
3.  **Type Safety**: Create strongly-typed wrappers for configuration files, resources (Resx), or database schemas.

---

## How It Works: The Roslyn Pipeline

1.  **Parse**: The compiler creates a **Syntax Tree** of your code.
2.  **Initialize**: Your generator registers for specific syntax patterns (e.g., classes with a specific attribute).
3.  **Execute**: Your generator analyzes the code using the **Semantic Model** and emits new strings of C# code.
4.  **Emit**: The compiler compiles both your original code and the generated code into the final assembly.

---

## Practice Exercise

Identify a scenario where a Source Generator would be superior to a **Reflection-based** approach. Implement a conceptual generator that automates `ToString()` for a class.

---

## Answer

### Benefit: Reflection vs. Source Generators

- **Reflection**: Inspects types at **Runtime**. It is slow, uses more memory, and makes the application start time longer.
- **Source Generator**: Inspects types at **Compile-time**. It creates standard C# code that runs as fast as if you had written it manually.

### Conceptual Implementation

```csharp
[Generator]
public class SimpleToStringGenerator : ISourceGenerator
{
    public void Execute(GeneratorExecutionContext context)
    {
        // 1. Find classes decorated with [AutoToString]
        // 2. Extract their public properties
        // 3. Generate the following C# code string:

        string code = @"
        namespace MyGeneratedNamespace {
            public partial class User {
                public override string ToString() => $""Name: {Name}, Age: {Age}"";
            }
        }";

        // 4. Inject it into the compilation
        context.AddSource("User_ToString.g.cs", code);
    }

    public void Initialize(GeneratorInitializationContext context) { }
}
```

### Why This Architecture Works

1.  **Maintainability**: You never have to remember to update `ToString()` when you add a new property to your `User` class. The generator does it for you.
2.  **Zero Overhead**: Because the generated code is just a standard `partial class` method, the JIT compiler optimizes it perfectly. No more iterating through property lists using reflection at runtime.
3.  **IDE Integration**: Since the code is generated during the build, IntelliSense actually "sees" and suggests the generated methods while you are typing!

## Summary

Source Generators are the "Modern Way" to handle repetitive code in .NET. By shifting logic from runtime to compile-time, you build applications that are faster, safer, and cleaner. If you find yourself using reflection for repetitive tasks, it's time to consider a **Source Generator**.
