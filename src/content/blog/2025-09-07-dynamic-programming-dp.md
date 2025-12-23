---
title: "Dynamic Programming (DP)"
description: "Demystify the most challenging algorithmic paradigm. Master Memoization and Tabulation to solve complex problems with optimal efficiency."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Dynamic Programming",
    "Recursion",
    "Memoization",
    "Tabulation",
    "Complexity Analysis",
    "C#",
    "LeetCode",
  ]
---

## What is Dynamic Programming?

Dynamic Programming (DP) is an optimization technique used to solve complex problems by breaking them down into simpler subproblems. It is only applicable when a problem has:

1.  **Optimal Substructure**: An optimal solution to the problem contains optimal solutions to its subproblems.
2.  **Overlapping Subproblems**: The same subproblems are solved multiple times during the recursive process.

By storing the results of these subproblems (using a cache or table), we transform an exponential time complexity ($O(2^N)$) into a polynomial one (often $O(N)$ or $O(N^2)$).

---

## Two Approaches to DP

### 1. Memoization (Top-Down)

Start with the objective and recursively break it down. If you solve a subproblem, save the answer in a **Map** or **Array** (the "memo") so you never calculate it again.

### 2. Tabulation (Bottom-Up)

Start from the base cases and fill up a table (the "DP table"). This is usually more memory-efficient as it avoids the overhead of a recursive call stack.

---

## Practice Exercise

1.  **Climbing Stairs**: You can take 1 or 2 steps. How many ways to reach the top?
2.  **House Robber**: Maximize stolen value without robbing adjacent houses.
3.  **Coin Change**: Minimum coins needed to reach a specific amount.

---

## Answer

### 1. Climbing Stairs ($O(N)$ Time, $O(1)$ Space)

```csharp
public int ClimbStairs(int n) {
    if (n <= 2) return n;
    int first = 1, second = 2;
    for (int i = 3; i <= n; i++) {
        int third = first + second;
        first = second;
        second = third;
    }
    return second;
}
```

### 2. House Robber ($O(N)$ Time)

```csharp
public int Rob(int[] nums) {
    int rob1 = 0, rob2 = 0;
    // [rob1, rob2, n, n+1 ...]
    foreach (int n in nums) {
        int temp = Math.Max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}
```

### 3. Coin Change ($O(Amount \times Coins)$ Time)

```csharp
public int CoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;

    for (int a = 1; a <= amount; a++) {
        foreach (int c in coins) {
            if (a - c >= 0) {
                dp[a] = Math.Min(dp[a], 1 + dp[a - c]);
            }
        }
    }
    return dp[amount] != amount + 1 ? dp[amount] : -1;
}
```

## Summary

The key to mastering DP is **State Identification**.

1.  Ask: "What is the smallest version of this problem?" (Base Case).
2.  Ask: "How do I calculate the current step using previous steps?" (Recurrence Relation).
3.  Decide: Use **Memoization** if the recursive structure is intuitive; use **Tabulation** if you need to optimize for space and avoid stack overflow.
