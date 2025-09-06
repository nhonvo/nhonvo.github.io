---
title: "Source Generators"
description: "Explain what C# Source Generators are and how they can be used for compile-time metaprogramming to reduce boilerplate and improve performance."
pubDate: "Sep 07 2025"
published: true
tags: [".NET & C# Advanced", "C#", "Code Generation", "Roslyn", "Performance"]
---

### Mind Map Summary

- **Topic**: Source Generators
- **Definition**: C# Source Generators are a powerful feature introduced in C# 9 (part of .NET 5) that allows developers to inspect user code and generate new C# source files during the compilation process. These newly generated files are then compiled alongside the rest of the project, effectively extending the compilers capabilities and enabling compile-time metaprogramming.
- **Key Concepts**:
    - **Compile-Time Metaprogramming**: The core idea is that code generation happens entirely at compile-time, before the applications runs. This contrasts with runtime code generation (e.g., using reflection or `System.Reflection.Emit`), which incurs overhead during application execution.
    - **Roslyn Compiler Integration**: Source Generators are deeply integrated with the .NET Compiler Platform (Roslyn). They can analyze the syntax trees and semantic models of existing code, allowing them to understand the structure and meaning of the code they are inspecting.
    - **`ISourceGenerator` Interface**: The primary interface that a source generator must implement. It has two methods: `Initialize` (for registration) and `Execute` (where the code generation logic resides).
    - **`GeneratorExecutionContext`**: An object passed to the `Execute` method, providing access to the current compilation, syntax trees, and most importantly, methods to add new source files to the compilation.
    - **`SyntaxReceiver`**: A mechanism used during the `Initialize` phase to efficiently filter and collect syntax nodes (e.g., class declarations, method calls) that the generator is interested in processing. This avoids processing the entire syntax tree in the `Execute` method.
    - **Boilerplate Reduction**: One of the most significant benefits. Source Generators automate the creation of repetitive, predictable code patterns that developers would otherwise have to write manually (e.g., implementing `INotifyPropertyChanged`, generating `ToString()` methods, creating serialization/deserialization logic, or DTO mappers).
    - **Performance Benefits**: Since the generated code is compiled directly into the assembly, there is no runtime performance penalty. This eliminates the overhead associated with reflection, dynamic code generation, or other runtime techniques, leading to faster and more efficient applications.
- **Comparison (Pros & Cons)**:
    - **Pros**:
        - **Reduces Boilerplate**: Automates repetitive coding tasks, leading to cleaner and more concise codebases.
        - **Improved Performance**: Code generation at compile-time avoids runtime overheads, resulting in faster execution.
        - **Enhanced Developer Productivity**: Developers can focus on business logic rather than repetitive infrastructure code.
        - **Ensures Consistency**: Guarantees that generated code adheres to specific patterns and standards across the project.
        - **Enables New Patterns**: Facilitates compile-time validation, code analysis, and the creation of domain-specific languages (DSLs).
    - **Cons**:
        - **Increased Build Times**: Complex generators can add noticeable time to the build process.
        - **Debugging Challenges**: Debugging source generators themselves can be more complex than debugging regular application code.
        - **Learning Curve**: Requires understanding of Roslyn APIs and compiler internals.
        - **Potential for Over-Engineering**: Can introduce unnecessary complexity if used for simple tasks that don't warrant code generation.
- **Practical Use**: Generating `ToString()` methods, implementing `INotifyPropertyChanged`, creating DTO mappers, generating serialization/deserialization code, building compile-time validation, extending language features, creating strongly-typed accessors for configuration or resources.

### Core Concepts

C# Source Generators represent a significant evolution in the .NET ecosystem, empowering developers to programmatically extend the C# compiler itself. Before Source Generators, developers often resorted to runtime reflection, code weaving (IL manipulation), or manual code generation to achieve similar goals. However, these approaches often came with trade-offs, such as runtime performance overhead, complex build steps, or the burden of maintaining generated files manually.

Source Generators operate within the **Roslyn compiler pipeline**. When you build your C# project, Roslyn parses your source code into **syntax trees** (representing the codes structure) and builds a **semantic model** (representing the codes meaning, types, and relationships). A Source Generator hooks into this process. It can inspect these syntax trees and semantic models to understand the users code. Based on this analysis, the generator can then emit new C# source files. These newly generated files are treated as if they were part of the original project and are compiled along with the rest of your code.

The lifecycle of a Source Generator typically involves:

1.  **Initialization (`Initialize` method)**: Here, the generator registers callbacks with the `GeneratorInitializationContext`. A common registration is for a `SyntaxReceiver`, which allows the generator to efficiently collect specific syntax nodes (e.g., all class declarations with a certain attribute) without having to process the entire syntax tree later.
2.  **Execution (`Execute` method)**: This is where the main code generation logic resides. The `GeneratorExecutionContext` provides access to the `Compilation` object (which contains the semantic model and all syntax trees, including those collected by the `SyntaxReceiver`). The generator analyzes the collected information and uses `context.AddSource()` to add new C# source code to the compilation.

The primary benefits of this **compile-time code generation** are twofold:

*   **Boilerplate Reduction**: Many common programming patterns involve repetitive code that can be automatically generated. For instance, implementing the `INotifyPropertyChanged` interface for UI binding, generating `ToString()` methods that list all public properties, or creating data transfer object (DTO) mappers. Source Generators eliminate the need to write and maintain this tedious code manually, leading to cleaner, more maintainable, and less error-prone codebases.
*   **Performance**: Since the generated code is compiled directly into the final assembly, it behaves exactly like handwritten code. This means there's no runtime overhead associated with reflection, dynamic compilation, or other runtime code generation techniques. Applications leveraging Source Generators can achieve higher performance and lower memory footprints because they avoid the costs of dynamic code execution and reduce pressure on the Garbage Collector.

While powerful, Source Generators do add a layer of complexity to the build process. However, for scenarios involving significant boilerplate or performance-critical code generation, they offer a robust and elegant solution.

### Practice Exercise

Write a simple Source Generator that automatically generates a `ToString()` method for a class, which includes all of its public properties. Apply it to a class and demonstrate that the method is available at compile time.

### Answer (Generating `ToString()` with a Source Generator)

This example will guide you through creating a Source Generator that automatically implements a `ToString()` method for any `partial class` decorated with a custom `[GenerateToString]` attribute. The generated `ToString()` will output the class name and all its public, non-static properties.

**1. Project Setup:**

Create a new solution with two projects:

*   **`MyToStringGenerator` (Class Library - .NET Standard 2.0 or .NET 6.0+):** This will contain the Source Generator itself.
*   **`MyApplication` (Console App - .NET 6.0+):** This will be the consumer of the Source Generator.

**`MyToStringGenerator.csproj`:**

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>netstandard2.0</TargetFramework> <!-- Or net6.0, net7.0, etc. -->
    <LangVersion>latest</LangVersion>
    <Nullable>enable</Nullable>
    <!-- Enable Source Generators -->
    <EnforceExtendedAnalyzerRules>true</EnforceExtendedAnalyzerRules>
  </PropertyGroup>

  <ItemGroup>
    <!-- Required for Source Generators -->
    <PackageReference Include="Microsoft.CodeAnalysis.CSharp" Version="4.8.0" PrivateAssets="all" />
    <PackageReference Include="Microsoft.CodeAnalysis.Analyzers" Version="3.3.4" PrivateAssets="all" />
  </ItemGroup>

</Project>
```

**2. Define the `[GenerateToString]` Attribute:**

In the `MyToStringGenerator` project, create a file `GenerateToStringAttribute.cs`:

```csharp
using System;

namespace MyToStringGenerator
{
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    public sealed class GenerateToStringAttribute : Attribute
    {
    }
}
```

**3. Implement the Source Generator:**

In the `MyToStringGenerator` project, create a file `ToStringGenerator.cs`.

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace MyToStringGenerator
{
    [Generator]
    public class ToStringGenerator : ISourceGenerator
    {
        public void Initialize(GeneratorInitializationContext context)
        {
            // Register a syntax receiver to find candidate classes
            context.RegisterForSyntaxNotifications(() => new SyntaxReceiver());
        }

        public void Execute(GeneratorExecutionContext context)
        {
            if (!(context.SyntaxReceiver is SyntaxReceiver receiver))
                return;

            // Get the semantic model for the compilation
            var compilation = context.Compilation;

            foreach (var classDeclaration in receiver.CandidateClasses)
            {
                var model = compilation.GetSemanticModel(classDeclaration.SyntaxTree);
                // Get the symbol for the class to access its properties and attributes
                var classSymbol = model.GetDeclaredSymbol(classDeclaration) as INamedTypeSymbol;

                if (classSymbol == null)
                    continue;

                // Check if the class has our [GenerateToString] attribute
                var generateToStringAttribute = classSymbol.GetAttributes()
                    .FirstOrDefault(ad => ad.AttributeClass?.ToDisplayString() == "MyToStringGenerator.GenerateToStringAttribute");

                if (generateToStringAttribute == null)
                    continue;

                // Ensure the class is partial, as we're generating a partial method
                if (!classDeclaration.Modifiers.Any(SyntaxKind.PartialKeyword))
                {
                    context.ReportDiagnostic(Diagnostic.Create(
                        new DiagnosticDescriptor(
                            id: "TSG001",
                            title: "Class must be partial",
                            messageFormat: "Class '{0}' must be declared as partial to use GenerateToStringAttribute.",
                            category: "ToStringGenerator",
                            defaultSeverity: DiagnosticSeverity.Error,
                            isEnabledByDefault: true),
                        classDeclaration.GetLocation(),
                        classSymbol.Name));
                    continue;
                }

                // Generate the ToString() method source code
                var generatedCode = GenerateToStringMethod(classSymbol);

                // Add the generated source to the compilation
                context.AddSource(
                    $"{classSymbol.ContainingNamespace.ToDisplayString()}.{classSymbol.Name}.g.cs",
                    SourceText.From(generatedCode, Encoding.UTF8));
            }
        }

        private string GenerateToStringMethod(INamedTypeSymbol classSymbol)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"// <auto-generated/>");
            sb.AppendLine($"namespace {classSymbol.ContainingNamespace.ToDisplayString()}");
            sb.AppendLine("{");
            sb.AppendLine($"    public partial class {classSymbol.Name}");
            sb.AppendLine("    {");
            sb.AppendLine("        public override string ToString()");
            sb.AppendLine("        {");
            sb.Append($"            return $\"{classSymbol.Name} {{ ");

            var properties = classSymbol.GetMembers() 
                                        .OfType<IPropertySymbol>()
                                        .Where(p => p.DeclaredAccessibility == Accessibility.Public && !p.IsStatic)
                                        .ToList();

            for (int i = 0; i < properties.Count; i++)
            {
                var property = properties[i];
                sb.Append($"{property.Name} = {{{property.Name}}}");
                if (i < properties.Count - 1)
                {
                    sb.Append(", ");
                }
            }

            sb.AppendLine(" }}");
            sb.AppendLine("        }");
            sb.AppendLine("    }");
            sb.AppendLine("}");
            return sb.ToString();
        }
    }

    // SyntaxReceiver to collect candidate classes
    internal class SyntaxReceiver : ISyntaxReceiver
    {
        public List<ClassDeclarationSyntax> CandidateClasses { get; } = new List<ClassDeclarationSyntax>();

        public void OnVisitSyntaxNode(SyntaxNode syntaxNode)
        {
            // Look for class declarations that have attributes
            if (syntaxNode is ClassDeclarationSyntax classDeclarationSyntax && classDeclarationSyntax.AttributeLists.Any())
            {
                CandidateClasses.Add(classDeclarationSyntax);
            }
        }
    }
}
```

**4. Configure the Consumer Project (`MyApplication`):**

**`MyApplication.csproj`:**

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <!-- Reference the generator project as an Analyzer -->
    <ProjectReference Include="..\MyToStringGenerator\MyToStringGenerator.csproj"
                      OutputItemType="Analyzer"
                      ReferenceOutputAssembly="false" />
  </ItemGroup>

</Project>
```

**5. Use the Generator in `MyApplication`:**

**`MyApplication/Program.cs`:**

```csharp
using System;
using MyToStringGenerator; // Import the namespace where your attribute is defined

namespace MyApplication
{
    [GenerateToString]
    public partial class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public bool IsStudent { get; private set; } // Private set property will not be included by the generator
        public static string StaticProperty { get; set; } = "Static"; // Static property will not be included
    }

    [GenerateToString]
    public partial class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var person = new Person { FirstName = "John", LastName = "Doe", Age = 30 };
            Console.WriteLine(person.ToString());

            var product = new Product { Id = 1, Name = "Laptop", Price = 1200.50m };
            Console.WriteLine(product.ToString());

            // You can also verify the generated code by looking in the obj/Debug/netX.0/generated/MyToStringGenerator/MyToStringGenerator.ToStringGenerator folder
            // The generated file will be named something like MyApplication.Person.g.cs
        }
    }
}
```

**6. Build and Run:**

Build the `MyApplication` project. During the build, the `ToStringGenerator` will execute. You can then run `MyApplication`.

```bash
dotnet run --project MyApplication
```

**Expected Output:**

```
Person { FirstName = John, LastName = Doe, Age = 30 }
Product { Id = 1, Name = Laptop, Price = 1200.50 }
```

**Demonstrating Compile-Time Availability:**

*   **No Manual `ToString()` Implementation**: Notice that you did not write any `ToString()` method in the `Person` or `Product` classes. The compiler finds the generated method and uses it.
*   **IntelliSense**: If you type `person.` in your IDE after building, IntelliSense will show `ToString()` as an available method, even though you haven't explicitly defined it in your `Person.cs` file.
*   **Generated Files**: You can inspect the generated source files. After building `MyApplication`, navigate to `MyApplication/obj/Debug/netX.0/generated/MyToStringGenerator/MyToStringGenerator.ToStringGenerator/` (replace `netX.0` with your target framework, e.g., `net8.0`). You will find files like `MyApplication.Person.g.cs` and `MyApplication.Product.g.cs` containing the generated `ToString()` implementations.

This exercise clearly demonstrates how Source Generators can automate boilerplate code generation at compile time, making your codebase cleaner and more efficient.
