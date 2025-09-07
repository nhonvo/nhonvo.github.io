---
title: "Linked Lists (Singly & Doubly)"
description: "Understand the trade-offs vs. arrays. Be proficient in manipulating pointers. Master patterns like the Fast & Slow Pointer technique for cycle detection and finding the middle element."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Linked Lists", "Pointers", "Fast & Slow Pointer"]
---

### Mind Map Summary

- **Topic**: Linked Lists (Singly & Doubly)
- **Core Concepts**:
    - **Singly Linked List**: A linear data structure where each element (node) points to the next element in the sequence.
    - **Doubly Linked List**: A linear data structure where each element (node) points to both the next and the previous element in the sequence.
    - **Trade-offs vs. Arrays**:
        - **Arrays**: Fast random access, slow insertion and deletion.
        - **Linked Lists**: Slow random access, fast insertion and deletion.
    - **Fast & Slow Pointer**: A pattern where two pointers are used to iterate over a linked list at different speeds. This is useful for cycle detection and finding the middle element.

### Practice Exercise

Reverse a singly linked list. Detect if a linked list has a cycle. Merge two sorted linked lists. Find the middle element of a linked list.

### Answer

**1. Reverse a Singly Linked List:**

```csharp
public ListNode ReverseList(ListNode head) {
    ListNode prev = null;
    ListNode curr = head;
    while (curr != null) {
        ListNode nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
}
```

**2. Detect if a Linked List Has a Cycle:**

```csharp
public bool HasCycle(ListNode head) {
    if (head == null) return false;
    ListNode slow = head;
    ListNode fast = head.next;
    while (slow != fast) {
        if (fast == null || fast.next == null) return false;
        slow = slow.next;
        fast = fast.next.next;
    }
    return true;
}
```

**3. Merge Two Sorted Linked Lists:**

```csharp
public ListNode MergeTwoLists(ListNode l1, ListNode l2) {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    if (l1.val < l2.val) {
        l1.next = MergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = MergeTwoLists(l1, l2.next);
        return l2;
    }
}
```

**4. Find the Middle Element of a Linked List:**

```csharp
public ListNode MiddleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}
```
