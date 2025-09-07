---
title: "Web Workers for Offloading Main Thread"
description: "Explain what Web Workers are and how they can be used to run scripts in the background to prevent a web page from becoming unresponsive during long-running tasks."
pubDate: "Sep 07 2025"
published: true
tags: ["Front-End: Core Web", "JavaScript", "Web Workers", "Performance"]
---

### Mind Map Summary

- **Topic**: Web Workers
- **Definition**: A simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface.
- **How it Works**:
    - A worker is an object created using a constructor (`new Worker('worker.js')`) that runs a named JavaScript file.
    - The worker can send and receive messages to and from the main thread using the `postMessage()` method and the `onmessage` event handler.
- **Benefits**:
    - **Improved Responsiveness**: Prevents the UI from freezing during long-running tasks.
    - **Better User Experience**: Allows the user to continue interacting with the page while the worker is running.
- **Limitations**:
    - **No DOM Access**: Workers do not have access to the DOM.
    - **Limited API Access**: Workers have access to a limited set of APIs, such as `fetch` and `XMLHttpRequest`.

### Practice Exercise

Create a simple web page with a button that performs an expensive calculation (e.g., calculating a large number of Fibonacci numbers). First, run it on the main thread and show that the UI freezes. Then, refactor it to use a Web Worker for the calculation, demonstrating that the UI remains responsive.

### Answer

**1. Without Web Worker (UI Freezes):**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Without Web Worker</title>
</head>
<body>
    <button id="calculate">Calculate Fibonacci</button>
    <div id="result"></div>

    <script>
        document.getElementById('calculate').addEventListener('click', () => {
            const result = fibonacci(40);
            document.getElementById('result').textContent = result;
        });

        function fibonacci(n) {
            if (n <= 1) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
        }
    </script>
</body>
</html>
```

**2. With Web Worker (UI Remains Responsive):**

**`index.html`**

```html
<!DOCTYPE html>
<html>
<head>
    <title>With Web Worker</title>
</head>
<body>
    <button id="calculate">Calculate Fibonacci</button>
    <div id="result"></div>

    <script>
        const worker = new Worker('worker.js');

        document.getElementById('calculate').addEventListener('click', () => {
            worker.postMessage(40);
        });

        worker.onmessage = (e) => {
            document.getElementById('result').textContent = e.data;
        };
    </script>
</body>
</html>
```

**`worker.js`**

```javascript
self.onmessage = (e) => {
    const result = fibonacci(e.data);
    self.postMessage(result);
};

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
```
