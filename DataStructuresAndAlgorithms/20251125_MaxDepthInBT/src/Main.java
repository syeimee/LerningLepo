public class Main {
    public static void main(String[] args) {
        TreeNode root = new TreeNode(3);
        root.left = new TreeNode(9);
        root.right = new TreeNode(20);
        root.right.left = new TreeNode(15);
        root.right.right = new TreeNode(7);
        
        int result = maxDepth(root);
        System.out.println(result);
    }   
    
    public static int maxDepth(TreeNode root){
        //base case: if root is null then return 0
        if (root == null) return 0;

        //step1: recurse left subtree and get
        int maxDepthLeft = maxDepth(root.left);

        //step2: recurse right subtree and get maxDepth
        int maxDepthRight = maxDepth(root.right);

        //step3: return max(leftMaxDepth, rightMaxDepth)
        return Math.max(maxDepthLeft, maxDepthRight) + 1;
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
