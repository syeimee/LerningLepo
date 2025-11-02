import java.util.*;
public class Main {
    public static void main(String[] args) {
        String s = "leetcode";
    
        System.out.println(nonRepeatChar(s));
    }

    /* 文字列内の重複していない最初の文字を取り出す。
     * 条件："abacddbec"
     * 結果：e
     */
    public static String nonRepeatChar(String s){
        //step1: s.length() < 2だったらreturn ""
        if (s.length() < 2) return "";

        Map <Character, Integer>  map = new HashMap<>();
        //step2: liner scan
        for(char c: s.toCharArray()){
            Character ch = c;

            //step2-1: map.containsKey(c) == trueのとき count++
            if(map.containsKey(ch)){
                int value = map.get(ch);
                value = value + 1;
                map.put(ch, value);
            }else{
                //step2-2: map.containsKey(s) == falseのとき　mapにinsertする
                map.put(ch, 1);
            }    
        }
        System.out.println(map);
        //step3: mapのcountが1のkeyをreturnする。count >1しかなければreturn ""
        for(char c: s.toCharArray()){
            Character ch = c;
            if(map.get(ch) == 1){
                return String.valueOf(ch);
            }
        }

        return "";
    }
}
