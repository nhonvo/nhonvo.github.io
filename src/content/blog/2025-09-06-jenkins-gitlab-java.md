---
title: "Modern CI/CD Pipelines with Jenkins and GitLab for Java"
description: "Master the art of Continuous Integration and Deployment using Jenkins and GitLab. Learn to automate Java builds, tests, and deployments."
pubDate: "9 6 2025"
published: true
tags: ["java", "jenkins", "gitlab", "cicd", "devops", "maven", "docker"]
---

### CI/CD for Java Development

In a high-velocity development environment, manual builds are a bottleneck. **Jenkins** and **GitLab CI/CD** are the industry standards for automating the path from code commit to production. This guide focuses on setting up a resilient pipeline using Jenkins.

### Core Concepts

#### 1. Continuous Integration (CI)

The practice of merging developer code into a shared repository several times a day. Each merge is validated by an automated build and test suite to detect errors as early as possible.

#### 2. Continuous Delivery/Deployment (CD)

- **Delivery**: Automating the release process so code can be deployed to production at any time.
- **Deployment**: Every change that passes the pipeline is automatically deployed to production.

#### 3. Jenkins vs. GitLab CI

- **Jenkins**: Highly flexible, plugin-rich, and self-hosted. Best for complex, heterogeneous environments.
- **GitLab CI**: Integrated deeply with the GitLab SCM, uses YAML-based configuration (`.gitlab-ci.yml`), and is typically easier to set up for GitLab users.

---

### Practice Exercise: Local Jenkins Pipeline

We will set up a Jenkins instance using Docker and create a Declarative Pipeline for a Java/Maven project.

#### Step 1: Run Jenkins in Docker

```bash
docker run -p 8080:8080 -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -d --name my-jenkins jenkins/jenkins:lts
```

_Note: Retrieve the initial admin password using `docker logs my-jenkins`._

#### Step 2: Configure Jenkins

1. Install suggested plugins.
2. Ensure the **Maven Integration** and **Git** plugins are installed.
3. Define Maven in "Global Tool Configuration" (e.g., name: `maven-3.9`, version: latest).

#### Step 3: Create a Jenkinsfile

Place this `Jenkinsfile` in the root of your Java repository:

```groovy
pipeline {
    agent any

    tools {
        maven 'maven-3.9'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://gitlab.com/your-user/java-demo.git'
            }
        }

        stage('Build') {
            steps {
                sh 'mvn clean compile'
            }
        }

        stage('Test') {
            steps {
                sh 'mvn test'
            }
        }

        stage('Package') {
            steps {
                sh 'mvn package -DskipTests'
            }
        }
    }

    post {
        always {
            junit '**/target/surefire-reports/*.xml'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs.'
        }
    }
}
```

### Why This Works

- **Isolation**: Running Jenkins in Docker ensures your build environment remains clean and reproducible.
- **Declarative Syntax**: The `Jenkinsfile` provides a versioned, human-readable definition of the entire build process (Pipeline as Code).
- **Post-Build Actions**: The `junit` step ensures that test results are rendered natively in the Jenkins UI, making it easy to identify regressions.

### Performance Tip

Use a **Shared Library** in Jenkins to reuse common pipeline logic across multiple microservices. This prevents "Jenkinsfile sprawl" and ensures consistent security and quality checks across the organization.

### Summary

Transitioning from manual scripts to an orchestrated pipeline with Jenkins or GitLab CI significantly reduces "Mean Time to Recovery" (MTTR) and increases development velocity.
