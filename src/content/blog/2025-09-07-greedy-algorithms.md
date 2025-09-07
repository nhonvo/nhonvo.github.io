---
title: "Greedy Algorithms"
description: "Understand the greedy approach of making a locally optimal choice at each step. Be able to prove or disprove whether a greedy strategy works for a given problem."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Greedy Algorithms"]
---

### Mind Map Summary

- **Topic**: Greedy Algorithms
- **Core Concept**: A greedy algorithm is an algorithmic paradigm that follows the problem-solving heuristic of making the locally optimal choice at each stage with the hope of finding a global optimum.
- **Key Characteristics**:
    - **Greedy Choice Property**: A global optimum can be arrived at by selecting a local optimum.
    - **Optimal Substructure**: An optimal solution to the problem contains an optimal solution to subproblems.

### Practice Exercise

Solve the Coin Change problem using a greedy approach and explain why it doesn't work for all coin denominations (contrasting it with the DP solution). Implement Huffman coding. Solve the Activity Selection problem.

### Answer

**1. Coin Change (Greedy Approach):**

```csharp
public int CoinChange(int[] coins, int amount) {
    Array.Sort(coins, (a, b) => b.CompareTo(a));
    int count = 0;
    foreach (int coin in coins) {
        count += amount / coin;
        amount %= coin;
    }
    return amount == 0 ? count : -1;
}
```

**Explanation of Why Greedy Fails:**

The greedy approach does not work for all coin denominations. For example, if the coins are `{1, 3, 4}` and the amount is `6`, the greedy approach would choose `4, 1, 1` (3 coins), while the optimal solution is `3, 3` (2 coins).

The dynamic programming solution works for all coin denominations because it explores all possible combinations of coins, while the greedy approach only considers the locally optimal choice at each step.

**2. Huffman Coding:**

```csharp
// Huffman coding is a complex algorithm that is beyond the scope of a single code snippet.
// However, the general idea is to build a binary tree where the leaves are the characters
// and the path from the root to a leaf represents the code for that character.
// The tree is built by repeatedly merging the two nodes with the lowest frequency.
```

**3. Activity Selection Problem:**

```csharp
public class Activity {
    public int start, finish;
}

public void PrintMaxActivities(Activity[] arr, int n) {
    Array.Sort(arr, (a, b) => a.finish.CompareTo(b.finish));
    int i = 0;
    Console.Write(i + " ");
    for (int j = 1; j < n; j++) {
        if (arr[j].start >= arr[i].finish) {
            Console.Write(j + " ");
            i = j;
        }
    }
}
```
