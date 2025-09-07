---
title: "Dynamic Programming (DP)"
description: "This is a critical topic for senior interviews. Be able to identify a DP problem by recognizing optimal substructure and overlapping subproblems. Differentiate between memoization (top-down) and tabulation (bottom-up) approaches."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Dynamic Programming", "Memoization", "Tabulation"]
---

### Mind Map Summary

- **Topic**: Dynamic Programming (DP)
- **Core Concepts**:
    - **Optimal Substructure**: A problem has optimal substructure if an optimal solution to the problem can be constructed from optimal solutions to its subproblems.
    - **Overlapping Subproblems**: A problem has overlapping subproblems if the same subproblems are solved multiple times.
- **Approaches**:
    - **Memoization (Top-Down)**: A top-down approach where the results of expensive function calls are cached and returned when the same inputs occur again.
    - **Tabulation (Bottom-Up)**: A bottom-up approach where the results of the subproblems are stored in a table and used to solve larger subproblems.

### Practice Exercise

Solve the Climbing Stairs problem. Find the maximum sum of a non-adjacent subarray. Solve the Coin Change problem. Find the Longest Common Subsequence of two strings.

### Answer

**1. Climbing Stairs:**

```csharp
public int ClimbStairs(int n) {
    if (n == 1) return 1;
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}
```

**2. Maximum Sum of a Non-Adjacent Subarray (House Robber):**

```csharp
public int Rob(int[] nums) {
    if (nums.Length == 0) return 0;
    if (nums.Length == 1) return nums[0];
    int[] dp = new int[nums.Length];
    dp[0] = nums[0];
    dp[1] = Math.Max(nums[0], nums[1]);
    for (int i = 2; i < nums.Length; i++) {
        dp[i] = Math.Max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    return dp[nums.Length - 1];
}
```

**3. Coin Change:**

```csharp
public int CoinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Array.Fill(dp, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coins.Length; j++) {
            if (coins[j] <= i) {
                dp[i] = Math.Min(dp[i], dp[i - coins[j]] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}
```

**4. Longest Common Subsequence:**

```csharp
public int LongestCommonSubsequence(string text1, string text2) {
    int m = text1.Length;
    int n = text2.Length;
    int[,] dp = new int[m + 1, n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i, j] = 1 + dp[i - 1, j - 1];
            } else {
                dp[i, j] = Math.Max(dp[i - 1, j], dp[i, j - 1]);
            }
        }
    }
    return dp[m, n];
}
```
