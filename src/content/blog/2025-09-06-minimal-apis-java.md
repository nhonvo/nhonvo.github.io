---
title: "Reactive Programming with Spring WebFlux"
description: "Going beyond the Servlet model. Learn to build non-blocking, asynchronous Java web applications using Spring WebFlux."
pubDate: "9 6 2025"
published: true
tags:
  [
    "java",
    "spring-boot",
    "webflux",
    "reactive-programming",
    "netty",
    "performance",
  ]
---

### The C10k Problem

Traditional Spring MVC uses a "Thread-per-Request" model. When you hit 10,000 concurrent requests, the memory overhead of those threads becomes unsustainable. **Spring WebFlux** solves this using the **Event Loop** pattern.

### Core Concepts

#### 1. Non-Blocking I/O

Instead of a thread waiting for a database response, it registers a "callback" and is freed to handle other requests. When the data is ready, the Event Loop triggers the recovery logic.

#### 2. Project Reactor (Mono and Flux)

- **Mono**: Represents 0 or 1 asynchronous result.
- **Flux**: Represents 0 to N asynchronous results (a stream).

---

### Practice Exercise: Building a Reactive Endpoint

We will create a simple weather service that returns a stream of temperature updates.

#### Step 1: The Reactive Controller

```java
@RestController
public class WeatherController {

    @GetMapping(value = "/weather/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Integer> streamWeather() {
        return Flux.interval(Duration.ofSeconds(1))
                   .map(i -> new Random().nextInt(30)); // Mocking temperature
    }
}
```

#### Step 2: Reactive Data Access

To get the full benefit, your database driver must also be reactive (e.g., R2DBC).

```java
public interface UserRepository extends R2dbcRepository<User, Long> {
    Flux<User> findByLastName(String lastName);
}
```

---

### Why This Works

- **Efficiency**: WebFlux runs on **Netty** by default. It uses a very small number of threads (usually equal to CPU cores) to handle a massive amount of concurrent connections.
- **Backpressure**: Reactive streams allow the consumer to tell the producer "slow down," preventing the application from being overwhelmed by data it can't process fast enough.

### When NOT to use WebFlux?

If your application is simple CRUD and your database driver is blocking (standard JDBC), WebFlux provides no performance benefit and adds significant complexity. Use **Spring MVC with Virtual Threads** (Java 21) instead for a much cleaner experience.

### Summary

Spring WebFlux is a surgical tool for high-concurrency, streaming, and low-latency scenarios. By mastering Mono and Flux, you unlock the ability to scale your Java applications far beyond the limits of traditional thread-based frameworks.
