---
title: "Tries (Prefix Trees)"
description: "Understand the structure of a Trie and its efficiency for string prefix problems. Know use cases like autocomplete and spell checkers."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Tries", "Prefix Trees", "Strings"]
---

### Mind Map Summary

- **Topic**: Tries (Prefix Trees)
- **Structure**: A tree-like data structure where each node represents a character in a string. The path from the root to a node represents a prefix.
- **Efficiency**: Tries are very efficient for string prefix problems, as the time complexity for search, insertion, and deletion is proportional to the length of the string, not the number of strings in the trie.
- **Use Cases**:
    - **Autocomplete**: Suggest words based on a given prefix.
    - **Spell Checkers**: Find words that are similar to a given word.
    - **IP Routing**: Store and search for IP addresses.

### Practice Exercise

Implement a Trie from scratch with `insert`, `search`, and `startsWith` methods. Use the Trie to build a simple autocomplete system that suggests words based on a given prefix.

### Answer

**1. Implement a Trie:**

```csharp
public class TrieNode {
    public TrieNode[] children = new TrieNode[26];
    public bool isWord;
}

public class Trie {
    private TrieNode root = new TrieNode();

    public void Insert(string word) {
        TrieNode node = root;
        foreach (char c in word) {
            if (node.children[c - 'a'] == null) {
                node.children[c - 'a'] = new TrieNode();
            }
            node = node.children[c - 'a'];
        }
        node.isWord = true;
    }

    public bool Search(string word) {
        TrieNode node = FindNode(word);
        return node != null && node.isWord;
    }

    public bool StartsWith(string prefix) {
        return FindNode(prefix) != null;
    }

    private TrieNode FindNode(string s) {
        TrieNode node = root;
        foreach (char c in s) {
            if (node.children[c - 'a'] == null) return null;
            node = node.children[c - 'a'];
        }
        return node;
    }
}
```

**2. Autocomplete System:**

```csharp
public class AutocompleteSystem {
    private Trie trie = new Trie();

    public AutocompleteSystem(string[] words) {
        foreach (string word in words) {
            trie.Insert(word);
        }
    }

    public List<string> Suggest(string prefix) {
        var suggestions = new List<string>();
        TrieNode node = trie.FindNode(prefix);
        if (node != null) {
            FindWords(node, prefix, suggestions);
        }
        return suggestions;
    }

    private void FindWords(TrieNode node, string prefix, List<string> suggestions) {
        if (node.isWord) {
            suggestions.Add(prefix);
        }
        for (char c = 'a'; c <= 'z'; c++) {
            if (node.children[c - 'a'] != null) {
                FindWords(node.children[c - 'a'], prefix + c, suggestions);
            }
        }
    }
}
```
