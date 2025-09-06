---
title: "Advanced Reflection and Roslyn"
description: "Discuss the performance implications of reflection. Explain how to use the Roslyn compiler API for code analysis and generation."
pubDate: "Sep 06 2025"
published: true
tags: [".NET", "C#", "Reflection", "Roslyn", "Metaprogramming"]
---

### Mind Map Summary

- **Topic**: Advanced Reflection and Roslyn
- **Definition**:
    - **Reflection**: The ability of a program to examine and modify its own structure and behavior at runtime. In .NET, it allows inspecting metadata about types, methods, properties, and fields, and dynamically invoking members or creating instances.
    - **Roslyn (Compiler as a Service)**: Microsoft's open-source .NET compiler platform that exposes the C# and Visual Basic compilers as APIs. It provides rich programmatic access to the compiler's understanding of code, enabling powerful code analysis, transformation, and generation.
- **Key Concepts**:
    - **Reflection**:
        - **`System.Reflection` Namespace**: Contains core types like `Type`, `Assembly`, `MethodInfo`, `PropertyInfo`, `FieldInfo`, `ConstructorInfo`.
        - **Inspecting Metadata**: Getting information about types, members, attributes.
        - **Dynamic Invocation**: Calling methods or accessing properties/fields by name at runtime.
        - **Dynamic Instance Creation**: Creating objects of types unknown at compile time.
        - **Performance Implications**: Reflection is generally slower than direct calls because it involves runtime lookups and checks. Caching `MethodInfo` or `PropertyInfo` objects can mitigate some overhead, but it's still slower.
    - **Roslyn (Compiler as a Service)**:
        - **Syntax Trees**: An immutable, hierarchical representation of the source code's syntactic structure. Each node in the tree represents a code construct (e.g., class declaration, method call, variable).
        - **Semantic Model**: Provides a deeper understanding of the code, including symbol information (what a variable refers to), type information, and relationships between code elements. It's built by binding syntax nodes to symbols.
        - **Workspaces**: A higher-level abstraction that represents a collection of projects and documents, allowing for analysis across an entire solution.
        - **Analyzers**: Custom rules that inspect code for potential issues (e.g., coding style violations, common bugs, security vulnerabilities). They operate on the Syntax Tree and Semantic Model.
        - **Code Fixes**: Accompany analyzers, providing automatic suggestions to fix the issues identified by analyzers.
        - **Source Generators**: A new feature (C# 9 / .NET 5+) that allows developers to inspect user code and generate new source code files at compile time. This is a powerful form of metaprogramming, reducing boilerplate and improving performance compared to runtime reflection.
- **Benefits (Pros)**:
    - **Reflection**:
        - **Extensibility**: Enables highly dynamic and extensible applications (e.g., plugin architectures, ORMs, serialization/deserialization, dependency injection containers).
        - **Generic Solutions**: Write code that works with any type, even those not known at compile time.
    - **Roslyn**:
        - **Powerful Code Analysis**: Build custom static analysis tools, linters, and code quality checks.
        - **Refactoring & IDE Features**: Foundation for many IDE features like refactoring, code completion, and quick fixes.
        - **Compile-Time Metaprogramming**: Source Generators reduce boilerplate, improve performance (no runtime reflection overhead), and maintain type safety.
        - **Better Developer Experience**: Enforce coding standards and provide immediate feedback.
- **Challenges (Cons)**:
    - **Reflection**:
        - **Performance Overhead**: Slower than direct calls, can be a bottleneck in performance-critical paths.
        - **Type Safety**: Bypasses compile-time type checking, leading to potential runtime errors.
        - **Maintainability**: Code using reflection can be harder to read, understand, and debug.
        - **Obfuscation Issues**: Can be broken by code obfuscation.
    - **Roslyn**:
        - **Steep Learning Curve**: The API is extensive and can be complex to master.
        - **Complexity**: Building sophisticated analyzers or generators requires a deep understanding of compiler internals.
        - **Resource Intensive**: Analyzing large codebases can consume significant memory and CPU.
        - **Version Compatibility**: Analyzers/generators might need updates with new C# language versions.
- **Practical Use**:
    - **Reflection**:
        - **Object-Relational Mappers (ORMs)**: Entity Framework, Dapper.
        - **Serialization/Deserialization**: JSON.NET, System.Text.Json.
        - **Dependency Injection Containers**: Autofac, Unity, Microsoft.Extensions.DependencyInjection.
        - **Unit Testing Frameworks**: Discovering test methods.
        - **Plugin Architectures**: Loading and interacting with dynamically loaded assemblies.
    - **Roslyn**:
        - **Custom Code Analyzers**: Enforcing specific coding standards or detecting anti-patterns in your codebase.
        - **Code Fixes**: Providing automated solutions for analyzer warnings.
        - **IDE Extensions**: Building custom features for Visual Studio or VS Code.
        - **Source Generators**: Generating boilerplate code (e.g., `INotifyPropertyChanged` implementations, DTO mappers, strongly-typed IDs).
        - **Code Refactoring Tools**: Automating complex code transformations.

### Core Concepts

While Reflection allows runtime introspection and manipulation, **Roslyn** shifts much of this power to compile-time. Reflection is about *what is there* at runtime, while Roslyn is about *what the compiler understands* about your code.

**Source Generators** are a game-changer, allowing you to write code that writes code. This means you can generate boilerplate, implement interfaces, or create helper methods based on your existing code, all during compilation. This avoids the runtime performance penalties and type safety issues associated with reflection, while still providing powerful metaprogramming capabilities.

### Practice Exercise

Write a simple Roslyn analyzer that identifies and flags the use of `DateTime.Now` in code, suggesting `DateTime.UtcNow` as a best practice.

### Answer

To create a Roslyn analyzer, you typically set up a new project using the "Analyzer with Code Fix" template in Visual Studio. This involves several projects:
1.  **Analyzer Project**: Contains the diagnostic logic.
2.  **Code Fix Project**: Provides the automatic fix for the diagnostic.
3.  **Unit Test Project**: Tests for the analyzer and code fix.

Here, I'll provide the core logic for the analyzer.

#### 1. Analyzer Project (`DateTimeNowAnalyzer.cs`)

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Diagnostics;
using System.Collections.Immutable;

namespace DateTimeNowAnalyzer
{
    [DiagnosticAnalyzer(LanguageNames.CSharp)]
    public class DateTimeNowAnalyzer : DiagnosticAnalyzer
    {
        public const string DiagnosticId = "DTN001";
        private static readonly LocalizableString Title = new LocalizableResourceString(nameof(Resources.AnalyzerTitle), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString MessageFormat = new LocalizableResourceString(nameof(Resources.AnalyzerMessageFormat), Resources.ResourceManager, typeof(Resources));
        private static readonly LocalizableString Description = new LocalizableResourceString(nameof(Resources.AnalyzerDescription), Resources.ResourceManager, typeof(Resources));
        private const string Category = "Usage";

        private static readonly DiagnosticDescriptor Rule = new DiagnosticDescriptor(
            DiagnosticId,
            Title,
            MessageFormat,
            Category,
            DiagnosticSeverity.Warning, // Or Error, Info
            isEnabledByDefault: true,
            description: Description);

        public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics => ImmutableArray.Create(Rule);

        public override void Initialize(AnalysisContext context)
        {
            context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
            context.EnableConcurrentExecution();

            // Register a callback to be executed when a MemberAccessExpressionSyntax is encountered
            context.RegisterSyntaxNodeAction(AnalyzeMemberAccess, SyntaxKind.SimpleMemberAccessExpression);
        }

        private static void AnalyzeMemberAccess(SyntaxNodeAnalysisContext context)
        {
            var memberAccess = (MemberAccessExpressionSyntax)context.Node;

            // Check if the expression is accessing a member of System.DateTime
            // and if the member name is "Now"
            if (memberAccess.Expression is IdentifierNameSyntax identifierName &&
                identifierName.Identifier.Text == "DateTime" &&
                memberAccess.Name.Identifier.Text == "Now")
            {
                // Get the semantic model to ensure it's actually System.DateTime.Now
                var typeInfo = context.SemanticModel.GetTypeInfo(identifierName);
                if (typeInfo.Type?.ToDisplayString() == "System.DateTime")
                {
                    // Report the diagnostic
                    var diagnostic = Diagnostic.Create(Rule, memberAccess.Name.GetLocation(), memberAccess.Name.Identifier.Text);
                    context.ReportDiagnostic(diagnostic);
                }
            }
        }
    }
}
```

#### 2. Resources.resx (for localized strings)

You'd typically have a `Resources.resx` file with entries like:
*   `AnalyzerTitle`: "Avoid DateTime.Now"
*   `AnalyzerMessageFormat`: "Usage of '{0}' is discouraged. Consider using DateTime.UtcNow for consistency."
*   `AnalyzerDescription`: "Using DateTime.Now can lead to issues with time zones and inconsistent behavior across different environments. DateTime.UtcNow provides a universal, unambiguous time."

#### 3. Code Fix Project (`DateTimeNowCodeFixProvider.cs`)

This would be a separate class that implements `CodeFixProvider` and suggests replacing `DateTime.Now` with `DateTime.UtcNow`.

```csharp
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CodeActions;
using Microsoft.CodeAnalysis.CodeFixes;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Collections.Immutable;
using System.Composition;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DateTimeNowAnalyzer
{
    [ExportCodeFixProvider(LanguageNames.CSharp, Name = nameof(DateTimeNowCodeFixProvider)), Shared]
    public class DateTimeNowCodeFixProvider : CodeFixProvider
    {
        public sealed override ImmutableArray<string> FixableDiagnosticIds => ImmutableArray.Create(DateTimeNowAnalyzer.DiagnosticId);

        public sealed override FixAllProvider GetFixAllProvider()
        {
            return WellKnownFixAllProviders.BatchFixer;
        }

        public sealed override async Task RegisterCodeFixesAsync(CodeFixContext context)
        {
            var root = await context.Document.GetSyntaxRootAsync(context.CancellationToken).ConfigureAwait(false);
            var diagnostic = context.Diagnostics.First();
            var diagnosticSpan = diagnostic.Location.SourceSpan;

            // Find the member access expression identified by the analyzer
            var memberAccess = root.FindToken(diagnosticSpan.Start).Parent.AncestorsAndSelf().OfType<MemberAccessExpressionSyntax>().First();

            // Register a code action that will invoke the fix.
            context.RegisterCodeFix(
                CodeAction.Create(
                    title: CodeFixResources.CodeFixTitle,
                    createChangedDocument: c => ReplaceDateTimeNowWithUtcNow(context.Document, memberAccess, c),
                    equivalenceKey: nameof(CodeFixResources.CodeFixTitle)),
                diagnostic);
        }

        private async Task<Document> ReplaceDateTimeNowWithUtcNow(Document document, MemberAccessExpressionSyntax memberAccess, CancellationToken cancellationToken)
        {
            // Create a new SimpleNameSyntax for "UtcNow"
            var newName = SyntaxFactory.IdentifierName("UtcNow");

            // Replace the "Now" identifier with "UtcNow"
            var newMemberAccess = memberAccess.WithName(newName);

            var oldRoot = await document.GetSyntaxRootAsync(cancellationToken).ConfigureAwait(false);
            var newRoot = oldRoot.ReplaceNode(memberAccess, newMemberAccess);

            return document.WithSyntaxRoot(newRoot);
        }
    }
}
```

This setup allows developers to get immediate feedback in their IDE about `DateTime.Now` usage and automatically fix it, promoting better coding practices.