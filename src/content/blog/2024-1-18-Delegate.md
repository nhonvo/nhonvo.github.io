---
layout: post
title: "Exploring Dynamic Distance Calculation with Delegates: A Proof of Concept"
description: ""
pubDate: "1 18 2024"
published: true
tags:
  - c#
  - delegate
---

Welcome to our latest project - a Proof of Concept (PoC) repository that explores dynamic distance calculation using delegates. In this blog post, we'll take you through the features, the motivation behind the project, and how you can experiment with dynamic resolution of distance calculation services in a web API.

## **Why Delegates?**

Delegates in C# are powerful constructs that allow us to treat methods as first-class citizens. Leveraging this capability, our PoC demonstrates how to dynamically resolve distance calculation services at runtime. This flexibility opens the door to easily switch between different providers based on specific conditions or user preferences.

## **Key Features**

### **Dynamic Resolution with Delegates**

The heart of this project lies in the `DistanceCalculator` class, which uses a delegate (`DistanceProviderResolver`) to dynamically resolve the distance calculation service. This allows us to switch between Google and PCMiler providers with ease, providing a seamless and extensible solution.

```csharp
var distanceCalculator = new DistanceCalculator();
var distanceService = distanceCalculator.ResolveDistanceProvider(DistanceProvider.Google);
double distance = distanceService.CalculateDistance("Origin", "Destination");
```

### **Configurability**

Experiment with different distance calculation providers by customizing the `Program.cs` file. This configurability makes it easy to adapt the PoC to various scenarios and requirements.

## **Limitations and Roadmap**

As a Proof of Concept, it's important to note that this project currently uses simulated distance calculation logic with dummy values. While it showcases the concept effectively, it may lack certain features expected in a production-ready application.

We encourage you to explore, experiment, and contribute. If you encounter issues or have ideas for improvements, please open an issue on our GitHub repository.

## Demo

**Clone the Repository** :

```bash
git clone https://github.com/nhonvo/delegate-poc.git
cd delegate-poc
```

## **Conclusion**

Dynamic distance calculation with delegates offers a glimpse into the world of flexible and configurable service resolution. We hope this PoC sparks ideas and discussions about how such a concept could be integrated into real-world applications.

Feel free to dive into the code, contribute your insights, and join us on this exploration of dynamic resolution in C#.

Happy coding!
