---
title: "Trees: Traversal and Core Concepts"
description: "Hierarchical data modeling mastered. Deep dive into DFS (In-order, Pre-order, Post-order) and BFS (Level-order) traversals with C# implementations."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Trees",
    "Binary Tree",
    "DFS",
    "BFS",
    "C#",
    "LeetCode",
  ]
---

## What is a Tree?

A Tree is a non-linear data structure representing a hierarchy. It consists of **Nodes** connected by **Edges**, starting from a single **Root** node. Elements at the end of branches are called **Leaf** nodes.

### Essential Terminology

- **Binary Tree**: Each node has at most two children.
- **Height**: The number of edges on the longest path from the root to a leaf.
- **Depth**: The number of edges from the root to a specific node.

---

## Tree Traversal Techniques

### 1. Depth-First Search (DFS)

DFS explores as far as possible along each branch before backtracking. There are three common orders for Binary Trees:

- **In-order (Left, Root, Right)**: Used to retrieve data from a BST in sorted order.
- **Pre-order (Root, Left, Right)**: Useful for creating a copy of the tree.
- **Post-order (Left, Right, Root)**: Useful for deleting trees or evaluating postfix expressions.

### 2. Breadth-First Search (BFS)

Also known as **Level-order Traversal**, it visits all nodes at the current depth before moving to the next level. Use a **Queue** for the iterative implementation.

---

## Practice Exercise

1.  **Level-Order Traversal**: Return nodes grouped by their level.
2.  **Max Depth**: Find the height of the tree.
3.  **Symmetric Tree**: Determine if a tree is a mirror of itself.

---

## Answer

### 1. Level-Order Traversal ($O(N)$ Time)

```csharp
public IList<IList<int>> LevelOrder(TreeNode root) {
    var result = new List<IList<int>>();
    if (root == null) return result;

    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);

    while (queue.Count > 0) {
        int levelSize = queue.Count;
        var currentLevel = new List<int>();

        for (int i = 0; i < levelSize; i++) {
            var node = queue.Dequeue();
            currentLevel.Add(node.val);
            if (node.left != null) queue.Enqueue(node.left);
            if (node.right != null) queue.Enqueue(node.right);
        }
        result.Add(currentLevel);
    }
    return result;
}
```

### 2. Maximum Depth (Recursive)

```csharp
public int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}
```

### 3. Symmetric Tree ($O(N)$ Time)

```csharp
public bool IsSymmetric(TreeNode root) {
    return IsMirror(root, root);
}

private bool IsMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return (t1.val == t2.val)
        && IsMirror(t1.left, t2.right)
        && IsMirror(t1.right, t2.left);
}
```

## Summary

- Use **BFS** when you need to process nodes based on their proximity to the root (e.g., finding the shortest path).
- Use **In-order DFS** for **Binary Search Trees (BST)** to access elements in sorted order.
- Recursion is the natural fit for trees due to their self-similar structure, but always keep $O(H)$ space complexity (height of the tree) in mind for the call stack.
