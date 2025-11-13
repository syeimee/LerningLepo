public class Main {
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(1);
        head.next.next = new ListNode(1);
        head.next.next.next = new ListNode(2);
        deleteDuplicateNode(head);

        printNode(head);
    }

    public static void deleteDuplicateNode(ListNode head){
        // corner case
        if(head == null || head.next == null) return;
        // list is sorted, so just compare curr val == curr.next.val untill curr.next == null
        ListNode curr = head;
        while(curr.next != null){
            //if dup found, dont move curr, Just set curr.next to curr.next.next
            if(curr.val == curr.next.val){
                curr.next = curr.next.next;
            }else{
                //if not dup, move curr
                curr = curr.next;
            }
        }
    }

    public static void printNode(ListNode head){
        ListNode curr = head;
        while(curr != null){
            System.out.print(curr.val);

            if(curr.next != null){
                System.out.print(" -> ");
            }

            curr = curr.next;
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
