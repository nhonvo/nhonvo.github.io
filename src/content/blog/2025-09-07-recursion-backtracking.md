---
title: "Recursion & Backtracking"
description: "Master the art of self-referential logic. Learn the templates for solving combinatorial problems like Permutations, Subsets, and N-Queens using Backtracking."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Recursion",
    "Backtracking",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is Recursion?

Recursion is a programming technique where a function calls itself to solve a smaller sub-problem of the original problem. Every recursive function must have two parts:

1.  **Base Case**: The condition that terminates the recursion (prevents infinite loops and stack overflow).
2.  **Recursive Step**: The logic that breaks the problem down and calls the function again.

---

## What is Backtracking?

Backtracking is an extension of recursion. It is a "trial and error" approach used to build a solution incrementally. If the current path doesn't lead to a valid solution, you "backtrack" (undo the last step) and try a different path.

### The Backtracking Template

```csharp
void Backtrack(state, result) {
    if (isSolution(state)) {
        result.Add(state);
        return;
    }

    for (option in options) {
        if (isValid(option)) {
            MakeChoice(option);      // Step 1: Forward
            Backtrack(state, result); // Step 2: Recurse
            UndoChoice(option);      // Step 3: Backtrack (Undo)
        }
    }
}
```

---

## Practice Exercise

1.  **Subsets**: Given an integer array, return all possible subsets.
2.  **Permutations**: Given an array of distinct integers, return all possible permutations.
3.  **Sudoku Solver**: Fill a 9x9 grid so that each row, column, and 3x3 subgrid contains digits 1-9.

---

## Answer

### 1. Subsets ($O(2^N)$ Time)

```csharp
public IList<IList<int>> Subsets(int[] nums) {
    var result = new List<IList<int>>();
    GenerateSubsets(0, nums, new List<int>(), result);
    return result;
}

private void GenerateSubsets(int start, int[] nums, List<int> current, List<IList<int>> result) {
    result.Add(new List<int>(current)); // Add current snapshot

    for (int i = start; i < nums.Length; i++) {
        current.Add(nums[i]);                  // Make choice
        GenerateSubsets(i + 1, nums, current, result); // Recurse
        current.RemoveAt(current.Count - 1);   // Backtrack
    }
}
```

### 2. Permutations ($O(N!)$ Time)

```csharp
public IList<IList<int>> Permute(int[] nums) {
    var result = new List<IList<int>>();
    Solve(nums, new List<int>(), result);
    return result;
}

private void Solve(int[] nums, List<int> current, List<IList<int>> result) {
    if (current.Count == nums.Length) {
        result.Add(new List<int>(current));
        return;
    }

    for (int i = 0; i < nums.Length; i++) {
        if (current.Contains(nums[i])) continue; // Skip used numbers

        current.Add(nums[i]);
        Solve(nums, current, result);
        current.RemoveAt(current.Count - 1); // Backtrack
    }
}
```

### 3. Sudoku Solver ($O(9^{81})$ Worst Case)

```csharp
public bool SolveSudoku(char[][] board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == '.') {
                for (char val = '1'; val <= '9'; val++) {
                    if (IsValid(board, r, c, val)) {
                        board[r][c] = val;
                        if (SolveSudoku(board)) return true;
                        board[r][c] = '.'; // Backtrack
                    }
                }
                return false; // No valid number found for this cell
            }
        }
    }
    return true;
}

private bool IsValid(char[][] board, int row, int col, char c) {
    for (int i = 0; i < 9; i++) {
        if (board[i][col] == c) return false; // Column check
        if (board[row][i] == c) return false; // Row check
        if (board[3*(row/3) + i/3][3*(col/3) + i%3] == c) return false; // Box check
    }
    return true;
}
```

## Summary

- **Recursion** is for problems that can be solved by reducing them to identical sub-problems (like Factorial or Tree Traversal).
- **Backtracking** is for search problems where you need to explore a "decision tree" (like finding paths or combinations).
- Always be careful with the **base case**—without it, you'll hit a `StackOverflowException`.
