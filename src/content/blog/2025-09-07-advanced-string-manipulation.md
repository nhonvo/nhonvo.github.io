---
title: "Advanced String Manipulation"
description: "Be familiar with advanced algorithms like Rabin-Karp for substring search and algorithms for finding the longest palindromic substring."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Strings", "Rabin-Karp", "Palindromes"]
---

### Mind Map Summary

- **Topic**: Advanced String Manipulation
- **Core Concepts**:
    - **Rabin-Karp Algorithm**: A string searching algorithm that uses a rolling hash to find a pattern in a text.
    - **Longest Palindromic Substring**: The longest substring of a given string that is a palindrome.

### Practice Exercise

Implement the Rabin-Karp algorithm to find all occurrences of a pattern in a text. Find the longest palindromic substring in a given string.

### Answer

**1. Rabin-Karp Algorithm:**

```csharp
public List<int> RabinKarp(string text, string pattern) {
    int n = text.Length;
    int m = pattern.Length;
    int prime = 101;
    int d = 256;
    int h = 1;
    int p = 0;
    int t = 0;
    var res = new List<int>();

    for (int i = 0; i < m - 1; i++) {
        h = (h * d) % prime;
    }

    for (int i = 0; i < m; i++) {
        p = (d * p + pattern[i]) % prime;
        t = (d * t + text[i]) % prime;
    }

    for (int i = 0; i <= n - m; i++) {
        if (p == t) {
            int j;
            for (j = 0; j < m; j++) {
                if (text[i + j] != pattern[j]) break;
            }
            if (j == m) res.Add(i);
        }

        if (i < n - m) {
            t = (d * (t - text[i] * h) + text[i + m]) % prime;
            if (t < 0) t = (t + prime);
        }
    }
    return res;
}
```

**2. Longest Palindromic Substring:**

```csharp
public string LongestPalindrome(string s) {
    if (string.IsNullOrEmpty(s)) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.Length; i++) {
        int len1 = ExpandAroundCenter(s, i, i);
        int len2 = ExpandAroundCenter(s, i, i + 1);
        int len = Math.Max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.Substring(start, end - start + 1);
}

private int ExpandAroundCenter(string s, int left, int right) {
    while (left >= 0 && right < s.Length && s[left] == s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
}
```
