---
title: "Linked Lists (Singly & Doubly)"
description: "Master the foundation of pointer-based data structures. Learn how to reverse lists, detect cycles, and find middle elements using the Fast & Slow pointer pattern."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Linked Lists",
    "Pointers",
    "Fast & Slow Pointer",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Linked List?

A Linked List is a linear data structure where elements are not stored in contiguous memory locations. Instead, each element (node) contains a **value** and a **reference** (pointer) to the next node.

### Types of Linked Lists

1.  **Singly Linked List**: Each node points only to the `next` node. (Simple, less memory).
2.  **Doubly Linked List**: Each node points to both the `next` and the `previous` node. (Allows bi-directional traversal, more memory).

---

## Trade-offs vs. Arrays

| Feature                    | Array                  | Linked List               |
| :------------------------- | :--------------------- | :------------------------ |
| **Access (Indexing)**      | $O(1)$                 | $O(n)$                    |
| **Insert/Delete (Start)**  | $O(n)$                 | $O(1)$                    |
| **Insert/Delete (Middle)** | $O(n)$                 | $O(1)$ once node is found |
| **Memory**                 | Contiguous, Fixed size | Disjoint, Dynamic size    |

---

## Core Algorithmic Patterns

### The Fast & Slow Pointer (Floyd’s Cycle-Finding)

By having one pointer move twice as fast as the other (`fast = fast.next.next`), you can solve many problems in a single pass:

- **Cycle Detection**: If they ever meet, there is a cycle.
- **Middle Element**: When the fast pointer reaching the end, the slow pointer is exactly in the middle.

---

## Practice Exercise

1.  **Reverse a List**: Flip the pointers of a singly linked list in-place.
2.  **Detect a Cycle**: Determine if a list contains a loop.
3.  **Merge Sorted Lists**: Combine two sorted linked lists into one sorted list.
4.  **Find the Middle**: Find the central node of a list in $O(n)$ time.

---

## Answer

### 1. Reverse a List ($O(n)$ Time, $O(1)$ Space)

```csharp
public ListNode ReverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode next = curr.next; // Remember the rest
        curr.next = prev;         // Flip the pointer
        prev = curr;              // Move forward
        curr = next;
    }
    return prev;
}
```

### 2. Detect a Cycle ($O(n)$ Time)

```csharp
public bool HasCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true; // Tortoise and Hare meet
    }
    return false;
}
```

### 3. Merge Sorted Lists ($O(n + m)$ Time)

```csharp
public ListNode Merge(ListNode l1, ListNode l2) {
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;

    while (l1 != null && l2 != null) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        }
        curr = curr.next;
    }
    curr.next = l1 ?? l2; // Attach the remainder
    return dummy.next;
}
```

### 4. Find the Middle Node

```csharp
public ListNode MiddleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```

## Summary

Linked Lists are the basis for more complex structures like **Stacks**, **Queues**, and **Hash Table Chaining**. While they suffer from poor cache locality and slow indexing compared to arrays, their ability to grow dynamically and perform constant-time insertions makes them a critical tool in many algorithms.
