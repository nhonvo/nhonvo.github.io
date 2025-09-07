---
title: "Trees - Traversal and Core Concepts"
description: "Be able to implement and explain the differences between In-order, Pre-order, and Post-order (DFS variations) and Level-order (BFS) traversals, both recursively and iteratively."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Trees", "Tree Traversal", "DFS", "BFS"]
---

### Mind Map Summary

- **Topic**: Trees - Traversal and Core Concepts
- **Core Concepts**:
    - **Tree**: A hierarchical data structure that consists of nodes connected by edges.
    - **Traversal**: The process of visiting each node in a tree exactly once.
    - **Depth-First Search (DFS)**: A traversal strategy that explores as far as possible along each branch before backtracking.
        - **In-order**: Left, Root, Right
        - **Pre-order**: Root, Left, Right
        - **Post-order**: Left, Right, Root
    - **Breadth-First Search (BFS)**: A traversal strategy that explores the tree level by level.
        - **Level-order**: Visit all nodes at a given level before moving to the next level.

### Practice Exercise

Implement all four traversal methods for a given binary tree. Find the maximum depth of a binary tree. Check if a binary tree is symmetric (a mirror of itself).

### Answer

**1. Traversal Methods:**

```csharp
public class TreeNode {
    public int val;
    public TreeNode left;
    public TreeNode right;
    public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// In-order
public IList<int> InorderTraversal(TreeNode root) {
    var res = new List<int>();
    if (root == null) return res;
    var stack = new Stack<TreeNode>();
    var curr = root;
    while (curr != null || stack.Count > 0) {
        while (curr != null) {
            stack.Push(curr);
            curr = curr.left;
        }
        curr = stack.Pop();
        res.Add(curr.val);
        curr = curr.right;
    }
    return res;
}

// Pre-order
public IList<int> PreorderTraversal(TreeNode root) {
    var res = new List<int>();
    if (root == null) return res;
    var stack = new Stack<TreeNode>();
    stack.Push(root);
    while (stack.Count > 0) {
        var curr = stack.Pop();
        res.Add(curr.val);
        if (curr.right != null) stack.Push(curr.right);
        if (curr.left != null) stack.Push(curr.left);
    }
    return res;
}

// Post-order
public IList<int> PostorderTraversal(TreeNode root) {
    var res = new List<int>();
    if (root == null) return res;
    var stack = new Stack<TreeNode>();
    stack.Push(root);
    while (stack.Count > 0) {
        var curr = stack.Pop();
        res.Insert(0, curr.val);
        if (curr.left != null) stack.Push(curr.left);
        if (curr.right != null) stack.Push(curr.right);
    }
    return res;
}

// Level-order
public IList<IList<int>> LevelOrder(TreeNode root) {
    var res = new List<IList<int>>();
    if (root == null) return res;
    var queue = new Queue<TreeNode>();
    queue.Enqueue(root);
    while (queue.Count > 0) {
        int size = queue.Count;
        var level = new List<int>();
        for (int i = 0; i < size; i++) {
            var curr = queue.Dequeue();
            level.Add(curr.val);
            if (curr.left != null) queue.Enqueue(curr.left);
            if (curr.right != null) queue.Enqueue(curr.right);
        }
        res.Add(level);
    }
    return res;
}
```

**2. Maximum Depth of a Binary Tree:**

```csharp
public int MaxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.Max(MaxDepth(root.left), MaxDepth(root.right));
}
```

**3. Symmetric Tree:**

```csharp
public bool IsSymmetric(TreeNode root) {
    return IsMirror(root, root);
}

public bool IsMirror(TreeNode t1, TreeNode t2) {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    return (t1.val == t2.val)
        && IsMirror(t1.right, t2.left)
        && IsMirror(t1.left, t2.right);
}
```
