---
title: "Mastering Dependency Injection in Spring Boot"
description: "A deep dive into Inversion of Control (IoC), bean life cycles, and the critical differences between Singleton, Prototype, and Request scopes."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "dependency-injection",
    "ioc",
    "spring-framework",
    "software-architecture",
  ]
---

### The Heart of Spring

Dependency Injection (DI) is the foundation of the Spring ecosystem. It allows for loosely coupled, testable, and maintainable code by moving the responsibility of object creation from the application to the **IoC Container**.

### Core Concepts

#### 1. Inversion of Control (IoC)

Instead of the developer calling `new MyService()`, the framework instantiates and manages the objects (Beans).

#### 2. Bean Scopes

- **Singleton (Default)**: Only one instance exists per container.
- **Prototype**: A new instance is created every time it's requested.
- **Request**: New instance per HTTP request (Web context only).
- **Session**: New instance per HTTP session.

---

### Practice Exercise: Demonstrating Life Cycle Scopes

We will create three services with different scopes and observe their behavior within a single request.

#### Step 1: Define Scoped Beans

```java
@Component
@Scope("singleton")
public class SingletonService {
    public String id = UUID.randomUUID().toString();
}

@Component
@Scope(value = WebApplicationContext.SCOPE_REQUEST, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestService {
    public String id = UUID.randomUUID().toString();
}

@Component
@Scope("prototype")
public class PrototypeService {
    public String id = UUID.randomUUID().toString();
}
```

#### Step 2: Inject into a Controller

```java
@RestController
public class ScopeController {
    @Autowired private SingletonService s1;
    @Autowired private SingletonService s2;
    @Autowired private PrototypeService p1;
    @Autowired private PrototypeService p2;
    @Autowired private RequestService r1;

    @GetMapping("/test-scope")
    public Map<String, String> test() {
        return Map.of(
            "s1", s1.id, "s2", s2.id, // Will be identical
            "p1", p1.id, "p2", p2.id, // Will be different
            "r1", r1.id               // Will be same for this request
        );
    }
}
```

---

### Why This Works

- **The ApplicationContext**: On startup, Spring scans your `@Component` classes. It creates one instance for every Singleton.
- **Proxies**: For the `Request` scope, Spring injects a **Proxy**. When you call a method on `r1`, the proxy looks up the current HTTP request context and finds the specific bean for that request.

### The "Captive Dependency" Danger

A common bug occurs when you inject a shorter-lived bean (like a `Prototype`) into a longer-lived bean (like a `Singleton`). Because the Singleton is only initialized once, it will "capture" a single Prototype instance and hold onto it forever, defeating the purpose of the prototype scope. Use **Lookup methods** or `ObjectProvider` to fix this.

### Summary

Understanding DI scopes is the difference between a high-performing Spring app and one riddled with memory leaks and state-sharing bugs. Choose `Singleton` for stateless logic and `Prototype/Request` only when internal state must be isolated.
