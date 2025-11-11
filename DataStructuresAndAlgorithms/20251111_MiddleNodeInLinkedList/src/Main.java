import java.util.LinkedList;
public class Main {
    public static void main(String[] args) {
        ListNode head = new ListNode(1);
        head.next = new ListNode(2);
        head.next.next = new ListNode(3);
        head.next.next.next = new ListNode(4);
        head.next.next.next.next = new ListNode(5);
        head.next.next.next.next.next = new ListNode(6);
        ListNode middle = MiddleNodeInLinkedList(head);
        System.out.println(middle.val);
    }

    public static ListNode MiddleNodeInLinkedList(ListNode head){
        //corner case: if head or head.next is null, return head
        if(head == null || head.next == null) return head;
        ListNode slow = head;
        ListNode fast = head;
        
        while(fast.next !=null && fast.next.next != null){
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode middle = head;
        //step3:
        if(fast.next == null){
            //odd case if(fast.next == null) middle = slow;
            middle = slow;
        }else{
            //even case if(fast.next.next == null) middle = slow.next;
            middle = slow.next;
        }

        return middle;
    }
}

class ListNode {
    int val;           // このノードが持つ値
    ListNode next;     // 次のノードへの参照（ポインタ）
    
    ListNode(int val) {           // コンストラクタ
        this.val = val;           // 値を設定
        this.next = null;         // 次のノードは最初はnull
    }
}
