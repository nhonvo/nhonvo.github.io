---
title: "Containerization & Orchestration (Docker, AKS vs. EKS)"
description: "Explain how to containerize an application with Docker. Compare Azure Kubernetes Service (AKS) and Amazon Elastic Kubernetes Service (EKS) for managing containerized applications."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "DevOps",
    "Docker",
    "Kubernetes",
    "Containers",
    "Orchestration",
    "Cloud Native",
    "Microservices",
    "AKS",
    "EKS",
  ]
---

## Mind Map Summary

- **Containerization (The "What")**
  - **Core Tool**: **Docker**.
  - **Concept**: Packaging an application with all its dependencies (runtime, libraries, config) into a single, isolated, portable unit called a **container**.
  - **Key Components**:
    - `Dockerfile`: A text file with instructions to build an image.
    - `Image`: A read-only template.
    - `Container`: A running instance of an image.
  - **Benefit**: Solves the "it works on my machine" problem. Ensures consistency across all environments.
- **Container Orchestration (The "How")**
  - **Core Tool**: **Kubernetes (K8s)**.
  - **Problem It Solves**: Managing one or two containers is easy. Managing hundreds or thousands at scale is impossible without an orchestrator.
  - **What It Does**: Automates the deployment, scaling, healing, and networking of containerized applications.
  - **Key Kubernetes Objects**:
    - `Pod`: The smallest deployable unit; typically holds one container.
    - `Deployment`: Manages a set of identical Pods, handling scaling and updates.
    - `Service`: Provides a stable network endpoint (IP address and port) to access the Pods.
- **Managed Kubernetes (The "Where")**
  - **What**: Cloud services that manage the complex Kubernetes control plane for you.
  - **Examples**: **Azure Kubernetes Service (AKS)** and **Amazon Elastic Kubernetes Service (EKS)**.
  - **Benefit**: You focus on your application (Deployments, Services), and the cloud provider handles the difficult parts of running Kubernetes itself (the master nodes, etcd database, etc.).

## Core Concepts

### 1. Docker: Standardizing the Unit of Deployment

Before containers, we deployed applications to virtual machines. This meant dealing with inconsistencies between environments—a different OS patch level or a different library version between dev and prod could cause failures. Docker solves this by creating a standardized package. The `Dockerfile` is a recipe that defines everything needed to run the application. This recipe is used to build an `Image`. This image can then be run as a `Container` on any machine that has Docker installed, guaranteeing that the environment is identical everywhere.

### 2. Kubernetes: Managing Containers at Scale

Kubernetes is an open-source platform that has become the industry standard for container orchestration. It allows you to define the desired state of your application in declarative YAML files. For example, "I want 3 replicas of my API container running, and I want them to be accessible to the internet on port 80." Kubernetes then works continuously to make the actual state of the cluster match your desired state. If a container crashes, Kubernetes automatically restarts it (self-healing). If traffic increases, you can tell Kubernetes to scale up the number of replicas (scaling).

### 3. AKS vs. EKS: The Managed Kubernetes Battle

Running a Kubernetes cluster from scratch is incredibly complex. You have to manage master nodes, worker nodes, networking, and the distributed `etcd` database that stores the cluster's state. This is where managed services like AKS and EKS come in.

- **The Core Offering is the Same**: Both AKS and EKS provide a fully managed Kubernetes control plane. They handle the security, maintenance, and scaling of the complex backend components of Kubernetes, leaving you responsible only for the worker nodes (where your application pods run) and the applications themselves.
- **The Key Difference is Ecosystem Integration**:
  - **AKS** has deep integration with other Azure services, such as Azure Active Directory for authentication, Azure Monitor for logging and metrics, and Azure Policy for governance.
  - **EKS** is tightly integrated with the AWS ecosystem, using AWS IAM for authentication, Amazon CloudWatch for monitoring, and integrating with AWS VPC for networking.
- **The Choice**: The decision between AKS and EKS usually comes down to which cloud ecosystem your organization is already invested in. Both are robust, production-ready, and conform to the standards of the Cloud Native Computing Foundation (CNCF).

## Practice Exercise

Create a multi-stage `Dockerfile` for an ASP.NET Core application. Then, write a basic Kubernetes manifest to deploy this container image to either AKS or EKS.

## Answer (Building and Deploying a C# Container)

### 1. The Multi-Stage `Dockerfile`

This `Dockerfile` uses a multi-stage build, which is a best practice. The first stage uses the large .NET SDK image to build the application, and the second stage copies only the necessary published artifacts into a small, secure ASP.NET runtime image for the final product.

```dockerfile
# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers to leverage Docker cache
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Stage 2: Build the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/out .

# The port the application will listen on
EXPOSE 8080

ENTRYPOINT ["dotnet", "YourAppName.dll"]
```

_(Note: Replace `YourAppName.dll` with the actual name of your project's output DLL.)_

### 2. The Kubernetes Manifest (`deployment.yaml`)

This single YAML file defines two essential Kubernetes objects:

1. **Deployment**: Manages the Pods. It ensures that 3 replicas of our container are always running.
2. **Service**: Creates a stable network endpoint (`LoadBalancer`) to expose the Deployment to the internet.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api-deployment
spec:
  replicas: 3 # We want 3 instances of our app running
  selector:
    matchLabels:
      app: my-api
  template:
    metadata:
      labels:
        app: my-api
    spec:
      containers:
        - name: my-api-container
          image: your-container-registry/my-api-image:v1 # IMPORTANT: Replace with your actual image path
          ports:
            - containerPort: 8080 # The port exposed in the Dockerfile
---
apiVersion: v1
kind: Service
metadata:
  name: my-api-service
spec:
  type: LoadBalancer # This will create a public IP and load balancer in the cloud provider (AKS/EKS)
  selector:
    app: my-api # This selector connects the Service to the Deployment's Pods
  ports:
    - protocol: TCP
      port: 80 # The public port exposed by the service
      targetPort: 8080 # The port the container is listening on
```

### Explanation

1. **Build and Push**: You would first build the Docker image using `docker build` and then push it to a container registry like Azure Container Registry (ACR) or Amazon Elastic Container Registry (ECR).
2. **Apply the Manifest**: You would then connect to your AKS or EKS cluster using `kubectl` and apply this manifest with the command: `kubectl apply -f deployment.yaml`.
3. **What Happens**: Kubernetes reads the file. The `Deployment` controller creates 3 Pods, pulling your container image for each one. The `Service` controller provisions a cloud load balancer. This load balancer gets a public IP address and is configured to route external traffic on port 80 to the internal port 8080 on any of your healthy Pods. Kubernetes now ensures that 3 replicas are always running and accessible via the service's public IP.
