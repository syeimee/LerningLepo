public class Main {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(4);
        root.left = new TreeNode(2);
        root.left.left = new TreeNode(1);
        root.left.right = new TreeNode(3);
        root.right = new TreeNode(7);

        TreeNode result = searchBST(root, 3);
        System.out.println(result.val);
    }

    public static TreeNode searchBST(TreeNode root, int target){
        // base case: if root is null return null
        if(root == null) return root;

        //if root.val == val , found it, so retrun root
        if(root.val == target) return root;

        //if val<root, then go to left subtree
        if(target < root.val) return searchBST(root.left, target);
            
        // else, go to rigth subtree
        return searchBST(root.right, target);
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
