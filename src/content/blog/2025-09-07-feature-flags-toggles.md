---
title: "Feature Flags/Toggles"
description: "Master the art of decoupling deployment from release. Learn how to use Feature Flags for canary releases, A/B testing, and instant kill switches."
pubDate: "9 7 2025"
published: true
tags:
  [
    "DevOps",
    "CI/CD",
    ".NET",
    "Feature Management",
    "Software Engineering",
    "A/B Testing",
    "Backend Development",
    "Architecture",
  ]
---

## What are Feature Flags?

Feature Flags (or Feature Toggles) are a software engineering technique that allows you to change the behavior of your application at runtime without deploying new code.

The core power of this pattern is the separation of **Deployment** (the technical act of moving code to a server) from **Release** (the business act of making a feature visible to users).

---

## Core Use Cases

1.  **Canary Releases**: Rolling out a feature to $1\%$ or $5\%$ of users to monitor performance before a full launch.
2.  **Kill Switches**: If a newly released feature starts causing memory leaks or 500 errors, you can turn it off instantly without an emergency deployment.
3.  **A/B Testing**: Showing Version A to one group and Version B to another to measure conversion rates.
4.  **Trunk-Based Development**: Merging code into the main branch constantly, even if it's unfinished, by keeping it "dark" behind a flag.

---

## The Technical Debt Risk

While powerful, feature flags introduce **Technical Debt**. Every flag adds a conditional branch (an `if` statement) to your code.

- **The Rule**: Once a feature is permanently released (100% rollout), the flag and all its associated logic **must** be deleted from the codebase to keep it clean.

---

## Technical Implementation in .NET

The standard library for this is `Microsoft.FeatureManagement`.

### 1. Configuration (`appsettings.json`)

```json
{
  "FeatureManagement": {
    "NewBetaDashboard": true,
    "PaymentGatewayV2": {
      "EnabledFor": [
        {
          "Name": "Percentage",
          "Parameters": { "Value": 10 }
        }
      ]
    }
  }
}
```

### 2. Usage in Controllers

```csharp
[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IFeatureManager _featureManager;

    public DashboardController(IFeatureManager featureManager) =>
        _featureManager = featureManager;

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        if (await _featureManager.IsEnabledAsync("NewBetaDashboard"))
        {
            return Ok(GetNewUI());
        }
        return Ok(GetLegacyUI());
    }

    // Declarative gating for entire endpoints
    [FeatureGate("ExperimentalFeature")]
    [HttpPost]
    public IActionResult PostTest() => Ok("Experimental Success");
}
```

---

## Practice Exercise

Identify the types of feature flags (Release, Experiment, Permission, Operations) and explain why a `Permission` flag might stay in the codebase much longer than a `Release` flag.

---

## Answer

### Types of Toggles

1.  **Release Toggles**: Temporary. Used for trunk-based development. Deleted after release.
2.  **Experiment Toggles**: Temporary. Used for A/B testing. Deleted after the winner is chosen.
3.  **Ops Toggles**: Long-lived. Used for system-wide controls (e.g., "Maintenance Mode" or "Kill Switch" for a resource-heavy feature).
4.  **Permission Toggles**: Long-lived. Used to toggle features based on a user's subscription or account type (e.g., "Early Access" for Premium users).

### Why Permission Flags Persist

A `Release` flag is a bridge to a permanent state; once the bridge is crossed, it's useless. A `Permission` flag, however, is a part of the **Business Model**. It lives as long as the differentiated product tiers exist. It's not technical debt; it's a feature of the authorization system.

## Summary

Feature flags turn your deployment pipeline into a **safe, reversible process**. By wrapping new logic in toggles, you reduce the risk of outages and empower product managers to release features whenever the business is ready, rather than whenever the engineers finish coding.
