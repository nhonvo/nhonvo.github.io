---
title: "API Documentation and Versioning with OpenAPI for Java"
description: "Master SpringDoc (Swagger) and learn effective versioning strategies to maintain backward compatibility in your microservices."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "swagger",
    "openapi",
    "api-versioning",
    "microservices",
  ]
---

### APIs as Products

A production API is only as good as its documentation. If other developers can't understand how to use your service without reading your code, you've failed. This guide covers **SpringDoc/OpenAPI** and **API Versioning**.

### Core Concepts

#### 1. OpenAPI (Swagger)

A standard specification for describing RESTful APIs. It allows you to generate a "Try it out" UI automatically from your Spring Boot code.

#### 2. Versioning Strategies

- **URI Versioning**: `/api/v1/users` (Most common, clear but cluttered).
- **Header Versioning**: `Accept: application/vnd.company.app-v2+json` (Cleaner URLs but harder to test).
- **Query Parameter**: `/api/users?version=1`.

---

### Practice Exercise: Documenting and Versioning a Controller

We will add Swagger documentation and implement URI-based versioning.

#### Step 1: Add SpringDoc Dependency

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.1.0</version>
</dependency>
```

#### Step 2: Implement and Document Versioned Controllers

```java
@RestController
@RequestMapping("/api/v1/users")
@Tag(name = "User API", description = "Operations related to users")
public class UserControllerV1 {
    @Operation(summary = "Get user details")
    @GetMapping("/{id}")
    public UserV1 getUser(@PathVariable Long id) { ... }
}

@RestController
@RequestMapping("/api/v2/users")
public class UserControllerV2 {
    @Operation(summary = "Get user details with enhanced stats")
    @GetMapping("/{id}")
    public UserV2 getUser(@PathVariable Long id) { ... }
}
```

---

### Why This Works

- **Self-Documenting Code**: By using `@Operation` and `@Schema` annotations, your documentation stays perfectly in sync with your code.
- **Backward Compatibility**: URI versioning allows you to deploy groundbreaking changes in `v2` while keeping `v1` alive for legacy clients.

### Architectural Tip: API Gateway Mapping

In a microservices environment, your internal services might not have versions in their code. Instead, the **API Gateway** (like Spring Cloud Gateway or AWS APIM) handles the route mapping (e.g., routing `/api/v1/orders` to the `order-service`).

### Summary

Clear documentation and a predictable versioning strategy are the hallmarks of a professional API. By integrating Swagger into your Spring Boot build and planning for versions early, you ensure your service can grow without breaking the world.
