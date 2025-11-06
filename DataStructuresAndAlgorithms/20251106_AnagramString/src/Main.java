import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        String s = "LISTEN";
        String t = "SILENT";
        System.out.println(anagramString(s, t));
    }
    public static boolean anagramString(String s, String t){
        
        //corner case
        if(s == null || t == null) return false;
        if(s.isEmpty() && t.isEmpty()) return true;
        if(s.length() != t.length()) return false;

        Map<Character, Integer> map = new HashMap<>();
        //step1 s linear scan
        for(char c : s.toCharArray()){
            //step2-1 if map.contains(char) then count++
            //step2-2 if !map.contain(char) then insert map(char, 1)
            if(map.containsKey(c)){
                map.put(c, map.get(c) + 1);
            }else{
                map.put(c, 1);
            }
        }
        //step3 t linear scan
        for(char c: t.toCharArray()){
            
            //step4-1 if map.contains(char) then count--
            if(map.containsKey(c)){
                map.put(c, map.get(c) - 1);
            }else{
                return false;
            }
        }

        //step5 check map count
        for(Map.Entry entry:map.entrySet()){
            if((int)entry.getValue() != 0) return false;
        }

        return true;
    }
}
