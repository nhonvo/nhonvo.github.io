---
title: "Recursion & Backtracking"
description: "Master recursion as a problem-solving technique. Understand the backtracking template for solving problems involving permutations, combinations, and subsets. Be mindful of the call stack and potential for stack overflow."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Recursion", "Backtracking"]
---

### Mind Map Summary

- **Topic**: Recursion & Backtracking
- **Core Concepts**:
    - **Recursion**: A problem-solving technique where a function calls itself to solve smaller instances of the same problem.
    - **Backtracking**: A general algorithm for finding all (or some) solutions to some computational problems, notably constraint satisfaction problems, that incrementally builds candidates to the solutions, and abandons a candidate ("backtracks") as soon as it determines that the candidate cannot possibly be completed to a valid solution.
- **Key Considerations**:
    - **Base Case**: The condition that stops the recursion.
    - **Recursive Step**: The part of the function that calls itself.
    - **Call Stack**: Be mindful of the call stack and the potential for stack overflow.

### Practice Exercise

Generate all possible subsets of a given set. Find all permutations of a string. Solve the N-Queens problem. Implement a Sudoku solver.

### Answer

**1. Subsets:**

```csharp
public IList<IList<int>> Subsets(int[] nums) {
    var res = new List<IList<int>>();
    Backtrack(res, new List<int>(), nums, 0);
    return res;
}

private void Backtrack(List<IList<int>> res, List<int> tempList, int[] nums, int start) {
    res.Add(new List<int>(tempList));
    for (int i = start; i < nums.Length; i++) {
        tempList.Add(nums[i]);
        Backtrack(res, tempList, nums, i + 1);
        tempList.RemoveAt(tempList.Count - 1);
    }
}
```

**2. Permutations:**

```csharp
public IList<IList<int>> Permute(int[] nums) {
    var res = new List<IList<int>>();
    Backtrack(res, new List<int>(), nums);
    return res;
}

private void Backtrack(List<IList<int>> res, List<int> tempList, int[] nums) {
    if (tempList.Count == nums.Length) {
        res.Add(new List<int>(tempList));
    } else {
        for (int i = 0; i < nums.Length; i++) {
            if (tempList.Contains(nums[i])) continue;
            tempList.Add(nums[i]);
            Backtrack(res, tempList, nums);
            tempList.RemoveAt(tempList.Count - 1);
        }
    }
}
```

**3. N-Queens:**

```csharp
public IList<IList<string>> SolveNQueens(int n) {
    var res = new List<IList<string>>();
    var board = new char[n, n];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            board[i, j] = ".";
        }
    }
    Backtrack(res, board, 0, n);
    return res;
}

private void Backtrack(List<IList<string>> res, char[,] board, int col, int n) {
    if (col == n) {
        res.Add(Construct(board, n));
        return;
    }
    for (int i = 0; i < n; i++) {
        if (IsSafe(board, i, col, n)) {
            board[i, col] = "Q";
            Backtrack(res, board, col + 1, n);
            board[i, col] = ".";
        }
    }
}

private bool IsSafe(char[,] board, int row, int col, int n) {
    for (int i = 0; i < col; i++) {
        if (board[row, i] == "Q") return false;
    }
    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i, j] == "Q") return false;
    }
    for (int i = row, j = col; j >= 0 && i < n; i++, j--) {
        if (board[i, j] == "Q_") return false;
    }
    return true;
}

private List<string> Construct(char[,] board, int n) {
    var res = new List<string>();
    for (int i = 0; i < n; i++) {
        res.Add(new string(board, i, 0, n));
    }
    return res;
}
```

**4. Sudoku Solver:**

```csharp
public void SolveSudoku(char[][] board) {
    if (board == null || board.Length == 0) return;
    Solve(board);
}

private bool Solve(char[][] board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == ".") {
                for (char c = '1'; c <= '9'; c++) {
                    if (IsValid(board, i, j, c)) {
                        board[i][j] = c;
                        if (Solve(board)) return true;
                        else board[i][j] = ".";
                    }
                }
                return false;
            }
        }
    }
    return true;
}

private bool IsValid(char[][] board, int row, int col, char c) {
    for (int i = 0; i < 9; i++) {
        if (board[i][col] != "." && board[i][col] == c) return false;
        if (board[row][i] != "." && board[row][i] == c) return false;
        if (board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] != "." && board[3 * (row / 3) + i / 3][3 * (col / 3) + i % 3] == c) return false;
    }
    return true;
}
```
