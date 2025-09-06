---
title: "Delegates, Events, Func<T>, Action<T>"
description: "Understand common use cases like event-driven architecture and callbacks."
pubDate: "Sep 06 2025"
published: true
tags: [".NET & C# Advanced"]
---

### Mind Map Summary

- **Delegates (The Foundation)**
  - **Definition**: A type that safely encapsulates a method, essentially a type-safe function pointer.
  - **Purpose**: Allows methods to be passed as arguments, enabling callbacks and event handling.
  - **Key Feature**: Multicast - a single delegate can hold references to and invoke multiple methods.
- **`Action<T>` and `Func<T, TResult>` (The Shortcuts)**
  - **`Action<T>`**: A built-in delegate for methods that have **no return value** (return `void`).
    - *Example*: `Action<string> print = message => Console.WriteLine(message);`
  - **`Func<T, TResult>`**: A built-in delegate for methods that **have a return value**.
    - *Example*: `Func<int, int, int> add = (a, b) => a + b;`
  - **Benefit**: Convenience. Avoids the need to declare a custom delegate type for most common scenarios.
- **Events (The Publisher/Subscriber Pattern)**
  - **Definition**: A mechanism that enables a class (publisher) to provide notifications to other classes (subscribers) when something interesting occurs.
  - **Implementation**: An event is essentially a controlled, encapsulated delegate. It restricts access to the underlying delegate, only allowing subscribers to add (`+=`) or remove (`-=`) their handlers.
  - **Use Case**: Decoupling components. The publisher doesn't need to know anything about the subscribers.

### Core Concepts

#### 1. Delegates
- **Definition**: A delegate is a reference type that can be used to encapsulate a named or an anonymous method. It is similar to a function pointer in C++, but it is type-safe and secure. Once a delegate is instantiated, it can be associated with any method that has a compatible signature and return type.
- **Multicasting**: A delegate instance can reference more than one method. When the delegate is invoked, it will call all of the methods in its invocation list, in order. This is the basis for event handling.

#### 2. `Action<T>` and `Func<T, TResult>`
- **Purpose**: Before these generic delegates were introduced, developers had to declare a new custom delegate type for every different method signature they wanted to use as a callback. `Action` and `Func` provide a set of reusable, built-in delegates for nearly all common cases.
- **`Action<T>`**: Use this when you need to execute an action that does not return a value. There are versions that take from 0 to 16 input parameters (e.g., `Action`, `Action<T1, T2>`).
- **`Func<T, TResult>`**: Use this when you need to execute a function that returns a value. The last type parameter is always the return type. There are versions that take from 0 to 16 input parameters (e.g., `Func<TResult>`, `Func<T1, T2, TResult>`).

#### 3. Events
- **Definition**: An event is a wrapper around a delegate that provides a standard publish-subscribe mechanism. It exposes a controlled way for other classes to register and unregister for notifications.
- **Key Characteristics**:
  - **Encapsulation**: The event hides the underlying delegate from the outside world. You cannot directly assign to it (`=`) or invoke it from outside the publishing class.
  - **Access Control**: Subscribers can only use the `+=` (subscribe) and `-=` (unsubscribe) operators.
  - **Standard Pattern**: .NET events typically follow a standard pattern, using `EventHandler` or `EventHandler<TEventArgs>` as the delegate type, where `TEventArgs` is a class that contains data about the event.

### Practice Exercise

Create a `Worker` class that performs a long-running operation. Define an event in this class called `ProgressChanged`. Create a UI or Console class that subscribes to this event and reports the progress. Trigger the event from within the worker's operation.

### Answer

#### Code Example

```csharp
using System;
using System.Threading;

// 1. Define the event arguments class
public class ProgressEventArgs : EventArgs
{
    public int Percentage { get; }
    public ProgressEventArgs(int percentage) { Percentage = percentage; }
}

// 2. The Publisher Class
public class Worker
{
    // Define the event using the standard EventHandler<T> delegate
    public event EventHandler<ProgressEventArgs> ProgressChanged;

    public void DoWork()
    {
        for (int i = 0; i <= 100; i++)
        {
            // Simulate work
            Thread.Sleep(50);

            // Raise the event
            OnProgressChanged(new ProgressEventArgs(i));
        }
    }

    // Protected virtual method to raise the event
    protected virtual void OnProgressChanged(ProgressEventArgs e)
    {
        // Make a temporary copy of the event to be thread-safe
        EventHandler<ProgressEventArgs> handler = ProgressChanged;
        if (handler != null)
        {
            handler(this, e);
        }
    }
}

// 3. The Subscriber Class
public class ConsoleUI
{
    public void Start()
    {
        Worker worker = new Worker();

        // Subscribe to the event
        worker.ProgressChanged += HandleProgressChanged;

        Console.WriteLine("Starting work...");
        worker.DoWork();
        Console.WriteLine("Work finished!");

        // Unsubscribe from the event (good practice)
        worker.ProgressChanged -= HandleProgressChanged;
    }

    // The event handler method
    private void HandleProgressChanged(object sender, ProgressEventArgs e)
    {
        Console.Write($"\rProgress: {e.Percentage}%");
    }
}

public class Program
{
    public static void Main()
    {
        ConsoleUI ui = new ConsoleUI();
        ui.Start();
    }
}
```

#### Explanation

1.  **`ProgressEventArgs`**: We define a custom class inheriting from `EventArgs` to pass data (`Percentage`) with our event. This is a standard .NET pattern.
2.  **`Worker` (Publisher)**: 
    -   It declares a public `event` named `ProgressChanged`. The type is `EventHandler<ProgressEventArgs>`, a built-in delegate perfect for this scenario.
    -   The `DoWork` method simulates a long task. In the loop, it calls `OnProgressChanged`.
    -   `OnProgressChanged` is a protected virtual method (a common pattern allowing derived classes to modify how the event is raised). It checks if any subscribers are registered (`handler != null`) and, if so, invokes the delegate, which in turn calls all subscribed handler methods.
3.  **`ConsoleUI` (Subscriber)**:
    -   It creates an instance of the `Worker`.
    -   It subscribes to the `ProgressChanged` event using the `+=` operator, assigning its `HandleProgressChanged` method as a handler.
    -   The `HandleProgressChanged` method has the correct signature to match the `EventHandler<ProgressEventArgs>` delegate. It receives the `sender` (the `Worker` instance) and the `ProgressEventArgs` data, which it uses to write the progress to the console.
    -   This demonstrates perfect decoupling: the `Worker` class has no knowledge of the `ConsoleUI` class. It simply raises an event, and any class that has subscribed will be notified.