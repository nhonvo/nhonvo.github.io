---
title: "Binary Search Trees (BST)"
description: "Master the fundamental properties of Binary Search Trees. Learn optimal search, insertion, and deletion algorithms and how to validate tree integrity."
pubDate: "9 7 2025"
published: true
tags:
  [
    "Algorithms",
    "Data Structures",
    "Trees",
    "Binary Search Trees",
    "BST",
    "C#",
    "LeetCode",
    "Complexity Analysis",
  ]
---

## What is a Binary Search Tree?

A Binary Search Tree (BST) is a hierarchical data structure where each node has at most two children. It is defined by a strict ordering property:

1.  **Left Subtree**: Contains only nodes with values **less than** the parent node's value.
2.  **Right Subtree**: Contains only nodes with values **greater than** the parent node's value.
3.  **Recursive Nature**: Every subtree must also be a valid Binary Search Tree.

### Complexity Matrix

| Operation  | Average Case | Worst Case (Degenerate) |
| :--------- | :----------- | :---------------------- |
| **Search** | $O(\log n)$  | $O(n)$                  |
| **Insert** | $O(\log n)$  | $O(n)$                  |
| **Delete** | $O(\log n)$  | $O(n)$                  |

_Note: The worst case occurs when the tree becomes "skewed" (like a linked list). This is usually solved by self-balancing trees like AVL or Red-Black trees._

---

## Practice Exercise

1.  Implement **Search**, **Insert**, and **Delete** for a BST.
2.  Write a function to **Validate** if a binary tree is a valid BST.
3.  Find the **Lowest Common Ancestor (LCA)** of two nodes.

---

## Answer

### 1. BST Core Operations

```csharp
public class TreeNode {
    public int val;
    public TreeNode left, right;
    public TreeNode(int x) { val = x; }
}

public class BSTOperations {
    // Search: O(log n)
    public TreeNode Search(TreeNode root, int val) {
        if (root == null || root.val == val) return root;
        return val < root.val ? Search(root.left, val) : Search(root.right, val);
    }

    // Insert: O(log n)
    public TreeNode Insert(TreeNode root, int val) {
        if (root == null) return new TreeNode(val);
        if (val < root.val) root.left = Insert(root.left, val);
        else if (val > root.val) root.right = Insert(root.right, val);
        return root;
    }

    // Delete: O(log n)
    public TreeNode Delete(TreeNode root, int key) {
        if (root == null) return null;

        if (key < root.val) root.left = Delete(root.left, key);
        else if (key > root.val) root.right = Delete(root.right, key);
        else {
            // Node with only one child or no child
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            // Node with two children: Get inorder successor
            root.val = FindMin(root.right).val;
            root.right = Delete(root.right, root.val);
        }
        return root;
    }

    private TreeNode FindMin(TreeNode node) {
        while (node.left != null) node = node.left;
        return node;
    }
}
```

### 2. Validating a BST ($O(n)$ Time)

To validate a BST, it is not enough to check if `node.left < node < node.right`. You must ensure that all nodes in the left subtree are less than the current node and all nodes in the right subtree are greater. We use an "Allowed Range" $[min, max]$ that shrinks as we go deeper.

```csharp
public bool IsValidBST(TreeNode root) {
    return Validate(root, long.MinValue, long.MaxValue);
}

private bool Validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;

    return Validate(node.left, min, node.val) &&
           Validate(node.right, node.val, max);
}
```

### 3. Lowest Common Ancestor ($O(\log n)$ Time)

In a BST, the LCA is the first node where the two target values $p$ and $q$ "split"—one goes left and one goes right.

```csharp
public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null) return null;

    if (p.val < root.val && q.val < root.val)
        return LowestCommonAncestor(root.left, p, q);

    if (p.val > root.val && q.val > root.val)
        return LowestCommonAncestor(root.right, p, q);

    return root; // This is the split point
}
```

## Summary

- **BSTs** are excellent for range queries and maintaining sorted data dynamically.
- **Validation** requires tracking bounds as you descend.
- **LCA** in a BST is simpler than in a generic Binary Tree because of the ordering property.
- **Balancing** is critical; otherwise, a BST can perform as poorly as a Linked List ($O(n)$).
