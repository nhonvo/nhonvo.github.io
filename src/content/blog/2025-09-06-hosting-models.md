---
title: "Hosting Models (Kestrel, IIS, Docker)"
description: "Understand the role of the reverse proxy and in-process vs. out-of-process hosting."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Mind Map Summary

- **Core Web Server: Kestrel**
  - **What**: The default, cross-platform, high-performance web server included with ASP.NET Core.
  - **Role**: The in-process server that directly handles your application's HTTP requests.
  - **Best Practice**: In production, Kestrel should be run behind a more robust **reverse proxy server**.
- **Reverse Proxy Server**
  - **Examples**: IIS (Windows), Nginx (Linux), Apache (Linux), YARP.
  - **Role**: Sits in front of Kestrel, receives requests from the internet, and forwards them to Kestrel.
  - **Key Benefits**:
    - **Security**: Can handle SSL/TLS termination, protect against attacks, and hide Kestrel from the public internet.
    - **Load Balancing**: Distributes traffic across multiple instances of your application.
    - **Process Management**: Can start and stop your application process.
- **Hosting Models (Mainly for IIS)**
  - **In-Process**: 
    - **How**: The app runs inside the IIS worker process (`w3wp.exe`).
    - **Pros**: Higher performance due to no network hop between IIS and Kestrel.
  - **Out-of-Process**:
    - **How**: The app runs in its own process (`dotnet.exe`), and IIS acts as a classic reverse proxy.
    - **Pros**: Better isolation. This is the only model for non-IIS reverse proxies and containers.
- **Containerization (Docker)**
  - **What**: Packaging an application and its dependencies into a standardized, isolated unit (a container).
  - **Benefit**: **Consistency**. The application runs the exact same way on a developer's laptop, a testing server, and in production.
  - **Mechanism**: A `Dockerfile` provides the instructions to build a container image.

### Core Concepts

#### 1. Kestrel
Kestrel is the web server that is included and enabled by default in ASP.NET Core project templates. It's extremely fast and is responsible for running your application code. However, it is an edge server, meaning it's designed to be run on a protected internal network. For production internet-facing scenarios, it lacks some of the advanced features of a full-fledged web server like IIS or Nginx, such as sophisticated request filtering, caching, and process management.

#### 2. The Reverse Proxy
This is the recommended setup for production. A battle-hardened server like IIS, Nginx, or Apache sits on the edge, exposed to the internet. It receives an incoming HTTP request, may perform some initial processing (like SSL decryption), and then forwards the request to the Kestrel server running on a different port on the same machine. This architecture provides a valuable layer of security and features that Kestrel is not designed for.

#### 3. In-Process vs. Out-of-Process Hosting
This choice primarily applies when using IIS on Windows.
- **In-Process**: This is the default and recommended model for IIS. Your app's code is loaded directly into the IIS worker process. This provides the best performance because the request doesn't need to be proxied over a network loopback connection; it's handled within the same process.
- **Out-of-Process**: In this model, IIS acts as a true reverse proxy. Your application runs in its own `dotnet.exe` process, listening on a port, and IIS forwards requests to it. This was the only model in early versions of ASP.NET Core and is still useful for scenarios requiring greater process isolation or when using a reverse proxy other than IIS.

#### 4. Docker
Docker provides a way to containerize your application. A container packages your compiled code along with all its dependencies (like the .NET runtime itself) into a single, isolated, and portable unit. This solves the classic "it works on my machine" problem because the container provides a consistent environment. Docker is the foundation of modern cloud-native applications and microservices, allowing for easy scaling and deployment with orchestrators like Kubernetes.

### Practice Exercise

Write a simple `Dockerfile` for an ASP.NET Core API project. The Dockerfile should build the project and set up the final runtime image. Build the image and run it in a container, ensuring you can access the API from your host machine.

### Answer

#### 1. The `Dockerfile`

Create a file named `Dockerfile` (no extension) in the root of your ASP.NET Core API project.

```dockerfile
# Stage 1: Build the application
# Use the official .NET SDK image as a build environment
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
# Use the smaller ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy the published output from the publish stage
COPY --from=publish /app/publish .

# Expose port 8080 for the app
# ASP.NET Core images default to listening on port 8080
EXPOSE 8080

# Define the entry point for the container
ENTRYPOINT ["dotnet", "MyApiProject.dll"]
```

*(Note: Replace `MyApiProject.csproj` and `MyApiProject.dll` with the actual names of your project files.)*

#### 2. Build and Run the Container

Open a terminal in the root of your project (where the `Dockerfile` is located) and run the following commands:

```bash
# 1. Build the Docker image
# The -t flag tags the image with a name (e.g., my-api-image)
# The . at the end specifies the build context (the current directory)
docker build -t my-api-image .

# 2. Run the Docker container
# The -d flag runs the container in detached mode (in the background)
# The -p flag maps port 8080 on your host machine to port 8080 in the container
docker run -d -p 8080:8080 --name my-api-container my-api-image
```

#### 3. Verification

Your API is now running inside a Docker container. You can access it from your host machine's browser or a tool like Postman at `http://localhost:8080/{your-endpoint}`. For example, if you have a default weather forecast endpoint, you would navigate to `http://localhost:8080/weatherforecast`.

This multi-stage `Dockerfile` is a best practice because it creates a small, optimized final image that only contains the application and its runtime dependencies, not the entire .NET SDK, making it more secure and efficient.