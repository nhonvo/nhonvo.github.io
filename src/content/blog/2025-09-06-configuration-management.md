---
title: "Configuration Management (Options Pattern, Environment Variables)"
description: "Explain how to manage application settings and secrets effectively using the Options pattern and environment-specific configurations."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Configuration",
    "Options Pattern",
    "Secrets Management",
    "Environment Variables",
    "Azure Key Vault",
    "AppSetting",
    "Best Practices",
  ]
---

## Mind Map Summary

- **ASP.NET Core Configuration**
  - **Core Concept**: A hierarchical system that aggregates configuration data from multiple sources into a single, unified view.
  - **Key Principle**: **Last source in wins**. Configuration providers are layered, and later providers override the values of earlier ones.
  - **Common Configuration Providers (Default Order)**
    1. `appsettings.json` (Base settings, should not contain secrets).
    2. `appsettings.{Environment}.json` (e.g., `appsettings.Development.json`). Overrides the base file.
    3. **User Secrets** (Development only). Stored securely outside the project folder. Overrides `appsettings` files.
    4. **Environment Variables**. Overrides User Secrets and `appsettings`.
    5. **Command-line Arguments**. The ultimate override.
  - **Accessing Configuration**
    - **`IConfiguration`**: Directly inject the `IConfiguration` service to read key-value pairs (e.g., `_config["MyKey"]`).
    - **Options Pattern (`IOptions<T>`)**: The recommended approach. Binds configuration sections to strongly-typed C# classes, promoting type safety and separation of concerns.
  - **Security Best Practice**: **Never store secrets in source control**. Use User Secrets for local development and a secure vault service (like **Azure Key Vault** or **AWS Secrets Manager**) for production environments.

## Core Concepts

### 1. The Configuration Hierarchy

ASP.NET Core's configuration system is designed to be highly flexible and secure. When the application starts, the `Host.CreateDefaultBuilder` sets up a series of configuration providers in a specific order. Each provider reads settings from its source, and if it finds a key that was already loaded by a previous provider, it overwrites the value. This creates a powerful hierarchy that allows you to set default values in `appsettings.json` and override them for specific environments or for security reasons.

### 2. Common Configuration Sources

- **`appsettings.json`**: The baseline for your application's configuration. It's checked into source control and should contain non-sensitive, default settings.
- **`appsettings.{Environment}.json`**: An environment-specific override file. The `Environment` (e.g., `Development`, `Staging`, `Production`) is determined by the `ASPNETCORE_ENVIRONMENT` environment variable. This allows you to have different settings (e.g., database connection strings) for different environments.
- **User Secrets**: A tool for storing sensitive data on your local development machine. The secrets are stored in a JSON file in your user profile directory, completely separate from your project folder, so there is no risk of accidentally committing them to source control.
- **Environment Variables**: A common way to provide configuration in containerized and cloud environments. They are easy to set in Docker, Kubernetes, and cloud provider dashboards.
- **Azure Key Vault / AWS Secrets Manager**: Secure, cloud-based vault services. These are the standard for managing secrets in production. Your application is given an identity that is granted permission to read secrets from the vault at runtime.

### 3. The Options Pattern

While you can inject `IConfiguration` directly, it leads to loosely-typed code (`_config["MySettings:MyKey"]`). The Options Pattern is a much cleaner approach. You create a simple C# class (a POCO) that matches the structure of a section in your `appsettings.json` file. You then register this class with the DI container (`builder.Services.Configure<MySettings>(...)`) and can inject it as `IOptions<MySettings>` anywhere in your app, giving you strongly-typed, validated access to your settings.

## Practice Exercise

Define a configuration value in `appsettings.json`. Then, define a value with the same key using the .NET Secret Manager. Finally, set an environment variable with the same key. In your code, read this configuration value and demonstrate which source takes precedence. Explain the hierarchy.

## Answer (Demonstrating Configuration Precedence in C#)

### 1. `appsettings.json`

Add the following section to your `appsettings.json` file:

```json
{
  "MySettings": {
    "TestKey": "Value from appsettings.json"
  }
}
```

### 2. User Secrets

- Right-click your project in Visual Studio and select "Manage User Secrets" (or run `dotnet user-secrets init` from the CLI).
- This opens a `secrets.json` file. Add the following, which will override the value from `appsettings.json`:

```json
{
  "MySettings": {
    "TestKey": "Value from User Secrets"
  }
}
```

### 3. Environment Variable

- Set an environment variable that matches the configuration path, using a double underscore `__` to separate sections.
- In Windows (PowerShell): `$env:MySettings__TestKey = "Value from Environment Variable"`
- In Linux/macOS: `export MySettings__TestKey="Value from Environment Variable"`

### 4. The Code (`Program.cs` for a minimal API)

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (IConfiguration config) =>
{
    // Read the configuration value
    var myValue = config["MySettings:TestKey"];
    return $"The final configuration value is: \"{myValue}\"";
});

app.Run();
```

### Explanation of Results

When you run the application and navigate to the root URL (`/`), the output will be:

`The final configuration value is: "Value from Environment Variable"`

This demonstrates the override hierarchy perfectly:

1. The host first reads `appsettings.json`, setting `MySettings:TestKey` to its initial value.
2. Then, it reads from User Secrets (in the Development environment), which overrides the value to "Value from User Secrets".
3. Finally, it reads from Environment Variables. Since it finds a matching key (`MySettings__TestKey`), it overrides the value one last time.

This shows that **Environment Variables override User Secrets, which in turn override `appsettings.json`**. This powerful feature allows you to set safe defaults in code and securely override them in different environments without changing the application code itself.
