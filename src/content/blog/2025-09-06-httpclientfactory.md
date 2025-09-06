---
title: "HttpClientFactory for Resilient HTTP Requests"
description: "Explain the problems with new HttpClient() (socket exhaustion) and how HttpClientFactory solves them. Discuss how to use it to configure named or typed clients and integrate it with Polly for resilience patterns (Retry, Circuit Breaker)."
pubDate: "Sep 06 2025"
published: true
tags: ["ASP.NET Core"]
---

### Practice Exercise

Use HttpClientFactory to create a typed client for an external API. Use the Polly extension to add a transient error handling policy that retries failed requests (HTTP 5xx or network errors) up to three times with an exponential backoff.
