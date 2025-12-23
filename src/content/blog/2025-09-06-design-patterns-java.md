---
title: "Modern Design Patterns in Java: Principles and Practice"
description: "From classic GoF patterns to modern Java applications. Learn to apply Singleton, Strategy, Observer, and Factory patterns effectively."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "design-patterns",
    "software-architecture",
    "clean-code",
    "object-oriented",
  ]
---

### Standard Solutions to Common Problems

Design patterns provide a shared vocabulary and a set of proven templates for solving recurring design challenges. This guide focuses on the "Big Four" patterns used in modern Java development.

### Core Concepts

#### 1. Singleton

Ensures a class has only one instance and provides a global point of access to it.

- **Modern Java**: Use an `enum` for the safest, easiest Singleton.

#### 2. Strategy

Defines a family of algorithms, encapsulates each one, and makes them interchangeable.

- **Java Tip**: Use Functional Interfaces and Lambdas to implement lightweight strategies.

#### 3. Observer

Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified automatically.

#### 4. Factory

Provides an interface for creating objects in a superclass but allows subclasses to alter the type of objects that will be created.

---

### Practice Exercise: The Strategy Pattern for Payments

We will build a payment processing system where the user can choose between Credit Card and PayPal at runtime.

#### Step 1: The Strategy Interface

```java
@FunctionalInterface
public interface PaymentStrategy {
    void pay(int amount);
}
```

#### Step 2: Concrete Implementations

```java
public class CreditCardStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}

public class PaypalStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}
```

#### Step 3: Usage

```java
public class ShoppingCart {
    public void processOrder(int total, PaymentStrategy paymentMethod) {
        paymentMethod.pay(total);
    }
}

// Client Code
cart.processOrder(100, new CreditCardStrategy());
cart.processOrder(50, amount -> System.out.println("Apple Pay: " + amount)); // Using Lambda!
```

---

### Why This Works

- **Open/Closed Principle**: You can add a new payment method (e.g., Bitcoin) by creating a new `PaymentStrategy` implementation without changing the `ShoppingCart` class.
- **Encapsulation**: The logic for _how_ to pay is hidden from the `ShoppingCart`, which only cares _that_ it can pay.

### Summary

Design patterns are tools, not targets. Don't over-engineer your code by forcing patterns where they don't fit. But when complexity rises, patterns like Strategy or Factory provide a clean, industry-standard way to manage it.
