---
title: "Hash Tables (Dictionary/HashMap)"
description: "This is one of the most important data structures. Understand how hashing works, and discuss collision resolution strategies (chaining vs. open addressing) and their trade-offs."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Hash Tables", "Dictionary", "HashMap", "Collision Resolution"]
---

### Mind Map Summary

- **Topic**: Hash Tables (Dictionary/HashMap)
- **Core Concepts**:
    - **Hash Table**: A data structure that maps keys to values. It uses a hash function to compute an index into an array of buckets or slots, from which the desired value can be found.
    - **Hash Function**: A function that takes a key and returns an index into the hash table.
    - **Collision Resolution**: Strategies for handling the case where two or more keys map to the same index.
        - **Chaining**: Each bucket in the hash table is a linked list. When a collision occurs, the new key-value pair is added to the linked list.
        - **Open Addressing**: When a collision occurs, the hash table probes for the next available slot.
- **Trade-offs**:
    - **Chaining**: Simple to implement, but can be slow if the linked lists become long.
    - **Open Addressing**: More complex to implement, but can be faster than chaining if the load factor is low.

### Practice Exercise

Implement a HashMap from scratch with basic `get`, `put`, and `delete` operations, using chaining for collision resolution. Use a Dictionary to solve problems like finding the first non-repeating character in a string or checking if two arrays have a common item.

### Answer

**1. Implement a HashMap from scratch:**

```csharp
public class MyHashMap {
    private class Node {
        public int key, val;
        public Node next;
        public Node(int key, int val) {
            this.key = key;
            this.val = val;
        }
    }

    private Node[] nodes = new Node[10000];

    public int Get(int key) {
        int index = key % nodes.Length;
        Node prev = Find(nodes[index], key);
        return prev.next == null ? -1 : prev.next.val;
    }

    public void Put(int key, int value) {
        int index = key % nodes.Length;
        Node prev = Find(nodes[index], key);
        if (prev.next == null)
            prev.next = new Node(key, value);
        else
            prev.next.val = value;
    }

    public void Remove(int key) {
        int index = key % nodes.Length;
        Node prev = Find(nodes[index], key);
        if (prev.next != null)
            prev.next = prev.next.next;
    }

    private Node Find(Node bucket, int key) {
        Node node = bucket, prev = null;
        while (node != null && node.key != key) {
            prev = node;
            node = node.next;
        }
        return prev;
    }
}
```

**2. First Non-Repeating Character in a String:**

```csharp
public int FirstUniqChar(string s) {
    var map = new Dictionary<char, int>();
    foreach (char c in s) {
        if (map.ContainsKey(c)) {
            map[c]++;
        } else {
            map[c] = 1;
        }
    }
    for (int i = 0; i < s.Length; i++) {
        if (map[s[i]] == 1) {
            return i;
        }
    }
    return -1;
}
```

**3. Common Item in Two Arrays:**

```csharp
public bool HasCommonItem(int[] arr1, int[] arr2) {
    var set = new HashSet<int>(arr1);
    foreach (int num in arr2) {
        if (set.Contains(num)) {
            return true;
        }
    }
    return false;
}
```
