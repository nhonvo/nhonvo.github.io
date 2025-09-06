---
title: "IAsyncEnumerable & Streaming APIs"
description: "Explain how IAsyncEnumerable allows for efficient, non-blocking iteration over asynchronous data streams. Contrast this with returning a Task<IEnumerable<T>>."
pubDate: "Sep 06 2025"
published: true
tags: [".NET & C# Advanced"]
---

### Practice Exercise

Create an ASP.NET Core API endpoint that returns an IAsyncEnumerable<string>. The method should simulate fetching data in chunks (e.g., with Task.Delay) and yield return each chunk. Show how a client can consume this streaming response.
