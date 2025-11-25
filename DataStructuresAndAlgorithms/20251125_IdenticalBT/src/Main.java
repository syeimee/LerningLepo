public class Main {
    public static void main(String[] args) {
        TreeNode root1 = new TreeNode(1);
        root1.left = new TreeNode(2);
        root1.right = new TreeNode(1);

        TreeNode root2 = new TreeNode(1);
        root2.left = new TreeNode(2);
        root2.right = new TreeNode(2);
        System.out.println(isSameTree(root1, root2));
    }
    public static boolean isSameTree(TreeNode root1, TreeNode root2){
        //basecase: if root1 and root2 is both null, then return true
        if(root1 == null && root2 == null) return true;
        if(root1 == null || root2 == null) return true;
        //step1 if root1.val != root2.val return false
        if(root1.val != root2.val) return false;
        //step2
        //recurse left subtrees of root1 and root2
        //recurse rigth subtrees of roo1 and root2

        //step3 retrun true both are true
        return isSameTree(root1.left, root2.left) && isSameTree(root1.right, root2.right);
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val){
        this.val = val;
        this.left = null;
        this.right = null;
    }
}