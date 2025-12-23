---
title: "Modern Java Deployment: Docker and Kubernetes"
description: "Master the journey from jar to container. Learn to Dockerize Spring Boot apps and deploy them at scale using Kubernetes."
pubDate: "9 6 2025"
published: true
tags:
  ["java", "docker", "kubernetes", "k8s", "eks", "devops", "cloud-computing"]
---

### The End of "It Works on My Machine"

Containerization has revolutionized how Java applications are deployed. By packaging the JRE and dependencies into a single image, you ensure identical behavior across development, staging, and production.

### Core Concepts

#### 1. Docker

An platform to develop, ship, and run applications inside isolated environments called **Containers**.

- **Dockerfile**: The recipe for your image.
- **Image**: The read-only template.
- **Container**: The running instance.

#### 2. Kubernetes (K8s)

An orchestration system for managing clusters of containers. It handles scaling, self-healing (restarting failed containers), and load balancing.

---

### Practice Exercise: From Code to Cluster

#### Step 1: The Dockerfile

We'll use a multi-stage build to keep the final image small.

```dockerfile
# Stage 1: Build
FROM maven:3.9-eclipse-temurin-17 AS build
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
COPY --from=build target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

#### Step 2: Kubernetes Deployment (YAML)

Define how many replicas you want and how to access them.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: spring-app
  template:
    metadata:
      labels:
        app: spring-app
    spec:
      containers:
        - name: spring-app
          image: myregistry/spring-app:latest
          ports:
            - containerPort: 8080
---
apiVersion: v1
kind: Service
metadata:
  name: spring-service
spec:
  selector:
    app: spring-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

---

### Why This Works

- **Immutability**: Once an image is built, it never changes. This eliminates "Configuration Drift" between environments.
- **Orchestration**: Kubernetes monitors your pods. If one crashes, it instantly spins up a replacement. If traffic spikes, you can scale from 3 to 100 replicas with a single command.

### Performance Tip: JVM Container Awareness

Older versions of Java (pre-10) were not aware of container resource limits (CPU/RAM). They would see the total memory of the host machine and potentially crash the container. Always use **Java 17+** and alpine-based small images to minimize start-up time and security surface area.

### Summary

Mastering Docker and Kubernetes is a required skill for any modern backend developer. By containerizing your Java service, you transform it from a "fragile script" into a "resilient cloud-native component."
