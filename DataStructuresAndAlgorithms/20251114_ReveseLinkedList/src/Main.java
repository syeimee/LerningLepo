public class Main {
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);

        ListNode result = reverseLinkedList(head);
        printList(result);

    }

    /* reverseLinkedList
     * pre: ListNode head -> 1 -> 2 -> 3 -> null
     * post: ListNode null -> 3 -> 2 -> 1 -> head
     */
    public static ListNode reverseLinkedList(ListNode head){
        // corner case
        if(head == null || head.next == null) return head;

        //need to keep track of three nodes using pointers: prev, curr, next
        ListNode prev = null;
        ListNode curr = head;
        ListNode next = head.next;
        

        //first
        //step1: while curr is not null, reverse prev and curr
        while(curr != null){
            // null -> 1 -> 2 -> 3 -> null
            // prev   curr next

            curr.next = prev;

            prev = curr;
            curr = next;

            if(next != null){
                next = next.next;
            }
        }
        head = prev;
        
        return head;
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
