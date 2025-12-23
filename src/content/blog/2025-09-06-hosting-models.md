---
title: "ASP.NET Core Hosting Models"
description: "Explore different hosting options for ASP.NET Core, including In-Process, Out-of-Process, and Kestrel."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "ASP.NET Core",
    "Hosting",
    "Kestrel",
    "IIS",
    "Docker",
    "Performance",
    "Deployment",
    "Reverse Proxy",
    "DevOps",
  ]
---

## Mind Map Summary

- **Core Web Server: Kestrel**
  - **What**: The default, cross-platform, high-performance web server included with ASP.NET Core.
  - **Role**: The in-process server that directly handles your application's HTTP requests.
  - **Best Practice**: In production, Kestrel should be run behind a more robust **reverse proxy server**.
- **Reverse Proxy Server**
  - **Examples**: IIS (Windows), Nginx (Linux), Apache (Linux), YARP.
  - **Role**: Sits in front of Kestrel, receives requests from the internet, and forwards them to Kestrel.
  - **Key Benefits**:
    - **Security**: Can handle SSL/TLS termination, protect against attacks.
    - **Load Balancing**: Distributes traffic across multiple instances.
    - **Process Management**: Can start and stop your application process.
- **Hosting Models (Mainly for IIS)**
  - **In-Process**: The app runs inside the IIS worker process (`w3wp.exe`). Best performance.
  - **Out-of-Process**: The app runs in its own process (`dotnet.exe`), and IIS acts as a classic reverse proxy.
- **Containerization (Docker)**
  - **What**: Packaging an application and its dependencies into a standardized, isolated unit.
  - **Benefit**: **Consistency** across all environments.

## Core Concepts

### 1. Kestrel

Kestrel is the web server that is included and enabled by default in ASP.NET Core project templates. It's extremely fast and is responsible for running your application code. However, it is an edge server, meaning it's designed to be run on a protected internal network. For production internet-facing scenarios, it lacks some of the advanced features of a full-fledged web server like IIS or Nginx, such as sophisticated request filtering, caching, and process management.

### 2. The Reverse Proxy

This is the recommended setup for production. A battle-hardened server like IIS, Nginx, or Apache sits on the edge, exposed to the internet. It receives an incoming HTTP request, may perform some initial processing (like SSL decryption), and then forwards the request to the Kestrel server running on a different port on the same machine. This architecture provides a valuable layer of security and features that Kestrel is not designed for.

### 3. In-Process vs. Out-of-Process Hosting

This choice primarily applies when using IIS on Windows.

- **In-Process**: This is the default and recommended model for IIS. Your app's code is loaded directly into the IIS worker process. This provides the best performance because the request doesn't need to be proxied over a network loopback connection; it's handled within the same process.
- **Out-of-Process**: In this model, IIS acts as a true reverse proxy. Your application runs in its own `dotnet.exe` process, listening on a port, and IIS forwards requests to it.

### 4. Docker

Docker provides a way to containerize your application. A container packages your compiled code along with all its dependencies into a single, isolated, and portable unit. This solves the classic "it works on my machine" problem because the container provides a consistent environment. Docker is the foundation of modern cloud-native applications and microservices.

## Practice Exercise

Write a simple `Dockerfile` for an ASP.NET Core API project. The Dockerfile should build the project and set up the final runtime image. Build the image and run it in a container, ensuring you can access the API from your host machine.

## Answer (Dockerizing an ASP.NET Core Application)

### 1. The `Dockerfile`

Create a file named `Dockerfile` (no extension) in the root of your project.

```dockerfile
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["MyApiProject.csproj", "."]
RUN dotnet restore "MyApiProject.csproj"

# Copy the rest of the source code and build the application
COPY . .
RUN dotnet build "MyApiProject.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "MyApiProject.csproj" -c Release -o /app/publish

# Stage 2: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy the published output from the publish stage
COPY --from=publish /app/publish .

# Expose port 8080 for the app
EXPOSE 8080

# Define the entry point
ENTRYPOINT ["dotnet", "MyApiProject.dll"]
```

### 2. Build and Run the Container

Open a terminal in the root of your project and run:

```bash
# 1. Build the Docker image
docker build -t my-api-image .

# 2. Run the Docker container
docker run -d -p 8080:8080 --name my-api-container my-api-image
```

### 3. Verification

Your API is now running inside a Docker container. You can access it at `http://localhost:8080/weatherforecast`.

This multi-stage `Dockerfile` is a best practice because it creates a small, optimized final image that only contains the application and its runtime dependencies, not the entire .NET SDK, making it more secure and efficient.
