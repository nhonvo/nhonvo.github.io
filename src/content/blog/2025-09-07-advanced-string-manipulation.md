---
title: "Advanced String Manipulation"
description: "Explore performance-driven string algorithms like Rabin-Karp for substring search and Manacher's inspired logic for longest palindromic discovery."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Strings",
    "Rabin-Karp",
    "Palindromes",
    "C#",
    "LeetCode",
    "Data Structures",
    "Competitive Programming",
  ]
---

## Mind Map Summary

- **Advanced String Algorithms**
  - **Rabin-Karp Algorithm**: A string searching algorithm that uses a **rolling hash** to find occurrences of a pattern in a text. It is particularly efficient for multiple pattern searching.
  - **Longest Palindromic Substring**: Finding the largest contiguous segment of a string that reads the same forwards and backwards.
  - **Expand Around Center**: A simple $O(n^2)$ approach for palindromes.
  - **Manacher's Algorithm**: An advanced $O(n)$ approach for finding all palindromic substrings.

## Core Concepts

### 1. Rabin-Karp (Rolling Hash)

Instead of comparing characters one by one (which is $O(n \times m)$), Rabin-Karp computes a hash of the pattern and a sliding window of the text. If hashes match, it performs a single character-by-character check to account for hash collisions. This reduces the average time complexity significantly.

### 2. Palindromic Substrings

The "Expand Around Center" technique is the most practical for interviews. It treats each character (and the gap between characters) as a potential center and expands outwards as long as the characters match.

## Practice Exercise

1.  Implement the Rabin-Karp algorithm to find the starting indices of all occurrences of a pattern.
2.  Find the longest palindromic substring in a given string.

## Answer

### 1. Rabin-Karp Implementation in C#

```csharp
public List<int> RabinKarp(string text, string pattern) {
    int n = text.Length, m = pattern.Length;
    if (m > n) return new List<int>();

    const int prime = 101;
    const int d = 256; // Character set size
    int h = 1, p = 0, t = 0;
    var result = new List<int>();

    // h = pow(d, m-1) % prime
    for (int i = 0; i < m - 1; i++) h = (h * d) % prime;

    // Calculate initial hash for pattern and first window
    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % prime;
        t = (d * t + text[i]) % prime;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            // Check for actual match on hash collision
            if (text.Substring(i, m) == pattern) result.Add(i);
        }

        if (i < n - m) {
            // Rolling hash: remove leading digit, add trailing digit
            t = (d * (t - text[i] * h) + text[i + m]) % prime;
            if (t < 0) t += prime;
        }
    }
    return result;
}
```

### 2. Longest Palindromic Substring (Expand Around Center)

```csharp
public string LongestPalindrome(string s) {
    if (string.IsNullOrEmpty(s)) return "";
    int start = 0, maxLength = 0;

    for (int i = 0; i < s.Length; i++) {
        int len1 = Expand(s, i, i);     // Odd length (e.g., "aba")
        int len2 = Expand(s, i, i + 1); // Even length (e.g., "abba")
        int len = Math.Max(len1, len2);

        if (len > maxLength) {
            maxLength = len;
            start = i - (len - 1) / 2;
        }
    }
    return s.Substring(start, maxLength);
}

private int Expand(string s, int left, int right) {
    while (left >= 0 && right < s.Length && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}
```

### Summary

Advanced string manipulation requires balancing **time complexity** with **implementation complexity**. **Rabin-Karp** provides a powerful way to handle multiple patterns, while **Expand Around Center** offers a robust and readable way to handle palindrome logic in under $O(n^2)$ time.
