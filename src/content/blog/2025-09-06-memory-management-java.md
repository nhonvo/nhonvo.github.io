---
title: "Java Memory Model: Stack, Heap, and Pass-by-Value Myths"
description: "Demystifying how Java manages memory under the hood. Understand the stack/heap distinction and why everything in Java is pass-by-value."
pubDate: "9 6 2025"
published: true
tags: ["java", "jvm", "memory-management", "computer-science", "backend"]
---

### The Foundation of Java Execution

Where does a variable live? How does it get passed to a method? These questions are at the heart of performance and bug-prevention in Java.

### Core Concepts

#### 1. The Stack

- **Used For**: Local variables and method execution.
- **Characteristics**: Fast, automatically managed (LIFO), thread-private. If a thread exceeds its stack size, you get a `StackOverflowError`.

#### 2. The Heap

- **Used For**: All objects (including class instances and arrays).
- **Characteristics**: Shared by all threads, managed by the Garbage Collector. If full, you get an `OutOfMemoryError`.

#### 3. Pass-by-Value (The Great Debate)

Java is **always** pass-by-value.

- For **Primitives**, you pass a copy of the value.
- For **Objects**, you pass a copy of the **Reference** (which is just a memory address value).

---

### Practice Exercise: Proving the Reference Myth

We will write code to demonstrate that you can modify an object's contents inside a method, but you cannot change which object the original variable points to.

#### Step 1: The Experiment

```java
public class MemoryDemo {
    public static void main(String[] args) {
        User u = new User("Old Name");

        modify(u);
        System.out.println(u.name); // Will it change?

        reassign(u);
        System.out.println(u.name); // Will it change?
    }

    public static void modify(User user) {
        user.name = "New Name"; // Modifying state via the reference
    }

    public static void reassign(User user) {
        user = new User("Reset Name"); // Reassigning the local copy of the reference
    }
}
```

**Output:**

1.  `New Name` (The content was modified).
2.  `New Name` (The original `u` still points to the first object; the reassignment inside `reassign` only affected the local variable `user`).

---

### Why This Works

- **Stack for References**: In the example, the variable `u` lives on the `main` method's stack frame. It holds a value (e.g., `0x123`) which is the address of the Object on the **Heap**.
- **Passing the Reference**: When `modify(u)` is called, the value `0x123` is copied into the `user` parameter. Both now point to the same object.
- **Isolating Reassignment**: When we do `user = new User(...)`, the local variable `user` now holds a different value (e.g., `0x456`), but the original stack variable `u` still holds `0x123`.

### Performance Tip: Escaping Objects

If an object is only used within a single method and doesn't "escape" (i.e., it's not returned or assigned to a field), the modern JVM (HotSpot) can perform **Escape Analysis** and allocate that object on the **Stack** instead of the Heap. This significantly reduces GC pressure.

### Summary

Stack = Execution. Heap = Data. Understanding how Java handles references allows you to write predictable, memory-efficient code and avoids the "magic" confusion often associated with method calls.
