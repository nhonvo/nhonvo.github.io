---
title: "Binary Search Trees (BST)"
description: "Know the properties of a BST. Understand the time complexity for search, insertion, and deletion. Be able to validate if a given tree is a BST."
pubDate: "Sep 07 2025"
published: true
tags: ["Data Structures & Algorithms (DSA)", "Trees", "Binary Search Trees", "BST"]
---

### Mind Map Summary

- **Topic**: Binary Search Trees (BST)
- **Properties**:
    - The left subtree of a node contains only nodes with keys lesser than the node’s key.
    - The right subtree of a node contains only nodes with keys greater than the node’s key.
    - The left and right subtree each must also be a binary search tree.
- **Time Complexity**:
    - **Search**: O(log n) on average, O(n) in the worst case (unbalanced tree).
    - **Insertion**: O(log n) on average, O(n) in the worst case.
    - **Deletion**: O(log n) on average, O(n) in the worst case.

### Practice Exercise

Implement search, insert, and delete operations for a BST. Write a function to validate if a binary tree is a valid BST. Find the lowest common ancestor (LCA) of two nodes in a BST.

### Answer

**1. BST Operations:**

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

// Search
public TreeNode SearchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    return val < root.val ? SearchBST(root.left, val) : SearchBST(root.right, val);
}

// Insert
public TreeNode InsertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = InsertIntoBST(root.left, val);
    else root.right = InsertIntoBST(root.right, val);
    return root;
}

// Delete
public TreeNode DeleteNode(TreeNode root, int key) {
    if (root == null) return null;
    if (key < root.val) {
        root.left = DeleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = DeleteNode(root.right, key);
    } else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        TreeNode minNode = FindMin(root.right);
        root.val = minNode.val;
        root.right = DeleteNode(root.right, root.val);
    }
    return root;
}

private TreeNode FindMin(TreeNode node) {
    while (node.left != null) {
        node = node.left;
    }
    return node;
}
```

**2. Validate BST:**

```csharp
public bool IsValidBST(TreeNode root) {
    return IsValidBST(root, long.MinValue, long.MaxValue);
}

private bool IsValidBST(TreeNode root, long min, long max) {
    if (root == null) return true;
    if (root.val <= min || root.val >= max) return false;
    return IsValidBST(root.left, min, root.val) && IsValidBST(root.right, root.val, max);
}
```

**3. Lowest Common Ancestor (LCA) of a BST:**

```csharp
public TreeNode LowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (p.val < root.val && q.val < root.val) {
        return LowestCommonAncestor(root.left, p, q);
    } else if (p.val > root.val && q.val > root.val) {
        return LowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
}
```
