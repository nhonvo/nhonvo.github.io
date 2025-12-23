---
title: "Stacks & Queues"
description: "Master the fundamental data structures for order-based processing. Learn how Stacks (LIFO) and Queues (FIFO) power everything from web history to BFS algorithms."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Stack",
    "Queue",
    "LIFO",
    "FIFO",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Stack?

A Stack is a linear data structure that follows the **Last-In, First-Out (LIFO)** principle. Think of it like a stack of plates in a cafeteria: the last plate placed on top is the first one taken off.

### Core Operations

- **Push**: Add an element to the top. ($O(1)$)
- **Pop**: Remove and return the top element. ($O(1)$)
- **Peek**: See the top element without removing it. ($O(1)$)

### Usage Cases

- **Undo/Redo** functionality in editors.
- **Function Call Stack** (tracking local variables and return addresses).
- **Expression Parsing** (e.g., checking for balanced parentheses).

---

## What is a Queue?

A Queue is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. Think of it like a line at a supermarket: the first person in line is the first person served.

### Core Operations

- **Enqueue**: Add an element to the end. ($O(1)$)
- **Dequeue**: Remove and return the front element. ($O(1)$)
- **Peek**: See the front element. ($O(1)$)

### Usage Cases

- **Breadth-First Search (BFS)** for graph traversal.
- **Task Scheduling** (e.g., printer queues, background jobs).
- **Rate Limiting** or buffering.

---

## Practice Exercise

1.  **Valid Parentheses**: Determine if a string's brackets are correctly balanced.
2.  **Queue using Stacks**: Implement a queue logic using only two stacks.
3.  **Basic Calculator**: Evaluate a mathematical string (e.g., `"3+2*2"`) using a stack.

---

## Answer

### 1. Valid Parentheses ($O(n)$ Time)

```csharp
public bool IsValid(string s) {
    var stack = new Stack<char>();
    foreach (char c in s) {
        if (c == '(') stack.Push(')');
        else if (c == '{') stack.Push('}');
        else if (c == '[') stack.Push(']');
        else if (stack.Count == 0 || stack.Pop() != c) return false;
    }
    return stack.Count == 0;
}
```

### 2. Queue Using Two Stacks

We use `stackIn` for pushing and `stackOut` for popping. We only transfer from In to Out when the Out stack is empty.

```csharp
public class MyQueue {
    private readonly Stack<int> _in = new();
    private readonly Stack<int> _out = new();

    public void Enqueue(int x) => _in.Push(x);

    public int Dequeue() {
        Peek(); // Ensure _out has elements
        return _out.Pop();
    }

    public int Peek() {
        if (_out.Count == 0) {
            while (_in.Count > 0) _out.Push(_in.Pop());
        }
        return _out.Peek();
    }
}
```

### 3. Basic Calculator ($O(n)$ Time)

```csharp
public int Calculate(string s) {
    if (string.IsNullOrEmpty(s)) return 0;
    Stack<int> stack = new();
    int currentNum = 0;
    char operation = '+';

    for (int i = 0; i < s.Length; i++) {
        char c = s[i];
        if (char.IsDigit(c)) currentNum = (currentNum * 10) + (c - '0');

        if (!char.IsDigit(c) && c != ' ' || i == s.Length - 1) {
            if (operation == '+') stack.Push(currentNum);
            else if (operation == '-') stack.Push(-currentNum);
            else if (operation == '*') stack.Push(stack.Pop() * currentNum);
            else if (operation == '/') stack.Push(stack.Pop() / currentNum);

            operation = c;
            currentNum = 0;
        }
    }

    int result = 0;
    while (stack.Count > 0) result += stack.Pop();
    return result;
}
```

## Summary

- Use a **Stack** when you need to "remember" where you were or process things in reverse order.
- Use a **Queue** when you need to process tasks in the exact sequence they arrived.
- Stacks are the natural companion of **DFS**, while Queues are the heart of **BFS**.
