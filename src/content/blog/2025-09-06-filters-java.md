---
title: "Advanced Spring: AOP and Global Exception Handling"
description: "Master Aspect-Oriented Programming and @ControllerAdvice to keep your controllers clean and your error handling robust."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "aop",
    "exception-handling",
    "clean-code",
    "software-architecture",
  ]
---

### Clean Controllers Through AOP

A common smell in Java applications is the "Try-Catch" block repeated in every controller method. By leveraging **AOP** and **`@ControllerAdvice`**, we can extract this boilerplate into centralized, cross-cutting components.

### Core Concepts

#### 1. Aspect-Oriented Programming (AOP)

Allows you to "hook" into method execution without modifying the source code.

- **Join Point**: A point during the execution of a program (e.g., method call).
- **Advice**: Action taken by an aspect at a join point (Before, After, Around).
- **Pointcut**: Predicate that matches join points (e.g., "all methods in the service package").

#### 2. @ControllerAdvice

A specialized `@Component` that allows for handling exceptions across the entire application in one place.

---

### Practice Exercise: AOP Performance Logger and Global Error Handler

#### Step 1: The AOP Aspect

We will log the execution time of every method marked with a custom `@LogTime` annotation.

```java
@Aspect
@Component
public class PerformanceAspect {
    @Around("@annotation(com.example.LogTime)")
    public Object logTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long start = System.currentTimeMillis();

        Object proceed = joinPoint.proceed();

        long executionTime = System.currentTimeMillis() - start;
        System.out.println(joinPoint.getSignature() + " executed in " + executionTime + "ms");
        return proceed;
    }
}
```

#### Step 2: Global Exception Handler

```java
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(UserNotFoundException ex) {
        ErrorResponse error = new ErrorResponse("NOT_FOUND", ex.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneral(Exception ex) {
        ErrorResponse error = new ErrorResponse("INTERNAL_ERROR", "Something went wrong.");
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

### Why This Works

- **Separation of Concerns**: Your controllers focus purely on mapping requests to business logic. They don't need to know how to log or how to format error responses.
- **Proxy Pattern**: Spring AOP works by creating a **Dynamic Proxy** around your `@Service`. When a method is called, the proxy executes the Aspect code first, then the core method, then the Aspect code again (in the case of `@Around`).

### Summary

AOP and `@ControllerAdvice` are the keys to a "Thin Controller" architecture. By moving infrastructure concerns into aspects and advice, you make your code more readable, more testable, and significantly easier to maintain as it grows.
