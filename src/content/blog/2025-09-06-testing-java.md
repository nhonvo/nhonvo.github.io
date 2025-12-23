---
title: "The Java Testing Pyramid: JUnit, Mockito, and Testcontainers"
description: "Master the art of automated testing in Java. Learn how to use Mockito for isolation and Testcontainers for reliable integration testing with real databases."
pubDate: "9 6 2025"
published: true
tags:
  [
    "Java",
    "JUnit",
    "Mockito",
    "Testcontainers",
    "Testing",
    "QA",
    "DevOps",
    "Software Quality",
    "Spring Boot",
    "Docker",
  ]
---

## Quality is Not an Accident

In professional Java development, your code is only as good as your tests. A robust test suite consists of fast Unit tests and reliable Integration tests. This guide explores the tools that make this possible and how to structure your testing "pyramid."

## Core Concepts

### 1. Unit Testing (JUnit 5 + Mockito)

Testing the smallest unit of code (a single method or class) in total isolation.

- **JUnit 5**: The standard test runner for Java.
- **Mockito**: A framework used to create "mocks" or "stubs" that simulate external dependencies like database repositories or external web clients.

### 2. Integration Testing (Spring Boot Test + Testcontainers)

Testing how different modules of your application interact with infrastructure.

- **Testcontainers**: A library that uses Docker to spin up real instances of PostgreSQL, Redis, or Kafka during your test execution. This ensures you are testing against "reality" rather than a simulated version of your infrastructure.

## Practice Exercise: Testing a Service with Mocks vs. Reality

We will test a `UserService` that interacts with a database.

### Step 1: Unit Test with Mockito (Fast & Isolated)

```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository repo;

    @InjectMocks
    private UserService service;

    @Test
    void testGetUser_ShouldReturnUser_WhenExists() {
        // Arrange
        when(repo.findById(1L)).thenReturn(Optional.of(new User("Nhon")));

        // Act
        User result = service.getUser(1L);

        // Assert
        assertEquals("Nhon", result.getName());
        verify(repo, times(1)).findById(1L);
    }
}
```

### Step 2: Integration Test with Testcontainers (Reliable & Realistic)

This spins up a REAL PostgreSQL instance in a Docker container.

```java
@SpringBootTest
@Testcontainers
class UserIntegrationTest {
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void setProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private UserRepository repo;

    @Test
    void testSave_ShouldPersistToRealDatabase() {
        repo.save(new User("Truong Nhon"));
        assertEquals(1, repo.count());
    }
}
```

## Why This Works

- **Behavior Mapping**: Mockito allows you to define exactly how a dependency should behave, making your unit tests lightning-fast and focused purely on business logic.
- **Portability**: Testcontainers solves the "works on my machine" problem. If you have Docker, your integration tests will run identically in your local IDE, on a colleague's machine, and in the CI/CD pipeline.

## Testing Tip: The "Spy"

Use `@Spy` when you want to call real methods of a class but mock only a specific one. Use this sparingly, as it can lead to fragile tests that depend on internal implementation details.

## Summary

A balanced testing pyramid uses **Mockito** for logic-heavy classes and **Testcontainers** for infrastructure-heavy integrations. By mastering both, you ensure that your Java application is not only correct today but resilient to changes in the future.
