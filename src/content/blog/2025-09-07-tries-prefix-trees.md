---
title: "Tries (Prefix Trees)"
description: "Master the optimal data structure for string searching and autocomplete. Learn how Tries store shared prefixes to achieve O(L) lookup performance."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Tries",
    "Prefix Trees",
    "Autocomplete",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Trie?

A Trie (pronounced "try" or "tree") is a tree-based data structure used for storing strings. Unlike a standard binary tree, nodes in a Trie do not store the key itself. Instead, the **position** of a node in the tree defines the key (prefix) it is associated with.

### Key Characteristics

- **Root**: Usually represents an empty string.
- **Edges**: Represent characters.
- **Nodes**: Contain an array (or map) of children and a boolean flag indicating if the current path represents a complete word.

---

## Why Use a Trie?

1.  **Fast Lookups**: Searching for a word of length $L$ takes exactly $O(L)$ time, regardless of how many millions of words are in the dictionary.
2.  **Prefix Search**: Perfect for "starts with" queries, which are expensive in Hash Tables.
3.  **Space Efficiency**: Shared prefixes (e.g., "apple" and "apply") only store their common parts ("appl") once.

### Usage Cases

- **Autocomplete** suggestions in search bars.
- **Spell Checkers** and word validation.
- **IP Routing** (longest prefix match).

---

## Practice Exercise

Implement a Trie from scratch with `Insert`, `Search`, and `StartsWith` methods. Ensure it handles lower-case English characters ('a' through 'z').

---

## Answer

### 1. Trie Implementation ($O(L)$ Time for all operations)

```csharp
public class TrieNode {
    // Array of 26 children (a-z)
    public TrieNode[] Children = new TrieNode[26];
    public bool IsEndOfWord;
}

public class Trie {
    private readonly TrieNode _root = new();

    public void Insert(string word) {
        TrieNode curr = _root;
        foreach (char c in word) {
            int idx = c - 'a';
            if (curr.Children[idx] == null) {
                curr.Children[idx] = new TrieNode();
            }
            curr = curr.Children[idx];
        }
        curr.IsEndOfWord = true;
    }

    public bool Search(string word) {
        TrieNode node = GetNode(word);
        return node != null && node.IsEndOfWord;
    }

    public bool StartsWith(string prefix) {
        return GetNode(prefix) != null;
    }

    private TrieNode GetNode(string s) {
        TrieNode curr = _root;
        foreach (char c in s) {
            int idx = c - 'a';
            if (curr.Children[idx] == null) return null;
            curr = curr.Children[idx];
        }
        return curr;
    }
}
```

### 2. Autocomplete Logic (Using DFS)

To find all words starting with a prefix, find the prefix node first, then perform a Depth-First Search to find all `IsEndOfWord` nodes in its subtree.

```csharp
public List<string> AutoComplete(string prefix) {
    var result = new List<string>();
    TrieNode startNode = GetNode(prefix);
    if (startNode != null) {
        Dfs(startNode, prefix, result);
    }
    return result;
}

private void Dfs(TrieNode node, string currentPrefix, List<string> result) {
    if (node.IsEndOfWord) result.Add(currentPrefix);

    for (int i = 0; i < 26; i++) {
        if (node.Children[i] != null) {
            char nextChar = (char)('a' + i);
            Dfs(node.Children[i], currentPrefix + nextChar, result);
        }
    }
}
```

## Summary

Tries are the gold standard for **prefix-based string operations**. While they consume more memory than a Hash Set (due to storing pointers for every character), their ability to perform localized prefix searches and shared storage makes them indispensable for dictionary-heavy applications.
