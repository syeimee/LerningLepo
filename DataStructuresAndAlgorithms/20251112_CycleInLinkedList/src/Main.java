public class Main {
    public static void main (String[] args){
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        head.next.next.next.next.next = head.next.next;

        boolean result = isCycleList(head);
        System.out.println(result);
    }
    public static boolean isCycleList(ListNode head){
        //corner case if head or head.next is null return false
        if(head == null || head.next == null) return false;
        ListNode slow = head;
        ListNode fast = head.next;

        while(fast.next != null && fast.next.next != null){
            slow = slow.next;
            fast = fast.next.next;

            //　追いついた場合は、サイクルがある
            if(slow == fast) return true;
        }
        return false;
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