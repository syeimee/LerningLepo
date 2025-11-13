public class Main {
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(3);
        head.next.next = new ListNode(5);
        deleteNode(head.next.next);
        printList(head);
    }

    public static void deleteNode(ListNode node){
        //step1 check if node is tail, then do nothing
        //tail node: head -> 1 -> 3 -> 5, node->5
        if(node.next == null) return;

        //step2 node is non-tail, remember node.next.next
        //non-tail node: head -> 1 -> 3 -> 5 -> null, node->3
        ListNode nodeNextNext = node.next.next; // null

        //step3 set node.next value(5) to node.val
        node.val = node.next.val; // 5

        //step4 set node.next to node.next.next
        node.next = nodeNextNext;
    }

    public static void printList(ListNode head){
        ListNode current = head;
        while(current != null){
            System.out.print(current.val);
            if(current.next !=null){
                System.out.print(" -> ");
            }
            current = current.next;
        }
        System.out.println();
    }
}

class ListNode{
    int val;
    ListNode next;
    ListNode(int val){
        this.val = val;
        this.next = null;
    } 
}
