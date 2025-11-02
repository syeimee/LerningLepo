import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = "leetcode";
        System.out.println(firstUniqChar(s));
    }

    // return index of first non-repeating char
    // pre: s = "leetcode"
    // post: return 0;
    public static int firstUniqChar(String s){
        // corner case: s.length() == 1, return 0
        if(s.length() == 1) return 0;
        
        Map <Integer, Integer> map = new HashMap<>();
        // step1: single linear scan left -> right
        // need to scan all the chars and keep count of occurrence
        // testcate1: s = "leetcode", i=0, map[(l,1)]
        // testcate1: s = "leetcode", i=1, map[(l,1)(e,1)]
        // testcate1: s = "leetcode", i=2, map[(l,1)(e,2)]
        // testcate1: s = "leetcode", i=3, map[(l,1)(e,2)(t,1)]
        // ...
        for(char c : s.toCharArray()){
            // first time
            if(!map.containsKey((int) c)){
                map.put((int) c, 1);
            }
            // char already exists in map
            if(map.containsKey((int) c)){
                map.put((int)c, map.get((int) c) + 1);
            }
        }
        // step2: second pass, need to go through string again to retrun index
        // testcate1: s = "leetcode", i=3, map[(l,1)(e,2)(t,1)]
        for(int i = 0; i < s.length(); i++){
            if(map.get((int)s.charAt(i)) == 1){
                return i;
            }
        }
        // return -1
        return -1;
    }
}

// 自分の実装
// import java.util.*;
// public class Main {
//     public static void main(String[] args) {
//         String s = "leetcode";
    
//         System.out.println(firstUniqChar(s));
//     }

//     /* 文字列内の重複していない最初の文字を取り出す。
//      * 条件："abacddbec"
//      * 結果：e
//      */
//     public static Character firstUniqChar(String s){
//         //step1: s.length() < 2だったらreturn ""
//         if (s.length() < 2) return null;

//         Map <Character, Integer>  map = new HashMap<>();
//         //step2: liner scan
//         for(char c: s.toCharArray()){
//             Character ch = c;

//             //step2-1: map.containsKey(c) == trueのとき count++
//             if(map.containsKey(ch)){
//                 int value = map.get(ch);
//                 value = value + 1;
//                 map.put(ch, value);
//             }else{
//                 //step2-2: map.containsKey(s) == falseのとき　mapにinsertする
//                 map.put(ch, 1);
//             }    
//         }
//         System.out.println(map);
//         //step3: mapのcountが1のkeyをreturnする。count >1しかなければreturn ""
//         for(char c: s.toCharArray()){
//             Character ch = c;
//             if(map.get(ch) == 1){
//                 return ch;
//             }
//         }
//         return null;
//     }
// }
