---
title: "The Spring Application Lifecycle: From Context to Exit"
description: "Take control of your application's startup and shutdown. Learn about ApplicationContext, SmartLifecycle, and CommandLineRunner."
pubDate: "9 6 2025"
published: true
tags: ["java", "spring-boot", "application-context", "lifecycle", "backend"]
---

### More Than Main()

In a Spring Boot application, the `main` method is just a trigger. The real orchestration happens inside the **ApplicationContext**. Understanding how Spring initializes beans and handles shutdown is critical for production reliability.

### Core Concepts

#### 1. ApplicationContext

The brain of Spring. It manages the lifecycle of all beans, from instantiation to destruction. It also provides features like Internationalization (i21n) and Event Publication.

#### 2. Startup Hooks

- **`CommandLineRunner`**: Runs a block of code immediately after the context is fully refreshed. Perfect for initial data loading or health checks.
- **`@PostConstruct`**: Runs after an individual bean is initialized and its dependencies injected.

#### 3. Shutdown Hooks

- **`@PreDestroy`**: Runs before a bean is destroyed (e.g., to close a custom file handle).
- **`SmartLifecycle`**: Allows you to define startup and shutdown **phases**, ensuring that (for example) your database connection is not closed _before_ your message consumer stops.

---

### Practice Exercise: A Graceful Background Worker

We will implement a task that starts automatically on startup and stops gracefully on shutdown.

#### Step 1: The Background Service

```java
@Component
public class WorkerService implements CommandLineRunner, AutoCloseable {
    private boolean running = true;

    @Override
    public void run(String... args) {
        System.out.println("Worker starting...");
        new Thread(() -> {
            while (running) {
                System.out.println("Processing...");
                try { Thread.sleep(1000); } catch (Exception e) {}
            }
        }).start();
    }

    @Override
    public void close() {
        System.out.println("Worker stopping gracefully...");
        this.running = false;
    }
}
```

#### Step 2: The Logic phases

If you need finer control, use `SmartLifecycle`:

```java
@Component
public class MyLifecycle implements SmartLifecycle {
    private boolean running = false;

    @Override
    public void start() {
        System.out.println("Starting in phase: " + getPhase());
        running = true;
    }

    @Override
    public void stop() {
        running = false;
    }

    @Override
    public boolean isRunning() { return running; }

    @Override
    public int getPhase() { return 1000; } // Higher phases start later and stop earlier
}
```

---

### Why This Works

- **Order of Execution**: Spring first scans and creates all beans. Then it calls `@PostConstruct`. Finally, once the `ApplicationContext` is "Refreshed," it calls all `CommandLineRunner` beans.
- **Graceful Shutdown**: When the JVM receives a SIGTERM (from Docker/K8s), Spring initiates the destruction phase. If you've used `SmartLifecycle`, you can ensure that your app stops receiving traffic _before_ it starts killing database connections.

### Summary

The Spring Application Context is a complex orchestration engine. By mastering its lifecycle hooks, you ensure that your Java services are predictable, resilient to restarts, and "good citizens" in a containerized environment.
