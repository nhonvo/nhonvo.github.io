---
title: "DevSecOps - Integrating Security into CI/CD"
description: "Explain the concept of DevSecOps ('Shift Left'). Discuss how to integrate security scanning tools into a CI/CD pipeline, including Static Application Security Testing (SAST), Dynamic Application Security Testing (DAST), and dependency scanning."
pubDate: "Sep 07 2025"
published: true
tags: ["Cloud & DevOps (Azure/AWS)", "DevSecOps", "CI/CD", "Security", "SAST", "DAST"]
---

### Mind Map Summary

- **Topic**: DevSecOps
- **Core Concepts**:
    - **Shift Left**: The practice of integrating security considerations and testing as early as possible in the development lifecycle.
    - **Static Application Security Testing (SAST)**: Analyzes source code for security vulnerabilities without executing the application.
    - **Dynamic Application Security Testing (DAST)**: Tests a running application for vulnerabilities by simulating external attacks.
    - **Dependency Scanning**: Scans application dependencies (e.g., NuGet packages, npm packages) for known vulnerabilities.
    - **Container Vulnerability Scanning**: Scans container images for known vulnerabilities in the OS and application layers.
- **Benefits**:
    - **Early Detection**: Finds and fixes vulnerabilities early, reducing the cost and effort of remediation.
    - **Improved Security Posture**: Builds security into the development process, resulting in more secure applications.
    - **Increased Developer Velocity**: Automates security testing, allowing developers to move faster without sacrificing security.
- **Tools**:
    - **SAST**: SonarQube, Veracode, Checkmarx
    - **DAST**: OWASP ZAP, Burp Suite, Netsparker
    - **Dependency Scanning**: OWASP Dependency-Check, Snyk, GitHub Dependabot
    - **Container Scanning**: Trivy, Clair, Aqua Security

### Practice Exercise

Modify a CI/CD pipeline (in Azure DevOps or GitHub Actions) to include a step that runs a container vulnerability scan on the built Docker image (e.g., using Trivy or a cloud provider's scanner). Configure the pipeline to fail if a critical vulnerability is found.

### Answer

**GitHub Actions Workflow with Trivy:**

```yaml
name: DevSecOps Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-scan:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Build Docker image
      run: docker build -t my-app:latest .

    - name: Run Trivy vulnerability scanner
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: 'my-app:latest'
        format: 'table'
        exit-code: '1'
        ignore-unfixed: true
        vuln-type: 'os,library'
        severity: 'CRITICAL,HIGH'
```

**Explanation:**

-   This workflow builds a Docker image and then uses the `aquasecurity/trivy-action` to scan the image for vulnerabilities.
-   `exit-code: '1'` causes the workflow to fail if any vulnerabilities are found.
-   `ignore-unfixed: true` tells Trivy to ignore vulnerabilities that do not have a fix available.
-   `vuln-type: 'os,library'` scans both the operating system packages and the application libraries.
-   `severity: 'CRITICAL,HIGH'` configures the workflow to fail only if critical or high-severity vulnerabilities are found.
