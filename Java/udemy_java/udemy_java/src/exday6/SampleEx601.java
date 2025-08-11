package exday6;
import java.util.*;
public class SampleEx601 {
    public static void main(String[] args) {
        HashMap <String, Integer> map = new HashMap<>();
        String nengo[] = {"明治","大正","昭和","平成"};
        map.put(nengo[0], 1868);
        map.put(nengo[1], 1868);
        map.put(nengo[2], 1868);
        map.put(nengo[3], 1868);

        for(String s: nengo){
            System.out.println(s + "元号は、西暦"+map.get(s)+"年");
        }
    }
}
