# 学習テーマ
作業日時: 2025-11-18


## 目的・背景 



## 実装内容・学んだ技術  
二分探索

```java
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x){ val = x;}
}
```

```java
TreeNode root = new TreeNode(4);
root.left = new TreeNode(2);
root.left.left = new TreeNode(1);
root.left.right = new TreeNode(3);
root.right = new TreeNode(7);
TreeNode left = root.left;
TreeNode right = root.right;
```

#### Big-O Runtime and Space Complexity Analysis
runtime: O(n)
space complexity: O(n) because use call stack


## 課題・問題点  




## 気づき・改善案  




