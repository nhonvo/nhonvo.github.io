---
title: "Architectural Styles (Monolithic, Microservices, Serverless)"
description: "Compare and contrast different architectural patterns and understand their trade-offs."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Architecture",
    "Microservices",
    "Serverless",
    "Monolith",
    "System Design",
    "Scalability",
    "Reliability",
    "Distributed Systems",
  ]
---

## Mind Map Summary

- **Monolithic Architecture**
  - **What**: A single, unified application. All components (UI, business logic, data access) are developed and deployed as one unit.
  - **Pros**:
    - **Simplicity**: Easy to develop, debug, test, and deploy initially.
    - **Performance**: In-process communication is fast.
  - **Cons**:
    - **Scalability**: You must scale the entire application, even if only one small part is a bottleneck.
    - **Maintainability**: Becomes a "big ball of mud" as it grows, hard to understand and change.
    - **Reliability**: A bug in one module can crash the entire application.
    - **Technology Stack**: Locked into a single technology stack.
- **Microservice Architecture**
  - **What**: An application structured as a collection of small, autonomous services, each focused on a specific business capability.
  - **Pros**:
    - **Independent Scaling**: Scale only the services that need it.
    - **Technology Freedom**: Each service can use the best technology for its job.
    - **Resilience**: Failure in one service doesn't necessarily bring down the whole system.
    - **Maintainability**: Smaller, focused codebases are easier to manage.
  - **Cons**:
    - **Operational Complexity**: A distributed system is much harder to deploy, monitor, and debug.
    - **Network Latency**: Communication between services is slower than in-process calls.
    - **Data Consistency**: Maintaining data consistency across multiple services is a major challenge (e.g., distributed transactions).
- **Communication Patterns**
  - **Synchronous (e.g., REST, gRPC)**: The caller makes a request and waits for a response. Simple, but can lead to tight coupling.
  - **Asynchronous (e.g., Message Bus like RabbitMQ/Kafka)**: The caller sends a message (an event) and doesn't wait for a response. Promotes loose coupling and resilience.

## Core Concepts

### 1. The Monolith

The monolithic approach is the traditional way of building applications. It's a single, self-contained unit. For a web application, this typically means a single solution with projects for the UI, Business Logic Layer (BLL), and Data Access Layer (DAL). While this is very simple to start with, it presents significant challenges as the application grows. The tight coupling between components means a change in one area can have unintended consequences in another. Scaling becomes inefficient because you have to deploy new instances of the entire application, even if only a small part of it is under heavy load.

### 2. Microservices

The microservice architecture is a direct response to the challenges of the monolith. The core idea is to break down a large application into a suite of small, independently deployable services, each organized around a specific business domain. For example, in an e-commerce system, you might have separate services for `Users`, `Products`, `Orders`, and `Payments`. Each service has its own database and can be developed, deployed, and scaled independently of the others.

This independence is powerful but introduces the complexities of a distributed system. Developers must now deal with network latency, fault tolerance, service discovery, and maintaining data consistency across services, which are non-trivial problems.

## Practice Exercise

Whiteboard a simple e-commerce system. First, design it as a monolith, showing the main components. Then, redesign it as a set of microservices (e.g., Orders, Products, Users). For the microservices design, explain how the 'Place Order' process would work, including how services would communicate (e.g., REST calls vs. a message bus).

## Answer (Architectural Comparison for E-Commerce)

### 1. Monolithic E-Commerce Design

```text
+----------------------------------------------------+
|                                                    |
|              E-Commerce Monolith App               |
|                                                    |
|  +-----------------+  +--------------------------+ |
|  |                 |  |                          | |
|  |  Web UI Layer   |  |   Business Logic Layer   | |
|  |                 |  |                          | |
|  +-------+---------+  |  +--------------------+  | |
|          |            |  |    IUserService    |  | |
|          |            |  +--------------------+  | |
|          |            |  |   IProductService  |  | |
|          |            |  +--------------------+  | |
|          |            |  |    IOrderService   |  | |
|          |            |  +--------------------+  | |
|          |            |                          | |
|          +------------>  +-----------+------------+ |
|                                      |             |
|  +-----------------------------------+             |
|  |                                                 |
|  |               Data Access Layer                 |
|  |                                                 |
|  +-----------------------+-------------------------+ |
|                          |                         |
|  +-----------------------v-------------------------+ |
|  |                                                 |
|  |          Single E-Commerce Database             |
|  |  (Users Table, Products Table, Orders Table)    |
|  |                                                 |
|  +-------------------------------------------------+ |
+----------------------------------------------------+
```

- **Structure**: A single application with distinct layers. All code is deployed together.
- **Process**: A request to place an order goes to the `OrderService`. The `OrderService` can directly call the `ProductService` (to check inventory) and the `UserService` (to get user details) via simple in-process method calls. All these services operate on a single, shared database within a single transaction, guaranteeing consistency (ACID).

### 2. Microservices E-Commerce Design

```text
+----------------+      +-----------------+      +----------------+
|  User Service  |      | Product Service |      | Order Service  |
|    (Own DB)    |      |    (Own DB)     |      |    (Own DB)    |
+-------+--------+      +--------+--------+      +--------+-------+
        ^                        ^                        ^
        |                        |                        |
+-------+------------------------+------------------------+-------+
|                                                                 |
|                          API Gateway                            |
|                                                                 |
+--------------------------------+-------------------------------+
                                 ^
                                 |
+--------------------------------+-------------------------------+
|                                                                 |
|                          Message Bus                            |
|                    (e.g., RabbitMQ, Kafka)                      |
|                                                                 |
+----------------------------------------------------------------+
```

- **Structure**: The application is split into independent services, each with its own database. An API Gateway acts as the single entry point for external clients.
- **'Place Order' Process (Asynchronous Communication)**:
  1. The client sends a `POST` request to the API Gateway's `/orders` endpoint.
  2. The API Gateway forwards the request to the **Order Service**.
  3. The **Order Service** creates an order, saves it with a status of `Pending`, and then publishes an `OrderCreated` event to the **Message Bus**.
  4. The **Product Service** is subscribed to the `OrderCreated` event. When it receives the message, it attempts to reserve the inventory.
     - If successful, it publishes a `ProductsReserved` event.
     - If it fails, it publishes a `ProductReservationFailed` event.
  5. The **Payment Service** (not shown) attempts to process the payment and publishes its result.
  6. The **Order Service** is subscribed to all relevant events and updates the order status accordingly (Saga Pattern).

### Why Asynchronous?

This approach is highly resilient. If the Product Service is down, orders can still be accepted and placed in a `Pending` state. When the Product Service comes back online, it can process the backlog of `OrderCreated` events from the message bus. This loose coupling prevents a failure in one service from causing a cascading failure throughout the system.
