---
title: "Feature Flags/Toggles"
description: "Discuss how feature flags can be used to decouple deployment from release, enabling practices like canary releases and A/B testing. Explain the risks and how to manage them."
pubDate: "Sep 07 2025"
published: true
tags: ["Software Design & Architecture", "Feature Flags", "Continuous Delivery", "A/B Testing"]
---

### Mind Map Summary

- **Topic**: Feature Flags/Toggles
- **Definition**: A technique that allows you to turn features of your application on or off without deploying new code.
- **Use Cases**:
    - **Decouple Deployment from Release**: Deploy new features to production but keep them hidden from users until they are ready to be released.
    - **Canary Releases**: Gradually roll out new features to a small subset of users before releasing them to everyone.
    - **A/B Testing**: Test different versions of a feature with different groups of users to see which one performs better.
    - **Kill Switch**: Quickly disable a feature that is causing problems in production.
- **Risks**:
    - **Increased Complexity**: Feature flags can add complexity to the codebase.
    - **Technical Debt**: Old feature flags can become technical debt if they are not removed.
    - **Testing Challenges**: It can be difficult to test all the different combinations of feature flags.

### Practice Exercise

Implement a simple feature flag system (or use a library like `Microsoft.FeatureManagement`). Create an API endpoint that behaves differently depending on whether a feature flag is enabled or disabled. Show how you can change the application's behavior without redeploying the code.

### Answer

**1. Install the NuGet Package:**

```bash
dotnet add package Microsoft.FeatureManagement.AspNetCore
```

**2. Configure Feature Flags in `appsettings.json`:**

```json
{
  "FeatureManagement": {
    "NewAwesomeFeature": true
  }
}
```

**3. Register Feature Management in `Program.cs`:**

```csharp
builder.Services.AddFeatureManagement();
```

**4. Use Feature Flags in an API Controller:**

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.FeatureManagement;

[ApiController]
[Route("[controller]")]
public class MyController : ControllerBase
{
    private readonly IFeatureManager _featureManager;

    public MyController(IFeatureManager featureManager)
    {
        _featureManager = featureManager;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        if (await _featureManager.IsEnabledAsync("NewAwesomeFeature"))
        {
            return Ok("The new awesome feature is enabled!");
        }
        else
        {
            return Ok("The old feature is still here.");
        }
    }
}
```

**5. Change the Feature Flag:**

To change the behavior of the application, you can simply change the value of the `NewAwesomeFeature` flag in `appsettings.json` and restart the application. You do not need to redeploy the code.
