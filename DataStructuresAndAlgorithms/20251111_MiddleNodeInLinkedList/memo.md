# 学習テーマ
作業日時: 2025-11-11


## 目的・背景 

#### SKILL
```bash
LinkedList(odd number of nodes)
head-> 1-> 2-> 3-> null (middle is 2)

LinkedList(even number of nodes)
head-> 1-> 2-> 3-> 4->null (middle is 3)
```

```java
Node curr = head;
while(curr.next!= null){
    curr = curr.next;
}
```

#### Optimal Solution
```bash
ListNode slow = head; // カメ
ListNode fast = head;　// ウサギ

// ウサギがカメの２倍速で進む = ウサギがゴールした時のかめがmiddle
while(fast.next != null && fast.next.next != null){
    slow = slow.next;
    fast = fast.next.next;
}
```

## 実装内容・学んだ技術  




## 課題・問題点  




## 気づき・改善案  




