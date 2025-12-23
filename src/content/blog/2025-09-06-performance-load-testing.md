---
title: "Performance and Load Testing (JMeter, k6)"
description: "Identify performance bottlenecks and use tools like JMeter or k6 to ensure system reliability under pressure."
pubDate: "9 6 2025"
published: true
tags:
  [
    "Performance Testing",
    "Load Testing",
    "JMeter",
    "k6",
    "Bottlenecks",
    "Scalability",
    "Optimization",
    "DevOps",
    "Site Reliability",
  ]
---

## Mind Map Summary

- **Topic**: Performance & Load Testing
- **Definition**: Evaluating how a system performs in terms of responsiveness, stability, and scalability under a particular workload.
- **Key Concepts**:
  - **Performance Testing**: General term for testing speed and stability.
  - **Load Testing**: Behavior under anticipated peak load.
  - **Stress Testing**: Pushing beyond limits to find breaking points.
  - **Scalability Testing**: Ability to scale out to meet demand.
  - **Soak Testing**: Long-duration testing to find memory leaks.
  - **Metrics**: Response Time, Throughput, Error Rate, Concurrency.
- **Benefits**:
  - Identifies performance bottlenecks early.
  - Ensures infrastructure reliability.
  - Improves UX by minimizing lag.
  - Reduces risk of production crashes.
- **Common Tools**:
  - **k6**: Modern, JS-scriptable, Go-based tool (highly recommended for developers).
  - **JMeter**: Industry-standard, Java-based GUI tool.
  - **Locust**: Python-based behavior-driven testing.

## Core Concepts

Performance and load testing verify _how well_ the system performs under pressure. Unlike functional tests, they focus on non-functional requirements.

**Load testing** focuses on simulating realistic user traffic to ensure stability. **Stress testing** pushes the system until it fails to observe how it recovers (or fails gracefully).

Tools like **k6** are preferred in modern DevOps because they are "code-first," making it easy to store test scripts in Git and run them as part of a CI/CD pipeline.

## Practice Exercise

Using **k6**, write a load test script that simulates 10 virtual users hitting an API endpoint for 30 seconds. Analyze the results, focusing on "p95" response times.

## Answer

### 1. The k6 Test Script (`load-test.js`)

```javascript
import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  // Simulate 10 virtual users (VUs)
  vus: 10,
  // Run the test for 30 seconds
  duration: "30s",
  // Pass/Fail criteria
  thresholds: {
    // 95% of requests must complete within 200ms
    http_req_duration: ["p(95)<200"],
    // The error rate must be below 1%
    http_req_failed: ["rate<0.01"],
  },
};

export default function () {
  // Make a GET request
  const res = http.get("http://localhost:5000/api/products");

  // Verify status code is 200
  check(res, { "status is 200": (r) => r.status === 200 });

  // Simulate "think time" between requests
  sleep(1);
}
```

### 2. How to Run

```bash
k6 run load-test.js
```

### 3. Key Metrics to Analyze

When the test finishes, focus on these metrics in the console output:

- **`http_req_duration (p95)`**: If this is higher than your threshold (e.g., 500ms instead of 200ms), you have a performance bottleneck.
- **`http_req_failed`**: Any percentage above 0% indicates the server is struggling to handle the concurrent connections.
- **`http_reqs / s` (Throughput)**: Tells you exactly how many requests per second your current infrastructure can sustain.

### Analysis Tips

- **High p95, low average**: Indicates "outlier" requests are slow. This often points to GC stalls or specific database locks.
- **Gradual increase in memory**: During a soak test (longer duration), this indicates a **memory leak**.
- **Sudden spike in errors**: Indicates the system has reached its **breaking point** (saturation).
