---
title: "Modern CI/CD Pipelines"
description: "Discuss the essential components of a CI/CD pipeline, including automated testing, quality gates, and deployment strategies."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "DevOps",
    "CI/CD",
    "Automation",
    "Jenkins",
    "GitHub Actions",
    "Azure DevOps",
    "Docker",
    "Pipelines",
    "Deployment",
  ]
---

## Mind Map Summary

- **CI/CD (Continuous Integration / Continuous Delivery/Deployment)**
  - **Continuous Integration (CI)**
    - **What**: Developers frequently merge code changes into a central repository. Automated builds and tests run on each merge.
    - **Goal**: Detect integration issues early and often. Maintain a healthy codebase.
  - **Continuous Delivery (CD)**
    - **What**: An extension of CI. Code changes are automatically built, tested, and prepared for release to production.
    - **Goal**: Ensure the software is always in a deployable state. Manual approval is still required for production deployment.
  - **Continuous Deployment (CD)**
    - **What**: An extension of Continuous Delivery. Every change that passes all stages of the pipeline is automatically released to production.
    - **Goal**: Rapid delivery of features to users. No human intervention.
- **CI/CD Tools**
  - **Azure DevOps Pipelines**
    - **What**: A comprehensive set of developer services, with Pipelines being its CI/CD component.
    - **Language**: YAML for pipeline definitions.
    - **Pros**: Deep integration with Azure services, rich features for enterprise-scale projects (e.g., release gates, approvals).
  - **GitHub Actions**
    - **What**: A workflow automation platform directly integrated into GitHub repositories.
    - **Language**: YAML for workflow definitions.
    - **Pros**: Native to GitHub, large and growing marketplace of pre-built actions, strong community support.

## Core Concepts

### 1. Continuous Integration (CI)

CI is a development practice where developers integrate code into a shared repository frequently, preferably several times a day. Each integration is then verified by an automated build and automated tests. This helps teams detect and address integration errors quickly, leading to a more stable codebase and faster development cycles.

### 2. Continuous Delivery (CD) vs. Continuous Deployment (CD)

- **Continuous Delivery**: Builds on CI. After the build and tests pass, the application is automatically prepared for release. This means it's packaged, configured, and ready to be deployed to any environment (staging, production) at any time. The key here is that the _deployment to production_ is still a manual step, often requiring a human to click a button.
- **Continuous Deployment**: Takes Continuous Delivery a step further. Every change that successfully passes all stages of the pipeline (build, test, security scans, etc.) is automatically deployed to production without any human intervention. This is the ultimate goal for many agile teams, enabling very rapid iteration and feedback.

### 3. Azure DevOps Pipelines

Azure DevOps is a suite of tools that covers the entire software development lifecycle. Azure Pipelines is its CI/CD component. It allows you to define your build and release pipelines using YAML. It has a vast array of built-in tasks for building, testing, and deploying to various targets, especially Azure services. It's a strong choice for organizations already using Azure or needing a comprehensive ALM (Application Lifecycle Management) solution.

### 4. GitHub Actions

GitHub Actions allows you to automate, customize, and execute your software development workflows directly in your repository. You can discover, create, and share actions to perform any job you'd like, including CI/CD. Workflows are defined in YAML files and are triggered by events in your repository (e.g., `push`, `pull_request`). Its tight integration with GitHub and its growing marketplace of actions make it a very popular choice, especially for open-source projects and teams already heavily invested in the GitHub ecosystem.

## Practice Exercise

Create a CI/CD pipeline using either Azure DevOps or GitHub Actions for a .NET application. The pipeline should automatically build, test, and deploy the application to an Azure App Service upon a push to the main branch.

## Answer

We will use **GitHub Actions** for this exercise, as it's directly integrated with GitHub repositories.

### Prerequisites

1. **Azure Subscription**: You need an Azure subscription.
2. **Azure App Service**: Create an Azure App Service instance where your .NET application will be deployed.
3. **GitHub Repository**: Your .NET application code should be in a GitHub repository.
4. **Azure Service Principal**: You need to create an Azure Service Principal and configure it as a GitHub Secret for authentication.
   - Go to your Azure App Service in the Azure Portal.
   - Go to "Deployment Center" -> "GitHub Actions".
   - It will guide you to create a Service Principal and set up the GitHub Secret (usually named `AZURE_CREDENTIALS`).

### The GitHub Actions Workflow (`.github/workflows/main_deploy.yml`)

Create a file named `main_deploy.yml` inside the `.github/workflows/` directory in your repository.

```yaml
name: Deploy .NET App to Azure App Service

on:
  push:
    branches:
      - main # Trigger this workflow on pushes to the main branch

env:
  AZURE_WEBAPP_NAME: your-app-service-name # Replace with your App Service name
  AZURE_WEBAPP_PACKAGE_PATH: "./publish" # Path to the published app
  DOTNET_VERSION: "8.0.x" # Specify your .NET version
  PROJECT_PATH: "YourProjectName.csproj" # Replace with your .NET project file path

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4 # Checkout the repository code

      - name: Setup .NET Core
        uses: actions/setup-dotnet@v4
        with:
          dotnet-version: ${{ env.DOTNET_VERSION }}

      - name: Restore dependencies
        run: dotnet restore ${{ env.PROJECT_PATH }}

      - name: Build project
        run: dotnet build ${{ env.PROJECT_PATH }} --configuration Release --no-restore

      - name: Run tests
        run: dotnet test ${{ env.PROJECT_PATH }} --no-build --verbosity normal

      - name: Publish application
        run: dotnet publish ${{ env.PROJECT_PATH }} --configuration Release --output ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

      - name: Deploy to Azure Web App
        uses: azure/webapps-deploy@v2
        with:
          app-name: ${{ env.AZURE_WEBAPP_NAME }}
          slot-name: "production" # Or your deployment slot name
          package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }} # Alternative to AZURE_CREDENTIALS
          # For AZURE_CREDENTIALS, use:
          # credentials: ${{ secrets.AZURE_CREDENTIALS }}
```

### Explanation of the Workflow

1. **`name`**: The name of your workflow, visible in the GitHub Actions tab.
2. **`on: push: branches: [main]`**: This defines the trigger. The workflow will run automatically every time code is pushed to the `main` branch.
3. **`env`**: Defines environment variables that can be reused throughout the workflow.
4. **`jobs: build-and-deploy`**: A workflow consists of one or more jobs. This job will build and deploy our application.
5. **`runs-on: ubuntu-latest`**: Specifies the virtual machine environment where the job will run.
6. **`steps`**: A job consists of a sequence of steps.
   - **`actions/checkout@v4`**: A pre-built action that checks out your repository code onto the runner.
   - **`actions/setup-dotnet@v4`**: Sets up the specified .NET SDK version on the runner.
   - **`dotnet restore`**: Restores NuGet package dependencies for your project.
   - **`dotnet build`**: Compiles your .NET application.
   - **`dotnet test`**: Runs your unit tests. If tests fail, the pipeline will stop here.
   - **`dotnet publish`**: Publishes your application, creating the deployable artifacts in the `publish` folder.
   - **`azure/webapps-deploy@v2`**: A pre-built action provided by Azure for deploying to Azure App Service.
     - `app-name`: The name of your Azure App Service.
     - `package`: The path to your published application artifacts.
     - `publish-profile` or `credentials`: Used for authentication to Azure. `AZURE_CREDENTIALS` is a GitHub Secret containing the JSON output of an Azure Service Principal. `AZURE_WEBAPP_PUBLISH_PROFILE` is another secret that can hold the publish profile XML from Azure.

This workflow provides a robust CI/CD pipeline that automatically builds, tests, and deploys your .NET application to Azure App Service whenever changes are pushed to your main branch.
