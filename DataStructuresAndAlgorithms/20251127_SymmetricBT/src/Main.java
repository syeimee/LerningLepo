/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        // corner case: if root is null, return true
        if (root == null) return true;
        
        // testcase1: [1,2,2,3,4,4,3]
        // case
        //    1
        // if left AND right subtree null, return true
        if (root.left == null && root.right == null) return true;
        
        // case when asymmetric
        // case
        //    1
        //.  /
        //. 2
        // if left or right subtrees is null, return false 
        if (root.left == null || root.right == null) return false;
        
        // level 1's child nodes must be same, otherwise return false
        // case
        //    1
        //.  /.\
        //. 2   3
        // if root's left and root's right is not same return false
        if (root.left.val != root.right.val) return false;
        
        // case
        //    1
        //.  /.\
        //. 2   2
        return isSymmetricHelper(root.left, root.right);
    }
    
    private boolean isSymmetricHelper(TreeNode left, TreeNode right) {
        // base case: if both are null, return true
        if (left == null && right == null) return true;
        
        // asymmetric leaf, return false
        // corner case
        //.   2         null
        // if left or right is null, then return false
        if (left == null || right == null) return false;
        
        // left.val and right.val is already checked to be the same
        // corner case
        //    2                2
        //.  /.\              /. \
        //. 3   null       null  null
        
        // corner case
        //    2                2
        //.  /.\              /. \
        //.null  3           3  null
        // if left.left or right/right subtree is null, return false
        
        // check if left.left == right.right, if not false
        if (left.left != null && right.right != null && (left.left.val != right.right.val)) return false;
        
        // check if left.right == right.left, if not false
        if (left.right != null && right.left != null && (left.right.val != right.left.val)) return false;
        
        // recurse here isSymmetricHelper(left.left, right.right)
        return isSymmetricHelper(left.left, right.right) && isSymmetricHelper(left.right, right.left);
    }
}