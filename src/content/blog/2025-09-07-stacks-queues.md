---
title: "Stacks & Queues"
description: "Understand their LIFO/FIFO principles. Know common use cases: Stacks for parsing, recursion simulation, and reversing. Queues for BFS and task scheduling."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Stacks", "Queues", "LIFO", "FIFO"]
---

### Mind Map Summary

- **Topic**: Stacks & Queues
- **Core Concepts**:
    - **Stack**: A linear data structure that follows the Last-In, First-Out (LIFO) principle.
    - **Queue**: A linear data structure that follows the First-In, First-Out (FIFO) principle.
- **Use Cases**:
    - **Stacks**: Parsing, recursion simulation, reversing.
    - **Queues**: Breadth-First Search (BFS), task scheduling.

### Practice Exercise

Implement a Queue using two Stacks. Solve the Valid Parentheses problem. Implement a basic calculator to evaluate a string expression. Find the first non-repeating character in a stream of characters.

### Answer

**1. Implement a Queue using two Stacks:**

```csharp
public class MyQueue {
    private Stack<int> s1 = new Stack<int>();
    private Stack<int> s2 = new Stack<int>();

    public void Enqueue(int x) {
        while (s1.Count > 0) {
            s2.Push(s1.Pop());
        }
        s1.Push(x);
        while (s2.Count > 0) {
            s1.Push(s2.Pop());
        }
    }

    public int Dequeue() {
        return s1.Pop();
    }

    public int Peek() {
        return s1.Peek();
    }

    public bool Empty() {
        return s1.Count == 0;
    }
}
```

**2. Valid Parentheses:**

```csharp
public bool IsValid(string s) {
    var stack = new Stack<char>();
    foreach (char c in s) {
        if (c == '(' || c == '{' || c == '[') {
            stack.Push(c);
        } else {
            if (stack.Count == 0) return false;
            char top = stack.Pop();
            if (c == ')' && top != '(') return false;
            if (c == '}' && top != '{') return false;
            if (c == ']' && top != '[') return false;
        }
    }
    return stack.Count == 0;
}
```

**3. Basic Calculator:**

```csharp
public int Calculate(string s) {
    int len = s.Length;
    if (len == 0) return 0;
    Stack<int> stack = new Stack<int>();
    int num = 0;
    char sign = '+';
    for (int i = 0; i < len; i++) {
        if (char.IsDigit(s[i])) {
            num = num * 10 + (s[i] - '0');
        }
        if ((!char.IsDigit(s[i]) && ' ' != s[i]) || i == len - 1) {
            if (sign == '-') {
                stack.Push(-num);
            } else if (sign == '+') {
                stack.Push(num);
            } else if (sign == '*') {
                stack.Push(stack.Pop() * num);
            } else if (sign == '/') {
                stack.Push(stack.Pop() / num);
            }
            sign = s[i];
            num = 0;
        }
    }
    int res = 0;
    foreach (int i in stack) {
        res += i;
    }
    return res;
}
```

**4. First Non-Repeating Character in a Stream:**

```csharp
public class FirstUnique {
    private Dictionary<int, int> map = new Dictionary<int, int>();
    private Queue<int> queue = new Queue<int>();

    public FirstUnique(int[] nums) {
        foreach (int num in nums) {
            Add(num);
        }
    }

    public int ShowFirstUnique() {
        while (queue.Count > 0 && map[queue.Peek()] > 1) {
            queue.Dequeue();
        }
        return queue.Count == 0 ? -1 : queue.Peek();
    }

    public void Add(int value) {
        if (map.ContainsKey(value)) {
            map[value]++;
        } else {
            map[value] = 1;
        }
        queue.Enqueue(value);
    }
}
```
