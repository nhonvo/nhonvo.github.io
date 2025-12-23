---
title: "The Java Web Pipeline: Filters, Interceptors, and AOP"
description: "Understand the request journey in Spring Boot. Master the differences between Servlet Filters, Handler Interceptors, and Aspect-Oriented Programming (AOP)."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "spring-mvc",
    "servlet-filters",
    "interceptors",
    "aop",
    "backend",
  ]
---

### The Request Journey

When a request hits your Spring Boot application, it doesn't go straight to your `@RestController`. It passes through a series of "Middleware" layers. Understanding these layers is key to implementing cross-cutting concerns like logging, security, and auditing.

### Core Concepts

#### 1. Servlet Filters

The outermost layer. Part of the Servlet container (Tomcat). They operate on the raw `HttpServletRequest`.

- **Use Case**: Logging raw request body, security/CORS, compression.

#### 2. Handler Interceptors

Part of Spring MVC. They have access to the "Handler" (the Controller method about to be executed).

- **Use Case**: Checking if a user has access to a specific resource, adding common model attributes.

#### 3. AOP (Aspect Oriented Programming)

The deepest layer. Can wrap any method call (even non-web ones).

- **Use Case**: Performance timing, transaction management, custom auditing annotations.

---

### Practice Exercise: Implementing a Logging Filter

#### Step 1: The Servlet Filter

```java
@Component
public class RequestTimeFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        long startTime = System.currentTimeMillis();

        chain.doFilter(request, response); // Continue the pipeline

        long duration = System.currentTimeMillis() - startTime;
        System.out.println("Request took: " + duration + "ms");
    }
}
```

#### Step 2: The Handler Interceptor

```java
@Component
public class AuditInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        System.out.println("Processing: " + handler.toString());
        return true; // Continue to controller
    }
}
```

---

### Why the Distinction Matters

- **Generic vs. Specific**: Filters are generic (any servlet app). Interceptors are specific to Spring MVC and understand things like `@PathVariable`.
- **Short-circuiting**: A Filter can block a request before it even enters the Spring world. An Interceptor can block a request after Spring has already determined which controller to use.

### Summary

Choosing the right layer for your logic is an architectural decision. Use **Filters** for raw protocol-level tasks, **Interceptors** for web-layer logic, and **AOP** for logic that spans multiple layers of your application.
