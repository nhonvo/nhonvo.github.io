---
title: "System Design Practice"
description: "Practice designing systems (e.g., URL shortener, Twitter feed). For each, start by defining key non-functional requirements like scalability, availability, latency, consistency, and cost, then discuss the trade-offs of your design choices."
pubDate: "Sep 06 2025"
published: true
tags: ["System Design", "Architecture", "Scalability"]
---

### Mind Map Summary

- **Topic**: System Design Practice
- **Definition**: The process of defining the architecture, components, modules, interfaces, and data for a system to satisfy specified requirements. It involves making strategic decisions about technology, infrastructure, and patterns to build robust, scalable, and maintainable solutions.
- **Key Concepts**:
    - **Non-functional Requirements (NFRs)**:
        - **Scalability**: Ability to handle increasing load (horizontal vs. vertical).
        - **Availability**: System uptime and resilience to failures (redundancy, failover).
        - **Latency**: Time taken for a request to be processed (response time).
        - **Consistency**: Data consistency models (strong, eventual, causal).
        - **Durability**: Guarantee that committed data will not be lost.
        - **Reliability**: Probability of a system performing its intended function without failure.
        - **Security**: Protection against unauthorized access and attacks.
        - **Cost**: Infrastructure, development, and operational expenses.
        - **Maintainability**: Ease of modifying, extending, and debugging the system.
    - **Core System Components**:
        - **Load Balancers**: Distribute incoming traffic across multiple servers.
        - **Web Servers**: Handle HTTP requests (e.g., Nginx, Apache).
        - **Application Servers**: Execute business logic (e.g., Node.js, Spring Boot, ASP.NET Core).
        - **Databases**: Store and retrieve data (SQL: PostgreSQL, MySQL; NoSQL: MongoDB, Cassandra, Redis).
        - **Caching**: Improve performance by storing frequently accessed data (e.g., Redis, Memcached).
        - **Message Queues**: Enable asynchronous communication and decouple services (e.g., Kafka, RabbitMQ, SQS).
        - **Content Delivery Networks (CDNs)**: Deliver static content closer to users.
        - **Search Engines**: Provide full-text search capabilities (e.g., Elasticsearch).
        - **Monitoring & Logging**: Observe system health and troubleshoot issues.
    - **Design Principles & Patterns**:
        - **Horizontal vs. Vertical Scaling**: Adding more machines vs. adding more resources to existing machines.
        - **Database Sharding/Partitioning**: Distributing data across multiple database instances.
        - **Database Replication**: Maintaining multiple copies of data for availability and read scaling.
        - **Microservices vs. Monolith**: Architectural styles and their trade-offs.
        - **Event-Driven Architecture**: Services communicate via events.
        - **API Gateway**: Single entry point for clients to access microservices.
        - **Circuit Breaker**: Prevents cascading failures in distributed systems.
    - **Trade-offs**: Understanding that optimizing for one NFR often impacts others (e.g., strong consistency vs. high availability).
- **Benefits (Pros)**:
    - **Holistic Understanding**: Develops a comprehensive view of how different components interact.
    - **Problem-Solving Skills**: Enhances ability to break down complex problems into manageable parts.
    - **Architectural Thinking**: Fosters the ability to design robust, scalable, and resilient systems.
    - **Interview Preparation**: Essential skill for senior and staff engineering roles.
    - **Better Decision Making**: Leads to more informed choices about technology and infrastructure.
- **Challenges (Cons)**:
    - **Breadth of Knowledge**: Requires understanding across many domains (networking, databases, distributed systems, security).
    - **No Single Solution**: Often multiple valid designs exist, requiring justification of trade-offs.
    - **Abstract Nature**: Can be difficult to grasp without practical experience.
    - **Keeping Up-to-Date**: The technology landscape evolves rapidly.
- **Practical Use**:
    - Designing new software systems from scratch.
    - Re-architecting existing systems to address performance or scalability issues.
    - Evaluating and selecting appropriate technologies.
    - Preparing for technical interviews.

### Core Concepts

System design is the art and science of architecting complex software systems. It's not just about writing code, but about making high-level decisions that impact the system's performance, reliability, scalability, and maintainability. A key aspect of system design is understanding and balancing **non-functional requirements (NFRs)**, as optimizing for one often comes at the expense of another.

The process typically involves:
1.  **Understanding Requirements**: Clarifying functional and non-functional requirements.
2.  **Estimating Scale**: Determining expected user load, data volume, and traffic.
3.  **High-Level Design**: Sketching out major components and their interactions.
4.  **Deep Dive**: Detailing specific components (e.g., database schema, API design).
5.  **Identifying Bottlenecks & Trade-offs**: Analyzing potential issues and making informed decisions.

### Practice Exercise

Design a high-level architecture for a real-time notification system. Discuss:
1.  How clients (web/mobile) would connect.
2.  How the backend would push notifications.
3.  How to handle millions of concurrent connections.
4.  The data model for storing notifications.
(Hint: Consider SignalR, WebSockets, Message Queues).

### Answer (High-Level Architecture for a Real-Time Notification System)

#### 1. Requirements & Scale Estimation

*   **Functional**: Send real-time notifications to users (web, mobile).
*   **Non-functional**:
    *   **Scalability**: Handle millions of concurrent connections and high notification throughput.
    *   **Availability**: High uptime, notifications should be delivered reliably.
    *   **Latency**: Near real-time delivery (low latency).
    *   **Durability**: Notifications should be persisted.
    *   **Security**: Secure user authentication and authorization.

#### 2. High-Level Components

*   **Clients**: Web browsers, iOS/Android apps.
*   **API Gateway / Load Balancer**: Entry point for all client requests.
*   **Notification Service**: Core service for sending/managing notifications.
*   **WebSocket/Long Polling Server (e.g., SignalR Hub, custom WebSocket server)**: Manages persistent connections with clients.
*   **Message Queue/Broker (e.g., Kafka, RabbitMQ, Azure Service Bus)**: Decouples notification producers from consumers, handles fan-out.
*   **Database**: Stores notification history, user preferences, and connection mapping.
*   **Cache (e.g., Redis)**: Stores active user connections, recent notifications for quick retrieval.

#### 3. Architecture Diagram (Conceptual)

```
+-----------------+     +-----------------+     +-----------------+
|                 |     |                 |     |                 |
|  Web/Mobile     |     |   API Gateway   |     | Notification    |
|    Clients      +----->   (Load Balancer) +----->    Service    |
|                 |     |                 |     |                 |
+--------+--------+     +--------+--------+     +--------+--------+
         |                       |                         |
         | (WebSocket/Long Polling)                        | (Pub/Sub)
         |                       |                         |
         |                       |                         |
+--------v--------+     +--------v--------+     +--------v--------+
|                 |     |                 |     |                 |
| WebSocket/Long  |     |  Message Queue  |     |    Database     |
| Polling Servers |<----+    (Kafka/MQ)   +----->    (NoSQL/SQL)  |
|                 |     |                 |     |                 |
+-----------------+     +-----------------+     +-----------------+
         ^
         | (Cache for active connections)
         |
+--------+--------+
|                 |
|      Cache      |
|     (Redis)     |
+-----------------+
```

#### 4. Discussion Points

**1. How clients (web/mobile) would connect:**

*   **WebSockets**: Ideal for real-time, bi-directional communication. Clients establish a persistent connection with the WebSocket/Long Polling Servers. This is the preferred method for low-latency updates.
*   **Long Polling/Server-Sent Events (SSE)**: As a fallback for older browsers or specific scenarios where WebSockets are not feasible.
*   **Mobile Push Notifications (APNS/FCM)**: For mobile apps, integrate with platform-specific push notification services (Apple Push Notification Service, Firebase Cloud Messaging) for background notifications when the app is not active.

**2. How the backend would push notifications:**

*   **Notification Producer**: Any service that needs to send a notification (e.g., a new order service, a social media service) would publish a notification event to the **Message Queue**. This decouples the producer from the notification delivery mechanism.
*   **Notification Service (Consumer)**: This service subscribes to the Message Queue. When it receives a notification event:
    *   It persists the notification in the **Database**.
    *   It looks up the active user connections (from **Cache** or Database).
    *   It then pushes the notification to the relevant **WebSocket/Long Polling Servers** which are maintaining the client connections.
    *   For mobile, it would send the notification payload to APNS/FCM.

**3. How to handle millions of concurrent connections:**

*   **Horizontal Scaling of WebSocket/Long Polling Servers**: Deploy multiple instances of these servers behind a **Load Balancer** (e.g., Nginx, HAProxy) that supports sticky sessions or WebSocket proxying. Each server can handle a large number of concurrent connections.
*   **Distributed Connection Management**: The WebSocket servers need a way to know which user is connected to which server. A **Cache** (like Redis) can store this mapping (e.g., `userId -> serverId/connectionId`). When the Notification Service needs to send a notification, it queries the cache to find the correct server(s) to send the message to.
*   **Message Queue for Fan-out**: The Message Queue is critical for fanning out notifications efficiently to potentially millions of connected clients. The Notification Service publishes to the queue, and the WebSocket servers consume from it.
*   **Stateless Application Servers**: Keep the Notification Service and other backend services stateless to allow for easy horizontal scaling.

**4. The data model for storing notifications:**

*   **Database Choice**: A NoSQL database (e.g., MongoDB, Cassandra) might be suitable for its flexibility and scalability with high write/read volumes, especially for storing potentially large numbers of notifications per user. A relational database could also work, but might require more careful scaling.
*   **Notification Schema (Example)**:
    ```
    Notification {
        id: UUID (Primary Key)
        userId: UUID (Index for quick lookup)
        type: String (e.g., "message", "alert", "promotion")
        title: String
        body: String
        timestamp: DateTime (Index for chronological order)
        isRead: Boolean (Index for unread count)
        link: String (Optional URL)
        metadata: JSON (Flexible field for additional data)
    }
    ```
*   **User Connection Mapping (in Cache/Database)**:
    ```
    UserConnection {
        userId: UUID (Primary Key)
        connectionId: String (WebSocket connection ID)
        serverId: String (ID of the WebSocket server handling the connection)
        lastActive: DateTime
    }
    ```
*   **Indexes**: Crucial for efficient querying (e.g., `userId` and `timestamp` for retrieving a user's notifications, `isRead` for unread counts).

**Trade-offs:**

*   **Complexity vs. Scalability**: This distributed architecture is more complex than a monolithic approach but offers significantly higher scalability and resilience.
*   **Real-time vs. Cost**: Maintaining persistent WebSocket connections can be resource-intensive, impacting cost. Mobile push notifications are more cost-effective for non-active users.
*   **Consistency vs. Latency**: For notifications, eventual consistency is often acceptable (a notification might arrive slightly delayed but will eventually arrive), allowing for lower latency and high availability.

This high-level design provides a foundation for building a robust and scalable real-time notification system.